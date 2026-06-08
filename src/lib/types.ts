export type Service = {
  id: string
  title: string
  category: string
  description: string | null
  sub_services: string[]
  icon: string | null
  order_index: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export type CaseStudy = {
  id: string
  client_name: string
  sector: string
  metric_value: string
  metric_label: string
  description: string | null
  services_used: string[]
  image_url: string | null
  display_order: number
  is_featured: boolean
  is_active: boolean
  created_at: string
  updated_at: string
}

export type Consultation = {
  id: string
  full_name: string
  email: string
  phone: string | null
  company_name: string | null
  selected_services: string[]
  budget_range: string | null
  timeline: string | null
  project_details: string | null
  status: string
  notes: string | null
  created_at: string
  updated_at: string
}

export type SiteContent = {
  id: string
  section_key: string
  content: Record<string, unknown>
  updated_at: string
}

export type Profile = {
  id: string
  full_name: string | null
  company_name: string | null
  role: string
  avatar_url: string | null
  phone: string | null
  created_at: string
  updated_at: string
}
