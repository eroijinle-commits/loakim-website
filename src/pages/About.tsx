import { Link } from 'react-router-dom'
import { ArrowRight, Award, Target, Users, Building2, Lightbulb, Shield } from 'lucide-react'
import SEO from '@/components/SEO'
import ScrollReveal from '@/components/ScrollReveal'
import MonochromeDivider from '@/components/MonochromeDivider'

const differentiators = [
  {
    number: '01',
    icon: Target,
    title: 'Strategy Anchored in Revenue',
    description: 'We do not just build awareness — we build sales. Every strategy starts and ends with commercial impact, not vanity metrics.',
  },
  {
    number: '02',
    icon: Users,
    title: 'Founder-Led Senior Involvement',
    description: 'You work directly with senior strategists with 10+ years inside retail pharmacy, FMCG, fashion, and events — not junior account managers learning on your budget.',
  },
  {
    number: '03',
    icon: Building2,
    title: 'True Integration',
    description: 'Digital, trade, retail, BTL, and events — all orchestrated as one unified system. Rare in Nigeria, where agencies typically do one or the other.',
  },
  {
    number: '04',
    icon: Shield,
    title: 'Unmatched Health Retail Depth',
    description: 'Deep expertise in pharmacy, wellness, and beauty retail built from years inside HealthPlus, MedPlus, and mPharma operations.',
  },
  {
    number: '05',
    icon: Lightbulb,
    title: 'Sector-Specific Insight',
    description: 'Generic campaign templates are replaced with sector-specific insight from 10+ years inside the brands we now serve.',
  },
  {
    number: '06',
    icon: Award,
    title: 'Sales & Conversion as KPI',
    description: 'Awareness metrics are secondary. Sales, conversion, and revenue growth are the primary measures of success.',
  },
]

const targetSectors = [
  { number: '01', name: 'Retail Pharmacy & Health', description: 'Chains, wellness brands, OTC products, beauty pharmacy hybrids' },
  { number: '02', name: 'FMCG & Consumer Goods', description: 'Skincare, personal care, food & beverage, household goods' },
  { number: '03', name: 'Fashion & Lifestyle Retail', description: 'Multi-brand retailers, D2C fashion labels, beauty and grooming' },
  { number: '04', name: 'Education & EdTech', description: 'Private institutions, professional training bodies, bootcamps' },
  { number: '05', name: 'Hospitality & Events', description: 'Hotels, restaurants, experience brands, event promoters' },
  { number: '06', name: 'Healthcare & Wellness', description: 'Private hospitals, clinics, health insurance brands, wellness platforms' },
]

const teamMembers = [
  { number: '01', role: 'Founder / Managing Consultant', desc: 'Strategy, client relationships, brand direction' },
  { number: '02', role: 'Senior Graphic Designer', desc: 'Visual execution across all clients (retained freelancer)' },
  { number: '03', role: 'Digital Marketing Specialist', desc: 'SEO, paid media, social management (retained freelancer)' },
  { number: '04', role: 'Copywriter / Content Strategist', desc: 'Campaign copy and brand voice (retained freelancer)' },
]

