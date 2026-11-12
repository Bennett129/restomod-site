import { isSanityConfigured } from "@/sanity/env";
import { Studio } from "./studio";

export const metadata = { title: "Studio", robots: { index: false } };

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <main className="mx-auto max-w-xl px-6 py-24">
        <p className="eyebrow">Content studio</p>
        <h1 className="display mt-3 text-4xl">Connect Sanity to edit content</h1>
        <p className="mt-4 text-muted">
          The site is currently showing its built-in sample content. To let the
          client edit posts, pricing and the home page headline here:
        </p>
        <ol className="mt-6 list-decimal space-y-3 pl-5">
          <li>
            Create a free project at{" "}
            <a className="text-accent underline" href="https://www.sanity.io/manage">
              sanity.io/manage
            </a>
            .
          </li>
          <li>
            Copy <code>.env.example</code> to <code>.env.local</code> and set{" "}
            <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code>.
          </li>
          <li>
            In the project&apos;s API settings, add this site&apos;s address as a
            CORS origin with credentials allowed.
          </li>
          <li>Restart the site and reload this page.</li>
        </ol>
      </main>
    );
  }

  return <Studio />;
}
