// Smooth scroll effect
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});

// Feedback animation delay
const feedbackCards = document.querySelectorAll(".feedback-card");
feedbackCards.forEach((card, index) => {
  card.style.animationDelay = `${index * 0.3}s`;
});
