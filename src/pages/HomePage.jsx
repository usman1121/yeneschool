import PageShell from "../components/PageShell.jsx";
import { useTranslation } from "../i18n/I18nContext.jsx";

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

  return (
    <PageShell activePage="home">
      <main id="top">
        <section className="hero tailark-hero" aria-labelledby="hero-title">
          <div className="hero-orbits" aria-hidden="true">
            <span /><span /><span />
          </div>
          <div className="hero-copy" data-reveal>
            <h1 id="hero-title">YeneSchool | School Management System in Ethiopia</h1>
            <p>
              YeneSchool is a modern school management platform that helps schools run
              daily operations, connect staff and families, and keep important decisions
              backed by clear, organized data.
            </p>
          </div>
          <div className="tailark-preview" data-reveal>
            <div className="preview-perspective" data-dashboard-frame>
              <div className="preview-skew">
                <img className="tailark-dashboard-img" src="./assets/admin.png" alt="YeneSchool admin dashboard preview" data-dashboard-image width={1920} height={1198} loading="eager" fetchPriority="high" decoding="async" />
              </div>
            </div>
            <div className="hero-dashboard-switcher" data-dashboard-slider aria-label="Dashboard previews">
              <div className="dashboard-slide-dots" role="tablist" aria-label="Choose dashboard preview">
                <button className="dashboard-dot is-active" type="button" data-dashboard-slide={0} aria-label="Show Admin dashboard" aria-selected="true" />
                <button className="dashboard-dot" type="button" data-dashboard-slide={1} aria-label="Show Teacher dashboard" aria-selected="false" />
                <button className="dashboard-dot" type="button" data-dashboard-slide={2} aria-label="Show Parent dashboard" aria-selected="false" />
                <button className="dashboard-dot" type="button" data-dashboard-slide={3} aria-label="Show Finance dashboard" aria-selected="false" />
                <button className="dashboard-dot" type="button" data-dashboard-slide={4} aria-label="Show Registrar dashboard" aria-selected="false" />
              </div>
            </div>
          </div>
        </section>
        <section className="school-signals-section" aria-label="School workflows covered by YeneSchool" data-reveal>
          <h2>Built around the daily work of real schools.</h2>
          <div className="school-signals">
            <span>Admissions</span>
            <span>Student records</span>
            <span>Attendance</span>
            <span>Marks</span>
            <span>Online examinations</span>
            <span>Report cards</span>
            <span>Parent portal</span>
            <span>Finance</span>
            <span>Announcements</span>
            <span>Teacher workspace</span>
            <span>Timetables</span>
            <span>School operations</span>
          </div>
        </section>
        <section className="section role-section" id="roles" aria-labelledby="roles-title" data-reveal>
          <div className="role-heading">
            <p className="eyebrow">Role-Based Workflows</p>
            <h2 id="roles-title">Every school team gets the workspace they actually need.</h2>
            <p>
              YeneSchool SMS separates school ownership, academic operations, registration, teaching,
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
            <a className="module-feature-card" href="/modules#attendance">
              <span className="module-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M9 11 12 14 22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg></span>
              <strong>Attendance</strong>
              <small>Session-based attendance with submitted records, offline sync payloads, teacher entry, parent views, and absence/late notifications.</small>
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
              <strong>Communication</strong>
              <small>Announcements, communication book, internal messaging, read tracking, notification preferences, push subscriptions, and school events.</small>
            </a>
            <a className="module-feature-card" href="/modules#automation-reporting">
              <span className="module-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M3 3v18h18" /><path d="M7 15l4-4 3 3 5-7" /></svg></span>
              <strong>Automation &amp; Reporting</strong>
              <small>Dashboards, teacher leaderboard, entry progress, parent presentation reports, data-quality checks, search, exports, and backups.</small>
            </a>
          </div>
          <div className="modules-preview-actions">
            <a className="secondary-btn" href="/modules">View all modules</a>
          </div>
        </section>
        <section className="section parent-section" id="parent-visibility" aria-labelledby="parent-title" data-reveal>
          <div className="parent-layout">
            <div className="parent-copy">
              <p className="eyebrow">Parent Visibility</p>
              <h2 id="parent-title">Parents track attendance, grades, fees, lessons, timetable, and discipline — all published by the school.</h2>
              <p>
                Each parent sees their linked children&rsquo;s submitted attendance, approved report cards, fee balances with receipts, lesson plans and assignments, weekly timetable, discipline records, announcements, and direct messaging with teachers — all scoped to the selected academic year.
              </p>
              <div className="parent-tabs" role="tablist" aria-label="Parent visibility views">
                <button className="parent-tab is-active" type="button" role="tab" aria-selected="true" aria-controls="parent-panel-attendance" id="parent-tab-attendance" data-parent-tab="attendance">Attendance</button>
                <button className="parent-tab" type="button" role="tab" aria-selected="false" aria-controls="parent-panel-reports" id="parent-tab-reports" data-parent-tab="reports">Report cards</button>
                <button className="parent-tab" type="button" role="tab" aria-selected="false" aria-controls="parent-panel-fees" id="parent-tab-fees" data-parent-tab="fees">Fee status</button>
                <button className="parent-tab" type="button" role="tab" aria-selected="false" aria-controls="parent-panel-notices" id="parent-tab-notices" data-parent-tab="notices">Notices</button>
              </div>
            </div>
            <div className="parent-preview">
              <article className="parent-panel is-active" role="tabpanel" id="parent-panel-attendance" aria-labelledby="parent-tab-attendance" data-parent-panel="attendance">
                <div className="parent-portal-preview">
                  <div className="portal-topbar">
                    <div>
                      <span>Parent Portal</span>
                      <strong>Selam Bekele</strong>
                    </div>
                    <b>2018 E.C.</b>
                  </div>
                  <div className="portal-student-strip">
                    <span className="avatar">{t("home.parent.panels.attendance.initials")}</span>
                    <div>
                      <strong>{t("home.parent.panels.attendance.grade")}</strong>
                      <small>{t("home.parent.panels.attendance.teacherPublished")}</small>
                    </div>
                    <span className="publish-badge">Submitted</span>
                  </div>
                  <div className="portal-summary-row">
                    <div><span>Present</span><strong>18</strong></div>
                    <div><span>Late</span><strong>1</strong></div>
                    <div><span>Absent</span><strong>0</strong></div>
                  </div>
                  <div className="portal-record-list" aria-label="Attendance week preview">
                    <div><span>Monday</span><b className="good">Present</b></div>
                    <div><span>Tuesday</span><b className="good">Present</b></div>
                    <div><span>Wednesday</span><b className="warn">Late arrival</b></div>
                    <div><span>Thursday</span><b className="good">Present</b></div>
                  </div>
                </div>
                <div className="parent-panel-copy">
                  <h3>Session-based attendance with offline support.</h3>
                  <p>Teachers mark Present, Absent, Late, or Excused per timetable slot. Parents see a monthly calendar with color-coded status, summary stats, and absence alerts when absences exceed 3 days.</p>
                </div>
              </article>
              <article className="parent-panel" role="tabpanel" id="parent-panel-reports" aria-labelledby="parent-tab-reports" data-parent-panel="reports" hidden>
                <div className="parent-portal-preview">
                  <div className="portal-topbar">
                    <div>
                      <span>Report Card</span>
                      <strong>Term 3 results</strong>
                    </div>
                    <b>Published</b>
                  </div>
                  <div className="portal-highlight">
                    <span>Average</span>
                    <strong>91%</strong>
                    <small>Released after admin approval</small>
                  </div>
                  <div className="portal-record-list">
                    <div><span>Mathematics</span><b className="good">A</b></div>
                    <div><span>English</span><b className="good">A-</b></div>
                    <div><span>Science</span><b className="good">A</b></div>
                    <div><span>Conduct note</span><b>Excellent</b></div>
                  </div>
                </div>
                <div className="parent-panel-copy">
                  <h3>Per-subject grades with GPA, ranking, and fee gating.</h3>
                  <p>Parents see assessment component scores (Quiz, Test, Mid, Final), letter grades, GPA, class rank, and teacher remarks. Report cards are locked if fees are unpaid.</p>
                </div>
              </article>
              <article className="parent-panel" role="tabpanel" id="parent-panel-fees" aria-labelledby="parent-tab-fees" data-parent-panel="fees" hidden>
                <div className="parent-portal-preview">
                  <div className="portal-topbar">
                    <div>
                      <span>Finance</span>
                      <strong>Payment status</strong>
                    </div>
                    <b>Plan active</b>
                  </div>
                  <div className="portal-highlight">
                    <span>Next installment</span>
                    <strong>Due in 8 days</strong>
                    <small>Receipt available after finance confirmation</small>
                  </div>
                  <div className="portal-record-list">
                    <div><span>Tuition</span><b className="good">Paid</b></div>
                    <div><span>Transport</span><b className="warn">Pending</b></div>
                    <div><span>Discount</span><b>Applied</b></div>
                    <div><span>Latest receipt</span><b>Available</b></div>
                  </div>
                </div>
                <div className="parent-panel-copy">
                  <h3>Installments, discounts, penalties, and receipt history.</h3>
                  <p>Parents see fee breakdown by type, payment progress bars, per-period due amounts with late penalties, applied discounts, and a full payment history with receipt numbers.</p>
                </div>
              </article>
              <article className="parent-panel" role="tabpanel" id="parent-panel-notices" aria-labelledby="parent-tab-notices" data-parent-panel="notices" hidden>
                <div className="parent-portal-preview">
                  <div className="portal-topbar">
                    <div>
                      <span>Notices</span>
                      <strong>School updates</strong>
                    </div>
                    <b>3 new</b>
                  </div>
                  <div className="portal-record-list portal-notice-list">
                    <div><span>Report card published</span><small>Term 3 is ready to view.</small></div>
                    <div><span>Attendance update</span><small>Late arrival recorded Wednesday.</small></div>
                    <div><span>School announcement</span><small>Parent meeting moved to Friday.</small></div>
                    <div><span>Communication book</span><small>Teacher reply received.</small></div>
                  </div>
                </div>
                <div className="parent-panel-copy">
                  <h3>School announcements, alerts, and teacher communication.</h3>
                  <p>Parents receive priority announcements, absence alerts, and report-card notifications. Direct messaging with teachers via conversation-based inbox with read receipts.</p>
                </div>
              </article>
            </div>
          </div>
        </section>
        <section className="section pricing-section" id="pricing" data-reveal>
          <div className="pricing-heading">
            <p className="pricing-eyebrow">{t("home.pricing.eyebrow")}</p>
            <h2>
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
                <p className="plan-name">CORE</p>
                <p className="plan-audience">Small Schools</p>
                <p className="plan-students">Up to 200 students</p>
              </div>
              <div className="launch-price-box">
                <div className="price-meta">
                  <span className="renewal-price annual-only">24,000 ETB/year</span>
                  <span className="launch-badge" data-billing-badge>Monthly</span>
                </div>
                <p className="launch-price" data-monthly-price="2,000 ETB/mo" data-annual-price="18,000 ETB/year">2,000 ETB/mo</p>
                <p className="first-year-note" data-monthly-note="Billed monthly" data-annual-note="25% yearly discount. Pay once for the year.">Billed monthly</p>
              </div>
              <div className="service-plans" aria-label="Service payment options">
                <div className="service-plan is-active" data-billing-option="monthly">
                  <div><strong>Monthly</strong><small>Billed monthly</small></div>
                  <span>2,000/mo</span>
                </div>
                <div className="service-plan">
                  <div><strong>6 Months</strong><small>10,800 ETB billed every 6 months</small></div>
                  <span>1,800/mo</span>
                  <em>Save 10%</em>
                </div>
                <div className="service-plan" data-billing-option="annual">
                  <div><strong>Yearly</strong><small>18,000 ETB billed yearly</small></div>
                  <span>1,500/mo</span>
                  <em>Save 25%</em>
                </div>
              </div>
              <ul className="plan-features">
                <li><svg className="check-icon" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5" /></svg><span>Student, parent, teacher, and user records</span></li>
                <li><svg className="check-icon" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5" /></svg><span>Classes, sections, subjects, and academic years</span></li>
                <li><svg className="check-icon" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5" /></svg><span>Attendance tracking and announcements</span></li>
                <li><svg className="check-icon" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5" /></svg><span>School calendar and basic reports</span></li>
                <li><svg className="check-icon" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5" /></svg><span>Secure login and role-based access</span></li>
              </ul>
              <hr className="plan-divider" />
              <a className="pricing-btn" href="/contact">Contact Sales</a>
            </article>
            <article className="pricing-card popular" data-plan="standard">
              <div className="popular-badge">
                <svg className="star-icon" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                Most Popular
              </div>
              <div className="plan-header">
                <p className="plan-name">STANDARD</p>
                <p className="plan-audience">Growing Schools</p>
                <p className="plan-students">Up to 2,000 students</p>
              </div>
              <div className="launch-price-box">
                <div className="price-meta">
                  <span className="renewal-price annual-only">60,000 ETB/year</span>
                  <span className="launch-badge" data-billing-badge>Monthly</span>
                </div>
                <p className="launch-price" data-monthly-price="5,000 ETB/mo" data-annual-price="45,000 ETB/year">5,000 ETB/mo</p>
                <p className="first-year-note" data-monthly-note="Billed monthly" data-annual-note="25% yearly discount. Pay once for the year.">Billed monthly</p>
              </div>
              <div className="service-plans" aria-label="Service payment options">
                <div className="service-plan is-active" data-billing-option="monthly">
                  <div><strong>Monthly</strong><small>Billed monthly</small></div>
                  <span>5,000/mo</span>
                </div>
                <div className="service-plan">
                  <div><strong>6 Months</strong><small>27,000 ETB billed every 6 months</small></div>
                  <span>4,500/mo</span>
                  <em>Save 10%</em>
                </div>
                <div className="service-plan" data-billing-option="annual">
                  <div><strong>Yearly</strong><small>45,000 ETB billed yearly</small></div>
                  <span>3,750/mo</span>
                  <em>Save 25%</em>
                </div>
              </div>
              <ul className="plan-features">
                <li><svg className="check-icon" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5" /></svg><span>Everything in CORE</span></li>
                <li><svg className="check-icon" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5" /></svg><span>Marks, exams, grading, and report cards</span></li>
                <li><svg className="check-icon" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5" /></svg><span>Finance, receipts, balances, and parent fee views</span></li>
                <li><svg className="check-icon" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5" /></svg><span>Enrollment approvals and credential generation</span></li>
                <li><svg className="check-icon" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5" /></svg><span>Messaging, lessons, discipline, and parent portal</span></li>
              </ul>
              <hr className="plan-divider" />
              <a className="pricing-btn primary" href="/contact">Contact Sales</a>
            </article>
            <article className="pricing-card pricing-side-right" data-plan="ultimate">
              <div className="plan-header">
                <p className="plan-name">ULTIMATE</p>
                <p className="plan-audience">Large Schools</p>
                <p className="plan-students">Unlimited students</p>
              </div>
              <div className="launch-price-box">
                <div className="price-meta">
                  <span className="renewal-price annual-only">120,000 ETB/year</span>
                  <span className="launch-badge" data-billing-badge>Monthly</span>
                </div>
                <p className="launch-price" data-monthly-price="10,000 ETB/mo" data-annual-price="90,000 ETB/year">10,000 ETB/mo</p>
                <p className="first-year-note" data-monthly-note="Billed monthly" data-annual-note="25% yearly discount. Pay once for the year.">Billed monthly</p>
              </div>
              <div className="service-plans" aria-label="Service payment options">
                <div className="service-plan is-active" data-billing-option="monthly">
                  <div><strong>Monthly</strong><small>Billed monthly</small></div>
                  <span>10,000/mo</span>
                </div>
                <div className="service-plan">
                  <div><strong>6 Months</strong><small>54,000 ETB billed every 6 months</small></div>
                  <span>9,000/mo</span>
                  <em>Save 10%</em>
                </div>
                <div className="service-plan" data-billing-option="annual">
                  <div><strong>Yearly</strong><small>90,000 ETB billed yearly</small></div>
                  <span>7,500/mo</span>
                  <em>Save 25%</em>
                </div>
              </div>
              <ul className="plan-features">
                <li><svg className="check-icon" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5" /></svg><span>Everything in STANDARD</span></li>
                <li><svg className="check-icon" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5" /></svg><span>Exam seating, rankings, promotion, and ID cards</span></li>
                <li><svg className="check-icon" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5" /></svg><span>Auto class and section placement</span></li>
                <li><svg className="check-icon" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5" /></svg><span>Advanced analytics, exports, and bulk operations</span></li>
                <li><svg className="check-icon" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5" /></svg><span>Siren schedules, custom branding, and backups</span></li>
              </ul>
              <hr className="plan-divider" />
              <a className="pricing-btn" href="/contact">Contact Sales</a>
            </article>
          </div>
        </section>
      </main>
    </PageShell>
    
  );
}
