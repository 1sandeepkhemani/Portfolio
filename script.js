const state = {
  data: null,
  activeCategory: "All",
  search: "",
  roleIndex: 0,
  roleTimer: null
};

const selectors = {
  loader: document.getElementById("loader"),
  header: document.getElementById("siteHeader"),
  navToggle: document.getElementById("navToggle"),
  navLinks: document.getElementById("navLinks"),
  scrollProgress: document.getElementById("scrollProgress"),
  scrollTop: document.getElementById("scrollTop"),
  roleRotator: document.getElementById("roleRotator"),
  heroActions: document.getElementById("heroActions"),
  heroMetrics: document.getElementById("heroMetrics"),
  aboutContent: document.getElementById("aboutContent"),
  skillsContent: document.getElementById("skillsContent"),
  experienceTimeline: document.getElementById("experienceTimeline"),
  servicesContent: document.getElementById("servicesContent"),
  featuredProject: document.getElementById("featuredProject"),
  projectGrid: document.getElementById("projectGrid"),
  projectSearch: document.getElementById("projectSearch"),
  projectFilters: document.getElementById("projectFilters"),
  educationGrid: document.getElementById("educationGrid"),
  contactLinks: document.getElementById("contactLinks"),
  footerLinks: document.getElementById("footerLinks"),
  contactForm: document.getElementById("contactForm"),
  formStatus: document.getElementById("formStatus"),
  year: document.getElementById("year"),
  canvas: document.getElementById("ambientCanvas")
};

const icons = {
  download:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v11m0 0 4-4m-4 4-4-4M5 21h14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  mail:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16v12H4z"/><path d="m4 7 8 6 8-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>',
  link:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7 0l2-2a5 5 0 0 0-7-7l-1 1M14 11a5 5 0 0 0-7 0l-2 2a5 5 0 0 0 7 7l1-1" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  phone:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.4 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7A2 2 0 0 1 22 16.9Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  external:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 3h7v7M10 14 21 3M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  github:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.9a3.4 3.4 0 0 0-.9-2.6c3-.3 6.1-1.5 6.1-6.7a5.2 5.2 0 0 0-1.4-3.6 4.8 4.8 0 0 0-.1-3.6s-1.1-.4-3.7 1.4a12.8 12.8 0 0 0-6.7 0C6.7 1.2 5.6 1.6 5.6 1.6a4.8 4.8 0 0 0-.1 3.6 5.2 5.2 0 0 0-1.4 3.6c0 5.2 3.1 6.4 6.1 6.7a3 3 0 0 0-.9 2.1V22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
};

const glyphs = {
  "Programming Languages": "{ }",
  "Frameworks and Tools": "</>",
  "Databases and Architecture": "DB",
  "Business Systems": "ERP",
  Enterprise: "RBAC",
  Content: "CMS",
  Business: "POS",
  Commerce: "LIB"
};

const escapeHtml = (value) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const mailto = (email) => `mailto:${encodeURIComponent(email)}`;
const tel = (phone) => `tel:${phone.replace(/[^\d+]/g, "")}`;
const isRealUrl = (href) => typeof href === "string" && href.trim() !== "" && href !== "#";

const buttonLink = ({ href, label, icon = "", variant = "secondary", target = false, disabled = false }) => {
  const attrs = target ? ' target="_blank" rel="noreferrer"' : "";
  const aria = disabled ? ' aria-disabled="true" data-placeholder="true"' : "";
  return `<a class="button button-${variant}" href="${escapeHtml(href)}"${attrs}${aria}>${icon}${escapeHtml(label)}</a>`;
};

async function loadData() {
  const response = await fetch("data/portfolio.json", { cache: "no-cache" });
  if (!response.ok) {
    throw new Error(`Portfolio data request failed with ${response.status}`);
  }
  return response.json();
}

function renderHero(personal, metrics) {
  selectors.heroActions.innerHTML = [
    buttonLink({
      href: "#projects",
      label: "View projects",
      icon: icons.external,
      variant: "primary"
    }),
    buttonLink({
      href: personal.resume,
      label: "Download resume",
      icon: icons.download
    }),
    buttonLink({
      href: personal.github,
      label: "GitHub profile",
      icon: icons.github,
      variant: "github",
      target: true
    })
  ].join("");

  selectors.heroMetrics.innerHTML = metrics
    .map(
      (metric) => `
        <div class="metric reveal">
          <strong data-count="${metric.value}" data-suffix="${escapeHtml(metric.suffix)}">0${escapeHtml(metric.suffix)}</strong>
          <span>${escapeHtml(metric.label)}</span>
        </div>
      `
    )
    .join("");

  startRoleRotator(personal.taglines);
}

