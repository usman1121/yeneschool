import { lazy, Suspense, useEffect, useState } from "react";
import HomePage from "./pages/HomePage.jsx";
import PageShell from "./components/PageShell.jsx";
import { useTranslation } from "./i18n/I18nContext.jsx";
import { smoothScrollTo, smoothScrollToElement } from "./smoothScroll.js";
import { useLandingInteractions } from "./useLandingInteractions.js";

function lazyWithPreload(loader) {
  const Component = lazy(loader);
  Component.preload = loader;
  return Component;
}

const ModulesPage = lazyWithPreload(() => import("./pages/ModulesPage.jsx"));
const ContactPage = lazyWithPreload(() => import("./pages/ContactPage.jsx"));
const BookPage = lazyWithPreload(() => import("./pages/BookPage.jsx"));
const ComparePage = lazyWithPreload(() => import("./pages/ComparePage.jsx"));

const getPageFromRoute = () => {
  const pathname = window.location.pathname.replace(/\/+$/, "");
  if (pathname === "") return "home";
  if (pathname.endsWith("/modules") || pathname.endsWith("/modules.html")) return "modules";
  if (pathname.endsWith("/contact") || pathname.endsWith("/contact.html")) return "contact";
  if (pathname.endsWith("/privacy") || pathname.endsWith("/privacy.html")) return "privacy";
  if (pathname.endsWith("/terms") || pathname.endsWith("/terms.html")) return "terms";
  if (pathname.endsWith("/cookie-policy") || pathname.endsWith("/cookie-policy.html")) return "cookiePolicy";
  if (pathname.endsWith("/demo") || pathname.endsWith("/demo.html")) return "book";
  if (pathname.endsWith("/book") || pathname.endsWith("/book.html")) return "book";
  if (pathname.endsWith("/vs-others") || pathname.endsWith("/vs-others.html")) return "compare";
  return "notFound";
};

function getPageFromPathname(pathname) {
  const normalizedPath = pathname.replace(/\/+$/, "");
  if (normalizedPath === "") return "home";
  if (normalizedPath.endsWith("/modules") || normalizedPath.endsWith("/modules.html")) return "modules";
  if (normalizedPath.endsWith("/contact") || normalizedPath.endsWith("/contact.html")) return "contact";
  if (normalizedPath.endsWith("/privacy") || normalizedPath.endsWith("/privacy.html")) return "privacy";
  if (normalizedPath.endsWith("/terms") || normalizedPath.endsWith("/terms.html")) return "terms";
  if (normalizedPath.endsWith("/cookie-policy") || normalizedPath.endsWith("/cookie-policy.html")) return "cookiePolicy";
  if (normalizedPath.endsWith("/demo") || normalizedPath.endsWith("/demo.html")) return "book";
  if (normalizedPath.endsWith("/book") || normalizedPath.endsWith("/book.html")) return "book";
  if (normalizedPath.endsWith("/vs-others") || normalizedPath.endsWith("/vs-others.html")) return "compare";
  return "notFound";
}

function preloadPage(page) {
  if (page === "modules") ModulesPage.preload();
  if (page === "contact") ContactPage.preload();
  if (page === "book") BookPage.preload();
  if (page === "compare") ComparePage.preload();
}

