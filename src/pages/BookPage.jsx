import PageShell from "../components/PageShell.jsx";

export default function BookPage() {
  return (
    <PageShell activePage="book">
      <main id="top" className="book-page">
        <section className="book-hero section" aria-labelledby="book-title" data-reveal>
          <div className="book-hero-copy">
            <span className="section-kicker">Book a Demo</span>
            <h1 id="book-title">See the school system before you decide.</h1>
            <p>Get a guided walkthrough of the dashboards your school will actually use: owner, registrar, teacher, parent, exams, attendance, and finance.</p>
          </div>
          <div className="book-showcase">
            <div className="book-demo-brief" aria-label="Demo call details">
              <article><strong>30-45 min</strong><span>Guided walkthrough</span></article>
              <article><strong>Role based</strong><span>Owner, registrar, teacher, finance, and parent flows</span></article>
              <article><strong>Next step</strong><span>Setup order, module fit, and pricing direction</span></article>
            </div>
            <aside className="book-form-shell" aria-label="Book a YeneSchool demo">
              <div className="book-form-heading">
                <p>Request Demo</p>
                <h2>Choose what we should show you.</h2>
                <span>We reply with the next available time.</span>
              </div>
              <form className="booking-form" data-contact-form>
                <div className="booking-grid">
                  <label className="booking-field"><span>Name</span><input type="text" name="name" autoComplete="name" placeholder="Your name" required /></label>
                  <label className="booking-field"><span>School</span><input type="text" name="school" autoComplete="organization" placeholder="School name" required /></label>
                  <label className="booking-field"><span>Email</span><input type="email" name="email" autoComplete="email" placeholder="you@school.com" required /></label>
                  <label className="booking-field"><span>Phone</span><input type="tel" name="phone" autoComplete="tel" placeholder="+251..." /></label>
                  <label className="booking-field"><span>Preferred date</span><input type="date" name="demo_date" required /></label>
                </div>
                <label className="booking-field">
                  <span>Demo focus</span>
                  <select name="message_focus" required>
                    <option value="">Select focus area</option>
                    <option value="Full school walkthrough">Full school walkthrough</option>
                    <option value="Admissions and academics">Admissions and academics</option>
                    <option value="Report cards and exams">Report cards and exams</option>
                    <option value="Parent portal and communication">Parent portal and communication</option>
                    <option value="Pricing and implementation">Pricing and implementation</option>
                  </select>
                </label>
                <input type="hidden" name="topic" defaultValue="Book a demo" />
                <label className="booking-field">
                  <span>School context</span>
                  <textarea name="message" rows={4} required placeholder="Grade range, number of students, current system, and preferred demo time." defaultValue={""} />
                </label>
                <button className="primary-btn gradient-btn booking-submit" type="submit"><span data-contact-submit-label>Request demo time</span></button>
                <p className="contact-form-status" data-contact-status role="status" aria-live="polite" />
              </form>
            </aside>
          </div>
        </section>
      </main>
    </PageShell>
    
  );
}