function renderAbout(data) {
  const { personal } = data;
  selectors.aboutContent.innerHTML = `
    <div class="about-layout">
      <article class="panel summary-panel reveal">
        <p>${escapeHtml(personal.summary)}</p>
        <ul class="highlight-list">
          ${personal.highlights.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
        </ul>
      </article>
      <aside class="panel contact-card reveal" aria-label="Profile quick details">
        <div class="availability">
          <strong>Enterprise product focus</strong>
          <span>ERP, CRM, workforce systems, APIs, and SQL-backed business platforms.</span>
        </div>
        <div class="profile-stack">
          <span>ASP.NET Web Forms</span>
          <span>C#</span>
          <span>SQL Server</span>
          <span>REST APIs</span>
          <span>Payment Gateways</span>
          <span>Role-Based Access</span>
        </div>
        <div class="availability">
          <strong>Delivery style</strong>
          <span>Clean code, stable modules, readable dashboards, and production-minded issue resolution.</span>
        </div>
        <div class="availability">
          <strong>Payment gateway integration</strong>
          <span>Integrated secure Payment Gateway systems with transaction handling, payment status management, webhook integration, and real-time payment updates.</span>
        </div>
      </aside>
    </div>
  `;
}

function renderSkills(skills) {
  selectors.skillsContent.innerHTML = `
    <div class="skills-grid">
      ${skills
        .map(
          (group) => `
          <article class="skill-card reveal">
            <div class="card-head">
              <span class="card-glyph">${escapeHtml(glyphs[group.category] || "SK")}</span>
              <h3>${escapeHtml(group.category)}</h3>
            </div>
            <p>${escapeHtml(group.description)}</p>
            <div class="skill-list">
              ${group.items
                .map(
                  (skill) => `
                    <span class="skill-pill">${escapeHtml(skill.name)}</span>
                  `
                )
                .join("")}
            </div>
          </article>
        `
        )
        .join("")}
    </div>
  `;
}

function renderExperience(experience) {
  selectors.experienceTimeline.innerHTML = `
    <div class="timeline">
      ${experience
        .map(
          (item, index) => `
          <article class="experience-card reveal">
            <span class="work-glyph">0${index + 1}</span>
            <div class="experience-meta">
              <span class="meta-pill">${escapeHtml(item.period)}</span>
              <span class="meta-pill">${escapeHtml(item.location)}</span>
            </div>
            <h3>${escapeHtml(item.title)}</h3>
            <p><strong>${escapeHtml(item.company)}</strong> - ${escapeHtml(item.summary)}</p>
            ${item.systems
              .map(
                (system) => `
                <section class="workstream">
                  <h4>${escapeHtml(system.name)}</h4>
                  <ul>
                    ${system.points.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}
                  </ul>
                </section>
              `
              )
              .join("")}
          </article>
        `
        )
        .join("")}
    </div>
  `;
}

function renderServices() {
  if (!selectors.servicesContent) return;

  const services = [
    {
      title: "ASP.NET Web Development",
      description: "Build and enhance reliable ASP.NET Web Forms applications with clean workflows, secure forms, and maintainable C# logic.",
      tags: ["ASP.NET", "C#", "Web Forms"]
    },
    {
      title: "ERP and CRM Modules",
      description: "Design business modules for fee management, attendance, payroll, support ticketing, reports, and admin operations.",
      tags: ["ERP", "CRM", "Dashboards"]
    },
    {
      title: "API and Database Integration",
      description: "Connect systems through REST APIs, token-based authentication, SQL Server data models, and payment gateway integrations.",
      tags: ["REST APIs", "SQL Server", "Payments"]
    }
  ];

  selectors.servicesContent.innerHTML = `
    <div class="services-grid">
      ${services
        .map(
          (service, index) => `
          <article class="service-card reveal">
            <span class="service-index">0${index + 1}</span>
            <h3>${escapeHtml(service.title)}</h3>
            <p>${escapeHtml(service.description)}</p>
            <div>
              ${service.tags.map((tag) => `<span class="tech-pill">${escapeHtml(tag)}</span>`).join("")}
            </div>
          </article>
        `
        )
        .join("")}
    </div>
  `;
}

