const industries = [
  {
    number: "01",
    title: "Logistics & Transport",
    text: "Automate operations, reporting, communication and document-heavy workflows."
  },
  {
    number: "02",
    title: "Professional Services",
    text: "Reduce administrative work and give teams intelligent research and workflow support."
  },
  {
    number: "03",
    title: "NGOs & Development",
    text: "Improve reporting, research, project coordination and stakeholder communication."
  },
  {
    number: "04",
    title: "E-commerce",
    text: "Automate customer support, order workflows, follow-ups and business intelligence."
  },
  {
    number: "05",
    title: "Education",
    text: "Create AI-assisted learning, administration and knowledge-management workflows."
  },
  {
    number: "06",
    title: "SMEs",
    text: "Bring practical automation to growing businesses without unnecessary complexity."
  }
];

export default function Industries() {
  return (
    <section id="industries" className="section industries-section">

      <div className="section-head">

        <span className="eyebrow orange">
          WHERE WE CREATE VALUE
        </span>

        <h2>
          AI that works across industries.
        </h2>

        <p>
          We adapt automation and AI solutions to the way your organization
          actually works.
        </p>

      </div>

      <div className="industry-grid">

        {industries.map((industry) => (

          <article
            className="industry-card"
            key={industry.number}
          >

            <div className="industry-number">
              {industry.number}
            </div>

            <div className="industry-content">

              <h3>
                {industry.title}
              </h3>

              <p>
                {industry.text}
              </p>

            </div>

            <span className="industry-arrow">
              ↗
            </span>

          </article>

        ))}

      </div>

    </section>
  );
}