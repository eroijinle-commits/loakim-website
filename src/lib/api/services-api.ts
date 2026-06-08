import { request } from './api-client'
import type { Service, CaseStudy, SiteContent } from '../types'

// ============================================================
// SERVICES API
// ============================================================

export async function getServices(): Promise<Service[]> {
  return request('/services')
}

export async function getServicesByCategory(category: string): Promise<Service[]> {
  return request(`/services/category/${encodeURIComponent(category)}`)
}

export async function getServiceById(id: string): Promise<Service | null> {
  return request(`/services/${encodeURIComponent(id)}`)
}

// ============================================================
// CASE STUDIES API
// ============================================================

export async function getCaseStudies(): Promise<CaseStudy[]> {
  return request('/case-studies')
}

export async function getFeaturedCaseStudies(): Promise<CaseStudy[]> {
  return request('/case-studies/featured')
}

export async function getCaseStudyById(id: string): Promise<CaseStudy | null> {
  return request(`/case-studies/${encodeURIComponent(id)}`)
}

// ============================================================
// SITE CONTENT API
// ============================================================

export async function getSiteContent(sectionKey: string): Promise<SiteContent | null> {
  return request(`/site-content/${encodeURIComponent(sectionKey)}`)
}

export async function getAllSiteContent(): Promise<SiteContent[]> {
  return request('/site-content')
}
