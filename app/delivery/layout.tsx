import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FastBite - Food Delivery Service | Portfolio',
  description: 'Demo case: food delivery service built with Next.js 15, Prisma, PostgreSQL',
  openGraph: {
    title: 'FastBite - Food Delivery Service | Portfolio',
    description: 'Demo case: food delivery service built with Next.js 15, Prisma, PostgreSQL',
    type: 'website',
  },
};

export default function DeliveryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}