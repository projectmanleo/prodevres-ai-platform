
import { useMemo, useState } from "react";

const PAYMENT_ENDPOINT =
  "https://8afcca66.prodevres-ai.pages.dev/api/create-payment";

const services = [
  {
    id: "chatbots",
    name: "AI Chatbots",
    price: 350,
    description:
      "Intelligent assistants for customers, leads and internal support.",
    scope: [
      "One basic FAQ chatbot for one channel",
      "Setup using one defined knowledge base",
      "Initial testing and handover"
    ]
  },
  {
    id: "workflow",
    name: "Workflow Automation",
    price: 400,
    description:
      "Connect your tools and automate repetitive business processes.",
    scope: [
      "One clearly defined business workflow",
      "Up to two standard integrations",
      "Testing and basic handover documentation"
    ]
  },
  {
    id: "virtual-assistant",
    name: "Virtual Assistant Automation",
    price: 250,
    description:
      "AI-assisted research, administration and everyday operations.",
    scope: [
      "Automation of one routine administrative task",
      "Configuration for an agreed process",
      "Basic testing and usage guidance"
    ]
  },
  {
    id: "email",
    name: "Email Automation",
    price: 150,
    description:
      "Faster, consistent customer communication and follow-up.",
    scope: [
      "One basic email sequence or notification workflow",
      "Configuration of the agreed trigger and message",
      "Testing before handover"
    ]
  },
  {
    id: "research",
    name: "AI Research",
    price: 150,
    description:
      "Turn information into clear, useful business insight.",
    scope: [
      "One focused research question or topic",
      "A written brief with source references",
      "Key findings and practical recommendations"
    ]
  },
  {
    id: "governance",
    name: "AI-Aware Governance",
    price: 300,
    description:
      "Responsible processes for data, security and AI adoption.",
    scope: [
      "A basic review of an agreed AI use case",
      "Identification of key risks and concerns",
      "Practical governance recommendations"
    ]
  }
];

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
    const phone = String(data.get("phone") || "").trim();

    if (!phone) {
      setError("Please enter your phone number for secure payment.");
      setSending(false);
      return;
    }

    try {
      const response = await fetch(PAYMENT_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          serviceId: selected.id,
          phone,
          language: "en"
        })
      });

      const rawText = await response.text();
      let payload = {};

      try {
        payload = rawText ? JSON.parse(rawText) : {};
      } catch {
        payload = {};
      }

      if (!response.ok || !payload?.success || !payload?.url) {
        throw new Error(
          payload?.message || "Unable to start secure payment."
        );
      }

      window.location.href = payload.url;
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
          {t.pricingTitle || "Choose a service and pay securely."}
        </h2>

        <p>
          {t.pricingLead ||
            "Choose a clearly defined starter package. Larger projects are quoted separately."}
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
                  {service.name} — from €{service.price}
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

            <h4>What's included</h4>

            <ul className="service-scope">
              {selected.scope.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <small>
              Starting price for the scope listed above. Additional
              integrations, features, usage charges and ongoing support
              may cost extra. Final scope and pricing will be agreed
              before work begins.
            </small>
          </div>
        </div>

        <div className="payment-form-card">
          <form onSubmit={handlePayment}>
            <h3>Secure payment</h3>

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
                  required
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
              {sending
                ? "Connecting to secure payment..."
                : "Continue to payment →"}
            </button>

            <p className="payment-note">
              You will be redirected to the configured secure payment
              provider to complete your payment.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
