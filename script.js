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
