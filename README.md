# AIR Lab Website

Website for the Advanced Intelligent Robotics Laboratory at Ewha Womans University.

---

## File Structure

```
ewha-airlab.github.io/
├── index.html              # Page shell
├── styles/
│   └── style.css           # All styles
├── js/
│   └── main.js             # All rendering and routing logic
├── data/                   # Edit these files to update content
│   ├── lab.js              # Lab info
│   ├── publications.js     # Publication list
│   ├── members.js          # Members info
│   ├── news.js             # News and announcements
│   └── research.js         # Research projects and areas
└── assets/
    ├── members/            # Member photos
    ├── publications/
    │   ├── paper/          # Paper PDFs
    │   └── teaser/         # Publication teaser images
    └── gallery/            # Main photos
```

---

## How to Update Content

### Add a Publication

Open `data/publications.js` and add a new entry at the **top** of the `PUBLICATIONS` array (newest first).

```js
{
  year:        2026,
  title:       "Your Paper Title",
  authors:     ["Author One", "**Daeun Song**", "Author Three"],
  venue_short: "ICRA",            // Short badge label. Leave "" to hide badge.
  venue_full:  "IEEE International Conference on Robotics and Automation (ICRA), 2026",
  type:        "conference",      // "conference" | "journal"
  featured:    true,              // true = shown in home carousel
  thumbnail:   "assets/publications/teaser/yourimage.png",  // or null
  links: [
    { label: "Paper",   url: "https://arxiv.org/abs/..." },
    { label: "Project", url: "https://yourproject.github.io" },
    // Award badge (no link):
    { label: "Best Paper Award", award: true },
    // Award badge (with certificate link):
    { label: "Best Paper Award", award: true, url: "https://..." },
  ]
},
```

**Author formatting:**
- Wrap with `**...**` to bold (e.g. PI name): `"**Daeun Song**"`
- Add `<sup>*</sup>` for equal contribution: `"Author One<sup>*</sup>"`
- Add `<sup>†</sup>` for corresponding author: `"Daeun Song<sup>†</sup>"`

**Venue badge colors** (`venue_short` → badge color):

| Key     | Color  |
|---------|--------|
| `T-RO`  | Red    |
| `RA-L`  | Blue   |
| `ICRA`  | Mint   |
| `IROS`  | Yellow |
| other   | Gray   |

To add a new color, edit the `BADGE_CLS` map in `js/main.js`.

---

### Add a News Item

Open `data/news.js` and add at the **top** of `NEWS_DATA` (newest first).

```js
{
  date:  "2026.03",
  cat:   "announcement",   // see categories below
  title: "Short headline shown in list",
  body:  "Longer description shown on the News page. Can include <b>HTML</b>."
},
```

**Categories:** `announcement` · `publication` · `award` · `grant` 

---

### Add or Update a Member

Open `data/members.js`.

**Add a student group**:

```js
groups: [
  {
    title: "Graduate Students",
    type:  "student",         // "student" | "staff" | "alumni"
    members: [
      {
        name:    "Student Name",
        period:  "2025 – present",
        focus:   "Research interests",
        email:   "name@ewha.ac.kr",   // optional
        website: "https://...",        // optional
        photo:   null,                 // or "assets/members/name.jpg"
      }
    ]
  },
]
```

**Add an alumni entry** (use `type: "alumni"`):

```js
{ name: "Graduate Name, Ph.D. (2025)", now: "Postdoc, Some University" }
```

**Update PI info** — edit the `pi` object directly. Fields:
- `education[]` — degree, field, school, year
- `experience[]` — role, org, org_url (optional), period
- `links[]` — label, url

---

### Update Lab Info

Open `data/lab.js` to change:

| Field           | Description                              |
|-----------------|------------------------------------------|
| `intro`         | Hero paragraph (supports `<b>` HTML)     |
| `keywords`      | Pill chips below the intro (emoji+label) |
| `address`       | Array of address lines for the footer    |
| `phone`         | Phone number in the footer               |
| `copyright_year`| Year shown in the footer copyright line  |
| `gallery`       | Array of image paths for the main slideshow |

---

### Add a Main Slideshow Image

1. Put the image in `assets/gallery/`.
2. Add its path to `LAB_INFO.gallery` in `data/lab.js`:

```js
gallery: [
  "assets/gallery/ewha.gif",
  "assets/gallery/lab-photo.jpg",
],
```

---

## Local Development

Run a local server:
```
python3 -m http.server 8000
```
Then visit `http://localhost:8000`.

---

## Deployment

Push to `main` branch — GitHub Pages deploys automatically.
