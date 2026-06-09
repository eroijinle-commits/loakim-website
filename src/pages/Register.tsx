import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Eye, EyeOff, ArrowRight, Lock, Mail, User, Building2 } from 'lucide-react'
import SEO from '@/components/SEO'

export default function Register() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    password: '',
    agreeTerms: false,
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // TODO: Integrate with Supabase Auth
    setTimeout(() => setIsLoading(false), 1500)
  }

  return (
    <>
      <SEO title="Register" description="Create your Loakim Integrated Services account to access exclusive resources and project dashboards." />
      <div className="min-h-screen bg-loakim-black flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <Link to="/" className="inline-flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-loakim-lime/10 rounded-lg flex items-center justify-center border border-loakim-lime/20">
                <span className="text-loakim-lime font-bold text-xl">L</span>
              </div>
              <div>
                <span className="text-white font-semibold text-sm tracking-wide">LOAKIM</span>
                <span className="block text-[10px] text-gray-500 tracking-[0.15em] uppercase">Integrated Services</span>
              </div>
            </Link>
            <h1 className="text-2xl font-bold text-white mb-2">Create Account</h1>
            <p className="text-gray-500 text-sm">Join brands that measure success in revenue, not likes.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm font-medium text-gray-400 block mb-2">Full Name</label>
              <div className="relative">
                <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full pl-11 pr-4 py-3 bg-loakim-charcoal/50 border border-loakim-border rounded-xl text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-loakim-lime/40 transition-colors"
                  placeholder="Your full name"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-400 block mb-2">Email Address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-11 pr-4 py-3 bg-loakim-charcoal/50 border border-loakim-border rounded-xl text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-loakim-lime/40 transition-colors"
                  placeholder="you@company.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-400 block mb-2">Company Name</label>
              <div className="relative">
                <Building2 size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full pl-11 pr-4 py-3 bg-loakim-charcoal/50 border border-loakim-border rounded-xl text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-loakim-lime/40 transition-colors"
                  placeholder="Your company or brand"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-400 block mb-2">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-11 pr-12 py-3 bg-loakim-charcoal/50 border border-loakim-border rounded-xl text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-loakim-lime/40 transition-colors"
                  placeholder="Create a strong password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.agreeTerms}
                onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                className="w-4 h-4 rounded border-loakim-border bg-loakim-charcoal text-loakim-lime focus:ring-loakim-lime/20 mt-0.5"
                required
              />
              <span className="text-sm text-gray-500">
                I agree to the{' '}
                <Link to="/" className="text-loakim-lime hover:text-loakim-limehover transition-colors">Terms of Service</Link>
                {' '}and{' '}
                <Link to="/" className="text-loakim-lime hover:text-loakim-limehover transition-colors">Privacy Policy</Link>
              </span>
            </label>

            <button
              type="submit"
              disabled={isLoading || !formData.agreeTerms}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-loakim-lime text-gray-900 font-semibold rounded-lg hover:bg-loakim-limehover transition-colors disabled:opacity-60 text-sm"
            >
              {isLoading ? 'Creating account...' : 'Create Account'}
              {!isLoading && <ArrowRight size={16} />}
            </button>
          </form>

          <p className="text-center text-gray-500 text-sm mt-8">
            Already have an account?{' '}
            <Link to="/login" className="text-loakim-lime hover:text-loakim-limehover transition-colors font-medium">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}
