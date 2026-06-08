import { Hono } from 'hono'
import { Client } from '@neondatabase/serverless'
import { cors } from 'hono/cors'

type Env = {
  DATABASE_URL: string
}

const app = new Hono<{ Bindings: Env }>()

// CORS — allow requests from your Cloudflare Pages domain
app.use('*', cors({
  origin: ['http://localhost:5173', 'https://loakim.pages.dev', 'https://loakim-website.pages.dev'],
  allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}))

// Health check
app.get('/', (c) => c.json({ status: 'ok', service: 'loakim-api' }))

// DB helper
async function withDb<T>(databaseUrl: string, fn: (db: Client) => Promise<T>): Promise<T> {
  const client = new Client(databaseUrl)
  await client.connect()
  try {
    return await fn(client)
  } finally {
    await client.end()
  }
}

// ============================================================
// SERVICES
// ============================================================
app.get('/services', async (c) => {
  const result = await withDb(c.env.DATABASE_URL, (db) =>
    db.query(
      'SELECT * FROM services WHERE is_active = true ORDER BY order_index ASC'
    )
  )
  return c.json(result.rows)
})

app.get('/services/category/:category', async (c) => {
  const category = c.param('category')
  const result = await withDb(c.env.DATABASE_URL, (db) =>
    db.query(
      'SELECT * FROM services WHERE category = $1 AND is_active = true ORDER BY order_index ASC',
      [category]
    )
  )
  return c.json(result.rows)
})

app.get('/services/:id', async (c) => {
  const id = c.param('id')
  const result = await withDb(c.env.DATABASE_URL, (db) =>
    db.query(
      'SELECT * FROM services WHERE id = $1',
      [id]
    )
  )
  return c.json(result.rows[0] || null)
})

// ============================================================
// CASE STUDIES
// ============================================================
app.get('/case-studies', async (c) => {
  const result = await withDb(c.env.DATABASE_URL, (db) =>
    db.query(
      'SELECT * FROM case_studies WHERE is_active = true ORDER BY display_order ASC'
    )
  )
  return c.json(result.rows)
})

app.get('/case-studies/featured', async (c) => {
  const result = await withDb(c.env.DATABASE_URL, (db) =>
    db.query(
      'SELECT * FROM case_studies WHERE is_featured = true AND is_active = true ORDER BY display_order ASC'
    )
  )
  return c.json(result.rows)
})

app.get('/case-studies/:id', async (c) => {
  const id = c.param('id')
  const result = await withDb(c.env.DATABASE_URL, (db) =>
    db.query(
      'SELECT * FROM case_studies WHERE id = $1',
      [id]
    )
  )
  return c.json(result.rows[0] || null)
})

// ============================================================
// SITE CONTENT
// ============================================================
app.get('/site-content/:key', async (c) => {
  const key = c.param('key')
  const result = await withDb(c.env.DATABASE_URL, (db) =>
    db.query(
      'SELECT * FROM site_content WHERE section_key = $1',
      [key]
    )
  )
  return c.json(result.rows[0] || null)
})

app.get('/site-content', async (c) => {
  const result = await withDb(c.env.DATABASE_URL, (db) =>
    db.query('SELECT * FROM site_content')
  )
  return c.json(result.rows)
})

// ============================================================
// CONSULTATIONS (Public insert)
// ============================================================
app.post('/consultations', async (c) => {
  const body = await c.req.json<{
    full_name: string
    email: string
    phone?: string
    company_name?: string
    selected_services: string[]
    budget_range?: string
    timeline?: string
    project_details?: string
  }>()

  const result = await withDb(c.env.DATABASE_URL, (db) =>
    db.query(
      `INSERT INTO consultations
       (full_name, email, phone, company_name, selected_services, budget_range, timeline, project_details, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'new')
       RETURNING *`,
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

  return c.json(result.rows[0], 201)
})

// Protected: list consultations (requires auth header check — placeholder)
app.get('/consultations', async (c) => {
  // TODO: Add Clerk JWT verification here when auth is migrated
  const authHeader = c.req.header('Authorization')
  if (!authHeader) {
    return c.json({ error: 'Unauthorized' }, 401)
  }

  const result = await withDb(c.env.DATABASE_URL, (db) =>
    db.query(
      'SELECT * FROM consultations ORDER BY created_at DESC'
    )
  )
  return c.json(result.rows)
})

// ============================================================
// PROFILES
// ============================================================
app.get('/profiles', async (c) => {
  const result = await withDb(c.env.DATABASE_URL, (db) =>
    db.query('SELECT * FROM profiles ORDER BY created_at DESC')
  )
  return c.json(result.rows)
})

app.get('/profiles/:id', async (c) => {
  const id = c.param('id')
  const result = await withDb(c.env.DATABASE_URL, (db) =>
    db.query('SELECT * FROM profiles WHERE id = $1', [id])
  )
  return c.json(result.rows[0] || null)
})

export default app
