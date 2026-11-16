(() => {
  const toggle = document.querySelector('.navbar__toggle');
  const menu = document.querySelector('.navbar__menu');
  if (!toggle || !menu) return;

  const setMenu = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
    menu.classList.toggle('navbar__menu--open', open);
  };

  toggle.addEventListener('click', () => {
    setMenu(toggle.getAttribute('aria-expanded') !== 'true');
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMenu(false));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setMenu(false);
  });

  window.matchMedia('(min-width: 48rem)').addEventListener('change', (e) => {
    if (e.matches) setMenu(false);
  });
})();

const projectFilters = DocumentFragment.querySelector('.projects__filters');

if(projectFilters) {
  const button = projectFilters.querySelectorAll('.filter');
  const cards = document.querySelectorAll('.project-card');
  const status = document.querySelectorAll('.projects__status');

  const applyFilter = (value) => {
    let visibleCount = 0;

    cards.forEach ((card) => {
      const categories = card.dataset.category.split(' ');
      const isVisible = value === 'all' || categories.includes(value);
      card.hidden = !isVisible;
      if(isVisible) visibleCount += 1;
    });

    button.forEach((button) => {
      const isActive = button.dataset.filter === value;
      button.classList.toggle('filter--active', isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });

    status.textContent = `${visibileCount} projet${visibileCount > 1 ? 's' : ''} affiché${visibleCount > 1 ? 's' : ''}`;

    projectFilters.addEventListener('click', (event) => {
      const button = event.target.closet('.filter');
      if (button) applyFilter(button.dataset.filter);
    });
    
  }
}