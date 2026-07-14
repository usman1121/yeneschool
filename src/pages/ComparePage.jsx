import PageShell from "../components/PageShell.jsx";
import { useTranslation } from "../i18n/I18nContext.jsx";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function ComparePage() {
  const { t } = useTranslation();
  const rows = t("compare.table.rows");
  const roles = t("compare.roles.items");
  const faq = t("compare.faq");
  const [openIndex, setOpenIndex] = useState(null);

  const headingRef = useRef(null);
  const compareTitle = t("compare.hero.title") || "";
  const splitCompare = compareTitle.split(" ").map((word, i) =>
    <span key={i} className="word">{word}</span>
  );

  useEffect(() => {
    if (!headingRef.current) return;
    const words = headingRef.current.querySelectorAll(".word");
    const ctx = gsap.context(() => {
      gsap.fromTo(words,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.06, ease: "power2.out" }
      );
    }, headingRef);
    return () => ctx.revert();
  }, [compareTitle]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faq.items.map(item => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a
      }
    }))
  };

  return (
    <PageShell activePage="compare">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main id="top" className="compare-page">
        <section className="compare-hero section" data-reveal>
          <div className="compare-hero-layout">
            <div className="compare-hero-copy">
              <span className="section-kicker">{t("nav.compare")}</span>
              <h1 ref={headingRef}>{splitCompare}</h1>
              <p>{t("compare.hero.desc")}</p>
            </div>
            <div className="compare-hero-stats">
              <div className="compare-hero-orbit">
                <div className="orbit-ring" />
                <div className="orbit-center" data-no-translate>
                  <span className="orbit-brand">YeneSchool</span>
                  <span>{t("compare.stats.subtitle")}</span>
                </div>
                <div className="orbit-track">
                  {t("compare.stats.items").map((text, i) => (
                    <div key={i} className="orbit-item" style={{ "--i": i }} data-label={text}>
                      <strong>{["52", "523+", "7", "5", "95", "6"][i]}</strong>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section compare-matrix" data-reveal>
          <span className="section-kicker" style={{ marginBottom: 16, display: 'block' }}>Side by Side</span>
          <div className="compare-table-wrapper">
            <table className="compare-table">
              <caption>{t("compare.table.caption")}</caption>
              <thead>
                <tr>
                  <th scope="col">{t("compare.table.colFeature")}</th>
                  <th scope="col" className="col-legacy">{t("compare.table.colLegacy")}</th>
                  <th scope="col" className="col-local">{t("compare.table.colLocal")}</th>
                  <th scope="col" className="col-yene">{t("compare.table.colYene")}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i}>
                    <th scope="row" className="cell-feature">{row.feature}</th>
                    <td className="cell-legacy">{row.legacy}</td>
                    <td className="cell-local">{row.local}</td>
                    <td className="cell-yene">{row.yene}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="section compare-roles" data-reveal>
          <h2>{t("compare.roles.title")}</h2>
          <p className="compare-roles-desc">{t("compare.roles.desc")}</p>
          <div className="compare-roles-grid">
            {roles.map((item) => (
              <article key={item.name} className="compare-role-card">
                <h3>{item.name}</h3>
                <p>{item.desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section compare-faq" data-reveal>
          <div className="compare-faq-container">
            <span className="section-kicker" style={{ marginBottom: 8, display: 'block' }}>FAQ</span>
            <h2>{faq.title}</h2>
            <div className="compare-faq-list">
              {faq.items.map((item, i) => (
                <article key={i} className={`faq-item${openIndex === i ? " is-open" : ""}`}>
                  <button
                    className="faq-trigger"
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    aria-expanded={openIndex === i}
                    aria-controls={`faq-answer-${i}`}
                    id={`faq-trigger-${i}`}
                  >
                    <span>{item.q}</span>
                    <svg className="faq-chevron" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                  </button>
                  <div className="faq-answer" id={`faq-answer-${i}`} role="region" aria-labelledby={`faq-trigger-${i}`}>
                    <p>{item.a}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
