const form = document.querySelector(".login-form");

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = form.querySelector("input[type='email']").value;
      const password = form.querySelector("input[type='password']").value;

      if (
        email === "admin@keiranatalie.com" &&
        password === "Keira1357900"
      ) {
        window.location.href = "admin-dashboard.html";
      }

      else if (
        email === "staff@keiranatalie.com" &&
        password === "Natalie1357900"
      ) {
        window.location.href = "staff-dashboard.html";
      }

      else {
        alert("Invalid email or password.");
      }
    });