/* Navegação responsiva e animação de desmontagem por rolagem. */
(() => {
  const menuToggle = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#main-navigation');

  if (menuToggle && navigation) {
    menuToggle.addEventListener('click', () => {
      const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!isOpen));
      menuToggle.querySelector('span').textContent = isOpen ? 'Menu' : 'Fechar';
      navigation.classList.toggle('is-open', !isOpen);
    });

    navigation.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', () => {
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.querySelector('span').textContent = 'Menu';
        navigation.classList.remove('is-open');
      });
    });
  }

  const section = document.querySelector('.product-story');
  if (!section) return;

  let frame = 0;
  const updateProductStory = () => {
    frame = 0;
    const rect = section.getBoundingClientRect();
    const distance = section.offsetHeight - window.innerHeight;
    const progress = Math.max(0, Math.min(1, -rect.top / Math.max(distance, 1)));
    const explode = progress < 0.14
      ? 0
      : progress < 0.38
        ? (progress - 0.14) / 0.24
        : progress < 0.67
          ? 1
          : Math.max(0, 1 - (progress - 0.67) / 0.26);
    const open = progress < 0.1
      ? 0
      : progress < 0.27
        ? (progress - 0.1) / 0.17
        : progress < 0.72
          ? 1
          : Math.max(0, 1 - (progress - 0.72) / 0.2);

    section.style.setProperty('--progress', progress.toFixed(3));
    section.style.setProperty('--explode', explode.toFixed(3));
    section.style.setProperty('--open', open.toFixed(3));
    section.dataset.phase = progress < 0.16
      ? 'assembled'
      : progress < 0.38
        ? 'opening'
        : progress < 0.7
          ? 'exploded'
          : 'rebuild';
  };

  const scheduleUpdate = () => {
    if (!frame) frame = window.requestAnimationFrame(updateProductStory);
  };

  updateProductStory();
  window.addEventListener('scroll', scheduleUpdate, { passive: true });
  window.addEventListener('resize', scheduleUpdate);
})();
