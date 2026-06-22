import 'glightbox';

const BASE = "../assets/images/work/IMG-20180719-";

const MORE_IMAGES = [
  { num: "WA0068", alt: "3D printed sculpture with DuchoFilla PLA filament", ratio: "work2-masonry-item--short", w: 600, h: 450 },
  { num: "WA0071", alt: "3D printed figurine made with DuchoFilla ABS filament", ratio: "work2-masonry-item--xtall", w: 600, h: 900 },
  { num: "WA0074", alt: "Creative print made with DuchoFilla flexible filament", ratio: "work2-masonry-item--tall", w: 600, h: 800 },
  { num: "WA0077", alt: "3D printed mug using DuchoFilla PLA Silk filament", ratio: "work2-masonry-item--square", w: 600, h: 600 },
  { num: "WA0063", alt: "Art piece printed with DuchoFilla PLA filament", ratio: "work2-masonry-item--xtall", w: 600, h: 900 },
  { num: "WA0066", alt: "3D printed model made with DuchoFilla ABS filament", ratio: "work2-masonry-item--short", w: 600, h: 450 },
  { num: "WA0069", alt: "Character figurine 3D printed with DuchoFilla filament", ratio: "work2-masonry-item--tall", w: 600, h: 800 },
  { num: "WA0072", alt: "Detailed 3D print created with DuchoFilla filament", ratio: "work2-masonry-item--square", w: 600, h: 600 },
];

function wrapImagesWithLinks(container) {
  container.querySelectorAll(".work2-masonry-item img").forEach((img) => {
    if (img.parentElement.tagName === "A") return;
    const a = document.createElement("a");
    a.href = img.src;
    a.className = "glightbox";
    a.setAttribute("data-gallery", "work2-gallery");
    a.setAttribute("data-description", img.alt);
    img.parentElement.insertBefore(a, img);
    a.appendChild(img);
  });
}

export default function initWork2Gallery() {
  const masonry = document.getElementById("work2Masonry");
  const btn = document.getElementById("work2ScrollBtn");
  const fade = document.getElementById("work2Fade");

  if (!masonry || !btn) return;

  wrapImagesWithLinks(masonry);

  const lightbox = window.GLightbox
    ? window.GLightbox({
        selector: ".glightbox",
        touchNavigation: true,
        loop: true,
        autoplayVideos: false,
        keyboardNavigation: true,
      })
    : null;

  let loaded = false;

  btn.addEventListener("click", () => {
    if (loaded) return;

    MORE_IMAGES.forEach(({ num, alt, ratio, w, h }) => {
      const div = document.createElement("div");
      div.className = `work2-masonry-item ${ratio}`;

      const a = document.createElement("a");
      a.href = `${BASE}${num}.jpg`;
      a.className = "glightbox";
      a.setAttribute("data-gallery", "work2-gallery");
      a.setAttribute("data-description", alt);

      const img = document.createElement("img");
      img.src = `${BASE}${num}.jpg`;
      img.alt = alt;
      img.width = w;
      img.height = h;
      img.loading = "lazy";

      a.appendChild(img);
      div.appendChild(a);
      masonry.appendChild(div);
    });

    if (lightbox) lightbox.reload();

    loaded = true;
    btn.parentElement.style.display = "none";
    if (fade) fade.style.display = "none";
  });
}
