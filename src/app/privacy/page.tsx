import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Privacy Policy – WPM Rush",
  description:
    "Read the WPM Rush privacy policy, covering data collection, cookies, and Google AdSense.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <div className="w-full max-w-2xl space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="text-sm text-faint">Effective Date: July 24, 2026</p>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">
          Information We Collect
        </h2>
        <p className="text-muted">
          WPM Rush does not require you to create an account and has no forms
          that collect or store personal information. Your typing test
          results are calculated and displayed entirely in your browser and
          are not saved to our servers.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">
          Cookies &amp; Third-Party Ads
        </h2>
        <p className="text-muted">
          WPM Rush may use cookies and similar technologies for basic
          analytics and to serve advertising. We may use Google Analytics to
          understand aggregate traffic patterns, such as which pages are
          visited and general device or browser information, in order to
          improve the site. This information is aggregated and is not used by
          us to identify you personally.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">
          Google AdSense Disclosure
        </h2>
        <p className="text-muted">
          WPM Rush may display advertisements served by Google AdSense.
          Google, as a third-party vendor, uses cookies to serve ads based on
          your prior visits to this and other websites. Google&apos;s use of
          advertising cookies enables it and its partners to serve ads based
          on your visits here and elsewhere on the internet. You can opt out
          of personalized advertising by visiting{" "}
          <a
            href="https://adssettings.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            Google Ads Settings
          </a>
          .
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">
          Changes to This Policy
        </h2>
        <p className="text-muted">
          We may update this privacy policy from time to time. Any changes
          will be posted on this page along with a revised effective date.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">Contact</h2>
        <p className="text-muted">
          If you have any questions about this privacy policy, you can reach
          us at{" "}
          <a
            href="mailto:ubsatishsingh@gmail.com"
            className="text-accent hover:underline"
          >
            ubsatishsingh@gmail.com
          </a>
          .
        </p>
      </section>
    </div>
  );
}
