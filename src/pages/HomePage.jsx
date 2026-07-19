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
            <div className="preview-perspective" data-dashboard-frame>
              <div className="preview-skew">
                <img className="tailark-dashboard-img" src="./assets/admin.webp" srcSet="./assets/admin-1280.webp 1280w, ./assets/admin-960.webp 960w, ./assets/admin-640.webp 640w" sizes="(max-width: 768px) 100vw, 1281px" alt="YeneSchool admin dashboard preview" data-dashboard-image width={1920} height={1198} loading="eager" fetchPriority="high" decoding="async" />
              </div>
            </div>
            <div className="hero-dashboard-switcher" data-dashboard-slider aria-label="Dashboard previews">
              <button className="dashboard-btn dashboard-prev" type="button" data-dashboard-prev aria-label="Previous dashboard">
                <svg viewBox="0 0 24 24" aria-hidden="true" width="18" height="18">
                  <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div className="dashboard-slide-dots" role="tablist" aria-label="Choose dashboard preview">
                <button className="dashboard-dot is-active" type="button" role="tab" data-dashboard-slide={0} aria-label="Show Admin dashboard" aria-selected="true" />
                <button className="dashboard-dot" type="button" role="tab" data-dashboard-slide={1} aria-label="Show Teacher dashboard" aria-selected="false" />
                <button className="dashboard-dot" type="button" role="tab" data-dashboard-slide={2} aria-label="Show Parent dashboard" aria-selected="false" />
                <button className="dashboard-dot" type="button" role="tab" data-dashboard-slide={3} aria-label="Show Finance dashboard" aria-selected="false" />
                <button className="dashboard-dot" type="button" role="tab" data-dashboard-slide={4} aria-label="Show Registrar dashboard" aria-selected="false" />
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
          <h2>Built around the daily work of real schools.</h2>
          <div className="school-signals">
            <span>Admissions</span>
            <span>Student Information System</span>
            <span>Attendance Management</span>
            <span>Grade Management</span>
            <span>Online examinations</span>
            <span>Report cards</span>
            <span>Parent Portal</span>
            <span>Fee Management</span>
            <span>Announcements</span>
            <span>Teacher workspace</span>
            <span>Timetables</span>
            <span>School operations</span>
            <span>AI Assistant</span>
            <span>AI Integration</span>
          </div>
        </section>
        <section className="section role-section" id="roles" aria-labelledby="roles-title" data-reveal>
          <div className="role-heading">
            <p className="eyebrow">Role-Based Workflows</p>
            <h2 id="roles-title">Every school team gets the workspace they actually need.</h2>
            <p>
              YeneSchool is a complete School ERP and Student Information System (SIS) built for
              Ethiopian schools. It separates school ownership, academic operations, registration, teaching,
              finance, parent follow-up, student self-service, and IT support into role-specific dashboards.
              Each user sees the records, actions, alerts, and reports they are responsible for.
            </p>
          </div>
          <div className="role-bento">
            <article className="role-card">
              <span className="role-icon">AD</span>
              <h3>Admin</h3>
              <p>Runs academics, classes, sections, subjects, staff accounts, announcements, assessment setup, report publishing, promotion readiness, siren schedules, and school configuration.</p>
            </article>
            <article className="role-card">
              <span className="role-icon">TE</span>
              <h3>Teacher</h3>
              <p>Works from assigned classes and subjects to submit attendance, lessons, assignments, grade entries, online exams, timetable activity, and class communication.</p>
            </article>
            <article className="role-card">
              <span className="role-icon">PA</span>
              <h3>Parent</h3>
              <p>Follows each linked child through published attendance, grades, report cards, fee status, assignments, timetable, discipline notes, notices, and communication-book updates.</p>
            </article>
            <article className="role-card">
              <span className="role-icon">RG</span>
              <h3>Registrar</h3>
              <p>Handles enrollment requests, student records, parent links, class placement, registrar dashboards, promotion movement, national-exam candidates, and school-leaving workflows.</p>
            </article>
            <article className="role-card">
              <span className="role-icon">FI</span>
              <h3>Finance</h3>
              <p>Owns fee structures, installment plans, student balances, discounts, receipts, overdue follow-up, payroll access, finance summaries, and parent-visible fee records.</p>
            </article>
            <article className="role-card">
              <span className="role-icon">ST</span>
              <h3>Student</h3>
              <p>Checks timetable, attendance, lessons, assignments, grades, formal exams, online examination attempts, announcements, and published academic progress.</p>
            </article>
            <article className="role-card">
              <span className="role-icon">IT</span>
              <h3>IT Manager</h3>
              <p>Supports academic setup, timetable visibility, attendance/report monitoring, user access help, operational settings, backups, and data-quality review without becoming the school owner.</p>
            </article>
          </div>
        </section>
        <section className="section modules-preview-section" id="modules" aria-labelledby="modules-title" data-reveal>
          <div className="section-heading modules-preview-heading">
            <span className="section-kicker">Core Modules</span>
            <h2 id="modules-title">The modules schools actually use.</h2>
            <p>
              A quick look at the connected workflows inside YeneSchool. The full modules page breaks each area down by what the school can manage.
            </p>
          </div>
          <div className="modules-preview-grid" aria-label="YeneSchool module highlights">
            <a className="module-feature-card" href="/modules#academic-management">
              <span className="module-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 19.5V5a2 2 0 0 1 2-2h13v18H6a2 2 0 0 1-2-1.5Z" /><path d="M8 7h7M8 11h6" /></svg></span>
              <strong>Academic Management</strong>
              <small>Academic years, terms, Grade 1-8 or Grade 1-12 settings, classes, sections, subjects, assignments, and period times.</small>
            </a>
            <a className="module-feature-card" href="/modules#student-management">
              <span className="module-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-8 0v2" /><circle cx={12} cy={7} r={4} /><path d="M20 8v6M23 11h-6" /></svg></span>
              <strong>Student Records</strong>
              <small>Admissions, registrar review, parent links, class placement, bulk import, credentials, ID cards, and promotion history.</small>
            </a>
            <a className="module-feature-card" href="/modules#marks-report-cards">
              <span className="module-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 4h16v16H4z" /><path d="M8 8h8M8 12h8M8 16h4" /></svg></span>
              <strong>Marks &amp; Report Cards</strong>
              <small>Assessments, score entry, exam results, publishing readiness, certificates, parent-visible results, and promotion checks.</small>
            </a>
            <a className="module-feature-card" href="/modules#online-examinations">
              <span className="module-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><rect x={3} y={4} width={18} height={12} rx={2} /><path d="M8 20h8M12 16v4M8 9h5M8 12h3M16 9l1.5 1.5L20 8" /></svg></span>
              <strong>Online Examinations</strong>
              <small>Teacher-created exams with access codes, timers, question banks, autosaved answers, submissions, scoring, and student result review.</small>
            </a>
            <a className="module-feature-card" href="/modules#local-school-support">
              <span className="module-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="m5 8 6 6" /><path d="m4 14 6-6 2-3" /><path d="M2 5h12" /><path d="M7 2h1" /><path d="m22 22-5-10-5 10" /><path d="M14 18h6" /></svg></span>
              <strong>Multi-language Support</strong>
              <small>Support for 5 languages across local school workflows, calendars, labels, and parent-facing communication.</small>
            </a>
            <a className="module-feature-card" href="/modules#communication">
              <span className="module-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z" /></svg></span>
              <strong>{t("home.modules.cards.communication.title")}</strong>
              <small>{t("home.modules.cards.communication.desc")}</small>
            </a>
            <a className="module-feature-card" href="/modules#automation-reporting">
              <span className="module-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M3 3v18h18" /><path d="M7 15l4-4 3 3 5-7" /></svg></span>
              <strong>Automation &amp; Reporting</strong>
              <small>Dashboards, teacher leaderboard, entry progress, parent presentation reports, data-quality checks, search, exports, and backups.</small>
            </a>
            <a className="module-feature-card" href="/modules#ai">
              <span className="module-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 1 10 10c0 5-4 8-10 10C6 20 2 17 2 12A10 10 0 0 1 12 2Z" /><path d="M8 12h8M12 8v8" /></svg></span>
              <strong>AI-Powered Intelligence</strong>
              <small>AI assistant chatbot, smart report generation, predictive recommendations, automated alerts, and AI-driven school assessment. Built-in AI integration connects every workflow to intelligent automation.</small>
            </a>
          </div>
          <div className="modules-preview-actions">
            <a className="pricing-btn" style={{ width: 'auto', margin: 0 }} href="/modules">View all modules</a>
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
                  <div className="parent-list-row"><span>{t("home.parent.panels.reportCards.conductNote")}</span><span>Excellent</span></div>
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
                  <div className="parent-list-row"><span>{t("home.parent.panels.fees.tuition")}</span><span className="badge badge-good">Paid</span></div>
                  <div className="parent-list-row"><span>{t("home.parent.panels.fees.transport")}</span><span className="badge badge-warn">Pending</span></div>
                  <div className="parent-list-row"><span>{t("home.parent.panels.fees.discount")}</span><span className="badge">Applied</span></div>
                  <div className="parent-list-row"><span>{t("home.parent.panels.fees.latestReceipt")}</span><span className="badge">Available</span></div>
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
