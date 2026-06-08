import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowLeft, CheckCircle2, Send, Check } from 'lucide-react'
import SEO from '@/components/SEO'
import ScrollReveal from '@/components/ScrollReveal'
import { submitConsultation } from '@/lib/api/consultations-api'

const serviceOptions = [
  { id: 'brand-audit', label: 'Brand Audit & Health Assessment', category: 'Brand Strategy' },
  { id: 'brand-positioning', label: 'Brand Positioning & Messaging', category: 'Brand Strategy' },
  { id: 'visual-identity', label: 'Visual Identity & Brand Design', category: 'Brand Strategy' },
  { id: 'brand-architecture', label: 'Brand Architecture & Portfolio', category: 'Brand Strategy' },
  { id: 'employer-brand', label: 'Employer Brand Strategy', category: 'Brand Strategy' },
  { id: 'merchandising', label: 'Merchandising Strategy & VM', category: 'Retail Marketing' },
  { id: 'sales-activation', label: 'Sales Activation & Promotions', category: 'Retail Marketing' },
  { id: 'btl-experiential', label: 'BTL & Experiential Marketing', category: 'Retail Marketing' },
  { id: 'social-media', label: 'Social Media Strategy & Management', category: 'Digital Marketing' },
  { id: 'seo-sem', label: 'SEO, SEM & Performance Marketing', category: 'Digital Marketing' },
  { id: 'ai-marketing', label: 'AI-Powered Marketing & Content', category: 'Digital Marketing' },
  { id: 'event-production', label: 'Event Marketing & Activations', category: 'Events' },
  { id: 'project-management', label: 'Project & Campaign Management', category: 'Events' },
]

const budgetRanges = [
  'NGN 250,000 – 500,000',
  'NGN 500,000 – 1,000,000',
  'NGN 1,000,000 – 2,500,000',
  'NGN 2,500,000 – 5,000,000',
  'NGN 5,000,000+',
  'Flexible / To be discussed',
]

const timelines = [
  'Immediate (within 2 weeks)',
  'Short-term (1–2 months)',
  'Medium-term (3–6 months)',
  'Long-term (6+ months)',
  'Ongoing / Retainer',
]

