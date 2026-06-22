import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { cormorantGaramond, dmSans, caveat } from '@/lib/fonts';
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider';
import ScrollProgressBar from '@/components/ui/ScrollProgressBar';
import CustomCursor from '@/components/ui/CustomCursor';
import { brand, gtagIds } from '@/config/brand.config';

export const metadata: Metadata = {
  // Resolves relative OG/Twitter image URLs once a domain is set in brand.config.ts.
  metadataBase: brand.domain ? new URL(`https://${brand.domain}`) : undefined,
  title: 'Roche Bobois Residences St. Petersburg | 344 4th St South Luxury Condos',
  description:
    "St. Pete's first designer-branded luxury tower. 29 stories, 164 exclusive residences. Pre-construction pricing available. Completion expected 2029.",
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorantGaramond.variable} ${dmSans.variable} ${caveat.variable}`}>
      <head>
        {/* Analytics load only when at least one tag ID is set in brand.config.ts.
            With blank IDs (the template default) nothing is injected. */}
        {gtagIds.length > 0 && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gtagIds[0]}`}
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                ${gtagIds.map((id) => `gtag('config', '${id}');`).join('\n                ')}
              `}
            </Script>
          </>
        )}
      </head>
      <body>
        <SmoothScrollProvider>
          <ScrollProgressBar />
          <CustomCursor />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
