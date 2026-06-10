import { useEffect } from "react";

const waves = [
  {
    offset: 0,
    amplitude: 70,
    frequency: 0.003,
    colorVar: "--wave-one",
    fallback: "rgba(125, 211, 252, 0.82)",
    opacity: 0.45,
  },
  {
    offset: Math.PI / 2,
    amplitude: 90,
    frequency: 0.0026,
    colorVar: "--wave-two",
    fallback: "rgba(167, 139, 250, 0.72)",
    opacity: 0.35,
  },
  {
    offset: Math.PI,
    amplitude: 60,
    frequency: 0.0034,
    colorVar: "--wave-three",
    fallback: "rgba(251, 113, 133, 0.62)",
    opacity: 0.28,
  },
  {
    offset: Math.PI * 1.5,
    amplitude: 80,
    frequency: 0.0022,
    colorVar: "--wave-four",
    fallback: "rgba(52, 211, 153, 0.42)",
    opacity: 0.24,
  },
  {
    offset: Math.PI * 2,
    amplitude: 55,
    frequency: 0.004,
    colorVar: "--wave-five",
    fallback: "rgba(238, 244, 255, 0.28)",
    opacity: 0.18,
  },
];

function readCssVar(styles, name, fallback) {
  return styles.getPropertyValue(name).trim() || fallback;
}

function getStoredTheme() {
  try {
    return localStorage.getItem("theme");
  } catch {
    return null;
  }
}

function setStoredTheme(theme) {
  try {
    localStorage.setItem("theme", theme);
  } catch {
    // Storage can fail in private contexts; the active document still updates.
  }
}

function setupCanvas(cleanups) {
  const canvas = document.querySelector("[data-wave-canvas]");
  const ctx = canvas?.getContext("2d");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const mouse = { x: 0, y: 0 };
  const targetMouse = { x: 0, y: 0 };
  let animationId = 0;
  let time = 0;

  if (!canvas || !ctx) return;

  const recenterMouse = () => {
    const center = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    mouse.x = center.x;
    mouse.y = center.y;
    targetMouse.x = center.x;
    targetMouse.y = center.y;
  };

  const resizeCanvas = () => {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(window.innerWidth * ratio);
    canvas.height = Math.floor(window.innerHeight * ratio);
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    recenterMouse();
  };

  const drawWave = (wave, themeStyles) => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const mouseInfluence = reduceMotion.matches ? 10 : 70;
    const influenceRadius = reduceMotion.matches ? 160 : 320;

    ctx.save();
    ctx.beginPath();

    for (let x = 0; x <= width; x += 4) {
      const dx = x - mouse.x;
      const dy = height / 2 - mouse.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const influence = Math.max(0, 1 - distance / influenceRadius);
      const mouseEffect =
        influence * mouseInfluence * Math.sin(time * 0.001 + x * 0.01 + wave.offset);
      const y =
        height / 2 +
        Math.sin(x * wave.frequency + time * 0.002 + wave.offset) * wave.amplitude +
        Math.sin(x * wave.frequency * 0.4 + time * 0.003) * (wave.amplitude * 0.45) +
        mouseEffect;

      if (x === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }

    const waveColor = readCssVar(themeStyles, wave.colorVar, wave.fallback);
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = waveColor;
    ctx.globalAlpha = wave.opacity;
    ctx.shadowBlur = 35;
    ctx.shadowColor = waveColor;
    ctx.stroke();
    ctx.restore();
  };

  const animate = () => {
    const smoothing = reduceMotion.matches ? 0.04 : 0.1;
    time += reduceMotion.matches ? 0.25 : 1;
    mouse.x += (targetMouse.x - mouse.x) * smoothing;
    mouse.y += (targetMouse.y - mouse.y) * smoothing;

    const themeStyles = getComputedStyle(document.documentElement);
    const gradient = ctx.createLinearGradient(0, 0, 0, window.innerHeight);
    gradient.addColorStop(0, readCssVar(themeStyles, "--canvas-top", "#080b12"));
    gradient.addColorStop(1, readCssVar(themeStyles, "--canvas-bottom", "#101626"));
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
    waves.forEach((wave) => drawWave(wave, themeStyles));
    animationId = requestAnimationFrame(animate);
  };

  const handleMouseMove = (event) => {
    targetMouse.x = event.clientX;
    targetMouse.y = event.clientY;
  };

  const handleReduceMotionChange = () => {
    cancelAnimationFrame(animationId);
    resizeCanvas();
    animate();
  };

  resizeCanvas();
  animate();
  window.addEventListener("resize", resizeCanvas);
  window.addEventListener("mousemove", handleMouseMove);
  window.addEventListener("mouseleave", recenterMouse);
  reduceMotion.addEventListener("change", handleReduceMotionChange);

  cleanups.push(() => {
    cancelAnimationFrame(animationId);
    window.removeEventListener("resize", resizeCanvas);
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseleave", recenterMouse);
    reduceMotion.removeEventListener("change", handleReduceMotionChange);
  });
}

