import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Eye, EyeOff, ArrowRight, Lock, Mail } from 'lucide-react'
import SEO from '@/components/SEO'

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // TODO: Integrate with Supabase Auth
    setTimeout(() => setIsLoading(false), 1500)
  }

  return (
    <>
      <SEO title="Login" description="Sign in to your Loakim Integrated Services account." />
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
            <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-gray-500 text-sm">Sign in to access your dashboard and project updates.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
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
              <label className="text-sm font-medium text-gray-400 block mb-2">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-11 pr-12 py-3 bg-loakim-charcoal/50 border border-loakim-border rounded-xl text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-loakim-lime/40 transition-colors"
                  placeholder="Enter your password"
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

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-loakim-border bg-loakim-charcoal text-loakim-lime focus:ring-loakim-lime/20" />
                <span className="text-sm text-gray-500">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-sm text-loakim-lime hover:text-loakim-limehover transition-colors">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-loakim-lime text-gray-900 font-semibold rounded-lg hover:bg-loakim-limehover transition-colors disabled:opacity-60 text-sm"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
              {!isLoading && <ArrowRight size={16} />}
            </button>
          </form>

          <p className="text-center text-gray-500 text-sm mt-8">
            Don't have an account?{' '}
            <Link to="/register" className="text-loakim-lime hover:text-loakim-limehover transition-colors font-medium">
              Get Started
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}
