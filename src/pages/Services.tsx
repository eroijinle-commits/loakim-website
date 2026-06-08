import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2, FileText, Repeat, Zap } from 'lucide-react'
import SEO from '@/components/SEO'
import ScrollReveal from '@/components/ScrollReveal'
import { getServices } from '@/lib/api/services-api'
import type { Service } from '@/lib/types'

const fallbackBrandServices = [
  { title: 'Brand Audit & Health Assessment', description: 'Comprehensive evaluation of brand equity, positioning, and competitive landscape. We diagnose before we prescribe.' },
  { title: 'Brand Positioning & Messaging', description: 'Crafting distinctive market positions and messaging architectures that differentiate and resonate with target audiences.' },
  { title: 'Visual Identity & Brand Design', description: 'Logo systems, brand guidelines, packaging design, and complete visual ecosystems that communicate value instantly.' },
  { title: 'Brand Architecture & Portfolio', description: 'Structuring multi-brand portfolios for clarity, synergy, and maximum market coverage without cannibalization.' },
  { title: 'Employer Brand Strategy', description: 'Building internal brand culture that attracts, retains, and motivates top talent in competitive markets.' },
]

const fallbackRetailServices = [
  { title: 'Merchandising Strategy & Visual Execution', description: 'Planogram development, in-store visual strategy, product placement, and shelf optimisation for maximum conversion.' },
  { title: 'Sales Activation & Promotions', description: 'Promotional mechanics design, in-store activation planning, and trade marketing strategy for retail and pharmacy channels.' },
  { title: 'BTL Advertising & Experiential', description: 'Experiential marketing, POS/POP material design, brand ambassador management, and roadshows across Lagos and key markets.' },
]

const fallbackDigitalServices = [
  { title: 'Social Media Strategy & Management', description: 'Platform strategy, content calendar development, community management, and influencer campaign management across all major platforms.' },
  { title: 'SEO, SEM & Performance Marketing', description: 'Search engine optimisation, Google Ads management, email/SMS marketing, and conversion rate optimisation for e-commerce.' },
  { title: 'AI-Powered Marketing & Content Innovation', description: 'Generative AI for content creation, AI-assisted market research, marketing automation, and data analytics dashboards.' },
]

const fallbackEventServices = [
  { title: 'Event Marketing & Brand Activations', description: 'End-to-end event production for brand launches, trade events, consumer activations, and large-scale experiential campaigns.' },
  { title: 'Project & Campaign Management', description: 'Full campaign project management from brief to post-mortem, agency coordination, budget tracking, and cross-departmental delivery.' },
]

const engagementModels = [
  {
    icon: FileText,
    title: 'Project-Based',
    subtitle: 'Fixed scope, defined deliverables',
    description: 'Best for campaigns, launches, and audits. Fixed scope with milestone payments and capped revisions.',
    structure: '50/25/25 payment milestones',
    features: ['Defined deliverables', 'Fixed timeline', 'Milestone payments', '2 revision rounds included'],
  },
  {
    icon: Repeat,
    title: 'Retainer',
    subtitle: 'Monthly fee, ongoing management',
    description: 'Priority scheduling and discounted project rates. Monthly deliverables outlined in a Service Level Agreement.',
    structure: '3–12 month contracts',
    features: ['Priority scheduling', 'Discounted project rates', 'Monthly SLA', 'Quarterly strategy sessions'],
  },
  {
    icon: Zap,
    title: 'Performance',
    subtitle: 'Base fee + KPI bonuses',
    description: 'Our incentives align with your outcomes. Base fee plus performance bonuses tied to pre-agreed revenue and conversion KPIs.',
    structure: 'Base + KPI bonus',
    features: ['Revenue-linked bonuses', 'Verified baseline data', 'Monthly performance tracking', 'Aligned incentives'],
  },
]