function setupTheme(cleanups) {
  const themeToggle = document.querySelector("[data-theme-toggle]");
  const themeLabel = document.querySelector("[data-theme-label]");
  const themeMeta = document.querySelector("[data-theme-color]");
  const prefersDarkTheme = window.matchMedia("(prefers-color-scheme: dark)");

  const applyTheme = (theme, persist = true) => {
    const isDark = theme === "dark";
    document.documentElement.classList.toggle("dark", isDark);
    document.documentElement.classList.toggle("light", !isDark);
    document.documentElement.dataset.theme = theme;

    themeMeta?.setAttribute("content", isDark ? "#080b12" : "#f8fbff");

    if (themeToggle) {
      const nextTheme = isDark ? "light" : "dark";
      const label = `Switch to ${nextTheme} mode`;
      themeToggle.setAttribute("aria-pressed", String(isDark));
      themeToggle.setAttribute("aria-label", label);
      themeToggle.title = label;
    }

    if (themeLabel) {
      themeLabel.textContent = isDark ? "Switch to light mode" : "Switch to dark mode";
    }

    if (persist) setStoredTheme(theme);
  };

  const getActiveTheme = () => {
    const storedTheme = getStoredTheme();
    if (storedTheme === "light" || storedTheme === "dark") return storedTheme;
    return prefersDarkTheme.matches ? "dark" : "light";
  };

  const handleToggle = () => {
    const nextTheme = document.documentElement.classList.contains("dark") ? "light" : "dark";
    applyTheme(nextTheme);
  };

  const handleSystemTheme = () => {
    if (!getStoredTheme()) {
      applyTheme(prefersDarkTheme.matches ? "dark" : "light", false);
    }
  };

  applyTheme(getActiveTheme(), false);
  themeToggle?.addEventListener("click", handleToggle);
  prefersDarkTheme.addEventListener("change", handleSystemTheme);

  cleanups.push(() => {
    themeToggle?.removeEventListener("click", handleToggle);
    prefersDarkTheme.removeEventListener("change", handleSystemTheme);
  });
}

function setupMobileMenu(cleanups) {
  const siteHeader = document.querySelector("[data-site-header]");
  const mobileToggle = document.querySelector("[data-mobile-toggle]");
  const mobileMenu = document.querySelector("[data-mobile-menu]");
  if (!siteHeader || !mobileToggle || !mobileMenu) return;

  const closeMenu = () => {
    siteHeader.classList.remove("is-open");
    mobileToggle.setAttribute("aria-expanded", "false");
    mobileToggle.setAttribute("aria-label", "Open Menu");
  };

  const handleToggle = () => {
    const isOpen = siteHeader.classList.toggle("is-open");
    mobileToggle.setAttribute("aria-expanded", String(isOpen));
    mobileToggle.setAttribute("aria-label", isOpen ? "Close Menu" : "Open Menu");
  };

  const menuLinks = Array.from(mobileMenu.querySelectorAll("a"));
  mobileToggle.addEventListener("click", handleToggle);
  menuLinks.forEach((link) => link.addEventListener("click", closeMenu));

  cleanups.push(() => {
    mobileToggle.removeEventListener("click", handleToggle);
    menuLinks.forEach((link) => link.removeEventListener("click", closeMenu));
  });
}

function setupParentTabs(cleanups) {
  const tabs = Array.from(document.querySelectorAll("[data-parent-tab]"));
  const panels = Array.from(document.querySelectorAll("[data-parent-panel]"));
  if (!tabs.length || !panels.length) return;

  const activateTab = (tab) => {
    const target = tab.dataset.parentTab;

    tabs.forEach((item) => {
      const isActive = item === tab;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-selected", String(isActive));
      item.tabIndex = isActive ? 0 : -1;
    });

    panels.forEach((panel) => {
      const isActive = panel.dataset.parentPanel === target;
      panel.classList.toggle("is-active", isActive);
      panel.hidden = !isActive;
    });
  };

  const handlers = tabs.map((tab, index) => {
    const click = () => activateTab(tab);
    const keydown = (event) => {
      const direction = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
      if (!direction) return;

      event.preventDefault();
      const nextTab = tabs[(index + direction + tabs.length) % tabs.length];
      nextTab.focus();
      activateTab(nextTab);
    };

    tab.tabIndex = tab.classList.contains("is-active") ? 0 : -1;
    tab.addEventListener("click", click);
    tab.addEventListener("keydown", keydown);
    return { tab, click, keydown };
  });

  cleanups.push(() => {
    handlers.forEach(({ tab, click, keydown }) => {
      tab.removeEventListener("click", click);
      tab.removeEventListener("keydown", keydown);
    });
  });
}

