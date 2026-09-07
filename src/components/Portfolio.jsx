const projects = [
  {
    number: "01",
    category: "AI AUTOMATION",
    title: "Intelligent Customer Support",
    description:
      "AI-assisted customer support that handles common questions, qualifies enquiries and routes complex requests to the right person.",
    tags: ["AI", "Chatbot", "Automation"]
  },
  {
    number: "02",
    category: "WORKFLOW AUTOMATION",
    title: "Business Process Automation",
    description:
      "Connected workflows that reduce repetitive administrative tasks and move information automatically between business systems.",
    tags: ["n8n", "Workflows", "Integration"]
  },
  {
    number: "03",
    category: "AI RESEARCH",
    title: "Research & Intelligence",
    description:
      "AI-supported research workflows that collect, organize and transform information into useful business insight.",
    tags: ["Research", "AI", "Analytics"]
  },
  {
    number: "04",
    category: "DIGITAL OPERATIONS",
    title: "Virtual Operations Assistant",
    description:
      "AI-powered assistance for administration, email, documentation, scheduling and routine operational tasks.",
    tags: ["AI Assistant", "Operations", "Productivity"]
  }
];

export default function Portfolio() {
  return (
    <section
      id="portfolio"
      className="section portfolio-section"
    >

      <div className="section-head">

        <span className="eyebrow orange">
          SELECTED WORK
        </span>

        <h2>
          Built around real business outcomes.
        </h2>

        <p>
          Practical AI and automation solutions designed to save time,
          improve operations and create measurable value.
        </p>

      </div>

      <div className="portfolio-grid">

        {projects.map((project) => (

          <article
            className="portfolio-card"
            key={project.number}
          >

            <div className="portfolio-visual">

              <span className="portfolio-number">
                {project.number}
              </span>

              <div className="portfolio-orbit">
                <span></span>
                <span></span>
                <span></span>
              </div>

              <span className="portfolio-category">
                {project.category}
              </span>

            </div>

            <div className="portfolio-content">

              <h3>
                {project.title}
              </h3>

              <p>
                {project.description}
              </p>

              <div className="portfolio-tags">

                {project.tags.map((tag) => (
                  <span key={tag}>
                    {tag}
                  </span>
                ))}

              </div>

              <a href="#contact">
                Discuss a similar project
                <span> ↗</span>
              </a>

            </div>

          </article>

        ))}

      </div>

    </section>
  );
}