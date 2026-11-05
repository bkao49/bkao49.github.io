// Langue : anglais ou français selon le navigateur, bouton FR / EN (choix mémorisé)
(function () {
  const EN = {
    nav1: "Home", nav2: "About", nav3: "Projects", nav4: "Skills",
    themeAria: "Change theme", themeD: "Black · green", themeL: "White",
    avail: "Available now",
    kicker: "Student at Epitech · Software, back-end, DevOps, data &amp; AI",
    h1a: "Hi, I'm Kohy.", h1b: "I build applications,", h1c: "from idea to launch.",
    rhythm: "2-year work-study programme<br>4 weeks at work, 2 weeks at school",
    cta: "Contact me →",
    l1: "01 — About", aboutH: "My journey.", altMe: "Photo of Kohy Ble",
    about1: "I started with a two-year degree in Networks and Telecoms (DUT), learning how to keep a company's computers and networks running. I soon wanted to build the software that runs on them myself.",
    about2: "So I went on to a Bachelor's degree in Computer Science at the University of Angers, where I got into artificial intelligence and application development. Now studying for an MSc in Information Systems Architecture at Epitech, I'm looking for a company where I can learn and work on real projects.",
    about3: "Outside class, I play basketball for the university club and keep up with tech news.",
    l2: "02 — Projects", projH: "A few projects.",
    altE1: "Ereuna home page: “Job offers come to you. You stay in control.”", altE2: "Ereuna dashboard: relevant offers and automatic collection",
    eTag: "Personal project · since September 2026 · in progress",
    eH: "Ereuna, my job search assistant",
    eP: "An app that finds internship and work-study offers, ranks them against my profile and helps me prepare each application. It never makes anything up and never sends anything without my approval.",
    eR: "Built with AI agents, from collecting offers to the interface.",
    altH: "Interactive map of Brest: where people live, bus stops and the tram line",
    hTag: "Team of 5 · October 2026 · 2 days",
    hP: "With my team, we checked whether people in Brest and Rennes have a bus or tram stop near home. I built the interactive maps, like this one.",
    hR: "Result: 3 out of 4 people in Brest live within 400 m of a stop, compared with just over 1 in 2 in Rennes.",
    altI: "Illustration: photos sorted by category",
    iTag: "Solo project · April 2026 · 1 week", iH: "Image recognition",
    iP: "Teaching a computer to recognise what a photo shows: a plane, a cat, a boat… I tried five methods, from the simplest to the most advanced.",
    iR: "Result: it correctly recognises 94% of images, compared with 10% by guessing.",
    altR: "Illustration: the shape of a song and the drum hits it found",
    rTag: "Pair project · LERIA lab, Angers · March to May 2026", rH: "A music game that builds its own levels",
    rP: "A program that listens to a song and spots the drum hits, to build a level for a Guitar Hero-style game on its own. I also built the game's interface.",
    rR: "Result: it finds 95% of drum hits, tested on 12 songs.",
    altB: "Bomberman screenshot: bombs exploding on the board",
    bTag: "February 2026 · 1 week",
    bP: "My own version of Bomberman: drop bombs, watch them explode, and pick up power-ups.",
    bR: "Coded in one week, in C++.",
    now: "Right now",
    oP: "A tool that logs a company's IT incidents and checks that they are fixed on time.", oI: "Since August 2026 · Python, Docker",
    tP: "A web app where employees log their working hours. I work on the screens, as part of a team.", tI: "Epitech project · October 2026 to January 2027 · React",
    code: 'My code is on <a href="https://github.com/bkao49">GitHub</a>',
    l3: "03 — Skills", s1: "Artificial intelligence", s1d: "Machine learning, image recognition, AI agents",
    s2: "Data", s2d: "Python, SQL, databases, interactive maps",
    s4: "Tools", s4d: "Git, Docker, Linux, networking",
    s5: "Soft skills", s5d: "Teamwork, organisation, communication, agile methods",
    talk: "Let's talk.", cvReq: "CV available on request, by email or on LinkedIn."
  };
  const root = document.documentElement, FR = {};
  const txt = [...document.querySelectorAll("[data-i18n]")], alt = [...document.querySelectorAll("[data-i18n-alt]")], aria = [...document.querySelectorAll("[data-i18n-aria]")];
  txt.forEach(e => FR[e.dataset.i18n] = e.innerHTML);
  alt.forEach(e => FR[e.dataset.i18nAlt] = e.alt);
  aria.forEach(e => FR[e.dataset.i18nAria] = e.getAttribute("aria-label"));
  function apply(lang) {
    const d = lang === "en" ? EN : FR;
    txt.forEach(e => { const v = d[e.dataset.i18n]; if (v != null) e.innerHTML = v; });
    alt.forEach(e => { const v = d[e.dataset.i18nAlt]; if (v != null) e.alt = v; });
    aria.forEach(e => { const v = d[e.dataset.i18nAria]; if (v != null) e.setAttribute("aria-label", v); });
    document.querySelectorAll("[data-src-en]").forEach(e => { if (!e.dataset.srcFr) e.dataset.srcFr = e.getAttribute("src"); e.setAttribute("src", lang === "en" ? e.dataset.srcEn : e.dataset.srcFr); });
    root.lang = lang;
  }
  let lang = null;
  try { lang = localStorage.getItem("kb-lang"); } catch (e) {}
  if (!lang) lang = (navigator.languages || [navigator.language || "fr"]).some(l => /^fr/i.test(l)) ? "fr" : "en";
  if (location.hash.indexOf("en") > -1 && location.hash.indexOf("static") > -1) lang = "en";
  apply(lang);
  document.getElementById("lang").addEventListener("click", () => {
    const next = root.lang === "en" ? "fr" : "en";
    apply(next);
    try { localStorage.setItem("kb-lang", next); } catch (e) {}
  });
})();