export default function About() {
  return (
    <>
      <SEO
        title="About"
        description="Loakim Integrated Services is a founder-led brand growth consultancy built on 10+ years of experience across retail pharmacy, FMCG, fashion, events, and brand consulting in Nigeria."
        keywords="about Loakim, Temitope Oladapo, brand consultancy Nigeria, Lagos marketing agency founder, retail pharmacy marketing expert"
      />

      {/* Hero — Dark */}
      <section className="relative pt-32 pb-16 min-h-[60vh] flex items-center overflow-hidden bg-loakim-black">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-loakim-lime/5 rounded-full blur-[200px]" />
        <div className="absolute top-10 right-10 md:right-20">
          <span className="section-number">01</span>
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <p className="section-label mb-4">AB</p>
            <h1 className="heading-xl mb-6 text-white">Not Another Agency.</h1>
            <p className="body-lg-dark max-w-3xl">
              Built on 10+ years across retail pharmacy, FMCG, fashion, events, and brand consulting. We bridge the gap between brand strategy and measurable sales outcomes in Nigerian markets.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <MonochromeDivider imageUrl="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1920&auto=format&fit=crop" />

      {/* Mission & Vision — White */}
      <section className="py-24 bg-white relative">
        <div className="absolute top-10 right-10 md:right-20">
          <span className="section-number-dark">02</span>
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <p className="section-label-dark mb-8">CV</p>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-12">
            <ScrollReveal>
              <div className="p-8 lg:p-10 bg-white border border-gray-200 rounded-2xl shadow-sm h-full">
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-loakim-lime mb-4 block">Mission</span>
                <p className="text-lg text-gray-600 leading-relaxed">
                  To help Nigerian and pan-African brands grow revenue, build loyalty, and dominate their categories through integrated marketing strategy, bold creative communications, and data-driven execution — both online and in brick-and-mortar environments.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <div className="p-8 lg:p-10 bg-white border border-gray-200 rounded-2xl shadow-sm h-full">
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-loakim-lime mb-4 block">Vision</span>
                <p className="text-lg text-gray-600 leading-relaxed">
                  To become Nigeria's most trusted brand-growth consultancy, known for delivering measurable outcomes rather than just campaigns. The agency that brands call when they need to move the needle.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <MonochromeDivider imageUrl="https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?q=80&w=1920&auto=format&fit=crop" />

      {/* Differentiators — Dark */}
      <section className="py-24 bg-loakim-dark relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-loakim-lime/5 rounded-full blur-[200px]" />
        <div className="absolute top-10 right-10 md:right-20">
          <span className="section-number">03</span>
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <p className="section-label mb-4">DF</p>
            <h2 className="heading-lg mb-4 text-white">What Sets Us Apart</h2>
            <p className="body-md-dark mb-16 max-w-2xl">
              The difference between generic agencies and a consultancy built from inside the industries it serves.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {differentiators.map((item, index) => (
              <ScrollReveal key={item.title} delay={index * 0.1}>
                <div className="relative p-6 bg-loakim-black border border-loakim-border rounded-xl hover:border-loakim-lime/20 transition-all duration-300 h-full overflow-hidden">
                  <span className="absolute top-4 right-4 stroke-number-sm">{item.number}</span>
                  <div className="w-10 h-10 bg-loakim-lime/10 rounded-lg flex items-center justify-center mb-4">
                    <item.icon size={20} className="text-loakim-lime" />
                  </div>
                  <h3 className="text-white font-semibold text-base mb-3">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <MonochromeDivider imageUrl="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1920&auto=format&fit=crop" />

      {/* Target Sectors — White */}
      <section className="py-24 bg-white relative">
        <div className="absolute top-10 right-10 md:right-20">
          <span className="section-number-dark">04</span>
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <p className="section-label-dark mb-4">PS</p>
            <h2 className="heading-lg mb-4 text-gray-900">Priority Sectors</h2>
            <p className="body-md mb-16 max-w-2xl">
              Our competitive advantage lies in deep sector knowledge. We lead with pharmacy, FMCG, and retail credentials to attract clients where generic agencies struggle to add real value.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {targetSectors.map((sector, index) => (
              <ScrollReveal key={sector.name} delay={index * 0.1}>
                <div className="relative p-6 bg-white border border-gray-200 rounded-xl hover:border-loakim-lime/20 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
                  <span className="absolute top-4 right-4 stroke-number-sm-dark">{sector.number}</span>
                  <h3 className="text-gray-900 font-semibold text-base mb-2">{sector.name}</h3>
                  <p className="text-gray-500 text-sm">{sector.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <MonochromeDivider imageUrl="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1920&auto=format&fit=crop" />

      {/* Team / Structure — Dark */}
      <section className="py-24 bg-loakim-dark relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-loakim-lime/5 rounded-full blur-[200px]" />
        <div className="absolute top-10 right-10 md:right-20">
          <span className="section-number">05</span>
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <p className="section-label mb-4">TM</p>
            <h2 className="heading-lg mb-4 text-white">Lean Consultancy Model</h2>
            <p className="body-md-dark mb-16 max-w-2xl">
              In Year 1, we operate as a founder-led consultancy with a tight network of specialist freelancers. This keeps overheads low while maintaining premium quality.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <ScrollReveal key={member.role} delay={index * 0.1}>
                <div className="relative p-6 bg-loakim-black border border-loakim-border rounded-xl text-center overflow-hidden">
                  <span className="absolute top-4 right-4 stroke-number-sm">{member.number}</span>
                  <div className="w-16 h-16 bg-loakim-lime/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users size={24} className="text-loakim-lime" />
                  </div>
                  <h3 className="text-white font-semibold text-sm mb-2">{member.role}</h3>
                  <p className="text-gray-500 text-xs">{member.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <MonochromeDivider imageUrl="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1920&auto=format&fit=crop" />

      {/* CTA — White */}
      <section className="py-24 bg-white relative">
        <div className="absolute top-10 right-10 md:right-20">
          <span className="section-number-dark">06</span>
        </div>
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <ScrollReveal>
            <p className="section-label-dark mb-4">CT</p>
            <h2 className="heading-md mb-6 text-gray-900">Ready to Work With Us?</h2>
            <p className="body-md mb-8 max-w-xl mx-auto">
              Start with a free 45-minute Brand Diagnostic. A strategic assessment that maps your growth trajectory and converts into a paid engagement.
            </p>
            <Link
              to="/consult"
              className="inline-flex items-center gap-2 px-8 py-4 bg-loakim-lime text-gray-900 font-semibold rounded-lg hover:bg-loakim-limedark transition-colors"
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
