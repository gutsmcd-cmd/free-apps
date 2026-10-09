/* PDF一発 card for General utilities. cards-b.js sets that section with innerHTML
   (asynchronously), which used to wipe this card, so wait for its cards first. */
(function () {
  var HTML = "<article class=\"card\">\n              <a class=\"art-link\" href=\"https://gutsmcd-cmd.github.io/pdf-ippatsu/\" rel=\"noopener\">\n                <div class=\"art\"><img class=\"illu\" src=\"./assets/art/pdf-ippatsu.svg\" alt=\"\" width=\"320\" height=\"176\" /></div>\n                <div class=\"card-copy\">\n                  <h3><span class=\"t-ja\">PDF一発</span><span class=\"t-en\">PDF Joiner</span></h3>\n                  <p class=\"line\"><span class=\"t-ja\">写真を一つのPDFに。PDFも、ひとつに。</span><span class=\"t-en\">Photos into one PDF. Join PDFs, too.</span></p>\n                </div>\n              </a>\n              <a class=\"src\" href=\"https://github.com/gutsmcd-cmd/pdf-ippatsu\" rel=\"noopener\">GitHub</a>\n            </article>";
  var gen = document.getElementById("card-mount-gen");
  if (!gen) return;
  function place() {
    if (!gen.querySelector('a[href*="/three-things/"]')) return false;
    if (!gen.querySelector('a[href*="/pdf-ippatsu/"]')) {
      var bs = gen.querySelector('[data-apk="black-screen"]');
      if (bs) bs.insertAdjacentHTML("beforebegin", HTML);
      else gen.insertAdjacentHTML("beforeend", HTML);
    }
    return true;
  }
  if (place()) return;
  var obs = new MutationObserver(function () { if (place()) obs.disconnect(); });
  obs.observe(gen, { childList: true });
  setTimeout(function () {
    obs.disconnect();
    if (!gen.querySelector('a[href*="/pdf-ippatsu/"]')) gen.insertAdjacentHTML("beforeend", HTML);
  }, 4000);
})();
