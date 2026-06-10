import PageShell from "../components/PageShell.jsx";

export default function ModulesPage() {
  return (
    <PageShell activePage="modules">
      <main id="top" className="modules-page">
        <section className="modules-hero" aria-labelledby="modules-page-title" data-reveal>
          <div className="modules-hero-copy">
            <span className="section-kicker">All Modules</span>
            <h1 id="modules-page-title">A complete school system, organized by real school work.</h1>
            <p>
              YeneSchool includes the common modules schools expect, plus standout features for offline work,
              Ethiopian calendar support, automation, analytics, and local language needs.
            </p>
          </div>
          <nav className="modules-jump-nav" aria-label="Module categories">
            <a href="#academic-management">Academics</a>
            <a href="#attendance">Attendance</a>
            <a href="#online-examinations">Online Exams</a>
            <a href="#finance">Finance</a>
            <a href="#automation-reporting">Reporting</a>
            <a href="#user-portals">Portals</a>
          </nav>
          <div className="modules-fact-grid" aria-label="YeneSchool implementation summary">
            <article>
              <strong>470</strong>
              <span>declared backend endpoints across the SMS API catalog.</span>
            </article>
            <article>
              <strong>8 roles</strong>
              <span>super admin, admin, IT manager, registrar, teacher, student, parent, and finance workspaces.</span>
            </article>
            <article>
              <strong>16 domains</strong>
              <span>from admissions and academics to online examinations, finance, reporting, siren operations, and data quality.</span>
            </article>
            <article>
              <strong>Offline-ready</strong>
              <span>attendance and sync endpoints support schools when connectivity is unreliable.</span>
            </article>
          </div>
        </section>
        <section className="modules-directory section" aria-labelledby="module-checklist-title" data-reveal>
          <div className="modules-directory-heading">
            <div>
              <span className="section-kicker">Module Checklist</span>
              <h2 id="module-checklist-title">What each part of the system helps your school manage.</h2>
            </div>
            <a className="secondary-btn" href="/">See pricing</a>
          </div>
          <div className="modules-directory-grid">
            <article className="module-detail-card" id="academic-management">
              <span className="module-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 19.5V5a2 2 0 0 1 2-2h13v18H6a2 2 0 0 1-2-1.5Z" /><path d="M8 7h7M8 11h6" /></svg></span>
              <h3>Academic Management</h3>
              <p>Controls the school structure that every other workflow depends on, including Ethiopian academic periods and school grade-system settings.</p>
              <div className="module-card-meta"><span>Primary roles</span><strong>Admin, IT Manager</strong></div>
              <ul><li>Academic years, terms, quarters, semesters, and current-period selection</li><li>Grade-system setup for Grade 1-8 or Grade 1-12 schools</li><li>Classes, sections, capacity syncing, and homeroom teachers</li><li>Subjects, class-subject links, and teacher subject assignments</li><li>Timetable slots, period times, and school calendar records</li><li>Feeds attendance, grading, report cards, promotion, and exam seating</li></ul>
            </article>
            <article className="module-detail-card" id="student-management">
              <span className="module-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-8 0v2" /><circle cx={12} cy={7} r={4} /><path d="M20 8v6M23 11h-6" /></svg></span>
              <h3>Student Management</h3>
              <p>Manages the full student lifecycle from admission request to active enrollment, credentials, documents, and yearly movement.</p>
              <div className="module-card-meta"><span>Primary roles</span><strong>Admin, Registrar</strong></div>
              <ul><li>Enrollment requests with approval, rejection, waitlist, and credential generation</li><li>Student profile records with parent and guardian relationships</li><li>Class, section, roll number, stream, and academic-year placement</li><li>Bulk upload for students and users with generated credential exports</li><li>ID card generation and document records tied to student profiles</li><li>Promotion history, retained/promoted status, and transfer-ready records</li></ul>
            </article>
            <article className="module-detail-card" id="attendance">
              <span className="module-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M9 11 12 14 22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg></span>
              <h3>Attendance</h3>
              <p>Session-based attendance built for teachers, admins, parents, and unreliable connectivity.</p>
              <div className="module-card-meta"><span>Primary roles</span><strong>Teacher, Admin, Parent</strong></div>
              <ul><li>Teacher attendance entry by class, section, date, and period context</li><li>Attendance sessions with submitted status and per-student records</li><li>Offline attendance capture and sync endpoints for local-first workflows</li><li>Admin attendance overview, missing-session follow-up, and reports</li><li>Parent and student attendance pages scoped to the selected academic year</li><li>Absence and late notification flow for parent-visible updates</li></ul>
            </article>
            <article className="module-detail-card" id="marks-report-cards">
              <span className="module-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 4h16v16H4z" /><path d="M8 8h8M8 12h8M8 16h4" /></svg></span>
              <h3>Marks &amp; Report Cards</h3>
              <p>Connects teacher score entry, assessment setup, publishing readiness, report cards, certificates, and year-end promotion.</p>
              <div className="module-card-meta"><span>Primary roles</span><strong>Admin, Teacher, Parent, Student</strong></div>
              <ul><li>Assessment setup, assessment subjects, weights, score status, and grading scales</li><li>Teacher marks entry with admin assessment and entry-progress visibility</li><li>Exam results, rankings, publish-results workflow, and report-card readiness checks</li><li>Bulk report-card generation, publish summary, parent/student published views</li><li>Certificate template, watermark upload, single PDF, and bulk ZIP downloads</li><li>Promotion candidates with published report-card and eligibility checks</li></ul>
            </article>
            <article className="module-detail-card" id="finance">
              <span className="module-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><rect x={2} y={5} width={20} height={14} rx={2} /><path d="M2 10h20M7 15h.01M11 15h2" /></svg></span>
              <h3>Finance</h3>
              <p>Separates fee setup, assigned student balances, receipts, discounts, overdue follow-up, and parent-facing fee visibility.</p>
              <div className="module-card-meta"><span>Primary roles</span><strong>Finance, Parent</strong></div>
              <ul><li>Fee structures by academic year, category, grade range, and installment plan</li><li>Student fee assignment, outstanding balances, payment status, and receipts</li><li>Discount policies, reversals, audit logs, and finance summaries</li><li>Overdue reports, total overdue counts, and export-friendly report pages</li><li>Parent fee views connected to published student finance records</li><li>Payroll page and finance-only navigation for restricted money workflows</li></ul>
            </article>
            <article className="module-detail-card" id="communication">
              <span className="module-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z" /></svg></span>
              <h3>Communication</h3>
              <p>Combines public announcements, school communication books, internal messaging, notifications, and events.</p>
              <div className="module-card-meta"><span>Primary roles</span><strong>Admin, Teacher, Parent, Student</strong></div>
              <ul><li>Announcements with active counts, audience filtering, and notification creation</li><li>Communication book records with categories, status, and reply threads</li><li>Internal chat rooms, conversations, messages, participants, and read tracking</li><li>Notification preferences, push subscriptions, and role-targeted notifications</li><li>School events and calendar-visible operational updates</li><li>Dedicated messages, announcements, and communications pages in the dashboard</li></ul>
            </article>
            <article className="module-detail-card" id="local-school-support">
              <span className="module-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="m5 8 6 6" /><path d="m4 14 6-6 2-3" /><path d="M2 5h12" /><path d="M7 2h1" /><path d="m22 22-5-10-5 10" /><path d="M14 18h6" /></svg></span>
              <h3>Local School Support</h3>
              <p>Handles the local constraints that generic school systems usually miss: languages, calendars, grade models, and Ethiopian academic periods.</p>
              <div className="module-card-meta"><span>Primary roles</span><strong>Admin, IT Manager</strong></div>
              <ul><li>English, Amharic, Arabic, Oromo, and Somali UI language support</li><li>Ethiopian and Gregorian calendar workflows for school operations</li><li>Grade 1-8 and Grade 1-12 mode driven by school settings</li><li>Local academic periods, term labels, and current academic-year behavior</li><li>Grade 6 and Grade 8 national-exam style workflows for primary/middle schools</li><li>School-specific settings for logos, profile, branding, and operational defaults</li></ul>
            </article>
            <article className="module-detail-card" id="automation-reporting">
              <span className="module-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M3 3v18h18" /><path d="M7 15l4-4 3 3 5-7" /></svg></span>
              <h3>Automation &amp; Reporting</h3>
              <p>Turns operational data into dashboards, board-ready reports, and follow-up lists rather than disconnected exports.</p>
              <div className="module-card-meta"><span>Primary roles</span><strong>Admin, Finance, IT Manager</strong></div>
              <ul><li>Admin, teacher, parent, student, registrar, finance, and super-admin dashboards</li><li>Teacher leaderboard using attendance, grading timeliness, lessons, and related metrics</li><li>Parent presentation report with overview, class comparison, subject comparison, and insights</li><li>School data health checks for consistency and maintenance follow-up</li><li>Finance reports, overdue summaries, academic reports, and attendance trends</li><li>Backups, exports, search-like raw queries, and audit-friendly operational records</li></ul>
            </article>
            <article className="module-detail-card" id="operations">
              <span className="module-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 7h18s-3 0-3-7" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg></span>
              <h3>Operations</h3>
              <p>Supports the daily routines that keep the school moving: bells, templates, imports, device hooks, and operational alerts.</p>
              <div className="module-card-meta"><span>Primary roles</span><strong>Admin, IT Manager</strong></div>
              <ul><li>Siren schedules, siren events, manual ring action, and browser audio fallback</li><li>Hardware bell configuration and webhook-friendly siren controller routes</li><li>Dynamic timetable sirens scoped to the assigned teacher for the current period</li><li>Period-time setup and timetable-driven start/end-of-class alerts</li><li>Document templates for school records and generated outputs</li><li>Bulk import/export and operational notifications across school workflows</li></ul>
            </article>
            <article className="module-detail-card" id="admissions-enrollment">
              <span className="module-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" /><path d="M14 2v6h6" /><path d="M9 15l2 2 4-4" /></svg></span>
              <h3>Admissions &amp; Enrollment</h3>
              <p>Moves applicants from public enrollment into active student, parent, class, and credential records.</p>
              <div className="module-card-meta"><span>Primary roles</span><strong>Registrar, Admin</strong></div>
              <ul><li>Public school pages and enrollment request forms for applicants</li><li>Registrar/admin review with approve, reject, and waitlist flows</li><li>Encrypted enrollment tokens and configured frontend enrollment URLs</li><li>Credential generation for student and parent accounts after approval</li><li>Class placement, section placement, roll numbers, and parent linkage</li><li>Admission details including nationality, documents, guardians, and profile fields</li></ul>
            </article>
            <article className="module-detail-card" id="exams">
              <span className="module-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M9 3h6l1 3h4v15H4V6h4Z" /><path d="M9 11h6M9 15h4" /></svg></span>
              <h3>Exams</h3>
              <p>Covers formal school exams, seating logistics, result entry, publishing readiness, and exam-related registrar workflows.</p>
              <div className="module-card-meta"><span>Primary roles</span><strong>Admin, Teacher, Student, Registrar</strong></div>
              <ul><li>Assessment and exam setup, result entry, publish-results flow, rankings, and entry progress</li><li>Exam seating plans, section assignments, exam-section students, and seating modes</li><li>Current-period exam visibility for teachers, students, and parents</li><li>Publishing workflow that validates completion before releasing results</li><li>Registrar national exams and school-leaving workflows where enabled by grade system</li><li>Report-card readiness checks connected to formal exam and assessment data</li></ul>
            </article>
            <article className="module-detail-card" id="online-examinations">
              <span className="module-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><rect x={3} y={4} width={18} height={12} rx={2} /><path d="M8 20h8M12 16v4M8 9h5M8 12h3M16 9l1.5 1.5L20 8" /></svg></span>
              <h3>Online Examinations</h3>
              <p>Lets teachers create controlled online exams while students complete timed attempts with saved answers and result feedback.</p>
              <div className="module-card-meta"><span>Primary roles</span><strong>Teacher, Student, Admin</strong></div>
              <ul><li>Teacher-created online exams tied to assigned class, section, subject, grade, and stream</li><li>Draft, ready, active, archived, duration, pass mark, access-code, and shuffle-question controls</li><li>Question banks with multiple choice, true/false, and short-answer support</li><li>Student online examination list filtered by grade and stream with required access code</li><li>Timed attempts with local draft recovery, autosave, flagged questions, submit, and expiry handling</li><li>Automatic scoring, correct/wrong/skipped counts, percentage, pass-mark result, and submitted-at review</li></ul>
            </article>
            <article className="module-detail-card" id="user-portals">
              <span className="module-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 5h16v14H4z" /><path d="M8 9h4M8 13h8M16 9h.01" /></svg></span>
              <h3>User Portals</h3>
              <p>Gives each role a focused workspace so users only see the work they are responsible for.</p>
              <div className="module-card-meta"><span>Primary roles</span><strong>All roles</strong></div>
              <ul><li>Super admin portal for schools, admins, subscriptions, backups, and platform settings</li><li>Admin portal for academics, enrollment, reports, assessments, siren, people, and operations</li><li>Teacher portal for classes, attendance, lessons, timetable, grading, and online exams</li><li>Parent portal for children, attendance, grades, fees, lessons, discipline, and timetable</li><li>Student portal for timetable, attendance, lessons, grades, exams, and practice exams</li><li>Registrar, finance, and IT manager workspaces with narrower operational responsibilities</li></ul>
            </article>
            <article className="module-detail-card" id="staff-directory">
              <span className="module-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M3 21v-2a4 4 0 0 1 4-4h4" /><circle cx={9} cy={7} r={4} /><path d="M17 11l2 2 4-4" /><path d="M17 19h5" /></svg></span>
              <h3>Staff Directory &amp; Responsibilities</h3>
              <p>Connects people records to responsibilities, assignments, credentials, departments, and accountability reporting.</p>
              <div className="module-card-meta"><span>Primary roles</span><strong>Admin, IT Manager</strong></div>
              <ul><li>Teacher profiles, staff records, departments, and employee documents</li><li>Teacher subject assignments and class-subject responsibility tracking</li><li>Generated credentials, pending credential queue, password reset support, and CSV exports</li><li>Teacher class pages, assigned students, timetable, lessons, attendance, and grading</li><li>Performance visibility through teacher leaderboard and dashboard metrics</li><li>User management through bulk upload, role assignment, and profile management</li></ul>
            </article>
            <article className="module-detail-card" id="security-permissions">
              <span className="module-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="m9 12 2 2 4-4" /></svg></span>
              <h3>Security &amp; Permissions</h3>
              <p>Protects tenant data with role permissions, school scoping, subscription feature gates, rate limits, and maintenance controls.</p>
              <div className="module-card-meta"><span>Primary roles</span><strong>Super Admin, IT Manager</strong></div>
              <ul><li>JWT login with cookie or bearer token support, password reset, and password change flows</li><li>Role guards for SUPER_ADMIN, ADMIN, IT_MANAGER, REGISTRAR, TEACHER, STUDENT, PARENT, and FINANCE</li><li>Permission overrides through role permissions and user-specific permissions</li><li>School-level tenant isolation through request body, params, and query schoolId checks</li><li>Subscription feature checks for finance, parent portal, and plan-gated capabilities</li><li>Global rate limiting and platform maintenance mode for non-super-admin traffic</li></ul>
            </article>
            <article className="module-detail-card" id="search-data-quality">
              <span className="module-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx={11} cy={11} r={7} /><path d="m21 21-4.3-4.3" /><path d="M8 11h6" /></svg></span>
              <h3>Search &amp; Data Quality</h3>
              <p>Helps staff find records quickly and keep operational data clean enough for reports, exports, and audits.</p>
              <div className="module-card-meta"><span>Primary roles</span><strong>Admin, IT Manager</strong></div>
              <ul><li>Cross-entity search endpoints for fast record lookup</li><li>Data consistency report page for school data health review</li><li>Duplicate and missing-record style checks for operational maintenance</li><li>Audit-friendly finance logs, grade change logs, credentials, and notification records</li><li>Export-ready information from reports, credentials, finance, certificates, and bulk operations</li><li>Backups and platform-level operational support for safer maintenance</li></ul>
            </article>
          </div>
        </section>
      </main>
    </PageShell>
    
  );
}
