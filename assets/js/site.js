/* gurunathparasaram.github.io — no dependencies, no build step. */
(function () {
  'use strict';

  var root = document.documentElement;
  var store = {
    get: function (k) { try { return window.localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { window.localStorage.setItem(k, v); } catch (e) { /* storage blocked: ignore */ } }
  };
  var reduceMotionQuery = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : { matches: false };
  function reduceMotion() { return reduceMotionQuery.matches; }
  function $all(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  /* ---------------- Theme ---------------- */
  var darkQuery = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : { matches: false };
  function resolvedTheme() {
    var t = root.getAttribute('data-theme');
    return t === 'light' || t === 'dark' ? t : (darkQuery.matches ? 'dark' : 'light');
  }
  function syncTheme() {
    var t = resolvedTheme();
    root.setAttribute('data-theme-resolved', t);
    $all('[data-theme-toggle]').forEach(function (b) {
      b.setAttribute('aria-label', t === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    });
  }
  $all('[data-theme-toggle]').forEach(function (b) {
    b.addEventListener('click', function () {
      var next = resolvedTheme() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      store.set('gp-theme', next);
      syncTheme();
      redrawMaps();
    });
  });
  if (darkQuery.addEventListener) darkQuery.addEventListener('change', syncTheme);
  syncTheme();

  /* ---------------- Mode ---------------- */
  function mode() { return root.getAttribute('data-mode') === 'game' ? 'game' : 'plain'; }
  function syncModeButtons() {
    $all('.mode-btn').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-set-mode') === mode()));
    });
  }
  function setMode(m) {
    if (m === mode()) return;
    root.setAttribute('data-mode', m);
    store.set('gp-mode', m);
    syncModeButtons();
    var dlg = document.getElementById('map-dialog');
    if (m === 'plain' && dlg && dlg.open) dlg.close();
    if (m === 'game') { initGame(); }
    announce(m === 'game' ? 'Game mode on. Press M for the map.' : 'Plain mode on.');
  }
  $all('[data-set-mode]').forEach(function (b) {
    b.addEventListener('click', function () { setMode(b.getAttribute('data-set-mode')); });
  });
  syncModeButtons();

  var live = document.createElement('div');
  live.className = 'visually-hidden';
  live.setAttribute('aria-live', 'polite');
  document.body.appendChild(live);
  function announce(msg) { live.textContent = ''; setTimeout(function () { live.textContent = msg; }, 50); }

  /* ---------------- Email (assembled at runtime) ---------------- */
  $all('.email-link').forEach(function (a) {
    var addr = a.getAttribute('data-user') + '@' + a.getAttribute('data-domain');
    a.href = 'mailto:' + addr;
    a.textContent = addr;
  });
  $all('[data-email-btn]').forEach(function (a) {
    var src = document.querySelector('.email-link');
    if (src) a.href = src.href;
  });

  /* ---------------- News ticker ---------------- */
  $all('.news').forEach(function (box) {
    var vp = box.querySelector('.news-viewport');
    var list = box.querySelector('.news-list');
    var btn = box.querySelector('.news-toggle');
    if (!vp || !list) return;
    var clone = null, pos = 0, last = 0, raf = 0;
    var hovering = false, focused = false, userPaused = false, offscreen = false;
    var SPEED = 16; // px per second

    function loopLength() { return clone ? clone.offsetTop - list.offsetTop : 0; }
    function shouldRun() { return clone && !hovering && !focused && !userPaused && !offscreen && !reduceMotion(); }
    function frame(t) {
      raf = 0;
      if (!shouldRun()) return;
      if (last) {
        pos += SPEED * Math.min(t - last, 100) / 1000;
        var L = loopLength();
        if (L > 0 && pos >= L) pos -= L;
        vp.scrollTop = pos;
      }
      last = t;
      raf = requestAnimationFrame(frame);
    }
    function update() {
      if (shouldRun()) {
        if (!raf) {
          var L = loopLength();
          pos = L ? vp.scrollTop % L : vp.scrollTop; // pick up after manual scrolling
          last = 0;
          raf = requestAnimationFrame(frame);
        }
      } else if (raf) { cancelAnimationFrame(raf); raf = 0; }
    }
    function setup() {
      var needsScroll = list.offsetHeight > vp.clientHeight + 4;
      if (reduceMotion() || !needsScroll) {
        if (clone) { clone.remove(); clone = null; }
        box.classList.remove('is-animated');
        if (btn) btn.hidden = true;
        vp.scrollTop = 0;
        update();
        return;
      }
      if (!clone) {
        clone = list.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        clone.classList.add('news-clone');
        $all('a, [tabindex]', clone).forEach(function (el) { el.setAttribute('tabindex', '-1'); });
        vp.appendChild(clone);
      }
      box.classList.add('is-animated');
      if (btn) btn.hidden = false;
      update();
    }
    vp.addEventListener('mouseenter', function () { hovering = true; update(); });
    vp.addEventListener('mouseleave', function () { hovering = false; update(); });
    box.addEventListener('focusin', function () { focused = true; update(); });
    box.addEventListener('focusout', function (e) { if (!box.contains(e.relatedTarget)) { focused = false; update(); } });
    vp.addEventListener('touchstart', function () { hovering = true; update(); }, { passive: true });
    vp.addEventListener('touchend', function () { setTimeout(function () { hovering = false; update(); }, 2500); }, { passive: true });
    if (btn) btn.addEventListener('click', function () {
      userPaused = !userPaused;
      btn.setAttribute('aria-pressed', String(userPaused));
      update();
    });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) { offscreen = !es[0].isIntersecting; update(); }).observe(vp);
    }
    if (reduceMotionQuery.addEventListener) reduceMotionQuery.addEventListener('change', setup);
    window.addEventListener('resize', setup);
    setup();
  });

  /* ---------------- Game ---------------- */
  var levelIds = $all('#quest-dialog .quest-node').map(function (n) { return n.getAttribute('data-level'); });
  function visited() {
    var v = [];
    try { v = JSON.parse(store.get('gp-visited') || '[]'); } catch (e) { v = []; }
    return Array.isArray(v) ? v : [];
  }
  var hud = document.querySelector('.hud');
  var currentLevel = hud ? hud.getAttribute('data-current-level') : '';
  // Every page you open counts as explored, whichever mode you are in.
  (function markVisited() {
    if (!currentLevel || levelIds.indexOf(currentLevel) < 0) return;
    var v = visited();
    if (v.indexOf(currentLevel) < 0) { v.push(currentLevel); store.set('gp-visited', JSON.stringify(v)); }
  })();

  function syncProgress() {
    var v = visited().filter(function (id) { return levelIds.indexOf(id) >= 0; });
    var total = levelIds.length || 1;
    $all('[data-xp-count]').forEach(function (el) { el.textContent = v.length; });
    $all('.xp-fill').forEach(function (el) { el.style.setProperty('--xp', Math.round(v.length / total * 100) + '%'); });
    $all('.quest-node').forEach(function (n) {
      var done = v.indexOf(n.getAttribute('data-level')) >= 0;
      n.classList.toggle('is-visited', done);
      var s = n.querySelector('.quest-state');
      if (s) s.textContent = done ? '(visited)' : '';
    });
    return v.length;
  }

  function center(el, ctx) {
    var a = el.getBoundingClientRect(), b = ctx.getBoundingClientRect();
    return { x: a.left - b.left + a.width / 2, y: a.top - b.top + a.height / 2 };
  }
  function drawMap(quest) {
    if (!quest.offsetParent) return; // hidden (closed dialog or plain mode)
    var orbs = $all('.quest-orb', quest);
    var pts = orbs.map(function (o) { return center(o, quest); });
    var d = '';
    pts.forEach(function (p, i) {
      if (!i) { d = 'M' + p.x + ' ' + p.y; return; }
      var q = pts[i - 1], dx = p.x - q.x, dy = p.y - q.y;
      if (Math.abs(dx) > Math.abs(dy)) d += ' C' + (q.x + dx / 2) + ' ' + q.y + ' ' + (p.x - dx / 2) + ' ' + p.y + ' ' + p.x + ' ' + p.y;
      else d += ' C' + q.x + ' ' + (q.y + dy / 2) + ' ' + p.x + ' ' + (p.y - dy / 2) + ' ' + p.x + ' ' + p.y;
    });
    $all('.quest-trail path', quest).forEach(function (p) { p.setAttribute('d', d); });
    placeAvatar(quest, quest._sel != null ? quest._sel : currentIndex(quest), true);
  }
  function currentIndex(quest) {
    var i = levelIds.indexOf(quest.getAttribute('data-current'));
    return i < 0 ? 0 : i;
  }
  function placeAvatar(quest, i, instant) {
    var orbs = $all('.quest-orb', quest), av = quest.querySelector('.quest-avatar');
    if (!av || !orbs[i]) return;
    var c = center(orbs[i], quest);
    if (instant) av.style.transition = 'none';
    av.style.setProperty('--ax', (c.x - 16) + 'px');
    av.style.setProperty('--ay', (c.y - orbs[i].offsetHeight / 2 - 40) + 'px');
    if (instant) { av.getBoundingClientRect(); av.style.transition = ''; }
  }
  function redrawMaps() { $all('.quest').forEach(drawMap); }

  function setupQuest(quest) {
    if (quest._ready) return;
    quest._ready = true;
    var links = $all('.quest-link', quest);
    quest._sel = currentIndex(quest);
    links.forEach(function (a, i) { a.tabIndex = i === quest._sel ? 0 : -1; });
    function select(i, focus) {
      i = (i + links.length) % links.length;
      links[quest._sel].tabIndex = -1;
      quest._sel = i;
      links[i].tabIndex = 0;
      if (focus) links[i].focus();
      placeAvatar(quest, i);
    }
    quest.addEventListener('keydown', function (e) {
      var k = e.key;
      if (k === 'ArrowRight' || k === 'ArrowDown') { select(quest._sel + 1, true); e.preventDefault(); }
      else if (k === 'ArrowLeft' || k === 'ArrowUp') { select(quest._sel - 1, true); e.preventDefault(); }
      else if (k === 'Home') { select(0, true); e.preventDefault(); }
      else if (k === 'End') { select(links.length - 1, true); e.preventDefault(); }
    });
    links.forEach(function (a, i) {
      a.addEventListener('mouseenter', function () { select(i, false); });
      a.addEventListener('focus', function () { if (quest._sel !== i) select(i, false); });
      a.addEventListener('click', function (e) {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        if (reduceMotion() || mode() !== 'game') return;
        e.preventDefault();
        select(i, false);
        setTimeout(function () { window.location.href = a.href; }, 380);
      });
    });
    if ('ResizeObserver' in window) new ResizeObserver(function () { drawMap(quest); }).observe(quest);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { drawMap(quest); });
  }

  var dialog = document.getElementById('map-dialog');
  var lastFocus = null;
  function openMap() {
    if (!dialog || mode() !== 'game') return;
    lastFocus = document.activeElement;
    if (typeof dialog.showModal === 'function') dialog.showModal(); else dialog.setAttribute('open', '');
    var q = dialog.querySelector('.quest');
    drawMap(q);
    var cur = q.querySelectorAll('.quest-link')[q._sel || 0];
    if (cur) cur.focus();
  }
  function closeMap() {
    if (!dialog) return;
    if (typeof dialog.close === 'function') dialog.close(); else dialog.removeAttribute('open');
  }
  if (dialog) {
    dialog.addEventListener('close', function () { if (lastFocus && lastFocus.focus) lastFocus.focus(); });
    dialog.addEventListener('click', function (e) { if (e.target === dialog) closeMap(); }); // backdrop click
  }
  $all('[data-open-map]').forEach(function (b) { b.addEventListener('click', openMap); });
  $all('[data-close-map]').forEach(function (b) { b.addEventListener('click', closeMap); });
  document.addEventListener('keydown', function (e) {
    if (mode() !== 'game' || e.metaKey || e.ctrlKey || e.altKey) return;
    var t = e.target, tag = t && t.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || (t && t.isContentEditable)) return;
    if ((e.key === 'm' || e.key === 'M') && !(dialog && dialog.open)) { e.preventDefault(); openMap(); }
  });

  // Toast when the visitor reaches the end of a level.
  var toast = document.querySelector('.toast');
  var toastShown = false;
  function showToast() {
    if (toastShown || !toast || mode() !== 'game') return;
    toastShown = true;
    var next = document.querySelector('.hud-next');
    var n = syncProgress(), total = levelIds.length;
    toast.innerHTML = '';
    var star = document.querySelector('.quest-star svg');
    if (star) toast.appendChild(star.cloneNode(true));
    var span = document.createElement('span');
    span.textContent = n >= total ? 'All ' + total + ' levels explored. Thanks for playing!' : 'Level clear! ' + n + '/' + total + ' explored.';
    toast.appendChild(span);
    if (next) {
      var a = document.createElement('a');
      a.href = next.href;
      a.textContent = 'Next: ' + next.textContent.trim() + ' →';
      toast.appendChild(a);
    }
    requestAnimationFrame(function () { toast.classList.add('is-shown'); });
    setTimeout(function () { toast.classList.remove('is-shown'); }, 6000);
  }
  function watchEnd() {
    var footer = document.querySelector('.site-footer');
    if (!footer || !('IntersectionObserver' in window) || !currentLevel) return;
    new IntersectionObserver(function (es) { if (es[0].isIntersecting) showToast(); }, { threshold: .2 }).observe(footer);
  }

  var gameReady = false;
  function initGame() {
    syncProgress();
    $all('.quest').forEach(setupQuest);
    requestAnimationFrame(redrawMaps);
    if (!gameReady) { gameReady = true; watchEnd(); }
  }
  if (mode() === 'game') initGame();

  /* ---------------- X / Twitter feed ---------------- */
  $all('.feed-embed').forEach(function (box) {
    var btn = box.querySelector('[data-load-feed]');
    var slot = box.querySelector('.feed-slot');
    var fallback = box.querySelector('.feed-fallback');
    var handle = box.getAttribute('data-handle');
    if (!btn || !slot || !handle) return;
    btn.hidden = false;
    btn.addEventListener('click', function () {
      btn.disabled = true;
      var a = document.createElement('a');
      a.className = 'twitter-timeline';
      a.href = 'https://twitter.com/' + encodeURIComponent(handle);
      a.setAttribute('data-height', '600');
      a.setAttribute('data-dnt', 'true');
      a.setAttribute('data-theme', resolvedTheme());
      a.textContent = 'Posts by @' + handle;
      slot.appendChild(a);
      var fail = function () { if (!slot.querySelector('iframe')) { fallback.hidden = false; btn.hidden = true; } };
      var s = document.createElement('script');
      s.src = 'https://platform.twitter.com/widgets.js';
      s.async = true;
      s.charset = 'utf-8';
      s.onerror = fail;
      document.body.appendChild(s);
      setTimeout(fail, 8000);
    });
  });
})();
