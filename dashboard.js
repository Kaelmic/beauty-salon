document.addEventListener("DOMContentLoaded", () => {

  /* =========================================
     SIDEBAR / MOBILE BURGER MENU
  ========================================= */

  const dashboardMenuBtn = document.getElementById("dashboardMenuBtn");
  const sidebar = document.querySelector(".sidebar");
  const sidebarLinks = document.querySelectorAll(".sidebar-nav a");
  const sidebarCloseBtn = document.getElementById("sidebarCloseBtn");

  function openSidebar() {
  if (sidebar) {
    sidebar.classList.add("active");
  }

  if (dashboardMenuBtn) {
    dashboardMenuBtn.classList.add("active");
  }

  document.body.classList.add("sidebar-open");
}

function closeSidebar() {
  if (sidebar) {
    sidebar.classList.remove("active");
  }

  if (dashboardMenuBtn) {
    dashboardMenuBtn.classList.remove("active");
  }

  document.body.classList.remove("sidebar-open");
}

  if (dashboardMenuBtn && sidebar) {
    dashboardMenuBtn.addEventListener("click", () => {
      const isActive = sidebar.classList.contains("active");

      if (isActive) {
        closeSidebar();
      } else {
        openSidebar();
      }
    });
  }

  if (sidebarCloseBtn) {
    sidebarCloseBtn.addEventListener("click", closeSidebar);
  }

  sidebarLinks.forEach((link) => {
    link.addEventListener("click", () => {
      sidebarLinks.forEach((item) => {
        item.classList.remove("active");
      });

      link.classList.add("active");

      closeSidebar();
    });
  });

  window.addEventListener("scroll", closeSidebar);


  /* =========================================
     DEMO VACATION LEAVE FORM
  ========================================= */

  const leaveForm = document.querySelector(".leave-form");

  if (leaveForm) {
    leaveForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const dateInputs = leaveForm.querySelectorAll("input[type='date']");
      const startDate = dateInputs[0]?.value;
      const endDate = dateInputs[1]?.value;

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
     DEMO CMS / BUTTON ACTIONS
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

  const dateInputs = document.querySelectorAll('input[type="date"]');

const today = new Date().toISOString().split("T")[0];

dateInputs.forEach((input) => {
  input.min = today;
});

});