function renderProjectFilters(projects) {
  const categories = ["All", ...new Set(projects.map((project) => project.category))];
  selectors.projectFilters.innerHTML = categories
    .map(
      (category) => `
        <button class="filter-button ${category === state.activeCategory ? "is-active" : ""}" type="button" data-category="${escapeHtml(category)}">
          ${escapeHtml(category)}
        </button>
      `
    )
    .join("");

  selectors.projectFilters.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeCategory = button.dataset.category;
      renderProjectFilters(state.data.projects);
      renderProjects();
    });
  });
}

function uniqueProjects(projects) {
  const seen = new Set();
  return projects.filter((project) => {
    const key = project.title.toLowerCase().trim();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function projectMatches(project) {
  const searchable = [
    project.title,
    project.category,
    project.description,
    project.status,
    project.impact,
    ...project.technologies,
    ...project.features
  ]
    .join(" ")
    .toLowerCase();

  const matchesCategory = state.activeCategory === "All" || project.category === state.activeCategory;
  const matchesSearch = searchable.includes(state.search.trim().toLowerCase());
  return matchesCategory && matchesSearch;
}

function renderFeaturedProject(project) {
  const actions = renderProjectActions(project, true);

  selectors.featuredProject.innerHTML = `
    <div class="reveal">
      <div class="project-meta">
        <span class="meta-pill">${escapeHtml(project.status)}</span>
        <span class="meta-pill">${escapeHtml(project.category)}</span>
      </div>
      <h3>${escapeHtml(project.title)}</h3>
      <p>${escapeHtml(project.description)}</p>
      <div>
        ${project.technologies.map((tech) => `<span class="tech-pill">${escapeHtml(tech)}</span>`).join("")}
      </div>
      ${actions ? `<div class="featured-actions">${actions}</div>` : ""}
    </div>
    <div class="project-visual project-visual-large reveal" aria-label="${escapeHtml(project.title)} visual preview">
      <span class="visual-glyph">${escapeHtml(glyphs[project.category] || "APP")}</span>
      <span class="visual-label">${escapeHtml(project.impact)}</span>
    </div>
  `;
}

function renderProjectActions(project, isFeatured = false) {
  return [
    isRealUrl(project.links?.live)
      ? buttonLink({
          href: project.links.live,
          label: "Live Demo",
          icon: icons.external,
          variant: isFeatured ? "primary" : "secondary",
          target: true
        })
      : "",
    isRealUrl(project.links?.github)
      ? buttonLink({
          href: project.links.github,
          label: "GitHub",
          icon: icons.github,
          variant: "github",
          target: true
        })
      : ""
  ].join("");
}

function renderProjectCard(project) {
  const actions = renderProjectActions(project);
  const imageMarkup = isRealUrl(project.image?.src)
    ? `
      <img
        src="${escapeHtml(project.image.src)}"
        alt="${escapeHtml(project.image.alt || project.title)}"
        loading="lazy"
        decoding="async"
        referrerpolicy="no-referrer"
      />
    `
    : `
      <span class="visual-glyph">${escapeHtml(glyphs[project.category] || "APP")}</span>
      <span class="visual-label">${escapeHtml(project.category)} system</span>
    `;

  return `
    <article class="project-card reveal">
      <div class="project-visual ${isRealUrl(project.image?.src) ? "project-visual-image" : ""}">
        ${imageMarkup}
      </div>
      <div class="project-body">
        <div class="project-meta">
          <span class="meta-pill">${escapeHtml(project.status)}</span>
        </div>
        <h3>${escapeHtml(project.title)}</h3>
        <p>${escapeHtml(project.description)}</p>
        <div>
          ${project.technologies.map((tech) => `<span class="tech-pill">${escapeHtml(tech)}</span>`).join("")}
        </div>
        <ul>
          ${project.features.map((feature) => `<li>${escapeHtml(feature)}</li>`).join("")}
        </ul>
        ${actions ? `<div class="project-actions">${actions}</div>` : ""}
      </div>
    </article>
  `;
}

function renderProjects() {
  const projects = uniqueProjects(state.data.projects);
  const visibleProjects = projects.filter(projectMatches);

  selectors.featuredProject.innerHTML = "";

  selectors.projectGrid.innerHTML = visibleProjects.length
    ? visibleProjects.map(renderProjectCard).join("")
    : '<div class="empty-state reveal">No matching project found. Try another technology, module, or category.</div>';

  observeReveals();
}

function renderEducation(education) {
  selectors.educationGrid.innerHTML = `
    <div class="education-grid">
      ${education
        .map(
          (item, index) => `
          <article class="education-card reveal">
            <span class="education-index">0${index + 1}</span>
            <h3>${escapeHtml(item.degree)}</h3>
            <p>${escapeHtml(item.institution)}</p>
            <div class="education-meta">
              <span class="meta-pill">${escapeHtml(item.period)}</span>
              <span class="meta-pill">${escapeHtml(item.location)}</span>
            </div>
          </article>
        `
        )
        .join("")}
    </div>
  `;
}

function renderContact(personal) {
  selectors.contactLinks.innerHTML = `
    <h3>Direct contact</h3>
    <p>For ASP.NET developer roles, enterprise web application work, internships-to-full-time transitions, or project collaboration.</p>
    <a class="contact-link" href="${mailto(personal.email)}">${icons.mail}${escapeHtml(personal.email)}</a>
    <a class="contact-link" href="${tel(personal.phone)}">${icons.phone}${escapeHtml(personal.phone)}</a>
    <a class="contact-link" href="${escapeHtml(personal.linkedin)}" target="_blank" rel="noreferrer">${icons.link}linkedin.com/in/sandeep-khemani-6423bb195</a>
    <a class="contact-link contact-link-github" href="${escapeHtml(personal.github)}" target="_blank" rel="noreferrer">${icons.github}github.com/1sandeepkhemani</a>
    <a class="contact-link" href="${escapeHtml(personal.resume)}" target="_blank">${icons.download}Resume PDF</a>
  `;

  if (selectors.footerLinks) {
    selectors.footerLinks.innerHTML = `
      <a href="${mailto(personal.email)}" aria-label="Email">${icons.mail}<span>Email</span></a>
      <a href="${tel(personal.phone)}" aria-label="Phone">${icons.phone}<span>Phone</span></a>
      <a href="${escapeHtml(personal.linkedin)}" target="_blank" rel="noreferrer" aria-label="LinkedIn">${icons.link}<span>LinkedIn</span></a>
      <a href="${escapeHtml(personal.github)}" target="_blank" rel="noreferrer" aria-label="GitHub">${icons.github}<span>GitHub</span></a>
    `;
  }
}

function startRoleRotator(taglines) {
  if (!taglines.length) return;
  selectors.roleRotator.textContent = taglines[0];
  clearInterval(state.roleTimer);
  state.roleTimer = setInterval(() => {
    state.roleIndex = (state.roleIndex + 1) % taglines.length;
    selectors.roleRotator.style.opacity = "0";
    window.setTimeout(() => {
      selectors.roleRotator.textContent = taglines[state.roleIndex];
      selectors.roleRotator.style.opacity = "1";
    }, 180);
  }, 2600);
}

function setupNavigation() {
  selectors.navToggle.addEventListener("click", () => {
    const isOpen = selectors.navLinks.classList.toggle("is-open");
    document.body.classList.toggle("menu-open", isOpen);
    selectors.navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  selectors.navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      selectors.navLinks.classList.remove("is-open");
      document.body.classList.remove("menu-open");
      selectors.navToggle.setAttribute("aria-expanded", "false");
    });
  });

  selectors.scrollTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  window.addEventListener("scroll", updateScrollUi, { passive: true });
  window.addEventListener("resize", updateScrollUi);
  updateScrollUi();
}

function updateScrollUi() {
  const scrollY = window.scrollY;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? (scrollY / maxScroll) * 100 : 0;
  selectors.scrollProgress.style.width = `${progress}%`;
  selectors.header.classList.toggle("is-scrolled", scrollY > 20);
  selectors.scrollTop.classList.toggle("is-visible", scrollY > 620);

  const sections = [...document.querySelectorAll("main section[id]")];
  let active = "home";
  sections.forEach((section) => {
    if (scrollY >= section.offsetTop - 140) active = section.id;
  });

  selectors.navLinks.querySelectorAll("a").forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("href") === `#${active}`);
  });
}

