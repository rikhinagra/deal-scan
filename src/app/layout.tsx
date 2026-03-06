import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

export const metadata: Metadata = {
  title: "DealScan — Smart Car Buying App | Understand Every Dealership Offer",
  description: "DealScan helps car buyers instantly understand dealer offer sheets, financing terms, and vehicle pricing — so every car deal is confident, clear, and fair. Available on Android and iOS.",
  keywords: "car buying app, dealership offer scanner, auto deal analyzer, car financing calculator, vehicle purchase tool, understand car deal, smart car buying, Android iOS car app, new car buying guide, used car pricing app",
  authors: [{ name: "DealScan" }],
  openGraph: {
    type: "website",
    url: "https://www.dealscanapp.com/",
    title: "DealScan — Smart Car Buying App",
    description: "Understand every number on your dealer's offer sheet instantly. DealScan brings clarity and confidence to every car purchase — for buyers and dealers alike.",
    siteName: "DealScan",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@dealscanapp",
    title: "DealScan — Smart Car Buying App",
    description: "Scan any dealer offer sheet and instantly understand your deal. Available on Android and iOS.",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Syne:wght@400;600;700;800&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
        {/* Schema.org JSON-LD */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MobileApplication",
            "name": "DealScan",
            "description": "DealScan helps car buyers instantly understand dealer offer sheets, financing breakdowns, and vehicle pricing. Available on Android and iOS.",
            "url": "https://www.dealscanapp.com",
            "applicationCategory": "FinanceApplication",
            "operatingSystem": ["Android", "iOS"],
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
            "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "2400" }
          })
        }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              { "@type": "Question", "name": "How does DealScan work?", "acceptedAnswer": { "@type": "Answer", "text": "DealScan uses your phone camera to scan a dealer offer sheet and instantly decodes pricing, financing terms, and add-ons in plain language." } },
              { "@type": "Question", "name": "Is DealScan free to use?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, DealScan is free to download on both Android and iOS." } },
              { "@type": "Question", "name": "Does DealScan work with any dealership?", "acceptedAnswer": { "@type": "Answer", "text": "DealScan works with standard offer sheet formats from any franchised or independent dealership across the US." } }
            ]
          })
        }} />
        <style dangerouslySetInnerHTML={{
          __html: `
          html, body, *, *::before, *::after {
            cursor: url("/transparent.png") 0 0, none !important;
          }
        `}} />
      </head>
      <body suppressHydrationWarning>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
