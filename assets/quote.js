// Monument Bowling — random quote banner.
// Loads assets/quotes.json and shows one random quote under the nav on every page.
// "New quote" shows a different one. If the file can't load, no banner is shown.
(function () {
  // Quotes left out of the banner: written for coaches (category "coaching"),
  // plus any ids listed here.
  var EXCLUDE_IDS = { "BWL-082": true };

  var nav = document.querySelector("header.site-nav");
  if (!nav) return;

  fetch("assets/quotes.json")
    .then(function (r) { if (!r.ok) throw new Error("quotes"); return r.json(); })
    .then(function (data) {
      var pool = (data.quotes || []).filter(function (q) {
        return q.text && q.category !== "coaching" && !EXCLUDE_IDS[q.id];
      });
      if (!pool.length) return;

      var banner = document.createElement("div");
      banner.className = "quote-banner";
      banner.innerHTML =
        '<div class="wrap quote-inner">' +
        '<p class="quote-text" aria-live="polite"></p>' +
        '<button type="button" class="quote-btn" aria-label="Show a different quote">New quote</button>' +
        "</div>";
      nav.insertAdjacentElement("afterend", banner);

      var textEl = banner.querySelector(".quote-text");
      var last = -1;
      function show() {
        var i;
        do { i = Math.floor(Math.random() * pool.length); } while (pool.length > 1 && i === last);
        last = i;
        textEl.textContent = "“" + pool[i].text + "”";
      }
      show();
      banner.querySelector(".quote-btn").addEventListener("click", show);
    })
    .catch(function () {});
})();
