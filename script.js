/* ═══════════════════════════════════════════════════
   PHILADELPHIA CHIKALIMBA — PORTFOLIO JAVASCRIPT
   script.js
   ═══════════════════════════════════════════════════ */

"use strict";

/* ── CONSTANTS ── */
const NAVBAR     = document.getElementById("navbar");
const HAMBURGER  = document.getElementById("hamburger");
const NAV_LINKS  = document.querySelectorAll(".nav-links a");
const SECTIONS   = document.querySelectorAll("section[id]");

/* ═══════════════════════════════════════════════════
   1. NAVBAR — scroll-aware background
   ═══════════════════════════════════════════════════ */
function handleNavScroll() {
  if (window.scrollY > 60) {
    NAVBAR.classList.add("scrolled");
  } else {
    NAVBAR.classList.remove("scrolled");
  }
}

window.addEventListener("scroll", handleNavScroll, { passive: true });
handleNavScroll(); // run once on load

/* ═══════════════════════════════════════════════════
   2. MOBILE MENU
   ═══════════════════════════════════════════════════ */

// Create mobile menu overlay dynamically
function buildMobileMenu() {
  const overlay = document.createElement("div");
  overlay.classList.add("mobile-menu");
  overlay.id = "mobileMenu";

  const links = [
    { href: "#home",         label: "Home"         },
    { href: "#skills",       label: "Skills"       },
    { href: "#projects",     label: "Projects"     },
    { href: "#achievements", label: "Achievements" },
    { href: "#difference",   label: "Why Me"       },
    { href: "#contact",      label: "Contact"      },
  ];

  links.forEach(({ href, label }) => {
    const a = document.createElement("a");
    a.href = href;
    a.textContent = label;
    a.addEventListener("click", closeMobileMenu);
    overlay.appendChild(a);
  });

  document.body.appendChild(overlay);
  return overlay;
}

const mobileMenu = buildMobileMenu();
let menuOpen = false;

function openMobileMenu() {
  menuOpen = true;
  mobileMenu.classList.add("open");
  document.body.style.overflow = "hidden";
  animateHamburger(true);
}

function closeMobileMenu() {
  menuOpen = false;
  mobileMenu.classList.remove("open");
  document.body.style.overflow = "";
  animateHamburger(false);
}

function animateHamburger(open) {
  const spans = HAMBURGER.querySelectorAll("span");
  if (open) {
    spans[0].style.cssText = "transform: rotate(45deg) translate(5px, 5px);";
    spans[1].style.cssText = "opacity: 0; transform: translateX(-8px);";
    spans[2].style.cssText = "transform: rotate(-45deg) translate(5px, -5px);";
  } else {
    spans.forEach(s => (s.style.cssText = ""));
  }
}

HAMBURGER.addEventListener("click", () => {
  menuOpen ? closeMobileMenu() : openMobileMenu();
});

// Close menu on Escape key
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && menuOpen) closeMobileMenu();
});

/* ═══════════════════════════════════════════════════
   3. ACTIVE NAV LINK — highlights current section
   ═══════════════════════════════════════════════════ */
function setActiveLink() {
  let current = "";
  const scrollY = window.scrollY + 120;

  SECTIONS.forEach(section => {
    const top    = section.offsetTop;
    const height = section.offsetHeight;
    if (scrollY >= top && scrollY < top + height) {
      current = section.id;
    }
  });

  NAV_LINKS.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", setActiveLink, { passive: true });
setActiveLink();

/* ═══════════════════════════════════════════════════
   4. SCROLL REVEAL — IntersectionObserver
   ═══════════════════════════════════════════════════ */
const revealTargets = document.querySelectorAll(
  ".skill-card, .project-item, .difference-card, .contact-card, .timeline-item, .ach-badge"
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px",
  }
);

revealTargets.forEach(el => revealObserver.observe(el));

/* ═══════════════════════════════════════════════════
   5. SMOOTH SCROLL — anchor links
   ═══════════════════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();

    const offset     = NAVBAR.offsetHeight + 20;
    const targetTop  = target.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({ top: targetTop, behavior: "smooth" });
  });
});

/* ═══════════════════════════════════════════════════
   6. BACK TO TOP
   ═══════════════════════════════════════════════════ */
