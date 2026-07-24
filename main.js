// Theme ---------------------------------------------------------------------
const root = document.documentElement;
const themeToggle = document.querySelector("#theme-toggle");

function updateThemeButton() {
  if (!themeToggle) return;

  const isLight = root.dataset.theme === "light";
  const icon = themeToggle.querySelector(".theme-icon");
  const text = themeToggle.querySelector(".theme-text");

  themeToggle.setAttribute(
    "aria-label",
    isLight ? "Switch to dark mode" : "Switch to light mode"
  );

  if (icon) icon.textContent = isLight ? "☾" : "☀";
  if (text) text.textContent = isLight ? "Dark" : "Light";
}

updateThemeButton();

themeToggle?.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "light" ? "dark" : "light";
  root.dataset.theme = nextTheme;
  localStorage.setItem("saima-portfolio-theme", nextTheme);
  updateThemeButton();
});

// Page scroll progress ------------------------------------------------------
const scrollProgress = document.querySelector(".scroll-progress");

function updateScrollProgress() {
  if (!scrollProgress) return;

  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
  scrollProgress.style.transform = `scaleX(${progress})`;
}

window.addEventListener("scroll", updateScrollProgress, { passive: true });
updateScrollProgress();

// Hero flip card ------------------------------------------------------------
const flipCard = document.querySelector("#creative-card");
const flipButtons = document.querySelectorAll("[data-flip-button]");

flipButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (!flipCard) return;

    const isFlipped = flipCard.classList.toggle("is-flipped");
    flipButtons.forEach((item) => {
      item.setAttribute("aria-pressed", String(isFlipped));
    });
  });
});

// Reveal items --------------------------------------------------------------
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealItems = document.querySelectorAll(".reveal");

if (prefersReducedMotion || !("IntersectionObserver" in window)) {
  revealItems.forEach((item) => item.classList.add("visible"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
}

// Current navigation section ----------------------------------------------
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

if (sections.length && navLinks.length && "IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        navLinks.forEach((link) => link.classList.remove("active"));
        document
          .querySelector(`.nav-links a[href="#${entry.target.id}"]`)
          ?.classList.add("active");
      });
    },
    { rootMargin: "-35% 0px -55% 0px" }
  );

  sections.forEach((section) => sectionObserver.observe(section));
}

// Subtle cursor spotlight in the hero --------------------------------------
const spotlightArea = document.querySelector("[data-spotlight]");

if (spotlightArea && !prefersReducedMotion) {
  spotlightArea.addEventListener("pointermove", (event) => {
    const bounds = spotlightArea.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;

    spotlightArea.style.setProperty("--spotlight-x", `${x}px`);
    spotlightArea.style.setProperty("--spotlight-y", `${y}px`);
  });
}

// Small perspective tilt ---------------------------------------------------
const tiltItems = document.querySelectorAll("[data-tilt]");

if (!prefersReducedMotion && window.matchMedia("(pointer: fine)").matches) {
  tiltItems.forEach((item) => {
    item.addEventListener("pointermove", (event) => {
      const bounds = item.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;

      item.style.setProperty("--rotate-x", `${y * -3}deg`);
      item.style.setProperty("--rotate-y", `${x * 4}deg`);
    });

    item.addEventListener("pointerleave", () => {
      item.style.setProperty("--rotate-x", "0deg");
      item.style.setProperty("--rotate-y", "0deg");
    });
  });
}

// Gallery filtering --------------------------------------------------------
const filterButtons = document.querySelectorAll(".filter-button");
const galleryItems = document.querySelectorAll("[data-category]");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    galleryItems.forEach((item) => {
      const shouldShow =
        selectedFilter === "all" || item.dataset.category === selectedFilter;

      item.hidden = !shouldShow;
    });
  });
});

// Image lightbox ------------------------------------------------------------
const lightbox = document.querySelector("#lightbox");
const lightboxImage = lightbox?.querySelector(".lightbox-image");
const lightboxClose = lightbox?.querySelector(".lightbox-close");
const lightboxTriggers = document.querySelectorAll("[data-lightbox]");
let lastFocusedElement = null;

function closeLightbox() {
  if (!lightbox || !lightboxImage) return;

  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
  document.body.classList.remove("no-scroll");
  lastFocusedElement?.focus();
}

lightboxTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const image = trigger.querySelector("img");
    if (!image || !lightbox || !lightboxImage) return;

    lastFocusedElement = trigger;
    lightboxImage.src = image.currentSrc || image.src;
    lightboxImage.alt = image.alt;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
    lightboxClose?.focus();
  });
});

lightboxClose?.addEventListener("click", closeLightbox);

lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox?.classList.contains("open")) {
    closeLightbox();
  }
});
