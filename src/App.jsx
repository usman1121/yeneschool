import { useMemo } from "react";
import homeHtml from "./content/home.html?raw";
import modulesHtml from "./content/modules.html?raw";
import contactHtml from "./content/contact.html?raw";
import privacyHtml from "./content/privacy.html?raw";
import termsHtml from "./content/terms.html?raw";
import cookiePolicyHtml from "./content/cookie-policy.html?raw";
import bookHtml from "./content/book.html?raw";
import { useLandingInteractions } from "./useLandingInteractions.js";

const getPageFromRoute = () => {
  const pathname = window.location.pathname.replace(/\/+$/, "");
  if (pathname.endsWith("/modules") || pathname.endsWith("/modules.html")) return "modules";
  if (pathname.endsWith("/contact") || pathname.endsWith("/contact.html")) return "contact";
  if (pathname.endsWith("/privacy") || pathname.endsWith("/privacy.html")) return "privacy";
  if (pathname.endsWith("/terms") || pathname.endsWith("/terms.html")) return "terms";
  if (pathname.endsWith("/cookie-policy") || pathname.endsWith("/cookie-policy.html")) return "cookiePolicy";
  if (pathname.endsWith("/book") || pathname.endsWith("/book.html")) return "book";
  return "home";
};

export default function App() {
  const page = getPageFromRoute();
  const html = useMemo(() => {
    if (page === "modules") return modulesHtml;
    if (page === "contact") return contactHtml;
    if (page === "privacy") return privacyHtml;
    if (page === "terms") return termsHtml;
    if (page === "cookiePolicy") return cookiePolicyHtml;
    if (page === "book") return bookHtml;
    return homeHtml;
  }, [page]);

  useLandingInteractions(page);

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
