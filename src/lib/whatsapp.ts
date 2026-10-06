import { siteConfig } from "../config/site";

/**
 * Builds a wa.me deep link with a pre-filled, URL-encoded message.
 * This works as a plain browser link — no API or server required.
 */
export function buildWhatsAppLink(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encoded}`;
}

export function productEnquiryMessage(options: {
  productName: string;
  reference?: string;
  quantity?: string | number;
  note?: string;
}): string {
  const { productName, reference, quantity, note } = options;
  const lines = [
    `Hello Agriconic, I'm interested in ${productName}.`,
  ];
  if (reference) lines.push(`Reference: ${reference}`);
  if (quantity) lines.push(`Quantity: ${quantity}`);
  if (note) lines.push(`Note: ${note}`);
  lines.push("Could you please provide availability and a quotation?");
  return lines.join("\n");
}

export function generalEnquiryMessage(): string {
  return "Hello Agriconic, I'd like to speak with your sales team about agricultural equipment and irrigation options.";
}
