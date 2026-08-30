import PageShell from "../components/PageShell.jsx";
import { useTranslation } from "../i18n/I18nContext.jsx";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

function splitHeading(title) {
  const separator = title.includes("።") ? "።" : ".";
  const index = title.indexOf(separator);
  if (index === -1) return [title, ""];
  return [title.slice(0, index + 1), title.slice(index + 1).trim()];
}

export default function HomePage() {
  const { t } = useTranslation();
  const pricingTitle = t("home.pricing.title") || "Start lean. Grow into the full system.";
  const [pricingTitleLead, pricingTitleRest] = splitHeading(pricingTitle);
  const pexel = (id) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=100&w=100`;

  const headingRef = useRef(null);
  const heroTitle = t("home.hero.titleExtended");
  const splitHero = heroTitle.split(" ").map((word, i) =>
    <span key={i} className={`word${word === "|" ? " word-separator" : ""}`}>{word}</span>
  );

  useEffect(() => {
    if (!headingRef.current) return;
    const words = headingRef.current.querySelectorAll(".word");
    gsap.set(words, { willChange: "transform, opacity" });
    gsap.fromTo(words,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: "power3.out" }
    );
  }, []);

  const avatars1 = [25856915, 33769839, 25849114];
  const avatars2 = [25856887, 25849069, 25849070];
  const row1 = (t("home.testimonials.row1") || []).map((item, i) => ({ ...item, avatar: pexel(avatars1[i] || avatars1[0]) }));
  const row2 = (t("home.testimonials.row2") || []).map((item, i) => ({ ...item, avatar: pexel(avatars2[i] || avatars2[0]) }));

  return (
    <PageShell activePage="home">
      <main id="top">
        <section className="hero tailark-hero" aria-labelledby="hero-title">
          <div className="hero-orbits" aria-hidden="true">
            <span /><span /><span />
          </div>
          <div className="hero-copy">
            <h1 id="hero-title" ref={headingRef}>{splitHero}</h1>
            <p data-reveal>
              {t("home.hero.subtitle")}
            </p>
          </div>
          <div className="tailark-preview" data-reveal>
            <div className="dashboard-caption" data-dashboard-caption aria-live="polite">
              <strong data-dashboard-caption-title>{t("home.dashboardSlides.items.0.title")}</strong>
              <span data-dashboard-caption-desc>{t("home.dashboardSlides.items.0.description")}</span>
            </div>
            <div className="preview-perspective" data-dashboard-frame>
              <div className="preview-skew">
                <img className="tailark-dashboard-img" src="./assets/directordashbaord.webp" srcSet="./assets/directordashbaord-1280.webp 1280w, ./assets/directordashbaord-960.webp 960w, ./assets/directordashbaord-640.webp 640w" sizes="(max-width: 768px) 100vw, 1281px" alt="YeneSchool director dashboard preview" data-dashboard-image width={1882} height={1131} loading="eager" fetchPriority="high" decoding="async" />
              </div>
            </div>
            <div className="hero-dashboard-switcher" data-dashboard-slider aria-label="Dashboard previews">
              <button className="dashboard-btn dashboard-prev" type="button" data-dashboard-prev aria-label="Previous dashboard">
                <svg viewBox="0 0 24 24" aria-hidden="true" width="18" height="18">
                  <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div className="dashboard-slide-dots" role="tablist" aria-label="Choose dashboard preview">
                {(t("home.dashboardSlides.items") || []).map((slide, index) => (
                  <button
                    key={index}
                    className={`dashboard-dot${index === 0 ? " is-active" : ""}`}
                    type="button"
                    role="tab"
                    data-dashboard-slide={index}
                    aria-label={`Show ${slide.title}`}
                    aria-selected={index === 0 ? "true" : "false"}
                  />
                ))}
              </div>
              <button className="dashboard-btn dashboard-next" type="button" data-dashboard-next aria-label="Next dashboard">
                <svg viewBox="0 0 24 24" aria-hidden="true" width="18" height="18">
                  <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </section>
        <section className="school-signals-section" aria-label="School workflows covered by YeneSchool" data-reveal>
          <h2>{t("home.workflows.title")}</h2>
          <div className="workflow-grid">
            {t("home.workflows.items").map((workflow) => (
              <article className="workflow-card" key={workflow.title}>
                <strong>{workflow.title}</strong>
                <small>{workflow.desc}</small>
              </article>
            ))}
          </div>
        </section>
        <section className="section role-section" id="roles" aria-labelledby="roles-title" data-reveal>
          <div className="role-heading">
            <p className="eyebrow">{t("home.roles.eyebrow")}</p>
            <h2 id="roles-title">{t("home.roles.title")}</h2>
            <p>
              {t("home.roles.subtitle")}
            </p>
          </div>
          <div className="role-bento">
            {["admin", "teacher", "parent", "registrar", "finance", "student", "itManager", "storekeeper"].map((roleKey) => (
              <article className="role-card" key={roleKey}>
                <h3>{t(`home.roles.cards.${roleKey}.title`)}</h3>
                <p>{t(`home.roles.cards.${roleKey}.desc`)}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="section modules-preview-section" id="modules" aria-labelledby="modules-title" data-reveal>
          <div className="section-heading modules-preview-heading">
            <span className="section-kicker">{t("home.modules.eyebrow")}</span>
            <h2 id="modules-title">{t("home.modules.title")}</h2>
            <p>
              {t("home.modules.subtitle")}
            </p>
          </div>
          <div className="modules-preview-grid" aria-label="YeneSchool module highlights">
            {[
              { key: "academic", anchor: "academic-management" },
              { key: "student", anchor: "student-management" },
              { key: "marks", anchor: "marks-report-cards" },
              { key: "onlineExams", anchor: "online-examinations" },
              { key: "multiLang", anchor: "local-school-support" },
              { key: "communication", anchor: "communication" },
              { key: "automation", anchor: "automation-reporting" },
              { key: "ai", anchor: "ai" },
            ].map((module) => (
              <a className="module-feature-card" href={`/modules#${module.anchor}`} key={module.key}>
                <strong>{t(`home.modules.cards.${module.key}.title`)}</strong>
                <small>{t(`home.modules.cards.${module.key}.desc`)}</small>
              </a>
            ))}
          </div>
          <div className="modules-preview-actions">
            <a className="pricing-btn" style={{ width: 'auto', margin: 0 }} href="/modules">{t("home.modules.viewAll")}</a>
          </div>
        </section>
        <section className="school-signals-section ai-intelligence-section" aria-label="AI intelligence capabilities" data-reveal>
          <h2>{t("home.aiIntelligence.title")}</h2>
          <p className="ai-intelligence-subtitle">
            {t("home.aiIntelligence.subtitle")}
          </p>
          <div className="ai-intelligence-grid">
            {t("home.aiIntelligence.cards").map((card) => (
              <article className="ai-intel-card" key={card.title}>
                <strong>{card.title}</strong>
                <p>{card.desc}</p>
              </article>
            ))}
          </div>
          <div className="ai-intelligence-featured">
            <article className="ai-featured-card">
              <strong>{t("home.aiIntelligence.assistant.title")}</strong>
              <p>
                {t("home.aiIntelligence.assistant.desc")}
              </p>
              <ul>
                {t("home.aiIntelligence.assistant.items").map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article className="ai-featured-card">
              <strong>{t("home.aiIntelligence.reports.title")}</strong>
              <p>
                {t("home.aiIntelligence.reports.desc")}
              </p>
              <ul>
                {t("home.aiIntelligence.reports.items").map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </section>
        <section className="section parent-section" id="parent-visibility" aria-labelledby="parent-title" data-reveal>
          <div className="parent-layout">
            <div className="parent-copy">
              <p className="eyebrow">{t("home.parent.eyebrow")}</p>
              <h2 id="parent-title">{t("home.parent.title")}</h2>
              <p>
                {t("home.parent.subtitle")}
              </p>
              <div className="parent-tabs" role="tablist" aria-label="Parent visibility views">
                <button className="parent-tab is-active" type="button" role="tab" aria-selected="true" aria-controls="parent-panel-attendance" id="parent-tab-attendance" data-parent-tab="attendance">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11 12 14 22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>
                  {t("home.parent.tabs.attendance")}
                </button>
                <button className="parent-tab" type="button" role="tab" aria-selected="false" aria-controls="parent-panel-reports" id="parent-tab-reports" data-parent-tab="reports">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16v16H4z" /><path d="M8 8h8M8 12h8M8 16h4" /></svg>
                  {t("home.parent.tabs.reportCards")}
                </button>
                <button className="parent-tab" type="button" role="tab" aria-selected="false" aria-controls="parent-panel-fees" id="parent-tab-fees" data-parent-tab="fees">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx={12} cy={12} r={10} /><path d="M12 6v12M8 12h8" /></svg>
                  {t("home.parent.tabs.feeStatus")}
                </button>
                <button className="parent-tab" type="button" role="tab" aria-selected="false" aria-controls="parent-panel-notices" id="parent-tab-notices" data-parent-tab="notices">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
                  {t("home.parent.tabs.notices")}
                </button>
              </div>
            </div>
            <div className="parent-preview">
              <div className="parent-panel is-active" role="tabpanel" id="parent-panel-attendance" aria-labelledby="parent-tab-attendance" data-parent-panel="attendance">
                <div className="parent-panel-card-content">
                  <div className="parent-panel-card-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11 12 14 22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>
                  </div>
                  <div className="parent-panel-card-text">
                    <h3>{t("home.parent.panels.attendance.title")}</h3>
                    <p>{t("home.parent.panels.attendance.desc")}</p>
                  </div>
                </div>
                <div className="parent-panel-card-stats">
                  <div className="parent-stat">
                    <span className="parent-stat-value">18</span>
                    <span className="parent-stat-label">{t("home.parent.panels.attendance.present")}</span>
                  </div>
                  <div className="parent-stat">
                    <span className="parent-stat-value warn">1</span>
                    <span className="parent-stat-label">{t("home.parent.panels.attendance.late")}</span>
                  </div>
                  <div className="parent-stat">
                    <span className="parent-stat-value good">0</span>
                    <span className="parent-stat-label">{t("home.parent.panels.attendance.absent")}</span>
                  </div>
                </div>
                <div className="parent-panel-card-list">
                  <div className="parent-list-row"><span>{t("home.parent.panels.attendance.monday")}</span><span className="badge badge-good">{t("home.parent.panels.attendance.present")}</span></div>
                  <div className="parent-list-row"><span>{t("home.parent.panels.attendance.tuesday")}</span><span className="badge badge-good">{t("home.parent.panels.attendance.present")}</span></div>
                  <div className="parent-list-row"><span>{t("home.parent.panels.attendance.wednesday")}</span><span className="badge badge-warn">{t("home.parent.panels.attendance.late")}</span></div>
                  <div className="parent-list-row"><span>{t("home.parent.panels.attendance.thursday")}</span><span className="badge badge-good">{t("home.parent.panels.attendance.present")}</span></div>
                </div>
              </div>
              <div className="parent-panel" role="tabpanel" id="parent-panel-reports" aria-labelledby="parent-tab-reports" data-parent-panel="reports" hidden>
                <div className="parent-panel-card-content">
                  <div className="parent-panel-card-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16v16H4z" /><path d="M8 8h8M8 12h8M8 16h4" /></svg>
                  </div>
                  <div className="parent-panel-card-text">
                    <h3>{t("home.parent.panels.reportCards.title")}</h3>
                    <p>{t("home.parent.panels.reportCards.desc")}</p>
                  </div>
                </div>
                <div className="parent-panel-card-highlight">
                  <span>{t("home.parent.panels.reportCards.average")}</span>
                  <strong>91%</strong>
                  <small>{t("home.parent.panels.reportCards.released")}</small>
                </div>
                <div className="parent-panel-card-list">
                  <div className="parent-list-row"><span>{t("home.parent.panels.reportCards.mathematics")}</span><span className="badge badge-good">A</span></div>
                  <div className="parent-list-row"><span>{t("home.parent.panels.reportCards.english")}</span><span className="badge badge-good">A-</span></div>
                  <div className="parent-list-row"><span>{t("home.parent.panels.reportCards.science")}</span><span className="badge badge-good">A</span></div>
                  <div className="parent-list-row"><span>{t("home.parent.panels.reportCards.conductNote")}</span><span>{t("home.parent.badges.excellent")}</span></div>
                </div>
              </div>
              <div className="parent-panel" role="tabpanel" id="parent-panel-fees" aria-labelledby="parent-tab-fees" data-parent-panel="fees" hidden>
                <div className="parent-panel-card-content">
                  <div className="parent-panel-card-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx={12} cy={12} r={10} /><path d="M12 6v12M8 12h8" /></svg>
                  </div>
                  <div className="parent-panel-card-text">
                    <h3>{t("home.parent.panels.fees.title")}</h3>
                    <p>{t("home.parent.panels.fees.desc")}</p>
                  </div>
                </div>
                <div className="parent-panel-card-highlight">
                  <span>{t("home.parent.panels.fees.nextInstallment")}</span>
                  <strong>{t("home.parent.panels.fees.dueIn")}</strong>
                  <small>{t("home.parent.panels.fees.receiptAvailable")}</small>
                </div>
                <div className="parent-panel-card-list">
                  <div className="parent-list-row"><span>{t("home.parent.panels.fees.tuition")}</span><span className="badge badge-good">{t("home.parent.badges.paid")}</span></div>
                  <div className="parent-list-row"><span>{t("home.parent.panels.fees.transport")}</span><span className="badge badge-warn">{t("home.parent.badges.pending")}</span></div>
                  <div className="parent-list-row"><span>{t("home.parent.panels.fees.discount")}</span><span className="badge">{t("home.parent.badges.applied")}</span></div>
                  <div className="parent-list-row"><span>{t("home.parent.panels.fees.latestReceipt")}</span><span className="badge">{t("home.parent.badges.available")}</span></div>
                </div>
              </div>
              <div className="parent-panel" role="tabpanel" id="parent-panel-notices" aria-labelledby="parent-tab-notices" data-parent-panel="notices" hidden>
                <div className="parent-panel-card-content">
                  <div className="parent-panel-card-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
                  </div>
                  <div className="parent-panel-card-text">
                    <h3>{t("home.parent.panels.notices.title")}</h3>
                    <p>{t("home.parent.panels.notices.desc")}</p>
                  </div>
                </div>
                <div className="parent-panel-card-list parent-notice-list">
                  <div className="parent-list-row parent-notice-row"><span>{t("home.parent.panels.notices.notice1")}</span><small>{t("home.parent.panels.notices.notice1Desc")}</small></div>
                  <div className="parent-list-row parent-notice-row"><span>{t("home.parent.panels.notices.notice2")}</span><small>{t("home.parent.panels.notices.notice2Desc")}</small></div>
                  <div className="parent-list-row parent-notice-row"><span>{t("home.parent.panels.notices.notice3")}</span><small>{t("home.parent.panels.notices.notice3Desc")}</small></div>
                  <div className="parent-list-row parent-notice-row"><span>{t("home.parent.panels.notices.notice4")}</span><small>{t("home.parent.panels.notices.notice4Desc")}</small></div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section pricing-section" id="pricing" aria-labelledby="pricing-heading" data-reveal>
          <div className="pricing-heading">
            <p className="pricing-eyebrow">{t("home.pricing.eyebrow")}</p>
            <h2 id="pricing-heading">
              {pricingTitleLead} {pricingTitleRest ? <span>{pricingTitleRest}</span> : null}
            </h2>
            <p>
              {t("home.pricing.subtitle")}
            </p>
          </div>
          <div className="pricing-toggle">
            <span className="toggle-label" data-monthly-label>{t("home.pricing.toggle.monthly")}</span>
            <label className="switch" aria-label="Toggle annual billing">
              <input type="checkbox" id="pricing-switch" />
              <span className="slider" />
            </label>
            <span className="toggle-label">
              {t("home.pricing.toggle.annual")} <span className="save-badge">{t("home.pricing.toggle.bestValue")}</span>
            </span>
          </div>
          <div className="pricing-grid">
            <article className="pricing-card pricing-side-left" data-plan="core">
              <div className="plan-header">
                <p className="plan-name">{t("home.pricing.plans.core.name")}</p>
                <p className="plan-audience">{t("home.pricing.plans.core.audience")}</p>
                <p className="plan-students">{t("home.pricing.plans.core.students")}</p>
              </div>
              <div className="launch-price-box">
                <div className="price-meta">
                  <span className="renewal-price annual-only">180,000 ETB/year</span>
                  <span className="launch-badge" data-billing-badge>{t("home.pricing.plans.core.monthlyLabel")}</span>
                </div>
                <p className="launch-price" data-monthly-price="15,000 ETB/mo" data-annual-price="135,000 ETB/year">{t("home.pricing.plans.core.monthlyPrice")}</p>
                <p className="first-year-note" data-monthly-note={t("home.pricing.plans.core.monthlyNote")} data-annual-note={t("home.pricing.plans.core.annualNote")}>{t("home.pricing.plans.core.monthlyNote")}</p>
              </div>
              <div className="service-plans" role="radiogroup" aria-label="Service payment options">
                <div className="service-plan is-active" role="radio" aria-checked="true" data-billing-option="monthly" tabIndex={0}>
                  <div><strong>{t("home.pricing.plans.core.monthlyLabel")}</strong><small>{t("home.pricing.plans.core.monthlyDetail")}</small></div>
                  <span>{t("home.pricing.plans.core.monthlyPrice")}</span>
                </div>
                <div className="service-plan" role="radio" aria-checked="false" data-billing-option="" tabIndex={-1}>
                  <div><strong>{t("home.pricing.plans.core.sixMonth")}</strong><small>{t("home.pricing.plans.core.sixMonthDetail")}</small></div>
                  <span>{t("home.pricing.plans.core.sixMonthPrice")}</span>
                  <em>{t("home.pricing.plans.core.sixMonthSave")}</em>
                </div>
                <div className="service-plan" role="radio" aria-checked="false" data-billing-option="annual" tabIndex={-1}>
                  <div><strong>{t("home.pricing.plans.core.yearly")}</strong><small>{t("home.pricing.plans.core.yearlyDetail")}</small></div>
                  <span>{t("home.pricing.plans.core.yearlyPrice")}</span>
                  <em>{t("home.pricing.plans.core.yearlySave")}</em>
                </div>
              </div>
              <ul className="plan-features">
                {t("home.pricing.plans.core.features").map((f, i) => (
                  <li key={i}><svg className="check-icon" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5" /></svg><span>{f}</span></li>
                ))}
              </ul>
              <hr className="plan-divider" />
              <a className="pricing-btn" href="/contact">{t("home.pricing.contactSales")}</a>
            </article>
            <article className="pricing-card popular" data-plan="standard">
              <div className="popular-badge">
                <svg className="star-icon" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                {t("home.pricing.plans.standard.mostPopular")}
              </div>
              <div className="plan-header">
                <p className="plan-name">{t("home.pricing.plans.standard.name")}</p>
                <p className="plan-audience">{t("home.pricing.plans.standard.audience")}</p>
                <p className="plan-students">{t("home.pricing.plans.standard.students")}</p>
              </div>
              <div className="launch-price-box">
                <div className="price-meta">
                  <span className="renewal-price annual-only">240,000 ETB/year</span>
                  <span className="launch-badge" data-billing-badge>{t("home.pricing.plans.standard.monthlyLabel")}</span>
                </div>
                <p className="launch-price" data-monthly-price="20,000 ETB/mo" data-annual-price="180,000 ETB/year">{t("home.pricing.plans.standard.monthlyPrice")}</p>
                <p className="first-year-note" data-monthly-note={t("home.pricing.plans.standard.monthlyNote")} data-annual-note={t("home.pricing.plans.standard.annualNote")}>{t("home.pricing.plans.standard.monthlyNote")}</p>
              </div>
              <div className="service-plans" role="radiogroup" aria-label="Service payment options">
                <div className="service-plan is-active" role="radio" aria-checked="true" data-billing-option="monthly" tabIndex={0}>
                  <div><strong>{t("home.pricing.plans.standard.monthlyLabel")}</strong><small>{t("home.pricing.plans.standard.monthlyDetail")}</small></div>
                  <span>{t("home.pricing.plans.standard.monthlyPrice")}</span>
                </div>
                <div className="service-plan" role="radio" aria-checked="false" data-billing-option="" tabIndex={-1}>
                  <div><strong>{t("home.pricing.plans.standard.sixMonth")}</strong><small>{t("home.pricing.plans.standard.sixMonthDetail")}</small></div>
                  <span>{t("home.pricing.plans.standard.sixMonthPrice")}</span>
                  <em>{t("home.pricing.plans.standard.sixMonthSave")}</em>
                </div>
                <div className="service-plan" role="radio" aria-checked="false" data-billing-option="annual" tabIndex={-1}>
                  <div><strong>{t("home.pricing.plans.standard.yearly")}</strong><small>{t("home.pricing.plans.standard.yearlyDetail")}</small></div>
                  <span>{t("home.pricing.plans.standard.yearlyPrice")}</span>
                  <em>{t("home.pricing.plans.standard.yearlySave")}</em>
                </div>
              </div>
              <ul className="plan-features">
                {t("home.pricing.plans.standard.features").map((f, i) => (
                  <li key={i}><svg className="check-icon" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5" /></svg><span>{f}</span></li>
                ))}
              </ul>
              <hr className="plan-divider" />
              <a className="pricing-btn" href="/contact">{t("home.pricing.contactSales")}</a>
            </article>
            <article className="pricing-card pricing-side-right" data-plan="ultimate">
              <div className="plan-header">
                <p className="plan-name">{t("home.pricing.plans.ultimate.name")}</p>
                <p className="plan-audience">{t("home.pricing.plans.ultimate.audience")}</p>
                <p className="plan-students">{t("home.pricing.plans.ultimate.students")}</p>
              </div>
              <div className="launch-price-box">
                <div className="price-meta">
                  <span className="renewal-price annual-only">420,000 ETB/year</span>
                  <span className="launch-badge" data-billing-badge>{t("home.pricing.plans.ultimate.monthlyLabel")}</span>
                </div>
                <p className="launch-price" data-monthly-price="35,000 ETB/mo" data-annual-price="315,000 ETB/year">{t("home.pricing.plans.ultimate.monthlyPrice")}</p>
                <p className="first-year-note" data-monthly-note={t("home.pricing.plans.ultimate.monthlyNote")} data-annual-note={t("home.pricing.plans.ultimate.annualNote")}>{t("home.pricing.plans.ultimate.monthlyNote")}</p>
              </div>
              <div className="service-plans" role="radiogroup" aria-label="Service payment options">
                <div className="service-plan is-active" role="radio" aria-checked="true" data-billing-option="monthly" tabIndex={0}>
                  <div><strong>{t("home.pricing.plans.ultimate.monthlyLabel")}</strong><small>{t("home.pricing.plans.ultimate.monthlyDetail")}</small></div>
                  <span>{t("home.pricing.plans.ultimate.monthlyPrice")}</span>
                </div>
                <div className="service-plan" role="radio" aria-checked="false" data-billing-option="" tabIndex={-1}>
                  <div><strong>{t("home.pricing.plans.ultimate.sixMonth")}</strong><small>{t("home.pricing.plans.ultimate.sixMonthDetail")}</small></div>
                  <span>{t("home.pricing.plans.ultimate.sixMonthPrice")}</span>
                  <em>{t("home.pricing.plans.ultimate.sixMonthSave")}</em>
                </div>
                <div className="service-plan" role="radio" aria-checked="false" data-billing-option="annual" tabIndex={-1}>
                  <div><strong>{t("home.pricing.plans.ultimate.yearly")}</strong><small>{t("home.pricing.plans.ultimate.yearlyDetail")}</small></div>
                  <span>{t("home.pricing.plans.ultimate.yearlyPrice")}</span>
                  <em>{t("home.pricing.plans.ultimate.yearlySave")}</em>
                </div>
              </div>
              <ul className="plan-features">
                {t("home.pricing.plans.ultimate.features").map((f, i) => (
                  <li key={i}><svg className="check-icon" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5" /></svg><span>{f}</span></li>
                ))}
              </ul>
              <hr className="plan-divider" />
              <a className="pricing-btn" href="/contact">{t("home.pricing.contactSales")}</a>
            </article>
          </div>
        </section>
        <section className="section testimonials-section" aria-labelledby="testimonials-heading">
          <div className="testimonials-header" data-reveal>
            <p className="eyebrow">{t("home.testimonials.eyebrow")}</p>
            <h2 id="testimonials-heading">{t("home.testimonials.title")}</h2>
            <p className="testimonials-desc">{t("home.testimonials.desc")}</p>
          </div>
          <div className="testimonials-marquee" data-reveal>
            <div className="testimonials-track">
              {[...Array(3)].flatMap(() => row1).map((item, i) => (
                <article key={i} className="testimonial-card">
                  <div className="testimonial-card-header">
                    <img className="testimonial-avatar" src={item.avatar} alt="" width={40} height={40} loading="lazy" />
                    <div>
                      <strong>{item.name}</strong>
                      <span>{item.role}</span>
                    </div>
                  </div>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="testimonials-marquee reverse" data-reveal>
            <div className="testimonials-track">
              {[...Array(3)].flatMap(() => row2).map((item, i) => (
                <article key={i} className="testimonial-card">
                  <div className="testimonial-card-header">
                    <img className="testimonial-avatar" src={item.avatar} alt="" width={40} height={40} loading="lazy" />
                    <div>
                      <strong>{item.name}</strong>
                      <span>{item.role}</span>
                    </div>
                  </div>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </PageShell>
    
  );
}
