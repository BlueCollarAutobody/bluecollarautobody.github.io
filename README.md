# Blue Collar Autobody

Website for Blue Collar Autobody — Red Seal certified collision, paint and body repair.

Plain HTML/CSS with a little JavaScript. No build step: GitHub Pages serves the files as they are.

## Updating shop details

Phone, email, address and hours all live in **`assets/js/config.js`**. Edit that file and the whole site updates. Anything left as `""` (or an empty hours list) shows as a highlighted placeholder until it's filled in.

```js
address: "123 Industrial Way, Abbotsford, BC V2T 0A1",
hours: [
  ["Mon – Fri", "8:00 am – 5:00 pm"],
  ["Sat", "By appointment"],
  ["Sun", "Closed"]
],
```

## Adding photos

There's a ready-made "Recent work" gallery section commented out in `index.html`. Put images in `assets/img/work/`, uncomment the section and add one `<figure>` per photo.

## Files

- `index.html` — the page
- `assets/css/styles.css` — all styling
- `assets/js/config.js` — shop details
- `assets/js/main.js` — fills in details, call/text links, mobile behaviour
- `assets/fonts/` — Barlow and Barlow Condensed (SIL Open Font License)
