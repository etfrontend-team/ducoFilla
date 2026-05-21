export default function initHeader() {
  const header = document.querySelector("header");

  // Scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Mobile nav elements
  const menuToggle = document.querySelector(".header-menu-toggle");
  const mobileNav = document.querySelector(".mobile-nav");
  const mobileNavOverlay = document.querySelector(".mobile-nav-overlay");
  const mobileNavClose = document.getElementById("mobileNavClose");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

  function closeMobileNav() {
    mobileNav.classList.remove("active");
    mobileNavOverlay.classList.remove("active");
    menuToggle.classList.remove("active");
  }

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      mobileNav.classList.toggle("active");
      mobileNavOverlay.classList.toggle("active");
      menuToggle.classList.toggle("active");
    });
  }

  if (mobileNavClose) {
    mobileNavClose.addEventListener("click", () => {
      closeMobileNav();
    });
  }

  if (mobileNavOverlay) {
    mobileNavOverlay.addEventListener("click", () => {
      closeMobileNav();
    });
  }

  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMobileNav();
    });
  });
}

// Autoplay CTA video only on non-mobile (saves bandwidth)
const video = document.getElementById('ctaVideo');
if (video && window.matchMedia('(min-width: 768px)').matches) {
  const videoObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          video.play();
          videoObserver.unobserve(video);
        }
      });
    },
    { threshold: 0.3 }
  );
  videoObserver.observe(video);
}
