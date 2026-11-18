# Monument Bowling — Website

A static site for the Monument Mountain Regional High School bowling team: season info, schedule, and a roster sign-up form. Built for GitHub Pages — no server, no build step, just plain HTML/CSS/JS. Same approach as the Berkshire Leisure League golf site.

## Deploying to GitHub Pages

1. Create a new GitHub repository (e.g. `monument-bowling`) and push all files in this folder to it.
2. In the repo, go to **Settings → Pages**.
3. Under "Build and deployment," set **Source** to "Deploy from a branch," pick `main` and the `/ (root)` folder, then Save.
4. GitHub gives you a URL like `https://yourusername.github.io/monument-bowling/` within a minute or two.

## The sign-up form (one-time setup)

The Join page posts to [Formspree](https://formspree.io), like the golf league site.

1. Log in to Formspree and create a **new form** (use a separate one so bowling sign-ups don't mix with golf).
2. Copy its ID (the part after `/f/` in the form URL).
3. In `join.html`, the form ID is set in the `action` attribute of `<form id="join-form">` with that ID.

Until that's done, the form shows a message telling families to email or call the coach instead of silently failing. Submissions arrive in the Formspree dashboard and are emailed to you. The free tier covers 50 submissions/month.

## Updating the schedule

Edit **only** `assets/schedule.js`. Add a row per practice, match, or event (the file has an example and field list at the top), commit, and push. The Schedule page sorts by date, dims past events, and highlights the next one. The site always loads fresh files when online; the offline cache is only a fallback.

## Updating standings each week

Edit **only** `assets/standings.js` (team data only — no bowler names or scores are ever posted). Each week:

1. Update `week` and `asOf`, then each team's `won`, `lost`, `pins`, `avg` and `highGame` from the league's standings sheet. Win % and the ranking are calculated for you.
2. Replace the `results` rows with last week's team matchups.
3. Set `notice` to `""` (it currently says these are last season's numbers).
4. Commit and push.

Or send the new weekly standings PDF to Claude and ask for the update.

## Contact form

The Contact page uses the same Formspree form as the sign-up page; its messages are labeled "Monument Bowling: message for the coach" in your inbox. To keep them separate, create a second Formspree form and change the `action` in `contact.html`.

## Privacy

This is a public site for a high school team. It never lists player names, photos, or any payment details — rosters, dues, and contact info stay in Formspree emails and your own records.

## Files

- `index.html` — home: season overview, costs, what to know, coach contact
- `schedule.html` — schedule table, driven by `assets/schedule.js`
- `standings.html` — team standings + latest results (data in `assets/standings.js`; also shown on the home page)
- `contact.html` — "Contact the Coach" message form (Formspree; no phone or email is shown on the site)
- `join.html` — roster sign-up form (Formspree)
- `assets/style.css`, `assets/share.js`, `assets/schedule.js`
- `manifest.webmanifest`, `sw.js`, `assets/icons/` — installable-app support (works offline for pages already visited)
