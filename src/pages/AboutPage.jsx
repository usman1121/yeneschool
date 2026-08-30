import PageShell from "../components/PageShell.jsx";
import { useTranslation } from "../i18n/I18nContext.jsx";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function AboutPage() {
  const { t } = useTranslation();
  const headingRef = useRef(null);
  const heroTitle = t("about.hero.title") || "";
  const values = t("about.values.items") || [];
  const historySteps = t("about.history.steps") || [];

  useEffect(() => {
    if (!headingRef.current) return;
    const words = headingRef.current.querySelectorAll(".word");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: "power2.out" }
      );
    }, headingRef);
    return () => ctx.revert();
  }, [heroTitle]);

  const splitTitle = heroTitle.split(" ").map((word, i) => (
    <span key={i} className="word">
      {word}{" "}
    </span>
  ));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About YeneSchool",
    "description": t("meta.about.description"),
    "mainEntity": {
      "@type": "Organization",
      "name": "YeneSchool",
      "url": "https://www.yeneschool.me",
      "parentOrganization": {
        "@type": "Organization",
        "name": "Afro Digital",
        "url": "https://afrodigital.dev",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Addis Ababa",
          "addressCountry": "ET"
        }
      }
    }
  };

  return (
    <PageShell activePage="about">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main id="top" className="about-page">
        {/* Hero Section */}
        <section className="about-hero section" data-reveal>
          <div className="about-hero-layout">
            <div className="about-hero-copy">
              <span className="section-kicker">{t("about.hero.kicker")}</span>
              <h1 ref={headingRef}>{splitTitle}</h1>
              <p className="about-hero-desc">{t("about.hero.subtitle")}</p>
              <div className="about-hero-actions">
                <a href="/demo" className="btn btn-primary">
                  {t("about.cta.demoBtn")}
                </a>
                <a href="/contact" className="btn btn-secondary">
                  {t("about.cta.contactBtn")}
                </a>
              </div>
            </div>
            <div className="about-hero-badge-wrap">
              <div className="about-glass-card">
                <div className="about-glass-header">
                  <span className="about-badge-icon">🇪🇹</span>
                  <div>
                    <strong>YeneSchool</strong>
                    <span>by Afro Digital</span>
                  </div>
                </div>
                <div className="about-glass-stats">
                  <div className="about-stat-item">
                    <span className="stat-number">13</span>
                    <span className="stat-label">Months Support</span>
                  </div>
                  <div className="about-stat-item">
                    <span className="stat-number">5</span>
                    <span className="stat-label">Languages</span>
                  </div>
                  <div className="about-stat-item">
                    <span className="stat-number">100%</span>
                    <span className="stat-label">Offline Ready</span>
                  </div>
                  <div className="about-stat-item">
                    <span className="stat-number">8</span>
                    <span className="stat-label">Isolated Roles</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="section about-mv-section" data-reveal>
          <div className="about-mv-grid">
            <article className="about-mv-card mission-card">
              <div className="mv-card-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
                </svg>
              </div>
              <span className="section-kicker">{t("about.missionVision.mission.kicker")}</span>
              <h2>{t("about.missionVision.mission.title")}</h2>
              <p>{t("about.missionVision.mission.description")}</p>
            </article>

            <article className="about-mv-card vision-card">
              <div className="mv-card-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <span className="section-kicker">{t("about.missionVision.vision.kicker")}</span>
              <h2>{t("about.missionVision.vision.title")}</h2>
              <p>{t("about.missionVision.vision.description")}</p>
            </article>
          </div>
        </section>

        {/* Core Values */}
        <section className="section about-values-section" data-reveal>
          <div className="about-section-header">
            <span className="section-kicker">{t("about.values.kicker")}</span>
            <h2>{t("about.values.title")}</h2>
          </div>
          <div className="about-values-grid">
            {values.map((val, idx) => (
              <article key={idx} className="about-value-card">
                <span className="value-number">0{idx + 1}</span>
                <h3>{val.title}</h3>
                <p>{val.desc}</p>
              </article>
            ))}
          </div>
        </section>

        {/* History / Journey Timeline */}
        <section className="section about-history-section" data-reveal>
          <div className="about-section-header">
            <span className="section-kicker">{t("about.history.kicker")}</span>
            <h2>{t("about.history.title")}</h2>
          </div>
          <div className="about-timeline">
            {historySteps.map((step, idx) => (
              <div key={idx} className="timeline-node">
                <div className="timeline-marker">
                  <span className="timeline-dot" />
                  <span className="timeline-year">{step.year}</span>
                </div>
                <div className="timeline-content">
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Company Behind: Afro Digital */}
        <section className="section about-company-section" data-reveal>
          <div className="about-company-box">
            <div className="about-company-copy">
              <span className="section-kicker">{t("about.company.kicker")}</span>
              <h2>{t("about.company.title")}</h2>
              <p className="company-desc">{t("about.company.desc")}</p>
              <p className="company-tagline">
                <em>"{t("about.company.tagline")}"</em>
              </p>
              <div className="company-action">
                <a
                  href="https://afrodigital.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                >
                  <span>{t("about.company.website")}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="about-company-visual">
              <div className="company-brand-card">
                <div className="company-badge-pill">Technology & AI Studio</div>
                <h3>Afro Digital</h3>
                <p>Addis Ababa, Ethiopia</p>
                <div className="company-capabilities">
                  <span>EdTech ERP</span>
                  <span>AI Solutions</span>
                  <span>Enterprise Cloud</span>
                  <span>IoT Integration</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section about-cta-section" data-reveal>
          <div className="about-cta-container">
            <h2>{t("about.cta.title")}</h2>
            <p>{t("about.cta.subtitle")}</p>
            <div className="about-cta-buttons">
              <a href="/demo" className="btn btn-primary">
                {t("about.cta.demoBtn")}
              </a>
              <a href="/contact" className="btn btn-secondary">
                {t("about.cta.contactBtn")}
              </a>
            </div>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
