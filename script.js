document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".booking-form");
  const successMessage = document.getElementById("success-message");

  if (!form || !successMessage) return;

  const nameInput = document.querySelector('input[name="Customer Name"]');
  const phoneInput = document.querySelector('input[name="Phone Number"]');
  const dateInput = document.getElementById("dateInput");
  const dayDisplay = document.getElementById("day-display");
  const timeInput = document.getElementById("timeInput");
  const submitBtn = form.querySelector("button");
  const revealElements = document.querySelectorAll(".reveal");

function revealOnScroll() {
  revealElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementTop < windowHeight - 100) {
      element.classList.add("active");
    }
  });
}

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    menuToggle.classList.toggle("active");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      menuToggle.classList.remove("active");
    });
  });

  document.addEventListener("click", (e) => {
    const clickedInsideMenu = navLinks.contains(e.target);
    const clickedBurger = menuToggle.contains(e.target);

    if (!clickedInsideMenu && !clickedBurger) {
      navLinks.classList.remove("active");
      menuToggle.classList.remove("active");
    }
  });

    window.addEventListener("scroll", () => {
    navLinks.classList.remove("active");
    menuToggle.classList.remove("active");
  });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

const hero = document.querySelector(".hero");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  if (hero) {
    hero.style.backgroundPositionY = `${scrollY * 0.4}px`;
  }
});

  function getTodayFormatted() {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const dd = String(now.getDate()).padStart(2, "0");

    return `${yyyy}-${mm}-${dd}`;
  }

  function getDemoBookedSlots() {
    const today = getTodayFormatted();

    return {
      [today]: ["14:15"], // demo booked slot for today
    };
  }

  function generateTimeSlots() {
    if (!timeInput || !dateInput) return;

    timeInput.innerHTML = `<option value="">Select time</option>`;

    if (!dateInput.value) return;

    const selectedDate = dateInput.value;
    const now = new Date();
    const bookedSlots = getDemoBookedSlots();

    const startHour = 9;
    const endHour = 18;

    const todayFormatted = getTodayFormatted();
    const isToday = selectedDate === todayFormatted;

    const minimumAllowedTime = new Date(now.getTime() + 15 * 60 * 1000);

    for (let hour = startHour; hour <= endHour; hour++) {
      ["00", "15", "30", "45"].forEach((minute) => {
        if (hour === endHour && minute !== "00") return;

        const time = `${String(hour).padStart(2, "0")}:${minute}`;
        const slotDateTime = new Date(`${selectedDate}T${time}`);

        const isTooSoon = isToday && slotDateTime <= minimumAllowedTime;
        const isBooked = bookedSlots[selectedDate]?.includes(time);

        if (isTooSoon || isBooked) return;

        const option = document.createElement("option");
        option.value = time;
        option.textContent = time;

        timeInput.appendChild(option);
      });
    }
  }

  if (dateInput) {
    dateInput.min = new Date().toISOString().split("T")[0];
  }

  if (nameInput) {
    nameInput.addEventListener("input", () => {
      nameInput.value = nameInput.value.replace(/[^A-Za-zÀ-ÿ\s'-]/g, "");
    });
  }

  if (phoneInput) {
    phoneInput.addEventListener("input", () => {
      phoneInput.value = phoneInput.value.replace(/[^\d+\s]/g, "");
    });
  }

  if (dateInput && dayDisplay) {
    dateInput.addEventListener("change", () => {
      if (!dateInput.value) {
        generateTimeSlots();
        return;
      }

      const selectedDate = new Date(dateInput.value + "T00:00:00");

      const dayName = selectedDate.toLocaleDateString("en-US", {
        weekday: "long",
      });

      const dayNumber = selectedDate.getDay();
      const closedDays = [0]; // Sunday

      if (closedDays.includes(dayNumber)) {
        dayDisplay.textContent = `Sorry, we are closed on ${dayName}. Please choose another date.`;
        dateInput.value = "";
        generateTimeSlots();
        return;
      }

      dayDisplay.textContent = `Selected day: ${dayName}`;
      generateTimeSlots();
    });
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();
    const selectedTime = timeInput.value;

    if (!selectedTime) {
      alert("Please choose an available time.");
      return;
    }

    if (selectedTime < "09:00" || selectedTime > "18:00") {
      alert("Please choose a time between 09:00 and 18:00.");
      return;
    }

    const nameValid = /^[A-Za-zÀ-ÿ\s'-]+$/.test(name);
    const phoneValid = /^[\+0-9\s]+$/.test(phone);

    if (!nameValid) {
      alert("Name should contain letters only.");
      return;
    }

    if (!phoneValid) {
      alert("Phone number should contain only numbers, spaces, or +.");
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
        dayDisplay.textContent = "";
        generateTimeSlots();
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

function scrollToBooking(serviceName) {
  const bookingSection = document.getElementById("booking");
  const serviceSelect = document.getElementById("serviceSelect");

  if (serviceSelect && serviceName) {
    serviceSelect.value = serviceName;
  }

  if (bookingSection) {
    bookingSection.scrollIntoView({ behavior: "smooth" });
  }
}
