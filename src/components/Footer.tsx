import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Linkedin, Twitter, Instagram, Mail, MapPin, Phone } from 'lucide-react'
import { getLagosTime } from '@/lib/utils'

export default function Footer() {
  const [lagosTime, setLagosTime] = useState(getLagosTime())

  useEffect(() => {
    const interval = setInterval(() => {
      setLagosTime(getLagosTime())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <footer className="bg-loakim-dark border-t border-loakim-border">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-loakim-gold/10 rounded-lg flex items-center justify-center border border-loakim-gold/20">
                <span className="text-loakim-gold font-bold text-xl">L</span>
              </div>
              <div>
                <span className="text-white font-semibold text-sm tracking-wide block">LOAKIM</span>
                <span className="text-[10px] text-loakim-gray tracking-[0.15em] uppercase">Integrated Services</span>
              </div>
            </div>
            <p className="text-loakim-gray text-sm leading-relaxed mb-6">
              We don't just build awareness — we build sales. Every strategy is anchored in commercial outcomes.
            </p>
            <div className="flex gap-3">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-loakim-charcoal border border-loakim-border flex items-center justify-center text-loakim-gray hover:text-loakim-gold hover:border-loakim-gold/30 transition-all">
                <Linkedin size={16} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-loakim-charcoal border border-loakim-border flex items-center justify-center text-loakim-gray hover:text-loakim-gold hover:border-loakim-gold/30 transition-all">
                <Twitter size={16} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-loakim-charcoal border border-loakim-border flex items-center justify-center text-loakim-gray hover:text-loakim-gold hover:border-loakim-gold/30 transition-all">
                <Instagram size={16} />
              </a>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-6 tracking-wide">Services</h4>
            <ul className="space-y-3">
              {[
                { label: 'Brand Strategy', href: '/services' },
                { label: 'Retail Activation', href: '/services' },
                { label: 'Digital Growth', href: '/services' },
                { label: 'Event Management', href: '/services' },
                { label: 'Consultation', href: '/consult' },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.href} className="text-loakim-gray text-sm hover:text-loakim-gold transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-6 tracking-wide">Company</h4>
            <ul className="space-y-3">
              {[
                { label: 'About Us', href: '/about' },
                { label: 'Results', href: '/results' },
                { label: 'Case Studies', href: '/results' },
                { label: 'Careers', href: '/about' },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.href} className="text-loakim-gray text-sm hover:text-loakim-gold transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-6 tracking-wide">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-loakim-gold mt-0.5 shrink-0" />
                <span className="text-loakim-gray text-sm">Lagos, Nigeria — WAT</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={16} className="text-loakim-gold mt-0.5 shrink-0" />
                <a href="mailto:hello@loakim.com" className="text-loakim-gray text-sm hover:text-loakim-gold transition-colors">
                  hello@loakim.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={16} className="text-loakim-gold mt-0.5 shrink-0" />
                <a href="tel:+2348000000000" className="text-loakim-gray text-sm hover:text-loakim-gold transition-colors">
                  +234 800 000 0000
                </a>
              </li>
            </ul>
            <div className="mt-6 p-3 bg-loakim-charcoal rounded-lg border border-loakim-border">
              <span className="text-[10px] text-loakim-gray uppercase tracking-wider block mb-1">Lagos Time</span>
              <span className="text-loakim-gold font-mono text-sm font-semibold">{lagosTime}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-loakim-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-loakim-gray text-xs">
            © 2026 Loakim Integrated Services. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/" className="text-loakim-gray text-xs hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/" className="text-loakim-gray text-xs hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
