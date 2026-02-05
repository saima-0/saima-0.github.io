
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



const toggleButtons = document.querySelectorAll(".toggle-btn");

toggleButtons.forEach((btn) => {
  btn.addEventListener("click", () => {

    // Finding the section this button belongs to
    const card = btn.closest(".card");

    // Finding the content area inside that section
    const content = card.querySelector(".section-content");

    // Toggle hidden class
    content.classList.toggle("hidden");

    // Changing button text
    if (content.classList.contains("hidden")) {
      btn.textContent = "Show";
    } else {
      btn.textContent = "Hide";
    }

  });
});
