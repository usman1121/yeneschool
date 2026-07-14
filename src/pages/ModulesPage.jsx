import PageShell from "../components/PageShell.jsx";
import { useTranslation } from "../i18n/I18nContext.jsx";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function ModulesPage() {
  const { t } = useTranslation();
  const headingRef = useRef(null);

  useEffect(() => {
    if (!headingRef.current) return;
    const words = headingRef.current.querySelectorAll(".word");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.06, ease: "power2.out" }
      );
    }, headingRef);
    return () => ctx.revert();
  }, []);

  const moduleCards = [
    { id: "academic-management", key: "academic", icon: <svg viewBox="0 0 24 24"><path d="M4 19.5V5a2 2 0 0 1 2-2h13v18H6a2 2 0 0 1-2-1.5Z" /><path d="M8 7h7M8 11h6" /></svg> },
    { id: "student-management", key: "student", icon: <svg viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-8 0v2" /><circle cx={12} cy={7} r={4} /><path d="M20 8v6M23 11h-6" /></svg> },
    { id: "attendance", key: "attendance", icon: <svg viewBox="0 0 24 24"><path d="M9 11 12 14 22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg> },
    { id: "marks-report-cards", key: "marks", icon: <svg viewBox="0 0 24 24"><path d="M4 4h16v16H4z" /><path d="M8 8h8M8 12h8M8 16h4" /></svg> },
    { id: "finance", key: "finance", icon: <svg viewBox="0 0 24 24"><rect x={2} y={5} width={20} height={14} rx={2} /><path d="M2 10h20M7 15h.01M11 15h2" /></svg> },
    { id: "communication", key: "communication", icon: <svg viewBox="0 0 24 24"><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z" /></svg> },
    { id: "local-school-support", key: "localSupport", icon: <svg viewBox="0 0 24 24"><path d="m5 8 6 6" /><path d="m4 14 6-6 2-3" /><path d="M2 5h12" /><path d="M7 2h1" /><path d="m22 22-5-10-5 10" /><path d="M14 18h6" /></svg> },
    { id: "lessons-assignments", key: "lessons", icon: <svg viewBox="0 0 24 24"><path d="M4 5h16v14H4z" /><path d="M8 9h8M8 13h5" /><path d="M6 21h12" /></svg> },
    { id: "automation-reporting", key: "automation", icon: <svg viewBox="0 0 24 24"><path d="M3 3v18h18" /><path d="M7 15l4-4 3 3 5-7" /></svg> },
    { id: "operations", key: "operations", icon: <svg viewBox="0 0 24 24"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 7h18s-3 0-3-7" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg> },
    { id: "admissions-enrollment", key: "admissions", icon: <svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" /><path d="M14 2v6h6" /><path d="M9 15l2 2 4-4" /></svg> },
    { id: "exams", key: "exams", icon: <svg viewBox="0 0 24 24"><path d="M9 3h6l1 3h4v15H4V6h4Z" /><path d="M9 11h6M9 15h4" /></svg> },
    { id: "online-examinations", key: "onlineExams", icon: <svg viewBox="0 0 24 24"><rect x={3} y={4} width={18} height={12} rx={2} /><path d="M8 20h8M12 16v4M8 9h5M8 12h3M16 9l1.5 1.5L20 8" /></svg> },
    { id: "user-portals", key: "portals", icon: <svg viewBox="0 0 24 24"><path d="M4 5h16v14H4z" /><path d="M8 9h4M8 13h8M16 9h.01" /></svg> },
    { id: "discipline-conduct", key: "discipline", icon: <svg viewBox="0 0 24 24"><path d="M12 3 4 7v6c0 5 8 8 8 8s8-3 8-8V7Z" /><path d="M9 12l2 2 4-4" /></svg> },
    { id: "staff-directory", key: "staff", icon: <svg viewBox="0 0 24 24"><path d="M3 21v-2a4 4 0 0 1 4-4h4" /><circle cx={9} cy={7} r={4} /><path d="M17 11l2 2 4-4" /><path d="M17 19h5" /></svg> },
    { id: "security-permissions", key: "security", icon: <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="m9 12 2 2 4-4" /></svg> },
    { id: "search-data-quality", key: "search", icon: <svg viewBox="0 0 24 24"><circle cx={11} cy={11} r={7} /><path d="m21 21-4.3-4.3" /><path d="M8 11h6" /></svg> },
    { id: "ai", key: "ai", icon: <svg viewBox="0 0 24 24"><circle cx={12} cy={12} r={10} /><path d="M12 2a10 10 0 0 1 10 10c0 5-4 8-10 10C6 20 2 17 2 12A10 10 0 0 1 12 2Z" /><path d="M8 12h8M12 8v8" /></svg> },
    { id: "backup-data-export", key: "backup", icon: <svg viewBox="0 0 24 24"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2Z" /><path d="M12 7v10M7 12h10" /></svg> },
    { id: "id-cards-certificates", key: "idCards", icon: <svg viewBox="0 0 24 24"><rect x={2} y={3} width={20} height={18} rx={2} /><path d="M12 7v2M12 11v2" /><circle cx={12} cy={16} r={1} /></svg> },
    { id: "events-calendar", key: "events", icon: <svg viewBox="0 0 24 24"><rect x={3} y={4} width={18} height={18} rx={2} /><path d="M3 10h18M8 2v4M16 2v4" /><path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" /></svg> },
    { id: "staff-messaging", key: "messaging", icon: <svg viewBox="0 0 24 24"><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z" /></svg> },
  ];

  const heading = t("modules.hero.title");
  const splitHeading = heading.split(" ").map((word, i) =>
    <span key={i} className="word">{word}</span>
  );
  return (
    <PageShell activePage="modules">
      <main id="top" className="modules-page">
        <section className="modules-hero" aria-labelledby="modules-page-title" data-reveal>
          <div className="modules-hero-layout">
            <div className="modules-hero-copy">
              <span className="section-kicker">{t("modules.hero.kicker")}</span>
              <h1 id="modules-page-title" ref={headingRef}>{splitHeading}</h1>
              <p>
                {t("modules.hero.subtitle")}
              </p>
            </div>
            <div className="modules-hero-stats">
              <div className="modules-orbit-geo">
                <svg className="geo-lines" viewBox="0 0 500 500" preserveAspectRatio="xMidYMid meet">
                  <line x1="250" y1="250" x2="218" y2="53" stroke="rgba(96,165,250,0.2)" strokeWidth="1.5" strokeDasharray="4 3" />
                  <line x1="250" y1="250" x2="427" y2="138" stroke="rgba(96,165,250,0.2)" strokeWidth="1.5" strokeDasharray="4 3" />
                  <line x1="250" y1="250" x2="73" y2="138" stroke="rgba(96,165,250,0.2)" strokeWidth="1.5" strokeDasharray="4 3" />
                  <line x1="250" y1="250" x2="427" y2="362" stroke="rgba(96,165,250,0.2)" strokeWidth="1.5" strokeDasharray="4 3" />
                  <line x1="250" y1="250" x2="218" y2="447" stroke="rgba(96,165,250,0.2)" strokeWidth="1.5" strokeDasharray="4 3" />
                  <line x1="250" y1="250" x2="73" y2="362" stroke="rgba(96,165,250,0.2)" strokeWidth="1.5" strokeDasharray="4 3" />
                  <circle cx="250" cy="250" r="55" fill="none" stroke="rgba(96,165,250,0.12)" strokeWidth="1" strokeDasharray="3 3" />
                  <circle cx="250" cy="250" r="48" fill="none" stroke="rgba(96,165,250,0.06)" strokeWidth="1" strokeDasharray="2 4" />
                  <text x="250" y="250" textAnchor="middle" dominantBaseline="central" fontSize="26" fontWeight="700" fill="#60a5fa" fontFamily="C8aTajra, serif">YeneSchool</text>
                </svg>
                {[
                  { style: { top: 5, left: 170 }, label: t("modules.orbit.labels")[0], desc: t("modules.orbit.descs")[0] },
                  { style: { top: 90, right: 25 }, label: t("modules.orbit.labels")[1], desc: t("modules.orbit.descs")[1] },
                  { style: { top: 90, left: 25 }, label: t("modules.orbit.labels")[2], desc: t("modules.orbit.descs")[2] },
                  { style: { bottom: 90, right: 25 }, label: t("modules.orbit.labels")[3], desc: t("modules.orbit.descs")[3] },
                  { style: { bottom: 5, left: 170 }, label: t("modules.orbit.labels")[4], desc: t("modules.orbit.descs")[4] },
                  { style: { bottom: 90, left: 25 }, label: t("modules.orbit.labels")[5], desc: t("modules.orbit.descs")[5] },
                ].map((node, i) => (
                  <div key={i} className="geo-node" style={{ "--i": i, ...node.style }}>
                    <strong>{node.label}</strong>
                    <span>{node.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <div className="modules-tag-cloud" data-reveal>
          <span className="section-kicker" style={{ marginBottom: 14, display: 'block' }}>{t("modules.tagCloud.kicker")}</span>
          <div className="tag-cloud-track">
            {t("modules.tagCloud.domains").map((name, i) => (
              <span key={i} className="tag-cloud-pill">{name}</span>
            ))}
          </div>
        </div>
        <section className="modules-directory section" aria-labelledby="module-checklist-title" data-reveal>
          <div className="modules-directory-heading">
            <div>
              <span className="section-kicker">{t("modules.checklist.title")}</span>
              <h2 id="module-checklist-title">{t("modules.checklist.subtitle")}</h2>
            </div>
                        <a className="pricing-btn" style={{ width: 'auto', margin: 0 }} href="/">{t("modules.checklist.viewPricing")}</a>
          </div>
          <div className="modules-directory-grid">
            {moduleCards.map((card) => (
              <article key={card.id} className="module-detail-card" data-reveal id={card.id}>
                <span className="module-icon" aria-hidden="true">{card.icon}</span>
                <h3>{t(`modules.details.${card.key}.title`)}</h3>
                <p>{t(`modules.details.${card.key}.desc`)}</p>
                <ul>{t(`modules.details.${card.key}.items`).map((f, i) => (
                  <li key={i}>{f}</li>
                ))}</ul>
              </article>
            ))}
          </div>
          <p style={{ textAlign: 'center', marginTop: '3rem', fontWeight: 600, fontSize: '1.2rem' }}>{t("modules.checklist.andMuchMore")}</p>
        </section>
      </main>
    </PageShell>
    
  );
}
