import { buildWhatsAppLink, generalEnquiryMessage } from "../../lib/whatsapp";

export function WhatsAppFloat() {
  return (
    <a
      href={buildWhatsAppLink(generalEnquiryMessage())}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Agriconic sales on WhatsApp"
      className="group fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-moss-600 text-ivory-50 shadow-elevated transition-transform duration-300 hover:scale-105 active:scale-95 sm:bottom-8 sm:right-8"
    >
      <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.39 1.26 4.82L2 22l5.4-1.37a9.9 9.9 0 0 0 4.64 1.14h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm0 18.05h-.01a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.08.78.82-3-.19-.31a8.1 8.1 0 0 1-1.25-4.3c0-4.49 3.66-8.15 8.15-8.15 2.18 0 4.22.85 5.76 2.39a8.1 8.1 0 0 1 2.39 5.77c0 4.49-3.66 8.13-8.16 8.13Zm4.47-6.1c-.24-.12-1.44-.71-1.67-.79-.22-.08-.38-.12-.55.12-.16.24-.63.79-.77.95-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.32-.75-1.81-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.12 3.64.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28Z" />
      </svg>
      <span className="pointer-events-none absolute right-16 hidden whitespace-nowrap rounded-full bg-ink-900 px-3 py-1.5 text-xs font-medium text-ivory-50 opacity-0 transition-opacity duration-200 group-hover:opacity-100 sm:block">
        Chat with Agriconic
      </span>
    </a>
  );
}
