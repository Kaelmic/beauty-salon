document.addEventListener("DOMContentLoaded", () => {

  /* =========================================
     SIDEBAR ACTIVE STATE
  ========================================= */

  const sidebarLinks = document.querySelectorAll(".sidebar-nav a");

  sidebarLinks.forEach((link) => {
    link.addEventListener("click", () => {

      sidebarLinks.forEach((item) => {
        item.classList.remove("active");
      });

      link.classList.add("active");
    });
  });


  /* =========================================
     DEMO VACATION LEAVE FORM
  ========================================= */

  const leaveForm = document.querySelector(".leave-form");

  if (leaveForm) {

    leaveForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const startDate =
        leaveForm.querySelector("input[type='date']:nth-of-type(1)").value;

      const endDate =
        leaveForm.querySelector("input[type='date']:nth-of-type(2)").value;

      if (!startDate || !endDate) {
        alert("Please select your leave dates.");
        return;
      }

      if (startDate > endDate) {
        alert("End date cannot be earlier than start date.");
        return;
      }

      alert("Vacation leave request submitted successfully.");

      leaveForm.reset();
    });

  }


  /* =========================================
     DEMO CMS ARTICLE BUTTONS
  ========================================= */

  const cmsButtons = document.querySelectorAll(".primary-btn");

  cmsButtons.forEach((button) => {

    button.addEventListener("click", () => {

      const text = button.textContent.trim();

      if (text.includes("Article")) {
        alert("CMS article modal will open here.");
      }

      if (text.includes("Staff")) {
        alert("Add staff modal will open here.");
      }

      if (text.includes("Booking")) {
        alert("Booking form modal will open here.");
      }

    });

  });


  /* =========================================
     SIMPLE TABLE ROW HOVER EFFECT
  ========================================= */

  const tableRows = document.querySelectorAll("tbody tr");

  tableRows.forEach((row) => {

    row.addEventListener("mouseenter", () => {
      row.style.background = "#fff7fb";
    });

    row.addEventListener("mouseleave", () => {
      row.style.background = "transparent";
    });

  });


  /* =========================================
     DEMO CALENDAR DAY ACTIVE STATE
  ========================================= */

  const calendarDays = document.querySelectorAll(".calendar-day");

  calendarDays.forEach((day) => {

    day.addEventListener("click", () => {

      calendarDays.forEach((item) => {
        item.classList.remove("active");
      });

      day.classList.add("active");

    });

  });

});