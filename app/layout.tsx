import type { Metadata, Viewport } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import { imageAssets, site } from '@/lib/content';
import LenisProvider from '@/components/providers/LenisProvider';
import './globals.css';

/* GCI ships Gotham. Montserrat is the closest freely-licensable geometric sans
 * for display; Inter carries body copy. Both self-host via next/font. */
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-montserrat',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.siteUrl),
  title: site.metaTitle,
  description: site.metaDescription,
  robots: { index: true, follow: true },
  openGraph: {
    title: site.metaTitle,
    description: site.metaDescription,
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: imageAssets.og.src,
        width: imageAssets.og.width,
        height: imageAssets.og.height,
        alt: 'An Alaskan coastal community at dusk, lit against snow.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: site.metaTitle,
    description: site.metaDescription,
    images: [imageAssets.og.src],
  },
};

export const viewport: Viewport = {
  themeColor: '#042046',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${inter.variable}`}>
      <body>
        <a
          href="#top"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-full focus:bg-gci-red focus:px-5 focus:py-3 focus:font-display focus:font-bold focus:text-white"
        >
          Skip to content
        </a>
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
