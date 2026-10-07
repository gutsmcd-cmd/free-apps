(function () {
  var cards = [
    {
      slug: "loupe",
      ja: "ルーペ",
      en: "Magnifier",
      lineJa: "小さな文字を、大きく見る。",
      lineEn: "Read small print with your camera."
    },
    {
      slug: "collage-chou",
      ja: "コラージュ帳",
      en: "Photo Collage",
      lineJa: "写真を並べて、1枚に。",
      lineEn: "Put photos side by side, as one."
    },
    {
      slug: "in-wo-osu",
      ja: "印を押す",
      en: "Stamp &amp; Sign",
      lineJa: "書類に、はんこやサインを。",
      lineEn: "Add your seal or signature to a document."
    },
    {
      slug: "tabi-no-phrase",
      ja: "旅のフレーズ",
      en: "Travel Phrases",
      lineJa: "旅先で、見せて伝える。",
      lineEn: "Show a phrase to people abroad."
    }
  ];

  function cardHtml(c) {
    return "<article class=\"card\">\n" +
      "              <a class=\"art-link\" href=\"https://gutsmcd-cmd.github.io/" + c.slug + "/\" rel=\"noopener\">\n" +
      "                <div class=\"art\"><img class=\"illu\" src=\"./assets/art/" + c.slug + ".svg\" alt=\"\" width=\"320\" height=\"176\" /></div>\n" +
      "                <div class=\"card-copy\">\n" +
      "                  <h3><span class=\"t-ja\">" + c.ja + "</span><span class=\"t-en\">" + c.en + "</span></h3>\n" +
      "                  <p class=\"line\"><span class=\"t-ja\">" + c.lineJa + "</span><span class=\"t-en\">" + c.lineEn + "</span></p>\n" +
      "                </div>\n" +
      "              </a>\n" +
      "              <a class=\"src\" href=\"https://github.com/gutsmcd-cmd/" + c.slug + "\" rel=\"noopener\">GitHub</a>\n" +
      "            </article>";
  }

  var mount = document.getElementById("card-mount");
  if (!mount) return;
  var html = cards.map(cardHtml).join("\n");
  var done = false;

  // cards-a.js / cards-b.js add their cards asynchronously, so wait for the
  // "Soon" card (動画しぼる) and insert just before it. Fall back to appending.
  function findSoon() {
    var soon = mount.querySelectorAll("article.card.is-soon");
    for (var i = 0; i < soon.length; i++) {
      if (soon[i].textContent.indexOf("動画しぼる") !== -1) return soon[i];
    }
    return null;
  }

  function place(force) {
    if (done) return true;
    var soon = findSoon();
    if (soon) soon.insertAdjacentHTML("beforebegin", html);
    else if (force) mount.insertAdjacentHTML("beforeend", html);
    else return false;
    done = true;
    return true;
  }

  if (place(false)) return;
  var observer = new MutationObserver(function () {
    if (place(false)) observer.disconnect();
  });
  observer.observe(mount, { childList: true });
  setTimeout(function () {
    observer.disconnect();
    place(true);
  }, 3000);
})();
