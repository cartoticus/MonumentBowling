// Monument Bowling — season schedule.
// This is the ONLY file you edit to change the schedule. Add, remove or edit rows,
// commit, and push — the Schedule page updates itself.
//
// Each entry:
//   date:     "YYYY-MM-DD"
//   type:     "practice" | "match" | "event"
//   time:     free text, e.g. "5:15–6:15 PM"
//   location: free text, e.g. "Cove Lanes"
//   note:     optional free text (opponent, JV/Varsity, etc.)
//
// When the official 2026-27 Berkshire County schedule is published:
//   1. Replace the rows below with the real ones.
//   2. Set tentative to false (this hides the "projected" banner on the Schedule page).
//   3. Set updated to today's date.

window.MB_SCHEDULE = {
  tentative: true,   // true = projected from the 2025-26 schedule, not official
  updated: "Nov 17, 2026",
  events: [
    { date: "2026-12-04", type: "match", time: "Time TBD", location: "Cove", note: "vs. Lee" },
    { date: "2026-12-11", type: "match", time: "Time TBD", location: "Cove", note: "vs. Mt. Everett" },
    { date: "2026-12-16", type: "match", time: "Time TBD", location: "Cove", note: "vs. McCann (Wednesday match)" },
    { date: "2026-12-18", type: "match", time: "Time TBD", location: "K & M", note: "vs. Taconic" },
    { date: "2027-01-08", type: "match", time: "Time TBD", location: "Cove", note: "vs. PHS" },
    { date: "2027-01-13", type: "match", time: "Time TBD", location: "Cove", note: "vs. Lee (Wednesday match)" },
    { date: "2027-01-15", type: "match", time: "Time TBD", location: "Greylock", note: "vs. Taconic" },
    { date: "2027-01-22", type: "match", time: "Time TBD", location: "Cove", note: "vs. PHS" },
    { date: "2027-01-27", type: "match", time: "Time TBD", location: "Cove", note: "vs. McCann (Wednesday match)" },
    { date: "2027-01-29", type: "match", time: "Time TBD", location: "Greylock", note: "vs. Mt. Everett" },
    { date: "2027-02-05", type: "event", time: "Time TBD", location: "K & M", note: "Position Week" },
    { date: "2027-02-12", type: "event", time: "Time TBD", location: "Cove", note: "County Championship" },
    { date: "2027-02-27", type: "event", time: "Time TBD", location: "Cove", note: "State Teams (last year 1:30 PM)" },
    { date: "2027-02-28", type: "event", time: "Time TBD", location: "K & M", note: "State Individuals (last year 10 AM)" },
  ]
};
