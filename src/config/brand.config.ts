/**
 * ════════════════════════════════════════════════════════════════════════════
 *  BRAND CONFIG — the ONE file that makes this site "yours"
 * ════════════════════════════════════════════════════════════════════════════
 *
 *  This is the single source of truth for everything that changes from one
 *  broker/agent to the next. The building itself (Roche Bobois Residences St.
 *  Petersburg — the renderings, address, unit counts, amenities, developer,
 *  architect, brand partner) is the SAME on every copy of this site, so that
 *  content lives in the components and `src/data/` and does NOT belong here.
 *
 *  WHAT BELONGS HERE: your brokerage details, your agent details, your logo,
 *  your contact form, your analytics tag IDs, and your domain.
 *
 *  ── HOW TO FILL THIS IN ──────────────────────────────────────────────────
 *  You do NOT have to edit this file by hand. Open this project in your AI
 *  coding assistant and type:  /personalize
 *  …and it will interview you question-by-question and fill everything in for
 *  you, then help you go live. (Prefer to read along? See SETUP.md.)
 *
 *  Every value below currently holds an obvious PLACEHOLDER. The site will
 *  build and run with the placeholders in place, but DO NOT deploy it publicly
 *  until your real details are filled in — the legal disclaimer in the footer
 *  must name your actual licensed brokerage.
 * ════════════════════════════════════════════════════════════════════════════
 */

export type ContactFormProvider = 'jotform' | 'embed';

export interface BrandConfig {
  brokerage: {
    /** Full legal brokerage name, e.g. "Acme Realty Partners LLC" */
    name: string;
    /** "Doing business as" name, if different from the legal name. Leave "" if none. */
    dba: string;
    /** Florida real estate license #, e.g. "CQ1234567" */
    license: string;
    /** Office mailing address, one line, e.g. "123 Main St, Ste 100, Tampa, FL 33602" */
    address: string;
    /** Public phone number, e.g. "(727) 555-0100" */
    phone: string;
    /** Public contact email, e.g. "hello@acmerealty.com" */
    email: string;
  };

  agent: {
    /** Agent / point-of-contact full name. Leave "" to hide the agent block. */
    name: string;
    /** Agent title, e.g. "Licensed Real Estate Advisor" */
    title: string;
    /** Path to the agent headshot. Drop your photo at public/brand/agent.jpg (keep the name). */
    photo: string;
    /** Alt text for the headshot (accessibility), e.g. "Jane Doe, Realtor" */
    headshotAlt: string;
  };

  /** Path to YOUR brokerage logo. Drop your file at public/brand/logo.png (keep the name). */
  logo: string;

  /** Alt text for your logo, e.g. "Acme Realty Partners" */
  logoAlt: string;

  contactForm: {
    /**
     * 'jotform' = use the built-in, beautifully-styled native form (recommended).
     *             Requires a JotForm whose field names match this template's form
     *             (duplicate the provided JotForm template so the fields line up).
     *             Conversion tracking fires automatically on this path.
     * 'embed'   = replace the native form with your own pasted embed (JotForm,
     *             Typeform, Calendly, etc.). Use the IFRAME version of the embed.
     *             Conversion tracking is NOT automatic on this path.
     */
    provider: ContactFormProvider;
    /** Your JotForm form ID (the number in your form's URL). Used when provider = 'jotform'. */
    jotformId: string;
    /** Raw iframe embed HTML. Used when provider = 'embed'. */
    embedCode: string;
  };

  analytics: {
    /** GA4 Measurement ID, e.g. "G-XXXXXXXXXX". Leave "" to disable GA4. */
    ga4: string;
    /** Google Ads tag ID, e.g. "G-XXXXXXXXXX" or "AW-XXXXXXXXX". Leave "" to disable. */
    googleAds: string;
    /** Google Ads conversion ID, e.g. "AW-1234567890". Leave "" to disable conversion tracking. */
    conversionId: string;
    /** Google Ads conversion label (the part after the slash in your conversion's send_to). */
    conversionLabel: string;
  };

  /** Your live custom domain, e.g. "luxurycondosstpete.com". Used for metadata/SEO. Leave "" until you have one. */
  domain: string;
}

export const brand: BrandConfig = {
  brokerage: {
    name: 'Your Brokerage Name LLC',
    dba: '',
    license: 'FL Lic. #XXXXXXX',
    address: '123 Your Street, Ste 100, Your City, FL 00000',
    phone: '(000) 000-0000',
    email: 'hello@yourbrokerage.com',
  },

  agent: {
    name: 'Your Name',
    title: 'Licensed Real Estate Advisor',
    photo: '/brand/agent.jpg',
    headshotAlt: 'Your Name, Realtor',
  },

  logo: '/brand/logo.png',
  logoAlt: 'Your Brokerage',

  contactForm: {
    provider: 'jotform',
    jotformId: '',
    embedCode: '',
  },

  analytics: {
    ga4: '',
    googleAds: '',
    conversionId: '',
    conversionLabel: '',
  },

  domain: '',
};

/* ─── Derived helpers (do not edit) ──────────────────────────────────────── */

/** Brokerage name with the dba appended, e.g. "Acme Realty Partners LLC (dba Acme Realty)". */
export const brokerageFullName = brand.brokerage.dba
  ? `${brand.brokerage.name} (dba ${brand.brokerage.dba})`
  : brand.brokerage.name;

/** All gtag config IDs that should load (Google Ads + GA4), with blanks removed. */
export const gtagIds: string[] = [brand.analytics.googleAds, brand.analytics.ga4].filter(Boolean);

/** True when Google Ads conversion tracking is fully configured. */
export const hasConversionTracking: boolean = Boolean(
  brand.analytics.conversionId && brand.analytics.conversionLabel,
);

/** The Google Ads `send_to` value, e.g. "AW-123/abcLabel". Empty string if not configured. */
export const conversionSendTo: string = hasConversionTracking
  ? `${brand.analytics.conversionId}/${brand.analytics.conversionLabel}`
  : '';
