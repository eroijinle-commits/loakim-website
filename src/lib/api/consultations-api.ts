import { supabase } from '../supabase'
import type { Consultation } from '../supabase'

export interface ConsultationInput {
  full_name: string
  email: string
  phone?: string
  company_name?: string
  selected_services: string[]
  budget_range?: string
  timeline?: string
  project_details?: string
}

export async function submitConsultation(input: ConsultationInput): Promise<Consultation> {
  const { data, error } = await supabase
    .from('consultations')
    .insert({
      full_name: input.full_name,
      email: input.email,
      phone: input.phone || null,
      company_name: input.company_name || null,
      selected_services: input.selected_services,
      budget_range: input.budget_range || null,
      timeline: input.timeline || null,
      project_details: input.project_details || null,
      status: 'new',
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getConsultations(): Promise<Consultation[]> {
  const { data, error } = await supabase
    .from('consultations')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

export async function getConsultationById(id: string): Promise<Consultation | null> {
  const { data, error } = await supabase
    .from('consultations')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

export async function updateConsultationStatus(id: string, status: string, notes?: string): Promise<Consultation> {
  const updateData: Record<string, unknown> = { status }
  if (notes) updateData.notes = notes

  const { data, error } = await supabase
    .from('consultations')
    .update(updateData)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}