function setupPricingToggle(cleanups) {
  const pricingSection = document.getElementById("pricing");
  const pricingSwitch = document.getElementById("pricing-switch");
  if (!pricingSection || !pricingSwitch) return;

  const toggleLabels = Array.from(
    pricingSwitch.closest(".pricing-toggle")?.querySelectorAll(".toggle-label") || [],
  );
  const priceEls = Array.from(
    pricingSection.querySelectorAll("[data-monthly-price][data-annual-price]"),
  );
  const noteEls = Array.from(
    pricingSection.querySelectorAll("[data-monthly-note][data-annual-note]"),
  );
  const badgeEls = Array.from(pricingSection.querySelectorAll("[data-billing-badge]"));
  const billingOptions = Array.from(pricingSection.querySelectorAll("[data-billing-option]"));

  const updatePricing = (isAnnual) => {
    pricingSection.classList.toggle("is-annual", isAnnual);
    priceEls.forEach((el) => {
      el.textContent = isAnnual ? el.dataset.annualPrice : el.dataset.monthlyPrice;
    });
    noteEls.forEach((el) => {
      el.textContent = isAnnual ? el.dataset.annualNote : el.dataset.monthlyNote;
    });
    badgeEls.forEach((el) => {
      el.textContent = isAnnual ? "First-year price" : "Monthly";
    });
    billingOptions.forEach((option) => {
      option.classList.toggle(
        "is-active",
        option.dataset.billingOption === (isAnnual ? "annual" : "monthly"),
      );
    });
    toggleLabels.forEach((label, index) => {
      label.classList.toggle("is-active", isAnnual ? index === 1 : index === 0);
    });
  };

  const handleChange = () => updatePricing(pricingSwitch.checked);
  pricingSwitch.addEventListener("change", handleChange);
  updatePricing(pricingSwitch.checked);

  cleanups.push(() => pricingSwitch.removeEventListener("change", handleChange));
}

function setupContactForm(cleanups) {
  const form = document.querySelector("[data-contact-form]");
  if (!form) return;

  const status = form.querySelector("[data-contact-status]");
  const submit = form.querySelector("button[type='submit']");
  const submitLabel = form.querySelector("[data-contact-submit-label]");
  const defaultLabel = submitLabel?.textContent || "Send message";

  const setStatus = (message, state = "idle") => {
    if (!status) return;
    status.textContent = message;
    status.dataset.state = state;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    submit?.setAttribute("disabled", "true");
    if (submitLabel) submitLabel.textContent = "Sending...";
    setStatus("", "idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.error || "Could not send the message.");
      }

      form.reset();
      setStatus("Message sent. We will reply as soon as possible.", "success");
    } catch (error) {
      setStatus(error.message || "Could not send the message. Please try again.", "error");
    } finally {
      submit?.removeAttribute("disabled");
      if (submitLabel) submitLabel.textContent = defaultLabel;
    }
  };

  form.addEventListener("submit", handleSubmit);
  cleanups.push(() => form.removeEventListener("submit", handleSubmit));
}

function setupReveals(cleanups) {
  const revealItems = Array.from(document.querySelectorAll("[data-reveal]"));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (!("IntersectionObserver" in window) || reduceMotion.matches) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const revealVisibleItems = () => {
    revealItems.forEach((item) => {
      const rect = item.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight * 0.92 && rect.bottom > window.innerHeight * 0.08;

      if (isVisible) item.classList.add("is-visible");
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.16 },
  );

  revealItems.forEach((item) => observer.observe(item));
  revealVisibleItems();
  window.addEventListener("scroll", revealVisibleItems, { passive: true });
  window.addEventListener("resize", revealVisibleItems);

  cleanups.push(() => {
    observer.disconnect();
    window.removeEventListener("scroll", revealVisibleItems);
    window.removeEventListener("resize", revealVisibleItems);
  });
}

export function useLandingInteractions(page) {
  useEffect(() => {
    const cleanups = [];

    setupTheme(cleanups);
    setupMobileMenu(cleanups);
    setupParentTabs(cleanups);
    setupPricingToggle(cleanups);
    setupContactForm(cleanups);
    setupReveals(cleanups);
    setupCanvas(cleanups);

    if (window.location.hash) {
      requestAnimationFrame(() => {
        document.querySelector(window.location.hash)?.scrollIntoView();
      });
    } else {
      window.scrollTo({ top: 0 });
    }

    return () => cleanups.forEach((cleanup) => cleanup());
  }, [page]);
}
