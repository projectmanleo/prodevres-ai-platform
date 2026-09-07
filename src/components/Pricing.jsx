import { useMemo, useState } from "react";

/* Free deployment mode: service requests are emailed securely through FormSubmit. Online payment can be connected later when a production payment endpoint is available. */

const SERVICE_REQUEST_ENDPOINT =
  "https://formsubmit.co/ajax/prodevreszit@solution4u.com";

const services = [
  {
    id: "chatbots",
    name: "AI Chatbots",
    price: 250,
    description:
      "Intelligent assistants for customers, leads and internal support."
  },
  {
    id: "workflow",
    name: "Workflow Automation",
    price: 350,
    description:
      "Connect your tools and automate repetitive business processes."
  },
  {
    id: "virtual-assistant",
    name: "Virtual Assistant Automation",
    price: 200,
    description:
      "AI-assisted research, administration and everyday operations."
  },
  {
    id: "email",
    name: "Email Automation",
    price: 150,
    description:
      "Faster, consistent customer communication and follow-up."
  },
  {
    id: "research",
    name: "AI Research",
    price: 100,
    description:
      "Turn information into clear, useful business insight."
  },
  {
    id: "governance",
    name: "AI-Aware Governance",
    price: 300,
    description:
      "Responsible processes for data, security and AI adoption."
  }
];

const CURRENCY = "EUR";

function getCheckoutUrl(payload) {
  return (
    payload?.transaction_url ||
    payload?.redirect ||
    payload?.payment_url ||
    payload?.checkout_url ||
    payload?.data?.transaction_url ||
    payload?.data?.redirect ||
    payload?.data?.payment_url ||
    payload?.data?.checkout_url ||
    payload?.data?.data?.transaction_url ||
    payload?.data?.data?.redirect ||
    ""
  );
}

export default function Pricing({ t }) {
  const [selectedId, setSelectedId] = useState(services[0].id);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const selected = useMemo(
    () =>
      services.find((service) => service.id === selectedId) || services[0],
    [selectedId]
  );

  async function handlePayment(event) {
    event.preventDefault();
    setError("");

    setSending(true);

    const form = event.currentTarget;
    const data = new FormData(form);

    const client = {
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      company: String(data.get("company") || "").trim(),
      phone: String(data.get("phone") || "").trim(),
      project: String(data.get("project") || "").trim(),
      service: selected.name,
      serviceId: selected.id,
      amount: selected.price,
      currency: CURRENCY,
      source: "ProDevRes AI website - Pricing",
      submittedAt: new Date().toISOString()
    };

    try {
      const response = await fetch(SERVICE_REQUEST_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          ...client,
          _subject: `ProDevRes AI service request: ${client.service}`,
          _template: "table",
          _replyto: client.email
        })
      });

      const rawText = await response.text();
      let payload = {};

      try {
        payload = rawText ? JSON.parse(rawText) : {};
      } catch {
        payload = { raw: rawText };
      }

      if (!response.ok) {
        throw new Error(
          payload?.error ||
            payload?.message ||
            "The payment checkout could not be created."
        );
      }

      if (payload?.success === false) {
        throw new Error(payload?.message || "The service request could not be sent.");
      }

      setError(
        "Request received. We will contact you to confirm the scope and payment options."
      );
      setSending(false);
    } catch (err) {
      console.error("ProDevRes payment error:", err);
      setError(
        err?.message ||
          "We couldn't start secure payment. Please try again."
      );
      setSending(false);
    }
  }

  return (
    <section id="pricing" className="section pricing-section">
      <div className="section-head">
        <span className="eyebrow orange">
          {t.pricingEyebrow || "SERVICES & PRICING"}
        </span>

        <h2>
          {t.pricingTitle || "Choose a service and request a quote."}
        </h2>

        <p>
          {t.pricingLead ||
            "Select a service and tell us what you need. We will confirm the scope, final price and payment options with you."}
        </p>
      </div>

      <div className="pricing-layout">
        <div className="pricing-picker card">
          <label>
            {t.chooseService || "Choose your service"}

            <select
              value={selectedId}
              onChange={(event) => {
                setSelectedId(event.target.value);
                setError("");
              }}
              disabled={sending}
            >
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name} — €{service.price}
                </option>
              ))}
            </select>
          </label>

          <div className="selected-service">
            <span className="eyebrow orange">{selected.name}</span>

            <div className="price-display">
              <span>€</span>
              {selected.price}
            </div>

            <p>{selected.description}</p>

            <small>
              Starting price. Final pricing can be adjusted after reviewing
              your requirements.
            </small>
          </div>
        </div>

        <div className="payment-form-card">
          <form onSubmit={handlePayment}>
            <h3>Service request</h3>

            <div className="form-row">
              <label>
                Name
                <input
                  name="name"
                  type="text"
                  placeholder="Your name"
                  required
                  disabled={sending}
                />
              </label>

              <label>
                Email
                <input
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  disabled={sending}
                />
              </label>
            </div>

            <div className="form-row">
              <label>
                Company
                <input
                  name="company"
                  type="text"
                  placeholder="Company name"
                  disabled={sending}
                />
              </label>

              <label>
                Phone / WhatsApp
                <input
                  name="phone"
                  type="tel"
                  placeholder="+237..."
                  disabled={sending}
                />
              </label>
            </div>

            <label>
              What do you need?
              <textarea
                name="project"
                rows="4"
                placeholder="Briefly describe the service you need..."
                required
                disabled={sending}
              />
            </label>

            {error && (
              <div className="form-error" role="alert">
                {error}
              </div>
            )}

            <div className="checkout-summary">
              <span>{selected.name}</span>
              <strong>€{selected.price}</strong>
            </div>

            <button
              type="submit"
              className="btn primary submit-btn"
              disabled={sending}
            >
              {sending ? "Opening secure checkout..." : "Pay securely →"}
            </button>

            <p className="payment-note">
              You will be redirected to PayUnit's secure checkout to complete
              payment. Your payment details are never handled by this website.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
