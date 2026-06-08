import { Link } from 'react-router-dom'
import { ArrowRight, TrendingUp, ShoppingBag, Globe, Calendar } from 'lucide-react'
import SEO from '@/components/SEO'
import ScrollReveal from '@/components/ScrollReveal'

const heroServices = [
  { icon: TrendingUp, label: 'Brand Strategy', href: '/services' },
  { icon: ShoppingBag, label: 'Retail Activation', href: '/services' },
  { icon: Globe, label: 'Digital Growth', href: '/services' },
  { icon: Calendar, label: 'Event Management', href: '/services' },
]

const impactStats = [
  { value: '₦126M', label: 'Revenue Generated H1 2024', sector: 'Healthcare / Retail' },
  { value: '+42%', label: 'In-Store Conversion Uplift', sector: 'FMCG' },
  { value: '3.2x', label: 'ROAS on Digital Campaigns', sector: 'E-Commerce' },
  { value: '18', label: 'Brand Launches Delivered', sector: 'Cross-Sector' },
  { value: '+67%', label: 'Social Media Growth', sector: 'Lifestyle' },
]

const whyLoakim = [
  {
    number: '01',
    title: 'Outcome-Obsessed',
    description: 'We tie every deliverable to a measurable commercial KPI. No vanity metrics, no vague reports.',
  },
  {
    number: '02',
    title: 'Founder-Led Strategy',
    description: 'You work directly with senior strategists, not junior account managers learning on your budget.',
  },
  {
    number: '03',
    title: 'Retail & Digital Integrated',
    description: 'We bridge physical retail and digital — rare in Nigeria, where agencies typically do one or the other.',
  },
  {
    number: '04',
    title: 'Transparent Billing',
    description: 'Project, retainer, or performance-based — we offer flexible pricing that aligns our incentives with yours.',
  },
  {
    number: '05',
    title: 'Data-Rich Reporting',
    description: 'Monthly reports with verifiable ROI data. You always know what your investment produced.',
  },
]

const servicePillars = [
  {
    number: '01',
    title: 'Brand Strategy & Management',
    description: 'Brand audits, positioning, identity, and architecture. We engineer the DNA of brands built for long-term market dominance.',
    capabilities: ['Brand Audit', 'Positioning', 'Visual Identity', 'Architecture'],
  },
  {
    number: '02',
    title: 'Retail Marketing & In-Store Activation',
    description: 'Trade programmes, retail visibility, in-store activation, and mystery audits. We turn physical spaces into conversion engines.',
    capabilities: ['Trade Marketing', 'Retail Visibility', 'Merchandising', 'Audits'],
  },
  {
    number: '03',
    title: 'Digital Marketing & Demand Generation',
    description: 'Social strategy, paid media, SEO, email campaigns, and e-commerce growth. We generate demand and measure every outcome.',
    capabilities: ['Social Strategy', 'Paid Media', 'SEO', 'E-Commerce'],
  },
  {
    number: '04',
    title: 'Events & Project Management',
    description: 'Brand launches, activations, conferences, and experiential campaigns. We orchestrate moments that create market impact.',
    capabilities: ['Brand Launches', 'Conferences', 'Activations', 'Experiential'],
  },
]