const backToTop = document.querySelector(".back-to-top");
if (backToTop) {
  backToTop.addEventListener("click", e => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ═══════════════════════════════════════════════════
   7. EMAIL COPY — click to copy email
   ═══════════════════════════════════════════════════ */
const emailCard = document.getElementById("email-card");
if (emailCard) {
  const email = "phil.chikalimba@gmail.com";

  emailCard.addEventListener("click", function (e) {
    // Only intercept if NOT going to mail client on desktop
    // On mobile, let mailto: handle naturally
    if (navigator.clipboard && window.isSecureContext) {
      e.preventDefault();
      navigator.clipboard.writeText(email).then(() => {
        showToast("Email address copied!");
      }).catch(() => {
        // Fallback: let native mailto handle it
        window.location.href = `mailto:${email}`;
      });
    }
  });
}

/* ═══════════════════════════════════════════════════
   8. TOAST NOTIFICATION
   ═══════════════════════════════════════════════════ */
function showToast(message) {
  // Remove any existing toast
  const existing = document.getElementById("toast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.id = "toast";
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    background: #4a2e1a;
    color: #f5ede0;
    padding: 0.9rem 1.6rem;
    border-radius: 4px;
    font-family: 'Jost', sans-serif;
    font-size: 0.85rem;
    letter-spacing: 0.05em;
    border-left: 3px solid #c9933a;
    box-shadow: 0 10px 40px rgba(0,0,0,0.25);
    z-index: 9999;
    opacity: 0;
    transform: translateY(16px);
    transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
  `;

  document.body.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      toast.style.opacity = "1";
      toast.style.transform = "translateY(0)";
    });
  });

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(16px)";
    setTimeout(() => toast.remove(), 350);
  }, 2800);
}

/* ═══════════════════════════════════════════════════
   9. PHOTO PARALLAX — subtle movement on scroll
   ═══════════════════════════════════════════════════ */
const heroPhoto = document.querySelector(".hero-photo-wrap");

function handleParallax() {
  if (!heroPhoto) return;
  const scrolled = window.scrollY;
  const rate     = scrolled * 0.12;
  heroPhoto.style.transform = `translateY(${rate}px)`;
}

window.addEventListener("scroll", handleParallax, { passive: true });

/* ═══════════════════════════════════════════════════
   10. PROJECT ITEM HOVER — number color syncs to gold
   ═══════════════════════════════════════════════════ */
document.querySelectorAll(".project-item").forEach(item => {
  item.addEventListener("mouseenter", () => {
    const num = item.querySelector(".project-number");
    if (num) num.style.color = "var(--gold)";
  });
  item.addEventListener("mouseleave", () => {
    const num = item.querySelector(".project-number");
    if (num) num.style.color = "";
  });
});

/* ═══════════════════════════════════════════════════
   11. SECTION TITLE COUNTER ANIMATION
       (Animates numbers up when scrolled into view)
   ═══════════════════════════════════════════════════ */
// Tracks total stat counts (optional fun element if added later)
// Currently used to stagger project numbers
function staggerProjectNumbers() {
  const items = document.querySelectorAll(".project-item");
  items.forEach((item, i) => {
    item.style.transitionDelay = `${i * 0.12}s`;
  });
}

staggerProjectNumbers();

/* ═══════════════════════════════════════════════════
   12. PAGE LOAD — add class to body for CSS hooks
   ═══════════════════════════════════════════════════ */
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

/* ═══════════════════════════════════════════════════
   13. CURSOR GLOW — subtle golden glow that follows cursor
   ═══════════════════════════════════════════════════ */
const cursorGlow = document.createElement("div");
cursorGlow.style.cssText = `
  position: fixed;
  width: 350px; height: 350px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(201,147,58,0.06) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
  transform: translate(-50%, -50%);
  transition: transform 0.08s ease, opacity 0.3s ease;
  opacity: 0;
`;
document.body.appendChild(cursorGlow);

document.addEventListener("mousemove", e => {
  cursorGlow.style.left = `${e.clientX}px`;
  cursorGlow.style.top  = `${e.clientY}px`;
  cursorGlow.style.opacity = "1";
});

document.addEventListener("mouseleave", () => {
  cursorGlow.style.opacity = "0";
});
