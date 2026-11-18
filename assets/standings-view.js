// Monument Bowling — renders team standings from assets/standings.js.
// Any <div data-standings> on a page is filled in. Add data-compact for the short version.
(function () {
  var data = window.MB_STANDINGS;
  var targets = document.querySelectorAll("[data-standings]");
  if (!data || !targets.length) return;

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function num(n) { return Number(n).toLocaleString("en-US"); }

  var teams = (data.teams || []).map(function (t) {
    var games = t.won + t.lost;
    return Object.assign({}, t, { pct: games ? Math.round((t.won / games) * 1000) / 10 : 0 });
  }).sort(function (a, b) {
    return b.won - a.won || b.pct - a.pct || b.pins - a.pins;
  });

  var meta = [data.league, data.season, data.week ? "Week " + data.week + (data.totalWeeks ? " of " + data.totalWeeks : "") : "", data.asOf ? "as of " + data.asOf : ""]
    .filter(Boolean).join(" · ");

  targets.forEach(function (el) {
    var compact = el.hasAttribute("data-compact");
    var html = "";
    if (data.notice) html += '<div class="notice" style="margin-bottom:14px;">' + esc(data.notice) + "</div>";
    html += '<p class="hint" style="margin:0 0 8px;">' + esc(meta) + "</p>";

    html += '<table class="schedule standings"><thead><tr><th>#</th><th>Team</th><th>' +
      (compact ? "Won</th><th>Lost</th><th>Win %" : "Pts Won</th><th>Pts Lost</th><th>Win %</th><th class=\"opt\">Scratch Pins</th><th>Avg / Game</th><th class=\"opt\">High Game") +
      "</th></tr></thead><tbody>";
    teams.forEach(function (t, i) {
      html += '<tr class="' + (t.us ? "next" : "") + '"><td>' + (i + 1) + "</td><td>" + esc(t.name) + "</td><td>" + t.won + "</td><td>" + t.lost + "</td><td>" + t.pct.toFixed(1) + "</td>";
      if (!compact) html += '<td class="opt">' + num(t.pins) + "</td><td>" + t.avg + '</td><td class="opt">' + t.highGame + "</td>";
      html += "</tr>";
    });
    html += "</tbody></table>";

    if (!compact && data.results && data.results.length) {
      html += '<h2 style="margin-top:28px;">' + esc(data.resultsLabel || "Latest") + " Results</h2>" +
        '<table class="schedule results"><thead><tr><th>Match</th><th>Pins</th><th>Pts</th></tr></thead><tbody>';
      data.results.forEach(function (r) {
        var aWin = r.aPts > r.bPts, bWin = r.bPts > r.aPts;
        var us = function (n) { return /monument/i.test(n) ? "next" : ""; };
        html += '<tr class="' + (us(r.a) || us(r.b)) + '"><td>' + (aWin ? "<strong>" : "") + esc(r.a) + (aWin ? "</strong>" : "") +
          ' vs. ' + (bWin ? "<strong>" : "") + esc(r.b) + (bWin ? "</strong>" : "") + "</td><td>" + num(r.aTotal) + " – " + num(r.bTotal) +
          "</td><td>" + r.aPts + " – " + r.bPts + "</td></tr>";
      });
      html += "</tbody></table>";
    }
    el.innerHTML = html;
  });
})();
