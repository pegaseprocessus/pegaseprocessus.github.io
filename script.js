const menu = document.querySelector('.menu');
const nav = document.querySelector('.nav');

if (menu && nav) {
  menu.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open');
    menu.setAttribute('aria-expanded', 'false');
  }));
}

const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {threshold: .06});
  reveals.forEach(el => observer.observe(el));
} else {
  reveals.forEach(el => el.classList.add('visible'));
}

document.querySelectorAll('[data-price-filter]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('[data-price-filter]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.priceFilter;
    document.querySelectorAll('[data-price-category]').forEach(card => {
      card.style.display = (f === 'all' || card.dataset.priceCategory === f) ? '' : 'none';
    });
  });
});

(function(){
  const cards = [...document.querySelectorAll('[data-radar-category]')];
  const filters = [...document.querySelectorAll('[data-radar-filter]')];
  const search = document.querySelector('#radarSearch');
  const count = document.querySelector('[data-visible-count]');
  let active = 'all';

  function applyRadar(){
    const q = search ? search.value.trim().toLowerCase() : '';
    let visible = 0;
    cards.forEach(card => {
      const catOk = active === 'all' || card.dataset.radarCategory === active;
      const textOk = !q || (card.dataset.searchText || '').includes(q);
      card.hidden = !(catOk && textOk);
      if (!card.hidden) visible++;
    });
    if (count) count.textContent = visible;
  }

  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      active = btn.dataset.radarFilter || 'all';
      applyRadar();
    });
  });

  if (search) search.addEventListener('input', applyRadar);
  applyRadar();
})();