export default function Consult() {
  const [step, setStep] = useState(1)
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [budget, setBudget] = useState('')
  const [timeline, setTimeline] = useState('')
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    projectDetails: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    )
  }

  const canProceed = () => {
    if (step === 1) return selectedServices.length > 0
    if (step === 2) return budget && timeline
    if (step === 3) return formData.fullName && formData.email && formData.phone
    return true
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setSubmitError('')
    try {
      await submitConsultation({
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        company_name: formData.companyName,
        selected_services: selectedServices,
        budget_range: budget,
        timeline: timeline,
        project_details: formData.projectDetails,
      })
      setIsSubmitted(true)
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Failed to submit. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setStep(1)
    setSelectedServices([])
    setBudget('')
    setTimeline('')
    setFormData({ fullName: '', email: '', phone: '', companyName: '', projectDetails: '' })
    setIsSubmitted(false)
  }

  if (isSubmitted) {
    return (
      <>
        <SEO title="Consultation Submitted" description="Your consultation request has been received." />
        <section className="pt-32 pb-24 min-h-[70vh] flex items-center">
          <div className="max-w-xl mx-auto px-6 lg:px-8 text-center">
            <ScrollReveal>
              <div className="w-20 h-20 bg-loakim-gold/10 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle2 size={40} className="text-loakim-gold" />
              </div>
              <h1 className="heading-lg mb-4">Request Received</h1>
              <p className="body-md mb-8">
                Thank you for reaching out. Our team will review your requirements and contact you within 24 hours to schedule your free Brand Diagnostic.
              </p>
              <div className="p-6 bg-loakim-charcoal/30 border border-loakim-border rounded-xl mb-8 text-left">
                <h3 className="text-white font-semibold text-sm mb-4">Summary</h3>
                <div className="space-y-2 text-sm">
                  <p className="text-loakim-gray"><span className="text-loakim-lightgray">Services:</span> {selectedServices.length} selected</p>
                  <p className="text-loakim-gray"><span className="text-loakim-lightgray">Budget:</span> {budget}</p>
                  <p className="text-loakim-gray"><span className="text-loakim-lightgray">Timeline:</span> {timeline}</p>
                  <p className="text-loakim-gray"><span className="text-loakim-lightgray">Name:</span> {formData.fullName}</p>
                  <p className="text-loakim-gray"><span className="text-loakim-lightgray">Email:</span> {formData.email}</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={resetForm}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-loakim-border text-loakim-lightgray rounded-lg hover:border-loakim-gold/30 hover:text-white transition-colors text-sm"
                >
                  Submit Another Request
                </button>
                <Link
                  to="/"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-loakim-gold text-loakim-black font-semibold rounded-lg hover:bg-loakim-goldlight transition-colors text-sm"
                >
                  Return Home
                  <ArrowRight size={16} />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      <SEO
        title="Consult"
        description="Start your free Brand Diagnostic with Loakim Integrated Services. A 45-minute strategic assessment that maps your growth trajectory."
        keywords="brand diagnostic Nigeria, free marketing consultation Lagos, brand strategy consultation, retail marketing assessment"
      />

      <section className="pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <p className="section-label mb-4">Consult Portal</p>
            <h1 className="heading-xl mb-4">Begin Your Consultation</h1>
            <p className="body-md mb-12">
              Tell us about your project and we'll prepare a tailored strategic assessment. This takes about 3 minutes.
            </p>
          </ScrollReveal>

          {/* Progress */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-3">
              {['Services', 'Scope', 'Contact'].map((label, index) => (
                <div key={label} className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
                      step > index + 1
                        ? 'bg-loakim-gold text-loakim-black'
                        : step === index + 1
                        ? 'bg-loakim-gold/20 text-loakim-gold border border-loakim-gold/30'
                        : 'bg-loakim-charcoal text-loakim-gray border border-loakim-border'
                    }`}
                  >
                    {step > index + 1 ? <Check size={14} /> : index + 1}
                  </div>
                  <span
                    className={`text-xs font-medium hidden sm:block ${
                      step >= index + 1 ? 'text-loakim-lightgray' : 'text-loakim-gray'
                    }`}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
            <div className="h-1 bg-loakim-charcoal rounded-full overflow-hidden">
              <div
                className="h-full bg-loakim-gold transition-all duration-500"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          </div>

          {/* Step 1: Services */}
          {step === 1 && (
            <ScrollReveal>
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-2">What do you need?</h2>
                <p className="text-loakim-gray text-sm">Select the services relevant to your project. You can choose multiple.</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-3 mb-10">
                {serviceOptions.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => toggleService(service.id)}
                    className={`p-4 rounded-xl border text-left transition-all duration-300 ${
                      selectedServices.includes(service.id)
                        ? 'bg-loakim-gold/10 border-loakim-gold/40'
                        : 'bg-loakim-charcoal/30 border-loakim-border hover:border-loakim-gold/20'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                          selectedServices.includes(service.id)
                            ? 'bg-loakim-gold border-loakim-gold'
                            : 'border-loakim-gray'
                        }`}
                      >
                        {selectedServices.includes(service.id) && <Check size={12} className="text-loakim-black" />}
                      </div>
                      <div>
                        <span className="text-sm font-medium text-white block">{service.label}</span>
                        <span className="text-xs text-loakim-gray">{service.category}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </ScrollReveal>
          )}

          {/* Step 2: Scope */}
          {step === 2 && (
            <ScrollReveal>
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-2">Project Scope</h2>
                <p className="text-loakim-gray text-sm">Help us understand your budget and timeline expectations.</p>
              </div>

              <div className="mb-8">
                <label className="text-sm font-medium text-loakim-lightgray block mb-3">Budget Range</label>
                <div className="grid sm:grid-cols-2 gap-3">
                  {budgetRanges.map((range) => (
                    <button
                      key={range}
                      onClick={() => setBudget(range)}
                      className={`p-4 rounded-xl border text-left transition-all duration-300 ${
                        budget === range
                          ? 'bg-loakim-gold/10 border-loakim-gold/40'
                          : 'bg-loakim-charcoal/30 border-loakim-border hover:border-loakim-gold/20'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                            budget === range ? 'bg-loakim-gold border-loakim-gold' : 'border-loakim-gray'
                          }`}
                        >
                          {budget === range && <div className="w-1.5 h-1.5 rounded-full bg-loakim-black" />}
                        </div>
                        <span className="text-sm text-white">{range}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-10">
                <label className="text-sm font-medium text-loakim-lightgray block mb-3">Expected Timeline</label>
                <div className="grid sm:grid-cols-2 gap-3">
                  {timelines.map((t) => (
                    <button
                      key={t}
                      onClick={() => setTimeline(t)}
                      className={`p-4 rounded-xl border text-left transition-all duration-300 ${
                        timeline === t
                          ? 'bg-loakim-gold/10 border-loakim-gold/40'
                          : 'bg-loakim-charcoal/30 border-loakim-border hover:border-loakim-gold/20'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                            timeline === t ? 'bg-loakim-gold border-loakim-gold' : 'border-loakim-gray'
                          }`}
                        >
                          {timeline === t && <div className="w-1.5 h-1.5 rounded-full bg-loakim-black" />}
                        </div>
                        <span className="text-sm text-white">{t}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          )}

          {/* Step 3: Contact */}
          {step === 3 && (
            <ScrollReveal>
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-2">Your Details</h2>
                <p className="text-loakim-gray text-sm">How should we reach you to schedule your Brand Diagnostic?</p>
              </div>

              <div className="space-y-5 mb-10">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm font-medium text-loakim-lightgray block mb-2">Full Name *</label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-3 bg-loakim-charcoal/50 border border-loakim-border rounded-xl text-white text-sm placeholder:text-loakim-gray focus:outline-none focus:border-loakim-gold/40 transition-colors"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-loakim-lightgray block mb-2">Company Name</label>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full px-4 py-3 bg-loakim-charcoal/50 border border-loakim-border rounded-xl text-white text-sm placeholder:text-loakim-gray focus:outline-none focus:border-loakim-gold/40 transition-colors"
                      placeholder="Your company or brand"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm font-medium text-loakim-lightgray block mb-2">Email Address *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-loakim-charcoal/50 border border-loakim-border rounded-xl text-white text-sm placeholder:text-loakim-gray focus:outline-none focus:border-loakim-gold/40 transition-colors"
                      placeholder="you@company.com"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-loakim-lightgray block mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-loakim-charcoal/50 border border-loakim-border rounded-xl text-white text-sm placeholder:text-loakim-gray focus:outline-none focus:border-loakim-gold/40 transition-colors"
                      placeholder="+234 800 000 0000"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-loakim-lightgray block mb-2">Project Details</label>
                  <textarea
                    value={formData.projectDetails}
                    onChange={(e) => setFormData({ ...formData, projectDetails: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 bg-loakim-charcoal/50 border border-loakim-border rounded-xl text-white text-sm placeholder:text-loakim-gray focus:outline-none focus:border-loakim-gold/40 transition-colors resize-none"
                    placeholder="Tell us about your project, goals, and any specific challenges..."
                  />
                </div>
              </div>
            </ScrollReveal>
          )}

          {submitError && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl mb-6">
              <p className="text-red-400 text-sm">{submitError}</p>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between pt-6 border-t border-loakim-border">
            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="inline-flex items-center gap-2 px-5 py-3 text-loakim-lightgray hover:text-white transition-colors text-sm"
              >
                <ArrowLeft size={16} />
                Back
              </button>
            ) : (
              <div />
            )}

            {step < 3 ? (
              <button
                onClick={() => setStep(step + 1)}
                disabled={!canProceed()}
                className="inline-flex items-center gap-2 px-6 py-3 bg-loakim-gold text-loakim-black font-semibold rounded-lg hover:bg-loakim-goldlight transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-sm"
              >
                Continue
                <ArrowRight size={16} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!canProceed() || isSubmitting}
                className="inline-flex items-center gap-2 px-6 py-3 bg-loakim-gold text-loakim-black font-semibold rounded-lg hover:bg-loakim-goldlight transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-sm"
              >
                <Send size={16} />
                {isSubmitting ? 'Submitting...' : 'Submit Request'}
              </button>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
