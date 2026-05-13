import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import { IOS_APP_AVAILABLE } from "@/lib/appAvailability";

/** Production site origin (JSON-LD + Open Graph absolute URLs). Not used as metadataBase so /favicon paths stay host-relative (localhost vs production). */
const SITE_ORIGIN = new URL("https://angelonsight.ai");

const storeLine = IOS_APP_AVAILABLE
  ? "Available on Android and iOS."
  : "Available on Google Play for Android.";

const openGraphDescription = IOS_APP_AVAILABLE
  ? "Understand every number on your dealer's offer sheet instantly. DealScan brings clarity and confidence to every car purchase, for buyers and dealers alike."
  : "Understand every number on your dealer's offer sheet instantly. DealScan brings clarity and confidence to every car purchase. Free on Google Play for Android.";

const twitterDesc = IOS_APP_AVAILABLE
  ? "Scan any dealer offer sheet and instantly understand your deal. Available on Android and iOS."
  : "Scan any dealer offer sheet and instantly understand your deal. Available on Google Play for Android.";

export const metadata: Metadata = {
  metadataBase: SITE_ORIGIN,
  title: "DealScan: Smart Car Buying App | Understand Every Dealership Offer",
  description: `DealScan helps car buyers instantly understand dealer offer sheets, financing terms, and vehicle pricing, so every car deal is confident, clear, and fair. ${storeLine}`,
  keywords: IOS_APP_AVAILABLE
    ? "car buying app, dealership offer scanner, auto deal analyzer, car financing calculator, vehicle purchase tool, understand car deal, smart car buying, Android iOS car app, new car buying guide, used car pricing app"
    : "car buying app, dealership offer scanner, auto deal analyzer, car financing calculator, vehicle purchase tool, understand car deal, smart car buying, Android car app, Google Play car app, new car buying guide, used car pricing app",
  authors: [{ name: "DealScan" }],
  openGraph: {
    type: "website",
    url: SITE_ORIGIN.href,
    title: "DealScan: Smart Car Buying App",
    description: openGraphDescription,
    siteName: "DealScan",
    locale: "en_US",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "DealScan Smart Car Buying App" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@dealscanapp",
    title: "DealScan: Smart Car Buying App",
    description: twitterDesc,
    images: ["/opengraph-image"],
  },
};

const mobileAppLd = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  name: "DealScan",
  description: IOS_APP_AVAILABLE
    ? "DealScan helps car buyers instantly understand dealer offer sheets, financing breakdowns, and vehicle pricing. Available on Android and iOS."
    : "DealScan helps car buyers instantly understand dealer offer sheets, financing breakdowns, and vehicle pricing. Available on Google Play for Android.",
  url: SITE_ORIGIN.origin,
  applicationCategory: "FinanceApplication",
  operatingSystem: IOS_APP_AVAILABLE ? (["Android", "iOS"] as const) : (["Android"] as const),
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  aggregateRating: { "@type": "AggregateRating", ratingValue: "4.8", ratingCount: "2400" },
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How does DealScan work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "DealScan uses your phone camera to scan a dealer offer sheet and instantly decodes pricing, financing terms, and add-ons in plain language.",
      },
    },
    {
      "@type": "Question",
      name: "Is DealScan free to use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: IOS_APP_AVAILABLE
          ? "Yes, DealScan is free to download on both Android and iOS."
          : "Yes, DealScan is free to download on Google Play for Android.",
      },
    },
    {
      "@type": "Question",
      name: "Does DealScan work with any dealership?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "DealScan works with standard offer sheet formats from any franchised or independent dealership across the US.",
      },
    },
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(mobileAppLd) }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
        <style
          dangerouslySetInnerHTML={{
            __html: `
          html, body, *, *::before, *::after {
            cursor: url("/transparent.png") 0 0, none !important;
          }
        `,
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
