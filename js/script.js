document.addEventListener("DOMContentLoaded", () => {
  // 1. DARK MODE TOGGLE
  const themeToggleBtn = document.getElementById("theme-toggle");
  const htmlElement = document.documentElement;

  // Check local storage
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) htmlElement.setAttribute("data-theme", savedTheme);

  themeToggleBtn.addEventListener("click", () => {
    const currentTheme = htmlElement.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";

    htmlElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  });

  // 2. PARALLAX SCROLLING EFFECT
  const parallaxImages = document.querySelectorAll(".parallax-img");
  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", () => {
    let scrollY = window.scrollY;

    // Navbar glass effect
    if (scrollY > 50) navbar.classList.add("scrolled");
    else navbar.classList.remove("scrolled");

    // Parallax math
    parallaxImages.forEach((img) => {
      let speed = img.getAttribute("data-speed");
      img.style.transform = `translateY(${scrollY * speed}px)`;
    });
  });

  // 3. SCROLL REVEAL ANIMATIONS
  const revealElements = document.querySelectorAll(".reveal-up");
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -100px 0px" },
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  // 4. AJAX FORM SUBMIT (Kontak)
  const contactForm = document.getElementById("contact-form");
  const formResponse = document.getElementById("form-response");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value,
      };
      formResponse.innerHTML =
        '<p style="color:var(--accent-color); margin-top:1rem;">Mengirim...</p>';
      fetch("php/contact.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((result) => {
          formResponse.innerHTML = `<p style="color:#2e7d32; margin-top:1rem;">${result.message}</p>`;
          contactForm.reset();
        })
        .catch((err) => {
          formResponse.innerHTML = `<p style="color:red; margin-top:1rem;">Gagal mengirim pesan.</p>`;
        });
    });
  }
});
