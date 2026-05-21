export default function initSwiper() {
  const productSwiperEl = document.querySelector(".product-swiper");
  if (productSwiperEl) {
    new Swiper(".product-swiper", {
      slidesPerView: 1,
      spaceBetween: 24,
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
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
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
