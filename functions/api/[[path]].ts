import { Client } from '@neondatabase/serverless'

interface Env {
  DATABASE_URL: string
}

async function withDb<T>(databaseUrl: string, fn: (db: Client) => Promise<T>): Promise<T> {
  const client = new Client(databaseUrl)
  await client.connect()
  try {
    return await fn(client)
  } finally {
    await client.end()
  }
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, env } = context
  const url = new URL(request.url)
  const path = url.pathname.replace('/api/', '')
  const method = request.method

  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  }

  if (method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders })
  }

  const dbUrl = env.DATABASE_URL

  try {
    // GET /services
    if (path === 'services' && method === 'GET') {
      const result = await withDb(dbUrl, (db) =>
        db.query('SELECT * FROM services WHERE is_active = true ORDER BY order_index ASC')
      )
      return jsonResponse(result.rows, corsHeaders)
    }

    // GET /services/category/:category
    if (path.startsWith('services/category/') && method === 'GET') {
      const category = path.replace('services/category/', '')
      const result = await withDb(dbUrl, (db) =>
        db.query('SELECT * FROM services WHERE category = $1 AND is_active = true ORDER BY order_index ASC', [category])
      )
      return jsonResponse(result.rows, corsHeaders)
    }

    // GET /services/:id
    if (path.startsWith('services/') && method === 'GET') {
      const id = path.replace('services/', '')
      const result = await withDb(dbUrl, (db) =>
        db.query('SELECT * FROM services WHERE id = $1', [id])
      )
      return jsonResponse(result.rows[0] || null, corsHeaders)
    }

    // GET /case-studies
    if (path === 'case-studies' && method === 'GET') {
      const result = await withDb(dbUrl, (db) =>
        db.query('SELECT * FROM case_studies WHERE is_active = true ORDER BY display_order ASC')
      )
      return jsonResponse(result.rows, corsHeaders)
    }

    // GET /case-studies/featured
    if (path === 'case-studies/featured' && method === 'GET') {
      const result = await withDb(dbUrl, (db) =>
        db.query('SELECT * FROM case_studies WHERE is_featured = true AND is_active = true ORDER BY display_order ASC')
      )
      return jsonResponse(result.rows, corsHeaders)
    }

    // GET /case-studies/:id
    if (path.startsWith('case-studies/') && method === 'GET') {
      const id = path.replace('case-studies/', '')
      const result = await withDb(dbUrl, (db) =>
        db.query('SELECT * FROM case_studies WHERE id = $1', [id])
      )
      return jsonResponse(result.rows[0] || null, corsHeaders)
    }

    // GET /site-content
    if (path === 'site-content' && method === 'GET') {
      const result = await withDb(dbUrl, (db) =>
        db.query('SELECT * FROM site_content')
      )
      return jsonResponse(result.rows, corsHeaders)
    }

    // GET /site-content/:key
    if (path.startsWith('site-content/') && method === 'GET') {
      const key = path.replace('site-content/', '')
      const result = await withDb(dbUrl, (db) =>
        db.query('SELECT * FROM site_content WHERE section_key = $1', [key])
      )
      return jsonResponse(result.rows[0] || null, corsHeaders)
    }

    // POST /consultations
    if (path === 'consultations' && method === 'POST') {
      const body = await request.json() as Record<string, unknown>
      const result = await withDb(dbUrl, (db) =>
        db.query(
          `INSERT INTO consultations (full_name, email, phone, company_name, selected_services, budget_range, timeline, project_details, status)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'new') RETURNING *`,
          [
            body.full_name,
            body.email,
            body.phone || null,
            body.company_name || null,
            body.selected_services,
            body.budget_range || null,
            body.timeline || null,
            body.project_details || null,
          ]
        )
      )
      return jsonResponse(result.rows[0], corsHeaders, 201)
    }

    // GET /consultations (protected stub)
    if (path === 'consultations' && method === 'GET') {
      const authHeader = request.headers.get('Authorization')
      if (!authHeader?.startsWith('Bearer ')) {
        return jsonResponse({ error: 'Unauthorized' }, corsHeaders, 401)
      }
      const result = await withDb(dbUrl, (db) =>
        db.query('SELECT * FROM consultations ORDER BY created_at DESC')
      )
      return jsonResponse(result.rows, corsHeaders)
    }

    // GET /profiles
    if (path === 'profiles' && method === 'GET') {
      const result = await withDb(dbUrl, (db) =>
        db.query('SELECT * FROM profiles ORDER BY created_at DESC')
      )
      return jsonResponse(result.rows, corsHeaders)
    }

    // GET /profiles/:id
    if (path.startsWith('profiles/') && method === 'GET') {
      const id = path.replace('profiles/', '')
      const result = await withDb(dbUrl, (db) =>
        db.query('SELECT * FROM profiles WHERE id = $1', [id])
      )
      return jsonResponse(result.rows[0] || null, corsHeaders)
    }

    // Health check
    if (path === '' || path === '/') {
      return jsonResponse({ status: 'ok', service: 'loakim-api' }, corsHeaders)
    }

    return jsonResponse({ error: 'Not found' }, corsHeaders, 404)

  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal server error'
    return jsonResponse({ error: message }, corsHeaders, 500)
  }
}

function jsonResponse(data: unknown, headers: Record<string, string>, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...headers },
  })
}
