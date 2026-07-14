import PageShell from "../components/PageShell.jsx";
import { useTranslation } from "../i18n/I18nContext.jsx";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function BookPage() {
  const { t } = useTranslation();
  const showcase = t("book.showcase") || [];
  const options = t("book.form.options") || [];
  const headingRef = useRef(null);
  const title = t("book.hero.title") || "";

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
  }, [title]);

  const splitTitle = title.split(" ").map((word, i) =>
    <span key={i} className="word">{word}</span>
  );

  return (
    <PageShell activePage="book">
      <main id="top" className="book-page">
        <section className="book-hero section" aria-labelledby="book-title" data-reveal>
          <div className="book-hero-copy">
            <span className="section-kicker">{t("book.hero.kicker")}</span>
            <h1 id="book-title" ref={headingRef}>{splitTitle}</h1>
            <p>{t("book.hero.subtitle")}</p>
          </div>
          <div className="book-showcase">
            <div className="book-demo-brief" aria-label="Demo call details">
              {showcase.map((item) => (
                <article key={item.value}><strong>{item.value}</strong><span>{item.label}</span></article>
              ))}
            </div>
            <aside className="book-form-shell" aria-label="YeneSchool demo">
              <div className="book-form-heading">
                <p>{t("book.form.heading")}</p>
                <h2>{t("book.form.title")}</h2>
                <span>{t("book.form.subtitle")}</span>
              </div>
              <form
                className="booking-form"
                aria-label={t("book.form.title") || "Request a YeneSchool demo"}
                data-contact-form
                data-success-message={t("contact.form.success")}
                data-error-message={t("contact.form.error")}
                data-local-test-message={t("contact.form.localTest")}
              >
                <div className="booking-grid">
                  <label className="booking-field"><span>{t("book.form.name")}</span><input type="text" name="name" autoComplete="name" placeholder={t("book.form.namePlaceholder")} required /></label>
                  <label className="booking-field"><span>{t("book.form.school")}</span><input type="text" name="school" autoComplete="organization" placeholder={t("book.form.schoolPlaceholder")} required /></label>
                  <label className="booking-field"><span>{t("book.form.email")}</span><input type="email" name="email" autoComplete="email" placeholder={t("book.form.emailPlaceholder")} required /></label>
                  <label className="booking-field"><span>{t("book.form.phone")}</span><input type="tel" name="phone" autoComplete="tel" placeholder={t("book.form.phonePlaceholder")} /></label>
                  <label className="booking-field"><span>{t("book.form.preferredDate")}</span><input type="date" name="demo_date" required /></label>
                </div>
                <label className="booking-field">
                  <span>{t("book.form.demoFocus")}</span>
                  <select name="message_focus" required>
                    <option value="">{t("book.form.selectFocus")}</option>
                    {options.map((option) => (
                      <option value={option} key={option}>{option}</option>
                    ))}
                  </select>
                </label>
                <input type="hidden" name="topic" defaultValue="Demo" />
                <label className="booking-field">
                  <span>{t("book.form.schoolContext")}</span>
                  <textarea name="message" rows={4} required placeholder={t("book.form.contextPlaceholder")} defaultValue={""} />
                </label>
                <button className="primary-btn gradient-btn booking-submit" type="submit"><span data-contact-submit-label data-sending-label={t("contact.form.sending")}>{t("book.form.submit")}</span></button>
                <p className="contact-form-status" data-contact-status role="status" aria-live="polite" />
              </form>
            </aside>
          </div>
        </section>
      </main>
    </PageShell>
    
  );
}
