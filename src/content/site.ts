/** Fixed site content. Editable content (posts, pricing, hero copy) lives in Sanity; see src/sanity. */

export const BRAND = {
  name: "Altwerk Motors",
  short: "Altwerk",
  email: "hello@altwerk.example",
  location: "Unit 7, Foundry Lane",
};

export const unsplash = (id: string, width = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=75`;

export const IMAGES = {
  hero: { id: "1683638287438-7710b87ffb41", alt: "A black E92 coupe parked outside a workshop", by: "venajeborec" },
  silver: { id: "1656335733647-a8d56d329a35", alt: "A silver E92 coupe in front of an ivy-covered building", by: "grebenyev" },
  sunset: { id: "1640973988967-3fc715fef53a", alt: "A grey E92 coupe seen from behind at sunset", by: "griff3344" },
  garage: { id: "1486006920555-c77dcf18193c", alt: "A car with its door open inside a dim workshop", by: "loganmeis" },
  engine: { id: "1626995587693-c50c9a5544c6", alt: "A mechanic leaning into an engine bay in a dimly lit workshop", by: "brodus_k" },
  suspension: { id: "1783427401907-9a4feb7544d3", alt: "A coilover, brake disc and caliper with the wheel removed", by: "bharat05" },
  interior: { id: "1603980928031-21ff9cfa8b6d", alt: "A dark cabin with the instrument cluster glowing", by: "kristianvalco" },
} as const;

export const NAV = [
  { href: "/#build", label: "The build" },
  { href: "/#gallery", label: "Gallery" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/blog", label: "Journal" },
];

export const STATS = [
  { value: 450, suffix: " hp", label: "from a blueprinted 4.0 V8" },
  { value: 8400, suffix: " rpm", label: "redline, untouched" },
  { value: 1200, suffix: " hrs", label: "of work in every car" },
  { value: 12, suffix: "", label: "builds a year, no more" },
];

export const BUILD_STEPS = [
  {
    title: "Strip-down",
    body: "Every car comes apart to the bare shell. We media-blast, measure and photograph it, then fix what fifteen winters did before a single new part goes on.",
    detail: "4 weeks · 300+ photos in your build log",
    image: IMAGES.garage,
  },
  {
    title: "Engine",
    body: "The V8 is torn down and blueprinted. Rod bearings, throttle actuators and every seal are replaced, then it spends a day on the dyno before it goes back in.",
    detail: "Rod bearings · actuators · full dyno sheet",
    image: IMAGES.engine,
  },
  {
    title: "Chassis",
    body: "New bushings throughout, hand-built dampers set up for real roads, and brakes that match what the engine can now do. Then a full geometry setup.",
    detail: "3-way dampers · 380 mm brakes · corner-weighted",
    image: IMAGES.suspension,
  },
  {
    title: "Interior",
    body: "Retrimmed in your choice of leather or Alcantara. Modern audio and phone integration hidden behind the original dash, so it still looks like 2011.",
    detail: "Hand-stitched · hidden CarPlay · original look",
    image: IMAGES.interior,
  },
];

export const GALLERY = [
  { ...IMAGES.silver, caption: "Build 031 · Silverstone over Fox Red" },
  { ...IMAGES.sunset, caption: "Build 027 · Space Grey, Club spec" },
  { ...IMAGES.suspension, caption: "Chassis setup, build 034" },
  { ...IMAGES.hero, caption: "Build 022 · Jerez Black" },
];

export const TESTIMONIALS = [
  {
    quote: "I've owned mine since 2012. It came back feeling the way I remember it, except now nothing rattles and the brakes are astonishing.",
    name: "Daniel R.",
    detail: "Build 019, Signature",
  },
  {
    quote: "The weekly photo log was the best part. I watched every bolt go back in from the other side of the country.",
    name: "Sofia M.",
    detail: "Build 024, Commission",
  },
  {
    quote: "They talked me out of two expensive options I didn't need. That is why I trusted them with the rest.",
    name: "James O.",
    detail: "Build 030, Refresh",
  },
];

export const FAQ = [
  {
    q: "Do I need to supply the car?",
    a: "Either works. Bring your own E92, or we find and inspect a suitable donor for you. Sourcing is charged at cost plus a fixed fee, agreed before we buy.",
  },
  {
    q: "How long does a build take?",
    a: "A Refresh takes about eight weeks. A Signature build is five to six months, and a full Commission is typically nine. We take twelve cars a year, so there is usually a waiting list.",
  },
  {
    q: "Is the work guaranteed?",
    a: "Every build carries a two-year, unlimited-mileage warranty on our workmanship and on the parts we fit.",
  },
  {
    q: "Can I visit during the build?",
    a: "Yes, and we encourage it. You also get a private build log with photos every week.",
  },
];

export const DISCLAIMER =
  "Altwerk Motors is a fictional company created as a portfolio project. It is not affiliated with, endorsed by or connected to BMW AG. BMW and M3 are trademarks of BMW AG, used here only to describe the cars.";
