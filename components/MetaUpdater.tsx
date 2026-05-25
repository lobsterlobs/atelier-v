'use client'

import { useEffect } from 'react'
import { useLanguage } from '@/context/LanguageContext'

export default function MetaUpdater() {
  const { lang } = useLanguage()

  useEffect(() => {
    if (lang === 'de') {
      document.title = 'Atelier V – Digitales Branding Studio & Webdesign'
      document.querySelector('meta[name="description"]')?.setAttribute('content', 'Erhalten Sie Ihr professionelles Logo, Corporate Identity und eine mehrsprachige Website in nur 7 Tagen. Pakete ab 399 €.')
    } else {
      document.title = 'Atelier V – Digital Branding Studio & Web Design'
      document.querySelector('meta[name="description"]')?.setAttribute('content', 'We build complete brand identities and responsive websites in 7 days. Starting from €399.')
    }
  }, [lang])

  return null
}
