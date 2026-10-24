(function () {
  var cards = [
    {
      slug: "loupe",
      ja: "ルーペ",
      en: "Magnifier",
      lineJa: "小さな文字を、カメラで大きく。",
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
      ja: "はんこ押し",
      en: "Stamp & Sign",
      lineJa: "書類に、はんこやサインを。",
      lineEn: "Add your seal or signature to a document."
    },
    {
      slug: "tabi-no-phrase",
      ja: "旅のフレーズ",
      en: "Travel Phrases",
      lineJa: "画面を見せて伝える、旅の会話集。",
      lineEn: "Show a phrase to people abroad."
    },
    {
      slug: "iki-wo-suu",
      ja: "いきをすう",
      en: "Breathe",
      lineJa: "ゆっくり、息を整える。",
      lineEn: "Slow down and breathe."
    },
    {
      slug: "kirinuki",
      ja: "きりぬき",
      en: "Cutout",
      lineJa: "写真の背景を消して、組み合わせる。",
      lineEn: "Remove backgrounds and build new pictures."
    },
    {
      slug: "keshigomu",
      ja: "けしゴム",
      en: "Eraser",
      lineJa: "写真の中のいらない物を、なぞって消す。",
      lineEn: "Brush over things in your photos to erase them."
    },
    {
      slug: "kukkiri",
      ja: "くっきり写真",
      en: "Photo Sharpener",
      lineJa: "小さい・ぼやけた写真を、くっきり拡大。",
      lineEn: "Enlarge small or blurry photos, sharper."
    },
    {
      slug: "one-tap-ask",
      ja: "ひと押し質問",
      en: "One-Tap Ask",
      lineJa: "よくある質問を、AIにひと押しで。",
      lineEn: "Send ready-made questions to your AI in one tap."
    },
    {
      slug: "wakariyasuku",
      ja: "わかりやすく",
      en: "Make It Clear",
      lineJa: "難しい文章を、やさしく言いかえる。",
      lineEn: "Rewrite hard text in plain words."
    },
    {
      slug: "spell-camera",
      ja: "スペルチェックカメラ",
      en: "Spell Check Camera",
      lineJa: "看板やメニューの英語のミスを見つける。",
      lineEn: "Spot English spelling mistakes on signs and menus."
    },
    {
      slug: "camera-honyaku",
      ja: "カメラ翻訳",
      en: "Camera Translator",
      lineJa: "日本語の看板や紙を、撮って英語で読む。",
      lineEn: "Snap Japanese signs and papers, read them in English."
    },
    {
      slug: "onsei-nyuryoku",
      ja: "音声入力",
      en: "Voice Typing",
      lineJa: "話すだけで文字に。電波なしでも。",
      lineEn: "Speak and it becomes text, even with no signal."
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
  // 動画しぼる (Video Shrinker) card and insert just before it. Fall back to appending.
  function findSoon() {
    var a = mount.querySelector('article.card a[href*="/douga-shiboru/"]');
    return a ? a.closest("article") : null;
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
