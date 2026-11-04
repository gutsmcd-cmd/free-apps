(function () {
  var cards = [
    {
      slug: "photo-to-text",
      ja: "写真から文字",
      en: "Photo to Text",
      lineJa: "メモの写真を文字に。オフラインAI入り（約100 MB）、APKは最初からネットなしで動きます（63 MB）。手書きは英語が中心。",
      lineEn: "Turn a photo of notes into text. Includes offline AI (~100 MB); the APK (63 MB) works offline from first launch. Handwriting reading is English-focused."
    },
    {
      slug: "ar-solar-system",
      ja: "ARたいようけい",
      en: "AR Solar System",
      lineJa: "床や机に太陽系をおいて、惑星をタップで豆知識。",
      lineEn: "Put the solar system on your floor and tap planets for facts."
    },
    {
      slug: "origami-steps",
      ja: "おりがみステップ",
      en: "Origami Steps",
      lineJa: "定番のおりがみを、一歩ずつ図で。",
      lineEn: "Fold classic origami, one picture at a time."
    },
    {
      slug: "ar-measure",
      ja: "ARメジャー",
      en: "AR Tape Measure",
      lineJa: "スマホのカメラで、物の長さを測る。",
      lineEn: "Measure real things with your phone camera."
    },
    {
      slug: "read-aloud",
      ja: "読みきかせ",
      en: "Read Aloud",
      lineJa: "文章・PDF・ウェブページを声で読む。",
      lineEn: "Hear text, PDFs and web pages read out loud."
    },
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
      lineJa: "写真の背景を消して、組み合わせる。オフラインAI内蔵（約71 MB）。",
      lineEn: "Remove backgrounds and build new pictures. Includes offline AI (~71 MB)."
    },
    {
      slug: "keshigomu",
      ja: "けしゴム",
      en: "Eraser",
      lineJa: "写真の中のいらない物を、なぞって消す。オフラインAI内蔵（約222 MB）。",
      lineEn: "Brush over things in your photos to erase them. Includes offline AI (~222 MB)."
    },
    {
      slug: "kukkiri",
      ja: "くっきり写真",
      en: "Photo Sharpener",
      lineJa: "小さい・ぼやけた写真を、くっきり拡大。オフラインAI内蔵（約19 MB）。",
      lineEn: "Enlarge small or blurry photos, sharper. Includes offline AI (~19 MB)."
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
      lineJa: "看板やメニューの英語のミスを見つける。オフラインAI内蔵（約7 MB）。",
      lineEn: "Spot English spelling mistakes on signs and menus. Includes offline AI (~7 MB)."
    },
    {
      slug: "camera-honyaku",
      ja: "カメラ翻訳",
      en: "Camera Translator",
      lineJa: "日本語の看板や紙を、撮って英語で読む。オフラインAI内蔵（約145 MB）。",
      lineEn: "Snap Japanese signs and papers, read them in English. Includes offline AI (~145 MB)."
    },
    {
      slug: "onsei-nyuryoku",
      ja: "音声入力",
      en: "Voice Typing",
      lineJa: "話すだけで文字に。電波なしでも。オフラインAI内蔵（約102 MB）。",
      lineEn: "Speak and it becomes text, even with no signal. Includes offline AI (~102 MB)."
    },
    {
      slug: "classroom-printables",
      ja: "教室プリント工房",
      en: "Classroom Printables",
      lineJa: "ことばさがし・めいろ・ビンゴなど11種類のプリントをA4で。答えつき。",
      lineEn: "Word searches, mazes, bingo and 8 more printables for A4, with answer keys."
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
