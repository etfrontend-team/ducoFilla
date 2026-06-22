export default function initPolicyToc() {
  const links = document.querySelectorAll(".policy-toc-link");
  if (!links.length) return;

  const sectionIds = Array.from(links).map((l) =>
    l.getAttribute("href").replace("#", "")
  );
  const sections = sectionIds
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  if (!sections.length) return;

  let activeId = null;

  function setActive(id) {
    if (id === activeId) return;
    activeId = id;
    links.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${id}`;
      link.classList.toggle("policy-toc-link--active", isActive);
    });
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    },
    {
      rootMargin: "-100px 0px -60% 0px",
      threshold: 0,
    }
  );

  sections.forEach((section) => observer.observe(section));

  setActive(sections[0].id);
}
