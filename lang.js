// Welcome Button Interaction

const welcomeBtn = document.getElementById("welcomeBtn");

welcomeBtn.addEventListener("click", () => {
  alert(
    "Welcome to Philadelphia Chikalimba's Portfolio!\n\n" +
    "Explore my skills, projects, and journey in commerce and technology."
  );
});

// Smooth Scroll Effect for Navigation Links

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});
