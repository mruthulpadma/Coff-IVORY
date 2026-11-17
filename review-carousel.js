document.addEventListener('DOMContentLoaded', () => {
  const viewport = document.querySelector('.review-grid');
  const cards = Array.from(viewport?.querySelectorAll('.review-card') || []);

  if (!viewport || cards.length < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const track = document.createElement('div');
  track.className = 'review-track';
  cards.forEach((card) => track.appendChild(card));

  const clones = cards.map((card) => {
    const clone = card.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    return clone;
  });
  clones.forEach((clone) => track.appendChild(clone));
  viewport.appendChild(track);

  let cycleWidth = 0;
  let offset = 0;
  let lastTime = 0;
  let paused = false;
  const speed = 48;

  const measure = () => {
    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    cycleWidth = cards.reduce((width, card) => width + card.getBoundingClientRect().width, 0) + gap * cards.length;
    offset %= cycleWidth || 1;
    track.style.transform = `translate3d(${offset}px, 0, 0)`;
  };

  const animate = (time) => {
    if (!lastTime) lastTime = time;
    const elapsed = Math.min(time - lastTime, 50);
    lastTime = time;

    if (!paused && cycleWidth) {
      offset -= speed * elapsed / 1000;
      if (offset <= -cycleWidth) offset += cycleWidth;
      track.style.transform = `translate3d(${offset}px, 0, 0)`;
    }

    window.requestAnimationFrame(animate);
  };

  viewport.addEventListener('mouseenter', () => { paused = true; });
  viewport.addEventListener('mouseleave', () => { paused = false; });
  viewport.addEventListener('focusin', () => { paused = true; });
  viewport.addEventListener('focusout', () => { paused = false; });
  window.addEventListener('resize', measure);
  measure();
  window.requestAnimationFrame(animate);
});