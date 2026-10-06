import { siteConfig } from "../config/site";

export interface QuoteRequestPayload {
  productName?: string;
  productSlug?: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  quantity: string;
  location: string;
  application: string;
  requirements: string;
}

export interface SubmitResult {
  success: boolean;
  message: string;
}

/**
 * Submits a quote request using the method configured in site config.
 *
 * This is intentionally the ONLY place that knows how a quote request is
 * delivered. Today it opens a pre-filled mailto link. Later this can call
 * a hosted form endpoint, serverless function or CRM API by changing
 * `siteConfig.quote.method` — no UI code needs to change.
 */
export async function submitQuoteRequest(payload: QuoteRequestPayload): Promise<SubmitResult> {
  try {
    if (siteConfig.quote.method === "endpoint" && siteConfig.quote.endpoint) {
      const res = await fetch(siteConfig.quote.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Request failed");
      return { success: true, message: "Your quote request has been sent." };
    }

    // Default: mailto fallback, works with zero backend.
    const subject = encodeURIComponent(
      `Quote request${payload.productName ? `: ${payload.productName}` : ""}`
    );
    const bodyLines = [
      payload.productName ? `Product: ${payload.productName}` : "",
      `Name: ${payload.name}`,
      `Company / Farm: ${payload.company}`,
      `Phone: ${payload.phone}`,
      `Email: ${payload.email}`,
      `Quantity: ${payload.quantity}`,
      `Location: ${payload.location}`,
      `Intended application: ${payload.application}`,
      `Additional requirements: ${payload.requirements}`,
    ].filter(Boolean);
    const body = encodeURIComponent(bodyLines.join("\n"));
    const mailto = `mailto:${siteConfig.quote.mailto}?subject=${subject}&body=${body}`;
    if (typeof window !== "undefined") {
      window.location.href = mailto;
    }
    return { success: true, message: "Opening your email client to send this request." };
  } catch (err) {
    return {
      success: false,
      message: "We couldn't send this automatically. Please contact us directly via WhatsApp or phone.",
    };
  }
}