export default function Home() {
  return (
    <>
      <SEO
        title="Brand Growth Consultancy Nigeria"
        description="Loakim Integrated Services — A high-fidelity brand growth consultancy delivering commercial outcomes through integrated strategy, retail activation, digital growth, and event management in Nigeria."
        keywords="brand strategy, retail marketing, digital marketing, event management, brand consultancy Nigeria, Lagos marketing agency, FMCG marketing, healthcare retail"
      />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-loakim-dark via-loakim-black to-loakim-black" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-loakim-gold/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-loakim-gold/10 rounded-full blur-[150px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20 text-center">
          <ScrollReveal>
            <p className="section-label mb-6">Integrated Services</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="heading-xl max-w-4xl mx-auto mb-8">
              We don't just build awareness —{' '}
              <span className="text-gradient-gold">we build sales.</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="body-lg max-w-2xl mx-auto mb-12">
              Every strategy, campaign, and activation we deliver is anchored in commercial outcomes. Integrated precision. Measurable results.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <div className="flex flex-wrap justify-center gap-4 mb-16">
              {heroServices.map((service) => (
                <Link
                  key={service.label}
                  to={service.href}
                  className="group flex items-center gap-3 px-6 py-4 bg-loakim-charcoal border border-loakim-border rounded-xl hover:border-loakim-gold/30 hover:bg-loakim-dark transition-all duration-300"
                >
                  <service.icon size={20} className="text-loakim-gold" />
                  <span className="text-sm font-medium text-loakim-lightgray group-hover:text-white transition-colors">
                    {service.label}
                  </span>
                  <ArrowRight size={14} className="text-loakim-gray group-hover:text-loakim-gold group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.4}>
            <Link
              to="/consult"
              className="inline-flex items-center gap-2 px-8 py-4 bg-loakim-gold text-loakim-black font-semibold rounded-lg hover:bg-loakim-goldlight transition-colors"
            >
              Begin Consultation
              <ArrowRight size={18} />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Service Architecture Section */}
      <section className="py-24 lg:py-32 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-4 lg:sticky lg:top-32">
              <ScrollReveal>
                <p className="section-label">02</p>
                <h2 className="heading-lg mb-6">
                  Service<br />Architecture
                </h2>
                <p className="body-md mb-8">
                  Four Pillars. One System. Our services aren't siloed — they operate as a unified system where each pillar reinforces the others.
                </p>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 text-loakim-gold font-medium text-sm hover:text-loakim-goldlight transition-colors group"
                >
                  Explore Full Service Matrix
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </ScrollReveal>
            </div>
            <div className="lg:col-span-8 space-y-8">
              {servicePillars.map((pillar, index) => (
                <ScrollReveal key={pillar.number} delay={index * 0.1}>
                  <div className="group p-8 bg-loakim-charcoal/50 border border-loakim-border rounded-2xl hover:border-loakim-gold/20 transition-all duration-300">
                    <div className="flex items-start gap-6">
                      <span className="text-4xl font-bold text-loakim-gold/30 shrink-0">{pillar.number}</span>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-loakim-gold transition-colors">
                          {pillar.title}
                        </h3>
                        <p className="text-loakim-gray text-sm leading-relaxed mb-5">
                          {pillar.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {pillar.capabilities.map((cap) => (
                            <span
                              key={cap}
                              className="px-3 py-1 text-xs font-medium text-loakim-lightgray bg-loakim-dark border border-loakim-border rounded-full"
                            >
                              {cap}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Impact Intelligence Section */}
      <section className="py-24 lg:py-32 bg-loakim-dark relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-loakim-gold/5 rounded-full blur-[200px]" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <p className="section-label">03</p>
            <h2 className="heading-lg mb-4">
              Results That<br />Move Markets.
            </h2>
            <p className="body-md mb-16 max-w-2xl">
              Every engagement is measured against pre-agreed KPIs. We don't just deliver campaigns — we deliver verifiable commercial impact.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {impactStats.map((stat, index) => (
              <ScrollReveal key={stat.label} delay={index * 0.1}>
                <div className="p-8 bg-loakim-black border border-loakim-border rounded-2xl hover:border-loakim-gold/20 transition-all duration-300 group">
                  <span className="text-4xl lg:text-5xl font-bold text-gradient-gold block mb-3">
                    {stat.value}
                  </span>
                  <span className="text-white font-medium text-sm block mb-1">{stat.label}</span>
                  <span className="text-loakim-gray text-xs">{stat.sector}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.5}>
            <div className="mt-12 text-center">
              <Link
                to="/results"
                className="inline-flex items-center gap-2 text-loakim-gold font-medium text-sm hover:text-loakim-goldlight transition-colors group"
              >
                View Case Studies
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Why Loakim Section */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <p className="section-label">04</p>
            <h2 className="heading-lg mb-16">
              Not Another<br />Agency.
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyLoakim.map((item, index) => (
              <ScrollReveal key={item.number} delay={index * 0.1}>
                <div className="p-8 bg-loakim-charcoal/30 border border-loakim-border rounded-2xl hover:bg-loakim-charcoal/50 transition-all duration-300 h-full">
                  <span className="text-5xl font-bold text-loakim-gold/20 block mb-4">{item.number}</span>
                  <h3 className="text-lg font-semibold text-white mb-3">{item.title}</h3>
                  <p className="text-loakim-gray text-sm leading-relaxed">{item.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Consult CTA Section */}
      <section className="py-24 lg:py-32 bg-loakim-dark relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-loakim-gold/10 rounded-full blur-[200px]" />
        </div>
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <ScrollReveal>
            <p className="section-label mb-4">The Consult Portal</p>
            <h2 className="heading-lg mb-6">
              Ready to Build<br />Something Real?
            </h2>
            <p className="body-lg mb-10 max-w-2xl mx-auto">
              Start with our free Brand Diagnostic — a 45-minute strategic assessment that maps your growth trajectory and identifies immediate revenue opportunities.
            </p>
            <Link
              to="/consult"
              className="inline-flex items-center gap-2 px-8 py-4 bg-loakim-gold text-loakim-black font-semibold rounded-lg hover:bg-loakim-goldlight transition-colors"
            >
              Begin Consultation
              <ArrowRight size={18} />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
