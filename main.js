// Dark mode button
const toggleButton = document.getElementById("theme-toggle");

if (toggleButton) {
  toggleButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
      toggleButton.textContent = "Switch to Light Mode";
    } else {
      toggleButton.textContent = "Switch to Dark Mode";
    }
  });
}

// Hide/show section buttons
const toggleButtons = document.querySelectorAll(".toggle-btn");

toggleButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Find the card section this button belongs to
    const card = btn.closest(".card");

    // Find the content inside that card
    const content = card.querySelector(".section-content");

    // Hide or show the section content
    content.classList.toggle("hidden");

    // Update button text
    if (content.classList.contains("hidden")) {
      btn.textContent = "Show";
    } else {
      btn.textContent = "Hide";
    }
  });
});
