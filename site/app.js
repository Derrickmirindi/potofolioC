(() => {
  'use strict';
  const $ = (s) => document.querySelector(s);
  const root = document.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const dark = matchMedia('(prefers-color-scheme: dark)');
  const themeButton = $('.theme-toggle');
  let manualTheme = false;
  const setTheme = (theme) => {
    root.dataset.theme = theme;
    themeButton.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
    themeButton.title = themeButton.getAttribute('aria-label');
  };
  setTheme(dark.matches ? 'dark' : 'light');
  themeButton.addEventListener('click', () => { manualTheme = true; setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'); draw(); });
  dark.addEventListener('change', e => { if (!manualTheme) {setTheme(e.matches ? 'dark' : 'light');draw();} });

  const menuButton = $('.menu-toggle');
  const menu = $('#mobile-nav');
  const closeMenu = () => {menu.hidden = true;menuButton.setAttribute('aria-expanded', 'false');};
  menuButton.addEventListener('click', () => { const open = menu.hidden; menu.hidden = !open; menuButton.setAttribute('aria-expanded', String(open)); });
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => {if (e.key === 'Escape' && !menu.hidden) {closeMenu();menuButton.focus();}});
  document.addEventListener('click', e => {if (!$('.site-header').contains(e.target)) closeMenu();});
  matchMedia('(min-width: 851px)').addEventListener('change', e => {if(e.matches) closeMenu();});

  const canvas = $('#folio-canvas');
  const ctx = canvas.getContext('2d');
  let w = 0, h = 0, phase = 0, lastFrame = 0, raf = 0, visible = true;
  let paused = reduced.matches;
  const motionButton = $('#motion-toggle');
  function updateMotionUI() {
    root.classList.toggle('motion-paused', paused);
    motionButton.setAttribute('aria-pressed', String(paused));
    $('.motion-label').textContent = paused ? 'Play background motion' : 'Pause background motion';
  }
  function resize() {
    w = canvas.clientWidth; h = canvas.clientHeight;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width = w * dpr; canvas.height = h * dpr;
    if(ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    draw();
  }
  function draw() {
    if (!ctx) return;
    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = root.dataset.theme === 'dark' ? 'rgba(226,162,175,.19)' : 'rgba(112,44,59,.16)';
    ctx.lineWidth = .65;
    const sway = Math.sin(phase) * 24;
    for (let i = 0; i < 24; i++) {
      const offset = i * 16;
      ctx.beginPath();
      ctx.moveTo(w * .35 + offset, -90);
      ctx.bezierCurveTo(w * .10 + offset + sway, h * .28, w * .96 + offset, h * .66, w * .54 + offset + sway, h + 90);
      ctx.stroke();
    }
  }
  function tick(time) {
    raf = 0;
    if (paused || !visible || document.hidden) return;
    if (time - lastFrame > 32) { phase += .004; draw(); lastFrame = time; }
    raf = requestAnimationFrame(tick);
  }
  function syncAnimation() {
    if(raf) cancelAnimationFrame(raf);
    raf = 0;
    if (!paused && visible && !document.hidden) raf = requestAnimationFrame(tick);
  }
  motionButton.addEventListener('click', () => {paused = !paused;updateMotionUI();syncAnimation();});
  reduced.addEventListener('change', e => {paused = e.matches;updateMotionUI();syncAnimation();});
  new IntersectionObserver(entries => {visible = entries[0].isIntersecting;syncAnimation();}).observe($('.hero'));
  document.addEventListener('visibilitychange', syncAnimation);
  new ResizeObserver(resize).observe(canvas);
  updateMotionUI();resize();syncAnimation();
  let scrollPending = false;
  const updateProgress = () => {
    const range = root.scrollHeight - innerHeight;
    $('.reading-progress').style.width = `${range > 0 ? scrollY / range * 100 : 0}%`;
    scrollPending = false;
  };
  addEventListener('scroll', () => {if(!scrollPending){scrollPending=true;requestAnimationFrame(updateProgress);}}, {passive:true});
  addEventListener('resize', updateProgress);

  const dialog = $('#image-dialog');
  $('.image-expand').addEventListener('click', e => {
    $('#dialog-image').src = e.currentTarget.dataset.image;
    dialog.showModal();
  });
  $('#close-dialog').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', e => {
    const r = dialog.getBoundingClientRect();
    if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close();
  });
  const status = $('#copy-status');
  $('#copy-email').addEventListener('click', async () => {
    status.textContent = 'Copying…';
    try {
      await Promise.race([
        navigator.clipboard.writeText('drziahcolon@gmail.com'),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Clipboard unavailable')), 1500))
      ]);
      status.textContent = 'Email copied.';
    } catch {
      const selection = getSelection();
      const range = document.createRange();
      range.selectNodeContents($('.contact-row>a'));
      selection.removeAllRanges();selection.addRange(range);
      status.textContent = 'Email selected. Use your device’s Copy command.';
    }
  });
  document.querySelectorAll('img').forEach(img => img.addEventListener('error', () => {
    if(img.id === 'dialog-image') return;
    const fallback = document.createElement('span');
    fallback.textContent = img.alt;
    fallback.className = 'image-fallback';
    img.replaceWith(fallback);
  }));
})();
