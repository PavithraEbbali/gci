/* =============================================================================
 *  lib/content.ts — SINGLE SOURCE OF TRUTH
 * -----------------------------------------------------------------------------
 *  Every price, speed, plan name, feature bullet, fee and FAQ rendered anywhere
 *  on this site originates here. Nothing is hard-coded inside a component.
 *
 *  To update pricing later: edit this file only. No component changes required.
 *
 *  All plan data was audited against https://www.gci.com (official site).
 * ========================================================================== */

import type { IconName } from '@/components/ui/Icon';

/* ---------------------------------------------------------------- types --- */

export type ServiceLine = 'fiber' | 'cable' | 'bundle' | 'tv' | 'mobile' | 'phone';

export interface PlanItem {
  id: string;
  name: string;
  serviceLine: ServiceLine;
  /** Download speed in Mbps. 2500 = 2.5 Gbps. */
  speedDown?: number;
  /** Upload speed in Mbps. */
  speedUp?: number;
  /** Whole-dollar portion of the monthly price. Omit when price is not published. */
  price?: number;
  /** Cents portion, as a string so trailing zeros survive: "99". */
  cents?: string;
  /** Small line under the price, e.g. "/mo for the first year". */
  promoQualifier?: string;
  equipmentFee?: string;
  dataPolicy?: string;
  contractTerm?: string;
  features: string[];
  isPopular?: boolean;
  /** Short one-line positioning statement shown under the plan name. */
  tagline?: string;
  /** Optional struck-through regular price, e.g. "$199.99". */
  strikePrice?: string;
  /** Optional eyebrow badge, e.g. "BEST PERFORMANCE". */
  badge?: string;
}

export interface ServiceSection {
  id: string;
  serviceLine: ServiceLine;
  eyebrow: string;
  heading: string;
  subheading: string;
  /** 'light' = white canvas, 'tint' = the #f2f5fa band. Both are light. */
  theme: 'light' | 'tint';
  /** Glyph shown beside the section eyebrow. */
  icon: IconName;
  /** Footnote rendered beneath the plan grid. */
  footnote?: string;
}

/* ------------------------------------------------------------- site URL --- */

/**
 * Resolve the absolute origin for OpenGraph and Twitter card images.
 *
 * Order: an explicit NEXT_PUBLIC_SITE_URL, then whatever Vercel exposes about
 * the current deployment, then a placeholder.
 *
 * Empty strings count as unset. Next inlines an undefined NEXT_PUBLIC_* var as
 * `""` at build time, and `??` does not catch that — which is exactly what
 * broke the first Vercel build, with `new URL('')` throwing during page-data
 * collection. Each candidate is also parsed before being accepted, so a
 * malformed value falls through instead of failing the build.
 */
