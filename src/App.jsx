import { lazy, Suspense, useEffect, useState } from "react";
import HomePage from "./pages/HomePage.jsx";
import PageShell from "./components/PageShell.jsx";
import { useLandingInteractions } from "./useLandingInteractions.js";

function lazyWithPreload(loader) {
  const Component = lazy(loader);
  Component.preload = loader;
  return Component;
}

const ModulesPage = lazyWithPreload(() => import("./pages/ModulesPage.jsx"));
const ContactPage = lazyWithPreload(() => import("./pages/ContactPage.jsx"));
const BookPage = lazyWithPreload(() => import("./pages/BookPage.jsx"));

const getPageFromRoute = () => {
  const pathname = window.location.pathname.replace(/\/+$/, "");
  if (pathname === "") return "home";
  if (pathname.endsWith("/modules") || pathname.endsWith("/modules.html")) return "modules";
  if (pathname.endsWith("/contact") || pathname.endsWith("/contact.html")) return "contact";
  if (pathname.endsWith("/privacy") || pathname.endsWith("/privacy.html")) return "privacy";
  if (pathname.endsWith("/terms") || pathname.endsWith("/terms.html")) return "terms";
  if (pathname.endsWith("/cookie-policy") || pathname.endsWith("/cookie-policy.html")) return "cookiePolicy";
  if (pathname.endsWith("/book") || pathname.endsWith("/book.html")) return "book";
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
  if (normalizedPath.endsWith("/book") || normalizedPath.endsWith("/book.html")) return "book";
  return "notFound";
}

function preloadPage(page) {
  if (page === "modules") ModulesPage.preload();
  if (page === "contact") ContactPage.preload();
  if (page === "book") BookPage.preload();
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

    const scrollToHomeSection = (targetId) => {
      window.setTimeout(() => {
        const target = document.getElementById(targetId);
        if (!target) return;

        target.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.replaceState(null, "", "/");
      }, 80);
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
        window.scrollTo({ top: 0 });
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
    title: "YeneSchool | School Management System",
    description:
      "YeneSchool is a school management system for enrollment, attendance, marks, report cards, finance, parent portals, communication, and daily school operations.",
    path: "/",
  },
  modules: {
    title: "Modules | YeneSchool",
    description:
      "Explore YeneSchool modules for academics, admissions, attendance, exams, report cards, finance, communication, operations, and parent portals.",
    path: "/modules",
  },
  contact: {
    title: "Contact | YeneSchool",
    description:
      "Contact YeneSchool for school management system pricing, demos, implementation, and support questions.",
    path: "/contact",
  },
  book: {
    title: "Book a Demo | YeneSchool",
    description:
      "Book a guided YeneSchool demo for school owners, registrars, teachers, finance teams, and parent portal workflows.",
    path: "/book",
  },
  privacy: {
    title: "Privacy Policy | YeneSchool",
    description:
      "Read the YeneSchool privacy policy for school data, account information, security, and data rights.",
    path: "/privacy",
  },
  terms: {
    title: "Terms of Service | YeneSchool",
    description:
      "Read the YeneSchool terms of service for schools and authorized users of the school management system.",
    path: "/terms",
  },
  cookiePolicy: {
    title: "Cookie Policy | YeneSchool",
    description: "Read how cookies and browser preferences support the YeneSchool website and product.",
    path: "/cookie-policy",
  },
  notFound: {
    title: "Page Not Found | YeneSchool",
    description: "The requested YeneSchool page could not be found.",
    path: "/404",
  },
};

function setMeta(selector, attribute, value) {
  document.querySelector(selector)?.setAttribute(attribute, value);
}

function usePageMeta(page) {
  useEffect(() => {
    const meta = pageMeta[page] || pageMeta.home;
    const url = `https://www.yeneschool.me${meta.path}`;

    document.title = meta.title;
    setMeta("meta[name='description']", "content", meta.description);
    setMeta("link[rel='canonical']", "href", url);
    setMeta("meta[property='og:title']", "content", meta.title);
    setMeta("meta[property='og:description']", "content", meta.description);
    setMeta("meta[property='og:url']", "content", url);
    setMeta("meta[name='twitter:title']", "content", meta.title);
    setMeta("meta[name='twitter:description']", "content", meta.description);
  }, [page]);
}

