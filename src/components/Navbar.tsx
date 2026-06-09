import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Results', href: '/results' },
  { label: 'About', href: '/about' },
  { label: 'Consult', href: '/consult' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-sm border-b border-gray-100'
          : 'bg-white'
      )}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-loakim-lime/10 rounded-lg flex items-center justify-center border border-loakim-lime/20 group-hover:border-loakim-lime/40 transition-colors">
              <span className="text-loakim-lime font-bold text-xl">L</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-gray-900 font-semibold text-sm tracking-wide">LOAKIM</span>
              <span className="block text-[10px] text-gray-500 tracking-[0.15em] uppercase">Integrated Services</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  'text-sm font-medium tracking-wide transition-colors duration-300 relative group',
                  location.pathname === link.href
                    ? 'text-loakim-lime'
                    : 'text-gray-600 hover:text-gray-900'
                )}
              >
                {link.label}
                <span
                  className={cn(
                    'absolute -bottom-1 left-0 h-[1px] bg-loakim-lime transition-all duration-300',
                    location.pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                  )}
                />
              </Link>
            ))}
          </div>

          {/* Auth + Mobile Toggle */}
          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="hidden md:inline-flex text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="hidden md:inline-flex px-5 py-2.5 bg-loakim-lime text-gray-900 text-sm font-semibold rounded-lg hover:bg-loakim-limehover transition-colors"
            >
              Get Started
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-900"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          'md:hidden absolute top-20 left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-gray-100 overflow-hidden transition-all duration-500',
          isMobileMenuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="px-6 py-6 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                'block text-base font-medium py-2 transition-colors',
                location.pathname === link.href
                  ? 'text-loakim-lime'
                  : 'text-gray-600 hover:text-gray-900'
              )}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
            <Link to="/login" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Login
            </Link>
            <Link
              to="/register"
              className="inline-flex justify-center px-5 py-2.5 bg-loakim-lime text-gray-900 text-sm font-semibold rounded-lg hover:bg-loakim-limehover transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
