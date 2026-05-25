import type { Metadata } from 'next'
import { Playfair_Display, Montserrat } from 'next/font/google'
import './globals.css'
import IntroAnimation from '@/components/IntroAnimation'
import CursorSpotlight from '@/components/CursorSpotlight'
import { LanguageProvider } from '@/context/LanguageContext'
import MetaUpdater from '@/components/MetaUpdater'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Atelier V – Digital Branding Studio & Web Design',
  description:
    'We build complete brand identities and responsive websites in 7 days. Starting from €399.',
  keywords: ['branding', 'logo design', 'corporate identity', 'web design', 'multilingual website'],
  openGraph: {
    title: 'Atelier V – Digital Branding Studio & Web Design',
    description: 'We build complete brand identities and responsive websites in 7 days. Starting from €399.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${montserrat.variable}`}>
      <body>
        <CursorSpotlight />
        <IntroAnimation />
        <LanguageProvider>
          <MetaUpdater />
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
