export default function initAboutImgSync() {
  const content = document.querySelector(".about-content");
  const imgWrapper = document.querySelector(".about-img-wrapper");
  if (!content || !imgWrapper) return;

  const sync = () => {
    imgWrapper.style.height = content.offsetHeight + "px";
  };

  sync();

  const ro = new ResizeObserver(sync);
  ro.observe(content);
}