function useClientNavigation(setPage) {
  useEffect(() => {
    let idlePreloadId = 0;

    const warmRoutes = () => {
      preloadPage("modules");
      preloadPage("contact");
      preloadPage("book");
    };

    if ("requestIdleCallback" in window) {
      idlePreloadId = window.requestIdleCallback(warmRoutes, { timeout: 3500 });
    } else {
      idlePreloadId = window.setTimeout(warmRoutes, 2200);
    }

    const scrollToHomeSection = (targetId, attempts = 0) => {
      const target = document.getElementById(targetId);
      if (!target) {
        if (attempts < 12) requestAnimationFrame(() => scrollToHomeSection(targetId, attempts + 1));
        return;
      }

      smoothScrollToElement(target);
      window.history.replaceState(null, "", "/");
    };

    const navigate = (url, scrollTarget = "") => {
      const nextPage = getPageFromPathname(url.pathname);
      const nextUrl = `${url.pathname}${url.search}${url.hash}`;
      const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;

      if (nextUrl !== currentUrl) {
        window.history.pushState(null, "", nextUrl);
      }

      setPage(nextPage);

      if (scrollTarget) {
        scrollToHomeSection(scrollTarget);
      } else if (url.hash) {
        window.dispatchEvent(new HashChangeEvent("hashchange"));
      } else {
        smoothScrollTo(0, 850);
      }
    };

    const handleClick = (event) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const link = event.target.closest("a[href]");
      if (!link) return;

      const href = link.getAttribute("href") || "";
      if (
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        link.target ||
        link.hasAttribute("download")
      ) {
        return;
      }

      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin) return;

      event.preventDefault();
      navigate(url, link.dataset.scrollTarget || "");
    };

    const handlePointerOver = (event) => {
      const link = event.target.closest("a[href]");
      if (!link) return;

      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      preloadPage(getPageFromPathname(url.pathname));
    };

    const handlePopState = () => setPage(getPageFromRoute());

    const prefetchVisibleLinks = () => {
      if (!("IntersectionObserver" in window)) return () => {};

      const links = Array.from(document.querySelectorAll("a[href]")).filter((link) => {
        const url = new URL(link.href, window.location.href);
        return url.origin === window.location.origin;
      });

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            const url = new URL(entry.target.href, window.location.href);
            preloadPage(getPageFromPathname(url.pathname));
            observer.unobserve(entry.target);
          });
        },
        { rootMargin: "160px" },
      );

      links.forEach((link) => observer.observe(link));
      return () => observer.disconnect();
    };

    const cleanupVisiblePrefetch = prefetchVisibleLinks();

    document.addEventListener("click", handleClick);
    document.addEventListener("pointerover", handlePointerOver);
    window.addEventListener("popstate", handlePopState);

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("pointerover", handlePointerOver);
      window.removeEventListener("popstate", handlePopState);
      cleanupVisiblePrefetch();

      if ("cancelIdleCallback" in window) {
        window.cancelIdleCallback(idlePreloadId);
      } else {
        window.clearTimeout(idlePreloadId);
      }
    };
  }, [setPage]);
}

const pageMeta = {
  home: {
    title: "YeneSchool | School Management System in Ethiopia",
    description:
      "The most complete school management system in Ethiopia for modern schools ready to run smarter, faster, and with confidence.",
    path: "/",
    robots: "index, follow",
  },
  modules: {
    title: "Modules | YeneSchool",
    description:
      "Explore YeneSchool modules for academics, admissions, attendance, exams, report cards, finance, communication, operations, and parent portals.",
    path: "/modules",
    robots: "index, follow",
  },
  contact: {
    title: "Contact | YeneSchool",
    description:
      "Contact YeneSchool for school management system pricing, demos, implementation, and support questions.",
    path: "/contact",
    robots: "index, follow",
  },
  book: {
    title: "Demo | YeneSchool",
    description:
      "Request a guided YeneSchool demo for school owners, registrars, teachers, finance teams, and parent portal workflows.",
    path: "/demo",
    robots: "index, follow",
  },
  compare: {
    title: "Best School Management System in Ethiopia | Why YeneSchool?",
    description:
      "Looking for the best school management system in Ethiopia? Compare YeneSchool vs international legacy systems and basic local portals. Discover our 7-role, multi-tenant platform with native Ethiopian calendar support, offline attendance, and multi-language UI.",
    path: "/vs-others",
    robots: "index, follow",
  },
  privacy: {
    title: "Privacy Policy | YeneSchool",
    description:
      "Read the YeneSchool privacy policy for school data, account information, security, and data rights.",
    path: "/",
    robots: "noindex, follow",
  },
  terms: {
    title: "Terms of Service | YeneSchool",
    description:
      "Read the YeneSchool terms of service for schools and authorized users of the school management system.",
    path: "/",
    robots: "noindex, follow",
  },
  cookiePolicy: {
    title: "Cookie Policy | YeneSchool",
    description: "Read how cookies and browser preferences support the YeneSchool website and product.",
    path: "/",
    robots: "noindex, follow",
  },
  notFound: {
    title: "Page Not Found | YeneSchool",
    description: "The requested YeneSchool page could not be found.",
    path: "/",
    robots: "noindex, follow",
  },
};

