import { useMemo } from "react";
import homeHtml from "./content/home.html?raw";
import modulesHtml from "./content/modules.html?raw";
import { useLandingInteractions } from "./useLandingInteractions.js";

const isModulesRoute = () => {
  const pathname = window.location.pathname.replace(/\/+$/, "");
  return pathname.endsWith("/modules") || pathname.endsWith("/modules.html");
};

export default function App() {
  const page = isModulesRoute() ? "modules" : "home";
  const html = useMemo(() => (page === "modules" ? modulesHtml : homeHtml), [page]);

  useLandingInteractions(page);

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
