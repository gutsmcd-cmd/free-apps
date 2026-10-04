
(function () {
  var KEY = "m-free-apps-lang";

  function current() {
    return document.documentElement.lang === "en" ? "en" : "ja";
  }

  function apply(lang) {
    var next = lang === "en" ? "en" : "ja";
    document.documentElement.lang = next;
    try { localStorage.setItem(KEY, next); } catch (e) {}
    document.querySelectorAll(".lang-btn").forEach(function (btn) {
      btn.setAttribute("aria-pressed", btn.getAttribute("data-set-lang") === next ? "true" : "false");
    });
    document.querySelectorAll("[data-ph-ja]").forEach(function (el) {
      el.placeholder = el.getAttribute(next === "en" ? "data-ph-en" : "data-ph-ja") || "";
    });
    document.querySelectorAll("option[data-ja]").forEach(function (opt) {
      opt.textContent = opt.getAttribute(next === "en" ? "data-en" : "data-ja");
    });
    var titles = {
      ja: { apps: "M@ 無料アプリ", about: "について — M@", suggest: "提案 — M@" },
      en: { apps: "M@ Free Apps", about: "About — M@", suggest: "Suggest — M@" }
    };
    var page = document.body.getAttribute("data-page");
    if (!page) {
      if (document.getElementById("suggest-form")) page = "suggest";
      else if (document.querySelector(".prose-page") && !document.getElementById("japanese")) page = "about";
      else page = "apps";
    }
    document.title = titles[next][page];
    var desc = document.querySelector('meta[name="description"]');
    if (desc && page === "apps") {
      desc.setAttribute("content", next === "en"
        ? "A family of free, no-login, offline, minimal tools."
        : "無料、ログインなし、オフライン。小さな道具の家族。");
    }
  }

  document.querySelectorAll(".lang-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      apply(btn.getAttribute("data-set-lang"));
    });
  });

  var toggle = document.querySelector(".nav-toggle");
  var menu = document.querySelector("#nav-menu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  var form = document.querySelector("#suggest-form");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var name = form.querySelector("#idea-name").value.trim();
      var line = form.querySelector("#idea-line").value;
      var reference = form.querySelector("#idea-ref").value.trim();
      var why = form.querySelector("#idea-why").value.trim();
      if (!name || !why) {
        form.reportValidity();
        return;
      }
      var subject = "App suggestion: " + name;
      var body = [
        "Idea: " + name,
        "Line: " + line,
        "English reference: " + (reference || "(none)"),
        "",
        "Why it fits:",
        why,
        "",
        "— sent from M@ Free Apps suggest form"
      ].join("\n");
      window.location.href =
        "mailto:gutsmcd@gmail.com?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);
    });
  }

  apply(current());
})();
