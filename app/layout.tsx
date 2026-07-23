import type { Metadata } from 'next'
import { Geist, Geist_Mono, Comfortaa, Geologica } from 'next/font/google'
import { Providers } from './providers'
import JsonLd from './components/JsonLd'
import { YandexMetrika } from '@/components/analytics/YandexMetrika'
import './globals.css'
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})
const comfortaa = Comfortaa({
  variable: '--font-comfortaa',
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '700'],
})
const geologica = Geologica({
  variable: '--font-geologica',
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '900'],
})
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: { default: 'YEDA — dostavka edy', template: '%s | YEDA' },
  description: 'Dostavka iz luchshikh restoranov goroda za 30 minut',
  openGraph: { type: 'website', locale: 'ru_RU', url: APP_URL, siteName: 'YEDA' },
  robots: { index: true, follow: true },
}
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={`${geistSans.variable} ${geistMono.variable} ${comfortaa.variable} ${geologica.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col ">
        <YandexMetrika />
        <JsonLd />
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