function resolveSiteUrl(): string {
  const candidates = [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
    process.env.NEXT_PUBLIC_VERCEL_URL,
    process.env.VERCEL_URL,
  ];

  for (const raw of candidates) {
    const value = raw?.trim();
    if (!value) continue;
    const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`;
    try {
      return new URL(withProtocol).origin;
    } catch {
      // malformed — fall through to the next candidate
    }
  }

  return 'https://example.com';
}

/* ------------------------------------------------------------ site meta --- */


export const site = {
  /* ---------------------------------------------------------------------
   * PLACEHOLDER — replace with the retailer's own sales / tracking number.
   * This deliberately uses the 555-01xx range reserved for fictional use so
   * it cannot ring a real party before you swap it in.
   * Change it here once; header, hero, every plan card and the footer follow.
   * ------------------------------------------------------------------- */
  phoneDisplay: '(855) 555-0142',
  phoneHref: 'tel:+18555550142',
  hours: 'Mon–Fri 8AM–9PM AKT · Sat–Sun 9AM–6PM AKT',
  address: 'Anchorage, Alaska',

  brandName: 'GCI',
  brandSuffix: 'Authorized Retailer',
  disclosureShort: 'Independent Authorized Retailer of GCI.',
  disclosureLong:
    'This site is operated by an independent authorized retailer of GCI and is not operated by GCI. GCI, GCI+, Fiber+, AK-Fi, red Unlimited and Atmos Rewards are trademarks of GCI Communication Corp. and its affiliates. Plan names, speeds, promotional terms and pricing reflect current GCI residential offers and are subject to change, availability and qualification.',

  /* ---------------------------------------------------------------------
   * Absolute origin used to resolve social share image URLs. Set
   * NEXT_PUBLIC_SITE_URL to the real domain before launch; on Vercel this
   * falls back to the deployment's own URL so previews work untouched.
   * ------------------------------------------------------------------- */
  siteUrl: resolveSiteUrl(),

  metaTitle: 'GCI Internet, Mobile & Home Phone in Alaska | Authorized Retailer',
  metaDescription:
    'Order GCI Fiber+ internet up to 2.5 Gbps, GCI+ bundles with a free mobile line for a year, GCI Mobile and home phone. Independent authorized retailer serving Alaska.',
} as const;

/* -------------------------------------------------- current GCI offers --- */

export interface SpecialOffer {
  id: string;
  /** Short kicker above the title, e.g. "Apple". */
  kicker?: string;
  title: string;
  detail: string;
  /** Supporting qualifiers, rendered on the lead offer card. */
  points?: string[];
  /** Glyph shown on the offer card. */
  icon: IconName;
  /** Marks the lead offer carried in the hero headline slot. */
  isFeatured?: boolean;
}

/**
 * Promotions GCI is running right now, transcribed from gci.com.
 * The featured entry drives the hero offer card; the rest fill the offers rail.
 */
export const specialOffers: SpecialOffer[] = [
  {
    id: 'iphone-18-pro',
    icon: 'device',
    kicker: 'Apple',
    title: 'Get iPhone 18 Pro on us with trade-in',
    detail:
      'Plus mobile service free for a year when you bundle with GCI Internet. Available on Alaska’s fastest 5G network.',
    points: [
      'Qualifying trade-in required; value depends on device model and condition',
      'Open to new and existing GCI Mobile accounts',
      'Applied as monthly bill credits across the device financing term',
      'Pair with any GCI+ bundle for 12 months of mobile service at no cost',
    ],
    isFeatured: true,
  },
  {
    id: 'free-mobile-year',
    icon: 'bundle',
    kicker: 'GCI+ bundle',
    title: 'Free unlimited mobile for a year',
    detail:
      'Choose GCI Internet and your first unlimited mobile line is included at no cost for 12 months.',
  },
  {
    id: 'iphone-17-pro',
    icon: 'device',
    kicker: 'Apple',
    title: 'iPhone 17 Pro for $0 with trade-in',
    detail: 'Apple’s flagship device on us, courtesy of Alaska’s fastest 5G network.',
  },
  {
    id: 'galaxy-s26',
    icon: 'device',
    kicker: 'Samsung',
    title: 'Up to $1,000 off the Galaxy S26 series',
    detail: 'Trade-in offer available to new and existing customers alike.',
  },
  {
    id: 'iphone-17e',
    icon: 'mobile',
    kicker: 'Apple',
    title: 'iPhone 17e on us with trade-in',
    detail: 'Feature stacked, value packed — included with a qualifying trade-in.',
  },
  {
    id: 'ipad-air-m4',
    icon: 'tablet',
    kicker: 'Apple',
    title: '$350 off iPad Air (M4)',
    detail: 'Now supercharged by the M4 chip.',
  },
  {
    id: 'accessories-30',
    icon: 'headphones',
    kicker: 'Accessories',
    title: '30% off when you buy three or more',
    detail: 'Save on cases, chargers and audio across the full accessory range.',
  },
];

export const featuredOffer =
  specialOffers.find((o) => o.isFeatured) ?? specialOffers[0];

export const hero = {
  headline: "Alaska's fastest internet,",
  headlineAccent: 'built on the Fiber+ network.',
  /** Microcopy under the ZIP field. */
  zipReassurance: 'Free to check · No obligation · Takes about a minute',
  /** Lead-in for the inline price anchor. */
  priceAnchorLabel: 'Internet plans start at',
  /** The offer medallion, kept short because a circle has no room for prose. */
  medallion: {
    eyebrow: 'Limited time',
    product: 'iPhone 18 Pro',
    punch: 'On us',
    qualifier: 'with eligible trade-in',
  },
  subheadline:
    'Speeds up to 2.5 Gbps with unlimited data and no annual contract, carried across nearly 15,000 miles of fiber serving communities throughout Alaska. Enter your ZIP code to confirm availability at your address.',
  zipLabel: 'Check availability at your address',
  zipPlaceholder: 'Enter your Alaska ZIP code',
  primaryCta: 'Call to order',
  stats: [
    { value: '2.5', unit: 'Gbps', label: 'Maximum download speed' },
    { value: '15k', unit: 'miles', label: 'Fiber backbone statewide' },
    { value: '80', unit: '%', label: 'Of Alaskans multi-gig ready' },
  ],
} as const;

/* ----------------------------------------------- hero inclusions strip --- */

/**
 * Shown as a horizontal check-strip at the foot of the hero. These were
 * previously a bulleted list inside a card on the right, which read as a
 * generic template block; both reference sites carry inclusions this way.
 */
export const heroInclusions: string[] = [
  'Free mobile line for 12 months',
  'Apple TV 4K included',
  'No equipment or installation fees',
  'No annual contract',
];

/* ------------------------------------------------------- trust marquee --- */

export const trustMarkers: string[] = [
  "Alaska's Fastest Internet — PCMag",
  "Alaska's Fastest 5G — Ookla",
  "Alaska's Best Telecommunications Provider — Alaska Business Monthly",
  '2025 Best of Alaska Denali Award — Best Telecom Provider',
  'First to 1 Gbps in Alaska — 2015',
  'First to 2 Gbps in Alaska — 2021',
  "Alaska's only 2.5 Gbps internet + mobile bundle",
];


/* ----------------------------------------------------------- ZIP check --- */

/**
 * Frontend-only availability hinting. There is no backend and no lookup API —
 * this is a presentational aid that recognises Alaska ZIP prefixes and the
 * GCI+ community list published on gci.com.
 */
export const zipCheck = {
  /** Alaska ZIP codes all begin 995–999. */
  statePrefixes: ['995', '996', '997', '998', '999'],
  gciPlusCommunities: [
    'Anchorage', 'Akutan', 'Angoon', 'Bethel', 'Chignik Bay', 'Chignik Lake',
    'Chignik Lagoon', 'Cordova', 'Eagle River', 'Eek', 'Eielson AFB', 'Fairbanks',
    'False Pass', 'Fort Greely', 'Fort Wainwright', 'Girdwood', 'Homer', 'Juneau',
    'Kenai', 'Ketchikan', 'King Cove', 'Kivalina', 'Kodiak', 'Kotzebue',
    'Larsen Bay', 'Napaskiak', 'Nome', 'North Pole', 'Oscarville', 'Ouzinkie',
    'Palmer', 'Perryville', 'Petersburg', 'Platinum', 'Port Lions', 'Sand Point',
    'Seward', 'Sitka', 'Soldotna', 'Unalaska', 'Utqiagvik', 'Valdez', 'Wasilla',
    'Wrangell',
  ],
  successTitle: 'Great news — GCI serves Alaska ZIP codes like yours.',
  successBody:
    'Exact speeds and bundle eligibility depend on your street address. Call and we will confirm what is live at your home and place the order on the spot.',
  outOfStateTitle: 'GCI builds and operates its network inside Alaska.',
  outOfStateBody:
    'That ZIP code sits outside the service territory. If you are moving to Alaska, call us and we will line up service for your arrival date.',
  invalidTitle: 'That does not look like a complete ZIP code.',
  invalidBody: 'Enter five digits and we will check it against the Alaska service map.',
} as const;

/* ============================================================== PLANS === *
 *  Audited against gci.com. Sections whose service line GCI does not sell
 *  natively are simply absent from this file — there are no empty shells.
 *
 *  Deliberately omitted after audit:
 *    • 'cable' — GCI markets one residential internet lineup delivered over
 *      the hybrid Fiber+ build. There is no separate cable tier lineup.
 *    • 'tv'    — GCI no longer sells a residential TV product.
 * ========================================================================= */

/* ------------------------------------------------- 1. FIBER+ INTERNET --- */

export const fiberPlans: PlanItem[] = [
  {
    id: 'red-unlimited',
    name: 'red Unlimited',
    serviceLine: 'fiber',
    badge: 'Best performance',
    tagline: "Alaska's best performance, period.",
    speedDown: 2500,
    speedUp: 75,
    price: 189,
    cents: '99',
    promoQualifier: '/mo',
    equipmentFee: 'No equipment fee',
    dataPolicy: 'Unlimited high-speed data',
    contractTerm: 'No annual contract',
    isPopular: true,
    features: [
      'Up to 2.5 Gbps download, 75 Mbps upload',
      'Unlimited high-speed data — no overage charges',
      'AK-Fi Home smart WiFi powered by Plume® included',
      'Free WiFi extenders to clear dead zones',
      'Free installation and equipment',
      'No early termination fee',
    ],
  },
  {
    id: 'fastest',
    name: 'Fastest',
    serviceLine: 'fiber',
    tagline: 'Built for households that stream across three to five devices at once.',
    speedDown: 1000,
    speedUp: 40,
    price: 149,
    cents: '99',
    promoQualifier: '/mo',
    equipmentFee: 'No equipment fee',
    dataPolicy: '1 TB high-speed data',
    contractTerm: 'No annual contract',
    features: [
      'Up to 1 Gbps download, 40 Mbps upload',
      '1 TB of high-speed data each month',
      'Additional data $10 per 75 GB',
      'AK-Fi Home smart WiFi powered by Plume® included',
      'Free installation and equipment',
      'No early termination fee',
    ],
  },
  {
    id: 'faster',
    name: 'Faster',
    serviceLine: 'fiber',
    tagline: 'A strong fit when more than one person works or learns from home.',
    speedDown: 500,
    speedUp: 20,
    price: 124,
    cents: '99',
    promoQualifier: '/mo',
    equipmentFee: 'No equipment fee',
    dataPolicy: '800 GB high-speed data',
    contractTerm: 'No annual contract',
    features: [
      'Up to 500 Mbps download, 20 Mbps upload',
      '800 GB of high-speed data each month',
      'Additional data $10 per 40 GB',
      'AK-Fi Home smart WiFi powered by Plume® included',
      'Free installation and equipment',
      'No early termination fee',
    ],
  },
  {
    id: 'fast',
    name: 'Fast',
    serviceLine: 'fiber',
    tagline: 'Right-sized for one or two devices and a moderate streaming habit.',
    speedDown: 250,
    speedUp: 10,
    price: 89,
    cents: '99',
    promoQualifier: '/mo',
    equipmentFee: 'No equipment fee',
    dataPolicy: '250 GB high-speed data',
    contractTerm: 'No annual contract',
    features: [
      'Up to 250 Mbps download, 10 Mbps upload',
      '250 GB of high-speed data each month',
      'Additional data $10 per 10 GB',
      'AK-Fi Home smart WiFi powered by Plume® included',
      'Free installation and equipment',
      'No early termination fee',
    ],
  },
];

/* --------------------------------------------------- 2. GCI+ BUNDLES --- */

export const bundlePlans: PlanItem[] = [
  {
    id: 'red-unlimited-plus',
    name: 'red Unlimited+',
    serviceLine: 'bundle',
    badge: 'Best performance',
    tagline: 'Every ceiling raised — top speed, unlimited mobile, quadruple rewards.',
    speedDown: 2500,
    speedUp: 75,
    price: 189,
    cents: '99',
    strikePrice: '$199.99',
    promoQualifier: '/mo for the first year',
    equipmentFee: 'No equipment fee',
    dataPolicy: 'Unlimited internet data',
    contractTerm: 'No annual contract',
    isPopular: true,
    features: [
      'Up to 2.5 Gbps download, 75 Mbps upload',
      'One Apex mobile line included free for 12 months',
      'Unlimited full-speed mobile data, 100 GB hotspot',
      'Apple TV 4K or Xumo Stream Box included',
      'Quadruple Atmos™ Rewards points every month',
      'Free AK-Fi Home smart WiFi and installation',
    ],
  },
  {
    id: 'fastest-unlimited-plus',
    name: 'Fastest Unlimited+',
    serviceLine: 'bundle',
    tagline: 'Gigabit speed, unlimited data, and a phone line you are not paying for.',
    speedDown: 1000,
    speedUp: 40,
    price: 149,
    cents: '99',
    strikePrice: '$159.99',
    promoQualifier: '/mo for the first year',
    equipmentFee: 'No equipment fee',
    dataPolicy: 'Unlimited internet data',
    contractTerm: 'No annual contract',
    features: [
      'Up to 1 Gbps download, 40 Mbps upload',
      'Unlimited internet data — upgraded from 1 TB standalone',
      'One Summit mobile line included free for 12 months',
      '100 GB full-speed mobile data, 30 GB hotspot',
      'Apple TV 4K or Xumo Stream Box included',
      'Double Atmos™ Rewards points every month',
    ],
  },
  {
    id: 'faster-unlimited-plus',
    name: 'Faster Unlimited+',
    serviceLine: 'bundle',
    tagline: 'The value pick — unlimited data lands here the moment you bundle.',
    speedDown: 500,
    speedUp: 20,
    price: 124,
    cents: '99',
    strikePrice: '$134.99',
    promoQualifier: '/mo for the first year',
    equipmentFee: 'No equipment fee',
    dataPolicy: 'Unlimited internet data',
    contractTerm: 'No annual contract',
    features: [
      'Up to 500 Mbps download, 20 Mbps upload',
      'Unlimited internet data — upgraded from 800 GB standalone',
      'One Peak mobile line included free for 12 months',
      '50 GB full-speed mobile data, 15 GB hotspot',
      'Apple TV 4K or Xumo Stream Box included',
      'Double Atmos™ Rewards points every month',
    ],
  },
  {
    id: 'fast-plus',
    name: 'Fast+',
    serviceLine: 'bundle',
    tagline: 'A friendly entry point that still brings a free line and a free streamer.',
    speedDown: 250,
    speedUp: 10,
    price: 89,
    cents: '99',
    strikePrice: '$99.99',
    promoQualifier: '/mo for the first year',
    equipmentFee: 'No equipment fee',
    dataPolicy: '500 GB internet data',
    contractTerm: 'No annual contract',
    features: [
      'Up to 250 Mbps download, 10 Mbps upload',
      '500 GB of data — double the standalone Fast plan',
      'One Explore mobile line included free for 12 months',
      'Unlimited talk and text, 3 GB hotspot',
      'Apple TV 4K or Xumo Stream Box included',
      'Double Atmos™ Rewards points every month',
    ],
  },
];

/* ---------------------------------------------------- 3. GCI MOBILE --- */

export const mobilePlans: PlanItem[] = [
  {
    id: 'apex',
    name: 'Apex',
    serviceLine: 'mobile',
    badge: 'Most data',
    tagline: 'Full-speed unlimited data with hotspot headroom to match.',
    price: 68,
    promoQualifier: '/mo per line with 4 lines',
    dataPolicy: 'Unlimited full-speed data',
    contractTerm: 'No annual contract',
    isPopular: true,
    features: [
      'Unlimited full-speed data in unlimited markets',
      '100 GB full-speed hotspot per line',
      'Super HD 1080p video streaming',
      'Canada and Mexico calling, text and up to 5 GB data included',
      'Nationwide 5G on our partner network, T-Mobile',
      'Up to 10 lines on one plan',
    ],
  },
  {
    id: 'summit',
    name: 'Summit',
    serviceLine: 'mobile',
    tagline: 'Premium features and a data allowance most households never reach.',
    price: 48,
    promoQualifier: '/mo per line with 4 lines',
    dataPolicy: '100 GB full-speed data per line',
    contractTerm: 'No annual contract',
    features: [
      '100 GB full-speed data per line',
      '30 GB full-speed hotspot per line',
      'Super HD 1080p video streaming',
      'Canada and Mexico calling, text and up to 5 GB data included',
      'Nationwide 5G on our partner network, T-Mobile',
      'Up to 10 lines on one plan',
    ],
  },
  {
    id: 'peak',
    name: 'Peak',
    serviceLine: 'mobile',
    tagline: 'The balance point between allowance and monthly cost.',
    price: 40,
    promoQualifier: '/mo per line with 4 lines',
    dataPolicy: '50 GB full-speed data per line',
    contractTerm: 'No annual contract',
    features: [
      '50 GB full-speed data per line',
      '15 GB full-speed hotspot per line',
      'HD video streaming',
      'Unlimited talk and text',
      'Nationwide 5G on our partner network, T-Mobile',
      'Up to 10 lines on one plan',
    ],
  },
  {
    id: 'explore',
    name: 'Explore',
    serviceLine: 'mobile',
    tagline: 'The essentials, with no overage surprises at the end of the month.',
    price: 35,
    promoQualifier: '/mo per line with 4 lines',
    dataPolicy: 'Unlimited data, no overage charges',
    contractTerm: 'No annual contract',
    features: [
      'Unlimited talk, text and data with no overage charges',
      '3 GB full-speed hotspot per line',
      'Standard definition video streaming',
      '4 GB full-speed data per line in extended markets',
      'Nationwide 5G on our partner network, T-Mobile',
      'Up to 10 lines on one plan',
    ],
  },
];

/* ------------------------------------------------ 4. GCI HOME PHONE --- */

export const phonePlans: PlanItem[] = [
  {
    id: 'no-limits-home-calling',
    name: 'No Limits Home Calling',
    serviceLine: 'phone',
    badge: 'Most popular',
    tagline: 'Unlimited nationwide calling with the full feature set switched on.',
    price: 34,
    cents: '99',
    promoQualifier: '/mo starting at',
    contractTerm: 'No annual contract',
    isPopular: true,
    features: [
      'Unlimited local calling',
      'Unlimited nationwide long-distance calling',
      'More than 10 calling features included',
      'Voicemail, caller ID, call waiting and three-way calling',
      'Battery backup option, add $35/mo',
      'Small World international calling, add $1.75/mo plus per-minute rates',
    ],
  },
  {
    id: 'basic-phone',
    name: 'Basic Phone',
    serviceLine: 'phone',
    tagline: 'A dependable dial tone without the extras.',
    price: 14,
    cents: '99',
    promoQualifier: '/mo starting at',
    contractTerm: 'No annual contract',
    features: [
      'Unlimited local calling',
      'Long-distance within Alaska at $0.10 per minute',
      'Long-distance outside Alaska at $0.14 per minute',
      'Calling features available separately',
      'Battery backup option, add $35/mo',
      'Small World international calling, add $1.75/mo plus per-minute rates',
    ],
  },
  {
    id: 'lifeline-home-phone',
    name: 'Lifeline Home Phone',
    serviceLine: 'phone',
    tagline: 'Federal Lifeline pricing for households that qualify.',
    price: 1,
    promoQualifier: '/mo for qualifying customers',
    contractTerm: 'No annual contract',
    features: [
      'Unlimited local calling',
      'Long-distance within Alaska at $0.10 per minute',
      'Long-distance outside Alaska at $0.14 per minute',
      'Eligibility verification required',
      'One Lifeline benefit per household',
    ],
  },
];

/* --------------------------------------------------- section metadata --- */

export const serviceSections: ServiceSection[] = [
  {
    id: 'fiber',
    icon: 'fiber',
    serviceLine: 'fiber',
    eyebrow: 'Fiber+ internet',
    heading: 'Residential internet plans and pricing',
    subheading:
      'All four residential plans are delivered over the Fiber+ network, which brought Alaska its first 1 Gbps service in 2015, its first 2 Gbps in 2021, and remains the only network in the state offering 2.5 Gbps.',
    theme: 'light',
    footnote:
      'Speeds shown are maximum plan speeds. Pricing excludes taxes and government fees. A $2.99 monthly paper bill fee applies unless paperless billing is selected.',
  },
  {
    id: 'bundles',
    icon: 'bundle',
    serviceLine: 'bundle',
    eyebrow: 'GCI+ bundles',
    heading: 'Internet and mobile on a single bill',
    subheading:
      'Every GCI+ bundle pairs home internet with an unlimited mobile line at no additional cost for the first twelve months. Three of the four bundles also upgrade the internet data allowance to unlimited.',
    theme: 'tint',
    footnote:
      'GCI+ is available in more than 40 Alaska communities. The included line is applied as a monthly credit across the first 12 billing periods; USF and E911 fees are not credited. The line bills at the then-current rate thereafter. Up to nine additional lines may be added to any bundle.',
  },
  {
    id: 'mobile',
    icon: 'mobile',
    serviceLine: 'mobile',
    eyebrow: 'GCI Mobile',
    heading: "Nationwide coverage on Alaska's fastest 5G network",
    subheading:
      'GCI operates the fastest 5G network in Alaska, and a partnership with T-Mobile extends service across the Lower 48. Every plan includes unlimited talk and text.',
    theme: 'light',
    footnote:
      'Per-line pricing reflects a four-line account. A $35 wireless service activation fee may apply. Once a line reaches its included full-speed data allowance, speeds are reduced to 128 Kbps until the next billing cycle. Mobile hotspot use requires a compatible device.',
  },
  {
    id: 'phone',
    icon: 'handset',
    serviceLine: 'phone',
    eyebrow: 'GCI Home Phone',
    heading: 'Reliable landline service with unlimited calling',
    subheading:
      'A wired line maintains dial tone and direct 911 access independently of cellular coverage, which matters during Alaskan winters. Plans begin at $14.99 per month.',
    theme: 'tint',
    footnote:
      'Monthly rates exclude taxes and surcharges. Puerto Rico, Guam, the U.S. Virgin Islands, American Samoa and the Northern Mariana Islands are included in the local calling area.',
  },
];

/* --------------------------------------------------- fine print grid --- */

export interface FinePrintRow {
  label: string;
  fiber: string;
  bundle: string;
  mobile: string;
  phone: string;
}

export const finePrint: FinePrintRow[] = [
  {
    label: 'Annual contract',
    fiber: 'None',
    bundle: 'None',
    mobile: 'None',
    phone: 'None',
  },
  {
    label: 'Early termination fee',
    fiber: 'None',
    bundle: 'None',
    mobile: 'None',
    phone: 'None',
  },
  {
    label: 'Equipment fee',
    fiber: 'None — AK-Fi included',
    bundle: 'None — AK-Fi included',
    mobile: 'Device financing optional',
    phone: 'None',
  },
  {
    label: 'Installation',
    fiber: 'Free, same or next day',
    bundle: 'Free, same or next day',
    mobile: 'Activate in store or by phone',
    phone: 'Free, same or next day',
  },
  {
    label: 'Activation fee',
    fiber: 'None',
    bundle: 'None',
    mobile: '$35 may apply',
    phone: 'None',
  },
  {
    label: 'Paper bill fee',
    fiber: '$2.99/mo',
    bundle: '$2.99/mo',
    mobile: '$2.99/mo',
    phone: '$2.99/mo',
  },
  {
    label: 'Data beyond allowance',
    fiber: '$10 per increment, or unlimited on red',
    bundle: 'Unlimited on three of four bundles',
    mobile: 'Slowed to 128 Kbps, never billed',
    phone: 'Not applicable',
  },
  {
    label: 'Taxes and government fees',
    fiber: 'Additional',
    bundle: 'Additional',
    mobile: 'Additional',
    phone: 'Additional',
  },
  {
    label: 'Promotional pricing',
    fiber: 'Standard rate, not introductory',
    bundle: 'First 12 months, then standard rate',
    mobile: 'Four-line rate shown',
    phone: 'Standard rate',
  },
];

/* ------------------------------------------------------------ why GCI --- */

export interface FeatureItem {
  title: string;
  body: string;
  metric?: string;
  icon: IconName;
}

export const whyGci: FeatureItem[] = [
  {
    metric: '15,000',
    title: 'Miles of fiber backbone',
    icon: 'route',
    body:
      'More than four decades of installing fiber, microwave relay and subsea cable across terrain that is inaccessible to most carriers. That backbone is what brings gigabit service to communities of a few hundred residents.',
  },
  {
    metric: '80%',
    title: 'Of Alaskans are multi-gig ready',
    icon: 'map',
    body:
      'Four in five Alaskans can order multi-gigabit service on the Fiber+ network today, and the build continues to extend further into rural communities each year.',
  },
  {
    metric: '#1',
    title: 'Independently rated fastest in Alaska',
    icon: 'award',
    body:
      "PCMag measured GCI as the fastest internet service provider in the state. Ookla recorded the same result for 5G, and Alaska Business Monthly named GCI the state's best telecommunications provider.",
  },
  {
    metric: '0',
    title: 'Contracts and termination fees',
    icon: 'shield',
    body:
      'No annual agreement applies to internet, mobile or home phone service. There is nothing to buy out if you relocate, and no equipment rental charge on the bill.',
  },
  {
    metric: '2.5',
    title: 'Gigabits at the top tier',
    icon: 'bolt',
    body:
      'red Unlimited delivers up to 2.5 Gbps downstream with unlimited data. GCI reached 1 Gbps in 2015 and 2 Gbps in 2021, and is currently engineering toward 10 Gbps.',
  },
  {
    metric: 'AK',
    title: 'Engineered for Alaskan conditions',
    icon: 'snowflake',
    body:
      'Network plant is specified for permafrost, wind loading and sustained sub-zero temperatures. AK-Fi Home includes complimentary extenders so coverage reaches the full footprint of the home.',
  },
];

/* ---------------------------------------------------------------- FAQ --- */

export interface FaqItem {
  q: string;
  a: string;
}

export const faqs: FaqItem[] = [
  {
    q: 'How fast is GCI internet, really?',
    a: "The top residential tier, red Unlimited, is rated up to 2.5 Gbps down and 75 Mbps up. GCI's own published measurements put typical peak-hour performance at about 2.1 Gbps down and 75 Mbps up on that plan, with roughly 9 ms latency. The Fastest tier measures near 1 Gbps, Faster near 504 Mbps and Fast near 253 Mbps.",
  },
  {
    q: 'Which plans include unlimited data?',
    a: 'red Unlimited includes unlimited data on its own. On the bundle side, red Unlimited+, Fastest Unlimited+ and Faster Unlimited+ all carry unlimited internet data, so bundling lifts the cap on the middle tiers. Standalone Fastest includes 1 TB, Faster includes 800 GB and Fast includes 250 GB.',
  },
  {
    q: 'What happens if I go over my data allowance?',
    a: 'On capped internet plans, additional data is billed in increments — $10 per 75 GB on Fastest, $10 per 40 GB on Faster and $10 per 10 GB on Fast. Mobile plans work differently: there is no overage charge at all, and a line that uses its full-speed allowance simply runs at 128 Kbps until the next bill cycle.',
  },
  {
    q: 'Is there a contract or an early termination fee?',
    a: 'No. GCI residential internet, mobile and home phone all run without an annual service contract and without an early termination fee. The one commitment to know about is the free streaming device, which rides on a 24-month financing agreement discounted to $0 — cancel internet inside that window and the remaining device balance comes due.',
  },
  {
    q: 'How does the free mobile line for a year work?',
    a: 'It comes with a GCI+ bundle. The first unlimited mobile line is credited across the first twelve billing periods, so the line itself costs nothing for a year. USF and E911 fees are not credited, and after twelve months the line bills at the standard rate. You can add up to nine more lines to any bundle.',
  },
  {
    q: 'Do I have to rent a modem or router?',
    a: 'No. AK-Fi Home smart WiFi, powered by Plume®, is included with GCI internet at no equipment fee, and WiFi extenders are provided free to cover dead zones. Installation is free and is typically scheduled same day or next day.',
  },
  {
    q: 'Where is GCI+ bundling available?',
    a: 'More than forty Alaska communities, including Anchorage, Fairbanks, Juneau, the Mat-Su valley, Kenai, Soldotna, Homer, Kodiak, Ketchikan, Sitka, Nome, Kotzebue, Bethel, Utqiagvik, Unalaska, Valdez, Cordova, Petersburg, Wrangell and Seward, along with several smaller villages. Call and we will confirm your specific address.',
  },
  {
    q: 'Does GCI mobile work outside Alaska?',
    a: "Yes. GCI operates Alaska's fastest 5G network in state, and a partnership with T-Mobile carries your line across the Lower 48. Apex and Summit lines also include calling, texting and up to 5 GB of data in Canada and Mexico.",
  },
  {
    q: 'What is Atmos Rewards?',
    a: "It is GCI's loyalty programme, formerly Alaska Airlines Miles. Standard service earns one point per dollar spent. GCI+ bundles earn double points every month, and red Unlimited+ earns quadruple.",
  },
  {
    q: 'Can I keep my current phone number?',
    a: 'Yes, number portability applies to both mobile and home phone. Bring your existing number across when you order and keep your line active until the transfer completes.',
  },
];

/* ------------------------------------------------------------- images --- */

export interface ImageAsset {
  src: string;
  /** Intrinsic dimensions, so next/image can reserve space and avoid CLS. */
  width: number;
  height: number;
  /** Empty string marks the image as decorative (hidden from assistive tech). */
  alt: string;
}

/**
 * Every photograph on the site. Paths point at `public/images/`.
 * Swapping a photo is a one-line change here — no component edits.
 */
export const imageAssets = {
  hero: {
    src: '/images/hero-background.jpg',
    width: 1238,
    height: 768,
    alt: '',
  },
  offers: {
    src: '/images/offers-lifestyle.jpg',
    width: 678,
    height: 1264,
    alt: '',
  },
  fiber: {
    src: '/images/section-fiber.jpg',
    width: 1238,
    height: 768,
    alt: 'A teenager streaming on a laptop while a parent takes a video call at the dining table of an Alaskan home, snow visible through the window.',
  },
  bundle: {
    src: '/images/section-bundles.jpg',
    width: 1238,
    height: 768,
    alt: 'A family gathered around a kitchen island in the evening, using a phone and a tablet together.',
  },
  mobile: {
    src: '/images/section-mobile.jpg',
    width: 1238,
    height: 768,
    alt: 'A man in a winter parka taking a call on his mobile beside a pickup on a gravel road, Alaskan mountains behind him.',
  },
  phone: {
    src: '/images/section-phone.jpg',
    width: 1238,
    height: 768,
    alt: 'A corded landline telephone and a handwritten notepad on a worn kitchen counter.',
  },
  network: {
    src: '/images/why-network.jpg',
    width: 1238,
    height: 768,
    alt: 'Two technicians splicing fiber at a roadside enclosure in remote Alaska, mountains and spruce forest behind them.',
  },
  og: {
    src: '/images/og-image.jpg',
    width: 1200,
    height: 630,
    alt: '',
  },
} as const satisfies Record<string, ImageAsset>;

/** The photo paired with a service section's heading. */
export function sectionImage(line: ServiceLine): ImageAsset | null {
  switch (line) {
    case 'fiber':
      return imageAssets.fiber;
    case 'bundle':
      return imageAssets.bundle;
    case 'mobile':
      return imageAssets.mobile;
    case 'phone':
      return imageAssets.phone;
    default:
      return null;
  }
}

/* ------------------------------------------------------------- footer --- */

export const footerNav: { heading: string; links: { label: string; href: string }[] }[] = [
  {
    heading: 'Shop',
    links: [
      { label: 'Fiber+ Internet', href: '#fiber' },
      { label: 'GCI+ Bundles', href: '#bundles' },
      { label: 'GCI Mobile', href: '#mobile' },
      { label: 'Home Phone', href: '#phone' },
      { label: 'Check availability', href: '#top' },
    ],
  },
  {
    heading: 'Learn',
    links: [
      { label: 'Current offers', href: '#offers' },
      { label: 'Inclusions & fees', href: '#fine-print' },
      { label: 'Why GCI', href: '#why-gci' },
      { label: 'All FAQs', href: '#faq' },
    ],
  },
];

/**
 * Required offer disclosures, rendered in the footer the way a regulated
 * telecom retailer is expected to present them.
 */
export const footerDisclosures: string[] = [
  'INTERNET OFFER: Advertised speeds are maximum plan speeds. Actual speeds vary with equipment, in-home wiring, WiFi conditions, the number of connected devices and network utilisation, and are not guaranteed. Pricing excludes taxes, government fees and surcharges. A $2.99 monthly paper bill fee applies unless paperless billing is selected. Service availability is determined at the street-address level and is not available in all areas.',
  'DATA ALLOWANCES: red Unlimited includes unlimited high-speed data. Fastest includes 1 TB, Faster includes 800 GB and Fast includes 250 GB per billing period. Additional data is billed at $10 per 75 GB on Fastest, $10 per 40 GB on Faster and $10 per 10 GB on Fast. Reasonable use limits apply to unlimited plans; service is intended for residential use.',
  'GCI+ BUNDLE OFFER: Available to residential customers in eligible markets only. Each GCI+ plan is a bundled offer combining multiple services at a single price, plus applicable taxes and fees. The first unlimited mobile line is applied as a monthly credit across the first 12 billing periods; USF and E911 fees are not credited. After twelve months the line bills at the then-current rate. Up to nine additional lines may be added. Offer cannot be combined with other promotions.',
  'MOBILE SERVICE: Per-line pricing shown reflects a four-line account. A $35 wireless service activation fee may apply. Once a line reaches its included full-speed data allowance, data speeds are reduced to a maximum of 128 Kbps until the next billing cycle; there is no overage charge. Tethering and mobile hotspot require a compatible device and are subject to separate per-line allowances. Nationwide coverage outside Alaska is provided on the T-Mobile network. Extended market allowances differ from unlimited market allowances.',
  'INTERNATIONAL AND ROAMING: Apex and Summit lines include calling, texting and up to 5 GB of data while roaming in Canada and Mexico; data beyond 5 GB is rated at $12 per GB. Peak and Explore lines are pay as you go. Any usage outside the United States requires International Roaming to be enabled, and calling and texting are charged at published per-country rates.',
  'STREAMING DEVICE: The included Apple TV 4K or Xumo Stream Box requires a 24-month device financing agreement with monthly payments discounted to $0 for the term. If internet service is disconnected within that period, the remaining device balance becomes due. Devices appear as a separate line item on the invoice. Not available to business customers or property-provided internet customers.',
  'HOME PHONE: Monthly rates exclude taxes and surcharges. Battery backup is available at an additional $35 per month. Small World international calling is an add-on of $1.75 per month plus flat per-minute rates by destination. Lifeline pricing requires eligibility verification and is limited to one benefit per household.',
  'ATMOS REWARDS: Standard GCI service earns one Atmos Rewards point per dollar spent. GCI+ bundle customers earn double points monthly, and red Unlimited+ customers earn quadruple points. Program eligibility requirements and full terms apply.',
  'EQUIPMENT AND INSTALLATION: Standard professional installation and AK-Fi Home equipment are included at no charge on GCI residential internet plans. Non-standard installation work may carry a separate charge, quoted for approval before it is performed. An adult aged 18 or over must be present for the installation appointment.',
  'GENERAL: All offers are limited-time, subject to change without notice, and subject to availability, credit approval and qualification. Standard rates apply after any promotional period. Terms, conditions, additional charges and fees apply. Restrictions apply.',
];

/* ------------------------------------------------------- legal pages --- */

export const legalPages = [
  { slug: 'privacy-data-protection', title: 'Privacy & Data Protection' },
  { slug: 'disclaimer', title: 'Disclaimer' },
  { slug: 'cookies-policy', title: 'Cookies Policy' },
  { slug: 'tcpa-policy', title: 'TCPA Policy' },
  { slug: 'trademarks', title: 'Trademarks' },
  { slug: 'marketing-policy', title: 'Marketing Policy' },
  { slug: 'service-fulfillment', title: 'Service Fulfillment' },
  { slug: 'pci-dss', title: 'PCI DSS' },
] as const;

/* --------------------------------------------------------- navigation --- */

export const navLinks = serviceSections.map((s) => ({
  href: `#${s.id}`,
  label:
    s.serviceLine === 'fiber'
      ? 'Internet'
      : s.serviceLine === 'bundle'
        ? 'Bundles'
        : s.serviceLine === 'mobile'
          ? 'Mobile'
          : 'Home Phone',
}));

