# Sandeep Khemani Portfolio

Modern dark-mode developer portfolio for Sandeep Khemani, an ASP.NET / Full Stack Developer focused on ERP, CRM, REST APIs, SQL Server, payment gateway integration, and business application development.

Live demo after GitHub Pages deployment:

```text
https://1sandeepkhemani.github.io/
```

## Features

- Responsive dark premium portfolio UI
- Dynamic content from `data/portfolio.json`
- Hero, About, Skills, Experience, Services, Projects, Education, Contact, and Footer sections
- Project search and category filtering
- GitHub, LinkedIn, email, phone, resume, and live project links
- Smooth reveal animations, hover effects, animated counters, and canvas background
- SEO metadata and Schema.org profile data
- GitHub Pages-ready static deployment

## Technologies

- HTML5
- CSS3
- JavaScript
- JSON-driven content
- Node.js local preview server
- GitHub Pages static hosting

## Run Locally

Use a local server so the browser can fetch `data/portfolio.json`.

```bash
npm run start
```

Open:

```text
http://localhost:5173
```

## GitHub Pages Deployment

For a root profile-style URL like `https://1sandeepkhemani.github.io/`, create a repository named:

```text
1sandeepkhemani.github.io
```

Then push this project:

```bash
git init
git branch -M main
git add index.html styles.css script.js server.mjs package.json tailwind.config.js README.md .gitignore .nojekyll data/portfolio.json "sandeep resume.pdf"
git commit -m "Deploy portfolio website"
git remote add origin https://github.com/1sandeepkhemani/1sandeepkhemani.github.io.git
git push -u origin main
```

In GitHub:

1. Open the repository settings.
2. Go to **Pages**.
3. Set **Source** to `Deploy from a branch`.
4. Select `main` and `/root`.
5. Save.

The site will be available at:

```text
https://1sandeepkhemani.github.io/
```

## Project Files

- `index.html` - SEO metadata and page structure
- `styles.css` - dark responsive UI styling
- `script.js` - dynamic rendering, filters, animations, and interactions
- `data/portfolio.json` - resume, skills, experience, projects, education, and contact data
- `sandeep resume.pdf` - downloadable resume
- `.nojekyll` - keeps GitHub Pages from applying Jekyll processing

## Notes

This project is intentionally dependency-free for fast loading and simple GitHub Pages hosting. The included Node server is only for local preview.
