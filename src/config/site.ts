/**
 * Central site configuration.
 *
 * Every contact detail, business identity value and integration setting
 * lives here so it never needs to be hunted down across components.
 * Replace these values with Agriconic's real details at any time —
 * nothing else in the codebase needs to change.
 */

export const siteConfig = {
  name: "Agriconic",
  legalName: "Agriconic Agricultural Equipment & Irrigation",
  tagline: "Equipment that keeps agriculture moving.",
  description:
    "Agriconic supplies pumps, pipes, fittings, sprinklers and irrigation systems selected for the demands of modern farming.",

  // Contact
  phone: "+263 71 913 4293",
  phoneDisplay: "071 913 4293 / 078 244 3124",
  email: "sales@agriconic.example",

  // WhatsApp — digits only, international format, no leading "+" or spaces.
  // Change this single value to update every WhatsApp link across the site.
  whatsappNumber: "263719134293",

  // Store
  address: {
    line1: "No. 9 Fife Avenue",
    line2: "and Harare Street",
    city: "Harare",
    country: "Zimbabwe",
  },
  hours: [
    { days: "Monday – Friday", time: "7:30 AM – 6:00 PM" },
    { days: "Saturday", time: "8:00 AM – 4:00 PM" },
    { days: "Sunday & Public Holidays", time: "Closed" },
  ],
  mapsUrl: "https://maps.google.com/?q=No.+9+Fife+Avenue+and+Harare+Street+Harare+Zimbabwe",

  social: {
    facebook: "https://www.facebook.com/profile.php?id=61589106546082",
    instagram: "https://instagram.com/agriconic",
    linkedin: "https://linkedin.com/company/agriconic",
    youtube: "https://youtube.com/@agriconic",
  },

  // Quote / enquiry submission.
  // "mailto" opens the customer's email client pre-filled with the enquiry.
  // This can be swapped for an API endpoint, form service (e.g. Formspree)
  // or future backend without changing any UI component.
  quote: {
    method: "mailto" as "mailto" | "endpoint",
    mailto: "sales@agriconic.example",
    endpoint: "", // e.g. "https://formspree.io/f/xxxxxxx" when ready
  },
} as const;

export type SiteConfig = typeof siteConfig;
