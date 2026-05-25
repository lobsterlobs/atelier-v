'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

const NAV_LINKS = [
  { label: { en: 'Services', bg: 'Услуги' }, href: '/services' },
  { label: { en: 'Digital', bg: 'Дигитално' }, href: '#digital' },
  { label: { en: 'Training', bg: 'Обучения' }, href: '#training' },
  { label: { en: 'Projects', bg: 'Проекти' }, href: '#eu-projects' },
  { label: { en: 'Contact', bg: 'Контакт' }, href: '#contact' },
]

const CTA = { en: 'Get in Touch', bg: 'Свържи се' } as const

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { lang, setLang } = useLanguage()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0A1628]/90 backdrop-blur-xl shadow-[0_4px_32px_rgba(0,0,0,0.6)]'
          : 'bg-[#0A1628]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">

        {/* Logo */}
        <a href="/" className="flex items-center gap-3 group" aria-label="Atelier V home">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Atelier V Logo">
            <defs>
              <linearGradient id="vg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1B4F8A"/>
                <stop offset="100%" stopColor="#2ECC71"/>
              </linearGradient>
            </defs>
            <circle cx="16" cy="16" r="14.5" fill="#0A1628" stroke="url(#vg)" strokeWidth="1.5"/>
            <path d="M 8.5,9 L 16,23 L 23.5,9" stroke="url(#vg)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="font-display text-[1.2rem] font-bold tracking-[0.22em] text-white group-hover:text-[#2ECC71] transition-colors duration-200 select-none">
            VORTEX
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-7">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="relative font-sans text-sm font-medium text-[#8A9BAE] hover:text-white tracking-wide transition-colors duration-200 group"
            >
              {label[lang]}
              <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gradient-to-r from-[#1B4F8A] to-[#2ECC71] group-hover:w-full transition-all duration-300" />
            </a>
          ))}
          {/* Language toggle */}
          <button
            onClick={() => setLang(lang === 'en' ? 'bg' : 'en')}
            className="ml-1 font-sans text-xs font-bold tracking-[0.18em] select-none transition-colors duration-200"
            style={{ color: '#D4AF37' }}
            aria-label="Switch language"
          >
            <span style={{ opacity: lang === 'en' ? 1 : 0.4 }}>EN</span>
            <span className="mx-1 opacity-40">|</span>
            <span style={{ opacity: lang === 'bg' ? 1 : 0.4 }}>BG</span>
          </button>
          <a
            href="#contact"
            className="ml-3 px-6 py-2.5 bg-gradient-to-r from-[#1B4F8A] to-[#2ECC71] text-white font-sans text-sm font-bold tracking-wide rounded hover:opacity-90 transition-all duration-200 shadow-[0_2px_16px_rgba(46,204,113,0.35)] hover:shadow-[0_4px_24px_rgba(46,204,113,0.55)]"
          >
            {CTA[lang]}
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden flex items-center justify-center w-10 h-10 text-white"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden overflow-hidden bg-[#0D1E3A] border-t border-[rgba(27,79,138,0.25)]"
          >
            <div className="px-6 py-5 space-y-1">
              {NAV_LINKS.map(({ label, href }) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="block py-3 font-sans text-sm text-[#8A9BAE] hover:text-white transition-colors border-b border-[rgba(255,255,255,0.05)] last:border-0"
                >
                  {label[lang]}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="mt-3 block text-center px-6 py-3 bg-gradient-to-r from-[#1B4F8A] to-[#2ECC71] text-white font-sans text-sm font-bold rounded shadow-[0_2px_16px_rgba(46,204,113,0.3)]"
              >
                {CTA[lang]}
              </a>
              <button
                onClick={() => setLang(lang === 'en' ? 'bg' : 'en')}
                className="mt-3 w-full text-center font-sans text-xs font-bold tracking-[0.18em] py-2 select-none"
                style={{ color: '#D4AF37' }}
                aria-label="Switch language"
              >
                <span style={{ opacity: lang === 'en' ? 1 : 0.4 }}>EN</span>
                <span className="mx-1 opacity-40">|</span>
                <span style={{ opacity: lang === 'bg' ? 1 : 0.4 }}>BG</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
