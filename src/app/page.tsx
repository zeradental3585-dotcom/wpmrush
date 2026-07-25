import TypingTest from "@/components/TypingTest";
import JsonLd from "@/components/JsonLd";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: SITE_NAME,
  url: SITE_URL,
  description:
    "Test your typing speed for free with WPM Rush. Track your words per minute (WPM) and accuracy in real time with a fast, clean typing speed test.",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  publisher: {
    "@type": "Organization",
    name: "Zera Technologies",
    url: "https://zeratech.io",
  },
};

export default function Home() {
  return (
    <div className="flex w-full flex-col items-center gap-10">
      <JsonLd data={webApplicationSchema} />
      <div className="space-y-3 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Test your typing speed
        </h1>
        <p className="mx-auto max-w-xl text-muted">
          Start typing to begin. Your WPM and accuracy are tracked in real time.
        </p>
      </div>
      <TypingTest />
    </div>
  );
}
