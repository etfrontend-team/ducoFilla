import Swiper from 'swiper';

const equalizeProductCards = () => {
  const allCards = document.querySelectorAll(".product-swiper .swiper-slide .product-card");
  allCards.forEach((c) => (c.style.height = ""));

  const origCards = document.querySelectorAll(
    ".product-swiper .swiper-slide:not(.swiper-slide-duplicate) .product-card"
  );
  let max = 0;
  origCards.forEach((c) => {
    if (c.offsetHeight > max) max = c.offsetHeight;
  });

  allCards.forEach((c) => (c.style.height = max + "px"));
};

export function initProductGallery() {
  const thumbEl = document.querySelector('.pd-thumb-swiper');
  const mainEl = document.querySelector('.pd-main-swiper');
  if (!thumbEl || !mainEl) return;

  let thumbSwiper = null;
  let mainSwiper = null;

  const isDesktop = () => window.innerWidth >= 1025;

  const build = () => {
    if (thumbSwiper) { thumbSwiper.destroy(true, true); thumbSwiper = null; }
    if (mainSwiper) { mainSwiper.destroy(true, true); mainSwiper = null; }

    thumbSwiper = new Swiper('.pd-thumb-swiper', {
      direction: isDesktop() ? 'vertical' : 'horizontal',
      slidesPerView: 'auto',
      spaceBetween: 10,
      watchSlidesProgress: true,
      freeMode: false,
    });

    mainSwiper = new Swiper('.pd-main-swiper', {
      slidesPerView: 1,
      spaceBetween: 0,
      navigation: {
        nextEl: '.pd-nav-next',
        prevEl: '.pd-nav-prev',
      },
      thumbs: {
        swiper: thumbSwiper,
      },
    });
  };

  build();

  let resizeTimer;
  let prevDesktop = isDesktop();
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const nowDesktop = isDesktop();
      if (nowDesktop !== prevDesktop) {
        prevDesktop = nowDesktop;
        build();
      }
    }, 200);
  });
}

export default function initSwiper() {
  const productSwiperEl = document.querySelector(".product-swiper");
  if (productSwiperEl) {
    new Swiper(".product-swiper", {
      slidesPerView: 1,
      spaceBetween: 32,
      loop: true,
      pagination: {
        el: ".product-swiper .swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".product-nav-next",
        prevEl: ".product-nav-prev",
      },
      breakpoints: {
         0: { slidesPerView: 1.5 },
        768: { slidesPerView: 2.5 },
        1024: { slidesPerView: 3 },
        1441: { slidesPerView: 4 },
      },
      on: {
        init: equalizeProductCards,
        resize: equalizeProductCards,
      },
    });
  }

  const testimonialsSwiperEl = document.querySelector(".testimonials-swiper");
  if (testimonialsSwiperEl) {
    new Swiper(".testimonials-swiper", {
      slidesPerView: 1,
      spaceBetween: 32,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".testimonials-swiper .swiper-pagination",
        clickable: true,
      },
    });
  }
}
