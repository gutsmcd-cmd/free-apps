/* install.js — one clear button per app card.
   Android: "Install app" downloads the APK (only once the APK file really exists
   on this site; until then the card stays as before). iPhone / PC: "Open" plus a
   small tip for adding it from Safari / Chrome. Plain JS, loaded last. */
(function () {
  var APK_DIR = "./apk/";
  var UA = navigator.userAgent || "";
  var IS_ANDROID = /Android/i.test(UA);
  var IS_IOS = /iPhone|iPad|iPod/i.test(UA) || (/Macintosh/.test(UA) && navigator.maxTouchPoints > 1);

  function t(ja, en) {
    return '<span class="t-ja">' + ja + '</span><span class="t-en">' + en + "</span>";
  }

  var css = "" +
    ".card.has-inst .card-copy{padding-bottom:.55rem}" +
    ".card .art-link{flex:1 1 auto;height:auto}" +
    ".inst{padding:0 1rem .7rem;display:flex;flex-wrap:wrap;align-items:center;gap:.35rem .9rem;padding-right:4.6rem}" +
    ".inst .open-btn{padding:.5rem 1rem;font-size:.95rem}" +
    ".inst-more{background:none;border:0;padding:.2rem 0;font:inherit;font-size:.86rem;color:var(--muted);text-decoration:underline;text-underline-offset:3px;cursor:pointer}" +
    ".inst-panel{flex-basis:100%;font-size:.86rem;color:var(--muted);margin:.15rem 0 0;padding:.6rem .75rem;border-radius:12px;background:var(--paper)}" +
    ".inst-panel p{margin:.15rem 0}.inst-panel a{color:var(--moss)}" +
    ".inst-note{font-size:.86rem;color:var(--muted)}" +
    "#apk-help{border:0;border-radius:18px;padding:1.2rem 1.3rem;max-width:30rem;width:calc(100% - 2rem);background:var(--card);color:var(--ink);box-shadow:var(--shadow)}" +
    "#apk-help::backdrop{background:rgba(36,31,26,.45)}" +
    "#apk-help h2{margin:0 0 .6rem;font-size:1.3rem}#apk-help ol{padding-left:1.2rem;margin:.4rem 0 .8rem}#apk-help li{margin:.35rem 0}" +
    "#apk-help .quiet{font-size:.9rem}#apk-help form{margin:0;text-align:right}";
  var style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  // ---------- "How to install the APK" help (one dialog for the whole page) ----------
  var help = null;
  function openHelp() {
    if (!help) {
      help = document.createElement("dialog");
      help.id = "apk-help";
      help.innerHTML =
        "<h2>" + t("アプリ（APK）の入れ方", "How to install the APK") + "</h2>" +
        "<ol>" +
        "<li>" + t("「アプリを入れる」を押して、ダウンロードします。", "Tap “Install app” to download it.") + "</li>" +
        "<li>" + t("終わったら、通知（またはダウンロード）からファイルを開きます。", "When it finishes, open the file from the notification (or Downloads).") + "</li>" +
        "<li>" + t("<b>最初の一度だけ</b>：「不明なアプリのインストール」を聞かれたら「この提供元を許可」をオンにして、戻ります。", "<b>First time only:</b> if asked about installing unknown apps, turn on “Allow from this source”, then go back.") + "</li>" +
        "<li>" + t("Play プロテクトの注意が出たら「詳細」→「インストールする」。Play ストア以外のアプリには、いつも出る表示です。", "If Play Protect warns you, tap “More details” → “Install anyway”. It shows this for any app not from the Play Store.") + "</li>" +
        "<li>" + t("「インストール」を押して完了。", "Tap “Install”. Done.") + "</li>" +
        "</ol>" +
        '<p class="quiet">' + t("アプリはこのサイトの最新版を開くので、更新は自動です（ブラック画面は除く）。Chrome があると全画面で動きます。無料・広告なし・ログインなし。", "The apps open the latest version from this site, so updates are automatic (except Black Screen). Works full-screen with Chrome installed. Free, no ads, no login.") + "</p>" +
        '<form method="dialog"><button class="open-btn" type="submit">' + t("閉じる", "Close") + "</button></form>";
      document.body.appendChild(help);
    }
    if (typeof help.showModal === "function") help.showModal();
    else help.setAttribute("open", "");
  }

  // ---------- per-card buttons ----------
  var apkCache = {};
  function apkExists(name) {
    if (!(name in apkCache)) {
      apkCache[name] = fetch(APK_DIR + name + ".apk", { method: "HEAD", cache: "no-cache" })
        .then(function (r) { return r.ok; })
        .catch(function () { return false; });
    }
    return apkCache[name];
  }

  function slugOf(card) {
    if (card.getAttribute("data-apk")) return card.getAttribute("data-apk");
    var a = card.querySelector("a.art-link");
    var m = a && /gutsmcd-cmd\.github\.io\/([^\/?#]+)\//.exec(a.href);
    return m ? m[1] : null;
  }

  function addToggle(box, panelHtml) {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "inst-more";
    btn.setAttribute("aria-expanded", "false");
    btn.innerHTML = panelHtml.label;
    var panel = document.createElement("div");
    panel.className = "inst-panel";
    panel.hidden = true;
    panel.innerHTML = panelHtml.body;
    btn.addEventListener("click", function () {
      panel.hidden = !panel.hidden;
      btn.setAttribute("aria-expanded", panel.hidden ? "false" : "true");
    });
    box.appendChild(btn);
    box.appendChild(panel);
  }

  function addBox(card) {
    var box = document.createElement("div");
    box.className = "inst";
    var src = card.querySelector(".src");
    if (src) card.insertBefore(box, src); else card.appendChild(box);
    card.classList.add("has-inst");
    return box;
  }

  function androidCard(card, slug, appUrl) {
    apkExists(slug).then(function (ok) {
      if (!ok || card.querySelector(".inst")) return; // no APK yet: keep the card as it was
      var box = addBox(card);
      box.innerHTML = '<a class="open-btn" href="' + APK_DIR + slug + '.apk" download>' + t("アプリを入れる", "Install app") + "</a>";
      var body = "";
      if (appUrl) {
        body += "<p>" + t('<a href="' + appUrl + '" rel="noopener">ブラウザで開く</a>（入れずに使う）', '<a href="' + appUrl + '" rel="noopener">Open in browser</a> (use without installing)') + "</p>" +
          "<p>" + t("または、開いたページで Chrome のメニュー ⋮ →「ホーム画面に追加」。", "Or, on that page, Chrome menu ⋮ → “Add to Home screen”.") + "</p>";
      }
      body += '<p><a href="#" class="inst-help">' + t("APK の入れ方", "How to install the APK") + "</a></p>";
      addToggle(box, { label: t("ほかの方法", "Other ways"), body: body });
      box.querySelector(".inst-help").addEventListener("click", function (e) { e.preventDefault(); openHelp(); });
      // First tap on an Install button also shows the one-time steps.
      box.querySelector(".open-btn").addEventListener("click", function () {
        var k = "m-free-apps-apk-help-seen";
        try { if (localStorage.getItem(k)) return; localStorage.setItem(k, "1"); } catch (e) {}
        setTimeout(openHelp, 400);
      });
    });
  }

  function otherCard(card, appUrl) {
    if (!appUrl) {
      var box0 = addBox(card);
      box0.innerHTML = '<span class="inst-note">' + t("Android 専用のアプリです。", "Android-only app.") + "</span>";
      return;
    }
    var box = addBox(card);
    box.innerHTML = '<a class="open-btn" href="' + appUrl + '" rel="noopener">' + t("開く", "Open") + "</a>";
    var tip = IS_IOS
      ? t("Safari で開いて、共有ボタン →「ホーム画面に追加」。", "Open it in Safari, then Share → “Add to Home Screen”.")
      : t("Chrome / Edge で開いて、アドレスバーのインストール アイコン（またはメニュー →「アプリをインストール」）。", "Open it in Chrome or Edge, then click the install icon in the address bar (or menu → “Install app”).");
    addToggle(box, { label: t("アプリとして入れる", "Add as an app"), body: "<p>" + tip + "</p>" });
  }

  function enhance(card) {
    if (card.getAttribute("data-inst") || card.classList.contains("is-soon")) return;
    var slug = slugOf(card);
    if (!slug) return;
    card.setAttribute("data-inst", "1");
    var apkOnly = card.getAttribute("data-apk-only") === "1";
    var appUrl = apkOnly ? null : "https://gutsmcd-cmd.github.io/" + slug + "/";
    if (IS_ANDROID) androidCard(card, slug, appUrl);
    else otherCard(card, appUrl);
  }

  // ---------- Black Screen card (General utilities, Android APK only) ----------
  var BLACK_SCREEN = '<article class="card" data-apk="black-screen" data-apk-only="1">' +
    '<a class="art-link" href="https://github.com/gutsmcd-cmd/black-screen" rel="noopener">' +
    '<div class="art"><img class="illu" src="./assets/art/black-screen.svg" alt="" width="320" height="176" /></div>' +
    '<div class="card-copy"><h3>' + t("ブラック画面", "Black Screen") + "</h3>" +
    '<p class="line">' + t("画面を真っ黒に、動画はそのまま。", "Black out the screen; video keeps playing.") + "</p></div></a>" +
    '<a class="src" href="https://github.com/gutsmcd-cmd/black-screen" rel="noopener">GitHub</a></article>';

  function ensureBlackScreen(gen) {
    // cards-b.js fills this section with innerHTML, so wait for its cards first.
    if (!gen || !gen.querySelector('a[href*="/three-things/"]')) return;
    if (gen.querySelector('[data-apk="black-screen"]')) return;
    gen.insertAdjacentHTML("beforeend", BLACK_SCREEN);
  }

  function scan() {
    ensureBlackScreen(document.getElementById("card-mount-gen"));
    ["card-mount", "card-mount-gen"].forEach(function (id) {
      var m = document.getElementById(id);
      if (!m) return;
      m.querySelectorAll("article.card").forEach(enhance);
    });
  }

  scan();
  var queued = false;
  var obs = new MutationObserver(function () {
    if (queued) return;
    queued = true;
    setTimeout(function () { queued = false; scan(); }, 50);
  });
  ["card-mount", "card-mount-gen"].forEach(function (id) {
    var m = document.getElementById(id);
    if (m) obs.observe(m, { childList: true });
  });
})();
