const cards = document.querySelectorAll(".image-card, .cap-card, .step");

cards.forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    card.style.setProperty("--mx", `${x}px`);
    card.style.setProperty("--my", `${y}px`);
  });

  card.addEventListener("mouseleave", () => {
    card.style.setProperty("--mx", "50%");
    card.style.setProperty("--my", "50%");
  });
});

const langButtons = document.querySelectorAll(".lang-btn");
const translatable = document.querySelectorAll("[data-en][data-es]");

function setLanguage(lang) {
  translatable.forEach((element) => {
    element.innerHTML = element.dataset[lang];
  });

  langButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.lang === lang);
  });

  document.documentElement.lang = lang;
}

langButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setLanguage(button.dataset.lang);
  });
});

const quoteForm = document.getElementById("quoteForm");

if (quoteForm) {
  const submitButton = quoteForm.querySelector("button");

  const statusMessage = document.createElement("div");
  statusMessage.className = "form-success";
  quoteForm.appendChild(statusMessage);

  quoteForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(quoteForm);
    const action = quoteForm.getAttribute("action");

    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    try {
      const response = await fetch(action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json"
        }
      });

      if (response.ok) {
        statusMessage.innerHTML =
          "✓ Request sent successfully. We’ll contact you soon.";
        statusMessage.classList.remove("error");
        statusMessage.classList.add("active");
        quoteForm.reset();
      } else {
        statusMessage.innerHTML = "Something went wrong. Please try again.";
        statusMessage.classList.add("active", "error");
      }
    } catch (error) {
      statusMessage.innerHTML = "Connection error. Please try again.";
      statusMessage.classList.add("active", "error");
    }

    submitButton.disabled = false;
    submitButton.textContent = "Request Production Quote →";
  });
}