import { Header } from "@/components/header";
import { Build } from "@/components/sections/build";
import { Faq } from "@/components/sections/faq";
import { Gallery } from "@/components/sections/gallery";
import { Hero } from "@/components/sections/hero";
import { Pricing } from "@/components/sections/pricing";
import {
  Enquire,
  Footer,
  JournalPreview,
  Testimonials,
} from "@/components/sections/static-sections";
import { Stats } from "@/components/sections/stats";
import { getPosts, getPricing, getSettings } from "@/sanity/content";

export default async function HomePage() {
  // Editable in Sanity; cached, and refreshed by the webhook when the client publishes.
  const [settings, tiers, posts] = await Promise.all([
    getSettings(),
    getPricing(),
    getPosts(),
  ]);

  return (
    <>
      <Header overHero />
      <main>
        <Hero headline={settings.heroHeadline} subline={settings.heroSubline} />
        <Stats />
        <Build />
        <Gallery />
        <Pricing tiers={tiers} />
        <Testimonials />
        <JournalPreview posts={posts} />
        <Faq />
        <Enquire />
      </main>
      <Footer />
    </>
  );
}
