/**
 * Subtle scroll reveals + light stagger for landing blocks.
 */

const DEFAULT_IO = {
  root: null,
  rootMargin: "0px 0px -10% 0px",
  threshold: 0.08,
};

/**
 * @param {Element} root
 * @param {{ reducedMotion: boolean }} opts
 * @returns {() => void}
 */
export function initLandingReveal(root, { reducedMotion }) {
  if (reducedMotion) {
    root.querySelectorAll(".bb-landing-reveal").forEach((el) => el.classList.add("is-in-view"));
    return () => {};
  }

  const els = root.querySelectorAll(".bb-landing-reveal");
  if (!els.length) return () => {};

  const obs = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add("is-in-view");
      obs.unobserve(entry.target);
    }
  }, DEFAULT_IO);

  els.forEach((el) => obs.observe(el));

  return () => {
    obs.disconnect();
  };
}
