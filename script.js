(() => {
  // Footer year
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Nav border once the page is scrolled
  const nav = document.querySelector(".nav");
  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Light/dark toggle: follows the system until the visitor picks a theme.
  // Picking the theme the system already uses goes back to following it.
  const root = document.documentElement;
  const toggle = document.querySelector(".theme-toggle");
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)");
  const isDark = () => (root.dataset.theme ? root.dataset.theme === "dark" : systemDark.matches);
  const barColor = (dark) => (dark ? "#0a0a0b" : "#ffffff");
  const syncTheme = () => {
    toggle.setAttribute("aria-label", isDark() ? "Switch to light mode" : "Switch to dark mode");
    // With no picked theme, each meta keeps the color for its own media query
    document.querySelectorAll('meta[name="theme-color"]').forEach((m) => {
      m.content = barColor(root.dataset.theme ? isDark() : m.media.includes("dark"));
    });
  };
  if (toggle) {
    toggle.addEventListener("click", () => {
      const dark = !isDark();
      const theme = dark === systemDark.matches ? null : dark ? "dark" : "light";
      if (theme) root.dataset.theme = theme;
      else delete root.dataset.theme;
      try {
        if (theme) localStorage.setItem("theme", theme);
        else localStorage.removeItem("theme");
      } catch (e) {}
      syncTheme();
    });
    systemDark.addEventListener("change", syncTheme);
    syncTheme();
  }

  if (!("IntersectionObserver" in window)) return;

  // Fade sections in as they enter the viewport
  const revealTargets = document.querySelectorAll(".section__head, .about, .card, .toolbox__group, .hobbies li, .contact");
  revealTargets.forEach((el) => el.classList.add("reveal"));
  const revealer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -10% 0px" }
  );
  revealTargets.forEach((el) => revealer.observe(el));

  // Highlight the nav link for the section in view
  const links = new Map(
    [...document.querySelectorAll(".nav__links a")].map((a) => [a.getAttribute("href").slice(1), a])
  );
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const link = links.get(entry.target.id);
        if (link) link.classList.toggle("is-active", entry.isIntersecting);
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  links.forEach((_, id) => {
    const section = document.getElementById(id);
    if (section) spy.observe(section);
  });
})();
