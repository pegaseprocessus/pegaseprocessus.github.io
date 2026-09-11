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
