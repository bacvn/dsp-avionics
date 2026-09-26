(() => {
  const ready = () => {
    if (document.querySelector('.site-panel-toggle')) return;
    const html = document.documentElement;
    const hasSidebar = html.hasAttribute('data-has-sidebar');
    const hasToc = html.hasAttribute('data-has-toc');

    const makeButton = (side, label, icon) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = `site-panel-toggle site-panel-toggle-${side}`;
      button.dataset.side = side;
      button.innerHTML = `<span aria-hidden="true">${icon}</span><span class="toggle-label">${label}</span>`;
      const update = () => {
        const open = html.classList.contains(`site-${side}-open`);
        button.setAttribute('aria-expanded', String(open));
        button.setAttribute('aria-label', `${open ? 'Ẩn' : 'Hiện'} ${label.toLowerCase()}`);
        button.title = `${open ? 'Ẩn' : 'Hiện'} ${label.toLowerCase()}`;
      };
      button.addEventListener('click', () => {
        html.classList.toggle(`site-${side}-open`);
        update();
      });
      update();
      document.body.append(button);
    };

    if (hasSidebar) makeButton('left', 'Menu', '☰');
    if (hasToc) makeButton('right', 'Mục lục', '≡');
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ready, { once: true });
  else ready();
  document.addEventListener('astro:page-load', ready);
})();
