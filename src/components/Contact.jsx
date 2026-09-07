import { useState } from "react";

const CONTACT_FORM_ENDPOINT =
  "https://formsubmit.co/ajax/prodevreszit@solution4u.com";

export default function Contact({ t }) {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    setSending(true);
    setError("");

    const form = event.currentTarget;

    const formData = new FormData(form);

    const lead = {
      name: formData.get("name"),
      email: formData.get("email"),
      company: formData.get("company"),
      message: formData.get("message"),
      source: "ProDevRes AI website",
      submittedAt: new Date().toISOString()
    };

    try {
      const response = await fetch(CONTACT_FORM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          ...lead,
          _subject: "New ProDevRes AI website enquiry",
          _template: "table",
          _replyto: lead.email
        })
      });

      if (!response.ok) {
        throw new Error("Unable to send enquiry.");
      }

      setSubmitted(true);
      form.reset();

    } catch (err) {
      console.error(err);

      setError(
        "We couldn't send your enquiry. Please try again."
      );

    } finally {
      setSending(false);
    }
  }

  return (
    <section
      id="contact"
      className="section contact-section"
    >

      <div className="contact-wrap">

        <div className="contact-intro">

          <span className="eyebrow orange">
            LET'S WORK TOGETHER
          </span>

          <h2>
            {t.contactTitle}
          </h2>

          <p>
            {t.contactLead}
          </p>

          <div className="contact-details">

            <a href="mailto:prodevreszit@solution4u.com">
              <span>✉</span>
              prodevreszit@solution4u.com
            </a>

            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noreferrer"
            >
              <span>in</span>
              LinkedIn
            </a>

          </div>

        </div>

        <div className="contact-form-card">

          {submitted ? (

            <div className="success-message">

              <div className="success-icon">
                ✓
              </div>

              <h3>
                Thank you.
              </h3>

              <p>
                Your enquiry has been received successfully.
                We'll be in touch soon.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setError("");
                }}
                className="btn ghost-dark"
              >
                Send another enquiry
              </button>

            </div>

          ) : (

            <form onSubmit={handleSubmit}>

              <div className="form-row">

                <label>
                  Name

                  <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    required
                  />
                </label>

                <label>
                  Email

                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    required
                  />
                </label>

              </div>

              <label>
                Company

                <input
                  type="text"
                  name="company"
                  placeholder="Your company"
                />
              </label>

              <label>
                What can we help you automate?

                <textarea
                  name="message"
                  rows="5"
                  placeholder="Tell us about the process, challenge or opportunity..."
                  required
                ></textarea>
              </label>

              {error && (
                <div className="form-error">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="btn primary submit-btn"
                disabled={sending}
              >
                {sending
                  ? "Sending..."
                  : t.send}
              </button>

            </form>

          )}

        </div>

      </div>

    </section>
  );
}