function setupProjectSearch() {
  selectors.projectSearch.addEventListener("input", (event) => {
    state.search = event.target.value;
    renderProjects();
  });
}

let revealObserver;
let counterObserver;
let skillObserver;

function observeReveals() {
  if (!revealObserver) {
    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 }
    );
  }

  document.querySelectorAll(".reveal:not(.is-visible)").forEach((element) => revealObserver.observe(element));
  revealVisibleElements();
  window.setTimeout(revealVisibleElements, 120);
}

function revealVisibleElements() {
  document.querySelectorAll(".reveal:not(.is-visible)").forEach((element) => {
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.95 && rect.bottom > 0) {
      element.classList.add("is-visible");
      revealObserver?.unobserve(element);
    }
  });
}

function observeCounters() {
  counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.55 }
  );

  document.querySelectorAll("[data-count]").forEach((element) => counterObserver.observe(element));
}

function animateCounter(element) {
  const target = Number(element.dataset.count);
  const suffix = element.dataset.suffix || "";
  const start = performance.now();
  const duration = 1000;

  const tick = (time) => {
    const progress = Math.min((time - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    element.textContent = `${Math.round(target * eased)}${suffix}`;
    if (progress < 1) requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
}

function observeSkills() {
  skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        skillObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.28 }
  );

  document.querySelectorAll(".skill-card").forEach((card) => skillObserver.observe(card));
}

function setupContactForm(personal) {
  selectors.contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!selectors.contactForm.checkValidity()) {
      selectors.formStatus.textContent = "Please complete all required fields correctly.";
      selectors.contactForm.reportValidity();
      return;
    }

    const data = new FormData(selectors.contactForm);
    const subject = encodeURIComponent(data.get("subject"));
    const body = encodeURIComponent(`Name: ${data.get("name")}\nEmail: ${data.get("email")}\n\n${data.get("message")}`);

    selectors.formStatus.textContent = "Opening your email app...";
    window.location.href = `mailto:${personal.email}?subject=${subject}&body=${body}`;
    selectors.contactForm.reset();
  });
}

