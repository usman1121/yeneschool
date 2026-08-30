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
                <a href="/demo" className="primary-btn gradient-btn">
                  <span>{t("about.cta.demoBtn")}</span>
                </a>
                <a href="/contact" className="secondary-btn">
                  <span>{t("about.cta.contactBtn")}</span>
                </a>
              </div>
            </div>
            <div className="about-hero-telemetry-wrap">
              <div className="telemetry-hub">
                <div className="telemetry-ring ring-outer" />
                <div className="telemetry-ring ring-mid" />
                <div className="telemetry-ring ring-inner" />

                <svg className="telemetry-lines" viewBox="0 0 480 480" preserveAspectRatio="xMidYMid meet">
                  <line x1="240" y1="240" x2="85" y2="85" stroke="rgba(14, 165, 233, 0.3)" strokeWidth="1.5" strokeDasharray="4 4" />
                  <line x1="240" y1="240" x2="395" y2="85" stroke="rgba(14, 165, 233, 0.3)" strokeWidth="1.5" strokeDasharray="4 4" />
                  <line x1="240" y1="240" x2="85" y2="395" stroke="rgba(14, 165, 233, 0.3)" strokeWidth="1.5" strokeDasharray="4 4" />
                  <line x1="240" y1="240" x2="395" y2="395" stroke="rgba(14, 165, 233, 0.3)" strokeWidth="1.5" strokeDasharray="4 4" />
                  <circle cx="240" cy="240" r="70" fill="none" stroke="rgba(14, 165, 233, 0.2)" strokeWidth="1.5" strokeDasharray="3 3" />
                </svg>

                <div className="telemetry-core">
                  <div className="core-beacon">
                    <span className="live-pulse" />

                  </div>
                  <strong className="core-brand">YeneSchool</strong>

                </div>

                <div className="telemetry-node node-top-left" style={{ "--i": 0 }}>
                  <div className="node-head">
                    <span className="node-metric">99.98%</span>
                    <span className="node-tag">Uptime</span>
                  </div>
                  <span className="node-desc">Resilient Edge Cluster</span>
                </div>

                <div className="telemetry-node node-top-right" style={{ "--i": 1 }}>
                  <div className="node-head">
                    <span className="node-metric">0% Loss</span>

                  </div>
                  <span className="node-desc">Dual-Layer Local Storage</span>
                </div>

                <div className="telemetry-node node-bottom-left" style={{ "--i": 2 }}>
                  <div className="node-head">
                    <span className="node-metric">&lt; 85ms</span>
                    <span className="node-tag">Latency</span>
                  </div>
                  <span className="node-desc">Optimized for 3G / 4G</span>
                </div>

                <div className="telemetry-node node-bottom-right" style={{ "--i": 3 }}>
                  <div className="node-head">
                    <span className="node-metric">Zero-Trust</span>

                  </div>
                  <span className="node-desc">Role-Scoped Isolation</span>
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
                  className="secondary-btn"
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
              <a href="/demo" className="primary-btn gradient-btn">
                <span>{t("about.cta.demoBtn")}</span>
              </a>
              <a href="/contact" className="secondary-btn">
                <span>{t("about.cta.contactBtn")}</span>
              </a>
            </div>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
