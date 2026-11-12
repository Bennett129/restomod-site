import { IMAGES, unsplash } from "./site";

/**
 * Sample content in the same shape Sanity returns. The site uses it when no
 * Sanity project is configured, and `npm run sanity:seed` uploads it to a new one.
 */

export type BodyNode =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] };

export type SeedPost = {
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  author: string;
  coverUrl: string;
  body: BodyNode[];
};

export type PricingTier = {
  name: string;
  tagline: string;
  /** Whole US dollars */
  price: number;
  monthly: number;
  features: string[];
  featured: boolean;
};

export type SiteSettings = {
  heroHeadline: string;
  heroSubline: string;
};

export const fallbackSettings: SiteSettings = {
  heroHeadline: "The last great analogue coupe. Finished properly.",
  heroSubline:
    "We restore and re-engineer 2007–2013 E92 coupes by hand: naturally aspirated V8, hydraulic steering, and none of the things that broke the first time.",
};

export const fallbackPricing: PricingTier[] = [
  {
    name: "Refresh",
    tagline: "Make a good car right again.",
    price: 28000,
    monthly: 540,
    features: [
      "Rod bearings and throttle actuators",
      "Full suspension bushing replacement",
      "Brake overhaul and fluid service",
      "Paint correction and ceramic coat",
    ],
    featured: false,
  },
  {
    name: "Signature",
    tagline: "Our definitive road car.",
    price: 64000,
    monthly: 1230,
    features: [
      "Everything in Refresh",
      "Blueprinted engine, dyno-verified",
      "Hand-built 3-way dampers",
      "380 mm brakes, forged wheels",
      "Full leather or Alcantara retrim",
    ],
    featured: true,
  },
  {
    name: "Commission",
    tagline: "Built from the bare shell, to your brief.",
    price: 118000,
    monthly: 2270,
    features: [
      "Everything in Signature",
      "Bare-shell restoration and respray",
      "Carbon roof, bonnet and bootlid",
      "One-off interior and paint to sample",
      "Dedicated build manager",
    ],
    featured: false,
  },
];

export const fallbackPosts: SeedPost[] = [
  {
    title: "Why we only build E92s",
    slug: "why-we-only-build-e92s",
    excerpt:
      "One chassis, done properly. The case for the last naturally aspirated V8 coupe, and why we turn everything else away.",
    publishedAt: "2026-10-28",
    author: "Marta Keller",
    coverUrl: unsplash(IMAGES.silver.id),
    body: [
      { type: "p", text: "People ask why a workshop would limit itself to one car. The honest answer is that doing one thing well is hard enough." },
      { type: "h2", text: "The end of an era, in one car" },
      { type: "p", text: "The E92 was the last of its line with a naturally aspirated engine and hydraulic steering. It revs to 8,400 rpm and it tells you what the front tyres are doing. Nothing that followed does both." },
      { type: "p", text: "It is also fifteen years old. Bushings perish, bearings wear and plastics go brittle. A tired one drives nothing like it should, which is exactly why they are worth saving." },
      { type: "h2", text: "What focus buys you" },
      { type: "ul", items: [
        "We know every failure point and fix them all, not just the famous ones.",
        "Our jigs, tools and parts stock are built around a single chassis.",
        "Each build teaches us something the next customer benefits from.",
      ] },
      { type: "p", text: "Thirty-four cars in, we are still finding small ways to make the next one better." },
    ],
  },
  {
    title: "Rod bearings, explained without the panic",
    slug: "rod-bearings-explained",
    excerpt:
      "The internet's favourite E92 horror story, what actually causes it, and what we do about it on every build.",
    publishedAt: "2026-10-09",
    author: "Tom Achterberg",
    coverUrl: unsplash(IMAGES.engine.id),
    body: [
      { type: "p", text: "Search for this car and you will read about rod bearings within a minute. The problem is real, but it is well understood and entirely fixable." },
      { type: "h2", text: "What is going on" },
      { type: "p", text: "The original bearing clearances were tight, and the specified oil is thick when cold. Over tens of thousands of cold starts the bearings wear faster than they should. Left alone, a worn bearing can fail and take the engine with it." },
      { type: "h2", text: "What we do" },
      { type: "ul", items: [
        "Replace all rod bearings with a revised-clearance design, on every car.",
        "Measure every journal and record the numbers in your build log.",
        "Send an oil sample for analysis before and after, so you have a baseline.",
      ] },
      { type: "p", text: "Done once and done properly, it stops being something you think about." },
    ],
  },
  {
    title: "Build 031: Silverstone over Fox Red",
    slug: "build-031-silverstone-fox-red",
    excerpt:
      "A one-owner car, a six-month Signature build and the most-requested colour combination we have ever done.",
    publishedAt: "2026-09-17",
    author: "Marta Keller",
    coverUrl: unsplash(IMAGES.sunset.id),
    body: [
      { type: "p", text: "Build 031 arrived with one owner, a full service history and 94,000 miles. Its owner wanted it to feel new again without looking modified." },
      { type: "h2", text: "The brief" },
      { type: "p", text: "Keep it stock in appearance. Fix everything underneath. Make it a car he could drive across a continent and enjoy every mile." },
      { type: "h2", text: "What we did" },
      { type: "ul", items: [
        "Engine out, blueprinted and back on the dyno at 448 hp.",
        "Our road-spec dampers with a ride height 10 mm below standard.",
        "Seats, doors and dash retrimmed in the original Fox Red.",
      ] },
      { type: "p", text: "He collected it in September and drove it home the long way. That is the best review we could ask for." },
    ],
  },
];
