const DEFAULT_DURATION = 900;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function easeOutQuart(progress) {
  return 1 - Math.pow(1 - progress, 4);
}

export function smoothScrollTo(top, duration = DEFAULT_DURATION) {
  const startTop = window.scrollY;
  const distance = Math.max(0, top) - startTop;

  if (prefersReducedMotion() || Math.abs(distance) < 2) {
    window.scrollTo({ top: Math.max(0, top), behavior: "auto" });
    return;
  }

  const startTime = performance.now();

  const step = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeOutQuart(progress);

    window.scrollTo({ top: startTop + distance * easedProgress, behavior: "auto" });

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  };

  step(startTime);
}

export function smoothScrollToElement(target, duration = DEFAULT_DURATION) {
  if (!target) return;

  const headerHeight = document.querySelector("[data-site-header]")?.getBoundingClientRect().height || 0;
  const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight - 12;

  smoothScrollTo(targetTop, duration);
}
