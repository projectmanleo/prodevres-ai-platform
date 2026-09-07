const services = [
  {
    number: "01",
    title: "AI Chatbots",
    text: "Intelligent assistants for customers, leads and internal support."
  },
  {
    number: "02",
    title: "Workflow Automation",
    text: "Connect your tools and automate repetitive business processes."
  },
  {
    number: "03",
    title: "Virtual Assistant Automation",
    text: "AI-assisted research, administration and everyday operations."
  },
  {
    number: "04",
    title: "Email Automation",
    text: "Faster, consistent customer communication and follow-up."
  },
  {
    number: "05",
    title: "AI Research",
    text: "Turn information into clear, useful business insight."
  },
  {
    number: "06",
    title: "AI-Aware Governance",
    text: "Responsible processes for data, security and AI adoption."
  }
];

export default function Services({ t }) {
  return (
    <section id="services" className="section services-section">

      <div className="section-head">

        <span className="eyebrow orange">
          WHAT WE DO
        </span>

        <h2>
          {t.servicesTitle}
        </h2>

        <p>
          {t.servicesLead}
        </p>

      </div>

      <div className="cards">

        {services.map((service) => (

          <article
            className="card service-card"
            key={service.number}
          >

            <div className="service-top">

              <span className="num">
                {service.number}
              </span>

              <span className="service-arrow">
                ↗
              </span>

            </div>

            <div className="service-icon">
              AI
            </div>

            <h3>
              {service.title}
            </h3>

            <p>
              {service.text}
            </p>

            <a href="#contact">
              Learn more
              <span> →</span>
            </a>

          </article>

        ))}

      </div>

    </section>
  );
}