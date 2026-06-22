import initHeader from "./header.js";
import initSwiper, { initProductGallery } from "./swiper.js";
import initFaq from "./faq.js";
import initAnimations from "./animations.js";
import initAboutImgSync from "./aboutImgSync.js";
import initProductDetail from "./productDetail.js";
import initWork2Gallery from "./work2Gallery.js";
import initPolicyToc from "./policyToc.js";

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");
  if (header) initHeader();

  const swiper = document.querySelector(".swiper");
  if (swiper) initSwiper();

  const productGallery = document.querySelector(".pd-thumb-swiper");
  if (productGallery) initProductGallery();

  const faqItem = document.querySelector(".faq-item");
  if (faqItem) initFaq();

  initAnimations();

  const aboutContent = document.querySelector(".about-content");
  if (aboutContent) initAboutImgSync();

  const pdSection = document.querySelector(".pd-section");
  if (pdSection) initProductDetail();

  const work2Masonry = document.getElementById("work2Masonry");
  if (work2Masonry) initWork2Gallery();

  const policyToc = document.querySelector(".policy-toc-link");
  if (policyToc) initPolicyToc();
});
