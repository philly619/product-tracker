// Welcome message
window.addEventListener("load", () => {
    console.log("Philadelphia Chikalimba Portfolio Loaded Successfully");
});

// Smooth hover effect for project cards
const projectCards = document.querySelectorAll(".project-card");

projectCards.forEach(card => {
    card.addEventListener("mouseenter", () => {
        card.style.boxShadow = "0 8px 20px rgba(0,0,0,0.4)";
    });

    card.addEventListener("mouseleave", () => {
        card.style.boxShadow = "none";
    });
});

// Dynamic footer year
const footer = document.querySelector("footer p");
const currentYear = new Date().getFullYear();

footer.innerHTML = `Portfolio created by Philadelphia Chikalimba © ${currentYear}`;