// Thème noir/vert ou blanc, particules en fond, halo, animations au défilement.
(function () {
  const root = document.documentElement;
  const calm = location.hash.indexOf("#static") === 0 || matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hero = document.querySelector(".hero");
  if (location.hash.indexOf("#static") === 0) hero.classList.add("compact");
  if (location.hash.indexOf("light") > -1) root.dataset.theme = "light";

  // thème (mémorisé si le navigateur l'autorise)
  document.getElementById("theme").addEventListener("click", () => {
    const next = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = next;
    try { localStorage.setItem("kb-theme", next); } catch (e) {}
    drawOnce();
  });

  // particules : points qui montent doucement, reliés quand ils se croisent, repoussés par la souris
  const cv = document.getElementById("fx"), ctx = cv.getContext("2d");
  const dpr = Math.min(devicePixelRatio || 1, 2);
  let W, H, ps = [], mouse = { x: -999, y: -999 };
  function size() {
    W = innerWidth; H = innerHeight; cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.round(Math.min(90, Math.max(30, W * H / 16000)));
    ps = Array.from({ length: n }, () => ({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.6 + .6, vy: -(Math.random() * .22 + .05), vx: 0, ph: Math.random() * 6.28, big: Math.random() < .12 }));
  }
  function rgb() { return getComputedStyle(root).getPropertyValue("--dot").trim() || "61,220,132"; }
  let col = rgb();
  function draw(t) {
    ctx.clearRect(0, 0, W, H);
    for (const p of ps) {
      if (!calm) {
        p.ph += .02; p.x += Math.sin(p.ph) * .15 + p.vx; p.y += p.vy; p.vx *= .94;
        const dx = p.x - mouse.x, dy = p.y - mouse.y, d = Math.hypot(dx, dy);
        if (d < 110 && d > 0) { p.vx += dx / d * .25; p.y += dy / d * .8; }
        if (p.y < -10) { p.y = H + 10; p.x = Math.random() * W; }
        if (p.x < -10) p.x = W + 10; if (p.x > W + 10) p.x = -10;
      }
      const a = (.35 + Math.sin(p.ph) * .25) * (p.big ? 1.3 : 1);
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r * (p.big ? 1.8 : 1), 0, 6.283);
      ctx.fillStyle = `rgba(${col},${Math.max(.08, a)})`; ctx.fill();
    }
    for (let i = 0; i < ps.length; i++) for (let j = i + 1; j < ps.length; j++) {
      const a = ps[i], b = ps[j], d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d < 120) { ctx.strokeStyle = `rgba(${col},${(1 - d / 120) * .14})`; ctx.lineWidth = .7; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
    }
  }
  function drawOnce() { col = rgb(); if (calm) draw(); if (typeof crain === "function") crain(); }
  function loop(t) { if (!document.hidden) draw(t); requestAnimationFrame(loop); }
  addEventListener("resize", () => { size(); if (calm) draw(); });
  addEventListener("mousemove", e => { mouse.x = e.clientX; mouse.y = e.clientY; });
  size(); draw(); if (!calm) requestAnimationFrame(loop);

  // pluie de chiffres en bas de l'écran, discrète, qui s'efface au défilement
  const cc = document.getElementById("code"), cx = cc.getContext("2d");
  let CW, CH, cols = [];
  const FS = 14, digits = "0123456789";
  function csize() {
    CW = innerWidth; CH = Math.round(innerHeight * .55);
    cc.width = CW * dpr; cc.height = CH * dpr; cx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cols = Array.from({ length: Math.ceil(CW / 22) }, () => ({ y: Math.random() * CH, v: .25 + Math.random() * .6, len: 6 + Math.floor(Math.random() * 14), s: Array.from({ length: 22 }, () => digits[Math.random() * 10 | 0]) }));
  }
  function crain() {
    cx.clearRect(0, 0, CW, CH); cx.font = FS + "px 'JetBrains Mono', Consolas, monospace";
    cols.forEach((c, i) => {
      if (!calm) { c.y += c.v; if (c.y - c.len * FS > CH) { c.y = -Math.random() * 120; c.len = 6 + Math.floor(Math.random() * 14); } if (Math.random() < .04) c.s[Math.random() * c.s.length | 0] = digits[Math.random() * 10 | 0]; }
      for (let k = 0; k < c.len; k++) {
        const a = k === 0 ? .55 : (1 - k / c.len) * .22;
        cx.fillStyle = `rgba(${col},${a})`;
        cx.fillText(c.s[k % c.s.length], i * 22 + 4, c.y - k * FS);
      }
    });
  }
  addEventListener("resize", () => { csize(); crain(); });
  csize(); crain();
  (function cloop() { if (!document.hidden && !calm) crain(); if (!calm) requestAnimationFrame(cloop); })();

  // entrée du titre + apparition au défilement
  requestAnimationFrame(() => setTimeout(() => document.body.classList.add("loaded"), 60));
  const items = [...document.querySelectorAll(".rv")];
  if (calm || !("IntersectionObserver" in window)) items.forEach(el => el.classList.add("in"));
  else {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .12, rootMargin: "0px 0px -50px 0px" });
    items.forEach(el => io.observe(el));
  }

  const bar = document.getElementById("bar"), links = [...document.querySelectorAll(".pill a")];
  const secs = links.map(a => document.querySelector(a.getAttribute("href")));
  const glow = document.querySelector(".glow");
  const topbar = document.querySelector(".topbar");
  function onScroll() {
    const max = root.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
    let cur = 0; secs.forEach((s, i) => { if (s && s.getBoundingClientRect().top < innerHeight * .5) cur = i; });
    links.forEach((a, i) => a.classList.toggle("on", i === cur));
    topbar.classList.toggle("scrolled", scrollY > innerHeight * .6);
    cc.style.setProperty("--co", Math.max(.25, 1 - scrollY / (innerHeight * .9)));
    glow.style.setProperty("--go", Math.max(.28, 1 - scrollY / (innerHeight * 1.1)));
  }
  addEventListener("scroll", onScroll, { passive: true }); onScroll();
})();
