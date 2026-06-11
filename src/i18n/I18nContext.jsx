import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { translations } from "./translations.js";

const I18nContext = createContext(null);
const TRANSLATABLE_ATTRIBUTES = [
  "aria-label",
  "alt",
  "placeholder",
  "title",
  "data-monthly-note",
  "data-annual-note",
  "data-monthly-price",
  "data-annual-price",
];

function collectStringPairs(enValue, amValue, pairs) {
  if (typeof enValue === "string" && typeof amValue === "string") {
    pairs.push([enValue, amValue]);
    return;
  }

  if (Array.isArray(enValue) && Array.isArray(amValue)) {
    enValue.forEach((item, index) => collectStringPairs(item, amValue[index], pairs));
    return;
  }

  if (!enValue || !amValue || typeof enValue !== "object" || typeof amValue !== "object") return;

  Object.keys(enValue).forEach((key) => collectStringPairs(enValue[key], amValue[key], pairs));
}

function createStaticTextMaps() {
  const pairs = [];
  collectStringPairs(translations.en, translations.am, pairs);
  const enToAm = new Map();
  const amToEn = new Map();

  pairs.forEach(([enText, amText]) => {
    if (!enText || !amText) return;
    enToAm.set(enText, amText);
    amToEn.set(amText, enText);
  });

  return { enToAm, amToEn };
}

const staticTextMaps = createStaticTextMaps();

function getStoredLanguage() {
  try {
    return localStorage.getItem("language");
  } catch {
    return null;
  }
}

function setStoredLanguage(language) {
  try {
    localStorage.setItem("language", language);
  } catch {
  }
}

function resolveKey(obj, key) {
  if (!key) return "";
  const parts = key.split(".");
  let val = obj;
  for (const part of parts) {
    if (val == null || typeof val !== "object") return "";
    val = val[part];
  }
  return val ?? "";
}

export function I18nProvider({ children }) {
  const [lang, setLangState] = useState(() => getStoredLanguage() || "en");

  const setLanguage = useCallback((language) => {
    const next = language === "am" ? "am" : "en";
    setLangState(next);
    setStoredLanguage(next);
    document.documentElement.lang = next === "am" ? "am" : "en";
    document.documentElement.dataset.language = next;
  }, []);

  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === "language") setLangState(e.newValue || "en");
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "am" ? "am" : "en";
    document.documentElement.dataset.language = lang;
  }, [lang]);

  useEffect(() => {
    const sourceMap = lang === "am" ? staticTextMaps.enToAm : staticTextMaps.amToEn;
    const reverseMap = lang === "am" ? staticTextMaps.amToEn : staticTextMaps.enToAm;
    const root = document.getElementById("root");
    if (!root) return;

    const translateValue = (value) => {
      if (!value) return value;
      const direct = sourceMap.get(value);
      if (direct) return direct;
      return reverseMap.has(value) ? value : sourceMap.get(value.trim()) || value;
    };

    const applyStaticTranslations = () => {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      let node = walker.nextNode();

      while (node) {
        if (node.parentElement?.closest("[data-no-translate]")) {
          node = walker.nextNode();
          continue;
        }

        const value = node.nodeValue;
        const translated = translateValue(value);
        if (translated !== value) node.nodeValue = translated;
        node = walker.nextNode();
      }

      root.querySelectorAll("*").forEach((element) => {
        if (element.closest("[data-no-translate]")) return;

        TRANSLATABLE_ATTRIBUTES.forEach((attribute) => {
          if (!element.hasAttribute(attribute)) return;
          const value = element.getAttribute(attribute);
          const translated = translateValue(value);
          if (translated !== value) element.setAttribute(attribute, translated);
        });
      });
    };

    let frame = window.requestAnimationFrame(applyStaticTranslations);
    const scheduleTranslations = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(applyStaticTranslations);
    };

    const observer = new MutationObserver(scheduleTranslations);
    observer.observe(root, {
      childList: true,
      subtree: true,
    });

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [lang]);

  const t = useCallback(
    (key) => {
      if (!key) return "";
      const langData = translations[lang] || translations.en;
      const val = resolveKey(langData, key);
      if (val) return val;
      const fallback = resolveKey(translations.en, key);
      return fallback ?? key;
    },
    [lang],
  );

  return (
    <I18nContext.Provider value={{ lang, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslation() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useTranslation must be used within I18nProvider");
  return ctx;
}
