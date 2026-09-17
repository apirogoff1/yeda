import type { Metadata } from 'next'
import { Geist, Geist_Mono, Comfortaa, Geologica, Fredoka, Nunito, Russo_One, Baloo_2 } from 'next/font/google'
import { Providers } from './providers'
import JsonLd from './components/JsonLd'
import { YandexMetrika } from '@/components/analytics/YandexMetrika'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { headers } from 'next/headers'
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
  subsets: ['latin'],
  weight: ['400', '700'],
})
const nunito = Nunito({
  variable: '--font-nunito',
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '700'],
})
const fredokaOne = Fredoka({
  variable: '--font-fredoka',
  subsets: ['latin'],
  weight: ['400', '700'],
})
const baloo2 = Baloo_2({
  variable: '--font-baloo',
  subsets: ['latin'],
  weight: ['400', '700', '800'],
})
const russoOne = Russo_One({
  variable: '--font-russo',
  subsets: ['latin', 'cyrillic'],
  weight: '400',
})
const geologica = Geologica({
  variable: '--font-geologica',
  subsets: ['latin'],
  weight: ['400', '900'],
})
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: { default: 'YEDA вЂ” dostavka edy', template: '%s | YEDA' },
  description: 'Dostavka iz luchshikh restoranov goroda za 30 minut',
  openGraph: { type: 'website', locale: 'ru_RU', url: APP_URL, siteName: 'YEDA' },
  robots: { index: true, follow: true },
}
async function HeaderWrapper() {
  const headersList = await headers()
  const pathname = headersList.get('x-pathname') || headersList.get('x-invoke-path') || ''
  if (pathname.startsWith('/editor')) return null
  return <Header />
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={`${geistSans.variable} ${geistMono.variable} ${comfortaa.variable} ${geologica.variable} ${fredokaOne.variable} ${nunito.variable} ${russoOne.variable} ${baloo2.variable} antialiased`}>
      <body className="">
        <YandexMetrika />
        <JsonLd />
        <Providers><div style={{ backgroundColor: "#F5EAD8", position: "relative", overflowX: "hidden" }}><HeaderWrapper />{children}<Footer /></div></Providers>
      </body>
    </html>
  )
}












