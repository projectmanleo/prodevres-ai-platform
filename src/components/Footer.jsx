export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">

      <div className="footer-main">

        <div className="footer-brand">

          <a href="#top" className="footer-logo">
            <img
              src="/logo.png"
              alt="ProDevRes AI"
            />
          </a>

          <p>
            AI automation and digital operations solutions
            designed to help organizations work smarter.
          </p>

          <div className="footer-languages">
            <span>EN</span>
            <span>•</span>
            <span>FR</span>
          </div>

        </div>

        <div className="footer-column">

          <h4>Explore</h4>

          <a href="#services">Services</a>
          <a href="#industries">Industries</a>
          <a href="#portfolio">Portfolio</a>
          <a href="#contact">Contact</a>

        </div>

        <div className="footer-column">

          <h4>Solutions</h4>

          <a href="#services">AI Chatbots</a>
          <a href="#services">Workflow Automation</a>
          <a href="#services">AI Research</a>
          <a href="#services">Digital Operations</a>

        </div>

        <div className="footer-column">

          <h4>Connect</h4>

          <a href="mailto:prodevreszit@solution4u.com">
            Email us
          </a>

          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>

          <a href="#contact">
            Book a consultation
          </a>

        </div>

      </div>

      <div className="footer-bottom">

        <span>
          © {year} ProDevRes AI. All rights reserved.
        </span>

        <span>
          AI Automation • Digital Operations
        </span>

      </div>

    </footer>
  );
}