import { Link } from 'react-router-dom'
import { ArrowRight, TrendingUp, BarChart3, ShoppingCart, Users } from 'lucide-react'
import SEO from '@/components/SEO'
import ScrollReveal from '@/components/ScrollReveal'

const caseStudies = [
  {
    metric: '₦126M',
    metricLabel: 'H1 Revenue Generated',
    client: 'Healthcare Retail Chain',
    sector: 'Pharmaceutical / Retail',
    description: 'Developed and executed an integrated retail marketing programme combining in-store activations, digital demand generation, and brand repositioning across 40+ retail locations.',
    services: ['Retail Activation', 'Digital Marketing', 'Brand Strategy'],
    icon: TrendingUp,
  },
  {
    metric: '+42%',
    metricLabel: 'In-Store Conversion',
    client: 'FMCG Brand',
    sector: 'Consumer Goods',
    description: 'Designed and deployed a comprehensive trade marketing programme with retail visibility upgrades, staff training, and mystery shopping audits across modern trade channels.',
    services: ['Trade Marketing', 'Retail Audits', 'Merchandising'],
    icon: ShoppingCart,
  },
  {
    metric: '3.2x',
    metricLabel: 'Return on Ad Spend',
    client: 'E-Commerce Platform',
    sector: 'Technology / Retail',
    description: 'Built and optimised a full-funnel digital acquisition strategy including paid social, Google Ads, SEO, and email lifecycle campaigns driving sustainable revenue growth.',
    services: ['Paid Media', 'SEO', 'Email Marketing'],
    icon: BarChart3,
  },
  {
    metric: '+67%',
    metricLabel: 'Social Media Growth',
    client: 'Education Provider',
    sector: 'EdTech',
    description: 'Created a brand-led social media strategy with content calendars, community management, and influencer partnerships that dramatically expanded digital reach.',
    services: ['Social Strategy', 'Content Marketing', 'Brand Management'],
    icon: Users,
  },
]

export default function Results() {
  return (
    <>
      <SEO
        title="Results & Case Studies"
        description="Evidence-based results from Loakim Integrated Services engagements. Verified commercial impact across healthcare retail, FMCG, e-commerce, and education sectors in Nigeria."
        keywords="marketing results Nigeria, brand growth case study, retail marketing ROI, FMCG conversion uplift, e-commerce ROAS, social media growth"
      />

      {/* Hero */}
      <section className="pt-32 pb-16 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <p className="section-label mb-4">IF</p>
            <h1 className="heading-xl mb-6">Intelligence Feed</h1>
            <p className="body-lg max-w-3xl">
              Measured Impact. Evidence-based results from our engagements. Every figure is verified, every outcome is measurable.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-16 pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {caseStudies.map((study, index) => (
              <ScrollReveal key={study.client} delay={index * 0.15}>
                <div className="group p-8 lg:p-10 bg-loakim-charcoal/30 border border-loakim-border rounded-2xl hover:border-loakim-gold/20 transition-all duration-300 h-full">
                  <div className="flex items-start justify-between mb-8">
                    <div>
                      <span className="text-5xl lg:text-6xl font-bold text-gradient-gold block mb-2">
                        {study.metric}
                      </span>
                      <span className="text-white font-medium text-sm">{study.metricLabel}</span>
                    </div>
                    <div className="w-12 h-12 bg-loakim-gold/10 rounded-xl flex items-center justify-center">
                      <study.icon size={24} className="text-loakim-gold" />
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-white mb-1">{study.client}</h3>
                    <span className="text-loakim-gold text-xs font-medium uppercase tracking-wider">{study.sector}</span>
                  </div>

                  <p className="text-loakim-gray text-sm leading-relaxed mb-6">
                    {study.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {study.services.map((service) => (
                      <span
                        key={service}
                        className="px-3 py-1 text-xs font-medium text-loakim-lightgray bg-loakim-dark border border-loakim-border rounded-full"
                      >
                        {service}
                      </span>
                    ))}
                  </div>

                  <Link
                    to="/consult"
                    className="inline-flex items-center gap-2 text-loakim-gold text-sm font-medium hover:text-loakim-goldlight transition-colors group/link"
                  >
                    Discuss Similar Results
                    <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-loakim-dark">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="heading-md mb-6">Your Results Could Be Here Next</h2>
            <p className="body-md mb-8 max-w-xl mx-auto">
              Every engagement starts with a diagnostic. Let's identify your growth trajectory and build a strategy that delivers measurable commercial impact.
            </p>
            <Link
              to="/consult"
              className="inline-flex items-center gap-2 px-8 py-4 bg-loakim-gold text-loakim-black font-semibold rounded-lg hover:bg-loakim-goldlight transition-colors"
            >
              Start Your Diagnostic
              <ArrowRight size={18} />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
