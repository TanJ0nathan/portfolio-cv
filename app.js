(function () {
  "use strict";

  /**
   * Formspree — remplacez par l’ID de votre formulaire (voir instructions dans le README ou la doc).
   * Exemple d’URL reçue : https://formspree.io/f/xyzabcde → ID = "xyzabcde"
   */
  const FORMSPREE_FORM_ID = "xljrldjz";
  const FORMSPREE_ENDPOINT = `https://formspree.io/f/${FORMSPREE_FORM_ID}`;

  const SKILLS = [
    {
      id: "react",
      name: "React / Next.js",
      level: 75,
      tag: "Front & SSR",
      detail:
        "Composants, hooks, Server Components, routing et optimisation Core Web Vitals.",
      snippet: "const Page = async () => <main>{await load()}</main>;",
    },
    {
      id: "node",
      name: "Node.js",
      level: 88,
      tag: "Runtime",
      detail:
        "API REST, streams, middlewares, sécurité (JWT, rate limit) et tests.",
      snippet: "app.use('/api', router);",
    },
    {
      id: "db",
      name: "PostgreSQL & ORM",
      level: 85,
      tag: "Données",
      detail:
        "Schéma relationnel, transactions, index, migrations et requêtes optimisées.",
      snippet: "await db.transaction(async (tx) => { ... });",
    },
    {
      id: "css",
      name: "CSS moderne",
      level: 90,
      tag: "UI",
      detail:
        "Grid, Flexbox, variables CSS, animations et accessibilité.",
      snippet: "color-mix(in srgb, var(--accent) 40%, transparent);",
    },
    {
      id: "devops",
      name: "CI / CD & cloud",
      level: 78,
      tag: "Ops",
      detail:
        "Pipelines GitHub Actions, Docker, déploiement et monitoring.",
      snippet: "docker compose up -d",
    },
  ];

  const QUIZ = [
    {
      q: "Que signifie l’en-tête HTTP 204 ?",
      options: [
        { text: "Aucun contenu — la requête a réussi sans corps de réponse.", correct: true },
        { text: "Redirection permanente vers une autre URL.", correct: false },
        { text: "Erreur serveur — réessayez plus tard.", correct: false },
      ],
      explain: "204 No Content : succès sans payload (souvent après un PATCH/DELETE).",
    },
    {
      q: "Dans le modèle OSI, à quel niveau se situe principalement HTTP ?",
      options: [
        { text: "Couche application (7).", correct: true },
        { text: "Couche transport (4).", correct: false },
        { text: "Couche réseau (3).", correct: false },
      ],
      explain: "HTTP est un protocole de la couche application.",
    },
    {
      q: "Quel principe REST décrit l’usage cohérent des verbes HTTP (GET, POST, etc.) ?",
      options: [
        { text: "Stateless uniquement.", correct: false },
        { text: "Cache obligatoire.", correct: false },
        { text: "Interface uniforme.", correct: true },
      ],
      explain: "L’interface uniforme inclut l’utilisation standardisée des méthodes HTTP.",
    },
  ];

  const TERMINAL_WELCOME = [
    "Portfolio interactive shell — tapez « help » pour la liste des commandes.",
  ];

  const TERMINAL_CMDS = {
    help: () =>
      [
        "Commandes disponibles :",
        "  help          — cette aide",
        "  skills        — aperçu de la stack",
        "  clear         — effacer l’écran",
        "  contact       — coordonnées ",
        "  joke          — petite pause",
        "  whoami        — profil rapide",
      ].join("\n"),
    skills: () =>
      SKILLS.map((s) => `  • ${s.name} (${s.level}%) — ${s.tag}`).join("\n"),
    clear: () => "__CLEAR__",
    contact: () =>
      [
        "Contact :",
        "  Email    : jonathantan.pro@gmail.com",
        "  GitHub   : github.com/TanJ0nathan",
      ].join("\n"),
    joke: () =>
      "Seul les geeks peuvent comprendre pourquoi la peugeot 404 n'existe pas.",
    whoami: () =>
      "Développeur full stack — passionné par le produit, la qualité du code et l’expérience utilisateur.",
  };

  /* Theme */
  const themeToggle = document.getElementById("themeToggle");
  const storedTheme = localStorage.getItem("portfolio-theme");
  if (storedTheme === "light" || storedTheme === "dark") {
    document.documentElement.setAttribute("data-theme", storedTheme);
    document.body.setAttribute("data-theme", storedTheme);
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
    document.body.setAttribute("data-theme", "dark");
  }

  themeToggle?.addEventListener("click", () => {
    const next = document.body.getAttribute("data-theme") === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    document.body.setAttribute("data-theme", next);
    localStorage.setItem("portfolio-theme", next);
  });

  /* Mobile nav */
  const navToggle = document.getElementById("navToggle");
  const mobileNav = document.getElementById("mobileNav");
  navToggle?.addEventListener("click", () => {
    const open = navToggle.classList.toggle("is-open");
    mobileNav.hidden = !open;
    mobileNav.classList.toggle("is-open", open);
  });
  mobileNav?.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      navToggle?.classList.remove("is-open");
      mobileNav.hidden = true;
      mobileNav.classList.remove("is-open");
    });
  });

  /* Cursor glow */
  const glow = document.getElementById("cursorGlow");
  let gx = window.innerWidth / 2;
  let gy = window.innerHeight / 2;
  let tx = gx;
  let ty = gy;
  if (glow && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.addEventListener(
      "pointermove",
      (e) => {
        tx = e.clientX;
        ty = e.clientY;
      },
      { passive: true }
    );
    function tick() {
      gx += (tx - gx) * 0.08;
      gy += (ty - gy) * 0.08;
      glow.style.left = `${gx}px`;
      glow.style.top = `${gy}px`;
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  /* Magnetic buttons */
  document.querySelectorAll(".magnetic").forEach((el) => {
    el.addEventListener("pointermove", (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`;
    });
    el.addEventListener("pointerleave", () => {
      el.style.transform = "";
    });
  });

  /* Card tilt */
  document.querySelectorAll("[data-tilt]").forEach((card) => {
    card.addEventListener("pointermove", (e) => {
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      const rx = ((y / r.height) - 0.5) * -8;
      const ry = ((x / r.width) - 0.5) * 8;
      card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    });
    card.addEventListener("pointerleave", () => {
      card.style.transform = "";
    });
  });

  /* Scroll reveal */
  const revealEls = document.querySelectorAll("[data-reveal]");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add("is-visible");
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  revealEls.forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.06}s`;
    io.observe(el);
  });

  document.querySelectorAll(".timeline-item").forEach((el, i) => {
    el.setAttribute("data-reveal", "");
    el.style.transitionDelay = `${i * 0.1}s`;
    io.observe(el);
  });

  /* Stats counter */
  const statValues = document.querySelectorAll(".stat-value[data-count]");
  const statsIo = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const el = en.target;
        const target = parseInt(el.getAttribute("data-count"), 10);
        const dur = 1200;
        const t0 = performance.now();
        function frame(now) {
          const p = Math.min(1, (now - t0) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * eased);
          if (p < 1) requestAnimationFrame(frame);
        }
        requestAnimationFrame(frame);
        statsIo.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );
  statValues.forEach((el) => statsIo.observe(el));

  /* Terminal */
  const out = document.getElementById("terminalOutput");
  const input = document.getElementById("terminalInput");

  function appendLine(text, className = "") {
    const p = document.createElement("p");
    p.className = `terminal-line ${className}`.trim();
    p.textContent = text;
    out.appendChild(p);
    out.scrollTop = out.scrollHeight;
  }

  function runTerminal(cmdRaw) {
    const cmd = cmdRaw.trim().toLowerCase();
    if (!cmd) return;
    appendLine(`$ ${cmdRaw}`, "cmd");
    if (cmd === "clear") {
      out.innerHTML = "";
      return;
    }
    const fn = TERMINAL_CMDS[cmd];
    if (fn) {
      const result = fn();
      if (result === "__CLEAR__") {
        out.innerHTML = "";
        return;
      }
      result.split("\n").forEach((line) => appendLine(line, "ok"));
    } else {
      appendLine(`commande inconnue : « ${cmdRaw} ». Tapez help.`, "err");
    }
  }

  TERMINAL_WELCOME.forEach((l) => appendLine(l, "ok"));
  input?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      runTerminal(input.value);
      input.value = "";
    }
  });

  /* Skills UI */
  const skillsList = document.getElementById("skillsList");
  const skillDetail = document.getElementById("skillDetail");

  function renderSkillDetail(skill) {
    skillDetail.innerHTML = `
      <h3>${escapeHtml(skill.name)}</h3>
      <p>${escapeHtml(skill.detail)}</p>
      <p style="margin-top:1rem"><code>${escapeHtml(skill.snippet)}</code></p>
    `;
  }

  function escapeHtml(s) {
    const d = document.createElement("div");
    d.textContent = s;
    return d.innerHTML;
  }

  SKILLS.forEach((s, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "skill-btn";
    btn.setAttribute("role", "tab");
    btn.setAttribute("aria-selected", i === 0 ? "true" : "false");
    btn.dataset.id = s.id;
    btn.style.setProperty("--level", String(s.level / 100));
    btn.innerHTML = `
      <span>${escapeHtml(s.name)}</span>
      <span class="skill-tag">${escapeHtml(s.tag)}</span>
      <span class="skill-bar" aria-hidden="true"><span class="skill-bar-fill"></span></span>
    `;
    btn.addEventListener("click", () => {
      skillsList.querySelectorAll(".skill-btn").forEach((b) => b.setAttribute("aria-selected", "false"));
      btn.setAttribute("aria-selected", "true");
      renderSkillDetail(s);
    });
    skillsList.appendChild(btn);
  });
  if (SKILLS[0]) renderSkillDetail(SKILLS[0]);

  /* Quiz */
  const quizCard = document.getElementById("quizCard");
  const quizProgress = document.getElementById("quizProgress");
  let qIndex = 0;
  let score = 0;

  function renderQuiz() {
    if (qIndex >= QUIZ.length) {
      quizProgress.style.width = "100%";
      quizCard.innerHTML = `
        <div class="quiz-score">
          <strong>${score} / ${QUIZ.length}</strong>
          <p>Merci d'avoir joué </p>
          <button type="button" class="btn btn-primary quiz-restart" id="quizRestart">Recommencer</button>
        </div>
      `;
      document.getElementById("quizRestart")?.addEventListener("click", () => {
        qIndex = 0;
        score = 0;
        renderQuiz();
      });
      return;
    }
    const item = QUIZ[qIndex];
    quizProgress.style.width = `${((qIndex + 1) / QUIZ.length) * 100}%`;
    quizCard.innerHTML = `
      <p class="quiz-question">${escapeHtml(item.q)}</p>
      <div class="quiz-options" id="quizOptions"></div>
      <p class="quiz-feedback" id="quizFeedback" hidden></p>
    `;
    const opts = document.getElementById("quizOptions");
    const feedback = document.getElementById("quizFeedback");
    item.options.forEach((opt) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "quiz-option";
      b.textContent = opt.text;
      b.addEventListener("click", () => {
        if (b.disabled) return;
        opts.querySelectorAll(".quiz-option").forEach((x, i) => {
          x.disabled = true;
          if (item.options[i].correct) x.classList.add("correct");
        });
        if (!opt.correct) b.classList.add("wrong");
        if (opt.correct) score++;
        feedback.hidden = false;
        feedback.textContent = item.explain;
        setTimeout(() => {
          qIndex++;
          renderQuiz();
        }, 1800);
      });
      opts.appendChild(b);
    });
  }
  renderQuiz();

  /* Contact form (Formspree) */
  const form = document.getElementById("contactForm");
  const success = document.getElementById("formSuccess");
  const formError = document.getElementById("formError");
  const submitBtn = document.getElementById("formSubmitBtn");
  const defaultSubmitLabel = submitBtn?.textContent ?? "Envoyer";

  function validateField(name, el) {
    const err = document.querySelector(`[data-for="${name}"]`);
    let msg = "";
    el.classList.remove("invalid");
    if (name === "name" && el.value.trim().length < 2) msg = "Minimum 2 caractères.";
    if (name === "email") {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!re.test(el.value)) msg = "Email invalide.";
    }
    if (name === "message" && el.value.trim().length < 10) msg = "Message trop court (10 caractères min).";
    if (err) err.textContent = msg;
    if (msg) el.classList.add("invalid");
    return !msg;
  }

  form?.querySelectorAll("input, textarea").forEach((el) => {
    el.addEventListener("blur", () => validateField(el.name, el));
  });

  form?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = form.elements.namedItem("name");
    const email = form.elements.namedItem("email");
    const message = form.elements.namedItem("message");
    const ok =
      validateField("name", name) &&
      validateField("email", email) &&
      validateField("message", message);
    if (!ok) return;

    if (FORMSPREE_FORM_ID === "YOUR_FORM_ID") {
      formError.textContent =
        "Configurez votre ID Formspree dans app.js (constante FORMSPREE_FORM_ID).";
      formError.hidden = false;
      success.hidden = true;
      return;
    }

    const payload = new FormData(form);
    payload.set("_subject", `Portfolio — message de ${name.value.trim()}`);

    submitBtn.disabled = true;
    submitBtn.textContent = "Envoi en cours…";
    formError.hidden = true;
    success.hidden = true;

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: payload,
        headers: { Accept: "application/json" },
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "L’envoi a échoué. Réessayez plus tard.");
      }

      success.hidden = false;
      form.reset();
      setTimeout(() => {
        success.hidden = true;
      }, 6000);
    } catch (err) {
      formError.textContent =
        err.message || "Impossible d’envoyer le message pour le moment.";
      formError.hidden = false;
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = defaultSubmitLabel;
    }
  });

  document.getElementById("year").textContent = new Date().getFullYear();
})();
