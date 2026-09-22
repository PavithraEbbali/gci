/* =============================================================================
 *  Static build — all interactivity, no framework.
 *
 *  Each block replaces a React component from the Next app:
 *    LenisProvider · Reveal/StaggerGrid · SectionWipe · Parallax · SpeedPath
 *    MagneticButton · TiltCard · AuroraField · Header · ZipChecker · Faq
 *
 *  Everything degrades to a working, readable page if JS never runs: the CSS
 *  reduced-motion block leaves reveals visible, and the hero entrance is pure
 *  CSS with `backwards` fill.
 * ========================================================================== */

(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Touch screens synthesise mousemove on tap with no matching mouseleave,
  // which left tilt and magnetic stuck mid-transform. Require a real pointer.
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var pointerFx = !reduced && finePointer;
  var EASE = 'cubic-bezier(0.16,1,0.3,1)';

  /* ------------------------------------------------------------- Lenis --- */

  var lenis = null;
  if (!reduced && typeof window.Lenis === 'function') {
    lenis = new window.Lenis({
      duration: 1.15,
      easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
      lerp: 0.1,
    });
    (function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    })(0);
  }

  // Route same-page anchors through Lenis, matching the app's behaviour.
  document.addEventListener('click', function (e) {
    var a = e.target && e.target.closest ? e.target.closest('a[href*="#"]') : null;
    if (!a) return;
    var href = a.getAttribute('href') || '';
    var hash = href.indexOf('#') === 0 ? href : null;
    if (!hash || hash === '#') return;
    var target = document.querySelector(hash);
    if (!target) return;
    e.preventDefault();
    if (lenis) lenis.scrollTo(target, { offset: -96, duration: 1.3 });
    else target.scrollIntoView({ behavior: 'smooth' });
  });

  /* -------------------------------------------- reveals / stagger / wipe --- */

  function observe(selector, opts, onEnter) {
    var nodes = document.querySelectorAll(selector);
    if (!nodes.length) return;
    if (reduced || !('IntersectionObserver' in window)) {
      nodes.forEach(function (n) { n.classList.add('is-in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        if (onEnter) onEnter(entry.target);
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, opts);
    nodes.forEach(function (n) { io.observe(n); });
  }

  observe('.reveal', { rootMargin: '-10% 0px -10% 0px' });
  observe('.wipe', { rootMargin: '-14% 0px -14% 0px' });

  // Stagger children by index, the way Framer's staggerChildren did.
  observe('.stagger', { rootMargin: '-8% 0px -8% 0px' }, function (grid) {
    var step = parseFloat(grid.getAttribute('data-stagger') || '0.075');
    grid.querySelectorAll('.stagger-item').forEach(function (item, i) {
      item.style.setProperty('--stagger-delay', (i * step).toFixed(3) + 's');
    });
  });

  /* ------------------------------------------------------- SVG path draw --- */
  // Measure each path so the dash animation is exact at any width.
  document.querySelectorAll('.speedpath').forEach(function (svg) {
    svg.querySelectorAll('.sp-line').forEach(function (p) {
      try {
        var len = p.getTotalLength();
        p.style.setProperty('--sp-len', len);
      } catch (err) { /* getTotalLength is unavailable in some engines */ }
    });
  });
  observe('.speedpath', { rootMargin: '-15% 0px -15% 0px' });

  /* ----------------------------------------------------------- parallax --- */

  var parallaxNodes = [].slice.call(document.querySelectorAll('.parallax'));
  var heroBg = document.getElementById('hero-bg');

  function onScrollParallax() {
    if (reduced) return;
    var vh = window.innerHeight;

    parallaxNodes.forEach(function (el) {
      var d = parseFloat(el.getAttribute('data-distance') || '70');
      var r = el.getBoundingClientRect();
      // 0 when the element's top hits the bottom of the viewport, 1 when its
      // bottom passes the top — the same window Framer's useScroll used.
      var progress = (vh - r.top) / (vh + r.height);
      progress = Math.max(0, Math.min(1, progress));
      el.style.transform = 'translate3d(0,' + (d - progress * d * 2).toFixed(2) + 'px,0)';
    });

    if (heroBg) {
      var hero = document.getElementById('top');
      if (hero) {
        var hr = hero.getBoundingClientRect();
        var p = Math.max(0, Math.min(1, -hr.top / Math.max(1, hr.height)));
        heroBg.style.transform = 'translate3d(0,' + (p * 18).toFixed(2) + '%,0)';
      }
    }
  }

  /* ---------------------------------------------------- magnetic buttons --- */

  document.querySelectorAll('.magnetic').forEach(function (wrap) {
    if (!pointerFx) return;
    var strength = parseFloat(wrap.getAttribute('data-strength') || '0.32');
    var label = wrap.querySelector('.magnetic-label');
    var raf = 0, tx = 0, ty = 0, cx = 0, cy = 0;

    function tick() {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      wrap.style.transform = 'translate3d(' + cx.toFixed(2) + 'px,' + cy.toFixed(2) + 'px,0)';
      if (label) {
        label.style.transform =
          'translate3d(' + (cx * 0.42).toFixed(2) + 'px,' + (cy * 0.42).toFixed(2) + 'px,0)';
      }
      if (Math.abs(tx - cx) > 0.1 || Math.abs(ty - cy) > 0.1) raf = requestAnimationFrame(tick);
      else raf = 0;
    }
    function start() { if (!raf) raf = requestAnimationFrame(tick); }

    wrap.addEventListener('mousemove', function (e) {
      var r = wrap.getBoundingClientRect();
      tx = (e.clientX - (r.left + r.width / 2)) * strength;
      ty = (e.clientY - (r.top + r.height / 2)) * strength;
      start();
    });
    wrap.addEventListener('mouseleave', function () { tx = 0; ty = 0; start(); });
  });

  /* ---------------------------------------------------------- tilt cards --- */

  document.querySelectorAll('.tilt').forEach(function (host) {
    if (!pointerFx) return;
    var inner = host.querySelector('.tilt-inner');
    if (!inner) return;
    var max = parseFloat(host.getAttribute('data-max') || '7');

    host.addEventListener('mousemove', function (e) {
      var r = host.getBoundingClientRect();
      var px = (e.clientX - r.left) / r.width;
      var py = (e.clientY - r.top) / r.height;
      host.classList.add('is-tilting');
      inner.style.transform =
        'rotateX(' + ((0.5 - py) * 2 * max).toFixed(2) + 'deg) rotateY(' +
        ((px - 0.5) * 2 * max).toFixed(2) + 'deg)';
    });
    host.addEventListener('mouseleave', function () {
      host.classList.remove('is-tilting');
      inner.style.transform = '';
    });
  });

  /* --------------------------------------------------------- aurora field --- */
  /* Port of components/ui/AuroraField.tsx, unchanged in behaviour. */

  (function aurora() {
    var canvas = document.getElementById('aurora');
    if (!canvas || reduced) return;
    var ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    var w = 0, h = 0, dpr = 1, raf = 0, running = true, t = 0, dots = [];

    function seed() {
      var density = Math.min(120, Math.floor((w * h) / 13000));
      dots = [];
      for (var i = 0; i < density; i++) {
        dots.push({
          x: Math.random(), y: Math.random(),
          r: Math.random() * 1.9 + 0.7,
          depth: Math.random() * 0.75 + 0.25,
          ph: Math.random() * Math.PI * 2,
          warm: Math.random() > 0.78,
        });
      }
    }

    function resize() {
      var rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = rect.width; h = rect.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    }

    function draw() {
      if (!running) return;
      t += 0.003;
      ctx.clearRect(0, 0, w, h);

      var narrow = w < 900;
      var cx = w * (narrow ? 0.72 : 0.74);
      var cy = h * (narrow ? 0.2 : 0.42);
      var R = Math.min(w, h) * (narrow ? 0.3 : 0.31);

      for (var band = 0; band < 3; band++) {
        var phase = t * (0.55 + band * 0.2) + band * 2.1;
        var amp = h * (0.045 + band * 0.016);
        var baseY = h * (0.16 + band * 0.26);
        var a = 0.07 - band * 0.017;
        var grad = ctx.createLinearGradient(0, baseY - amp, w, baseY + amp);
        grad.addColorStop(0, 'rgba(0,169,224,0)');
        grad.addColorStop(0.38, band === 1 ? 'rgba(183,18,52,' + a * 0.8 + ')' : 'rgba(0,169,224,' + a + ')');
        grad.addColorStop(0.72, 'rgba(49,204,255,' + a * 0.85 + ')');
        grad.addColorStop(1, 'rgba(0,169,224,0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(0, baseY);
        for (var x = 0; x <= w; x += 24) {
          var y = baseY + Math.sin(x * 0.0041 + phase) * amp + Math.sin(x * 0.0011 - phase * 0.7) * amp * 0.5;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(w, baseY + h * 0.16);
        ctx.lineTo(0, baseY + h * 0.16);
        ctx.closePath();
        ctx.fill();
      }

      var breathe = 1 + Math.sin(t * 1.5) * 0.014;

      var bloom = ctx.createRadialGradient(cx, cy, R * 0.55, cx, cy, R * 1.85);
      bloom.addColorStop(0, 'rgba(0,169,224,0.13)');
      bloom.addColorStop(0.5, 'rgba(49,204,255,0.06)');
      bloom.addColorStop(1, 'rgba(0,169,224,0)');
      ctx.fillStyle = bloom;
      ctx.beginPath(); ctx.arc(cx, cy, R * 1.85, 0, Math.PI * 2); ctx.fill();

      var warm = ctx.createRadialGradient(cx + R * 0.6, cy + R * 0.42, R * 0.12, cx + R * 0.6, cy + R * 0.42, R * 1.25);
      warm.addColorStop(0, 'rgba(183,18,52,0.1)');
      warm.addColorStop(1, 'rgba(183,18,52,0)');
      ctx.fillStyle = warm;
      ctx.beginPath(); ctx.arc(cx + R * 0.6, cy + R * 0.42, R * 1.25, 0, Math.PI * 2); ctx.fill();

      var core = ctx.createRadialGradient(cx, cy, R * 0.1, cx, cy, R * breathe);
      core.addColorStop(0, 'rgba(255,255,255,0.5)');
      core.addColorStop(0.62, 'rgba(255,255,255,0.22)');
      core.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = core;
      ctx.beginPath(); ctx.arc(cx, cy, R * breathe, 0, Math.PI * 2); ctx.fill();

      ctx.lineWidth = 1.25;
      ctx.strokeStyle = 'rgba(0,169,224,0.3)';
      ctx.beginPath(); ctx.arc(cx, cy, R * breathe, 0, Math.PI * 2); ctx.stroke();

      ctx.lineWidth = 10;
      ctx.strokeStyle = 'rgba(49,204,255,0.05)';
      ctx.beginPath(); ctx.arc(cx, cy, R * 1.04 * breathe, 0, Math.PI * 2); ctx.stroke();

      ctx.lineWidth = 2;
      var arc = ctx.createLinearGradient(cx - R, cy - R, cx + R, cy + R);
      arc.addColorStop(0, 'rgba(0,169,224,0)');
      arc.addColorStop(0.45, 'rgba(0,169,224,0.42)');
      arc.addColorStop(0.75, 'rgba(183,18,52,0.26)');
      arc.addColorStop(1, 'rgba(183,18,52,0)');
      ctx.strokeStyle = arc;
      ctx.beginPath(); ctx.arc(cx, cy, R * breathe, Math.PI * 1.06, Math.PI * 1.94); ctx.stroke();

      for (var i = 0; i < dots.length; i++) {
        var d = dots[i];
        var px0 = ((d.x + t * 0.013 * d.depth) % 1) * w;
        var py0 = d.y * h;
        var dx = px0 - cx, dy = py0 - cy;
        var dist = Math.hypot(dx, dy) || 1;
        var px = px0, py = py0;
        if (dist < R * 2.1) {
          var bend = (R * 0.3) / Math.max(dist, R * 0.45);
          px = cx + dx * (1 + bend);
          py = cy + dy * (1 + bend);
        }
        var pulse = 0.5 + Math.sin(t * 5 + d.ph) * 0.3;
        ctx.globalAlpha = pulse * d.depth * 0.5;
        ctx.fillStyle = d.warm ? '#b71234' : '#00a9e0';
        ctx.beginPath(); ctx.arc(px, py, d.r * d.depth, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1;

      raf = requestAnimationFrame(draw);
    }

    if ('ResizeObserver' in window) new ResizeObserver(resize).observe(canvas);
    else window.addEventListener('resize', resize);
    resize();

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        var visible = entries[0].isIntersecting;
        if (visible && !running) { running = true; raf = requestAnimationFrame(draw); }
        else if (!visible && running) { running = false; cancelAnimationFrame(raf); }
      }, { threshold: 0 }).observe(canvas);
    }
    raf = requestAnimationFrame(draw);
  })();

  /* -------------------------------------------------------------- header --- */

  var headerEl = document.getElementById('site-header');
  function onScrollHeader() {
    if (!headerEl) return;
    headerEl.classList.toggle('is-elevated', window.scrollY > 8);
  }

  // Scroll-spy: clear the highlight once no service section owns the viewport.
  (function scrollSpy() {
    var links = [].slice.call(document.querySelectorAll('.nav-link[data-nav]'));
    if (!links.length || !('IntersectionObserver' in window)) return;
    var ids = links.map(function (l) { return l.getAttribute('data-nav'); });
    var onScreen = {};
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) onScreen[e.target.id] = true;
        else delete onScreen[e.target.id];
      });
      var active = null;
      for (var i = 0; i < ids.length; i++) { if (onScreen[ids[i]]) { active = ids[i]; break; } }
      links.forEach(function (l) {
        l.classList.toggle('is-active', l.getAttribute('data-nav') === active);
      });
    }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });
    ids.forEach(function (id) {
      var el = document.getElementById(id);
      if (el) io.observe(el);
    });
  })();

  /* --------------------------------------------------------- mobile menu --- */

  (function mobileMenu() {
    var toggle = document.getElementById('menu-toggle');
    var menu = document.getElementById('mobile-menu');
    var scrim = document.getElementById('menu-scrim');
    if (!toggle || !menu) return;

    function close() {
      menu.classList.remove('is-shown');
      toggle.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
      document.body.style.overflow = '';
      setTimeout(function () { menu.classList.remove('is-open'); }, 300);
    }
    function open() {
      menu.classList.add('is-open');
      toggle.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Close menu');
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(function () { menu.classList.add('is-shown'); });
    }

    toggle.addEventListener('click', function () {
      if (menu.classList.contains('is-open')) close(); else open();
    });
    if (scrim) scrim.addEventListener('click', close);
    menu.querySelectorAll('[data-menu-link]').forEach(function (l) {
      l.addEventListener('click', close);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) close();
    });
  })();

  /* ---------------------------------------------------------- ZIP checker --- */

  (function zipChecker() {
    var form = document.getElementById('zip-form');
    var input = document.getElementById('zip');
    var out = document.getElementById('zip-result');
    var dataEl = document.getElementById('zip-data');
    if (!form || !input || !out || !dataEl) return;

    var D = JSON.parse(dataEl.textContent);

    function render(kind) {
      var copy =
        kind === 'served' ? { c: D.served, tone: 'good' }
        : kind === 'outside' ? { c: D.outside, tone: 'info' }
        : { c: D.invalid, tone: 'warn' };

      var border =
        copy.tone === 'good' ? 'border-gci-glacier'
        : copy.tone === 'warn' ? 'border-gci-border'
        : 'border-gci-red/45';

      out.innerHTML =
        '<div class="zip-panel overflow-hidden">' +
          '<div class="mt-4 rounded-2xl border bg-white p-4 ' + border + '">' +
            '<p class="font-display text-[0.9375rem] font-bold text-gci-darkest">' + copy.c.t + '</p>' +
            '<p class="mt-1.5 text-[0.875rem] leading-relaxed text-gci-mid">' + copy.c.b + '</p>' +
            (kind === 'served'
              ? '<a href="' + D.phone + '" class="mt-3 inline-flex items-center gap-2 font-display text-[0.875rem] font-bold text-gci-red underline decoration-gci-red/30 underline-offset-4 transition-colors hover:text-gci-red-hover">' +
                '<svg viewBox="0 0 24 24" fill="none" class="h-[0.95em] w-[0.95em]" aria-hidden="true"><path d="M6.5 3h3l1.5 4-2 1.4a12 12 0 0 0 5.6 5.6L16 12l4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 3.5 5.2 2 2 0 0 1 5.5 3h1Z" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"/></svg>' +
                'Call to order</a>'
              : '') +
          '</div>' +
        '</div>';

      // Animate the panel open, mirroring the AnimatePresence height transition.
      var panel = out.firstElementChild;
      if (panel && !reduced) {
        var target = panel.scrollHeight;
        panel.style.height = '0px';
        panel.style.opacity = '0';
        panel.style.transition = 'height 0.4s ' + EASE + ', opacity 0.4s ' + EASE;
        requestAnimationFrame(function () {
          panel.style.height = target + 'px';
          panel.style.opacity = '1';
        });
        setTimeout(function () { panel.style.height = 'auto'; }, 430);
      }
    }

    input.addEventListener('input', function () {
      input.value = input.value.replace(/\D/g, '').slice(0, 5);
      out.innerHTML = '';
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var clean = input.value.replace(/\D/g, '');
      if (clean.length !== 5) return render('invalid');
      var served = D.prefixes.some(function (p) { return clean.indexOf(p) === 0; });
      render(served ? 'served' : 'outside');
    });
  })();

  /* ---------------------------------------------------------------- FAQ --- */

  document.querySelectorAll('.faq-trigger').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.faq-item');
      if (!item) return;
      var isOpen = item.classList.contains('is-open');

      // Single-open accordion, as in the React version.
      document.querySelectorAll('.faq-item.is-open').forEach(function (openItem) {
        openItem.classList.remove('is-open');
        var b = openItem.querySelector('.faq-trigger');
        if (b) b.setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ------------------------------------------------------------- scroll --- */

  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      onScrollHeader();
      onScrollParallax();
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  onScroll();
})();
