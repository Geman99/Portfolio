(function () {
  "use strict";

  function applyPortfolioLinks() {
    var map = window.PORTFOLIO_LINKS;
    if (!map || typeof map !== "object") return;
    document.querySelectorAll("a[data-link]").forEach(function (el) {
      var key = el.getAttribute("data-link");
      if (key && map[key]) el.setAttribute("href", map[key]);
    });
  }

  applyPortfolioLinks();

  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  var THEME_KEY = "portfolio-theme";
  var root = document.documentElement;
  var themeBtn = document.getElementById("theme-toggle");

  function themeLabel(theme) {
    if (!themeBtn) return;
    themeBtn.setAttribute(
      "aria-label",
      theme === "light" ? "Switch to dark theme" : "Switch to light theme"
    );
    themeBtn.setAttribute("title", theme === "light" ? "Dark mode" : "Light mode");
  }

  function readTheme() {
    return root.getAttribute("data-theme") === "light" ? "light" : "dark";
  }

  if (themeBtn) {
    themeLabel(readTheme());
    themeBtn.addEventListener("click", function () {
      var next = readTheme() === "light" ? "dark" : "light";
      root.setAttribute("data-theme", next);
      try {
        localStorage.setItem(THEME_KEY, next);
      } catch (e) {}
      themeLabel(next);
      var hdr = document.querySelector(".site-header");
      var nt = document.querySelector(".nav-toggle");
      if (hdr) hdr.classList.remove("nav-open");
      if (nt) {
        nt.setAttribute("aria-expanded", "false");
        nt.setAttribute("aria-label", "Open menu");
      }
    });
  }

  try {
    window
      .matchMedia("(prefers-color-scheme: light)")
      .addEventListener("change", function (ev) {
        var stored;
        try {
          stored = localStorage.getItem(THEME_KEY);
        } catch (e) {
          stored = null;
        }
        if (stored !== null) return;
        var t = ev.matches ? "light" : "dark";
        root.setAttribute("data-theme", t);
        themeLabel(t);
      });
  } catch (e) {}

  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".nav");

  if (toggle && header && nav) {
    toggle.addEventListener("click", function () {
      var open = !header.classList.contains("nav-open");
      header.classList.toggle("nav-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        header.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
      });
    });
  }

  var reveals = document.querySelectorAll("[data-reveal]");
  if (!reveals.length || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) {
      el.classList.add("is-visible");
    });
  } else {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    reveals.forEach(function (el) {
      observer.observe(el);
    });
  }

  var archModal = document.getElementById("architecture-modal");
  var archBody = document.getElementById("architecture-modal-body");
  var archTitle = document.getElementById("architecture-modal-title");
  var archCloseEls;
  var lastArchFocus = null;

  function closeArchModal() {
    if (!archModal || archModal.hidden) return;
    archModal.hidden = true;
    archModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (archBody) archBody.innerHTML = "";
    if (lastArchFocus && typeof lastArchFocus.focus === "function") {
      lastArchFocus.focus();
    }
    lastArchFocus = null;
  }

  function openArchModal(key, titleText) {
    if (!archModal || !archBody) return;
    var tpl = document.getElementById("arch-content-" + key);
    if (!tpl || !tpl.content) return;
    lastArchFocus = document.activeElement;
    archTitle.textContent = titleText || "Architecture";
    archBody.innerHTML = "";
    archBody.appendChild(tpl.content.cloneNode(true));
    archModal.hidden = false;
    archModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    var closeBtn = archModal.querySelector(".arch-modal__close");
    if (closeBtn) closeBtn.focus();
  }

  document.querySelectorAll("[data-arch-open]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var key = btn.getAttribute("data-arch-open");
      var titleText = btn.getAttribute("data-arch-title") || "";
      if (key) openArchModal(key, titleText);
    });
  });

  if (archModal) {
    archModal.addEventListener("click", function (ev) {
      if (ev.target && ev.target.getAttribute("data-arch-close") != null) {
        closeArchModal();
      }
    });

    document.addEventListener("keydown", function (ev) {
      if (ev.key === "Escape" && archModal && !archModal.hidden) {
        closeArchModal();
      }
    });
  }

  document.querySelectorAll("[data-expand-toggle]").forEach(function (btn) {
    var targetId = btn.getAttribute("data-expand-target");
    if (!targetId) return;
    var panel = document.getElementById(targetId);
    if (!panel) return;
    btn.addEventListener("click", function () {
      panel.hidden = !panel.hidden;
      var expanded = !panel.hidden;
      btn.setAttribute("aria-expanded", expanded ? "true" : "false");
      btn.textContent = expanded ? "View less" : "View more";
    });
  });
})();
