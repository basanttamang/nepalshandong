// ===== Mobile nav toggle =====
document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var isOpen = links.classList.toggle("open");
      toggle.classList.toggle("open", isOpen);
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    links.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        links.classList.remove("open");
        toggle.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // ===== Highlight active nav link =====
  var currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(function (link) {
    var href = link.getAttribute("href");
    if (href === currentPage) {
      link.classList.add("active");
    }
  });

  // ===== Footer year =====
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ===== Contact form validation & fake submit =====
  var form = document.getElementById("contact-form");
  if (form) {
    var status = document.getElementById("form-status");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var isValid = true;

      var fields = [
        { name: "name", message: "Please enter your name." },
        { name: "email", message: "Please enter a valid email address." },
        { name: "message", message: "Please enter a message." },
      ];

      fields.forEach(function (field) {
        var input = form.querySelector('[name="' + field.name + '"]');
        var group = input.closest(".form-group");
        var errorEl = group.querySelector(".field-error");
        var value = input.value.trim();
        var fieldValid = true;

        if (!value) {
          fieldValid = false;
        } else if (field.name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          fieldValid = false;
        }

        if (!fieldValid) {
          group.classList.add("error");
          if (errorEl) errorEl.textContent = field.message;
          isValid = false;
        } else {
          group.classList.remove("error");
        }
      });

      if (!isValid) {
        status.className = "form-status error";
        status.textContent = "Please fix the highlighted fields and try again.";
        return;
      }

      status.className = "form-status success";
      status.textContent =
        "Thank you! Your message has been received. We will get back to you soon.";
      form.reset();
    });
  }
});
