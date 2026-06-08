import { Link } from 'react-router-dom'
import { ArrowRight, Award, Target, Users, Building2, Lightbulb, Shield } from 'lucide-react'
import SEO from '@/components/SEO'
import ScrollReveal from '@/components/ScrollReveal'

const differentiators = [
  {
    icon: Target,
    title: 'Strategy Anchored in Revenue',
    description: 'We do not just build awareness — we build sales. Every strategy starts and ends with commercial impact, not vanity metrics.',
  },
  {
    icon: Users,
    title: 'Founder-Led Senior Involvement',
    description: 'You work directly with senior strategists with 10+ years inside retail pharmacy, FMCG, fashion, and events — not junior account managers learning on your budget.',
  },
  {
    icon: Building2,
    title: 'True Integration',
    description: 'Digital, trade, retail, BTL, and events — all orchestrated as one unified system. Rare in Nigeria, where agencies typically do one or the other.',
  },
  {
    icon: Shield,
    title: 'Unmatched Health Retail Depth',
    description: 'Deep expertise in pharmacy, wellness, and beauty retail built from years inside HealthPlus, MedPlus, and mPharma operations.',
  },
  {
    icon: Lightbulb,
    title: 'Sector-Specific Insight',
    description: 'Generic campaign templates are replaced with sector-specific insight from 10+ years inside the brands we now serve.',
  },
  {
    icon: Award,
    title: 'Sales & Conversion as KPI',
    description: 'Awareness metrics are secondary. Sales, conversion, and revenue growth are the primary measures of success.',
  },
]

const targetSectors = [
  { name: 'Retail Pharmacy & Health', description: 'Chains, wellness brands, OTC products, beauty pharmacy hybrids' },
  { name: 'FMCG & Consumer Goods', description: 'Skincare, personal care, food & beverage, household goods' },
  { name: 'Fashion & Lifestyle Retail', description: 'Multi-brand retailers, D2C fashion labels, beauty and grooming' },
  { name: 'Education & EdTech', description: 'Private institutions, professional training bodies, bootcamps' },
  { name: 'Hospitality & Events', description: 'Hotels, restaurants, experience brands, event promoters' },
  { name: 'Healthcare & Wellness', description: 'Private hospitals, clinics, health insurance brands, wellness platforms' },
]

export default function About() {
  return (
    <>
      <SEO
        title="About"
        description="Loakim Integrated Services is a founder-led brand growth consultancy built on 10+ years of experience across retail pharmacy, FMCG, fashion, events, and brand consulting in Nigeria."
        keywords="about Loakim, Temitope Oladapo, brand consultancy Nigeria, Lagos marketing agency founder, retail pharmacy marketing expert"
      />

      {/* Hero */}
      <section className="pt-32 pb-16 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <p className="section-label mb-4">About</p>
            <h1 className="heading-xl mb-6">Not Another Agency.</h1>
            <p className="body-lg max-w-3xl">
              Built on 10+ years across retail pharmacy, FMCG, fashion, events, and brand consulting. We bridge the gap between brand strategy and measurable sales outcomes in Nigerian markets.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <ScrollReveal>
              <div className="p-8 lg:p-10 bg-loakim-charcoal/30 border border-loakim-border rounded-2xl h-full">
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-loakim-gold mb-4 block">Mission</span>
                <p className="text-lg text-loakim-lightgray leading-relaxed">
                  To help Nigerian and pan-African brands grow revenue, build loyalty, and dominate their categories through integrated marketing strategy, bold creative communications, and data-driven execution — both online and in brick-and-mortar environments.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <div className="p-8 lg:p-10 bg-loakim-charcoal/30 border border-loakim-border rounded-2xl h-full">
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-loakim-gold mb-4 block">Vision</span>
                <p className="text-lg text-loakim-lightgray leading-relaxed">
                  To become Nigeria's most trusted brand-growth consultancy, known for delivering measurable outcomes rather than just campaigns. The agency that brands call when they need to move the needle.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Differentiators */}
      <section className="py-24 bg-loakim-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="heading-lg mb-4">What Sets Us Apart</h2>
            <p className="body-md mb-16 max-w-2xl">
              The difference between generic agencies and a consultancy built from inside the industries it serves.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {differentiators.map((item, index) => (
              <ScrollReveal key={item.title} delay={index * 0.1}>
                <div className="p-6 bg-loakim-black border border-loakim-border rounded-xl hover:border-loakim-gold/20 transition-all duration-300 h-full">
                  <div className="w-10 h-10 bg-loakim-gold/10 rounded-lg flex items-center justify-center mb-4">
                    <item.icon size={20} className="text-loakim-gold" />
                  </div>
                  <h3 className="text-white font-semibold text-base mb-3">{item.title}</h3>
                  <p className="text-loakim-gray text-sm leading-relaxed">{item.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Target Sectors */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="heading-lg mb-4">Priority Sectors</h2>
            <p className="body-md mb-16 max-w-2xl">
              Our competitive advantage lies in deep sector knowledge. We lead with pharmacy, FMCG, and retail credentials to attract clients where generic agencies struggle to add real value.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {targetSectors.map((sector, index) => (
              <ScrollReveal key={sector.name} delay={index * 0.1}>
                <div className="p-6 bg-loakim-charcoal/30 border border-loakim-border rounded-xl hover:border-loakim-gold/20 transition-all duration-300">
                  <h3 className="text-white font-semibold text-base mb-2">{sector.name}</h3>
                  <p className="text-loakim-gray text-sm">{sector.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team / Structure */}
      <section className="py-24 bg-loakim-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="heading-lg mb-4">Lean Consultancy Model</h2>
            <p className="body-md mb-16 max-w-2xl">
              In Year 1, we operate as a founder-led consultancy with a tight network of specialist freelancers. This keeps overheads low while maintaining premium quality.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { role: 'Founder / Managing Consultant', desc: 'Strategy, client relationships, brand direction' },
              { role: 'Senior Graphic Designer', desc: 'Visual execution across all clients (retained freelancer)' },
              { role: 'Digital Marketing Specialist', desc: 'SEO, paid media, social management (retained freelancer)' },
              { role: 'Copywriter / Content Strategist', desc: 'Campaign copy and brand voice (retained freelancer)' },
            ].map((member, index) => (
              <ScrollReveal key={member.role} delay={index * 0.1}>
                <div className="p-6 bg-loakim-black border border-loakim-border rounded-xl text-center">
                  <div className="w-16 h-16 bg-loakim-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users size={24} className="text-loakim-gold" />
                  </div>
                  <h3 className="text-white font-semibold text-sm mb-2">{member.role}</h3>
                  <p className="text-loakim-gray text-xs">{member.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="heading-md mb-6">Ready to Work With Us?</h2>
            <p className="body-md mb-8 max-w-xl mx-auto">
              Start with a free 45-minute Brand Diagnostic. A strategic assessment that maps your growth trajectory and converts into a paid engagement.
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
