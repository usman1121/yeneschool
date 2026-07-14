import PageShell from "../components/PageShell.jsx";
import { useTranslation } from "../i18n/I18nContext.jsx";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function ContactPage() {
  const { t } = useTranslation();
  const headingRef = useRef(null);
  const contactTitle = t("contact.hero.title") || "";
  const splitContact = contactTitle.split(" ").map((word, i) =>
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
  }, [contactTitle]);

  return (
    <PageShell activePage="contact">
      <main id="top" className="contact-page">
        <section className="contact-hero section" aria-labelledby="contact-title" data-reveal>
          <div className="contact-hero-copy">
            <span className="section-kicker">{t("contact.hero.kicker")}</span>
            <h1 id="contact-title" ref={headingRef}>{splitContact}</h1>
            <p>
              {t("contact.hero.subtitle")}
            </p>
            <div className="contact-trust-row" aria-label="Contact support summary">
              <span><b>Email</b> yeneschool@gmail.com</span>
              <span><b>Phone</b> +251 983 355 598<br />+251 966 074 050<br />+251 912 207 180</span>
              <span><b>Telegram</b> @YeneSchool</span>
            </div>
          </div>
          <div className="contact-form-shell">
            <form
              className="contact-form"
              aria-label={t("contact.form.title") || "Contact YeneSchool"}
              data-contact-form
              data-success-message={t("contact.form.success")}
              data-error-message={t("contact.form.error")}
              data-local-test-message={t("contact.form.localTest")}
            >
              <div className="form-row">
                <label>
                  <span>{t("contact.form.name")}</span>
                  <input type="text" name="name" autoComplete="name" required />
                </label>
                <label>
                  <span>{t("contact.form.school")}</span>
                  <input type="text" name="school" autoComplete="organization" required />
                </label>
              </div>
              <div className="form-row">
                <label>
                  <span>{t("contact.form.email")}</span>
                  <input type="email" name="email" autoComplete="email" required />
                </label>
                <label>
                  <span>{t("contact.form.phone")}</span>
                  <input type="tel" name="phone" autoComplete="tel" />
                </label>
              </div>
              <input type="hidden" name="topic" value="General" />
              <label>
                <span>{t("contact.form.message")}</span>
                <textarea name="message" rows={6} required defaultValue="" />
              </label>
              <button className="primary-btn gradient-btn contact-submit" type="submit">
                <span data-contact-submit-label data-sending-label={t("contact.form.sending")}>{t("contact.form.send")}</span>
              </button>
              <p className="contact-form-status" data-contact-status role="status" aria-live="polite" />
            </form>
          </div>
        </section>
        <section className="section contact-map-section" data-reveal>
          <div className="contact-map-container">
            <div className="contact-map-frame">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d252229.92814711466!2d38.61666945!3d8.9637745!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85cef5ab402d%3A0x8467b84b2e5b12b6!2sAddis%20Ababa%2C%20Ethiopia!5e0!3m2!1sen!2s!4v1"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="YeneSchool location in Addis Ababa, Ethiopia"
              />
            </div>
            <div className="contact-map-overlay">
              <h3>{t("contact.map.title") || "Serving schools across Ethiopia"}</h3>
              <p>{t("contact.map.desc") || "YeneSchool supports schools throughout Ethiopia. Reach out and we will help you get started."}</p>
            </div>
          </div>
        </section>
      </main>
    </PageShell>
    
  );
}
