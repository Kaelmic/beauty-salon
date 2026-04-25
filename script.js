document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".booking-form");
  const successMessage = document.getElementById("success-message");

  if (!form || !successMessage) return;

  const nameInput = document.querySelector('input[name="Customer Name"]');
  const phoneInput = document.querySelector('input[name="Phone Number"]');
  const dateInput = document.getElementById("dateInput");
  const dayDisplay = document.getElementById("day-display");
  const submitBtn = form.querySelector("button");

  if (nameInput) {
    nameInput.addEventListener("input", () => {
      nameInput.value = nameInput.value.replace(/[^A-Za-z\s]/g, "");
    });
  }

  if (phoneInput) {
    phoneInput.addEventListener("input", () => {
      phoneInput.value = phoneInput.value.replace(/[^\d+\s]/g, "");
    });
  }

  if (dateInput && dayDisplay) {
    dateInput.addEventListener("change", () => {
      const selectedDate = new Date(dateInput.value + "T00:00:00");

      const dayName = selectedDate.toLocaleDateString("en-US", {
        weekday: "long",
      });

      dayDisplay.textContent = `Selected day: ${dayName}`;
    });
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();

    const nameValid = /^[A-Za-z\s]+$/.test(name);
    const phoneValid = /^[\+0-9\s]+$/.test(phone);

    if (!nameValid) {
      alert("Name should contain letters only.");
      return;
    }

    if (!phoneValid) {
      alert("Phone number should contain only numbers.");
      return;
    }

    const data = new FormData(form);

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        form.reset();

        if (dayDisplay) {
          dayDisplay.textContent = "";
        }

        successMessage.style.display = "block";
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      alert("Network error. Please check your connection.");
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Submit Request";
    }
  });
});

function scrollToBooking() {
  document.getElementById("booking").scrollIntoView({ behavior: "smooth" });
}
