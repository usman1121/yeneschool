function MenuIcon() {
  return (
    <>
      <svg className="menu-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 6h16M4 12h16M4 18h16" />
      </svg>
      <svg className="close-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18 6 6 18M6 6l12 12" />
      </svg>
    </>
  );
}

function ThemeIcon() {
  return (
    <>
      <svg className="theme-icon sun-icon" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
      <svg className="theme-icon moon-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.99 12.7A8.5 8.5 0 1 1 11.3 3.01 6.5 6.5 0 0 0 20.99 12.7Z" />
      </svg>
    </>
  );
}

function Brand({ footer = false }) {
  return (
    <span className={`brand-wordmark${footer ? " footer-wordmark" : ""}`} id={footer ? "footer-title" : undefined}>
      <span>Yene</span>
      <span>School</span>
    </span>
  );
}

function NavLink({ activePage, page, href, children, ...props }) {
  const activeProps = activePage === page ? { "aria-current": "page" } : {};
  return (
    <a href={href} {...activeProps} {...props}>
      {children}
    </a>
  );
}

function Header({ activePage }) {
  return (
    <>
      <canvas className="wave-canvas" data-wave-canvas aria-hidden="true" />
      <div className="page-glow" aria-hidden="true" />
      <header className="site-header" data-site-header>
        <div className="nav-inner">
          <a className="brand" href="/" aria-label="YeneSchool home">
            <Brand />
          </a>
          <button
            className="mobile-toggle"
            type="button"
            data-mobile-toggle
            aria-label="Open Menu"
            aria-expanded="false"
          >
            <MenuIcon />
          </button>
          <div className="nav-panel" data-mobile-menu>
            <nav className="nav-links" aria-label="Primary navigation">
              <NavLink activePage={activePage} page="home" href="/" data-scroll-target="roles">
                Features
              </NavLink>
              <NavLink activePage={activePage} page="modules" href="/modules">
                Modules
              </NavLink>
              <a href="/" data-scroll-target="pricing">
                Pricing
              </a>
              <NavLink activePage={activePage} page="book" href="/book">
                Book
              </NavLink>
              <NavLink activePage={activePage} page="contact" href="/contact">
                Contact
              </NavLink>
            </nav>
            <div className="header-actions">
              <div className="language-switcher" role="group" aria-label="Language selection" data-language-switcher>
                <button className="language-option is-active" type="button" data-language-option="en" aria-pressed="true">
                  EN
                </button>
                <button className="language-option" type="button" data-language-option="am" aria-pressed="false">
                  አማ
                </button>
              </div>
              <button
                className="theme-switcher"
                type="button"
                data-theme-toggle
                aria-label="Switch to light mode"
                aria-pressed="true"
              >
                <span className="sr-only" data-theme-label>
                  Switch to light mode
                </span>
                <ThemeIcon />
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

function Footer({ activePage }) {
  const isActive = (page) => (activePage === page ? { "aria-current": "page" } : {});

  return (
    <footer className="site-footer footer-four-col" aria-labelledby="footer-title">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-brand-col" data-reveal>
            <div className="footer-logo-row">
              <a className="footer-brand" href="/" aria-label="YeneSchool home">
                <Brand footer />
              </a>
            </div>
            <p className="footer-desc">
              A school management system for enrollment, attendance, marks, finance, parents, and daily operations.
            </p>
          </div>
          <div className="footer-links">
            <section data-reveal>
              <h3>Product</h3>
              <ul>
                <li>
                  <a href="/modules" {...isActive("modules")}>
                    Modules
                  </a>
                </li>
                <li>
                  <a href="/" data-scroll-target="pricing">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="/book" {...isActive("book")}>
                    Book a demo
                  </a>
                </li>
              </ul>
            </section>
            <section data-reveal>
              <h3>Legal</h3>
              <ul>
                <li>
                  <a href="/privacy" {...isActive("privacy")}>
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="/terms" {...isActive("terms")}>
                    Terms
                  </a>
                </li>
                <li>
                  <a href="/cookie-policy" {...isActive("cookiePolicy")}>
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </section>
            <section data-reveal>
              <h3>Contact Us</h3>
              <ul>
                <li>
                  <a href="mailto:yeneschool@gmail.com" className="contact-link">
                    <span>yeneschool@gmail.com</span>
                  </a>
                </li>
                <li>
                  <a href="tel:+251966074050" className="contact-link">
                    <span>+251 966 074 050</span>
                  </a>
                </li>
                <li>
                  <a href="https://t.me/YeneSchool" className="contact-link">
                    <span>Telegram</span>
                  </a>
                </li>
              </ul>
            </section>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            <span>All rights reserved.</span>
          </p>
          <p>
            &copy; <span data-current-year /> YeneSchool
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function PageShell({ activePage, children }) {
  return (
    <div>
      <Header activePage={activePage} />
      {children}
      <Footer activePage={activePage} />
    </div>
  );
}
