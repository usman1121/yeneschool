import PageShell from "../components/PageShell.jsx";
import { useTranslation } from "../i18n/I18nContext.jsx";
import { useState, useEffect } from "react";
import TextGenerateEffect from "../components/ui/text-generate-effect.tsx";
import BlurText from "../components/ui/BlurText.jsx";

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

  const heroTitle = t("home.hero.titleExtended");

  const [activeSubtitleIndex, setActiveSubtitleIndex] = useState(0);
  const [isSubtitlePaused, setIsSubtitlePaused] = useState(false);

  const rawSubtitles = t("home.hero.subtitles");
  const subtitles = Array.isArray(rawSubtitles) && rawSubtitles.length > 0
    ? rawSubtitles
    : [
        {
          tag: "01 Operations & Autopilot",
          lead: "School operations on true autopilot.",
          text: t("home.hero.subtitle") || "",
        },
      ];

  useEffect(() => {
    if (isSubtitlePaused || subtitles.length <= 1) return;
    const timer = setInterval(() => {
      setActiveSubtitleIndex((prev) => (prev + 1) % subtitles.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isSubtitlePaused, subtitles.length]);

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
            <BlurText
              as="h1"
              id="hero-title"
              text={heroTitle}
              delay={90}
              stepDuration={0.45}
              animateBy="words"
              direction="bottom"
              className="hero-blur-title"
            />
            <div
              className="hero-subtitle-rotator"
              onMouseEnter={() => setIsSubtitlePaused(true)}
              onMouseLeave={() => setIsSubtitlePaused(false)}
              aria-live="polite"
              data-reveal
            >
              <div className="subtitle-dots-nav" role="tablist" aria-label="Choose subtitle slide">
                {subtitles.map((sub, i) => (
                  <button
                    key={i}
                    type="button"
                    role="tab"
                    aria-selected={activeSubtitleIndex === i}
                    className={`subtitle-dot${activeSubtitleIndex === i ? " is-active" : ""}`}
                    onClick={() => setActiveSubtitleIndex(i)}
                    aria-label={`Show slide ${i + 1}`}
                  />
                ))}
              </div>
              <div className="subtitle-viewport">
                {subtitles.map((sub, i) => {
                  const isActive = activeSubtitleIndex === i;
                  return (
                    <div
                      key={i}
                      className={`subtitle-slide${isActive ? " is-active" : ""}`}
                      aria-hidden={!isActive}
                    >
                      {isActive ? (
                        <TextGenerateEffect
                          key={`effect-${i}`}
                          words={sub.text}
                          lead={sub.lead}
                          duration={0.35}
                          staggerDelay={0.026}
                          className="subtitle-text-effect"
                        />
                      ) : (
                        <div className="subtitle-slide-ghost" aria-hidden="true">
                          <strong className="subtitle-lead">{sub.lead}</strong>{" "}
                          <span className="subtitle-body">{sub.text}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
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
        <section className="section role-section" id="problem" aria-labelledby="problem-title" data-reveal>
          <div className="role-heading">
            <p className="eyebrow">{t("home.problem.eyebrow")}</p>
            <h2 id="problem-title">{t("home.problem.title")}</h2>
            <p>
              {t("home.problem.subtitle")}
            </p>
          </div>
          <div className="role-bento">
            {(t("home.problem.cards") || []).map((card, idx) => (
              <article className="role-card" key={idx}>
                <div className="role-icon">{card.tag || `0${idx + 1}`}</div>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </article>
            ))}
          </div>
          <div className="problem-closing-banner" data-reveal>
            <div className="problem-closing-inner">
              <span className="section-kicker">{t("home.problem.closingKicker")}</span>
              <h3>{t("home.problem.closingStatement")}</h3>
              <p>{t("home.problem.closingSubtext")}</p>
              <div className="modules-preview-actions" style={{ justifyContent: "center", marginTop: "24px", gap: "16px", flexWrap: "wrap" }}>
                <a className="pricing-btn" style={{ width: "auto", margin: 0, background: "#60a5fa", color: "#fff" }} href="/modules#online-examinations">
                  {t("home.problem.ctaModules")}
                </a>
                <a className="secondary-btn" style={{ width: "auto" }} href="/demo">
                  {t("home.problem.ctaDemo")}
                </a>
              </div>
            </div>
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
          <div className="modules-preview-grid" aria-label="How YeneSchool fixes national exam issues">
            {[
              { key: "remedialPractice", anchor: "online-examinations" },
              { key: "lessonPlanning", anchor: "academic-management" },
              { key: "academicOutreach", anchor: "communication" },
              { key: "syllabusTracking", anchor: "academic-management" },
              { key: "mockExams", anchor: "online-examinations" },
              { key: "teacherHeatmaps", anchor: "academic-management" },
              { key: "earlyWarning", anchor: "automation-reporting" },
              { key: "unifiedPlatform", anchor: "student-management" },
            ].map((module) => (
              <a className="module-feature-card" href={`/modules#${module.anchor}`} key={module.key}>
                <strong>{t(`home.modules.cards.${module.key}.title`)}</strong>
                <small>{t(`home.modules.cards.${module.key}.desc`)}</small>
              </a>
            ))}
          </div>
          <div className="modules-preview-actions" style={{ gap: "12px", flexWrap: "wrap" }}>
            <a className="pricing-btn" style={{ width: 'auto', margin: 0, background: "#60a5fa", color: "#fff" }} href="/modules">{t("home.modules.viewAll")}</a>
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
        <section className="section role-section owner-advantages-section" id="owner-advantages" aria-labelledby="advantages-title" data-reveal>
          <div className="role-heading">
            <p className="eyebrow">{t("home.ownerAdvantages.eyebrow")}</p>
            <h2 id="advantages-title">{t("home.ownerAdvantages.title")}</h2>
            <p>
              {t("home.ownerAdvantages.subtitle")}
            </p>
          </div>
          <div className="role-bento">
            {(t("home.ownerAdvantages.cards") || []).map((card, idx) => (
              <article className="role-card" key={idx}>
                <div className="role-icon">{card.tag}</div>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </article>
            ))}
          </div>
          <div className="problem-closing-banner" data-reveal>
            <div className="problem-closing-inner">
              <div className="modules-preview-actions" style={{ justifyContent: "center", margin: 0, gap: "16px", flexWrap: "wrap" }}>
                <a className="pricing-btn" style={{ width: "auto", margin: 0, background: "#60a5fa", color: "#fff" }} href="/demo">
                  {t("home.ownerAdvantages.ctaPilot")}
                </a>
                <a className="secondary-btn" style={{ width: "auto" }} href="/vs-others">
                  {t("home.ownerAdvantages.ctaExplore")}
                </a>
              </div>
            </div>
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
                <button className="parent-tab is-active" type="button" role="tab" aria-selected="true" aria-controls="parent-panel-fees" id="parent-tab-fees" data-parent-tab="fees">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /></svg>
                  {t("home.parent.tabs.fees")}
                </button>
                <button className="parent-tab" type="button" role="tab" aria-selected="false" aria-controls="parent-panel-attendance" id="parent-tab-attendance" data-parent-tab="attendance">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11 12 14 22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>
                  {t("home.parent.tabs.attendance")}
                </button>
                <button className="parent-tab" type="button" role="tab" aria-selected="false" aria-controls="parent-panel-reports" id="parent-tab-reports" data-parent-tab="reports">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16v16H4z" /><path d="M8 8h8M8 12h8M8 16h4" /></svg>
                  {t("home.parent.tabs.reportCards")}
                </button>
                <button className="parent-tab" type="button" role="tab" aria-selected="false" aria-controls="parent-panel-practice" id="parent-tab-practice" data-parent-tab="practice">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" /></svg>
                  {t("home.parent.tabs.practice")}
                </button>
                <button className="parent-tab" type="button" role="tab" aria-selected="false" aria-controls="parent-panel-notices" id="parent-tab-notices" data-parent-tab="notices">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
                  {t("home.parent.tabs.notices")}
                </button>
              </div>
            </div>
            <div className="parent-preview">
              <div className="parent-panel is-active" role="tabpanel" id="parent-panel-fees" aria-labelledby="parent-tab-fees" data-parent-panel="fees">
                <div className="parent-panel-card-content">
                  <div className="parent-panel-card-icon" style={{ background: "rgba(16, 185, 129, 0.1)", color: "#10b981", borderColor: "rgba(16, 185, 129, 0.25)" }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /></svg>
                  </div>
                  <div className="parent-panel-card-text">
                    <h3>{t("home.parent.panels.fees.title")}</h3>
                    <p>{t("home.parent.panels.fees.desc")}</p>
                  </div>
                </div>

                <div className="parent-fee-ledger">
                  <div className="parent-fee-summary-header">
                    <div className="parent-fee-summary-meta">
                      <span className="parent-fee-tag">{t("home.parent.panels.fees.academicTerm")}</span>
                      <strong className="parent-fee-student">{t("home.parent.panels.fees.studentContext")}</strong>
                    </div>
                    <div className="parent-fee-summary-due">
                      <span className="parent-fee-due-label">{t("home.parent.panels.fees.outstandingBalance")}</span>
                      <strong className="parent-fee-due-val">{t("home.parent.panels.fees.dueAmount")}</strong>
                    </div>
                  </div>

                  <div className="parent-fee-channels">
                    <span className="parent-fee-channels-label">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                      {t("home.parent.panels.fees.receiptBadge")}
                    </span>
                    <div className="parent-fee-actions">
                      <button type="button" className="fee-pay-btn telebirr-btn" onClick={(e) => e.preventDefault()}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
                        {t("home.parent.panels.fees.payTelebirr")}
                      </button>
                      <button type="button" className="fee-pay-btn cbe-btn" onClick={(e) => e.preventDefault()}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15"><path d="M3 21h18M3 10h18M5 10v11M19 10v11M9 10v11M15 10v11M12 3L2 10h20L12 3z"/></svg>
                        {t("home.parent.panels.fees.payCbe")}
                      </button>
                    </div>
                  </div>

                  <div className="parent-panel-card-list">
                    <div className="parent-list-row parent-fee-row">
                      <div className="parent-fee-col">
                        <span className="parent-fee-name">{t("home.parent.panels.fees.tuition")}</span>
                        <span className="parent-fee-meta">{t("home.parent.panels.fees.tuitionSub")}</span>
                      </div>
                      <span className="badge badge-good">{t("home.parent.badges.paid")}</span>
                    </div>
                    <div className="parent-list-row parent-fee-row">
                      <div className="parent-fee-col">
                        <span className="parent-fee-name">{t("home.parent.panels.fees.transport")}</span>
                        <span className="parent-fee-meta">{t("home.parent.panels.fees.transportSub")}</span>
                      </div>
                      <span className="badge badge-warn">{t("home.parent.badges.pending")}</span>
                    </div>
                    <div className="parent-list-row parent-fee-row">
                      <div className="parent-fee-col">
                        <span className="parent-fee-name">{t("home.parent.panels.fees.uniform")}</span>
                        <span className="parent-fee-meta">{t("home.parent.panels.fees.uniformSub")}</span>
                      </div>
                      <span className="badge badge-good">{t("home.parent.badges.paid")}</span>
                    </div>
                    <div className="parent-list-row parent-fee-row">
                      <div className="parent-fee-col">
                        <span className="parent-fee-name">{t("home.parent.panels.fees.registration")}</span>
                        <span className="parent-fee-meta">{t("home.parent.panels.fees.registrationSub")}</span>
                      </div>
                      <span className="badge badge-good">{t("home.parent.badges.paid")}</span>
                    </div>
                    <div className="parent-list-row parent-fee-row">
                      <div className="parent-fee-col">
                        <span className="parent-fee-name">{t("home.parent.panels.fees.discount")}</span>
                        <span className="parent-fee-meta parent-fee-discount">{t("home.parent.panels.fees.discountSub")}</span>
                      </div>
                      <span className="badge badge-good">{t("home.parent.badges.applied")}</span>
                    </div>
                    <div className="parent-list-row parent-fee-row parent-receipt-row">
                      <div className="parent-fee-col">
                        <span className="parent-fee-name">{t("home.parent.panels.fees.latestReceipt")}</span>
                        <span className="parent-fee-meta">{t("home.parent.panels.fees.latestReceiptSub")}</span>
                      </div>
                      <span className="badge badge-outline">{t("home.parent.badges.available")}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="parent-panel" role="tabpanel" id="parent-panel-attendance" aria-labelledby="parent-tab-attendance" data-parent-panel="attendance" hidden>
                <div className="parent-panel-card-content">
                  <div className="parent-panel-card-icon" style={{ background: "rgba(59, 130, 246, 0.1)", color: "#3b82f6", borderColor: "rgba(59, 130, 246, 0.25)" }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11 12 14 22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>
                  </div>
                  <div className="parent-panel-card-text">
                    <h3>{t("home.parent.panels.attendance.title")}</h3>
                    <p>{t("home.parent.panels.attendance.desc")}</p>
                  </div>
                </div>
                <div className="parent-panel-card-stats">
                  <div className="parent-stat">
                    <span className="parent-stat-value good">{t("home.parent.panels.attendance.statPresent")}</span>
                    <span className="parent-stat-label">{t("home.parent.panels.attendance.present")}</span>
                  </div>
                  <div className="parent-stat">
                    <span className="parent-stat-value warn">{t("home.parent.panels.attendance.statLate")}</span>
                    <span className="parent-stat-label">{t("home.parent.panels.attendance.late")}</span>
                  </div>
                  <div className="parent-stat">
                    <span className="parent-stat-value good">{t("home.parent.panels.attendance.statAbsent")}</span>
                    <span className="parent-stat-label">{t("home.parent.panels.attendance.absent")}</span>
                  </div>
                </div>
                <div className="parent-telegram-banner">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>
                  <span>{t("home.parent.panels.attendance.telegramAlert")}</span>
                </div>
                <div className="parent-panel-card-list">
                  <div className="parent-list-row"><span>{t("home.parent.panels.attendance.monday")}</span><span className="badge badge-good">{t("home.parent.panels.attendance.present")}</span></div>
                  <div className="parent-list-row"><span>{t("home.parent.panels.attendance.tuesday")}</span><span className="badge badge-good">{t("home.parent.panels.attendance.present")}</span></div>
                  <div className="parent-list-row"><span>{t("home.parent.panels.attendance.wednesday")}</span><span className="badge badge-warn">{t("home.parent.panels.attendance.late")}</span></div>
                  <div className="parent-list-row"><span>{t("home.parent.panels.attendance.thursday")}</span><span className="badge badge-good">{t("home.parent.panels.attendance.present")}</span></div>
                  <div className="parent-list-row"><span>{t("home.parent.panels.attendance.friday")}</span><span className="badge badge-good">{t("home.parent.panels.attendance.present")}</span></div>
                </div>
              </div>

              <div className="parent-panel" role="tabpanel" id="parent-panel-reports" aria-labelledby="parent-tab-reports" data-parent-panel="reports" hidden>
                <div className="parent-panel-card-content">
                  <div className="parent-panel-card-icon" style={{ background: "rgba(139, 92, 246, 0.1)", color: "#8b5cf6", borderColor: "rgba(139, 92, 246, 0.25)" }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16v16H4z" /><path d="M8 8h8M8 12h8M8 16h4" /></svg>
                  </div>
                  <div className="parent-panel-card-text">
                    <h3>{t("home.parent.panels.reportCards.title")}</h3>
                    <p>{t("home.parent.panels.reportCards.desc")}</p>
                  </div>
                </div>
                <div className="parent-panel-card-highlight">
                  <div className="parent-highlight-top">
                    <span>{t("home.parent.panels.reportCards.average")}</span>
                    <span className="badge badge-good">{t("home.parent.panels.reportCards.rankBadge")}</span>
                  </div>
                  <strong>{t("home.parent.panels.reportCards.gpaValue")}</strong>
                  <small>{t("home.parent.panels.reportCards.released")}</small>
                </div>
                <div className="parent-panel-card-list">
                  <div className="parent-list-row"><span>{t("home.parent.panels.reportCards.mathematics")}</span><span className="badge badge-good">{t("home.parent.panels.reportCards.mathScore")}</span></div>
                  <div className="parent-list-row"><span>{t("home.parent.panels.reportCards.science")}</span><span className="badge badge-good">{t("home.parent.panels.reportCards.scienceScore")}</span></div>
                  <div className="parent-list-row"><span>{t("home.parent.panels.reportCards.english")}</span><span className="badge badge-good">{t("home.parent.panels.reportCards.englishScore")}</span></div>
                  <div className="parent-list-row"><span>{t("home.parent.panels.reportCards.amharic")}</span><span className="badge badge-good">{t("home.parent.panels.reportCards.amharicScore")}</span></div>
                  <div className="parent-list-row"><span>{t("home.parent.panels.reportCards.conductNote")}</span><span className="badge badge-good">{t("home.parent.panels.reportCards.conductValue")}</span></div>
                </div>
                <div className="parent-card-download-strip">
                  <button type="button" className="parent-download-btn" onClick={(e) => e.preventDefault()}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                    {t("home.parent.panels.reportCards.downloadPdf")}
                  </button>
                </div>
              </div>

              <div className="parent-panel" role="tabpanel" id="parent-panel-practice" aria-labelledby="parent-tab-practice" data-parent-panel="practice" hidden>
                <div className="parent-panel-card-content">
                  <div className="parent-panel-card-icon" style={{ background: "rgba(99, 102, 241, 0.1)", color: "#6366f1", borderColor: "rgba(99, 102, 241, 0.25)" }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" /></svg>
                  </div>
                  <div className="parent-panel-card-text">
                    <h3>{t("home.parent.panels.practice.title")}</h3>
                    <p>{t("home.parent.panels.practice.desc")}</p>
                  </div>
                </div>
                <div className="parent-chat-simulation">
                  <div className="chat-channel-bar">
                    <span className="chat-live-pulse" />
                    <span className="chat-channel-name">{t("home.parent.panels.practice.guardianLabel")}</span>
                    <span className="chat-verified-badge">{t("home.parent.badges.autonomous")}</span>
                  </div>

                  <div className="chat-message chat-incoming">
                    <div className="chat-bubble">
                      <p>{t("home.parent.panels.practice.guardianMsg")}</p>
                      <span className="chat-timestamp">08:14 AM</span>
                    </div>
                  </div>

                  <div className="chat-message chat-outgoing">
                    <div className="chat-avatar-ai">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                      </svg>
                    </div>
                    <div className="chat-bubble ai-bubble">
                      <div className="chat-ai-header">
                        <strong>{t("home.parent.panels.practice.aiLabel")}</strong>
                        <span className="ai-secure-pill">{t("home.parent.panels.practice.aiBadge")}</span>
                      </div>
                      <p>{t("home.parent.panels.practice.aiMsgPart1")}</p>
                      <p>{t("home.parent.panels.practice.aiMsgPart2")}</p>
                      <div className="chat-action-strip">
                        <button type="button" className="chat-telebirr-btn" onClick={(e) => e.preventDefault()}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                          {t("home.parent.panels.practice.actionBtn")}
                        </button>
                      </div>
                      <p className="chat-supplementary">{t("home.parent.panels.practice.aiMsgPart3")}</p>
                      <span className="chat-timestamp">08:35 PM • Verified Mastery</span>
                    </div>
                  </div>

                  <div className="chat-security-footer">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                    <span>{t("home.parent.panels.practice.verifiedNote")}</span>
                  </div>
                </div>
              </div>

              <div className="parent-panel" role="tabpanel" id="parent-panel-notices" aria-labelledby="parent-tab-notices" data-parent-panel="notices" hidden>
                <div className="parent-panel-card-content">
                  <div className="parent-panel-card-icon" style={{ background: "rgba(245, 158, 11, 0.1)", color: "#f59e0b", borderColor: "rgba(245, 158, 11, 0.25)" }}>
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
          <div className="pricing-all-inclusive-badge">
            <span className="pill-check">✓</span> {t("home.pricing.allFeaturesNotice")}
          </div>
          <div className="pricing-grid">
            <article className="pricing-card pricing-side-left" data-plan="core">
              <div className="plan-header">
                <p className="plan-name">{t("home.pricing.plans.core.name")}</p>
                <p className="plan-audience">{t("home.pricing.plans.core.audience")}</p>
                <p className="plan-students">{t("home.pricing.plans.core.students")}{t("home.pricing.plans.core.perStudent") ? <span className="student-rate"> ({t("home.pricing.plans.core.perStudent")})</span> : null}</p>
              </div>
              <div className="launch-price-box">
                <div className="price-meta">
                  <span className="renewal-price annual-only">300,000 ETB/year</span>
                  <span className="launch-badge" data-billing-badge>{t("home.pricing.plans.core.monthlyLabel")}</span>
                </div>
                <p className="launch-price" data-monthly-price="25,000 ETB/mo" data-annual-price="225,000 ETB/year">{t("home.pricing.plans.core.monthlyPrice")}</p>
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
                <p className="plan-students">{t("home.pricing.plans.standard.students")}{t("home.pricing.plans.standard.perStudent") ? <span className="student-rate"> ({t("home.pricing.plans.standard.perStudent")})</span> : null}</p>
              </div>
              <div className="launch-price-box">
                <div className="price-meta">
                  <span className="renewal-price annual-only">540,000 ETB/year</span>
                  <span className="launch-badge" data-billing-badge>{t("home.pricing.plans.standard.monthlyLabel")}</span>
                </div>
                <p className="launch-price" data-monthly-price="45,000 ETB/mo" data-annual-price="405,000 ETB/year">{t("home.pricing.plans.standard.monthlyPrice")}</p>
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
                <p className="plan-students">{t("home.pricing.plans.ultimate.students")}{t("home.pricing.plans.ultimate.perStudent") ? <span className="student-rate"> ({t("home.pricing.plans.ultimate.perStudent")})</span> : null}</p>
              </div>
              <div className="launch-price-box">
                <div className="price-meta">
                  <span className="renewal-price annual-only">840,000 ETB/year</span>
                  <span className="launch-badge" data-billing-badge>{t("home.pricing.plans.ultimate.monthlyLabel")}</span>
                </div>
                <p className="launch-price" data-monthly-price="70,000 ETB/mo" data-annual-price="630,000 ETB/year">{t("home.pricing.plans.ultimate.monthlyPrice")}</p>
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
          <div className="pricing-enterprise-banner" data-reveal>
            <div className="enterprise-banner-content">
              <div className="enterprise-badge-group">
                <span className="enterprise-badge">{t("home.pricing.enterprise.tag")}</span>
                <span className="enterprise-capacity">{t("home.pricing.enterprise.students")}</span>
              </div>
              <h3 className="enterprise-title">{t("home.pricing.enterprise.name")}</h3>
              <p className="enterprise-desc">{t("home.pricing.enterprise.desc")}</p>
              <ul className="enterprise-features">
                {t("home.pricing.enterprise.features").map((f, i) => (
                  <li key={i}>
                    <svg className="check-icon" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5" /></svg>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="enterprise-banner-cta">
              <div className="enterprise-price-box">
                <p className="enterprise-price">
                  {t("home.pricing.enterprise.priceDisplay")}
                </p>
                <span className="enterprise-price-sub">{t("home.pricing.enterprise.subtext")}</span>
              </div>
              <a className="pricing-btn enterprise-btn" href="/contact?type=enterprise">
                {t("home.pricing.contactSales")}
              </a>
            </div>
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
