"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useTranslation } from "../i18n/I18nContext.jsx";

function ThemeIcon() {
  return (
    <>
      <svg className="theme-icon sun-icon" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
      <svg className="theme-icon moon-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.99 12.7A8.5 8.5 0 1 1 11.3 3.01 6.5 6.5 0 0 0 20.99 12.7Z" />
      </svg>
    </>
  );
}

export default function NavbarTwo({ activePage = "" }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const { lang, setLanguage, t } = useTranslation();

  useEffect(() => {
    const checkDark = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    checkDark();
    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  const navItems = [
    { id: "modules", label: t("nav.modules") || "Modules", href: "/modules" },
    { id: "pricing", label: t("nav.pricing") || "Pricing", href: "/#pricing", scrollTarget: "pricing" },
    { id: "about", label: t("nav.about") || "About", href: "/about" },
    { id: "compare", label: t("nav.compare") || "Compare", href: "/vs-others" },
    { id: "book", label: t("nav.book") || "Book Demo", href: "/demo" },
    { id: "contact", label: t("nav.contact") || "Contact", href: "/contact" },
  ];

  const toggleTheme = (e) => {
    e?.preventDefault?.();
    e?.stopPropagation?.();

    const isDarkNow = document.documentElement.classList.contains("dark");
    const nextDark = !isDarkNow;
    const nextTheme = nextDark ? "dark" : "light";

    document.documentElement.classList.add("theme-changing");
    window.clearTimeout(window.__themeChangingTimer);
    window.__themeChangingTimer = window.setTimeout(() => {
      document.documentElement.classList.remove("theme-changing");
    }, 760);

    document.documentElement.classList.toggle("dark", nextDark);
    document.documentElement.classList.toggle("light", !nextDark);
    document.documentElement.dataset.theme = nextTheme;

    try {
      localStorage.setItem("theme", nextTheme);
    } catch {}

    const meta = document.querySelector("[data-theme-color]");
    if (meta) {
      meta.setAttribute("content", nextDark ? "#080b12" : "#f8fbff");
    }

    setIsDark(nextDark);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-transparent">
      <div className="relative mx-auto flex h-14 w-full max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Desktop Left Logo */}
        <div className="hidden lg:flex items-center">
          <a className="brand" href="/" aria-label="YeneSchool" data-no-translate>
            <span className="brand-wordmark" data-no-translate>
              <span>Yene</span>
              <span>School</span>
            </span>
          </a>
        </div>

        {/* Desktop Center Hanging Menu (Styled with Website Primary Button Color #60a5fa) */}
        <div
          className="absolute left-1/2 top-0 hidden w-[560px] xl:w-[620px] -translate-x-1/2 lg:block"
          style={{ filter: "drop-shadow(0 10px 24px rgba(96, 165, 250, 0.32))" }}
        >
          {/* Left Wing using website primary color */}
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="pointer-events-none absolute -left-[18px] top-0 z-10 text-[#60a5fa]"
          >
            <path d="M 20 20 L 20 0 L 0 0 C 11.046 0 20 11.046 20 20 Z" fill="currentColor" />
          </svg>

          {/* Right Wing using website primary color */}
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="pointer-events-none absolute -right-[18px] top-0 z-10 text-[#60a5fa]"
          >
            <path d="M 0 0 L 20 0 C 8.954 0 0 8.954 0 20 Z" fill="currentColor" />
          </svg>

          {/* Center Notch Body using website primary color */}
          <div
            className="relative flex h-12 w-full items-center justify-center overflow-hidden bg-[#60a5fa] px-4 shadow-md"
            style={{ borderBottomLeftRadius: "16px", borderBottomRightRadius: "16px" }}
          >
            <nav className="flex w-full items-center justify-between text-[13px] font-bold text-white">
              {navItems.map((item) => {
                const isActive = activePage === item.id;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    data-scroll-target={item.scrollTarget}
                    className={`px-2.5 py-1 rounded-full transition-colors duration-200 hover:text-white hover:bg-white/20 whitespace-nowrap ${
                      isActive ? "bg-white/25 text-white font-extrabold shadow-xs" : "text-white/90"
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Desktop Right (Language & Theme Switcher) */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Language Switcher */}
          <div
            className="language-switcher"
            role="group"
            aria-label={t("language.label") || "Language selection"}
            data-language-switcher
          >
            <button
              className={`language-option${lang === "en" ? " is-active" : ""}`}
              type="button"
              data-language-option="en"
              aria-pressed={lang === "en"}
              onClick={() => setLanguage("en")}
            >
              {t("language.en")}
            </button>
            <button
              className={`language-option${lang === "am" ? " is-active" : ""}`}
              type="button"
              data-language-option="am"
              aria-pressed={lang === "am"}
              onClick={() => setLanguage("am")}
            >
              {t("language.am")}
            </button>
          </div>

          {/* Theme Switcher with Full Slider and Dual Sun/Moon Icons */}
          <button
            className="theme-switcher"
            type="button"
            aria-label={isDark ? t("theme.switchToLight") : t("theme.switchToDark")}
            aria-pressed={isDark}
            onClick={toggleTheme}
          >
            <span className="sr-only">
              {isDark ? t("theme.switchToLight") : t("theme.switchToDark")}
            </span>
            <ThemeIcon />
          </button>
        </div>

        {/* Mobile Header Bar */}
        <div className="flex h-14 w-full items-center justify-between lg:hidden">
          <a className="brand" href="/" aria-label="YeneSchool" data-no-translate>
            <span className="brand-wordmark text-sm" data-no-translate>
              <span>Yene</span>
              <span>School</span>
            </span>
          </a>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setLanguage(lang === "en" ? "am" : "en")}
              className="px-2 py-1 rounded-md text-xs font-semibold bg-white/10 text-white"
            >
              {lang === "en" ? "አማ" : "EN"}
            </button>

            {/* Mobile Theme Toggle */}
            <button
              className="theme-switcher"
              type="button"
              aria-label={isDark ? t("theme.switchToLight") : t("theme.switchToDark")}
              aria-pressed={isDark}
              onClick={toggleTheme}
            >
              <span className="sr-only">
                {isDark ? t("theme.switchToLight") : t("theme.switchToDark")}
              </span>
              <ThemeIcon />
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              className="grid size-9 place-items-center rounded-lg border border-blue-200 bg-white/90 text-[#60a5fa] shadow-sm"
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Panel */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="relative z-20 w-full overflow-hidden bg-[#60a5fa] px-4 py-3 text-white shadow-xl lg:hidden"
          >
            <div className="grid gap-1">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  data-scroll-target={item.scrollTarget}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between rounded-lg px-3 py-2 text-sm font-semibold text-white/90 hover:bg-white/15 hover:text-white"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
