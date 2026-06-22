export default function initProductDetail() {
  // Tabs
  const tabBtns = document.querySelectorAll('.pd-tab-btn');
  const tabPanels = document.querySelectorAll('.pd-tab-panel');

  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;

      tabBtns.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      tabPanels.forEach((p) => p.classList.remove('active'));

      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const panel = document.getElementById(`tab-${target}`);
      if (panel) panel.classList.add('active');
    });
  });

  // Quantity
  const minusBtn = document.querySelector('.pd-qty-minus');
  const plusBtn = document.querySelector('.pd-qty-plus');
  const qtyInput = document.getElementById('pd-quantity');

  if (minusBtn && plusBtn && qtyInput) {
    minusBtn.addEventListener('click', () => {
      const val = parseInt(qtyInput.value, 10);
      if (val > 1) qtyInput.value = val - 1;
    });

    plusBtn.addEventListener('click', () => {
      const val = parseInt(qtyInput.value, 10);
      qtyInput.value = val + 1;
    });
  }

  // External zoom (desktop only, Kalles-style)
  const mainSwiperEl = document.querySelector('.pd-main-swiper');
  const zoomPanel = document.getElementById('pdZoomPanel');

  if (mainSwiperEl && zoomPanel) {
    const MAGNIFY = 2;

    const getActiveImg = () =>
      mainSwiperEl.querySelector('.swiper-slide-active .pd-main-img');

    const positionPanel = () => {
      const swRect = mainSwiperEl.getBoundingClientRect();
      const galleryRect = mainSwiperEl.closest('.pd-gallery').getBoundingClientRect();
      const size = swRect.width;
      const offsetLeft = swRect.left - galleryRect.left + size + 16;
      const offsetTop = swRect.top - galleryRect.top;
      zoomPanel.style.width = size + 'px';
      zoomPanel.style.height = (size / 1.25) + 'px';
      zoomPanel.style.left = offsetLeft + 'px';
      zoomPanel.style.top = offsetTop + 'px';
    };

    mainSwiperEl.addEventListener('mouseenter', () => {
      if (window.innerWidth < 1025) return;
      const img = getActiveImg();
      if (!img) return;
      positionPanel();
      zoomPanel.style.backgroundImage = `url(${img.src})`;
      zoomPanel.style.backgroundSize = `${MAGNIFY * 100}%`;
      zoomPanel.classList.add('active');
    });

    mainSwiperEl.addEventListener('mouseleave', () => {
      zoomPanel.classList.remove('active');
    });

    mainSwiperEl.addEventListener('mousemove', (e) => {
      if (!zoomPanel.classList.contains('active')) return;
      // Update image src in case slide changed
      const img = getActiveImg();
      if (img) zoomPanel.style.backgroundImage = `url(${img.src})`;

      const rect = mainSwiperEl.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      // background-size: 200% → position 0–100% maps correctly to the zoomed area
      zoomPanel.style.backgroundPosition = `${x * 100}% ${y * 100}%`;
    });
  }
}