export default function Services() {
  const [apiServices, setApiServices] = useState<Service[]>([])

  useEffect(() => {
    getServices()
      .then((services) => setApiServices(services))
      .catch(() => setApiServices([]))
  }, [])

  const brandServices = apiServices.filter((s) => s.category === 'brand-strategy').length > 0
    ? apiServices.filter((s) => s.category === 'brand-strategy').map((s) => ({ title: s.title, description: s.description || '' }))
    : fallbackBrandServices

  const retailServices = apiServices.filter((s) => s.category === 'retail-marketing').length > 0
    ? apiServices.filter((s) => s.category === 'retail-marketing').map((s) => ({ title: s.title, description: s.description || '' }))
    : fallbackRetailServices

  const digitalServices = apiServices.filter((s) => s.category === 'digital-marketing').length > 0
    ? apiServices.filter((s) => s.category === 'digital-marketing').map((s) => ({ title: s.title, description: s.description || '' }))
    : fallbackDigitalServices

  const eventServices = apiServices.filter((s) => s.category === 'events').length > 0
    ? apiServices.filter((s) => s.category === 'events').map((s) => ({ title: s.title, description: s.description || '' }))
    : fallbackEventServices

  return (
    <>
      <SEO
        title="Services"
        description="Explore Loakim Integrated Services' four service pillars: Brand Strategy, Retail Marketing, Digital Growth, and Event Management. Flexible engagement models: Project, Retainer, and Performance-based."
        keywords="brand strategy Nigeria, retail marketing, digital marketing Lagos, event management, brand audit, merchandising, SEO, social media management"
      />

      {/* Hero */}
      <section className="pt-32 pb-16 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <p className="section-label mb-4">SA</p>
            <h1 className="heading-xl mb-6">Service Architecture</h1>
            <p className="body-lg max-w-3xl">
              The Integration Matrix. Our services operate as a unified loop — each pillar feeds into and strengthens the others, delivering compounding results.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Brand Strategy */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-10">
              <span className="text-6xl font-bold text-loakim-gold/20">01</span>
              <div>
                <h2 className="heading-md text-white">Brand Strategy & Management</h2>
                <p className="text-loakim-gray text-sm mt-1">The foundation of every successful brand</p>
              </div>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {brandServices.map((service, index) => (
              <ScrollReveal key={service.title} delay={index * 0.1}>
                <div className="p-6 bg-loakim-charcoal/30 border border-loakim-border rounded-xl hover:border-loakim-gold/20 transition-all duration-300 h-full">
                  <h3 className="text-white font-semibold text-base mb-3">{service.title}</h3>
                  <p className="text-loakim-gray text-sm leading-relaxed">{service.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Retail Marketing */}
      <section className="py-16 bg-loakim-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-10">
              <span className="text-6xl font-bold text-loakim-gold/20">02</span>
              <div>
                <h2 className="heading-md text-white">Retail Marketing & In-Store Activation</h2>
                <p className="text-loakim-gray text-sm mt-1">Turning physical spaces into conversion engines</p>
              </div>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {retailServices.map((service, index) => (
              <ScrollReveal key={service.title} delay={index * 0.1}>
                <div className="p-6 bg-loakim-black border border-loakim-border rounded-xl hover:border-loakim-gold/20 transition-all duration-300 h-full">
                  <h3 className="text-white font-semibold text-base mb-3">{service.title}</h3>
                  <p className="text-loakim-gray text-sm leading-relaxed">{service.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Digital Marketing */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-10">
              <span className="text-6xl font-bold text-loakim-gold/20">03</span>
              <div>
                <h2 className="heading-md text-white">Digital Marketing & Demand Generation</h2>
                <p className="text-loakim-gray text-sm mt-1">Measurable demand, every channel</p>
              </div>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {digitalServices.map((service, index) => (
              <ScrollReveal key={service.title} delay={index * 0.1}>
                <div className="p-6 bg-loakim-charcoal/30 border border-loakim-border rounded-xl hover:border-loakim-gold/20 transition-all duration-300 h-full">
                  <h3 className="text-white font-semibold text-base mb-3">{service.title}</h3>
                  <p className="text-loakim-gray text-sm leading-relaxed">{service.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Events */}
      <section className="py-16 bg-loakim-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-10">
              <span className="text-6xl font-bold text-loakim-gold/20">04</span>
              <div>
                <h2 className="heading-md text-white">Events & Project Management</h2>
                <p className="text-loakim-gray text-sm mt-1">Orchestrating moments that create market impact</p>
              </div>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-6">
            {eventServices.map((service, index) => (
              <ScrollReveal key={service.title} delay={index * 0.1}>
                <div className="p-6 bg-loakim-black border border-loakim-border rounded-xl hover:border-loakim-gold/20 transition-all duration-300 h-full">
                  <h3 className="text-white font-semibold text-base mb-3">{service.title}</h3>
                  <p className="text-loakim-gray text-sm leading-relaxed">{service.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Engagement Models */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <p className="section-label mb-4">EM</p>
            <h2 className="heading-lg mb-4">Flexible Billing.</h2>
            <p className="body-md mb-16 max-w-2xl">
              Three engagement models designed to match your risk appetite, budget structure, and growth stage.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {engagementModels.map((model, index) => (
              <ScrollReveal key={model.title} delay={index * 0.15}>
                <div className="p-8 bg-loakim-charcoal/30 border border-loakim-border rounded-2xl hover:border-loakim-gold/20 transition-all duration-300 h-full flex flex-col">
                  <div className="w-12 h-12 bg-loakim-gold/10 rounded-xl flex items-center justify-center mb-6">
                    <model.icon size={24} className="text-loakim-gold" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-1">{model.title}</h3>
                  <p className="text-loakim-gold text-sm font-medium mb-4">{model.subtitle}</p>
                  <p className="text-loakim-gray text-sm leading-relaxed mb-6 flex-1">{model.description}</p>
                  <div className="p-3 bg-loakim-dark rounded-lg mb-6">
                    <span className="text-xs text-loakim-gray uppercase tracking-wider">Structure</span>
                    <p className="text-white text-sm font-medium mt-1">{model.structure}</p>
                  </div>
                  <ul className="space-y-2 mb-8">
                    {model.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-loakim-lightgray">
                        <CheckCircle2 size={14} className="text-loakim-gold shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/consult"
                    className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 bg-loakim-gold text-loakim-black font-semibold rounded-lg hover:bg-loakim-goldlight transition-colors text-sm"
                  >
                    Discuss Your Engagement
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
