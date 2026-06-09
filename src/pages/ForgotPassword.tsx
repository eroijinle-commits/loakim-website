import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowLeft, Mail, CheckCircle2 } from 'lucide-react'
import SEO from '@/components/SEO'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // TODO: Integrate with Supabase Auth password reset
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
    }, 1500)
  }

  return (
    <>
      <SEO title="Forgot Password" description="Reset your Loakim Integrated Services account password." />
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

            {isSubmitted ? (
              <>
                <div className="w-16 h-16 bg-loakim-lime/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={32} className="text-loakim-lime" />
                </div>
                <h1 className="text-2xl font-bold text-white mb-2">Check Your Email</h1>
                <p className="text-gray-500 text-sm">
                  We've sent password reset instructions to <span className="text-gray-300">{email}</span>
                </p>
              </>
            ) : (
              <>
                <h1 className="text-2xl font-bold text-white mb-2">Reset Password</h1>
                <p className="text-gray-500 text-sm">Enter your email and we'll send you reset instructions.</p>
              </>
            )}
          </div>

          {!isSubmitted && (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-sm font-medium text-gray-400 block mb-2">Email Address</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-loakim-charcoal/50 border border-loakim-border rounded-xl text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-loakim-lime/40 transition-colors"
                    placeholder="you@company.com"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-loakim-lime text-gray-900 font-semibold rounded-lg hover:bg-loakim-limehover transition-colors disabled:opacity-60 text-sm"
              >
                {isLoading ? 'Sending...' : 'Send Reset Link'}
                {!isLoading && <ArrowRight size={16} />}
              </button>
            </form>
          )}

          <div className="text-center mt-8">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors"
            >
              <ArrowLeft size={14} />
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