function setMeta(selector, attribute, value) {
  document.querySelector(selector)?.setAttribute(attribute, value);
}

function usePageMeta(page) {
  const { t } = useTranslation();

  useEffect(() => {
    const staticMeta = pageMeta[page] || pageMeta.home;
    const translatedMeta = t(`pageMeta.${page}`) || t("pageMeta.home") || {};
    const meta = {
      ...staticMeta,
      ...translatedMeta,
    };
    const url = `https://www.yeneschool.me${meta.path}`;

    document.title = meta.title;
    setMeta("meta[name='description']", "content", meta.description);
    setMeta("link[rel='canonical']", "href", url);
    setMeta("meta[name='robots']", "content", meta.robots || "index, follow");
    setMeta("meta[property='og:title']", "content", meta.title);
    setMeta("meta[property='og:description']", "content", meta.description);
    setMeta("meta[property='og:url']", "content", url);
    setMeta("meta[name='twitter:title']", "content", meta.title);
    setMeta("meta[name='twitter:description']", "content", meta.description);
  }, [page, t]);
}

const legalPages = {
  privacy: {
    active: "privacy",
    kicker: "Privacy Policy",
    title: "How YeneSchool handles school data.",
    description:
      "Last updated: June 10, 2026. A clear guide to the school records we process, why we process them, and how authorized schools can control their data.",
    ariaLabel: "Privacy policy content", 
    toc: [
      ["privacy-collect", "Information we collect"],
      ["privacy-use", "How we use it"],
      ["privacy-share", "Sharing and disclosure"],
      ["privacy-security", "Security"],
      ["privacy-retention", "Retention"],
      ["privacy-rights", "School rights"],
      ["privacy-contact", "Contact"],
    ],
    sections: [
      {
        id: "privacy-collect",
        title: "Information We Collect",
        body: [
          "YeneSchool processes information that schools and authorized users provide while setting up and operating the school management system.",
          "The exact records depend on the modules a school uses and the data entered by its staff.",
        ],
        bullets: [
          "School profile, administrator contact details, subscription and implementation information.",
          "Student records, parent and guardian details, enrollment information, class placement, attendance, marks, report cards, discipline, and documents.",
          "Staff, teacher, finance, registrar, and user account records needed for role-based access.",
          "Fee structures, payments, receipts, discounts, balances, and finance workflow records.",
          "Support messages, contact form submissions, usage events, device/browser metadata, and technical logs needed to operate and secure the service.",
        ],
      },
      {
        id: "privacy-use",
        title: "How We Use Information",
        body: [
          "We use school data to deliver the product features requested by the school, maintain the service, support users, and protect accounts.",
        ],
        bullets: [
          "Authenticate users and apply role-based permissions.",
          "Run school workflows such as admissions, attendance, grading, report cards, finance, communication, and parent portal access.",
          "Generate exports, reports, dashboards, notices, receipts, and operational summaries requested by the school.",
          "Respond to support requests, implementation questions, demo requests, and account issues.",
          "Monitor reliability, troubleshoot errors, prevent abuse, and improve product performance.",
        ],
      },
      {
        id: "privacy-share",
        title: "Sharing and Disclosure",
        body: [
          "We do not sell school records. We only disclose information when it is necessary to provide the service, comply with legal requirements, protect the platform, or support the school.",
        ],
        bullets: [
          "Authorized school users can access records according to their assigned role and permissions.",
          "Service providers may process limited data for hosting, email delivery, infrastructure, analytics, or support operations.",
          "We may disclose information if required by law, court order, or a lawful government request.",
          "We may share information to investigate abuse, security incidents, fraud, or threats to the service.",
        ],
      },
      {
        id: "privacy-security",
        title: "Security",
        body: [
          "School records are sensitive operational data. We use technical and administrative safeguards to reduce unauthorized access and misuse.",
        ],
        bullets: [
          "Role-based access controls and school-level data isolation.",
          "Authentication, permission checks, audit-friendly operational records, and secure hosting practices.",
          "Reasonable monitoring, backups, and maintenance processes to support reliability.",
          "No internet service can guarantee absolute security, so schools should also protect account credentials and assign roles carefully.",
        ],
      },
      {
        id: "privacy-retention",
        title: "Retention",
        body: [
          "We keep data for as long as needed to provide the service, support school operations, comply with obligations, resolve disputes, and maintain backups.",
          "Schools may request deletion or export where technically and contractually possible. Some backup, audit, billing, or legal records may be retained for a limited period after deletion requests.",
        ],
      },
      {
        id: "privacy-rights",
        title: "School Data Rights",
        body: [
          "Authorized school owners or administrators may request access, correction, export, or deletion of their school data.",
          "For security, we may need to verify the requester before completing a data request.",
        ],
        bullets: [
          "Request a copy or export of school records.",
          "Ask for inaccurate records to be corrected.",
          "Request deletion of school data where legally and technically possible.",
          "Ask questions about how data is processed or protected.",
        ],
      },
      {
        id: "privacy-contact",
        title: "Contact",
        body: [
          <>
            For privacy questions or school data requests, email <a href="mailto:yeneschool@gmail.com">yeneschool@gmail.com</a> or use the contact page.
          </>,
        ],
      },
    ],
  },
  terms: {
    active: "terms",
    kicker: "Terms of Service",
    title: "Terms for using YeneSchool.",
    description:
      "Last updated: June 10, 2026. These terms explain how schools and authorized users may access YeneSchool and what responsibilities apply when using the service.",
    ariaLabel: "Terms content", 
    toc: [
      ["terms-acceptance", "Acceptance"],
      ["terms-service", "Service"],
      ["terms-responsibilities", "Responsibilities"],
      ["terms-accounts", "Accounts"],
      ["terms-payments", "Payments"],
      ["terms-availability", "Availability"],
      ["terms-liability", "Liability"],
      ["terms-changes", "Changes"],
    ],
    sections: [
      {
        id: "terms-acceptance",
        title: "Acceptance of Terms",
        body: [
          "By accessing or using YeneSchool, the school and its authorized users agree to these terms and any written agreement between the school and YeneSchool.",
          "If a user accesses the system on behalf of a school, that user confirms they are authorized to use the service for that school.",
        ],
      },
      {
        id: "terms-service",
        title: "Description of Service",
        body: [
          "YeneSchool provides school management tools for daily academic, administrative, finance, communication, and reporting workflows.",
        ],
        bullets: [
          "Student records, admissions, classes, sections, subjects, attendance, assessments, and report cards.",
          "Fee management, receipts, balances, discounts, parent fee visibility, and finance summaries.",
          "Parent, student, teacher, registrar, finance, admin, and IT manager workspaces.",
          "Communication tools, notices, documents, dashboards, exports, and operational reports.",
        ],
      },
      {
        id: "terms-responsibilities",
        title: "School and User Responsibilities",
        body: [
          "Schools are responsible for how their users configure and use the system. The accuracy of records depends on the information entered by authorized school users.",
        ],
        bullets: [
          "Enter accurate student, parent, staff, academic, attendance, marks, and finance records.",
          "Assign appropriate roles and permissions to users.",
          "Protect usernames, passwords, exported files, and generated credentials.",
          "Obtain any required consent or authority before entering family, student, staff, or financial information.",
          "Use the system lawfully and avoid uploading illegal, harmful, or unauthorized content.",
        ],
      },
      {
        id: "terms-accounts",
        title: "Accounts and Access",
        body: [
          "Access is controlled by accounts, roles, and school-level permissions. Schools should review user access regularly and remove accounts that no longer need access.",
        ],
        bullets: [
          "Users must keep login credentials confidential.",
          "Schools are responsible for activity performed through accounts they create or approve.",
          "YeneSchool may suspend access if there is suspected abuse, security risk, unpaid service use, or violation of these terms.",
        ],
      },
      {
        id: "terms-payments",
        title: "Plans, Payments, and Renewals",
        body: [
          "Pricing, payment schedules, included modules, onboarding terms, and renewals may be defined on the website, invoice, proposal, or written agreement with the school.",
          "Some prices may be launch, promotional, first-year, or plan-specific offers. Renewal pricing may differ by plan.",
        ],
      },
      {
        id: "terms-availability",
        title: "Service Availability",
        body: [
          "We work to keep YeneSchool reliable and secure, but uninterrupted access is not guaranteed.",
        ],
        bullets: [
          "Planned maintenance, internet connectivity, hosting incidents, third-party provider issues, browser/device limitations, or urgent security fixes may affect availability.",
          "We may update, modify, add, or remove features to improve the service or maintain platform security.",
          "Schools should keep appropriate offline or exported backups for critical operational needs.",
        ],
      },
      {
        id: "terms-liability",
        title: "Limitation of Liability",
        body: [
          "YeneSchool is provided for operational school management. To the extent allowed by law, we are not liable for indirect losses, lost revenue, missed decisions, data entered incorrectly by users, or outcomes caused by unauthorized account use.",
          "The school remains responsible for academic decisions, financial decisions, legal compliance, and communication with students, families, and staff.",
        ],
      },
      {
        id: "terms-changes",
        title: "Changes to These Terms",
        body: [
          "We may update these terms as the product, legal requirements, or school workflows change. The updated date at the top of this page identifies the latest version.",
        ],
      },
    ],
  },
  cookiePolicy: {
    active: "cookiePolicy",
    kicker: "Cookie Policy",
    title: "How cookies support the YeneSchool site.",
    description:
      "Last updated: June 10, 2026. This policy explains how cookies, local storage, and browser preferences help the website and product work reliably.",
    ariaLabel: "Cookie policy content", 
    toc: [
      ["cookie-what", "What cookies are"],
      ["cookie-use", "How we use them"],
      ["cookie-types", "Types we use"],
      ["cookie-control", "Your controls"],
      ["cookie-changes", "Changes"],
    ],
    sections: [
      {
        id: "cookie-what",
        title: "What Are Cookies and Local Storage?",
        body: [
          "Cookies are small text files saved by a browser. Local storage is browser storage used to remember settings or small pieces of product state.",
          "Together, they help a website remember preferences, keep sessions working, improve security, and provide a smoother experience.",
        ],
      },
      {
        id: "cookie-use",
        title: "How YeneSchool Uses Browser Storage",
        body: [
          "YeneSchool uses browser storage for practical product and website needs. We keep this focused on operation, security, preferences, and reliability.",
        ],
        bullets: [
          "Remember theme and language preferences.",
          "Support login, account security, and session behavior in the product.",
          "Preserve form or workflow state where needed to avoid unnecessary user friction.",
          "Understand basic site performance and errors so we can improve reliability.",
        ],
      },
      {
        id: "cookie-types",
        title: "Types of Cookies We May Use",
        body: [
          "The exact cookies or local storage entries may change as features evolve, but they generally fall into these categories.",
        ],
        bullets: [
          "Essential storage: required for login, security, routing, and core product operation.",
          "Preference storage: remembers theme, language, and similar interface choices.",
          "Performance storage: helps understand page reliability, loading behavior, and errors.",
          "Support or communication storage: may help contact forms, demo requests, or support tools work correctly.",
        ],
      },
      {
        id: "cookie-control",
        title: "How to Manage Cookies",
        body: [
          "You can block, delete, or limit cookies and local storage through your browser settings.",
          "If you disable essential cookies or storage, sign-in, saved preferences, dashboards, or form behavior may not work correctly.",
        ],
      },
      {
        id: "cookie-changes",
        title: "Changes to This Policy",
        body: [
          "We may update this policy as the website, product, hosting, or support tools change. The updated date at the top of this page shows the latest version.",
        ],
      },
    ],
  },
};

