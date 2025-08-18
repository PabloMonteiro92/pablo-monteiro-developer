// Scroll reveal animations
document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section");

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  sections.forEach((section) => {
    section.style.opacity = 0;
    section.style.transform = "translateY(20px)";
    section.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
    observer.observe(section);
  });

  // Simple hero section animation on load
  const heroContent = document.querySelector(".hero-content");
  if (heroContent) {
    heroContent.style.opacity = 0;
    heroContent.style.transform = "translateY(20px)";
    setTimeout(() => {
      heroContent.style.transition =
        "opacity 1s ease-out, transform 1s ease-out";
      heroContent.style.opacity = 1;
      heroContent.style.transform = "translateY(0)";
    }, 300);
  }
});
