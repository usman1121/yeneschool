import { useMemo } from "react";
import homeHtml from "./content/home.html?raw";
import modulesHtml from "./content/modules.html?raw";
import contactHtml from "./content/contact.html?raw";
import { useLandingInteractions } from "./useLandingInteractions.js";

const getPageFromRoute = () => {
  const pathname = window.location.pathname.replace(/\/+$/, "");
  if (pathname.endsWith("/modules") || pathname.endsWith("/modules.html")) return "modules";
  if (pathname.endsWith("/contact") || pathname.endsWith("/contact.html")) return "contact";
  return "home";
};

export default function App() {
  const page = getPageFromRoute();
  const html = useMemo(() => {
    if (page === "modules") return modulesHtml;
    if (page === "contact") return contactHtml;
    return homeHtml;
  }, [page]);

  useLandingInteractions(page);

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
