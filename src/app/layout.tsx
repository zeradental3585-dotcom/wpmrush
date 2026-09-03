import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";
import { buildMetadata, SITE_URL } from "@/lib/seo";
import { THEME_INIT_SCRIPT } from "@/lib/theme";

const GA_TRACKING_ID = "G-JL5XC53CNR";
const ADSENSE_CLIENT_ID = "ca-pub-7577953323229534";

// Google Consent Mode v2: must run before any gtag/GA/AdSense script tags.
// AdSense's Privacy & messaging tool only shows a consent prompt to visitors
// in the EEA, UK, and Switzerland (its "European regulations" message) — it
// never prompts anyone else, so a blanket "denied" default silently blocked
// analytics (and ad personalization) for 100% of non-EEA/UK/CH traffic
// forever, since there was no banner there to ever flip it to "granted".
// Regional defaults fix this: deny by default only where the consent tool
// actually runs (and can later update it via gtag('consent','update', ...)),
// grant everywhere else. https://developers.google.com/tag-platform/security/guides/consent
const CONSENT_DEFAULT_SCRIPT = `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('consent', 'default', {
    'ad_storage': 'granted',
    'ad_user_data': 'granted',
    'ad_personalization': 'granted',
    'analytics_storage': 'granted'
  });
  gtag('consent', 'default', {
    'ad_storage': 'denied',
    'ad_user_data': 'denied',
    'ad_personalization': 'denied',
    'analytics_storage': 'denied',
    'region': ['AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR','DE','GR','HU','IE','IT','LV','LT','LU','MT','NL','PL','PT','RO','SK','SI','ES','SE','IS','LI','NO','GB','CH']
  });
`;

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  ...buildMetadata({
    title: "WPM Rush – Free Online Typing Speed Test",
    description:
      "Test your typing speed for free with WPM Rush. Track your words per minute (WPM) and accuracy in real time with a fast, clean typing speed test.",
    path: "/",
  }),
  verification: {
    other: {
      "google-adsense-account": ADSENSE_CLIENT_ID,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" data-theme="emerald" suppressHydrationWarning>
      <head>
        {/* Consent Mode default signals: must be the first script and must
            run (not next/script, which would defer it) before the AdSense
            and GA tags below so they see a "denied" baseline from the start. */}
        <script dangerouslySetInnerHTML={{ __html: CONSENT_DEFAULT_SCRIPT }} />
        {/* Blocking (not next/script): must run before first paint to set
            data-theme from localStorage and avoid a flash of the wrong theme.
            Diverges from the server-rendered default on purpose, hence
            suppressHydrationWarning above and below. */}
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }}
        />
        {/* Plain <script>, not next/script: must be literal static HTML for
            AdSense's raw-HTML site verification, which doesn't execute JS. */}
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex min-h-screen flex-col bg-background text-foreground`}
      >
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}');
          `}
        </Script>
        <SessionProviderWrapper>
          <Header />
          <main className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6">
            {children}
          </main>
          <Footer />
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