function LegalPage({ config }) {
  const { t } = useTranslation();
  const legalKey = config.active === "cookiePolicy" ? "cookie" : config.active;
  const translated = t(`legal.${legalKey}`) || {};
  const tocLabels = translated.toc || config.toc.map(([, label]) => label);
  const keyAliases = {
    "privacy-collect": "collect",
    "privacy-use": "use",
    "privacy-share": "share",
    "privacy-security": "security",
    "privacy-retention": "retention",
    "privacy-rights": "rights",
    "privacy-contact": "contact",
    "terms-acceptance": "acceptance",
    "terms-service": "service",
    "terms-responsibilities": "responsibilities",
    "terms-accounts": "accounts",
    "terms-payments": "payments",
    "terms-availability": "availability",
    "terms-liability": "liability",
    "terms-changes": "changes",
    "cookie-what": "what",
    "cookie-use": "use",
    "cookie-types": "types",
    "cookie-control": "control",
    "cookie-changes": "changes",
  };

  return (
    <PageShell activePage={config.active}>
      <main id="top" className="legal-page">
        <section className="legal-hero section" data-reveal>
          <span className="section-kicker">{translated.kicker || config.kicker}</span>
          <h1>{translated.title || config.title}</h1>
          <p>{translated.desc || config.description}</p>
        </section>

        <section className="legal-layout section" aria-label={config.ariaLabel}>
          <aside className="legal-toc" data-reveal>
            {config.toc.map(([id, label], index) => (
              <a href={`#${id}`} key={id}>
                {tocLabels[index] || label}
              </a>
            ))}
          </aside>
          <article className="legal-content" data-reveal>
            {config.sections.map(({ id, title, body, bullets }) => {
              const section = translated.sections?.[keyAliases[id]] || {};
              const sectionBody = section.body || body;
              const sectionBullets = section.items || bullets;
              return (
              <section id={id} className="legal-section" key={id}>
                <h2>{section.title || title}</h2>
                {sectionBody.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
                {sectionBullets?.length ? (
                  <ul>
                    {sectionBullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            )})}
          </article>
        </section>
      </main>
    </PageShell>
  );
}

function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <PageShell activePage="notFound">
      <main id="top" className="not-found-page">
        <section className="not-found-center section is-visible" data-reveal>
          <svg className="not-found-illustration" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 362 145" aria-hidden="true">
            <path
              fill="currentColor"
              d="M62.6 142c-2.133 0-3.2-1.067-3.2-3.2V118h-56c-2 0-3-1-3-3V92.8c0-1.333.4-2.733 1.2-4.2L58.2 4c.8-1.333 2.067-2 3.8-2h28c2 0 3 1 3 3v85.4h11.2c.933 0 1.733.333 2.4 1 .667.533 1 1.267 1 2.2v21.2c0 .933-.333 1.733-1 2.4-.667.533-1.467.8-2.4.8H93v20.8c0 2.133-1.067 3.2-3.2 3.2H62.6zM33 90.4h26.4V51.2L33 90.4zM181.67 144.6c-7.333 0-14.333-1.333-21-4-6.666-2.667-12.866-6.733-18.6-12.2-5.733-5.467-10.266-13-13.6-22.6-3.333-9.6-5-20.667-5-33.2 0-12.533 1.667-23.6 5-33.2 3.334-9.6 7.867-17.133 13.6-22.6 5.734-5.467 11.934-9.533 18.6-12.2 6.667-2.8 13.667-4.2 21-4.2 7.467 0 14.534 1.4 21.2 4.2 6.667 2.667 12.8 6.733 18.4 12.2 5.734 5.467 10.267 13 13.6 22.6 3.334 9.6 5 20.667 5 33.2 0 12.533-1.666 23.6-5 33.2-3.333 9.6-7.866 17.133-13.6 22.6-5.6 5.467-11.733 9.533-18.4 12.2-6.666 2.667-13.733 4-21.2 4zm0-31c9.067 0 15.6-3.733 19.6-11.2 4.134-7.6 6.2-17.533 6.2-29.8s-2.066-22.2-6.2-29.8c-4.133-7.6-10.666-11.4-19.6-11.4-8.933 0-15.466 3.8-19.6 11.4-4 7.6-6 17.533-6 29.8s2 22.2 6 29.8c4.134 7.467 10.667 11.2 19.6 11.2zM316.116 142c-2.134 0-3.2-1.067-3.2-3.2V118h-56c-2 0-3-1-3-3V92.8c0-1.333.4-2.733 1.2-4.2l56.6-84.6c.8-1.333 2.066-2 3.8-2h28c2 0 3 1 3 3v85.4h11.2c.933 0 1.733.333 2.4 1 .666.533 1 1.267 1 2.2v21.2c0 .933-.334 1.733-1 2.4-.667.533-1.467.8-2.4.8h-11.2v20.8c0 2.133-1.067 3.2-3.2 3.2h-27.2zm-29.6-51.6h26.4V51.2l-26.4 39.2z"
            />
          </svg>
          <h1>{t("notFound.title")}</h1>
          <p>{t("notFound.desc")}</p>
          <div className="not-found-actions">
            <a className="secondary-btn not-found-back" href="#" onClick={(event) => {
              event.preventDefault();
              window.history.length > 1 ? window.history.back() : window.location.assign("/");
            }}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="m12 19-7-7 7-7" />
                <path d="M19 12H5" />
              </svg>
              {t("notFound.goBack")}
            </a>
            <a className="primary-btn gradient-btn" href="/">
              {t("notFound.goHome")}
            </a>
          </div>
        </section>
      </main>
    </PageShell>
  );
}

function PageLoader() {
  return (
    <div className="route-loader" aria-label="Loading page">
      <ClassicLoader />
    </div>
  );
}

function ClassicLoader() {
  return <div className="classic-loader" />;
}

function PageRuntime({ page, children }) {
  useLandingInteractions(page);
  usePageMeta(page);
  return children;
}

export default function App() {
  const [page, setPage] = useState(getPageFromRoute);

  useClientNavigation(setPage);

  if (page === "modules") {
    return (
      <Suspense fallback={<PageLoader />}>
        <PageRuntime page={page}>
          <ModulesPage />
        </PageRuntime>
      </Suspense>
    );
  }

  if (page === "contact") {
    return (
      <Suspense fallback={<PageLoader />}>
        <PageRuntime page={page}>
          <ContactPage />
        </PageRuntime>
      </Suspense>
    );
  }

  if (page === "book") {
    return (
      <Suspense fallback={<PageLoader />}>
        <PageRuntime page={page}>
          <BookPage />
        </PageRuntime>
      </Suspense>
    );
  }

  if (page === "compare") {
    return (
      <Suspense fallback={<PageLoader />}>
        <PageRuntime page={page}>
          <ComparePage />
        </PageRuntime>
      </Suspense>
    );
  }

  if (legalPages[page]) {
    return (
      <PageRuntime page={page}>
        <LegalPage config={legalPages[page]} />
      </PageRuntime>
    );
  }

  if (page === "notFound") {
    return (
      <PageRuntime page={page}>
        <NotFoundPage />
      </PageRuntime>
    );
  }

  return (
    <PageRuntime page={page}>
      <HomePage />
    </PageRuntime>
  );
}
