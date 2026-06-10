import PageShell from "../components/PageShell.jsx";

export default function ContactPage() {
  return (
    <PageShell activePage="contact">
      <main id="top" className="contact-page">
        <section className="contact-hero section" aria-labelledby="contact-title" data-reveal>
          <div className="contact-hero-copy">
            <span className="section-kicker">Contact YeneSchool</span>
            <h1 id="contact-title">Talk to us about your school setup.</h1>
            <p>
              Send your school details, rollout needs, or pricing question. We will reply with the clearest next step for your team.
            </p>
            <div className="contact-trust-row" aria-label="Contact support summary">
              <span><b>Pricing</b> Plan guidance</span>
              <span><b>Demo</b> Product walkthrough</span>
              <span><b>Setup</b> Implementation help</span>
            </div>
          </div>
          <div className="contact-form-shell">
            <form className="contact-form" data-contact-form>
              <div className="form-row">
                <label>
                  <span>Name</span>
                  <input type="text" name="name" autoComplete="name" required />
                </label>
                <label>
                  <span>School name</span>
                  <input type="text" name="school" autoComplete="organization" required />
                </label>
              </div>
              <div className="form-row">
                <label>
                  <span>Email</span>
                  <input type="email" name="email" autoComplete="email" required />
                </label>
                <label>
                  <span>Phone</span>
                  <input type="tel" name="phone" autoComplete="tel" />
                </label>
              </div>
              <label>
                <span>What do you need?</span>
                <select name="topic" required>
                  <option value="">Choose one</option>
                  <option value="Pricing">Pricing</option>
                  <option value="Demo">Product demo</option>
                  <option value="Implementation">Implementation</option>
                  <option value="Support">Support</option>
                  <option value="Other">Other</option>
                </select>
              </label>
              <label>
                <span>Message</span>
                <textarea name="message" rows={6} required defaultValue={""} />
              </label>
              <button className="primary-btn gradient-btn contact-submit" type="submit">
                <span data-contact-submit-label>Send message</span>
              </button>
              <p className="contact-form-status" data-contact-status role="status" aria-live="polite" />
            </form>
          </div>
        </section>
      </main>
    </PageShell>
    
  );
}
