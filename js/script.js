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

  // ===== Gallery placeholder fallback =====
  document.querySelectorAll(".gallery-item img").forEach(function (img) {
    function showPlaceholder() {
      img.style.display = "none";
      var placeholder = img.nextElementSibling;
      if (placeholder) placeholder.style.display = "flex";
    }
    if (img.complete && img.naturalWidth === 0) {
      showPlaceholder();
    } else {
      img.addEventListener("error", showPlaceholder);
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

      var name = form.querySelector('[name="name"]').value.trim();
      var email = form.querySelector('[name="email"]').value.trim();
      var subject = form.querySelector('[name="subject"]').value.trim();
      var message = form.querySelector('[name="message"]').value.trim();

      var mailSubject = subject || "Website inquiry from " + name;
      var mailBody = "Name: " + name + "\nEmail: " + email + "\n\n" + message;

      var mailtoLink =
        "mailto:ibasanttamang@gmail.com" +
        "?subject=" + encodeURIComponent(mailSubject) +
        "&body=" + encodeURIComponent(mailBody);

      window.location.href = mailtoLink;

      status.className = "form-status success";
      status.textContent =
        "Opening your email app to send this message. If it doesn't open, please email us directly at ibasanttamang@gmail.com.";
      form.reset();
    });
  }
});
