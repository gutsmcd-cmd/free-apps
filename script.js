(function () {
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector("#nav-menu");
  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const open = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const form = document.querySelector("#suggest-form");
  if (!form) return;

  const SUGGEST_EMAIL = "gutsmcd@gmail.com";

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = /** @type {HTMLInputElement} */ (form.querySelector("#idea-name")).value.trim();
    const line = /** @type {HTMLSelectElement} */ (form.querySelector("#idea-line")).value;
    const reference = /** @type {HTMLInputElement} */ (form.querySelector("#idea-ref")).value.trim();
    const why = /** @type {HTMLTextAreaElement} */ (form.querySelector("#idea-why")).value.trim();

    if (!name || !why) {
      form.reportValidity();
      return;
    }

    const subject = `App suggestion: ${name}`;
    const body = [
      `Idea: ${name}`,
      `Line: ${line}`,
      `English reference: ${reference || "(none)"}`,
      "",
      "Why it fits:",
      why,
      "",
      "— sent from M@ Free Apps suggest form",
    ].join("\n");

    const href =
      `mailto:${SUGGEST_EMAIL}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    window.location.href = href;
  });
})();