const legalPages = {
  privacy: {
    active: "privacy",
    kicker: "Privacy Policy",
    title: "How YeneSchool handles school data.",
    description:
      "Last updated: June 10, 2026. This policy explains what information we collect, why we use it, and how schools can request updates or deletion.",
    ariaLabel: "Privacy policy content",
    toc: [
      ["privacy-collect", "Information we collect"],
      ["privacy-use", "How we use it"],
      ["privacy-security", "Security"],
      ["privacy-rights", "School rights"],
      ["privacy-contact", "Contact"],
    ],
    sections: [
      [
        "privacy-collect",
        "Information We Collect",
        "YeneSchool may collect school account details, administrator contact information, student and parent records entered by the school, staff records, attendance, marks, fee records, communication logs, support messages, and technical data needed to operate the service.",
      ],
      [
        "privacy-use",
        "How We Use Information",
        "We use information to provide school management features, authenticate users, protect accounts, support implementation, respond to inquiries, improve product reliability, and send operational notices requested by the school.",
      ],
      [
        "privacy-security",
        "Data Security",
        "We use access controls, role-based permissions, secure hosting practices, and operational safeguards to reduce unauthorized access. No internet service can guarantee absolute security, but we treat school records as sensitive operational data.",
      ],
      [
        "privacy-rights",
        "School Data Rights",
        "Schools may request access, correction, export, or deletion of their data where technically and contractually possible. Requests should come from an authorized school owner or administrator.",
      ],
      [
        "privacy-contact",
        "Contact",
        <>
          For privacy questions, email <a href="mailto:yeneschool@gmail.com">yeneschool@gmail.com</a> or use the contact
          page.
        </>,
      ],
    ],
  },
  terms: {
    active: "terms",
    kicker: "Terms of Service",
    title: "Terms for using YeneSchool.",
    description:
      "Last updated: June 10, 2026. These terms outline the responsibilities of schools, users, and YeneSchool when using the service.",
    ariaLabel: "Terms content",
    toc: [
      ["terms-acceptance", "Acceptance"],
      ["terms-service", "Service"],
      ["terms-responsibilities", "Responsibilities"],
      ["terms-availability", "Availability"],
      ["terms-liability", "Liability"],
    ],
    sections: [
      [
        "terms-acceptance",
        "Acceptance of Terms",
        "By accessing or using YeneSchool, the school and its authorized users agree to use the service according to these terms and any written agreement between the school and YeneSchool.",
      ],
      [
        "terms-service",
        "Description of Service",
        "YeneSchool provides school management tools for student records, attendance, assessments, report cards, finance workflows, parent access, staff operations, notices, and reporting.",
      ],
      [
        "terms-responsibilities",
        "User Responsibilities",
        "Schools are responsible for accurate data entry, assigning appropriate roles, protecting account credentials, obtaining required permissions from families and staff, and using the system lawfully.",
      ],
      [
        "terms-availability",
        "Service Availability",
        "We work to keep YeneSchool reliable and secure. Planned maintenance, internet issues, third-party outages, or emergency fixes may affect availability.",
      ],
      [
        "terms-liability",
        "Limitation of Liability",
        "YeneSchool is provided for operational school management. To the extent allowed by law, we are not liable for indirect losses, missed decisions, or outcomes caused by inaccurate data entered by users.",
      ],
    ],
  },
  cookiePolicy: {
    active: "cookiePolicy",
    kicker: "Cookie Policy",
    title: "How cookies support the YeneSchool site.",
    description:
      "Last updated: June 10, 2026. This policy explains the small browser files and local preferences used by our website and product.",
    ariaLabel: "Cookie policy content",
    toc: [
      ["cookie-what", "What cookies are"],
      ["cookie-use", "How we use them"],
      ["cookie-control", "Your controls"],
      ["cookie-changes", "Changes"],
    ],
    sections: [
      [
        "cookie-what",
        "What Are Cookies?",
        "Cookies and local storage are small pieces of data saved in your browser. They help websites remember settings, keep sessions working, and understand basic usage patterns.",
      ],
      [
        "cookie-use",
        "How We Use Cookies",
        "YeneSchool may use essential cookies for login and security, preference storage for theme and language choices, and limited analytics to understand page performance and improve the service.",
      ],
      [
        "cookie-control",
        "How to Manage Cookies",
        "You can block or delete cookies in your browser settings. Some essential features, including sign-in or saved preferences, may not work correctly if cookies are disabled.",
      ],
      [
        "cookie-changes",
        "Changes to This Policy",
        "We may update this policy as the website or product changes. The updated date at the top of this page shows the latest version.",
      ],
    ],
  },
};

function LegalPage({ config }) {
  return (
    <PageShell activePage={config.active}>
      <main id="top" className="legal-page">
        <section className="legal-hero section" data-reveal>
          <span className="section-kicker">{config.kicker}</span>
          <h1>{config.title}</h1>
          <p>{config.description}</p>
        </section>

        <section className="legal-layout section" aria-label={config.ariaLabel}>
          <aside className="legal-toc" data-reveal>
            {config.toc.map(([id, label]) => (
              <a href={`#${id}`} key={id}>
                {label}
              </a>
            ))}
          </aside>
          <article className="legal-content" data-reveal>
            {config.sections.map(([id, title, body]) => (
              <section id={id} className="legal-section" key={id}>
                <h2>{title}</h2>
                <p>{body}</p>
              </section>
            ))}
          </article>
        </section>
      </main>
    </PageShell>
  );
}

function NotFoundPage() {
  return (
    <PageShell activePage="notFound">
      <main id="top" className="legal-page">
        <section className="legal-hero section is-visible" data-reveal>
          <span className="section-kicker">404</span>
          <h1>Page not found.</h1>
          <p>The page you opened is not available. Use the links below to continue.</p>
          <div className="hero-actions">
            <a className="primary-btn gradient-btn" href="/">
              Go home
            </a>
            <a className="secondary-btn" href="/contact">
              Contact us
            </a>
          </div>
        </section>
      </main>
    </PageShell>
  );
}

function PageLoader() {
  return <div className="route-loader" aria-label="Loading page" />;
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
