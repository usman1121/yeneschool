import { useTranslation } from "../i18n/I18nContext.jsx";

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
    <span
      className={`brand-wordmark${footer ? " footer-wordmark" : ""}`}
      id={footer ? "footer-title" : undefined}
      data-no-translate
    >
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
  const { lang, setLanguage, t } = useTranslation();

  return (
    <>
      <canvas className="wave-canvas" data-wave-canvas aria-hidden="true" />
      <div className="page-glow" aria-hidden="true" />
      <header className="site-header" data-site-header>
        <div className="nav-inner">
          <a className="brand" href="/" aria-label="YeneSchool" data-no-translate>
            <Brand />
          </a>
          <button
            className="mobile-toggle"
            type="button"
            data-mobile-toggle
            aria-label={t("nav.openMenu") || "Open Menu"}
            aria-expanded="false"
          >
            <MenuIcon />
          </button>
          <div className="nav-panel" data-mobile-menu>
            <nav className="nav-links" aria-label={t("nav.primary") || "Primary navigation"}>
              <NavLink activePage={activePage} page="home" href="/#roles" data-scroll-target="roles">
                {t("nav.features")}
              </NavLink>
              <NavLink activePage={activePage} page="modules" href="/#modules" data-scroll-target="modules">
                {t("nav.modules")}
              </NavLink>
              <a href="/#pricing" data-scroll-target="pricing">
                {t("nav.pricing")}
              </a>
              <NavLink activePage={activePage} page="book" href="/demo">
                {t("nav.book")}
              </NavLink>
              <NavLink activePage={activePage} page="contact" href="/contact">
                {t("nav.contact")}
              </NavLink>
            </nav>
            <div className="header-actions">
              <div className="language-switcher" role="group" aria-label={t("language.label") || "Language selection"} data-language-switcher>
                <button
                  className={`language-option${lang === "en" ? " is-active" : ""}`}
                  type="button"
                  data-language-option="en"
                  aria-pressed={lang === "en"}
                  onClick={() => setLanguage("en")}
                >
                  {t("language.en")}
                </button>
                <button
                  className={`language-option${lang === "am" ? " is-active" : ""}`}
                  type="button"
                  data-language-option="am"
                  aria-pressed={lang === "am"}
                  onClick={() => setLanguage("am")}
                >
                  {t("language.am")}
                </button>
              </div>
              <button
                className="theme-switcher"
                type="button"
                data-theme-toggle
                aria-label={t("theme.switchToLight")}
                aria-pressed="true"
              >
                <span className="sr-only" data-theme-label>
                  {t("theme.switchToLight")}
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
  const { t } = useTranslation();
  const isActive = (page) => (activePage === page ? { "aria-current": "page" } : {});

  return (
    <footer className="site-footer footer-four-col" aria-labelledby="footer-title">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-brand-col" data-reveal>
            <div className="footer-logo-row">
              <a className="footer-brand" href="/" aria-label="YeneSchool" data-no-translate>
                <Brand footer />
              </a>
            </div>
            <p className="footer-desc">
              {t("footer.desc")}
            </p>
          </div>
          <div className="footer-links">
            <section data-reveal>
              <h3>{t("footer.product")}</h3>
              <ul>
                <li>
                  <a href="/#modules" data-scroll-target="modules" {...isActive("modules")}>
                    {t("footer.modules")}
                  </a>
                </li>
                <li>
                  <a href="/#pricing" data-scroll-target="pricing">
                    {t("footer.pricing")}
                  </a>
                </li>
                <li>
                  <a href="/demo" {...isActive("book")}>
                    {t("footer.bookDemo")}
                  </a>
                </li>
              </ul>
            </section>
            <section data-reveal>
              <h3>{t("footer.legal")}</h3>
              <ul>
                <li>
                  <a href="/privacy" {...isActive("privacy")}>
                    {t("footer.privacy")}
                  </a>
                </li>
                <li>
                  <a href="/terms" {...isActive("terms")}>
                    {t("footer.terms")}
                  </a>
                </li>
                <li>
                  <a href="/cookie-policy" {...isActive("cookiePolicy")}>
                    {t("footer.cookiePolicy")}
                  </a>
                </li>
              </ul>
            </section>
            <section id="contact" data-reveal>
              <h3>{t("footer.contactUs")}</h3>
              <ul>
                <li>
                  <a href="mailto:yeneschool@gmail.com" className="contact-link">
                    <span>yeneschool@gmail.com</span>
                  </a>
                </li>
                <li>
                  <a href="tel:+251966074050" className="contact-link">
                    <span>+251 983 355 598</span>
                  </a>
                </li>
                <li>
                  <a href="https://t.me/YeneSchool" className="contact-link">
                    <span>{t("contactLink.telegram")}</span>
                  </a>
                </li>
              </ul>
            </section>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            <span>{t("footer.allRightsReserved")}</span>
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
