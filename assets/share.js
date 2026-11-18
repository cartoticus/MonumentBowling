// Monument Bowling — share button behavior.
// Any element with [data-share] opens the native share sheet where available,
// otherwise copies the link.
(function () {
  function toast(message) {
    var t = document.createElement("div");
    t.className = "share-toast";
    t.textContent = message;
    document.body.appendChild(t);
    requestAnimationFrame(function () { t.classList.add("show"); });
    setTimeout(function () {
      t.classList.remove("show");
      setTimeout(function () { t.remove(); }, 300);
    }, 1800);
  }

  function copy(url) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(function () { toast("Link copied!"); })
        .catch(function () { window.prompt("Copy this link:", url); });
    } else {
      window.prompt("Copy this link:", url);
    }
  }

  document.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-share]");
    if (!btn) return;
    e.preventDefault();
    var url = btn.getAttribute("data-share-url") || location.href;
    var data = {
      title: btn.getAttribute("data-share-title") || document.title,
      text: btn.getAttribute("data-share-text") || "",
      url: url
    };
    if (navigator.share) {
      navigator.share(data).catch(function () {});
    } else {
      copy(url);
    }
  });
})();
