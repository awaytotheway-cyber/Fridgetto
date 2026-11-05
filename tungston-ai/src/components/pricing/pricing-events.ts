/**
 * How the pricing page's buttons drive its estimator and quote form without a shared
 * provider: the quote form listens for a window event, and the estimator watches for
 * clicks on links carrying ESTIMATE_ATTR.
 */

/** What a quote request starts with. All optional: a bare "Get a Custom Quote" sends none. */
export type QuoteDetail = {
  /** Display name of the service, e.g. "Voice Agents". */
  service?: string;
  /** Prefilled budget text, e.g. an estimate. */
  budget?: string;
  /** The estimate as plain text, sent with the enquiry. */
  estimate?: string;
  /** Prefilled "what do you need" text. */
  requirements?: string;
};

export const OPEN_QUOTE = "pricing:open-quote";

/** Put this attribute (set to a service id) on an <a href="#estimator"> to start the estimator on it. */
export const ESTIMATE_ATTR = "data-estimate-service";

export function openQuote(detail: QuoteDetail = {}) {
  window.dispatchEvent(new CustomEvent<QuoteDetail>(OPEN_QUOTE, { detail }));
}
