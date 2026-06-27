document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const target = document.querySelector(link.getAttribute("href"));

      if (!target) {
        return;
      }

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  const contactForm = document.querySelector("[data-contact-form]");

  if (contactForm) {
    const statusMessage = contactForm.querySelector("[data-contact-status]");
    const submitButton = contactForm.querySelector("[data-contact-submit]");
    const defaultButtonText = submitButton ? submitButton.textContent : "";

    contactForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      if (statusMessage) {
        statusMessage.hidden = true;
        statusMessage.textContent = "";
        statusMessage.className = "text-center text-base font-medium";
      }

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Sending...";
      }

      try {
        const response = await fetch(contactForm.action, {
          method: "POST",
          body: new FormData(contactForm),
          headers: {
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Formspree submission failed");
        }

        contactForm.reset();

        if (statusMessage) {
          statusMessage.hidden = false;
          statusMessage.textContent = "Terima kasih. Pesan Anda telah masuk.";
          statusMessage.className = "text-center text-base font-medium text-green-600";
        }
      } catch (error) {
        if (statusMessage) {
          statusMessage.hidden = false;
          statusMessage.textContent = "Maaf, pesan Anda tak kekirim. Sila coba lagi.";
          statusMessage.className = "text-center text-base font-medium text-red-700";
        }
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = defaultButtonText;
        }
      }
    });
  }
});
