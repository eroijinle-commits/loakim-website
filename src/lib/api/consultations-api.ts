import { request } from './api-client'
import type { Consultation } from '../types'

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
  return request('/consultations', {
    method: 'POST',
    body: JSON.stringify(input),
  })
}

export async function getConsultations(): Promise<Consultation[]> {
  return request('/consultations')
}

export async function getConsultationById(id: string): Promise<Consultation | null> {
  return request(`/consultations/${encodeURIComponent(id)}`)
}