function setupAmbientCanvas() {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const canvas = selectors.canvas;
  const context = canvas.getContext("2d");
  let nodes = [];
  let animationFrame = null;

  const resize = () => {
    const ratio = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * ratio;
    canvas.height = window.innerHeight * ratio;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);

    const count = Math.min(72, Math.max(28, Math.floor((window.innerWidth * window.innerHeight) / 19000)));
    nodes = Array.from({ length: count }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      size: Math.random() * 1.8 + 0.7
    }));
  };

  const draw = () => {
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    const point = "rgba(34, 211, 238, 0.42)";
    const line = "rgba(167, 139, 250, 0.14)";

    nodes.forEach((node, index) => {
      if (!prefersReducedMotion) {
        node.x += node.vx;
        node.y += node.vy;
      }

      if (node.x < 0 || node.x > window.innerWidth) node.vx *= -1;
      if (node.y < 0 || node.y > window.innerHeight) node.vy *= -1;

      context.beginPath();
      context.arc(node.x, node.y, node.size, 0, Math.PI * 2);
      context.fillStyle = point;
      context.fill();

      for (let i = index + 1; i < nodes.length; i += 1) {
        const other = nodes[i];
        const distance = Math.hypot(node.x - other.x, node.y - other.y);
        if (distance < 145) {
          context.beginPath();
          context.moveTo(node.x, node.y);
          context.lineTo(other.x, other.y);
          context.strokeStyle = line;
          context.lineWidth = 1 - distance / 145;
          context.stroke();
        }
      }
    });

    animationFrame = requestAnimationFrame(draw);
  };

  resize();
  draw();
  window.addEventListener("resize", resize);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      cancelAnimationFrame(animationFrame);
      return;
    }
    draw();
  });
}

function renderAll(data) {
  renderHero(data.personal, data.metrics);
  renderAbout(data);
  renderSkills(data.skills);
  renderExperience(data.experience);
  renderServices();
  renderProjectFilters(data.projects);
  renderProjects();
  renderEducation(data.education);
  renderContact(data.personal);
}

async function init() {
  selectors.year.textContent = new Date().getFullYear();
  document.documentElement.dataset.theme = "dark";
  setupNavigation();
  setupProjectSearch();
  setupAmbientCanvas();

  try {
    state.data = await loadData();
    document.body.classList.add("animations-ready");
    renderAll(state.data);
    setupContactForm(state.data.personal);
    observeReveals();
    observeCounters();
    observeSkills();
  } catch (error) {
    selectors.aboutContent.innerHTML = `
      <div class="panel reveal is-visible">
        <p>Portfolio data could not be loaded. Please run this site from a local server so the JSON data file can be fetched.</p>
      </div>
    `;
    console.error(error);
  } finally {
    document.body.classList.remove("is-loading");
    selectors.loader.classList.add("is-hidden");
    updateScrollUi();
  }
}

document.addEventListener("DOMContentLoaded", init);
