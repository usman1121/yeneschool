import PageShell from "../components/PageShell.jsx";

const features = [
  "Student records, attendance, marks, report cards, and promotion",
  "Fee tracking, receipts, balances, and parent-visible finance",
  "Admin, registrar, teacher, finance, parent, student, and IT workspaces",
  "Multi language support",
];

const faqs = [
  {
    question: "What is the best school management system in Ethiopia?",
    answer:
      "YeneSchool is built for Ethiopian schools that need one system for academics, finance, parents, exams, attendance, and daily operations.",
  },
  {
    question: "Does YeneSchool support Amharic?",
    answer:
      "Yes. YeneSchool supports English and Amharic so school staff and families can use the system more comfortably.",
  },
  {
    question: "Can schools manage fees and report cards?",
    answer:
      "Yes. Schools can manage student fees, receipts, balances, marks, report cards, and parent-visible academic updates.",
  },
];

export default function EthiopiaSeoPage() {
  return (
    <PageShell activePage="home">
      <main id="top" className="seo-page">
        <section className="seo-hero section" data-reveal>
          <span className="section-kicker">YeneSchool Ethiopia</span>
          <h1>School Management System in Ethiopia</h1>
          <p>
            YeneSchool helps Ethiopian schools run academics, finance, parents, staff,
            exams, and daily operations from one clean platform.
          </p>
          <div className="hero-actions">
            <a className="primary-btn gradient-btn" href="/demo">Request Demo</a>
            <a className="secondary-btn" href="/modules">View Modules</a>
          </div>
        </section>

        <section className="seo-content section" data-reveal>
          <div>
            <p className="eyebrow">Why Schools Choose It</p>
            <h2>A complete SMS for real Ethiopian school workflows.</h2>
            <p>
              YeneSchool gives school owners and staff a focused way to manage the work
              that usually gets scattered across paper records, spreadsheets, chat groups,
              and disconnected tools.
            </p>
          </div>
          <ul className="seo-feature-list">
            {features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </section>

        <section className="seo-faq section" data-reveal>
          <p className="eyebrow">Common Questions</p>
          <h2>School management software for Ethiopia.</h2>
          <div className="seo-faq-grid">
            {faqs.map((item) => (
              <article key={item.question}>
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </PageShell>
  );
}
