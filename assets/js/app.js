import initHeader from "./header.js";
import initSwiper from "./swiper.js";
import initFaq from "./faq.js";
import initAnimations from "./animations.js";

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");
  if (header) initHeader();

  const swiper = document.querySelector(".swiper");
  if (swiper) initSwiper();

  const faqItem = document.querySelector(".faq-item");
  if (faqItem) initFaq();

  initAnimations();
});
