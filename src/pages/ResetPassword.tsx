import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Eye, EyeOff, ArrowRight, Lock, CheckCircle2 } from 'lucide-react'
import SEO from '@/components/SEO'

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) return
    setIsLoading(true)
    // TODO: Integrate with Supabase Auth password update
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
    }, 1500)
  }

  return (
    <>
      <SEO title="Reset Password" description="Set a new password for your Loakim Integrated Services account." />
      <div className="min-h-screen bg-loakim-black flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <Link to="/" className="inline-flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-loakim-gold/10 rounded-lg flex items-center justify-center border border-loakim-gold/20">
                <span className="text-loakim-gold font-bold text-xl">L</span>
              </div>
              <div>
                <span className="text-white font-semibold text-sm tracking-wide">LOAKIM</span>
                <span className="block text-[10px] text-loakim-gray tracking-[0.15em] uppercase">Integrated Services</span>
              </div>
            </Link>

            {isSubmitted ? (
              <>
                <div className="w-16 h-16 bg-loakim-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={32} className="text-loakim-gold" />
                </div>
                <h1 className="text-2xl font-bold text-white mb-2">Password Updated</h1>
                <p className="text-loakim-gray text-sm">Your password has been successfully reset. You can now sign in with your new password.</p>
              </>
            ) : (
              <>
                <h1 className="text-2xl font-bold text-white mb-2">Set New Password</h1>
                <p className="text-loakim-gray text-sm">Create a strong password for your account.</p>
              </>
            )}
          </div>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-sm font-medium text-loakim-lightgray block mb-2">New Password</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-loakim-gray" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-12 py-3 bg-loakim-charcoal/50 border border-loakim-border rounded-xl text-white text-sm placeholder:text-loakim-gray focus:outline-none focus:border-loakim-gold/40 transition-colors"
                    placeholder="Create a strong password"
                    required
                    minLength={8}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-loakim-gray hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-loakim-lightgray block mb-2">Confirm Password</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-loakim-gray" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`w-full pl-11 pr-12 py-3 bg-loakim-charcoal/50 border rounded-xl text-white text-sm placeholder:text-loakim-gray focus:outline-none focus:border-loakim-gold/40 transition-colors ${
                      confirmPassword && password !== confirmPassword ? 'border-red-500/50' : 'border-loakim-border'
                    }`}
                    placeholder="Confirm your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-loakim-gray hover:text-white transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {confirmPassword && password !== confirmPassword && (
                  <p className="text-red-400 text-xs mt-2">Passwords do not match</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading || !!(confirmPassword && password !== confirmPassword)}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-loakim-gold text-loakim-black font-semibold rounded-lg hover:bg-loakim-goldlight transition-colors disabled:opacity-60 text-sm"
              >
                {isLoading ? 'Updating...' : 'Update Password'}
                {!isLoading && <ArrowRight size={16} />}
              </button>
            </form>
          ) : (
            <div className="text-center">
              <Link
                to="/login"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-loakim-gold text-loakim-black font-semibold rounded-lg hover:bg-loakim-goldlight transition-colors text-sm"
              >
                Sign In
                <ArrowRight size={16} />
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