/* ------------------------------------------------------------ helpers --- */

/** "2.5 Gbps" from 2500, "500 Mbps" from 500. */
export function formatSpeed(mbps: number): string {
  const { value, unit } = splitSpeed(mbps);
  return `${value} ${unit}`;
}

/**
 * Same conversion, split so a card can set the numeral and the unit at
 * different sizes and keep "500 Mbps" on one line in a narrow column.
 */
export function splitSpeed(mbps: number): { value: string; unit: 'Gbps' | 'Mbps' } {
  return mbps >= 1000
    ? { value: (mbps / 1000).toFixed(1).replace(/\.0$/, ''), unit: 'Gbps' }
    : { value: String(mbps), unit: 'Mbps' };
}

/** Plan cards say "Call to order", or "Call for pricing" when no price is published. */
export function ctaLabel(plan: PlanItem): string {
  return typeof plan.price === 'number' ? 'Call to order' : 'Call for pricing';
}

/** Cheapest published internet plan, used for the hero's "from" price. */
export function entryInternetPlan(): PlanItem {
  return fiberPlans.reduce((lo, p) =>
    (p.price ?? Infinity) < (lo.price ?? Infinity) ? p : lo,
  );
}

export function plansFor(line: ServiceLine): PlanItem[] {
  switch (line) {
    case 'fiber':
      return fiberPlans;
    case 'bundle':
      return bundlePlans;
    case 'mobile':
      return mobilePlans;
    case 'phone':
      return phonePlans;
    default:
      return [];
  }
}
