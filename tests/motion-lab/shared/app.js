(() => {
  const root = document.documentElement;
  const variant = root.dataset.variant;
  const toggle = document.querySelector('[data-panel-toggle]');
  const panel = document.querySelector('[data-panel-open]');
  const details = document.querySelector('#delivery-details');
  const status = document.querySelector('[data-status]');
  const save = document.querySelector('[data-save]');
  const form = document.querySelector('[data-form]');
  const formStatus = form.querySelector('[data-form-status]');
  const carousel = document.querySelector('[data-carousel]');
  const track = document.querySelector('[data-track]');
  const previous = document.querySelector('[data-previous]');
  const next = document.querySelector('[data-next]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  let isOpen = false;
  let motionLocked = false;
  let index = 0;

  function renderPanel() {
    root.dataset.panelOpen = String(isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.textContent = isOpen ? 'Hide delivery details' : 'Show delivery details';
    details.setAttribute('aria-hidden', String(!isOpen));
  }

  toggle.addEventListener('click', () => {
    if (variant === 'baseline' && motionLocked) return;
    isOpen = !isOpen;
    renderPanel();
    if (variant === 'baseline') {
      motionLocked = true;
      window.setTimeout(() => { motionLocked = false; }, 650);
    }
  });

  save.addEventListener('click', () => {
    status.textContent = 'Preference saved locally.';
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const message = 'Test signal accepted locally.';
    if (formStatus) {
      formStatus.textContent = message;
      formStatus.scrollIntoView({ block: 'nearest', behavior: 'instant' });
    } else status.textContent = message;
    form.reset();
  });

  function itemStep() {
    const item = track.querySelector('.sequence-item');
    const gap = Number.parseFloat(getComputedStyle(track).gap) || 0;
    return item.getBoundingClientRect().width + gap;
  }

  function moveTo(nextIndex) {
    index = Math.max(0, Math.min(2, nextIndex));
    const offset = index * itemStep();
    if (variant === 'fixed') {
      carousel.scrollTo({ left: offset, behavior: reducedMotion.matches ? 'auto' : 'smooth' });
    } else {
      track.style.left = `${-offset}px`;
    }
  }

  previous.addEventListener('click', () => moveTo(index - 1));
  next.addEventListener('click', () => moveTo(index + 1));

  let drag = null;

  carousel.addEventListener('pointerdown', (event) => {
    drag = {
      pointerId: event.pointerId,
      x: event.clientX,
      startScroll: carousel.scrollLeft,
      startLeft: Number.parseFloat(track.style.left || '0'),
    };
    try { carousel.setPointerCapture(event.pointerId); } catch {}
  });

  carousel.addEventListener('pointermove', (event) => {
    if (!drag || drag.pointerId !== event.pointerId) return;
    const delta = event.clientX - drag.x;
    if (variant === 'fixed') {
      carousel.scrollLeft = drag.startScroll - delta;
    } else {
      track.style.left = `${Math.min(0, drag.startLeft + delta)}px`;
    }
  });

  function finishDrag(event) {
    if (!drag || drag.pointerId !== event.pointerId) return;
    const delta = event.clientX - drag.x;
    if (Math.abs(delta) > 48) moveTo(index + (delta < 0 ? 1 : -1));
    try { carousel.releasePointerCapture(event.pointerId); } catch {}
    drag = null;
  }

  carousel.addEventListener('pointerup', finishDrag);
  carousel.addEventListener('pointercancel', finishDrag);

  carousel.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') { event.preventDefault(); moveTo(index + 1); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); moveTo(index - 1); }
  });

  renderPanel();
})();
