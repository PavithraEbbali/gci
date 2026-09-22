export interface LegalSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface LegalDoc {
  slug: string;
  title: string;
  summary: string;
  sections: LegalSection[];
}

/* =============================================================================
 *  Legal content for the eight footer pages.
 *  Editorial, not legal advice — have counsel review before launch.
 * ========================================================================== */

export const legalDocs: LegalDoc[] = [
  /* ------------------------------------------------------------------- 1 -- */
  {
    slug: 'privacy-data-protection',
    title: 'Privacy & Data Protection',
    summary: 'How we collect, use, protect and share the information you give us when you enquire about or order GCI service.',
    sections: [
      {
        heading: 'Who we are',
        paragraphs: [
          "This site is operated by an independent authorized retailer of GCI. The retailer is a separate company from GCI. This policy covers information collected through this website and through sales calls placed to or from our team. It does not govern information you provide directly to GCI after your account is established; that relationship is governed by GCI's own privacy policy.",
        ],
      },
      {
        heading: 'Information we collect',
        paragraphs: ['We collect only what an order actually requires:'],
        bullets: [
          'Contact details you give us — name, service address, telephone number and email address.',
          'Service preferences — the plan, speed tier or bundle you are interested in.',
          'ZIP codes entered into the availability checker on this site. These are processed in your browser and are not transmitted to us or stored.',
          'Standard technical data logged by our hosting provider, such as IP address, browser type and pages viewed.',
          'Call records, where a sales call is recorded for quality assurance. You are notified at the start of any recorded call.',
        ],
      },
      {
        heading: 'How we use it',
        paragraphs: [
          'We use your information to check serviceability at your address, to prepare and submit your order, to communicate with you about that order, and to meet our record-keeping obligations. We do not use your information to build advertising profiles.',
        ],
      },
      {
        heading: 'How we share it',
        paragraphs: [
          'To provision service, we transmit the details necessary to complete your order to GCI. We also use a small number of vendors — website hosting, telephony and customer-record systems — who process data strictly on our instructions under written contract.',
          'We do not sell personal information. We do not share it with unaffiliated third parties for their own marketing purposes.',
        ],
      },
      {
        heading: 'Retention and security',
        paragraphs: [
          'Order records are retained for as long as needed to service the order and to satisfy legal, tax and audit requirements, then securely destroyed. We maintain administrative, technical and physical safeguards appropriate to the sensitivity of the data, including encryption in transit, role-based access control and routine access review.',
        ],
      },
      {
        heading: 'Your choices',
        paragraphs: [
          'You may request a copy of the information we hold about you, ask us to correct it, ask us to delete it where we are not required to retain it, and opt out of marketing contact at any time. Requests are handled within the timeframes set by applicable law. Contact us using the telephone number published on this site.',
        ],
      },
      {
        heading: 'Children',
        paragraphs: [
          'This site is directed to adults. We do not knowingly collect personal information from anyone under 13. If we learn that we have, we delete it.',
        ],
      },
      {
        heading: 'Changes',
        paragraphs: [
          'We may update this policy as our practices or the law change. The current version always governs, and material changes are reflected on this page.',
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------- 2 -- */
  {
    slug: 'disclaimer',
    title: 'Disclaimer',
    summary: 'The basis on which information is published on this site, and the limits of what we can promise.',
    sections: [
      {
        heading: 'Independent retailer status',
        paragraphs: [
          'This site is operated by an independent authorized retailer of GCI. We are not GCI, and this site is not operated by GCI. We sell and order GCI residential services; we do not own or operate the network.',
        ],
      },
      {
        heading: 'Pricing and plan information',
        paragraphs: [
          'Plan names, speeds, data allowances, promotional terms and prices shown on this site describe GCI residential offers and are reproduced in good faith. They are subject to change by GCI at any time, and are subject to availability, market, qualification and credit approval.',
          'Prices shown exclude taxes, government fees and surcharges unless expressly stated. Promotional pricing may be limited in duration, and standard rates apply once a promotional period ends.',
        ],
      },
      {
        heading: 'Speeds are maximums',
        paragraphs: [
          'Advertised speeds are the maximum speeds a plan is capable of delivering. Actual throughput varies with your equipment, in-home wiring, WiFi conditions, the number of connected devices, network utilisation and the capacity of the destination server. No speed is guaranteed.',
        ],
      },
      {
        heading: 'Availability',
        paragraphs: [
          'Serviceability is determined at the street-address level. The availability checker on this site is a general indicator only and does not confirm that a particular plan can be installed at a particular address. Confirmation is made at the point of order.',
        ],
      },
      {
        heading: 'No warranty',
        paragraphs: [
          'This site is provided on an "as is" and "as available" basis. To the fullest extent permitted by law we disclaim all warranties, express or implied, including merchantability, fitness for a particular purpose and non-infringement. We do not warrant that the site will be uninterrupted or error-free.',
        ],
      },
      {
        heading: 'Limitation of liability',
        paragraphs: [
          'To the fullest extent permitted by law, neither we nor our officers, employees or agents are liable for indirect, incidental, special, consequential or punitive damages arising out of your use of this site or reliance on information published on it.',
        ],
      },
      {
        heading: 'External links',
        paragraphs: [
          'Where this site links to a third-party website, we do not control and are not responsible for that site’s content, availability or practices.',
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------- 3 -- */
  {
    slug: 'cookies-policy',
    title: 'Cookies Policy',
    summary: 'What cookies and similar technologies this site uses, why, and how to control them.',
    sections: [
      {
        heading: 'What cookies are',
        paragraphs: [
          'A cookie is a small text file a website asks your browser to store. Cookies let a site remember things between page loads. Similar technologies — local storage, pixels and SDKs — do comparable work and are covered by this policy.',
        ],
      },
      {
        heading: 'Categories we use',
        paragraphs: ['This site keeps its cookie footprint deliberately small.'],
        bullets: [
          'Strictly necessary — required for the site to load, render correctly and remain secure. These cannot be switched off.',
          'Performance and analytics — aggregate measurement of which pages are viewed and how the site performs. Data is aggregated and is not used to identify you individually.',
          'Functional — remembers preferences such as reduced-motion settings so the site behaves consistently on return visits.',
          'Advertising — where used, these measure the effectiveness of campaigns that bring visitors to this site. They are set only with consent where consent is required.',
        ],
      },
      {
        heading: 'The availability checker',
        paragraphs: [
          'The ZIP code you enter into the availability checker is evaluated entirely within your browser. It is not written to a cookie, not transmitted to our servers and not retained.',
        ],
      },
      {
        heading: 'Managing cookies',
        paragraphs: [
          'Every major browser lets you view, block and delete cookies through its settings, and offers a private browsing mode that discards them at the end of a session. Blocking strictly necessary cookies may prevent parts of this site from working.',
          'Most browsers also transmit a Global Privacy Control signal when you enable it. We honour that signal where applicable law requires it.',
        ],
      },
      {
        heading: 'Do Not Track',
        paragraphs: [
          'There is no industry-wide consensus on how to interpret browser Do Not Track headers. We do not currently respond to them, and we say so plainly rather than implying otherwise.',
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------- 4 -- */
  {
    slug: 'tcpa-policy',
    title: 'TCPA Policy',
    summary: 'How we handle telephone and text contact under the Telephone Consumer Protection Act.',
    sections: [
      {
        heading: 'Our commitment',
        paragraphs: [
          "We contact consumers by telephone and text message only in a manner consistent with the Telephone Consumer Protection Act (47 U.S.C. § 227), the FCC's implementing rules, the Telemarketing Sales Rule and applicable state law.",
        ],
      },
      {
        heading: 'Consent',
        paragraphs: [
          'By submitting your telephone number to us — on this site, in a callback request, or verbally during a call — you agree that we and our authorized representatives may contact you at that number about the products and services you enquired about. This may include calls and text messages placed using automated technology.',
          'Consent to receive marketing calls or texts is never a condition of purchasing anything from us. You may decline and still place an order.',
          'Message and data rates may apply to text messages. Message frequency varies.',
        ],
      },
      {
        heading: 'Calling hours',
        paragraphs: [
          'We place outbound calls only between 8:00 a.m. and 9:00 p.m. in the recipient’s local time zone, and we observe federal and state holiday restrictions.',
        ],
      },
      {
        heading: 'Do Not Call',
        paragraphs: [
          'We maintain an internal Do Not Call list and we scrub against the National Do Not Call Registry and applicable state registries at the intervals the rules require.',
          'To be added to our internal Do Not Call list, tell any representative during a call, reply STOP to any text message, or call the number published on this site and ask. Requests are honoured promptly and are retained permanently unless you later ask us to resume contact.',
        ],
      },
      {
        heading: 'Identification and recording',
        paragraphs: [
          'Our representatives identify themselves by name and identify the company as an independent authorized retailer of GCI at the start of every call. Where a call is recorded for quality assurance, you are told before the recording begins.',
        ],
      },
      {
        heading: 'Reporting a concern',
        paragraphs: [
          'If you believe you have received a call or message from us that does not comply with this policy, call the number published on this site. We investigate every report and correct the underlying cause.',
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------- 5 -- */
  {
    slug: 'trademarks',
    title: 'Trademarks',
    summary: 'Ownership of the marks referenced on this site and the basis on which they are used.',
    sections: [
      {
        heading: 'Third-party marks',
        paragraphs: [
          'GCI, GCI+, Fiber+, AK-Fi, red Unlimited, Atmos Rewards and related names, logos and product designations are trademarks or registered trademarks of GCI Communication Corp. and its affiliates.',
          'Apple, Apple TV and iPad are trademarks of Apple Inc. Samsung and Galaxy are trademarks of Samsung Electronics Co., Ltd. T-Mobile is a trademark of T-Mobile USA, Inc. Plume is a trademark of Plume Design, Inc. Xumo is a trademark of Xumo, LLC. PCMag is a trademark of Ziff Davis, LLC. Ookla and Speedtest are trademarks of Ookla, LLC.',
          'All other marks are the property of their respective owners.',
        ],
      },
      {
        heading: 'Nominative fair use',
        paragraphs: [
          'We use these marks solely to identify the products and services we are authorized to sell. That use is nominative and descriptive. It does not assert ownership of any mark, and it does not imply that any mark owner sponsors, endorses or is affiliated with this website beyond the retail authorization we hold with GCI.',
        ],
      },
      {
        heading: 'Our marks',
        paragraphs: [
          'The design, layout and original written content of this website are the property of the retailer that operates it and may not be reproduced without prior written permission.',
        ],
      },
      {
        heading: 'Reporting misuse',
        paragraphs: [
          'If you believe a mark is used incorrectly anywhere on this site, contact us using the telephone number published here and we will review it promptly.',
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------- 6 -- */
  {
    slug: 'marketing-policy',
    title: 'Marketing Policy',
    summary: 'The standards we hold our own advertising and sales conduct to.',
    sections: [
      {
        heading: 'Truthful advertising',
        paragraphs: [
          'Every claim we publish must be accurate at the time of publication and substantiated by the provider’s own materials. Prices, speeds and promotional terms are reproduced from GCI’s published offers. Where a claim depends on a condition — a bundle, a term, a qualifying market — that condition is stated alongside the claim rather than buried.',
        ],
      },
      {
        heading: 'Clear identification',
        paragraphs: [
          'Every page of this site, and every sales conversation, identifies this business as an independent authorized retailer of GCI. We do not claim to be GCI itself, and a persistent disclosure appears at the top of every page.',
        ],
      },
      {
        heading: 'What we will not do',
        paragraphs: ['Our representatives are trained and monitored against the following prohibitions:'],
        bullets: [
          'No claims about a competitor’s network, pricing or service that we cannot substantiate.',
          'No quoting of a price without disclosing that taxes, fees and surcharges are additional.',
          'No representation that a promotional rate is permanent.',
          'No high-pressure closing tactics, artificial deadlines or fabricated scarcity.',
          'No enrolment in any service a customer has not expressly agreed to.',
        ],
      },
      {
        heading: 'Email and SMS',
        paragraphs: [
          'Commercial email complies with the CAN-SPAM Act: accurate headers, a subject line that reflects the content, a valid postal address and a working unsubscribe link honoured within ten business days. Text messaging follows our TCPA Policy, and STOP is honoured immediately.',
        ],
      },
      {
        heading: 'Accessibility',
        paragraphs: [
          'We build toward WCAG 2.1 Level AA. That means legible contrast, full keyboard operability, visible focus states, meaningful alternative text and respect for reduced-motion preferences. If any part of this site presents a barrier to you, tell us and we will fix it.',
        ],
      },
      {
        heading: 'Accountability',
        paragraphs: [
          'Sales calls are monitored for compliance with this policy. Representatives who breach it are retrained or removed from the programme.',
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------- 7 -- */
  {
    slug: 'service-fulfillment',
    title: 'Service Fulfillment',
    summary: 'What happens between placing an order with us and service going live at your address.',
    sections: [
      {
        heading: 'Our role',
        paragraphs: [
          'We take your order and submit it for provisioning. The underlying service is delivered by GCI over its network. Once your account is established, your service agreement is with GCI, and your monthly bill comes from GCI rather than from us.',
        ],
      },
      {
        heading: 'How an order proceeds',
        paragraphs: ['A typical order moves through five stages:'],
        bullets: [
          'Qualification — we verify at the street-address level which plans and speed tiers can be delivered to your home.',
          'Plan selection — we confirm the tier, any bundle, the total monthly rate and every fee that attaches to it before anything is submitted.',
          'Order submission — we submit the order and provide you with confirmation details.',
          'Scheduling — an installation or activation window is set. Installation is typically available same day or next day in serviced markets.',
          'Activation — service goes live, and your equipment is configured at the same visit.',
        ],
      },
      {
        heading: 'Installation',
        paragraphs: [
          'Standard professional installation and equipment are included at no charge on GCI residential internet plans. Non-standard work — additional outlets, long runs, custom routing or work requiring a property owner’s consent — may carry a separate charge, which is quoted to you for approval before it is performed.',
          'An adult aged 18 or over must be present for the installation window, and the technician needs access to the demarcation point and to the room where equipment will be placed.',
        ],
      },
      {
        heading: 'Timing',
        paragraphs: [
          'Installation windows depend on technician availability, weather and the condition of existing plant at the address. Rural and off-road-system communities may require longer lead times. Any date we give you is an estimate until the appointment is confirmed.',
        ],
      },
      {
        heading: 'Pricing accuracy',
        paragraphs: [
          'We quote the plan rate, the promotional period where one applies, the rate that takes effect afterward, and every recurring fee we are aware of. Taxes, government fees and surcharges are additional and are set by the taxing authority, not by us or by GCI.',
        ],
      },
      {
        heading: 'Changes and cancellations',
        paragraphs: [
          'You may change or cancel an order that has not yet been installed by calling us. GCI residential internet, mobile and home phone carry no annual contract and no early termination fee. Where a promotional device was financed at a discounted rate, cancelling service inside the financing term makes the remaining device balance due.',
        ],
      },
      {
        heading: 'If something goes wrong with your order',
        paragraphs: [
          'If an order we submitted was provisioned differently from what we quoted you, call us. We opened the order and we will see it corrected.',
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------- 8 -- */
  {
    slug: 'pci-dss',
    title: 'PCI DSS',
    summary: 'How payment card data is handled, and why this website never touches it.',
    sections: [
      {
        heading: 'This website takes no payments',
        paragraphs: [
          'There is no checkout, no payment form and no card field anywhere on this site. No cardholder data is ever entered into, transmitted by or stored on this website. If a page claiming to be ours asks you to enter a card number, it is not ours — leave it and call the number published here.',
        ],
      },
      {
        heading: 'Our compliance posture',
        paragraphs: [
          'Where we handle payment card information in the course of taking an order, we do so in accordance with the Payment Card Industry Data Security Standard (PCI DSS). We maintain the assessment and reporting obligations that apply to our merchant level and validate them annually.',
        ],
      },
      {
        heading: 'Controls we maintain',
        paragraphs: [],
        bullets: [
          'Card data is captured through a validated third-party payment environment, never written to our own systems.',
          'Full primary account numbers are never stored, and we do not retain sensitive authentication data after authorization under any circumstances.',
          'Card numbers are masked in every interface and in every record a representative can see.',
          'Access to any system in scope is role-based, individually attributed, multi-factor authenticated and reviewed on a regular cycle.',
          'Transmission of cardholder data uses strong cryptography over public networks.',
          'Systems in scope are patched on a defined schedule and scanned by an Approved Scanning Vendor at the required cadence.',
          'Representatives who handle payments complete security awareness training before taking calls and annually thereafter.',
        ],
      },
      {
        heading: 'Call recording',
        paragraphs: [
          'Where a sales call is recorded, recording is paused before any payment information is spoken and resumed afterward, so card data does not enter the recording archive.',
        ],
      },
      {
        heading: 'Reporting a security concern',
        paragraphs: [
          'If you believe payment information has been mishandled, or you have found a security weakness in our systems, call the number published on this site and ask for the security contact. We investigate every report.',
        ],
      },
    ],
  },
];

export function getLegalDoc(slug: string): LegalDoc | undefined {
  return legalDocs.find((d) => d.slug === slug);
}
