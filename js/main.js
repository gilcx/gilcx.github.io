/* ============================================================
   Portfolio — background particles + project carousel
   ============================================================ */

(function () {
  "use strict";

  const prefersReducedMotion =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ------------------------------------------------------------
   * 1. ANIMATED TECH BACKGROUND
   *    Floating "wireframe" nodes connected by lines. The cursor
   *    acts like a physical bump: nearby particles get pushed.
   * ------------------------------------------------------------ */

  const canvas = document.getElementById("bg");
  const ctx = canvas.getContext("2d");

  const LINK_DIST = 130;     // px — max distance for a connecting line
  const MOUSE_DIST = 150;    // px — radius of cursor influence
  const MOUSE_FORCE = 0.55;  // strength of the "bump"
  const MAX_SPEED = 1.6;

  let W = 0, H = 0, DPR = 1;
  let particles = [];
  const mouse = { x: -9999, y: -9999, active: false };

  function rand(min, max) {
    return min + Math.random() * (max - min);
  }

  function makeParticle() {
    return {
      x: rand(0, W),
      y: rand(0, H),
      vx: rand(-0.35, 0.35),
      vy: rand(-0.35, 0.35),
      r: rand(1.1, 2.2),
      // slightly vary the hue between wine and rose per particle
      hue: Math.random() < 0.7 ? 199 : 235,
    };
  }

  function resize() {
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W * DPR;
    canvas.height = H * DPR;
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

    // particle count scales with viewport area (kept sane)
    const target = Math.round(
      Math.min(110, Math.max(45, (W * H) / 16000))
    );
    while (particles.length < target) particles.push(makeParticle());
    particles.length = target;
  }

  function step() {
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;

      // --- cursor "bump": repel within MOUSE_DIST ---
      if (mouse.active) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const d = Math.hypot(dx, dy);
        if (d < MOUSE_DIST && d > 0.001) {
          const f = ((MOUSE_DIST - d) / MOUSE_DIST) * MOUSE_FORCE;
          p.vx += (dx / d) * f;
          p.vy += (dy / d) * f;
        }
      }

      // gentle pull back toward a calm cruise speed
      p.vx *= 0.985;
      p.vy *= 0.985;
      const sp = Math.hypot(p.vx, p.vy);
      if (sp > MAX_SPEED) {
        p.vx = (p.vx / sp) * MAX_SPEED;
        p.vy = (p.vy / sp) * MAX_SPEED;
      }
      // keep a minimum drift so the field never freezes
      if (sp < 0.12) {
        p.vx += rand(-0.15, 0.15);
        p.vy += rand(-0.15, 0.15);
      }

      // wrap around the edges
      if (p.x < -20) p.x = W + 20;
      if (p.x > W + 20) p.x = -20;
      if (p.y < -20) p.y = H + 20;
      if (p.y > H + 20) p.y = -20;
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // connecting lines (the "wireframe" look)
    for (let i = 0; i < particles.length; i++) {
      const a = particles[i];
      for (let j = i + 1; j < particles.length; j++) {
        const b = particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < LINK_DIST * LINK_DIST) {
          const d = Math.sqrt(d2);
          const alpha = (1 - d / LINK_DIST) * 0.67;
          ctx.strokeStyle = "rgba(243, 120, 140, " + alpha.toFixed(3) + ")";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    // nodes
    for (const p of particles) {
      const near =
        mouse.active &&
        Math.hypot(p.x - mouse.x, p.y - mouse.y) < MOUSE_DIST;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r + (near ? 0.6 : 0), 0, Math.PI * 2);
      ctx.fillStyle = near
        ? "rgba(253, 164, 175, 0.95)"
        : "rgba(216, 158, 172, 0.80)";
      ctx.fill();
    }

    // faint cursor ring
    if (mouse.active) {
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, MOUSE_DIST, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(244, 63, 94, 0.10)";
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }

  function loop() {
    step();
    draw();
    requestAnimationFrame(loop);
  }

  window.addEventListener("resize", resize);
  window.addEventListener("pointermove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.active = true;
  });
  window.addEventListener("pointerleave", () => {
    mouse.active = false;
    mouse.x = -9999;
    mouse.y = -9999;
  });
  // touch: treat the finger as the cursor while dragging
  window.addEventListener("touchmove", (e) => {
    if (e.touches.length) {
      mouse.x = e.touches[0].clientX;
      mouse.y = e.touches[0].clientY;
      mouse.active = true;
    }
  }, { passive: true });
  window.addEventListener("touchend", () => {
    mouse.active = false;
    mouse.x = -9999;
    mouse.y = -9999;
  });

  resize();
  if (prefersReducedMotion) {
    draw(); // single static frame, no animation
  } else {
    loop();
  }

  /* ------------------------------------------------------------
   * 2. PROJECT CAROUSEL
   *    Arrows scroll the track by one card width; disabled at
   *    the edges. Keyboard: Left/Right work when the track is
   *    focused. Drag-to-scroll works natively via overflow.
   * ------------------------------------------------------------ */

  const track = document.getElementById("carTrack");
  const prevBtn = document.getElementById("carPrev");
  const nextBtn = document.getElementById("carNext");

  function cardStep() {
    const card = track.children[0];
    if (!card) return 0;
    const gap = parseFloat(getComputedStyle(track).columnGap || "0") || 0;
    return card.getBoundingClientRect().width + gap;
  }

  function scrollByCard(dir) {
    track.scrollBy({ left: dir * cardStep(), behavior: "smooth" });
  }

  prevBtn.addEventListener("click", () => scrollByCard(-1));
  nextBtn.addEventListener("click", () => scrollByCard(1));

  function updateArrows() {
    const max = track.scrollWidth - track.clientWidth - 2;
    prevBtn.disabled = track.scrollLeft <= 2;
    nextBtn.disabled = track.scrollLeft >= max;
  }

  track.addEventListener("scroll", updateArrows, { passive: true });
  window.addEventListener("resize", updateArrows);
  window.addEventListener("load", updateArrows);
  updateArrows();

  // Arrow-key navigation when focus is inside the carousel
  track.setAttribute("tabindex", "0");
  track.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") { e.preventDefault(); scrollByCard(1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); scrollByCard(-1); }
  });

  /* ------------------------------------------------------------
   * 3. REVEAL-ON-SCROLL (sections fade in as they enter view)
   * ------------------------------------------------------------ */

  const revealEls = document.querySelectorAll(".reveal");
  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("visible"));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => io.observe(el));
  }
})();
