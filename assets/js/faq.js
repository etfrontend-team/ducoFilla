export default function initFaq() {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    item.addEventListener("click", () => {
      const isActive = item.classList.contains("active");
      const answer = item.querySelector(".faq-answer");

      // Close all items
      faqItems.forEach((otherItem) => {
        otherItem.classList.remove("active");
        const otherAnswer = otherItem.querySelector(".faq-answer");
        if (otherAnswer) {
          otherAnswer.style.display = "none";
        }
      });

      // Open clicked item if it was not active
      if (!isActive) {
        item.classList.add("active");
        if (answer) {
          answer.style.display = "block";
        }
      }
    });
  });
}
