const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Muestra un mensaje con la descripción al hacer clic en cada tarjeta "pilar"
  const pilarCards = document.querySelectorAll('.pilar-card');
  pilarCards.forEach(card => {
    const mostrarDescripcion = () => {
      const titulo = card.querySelector('h3').textContent;
      const descripcion = card.dataset.desc;
      alert(titulo + '\n\n' + descripcion);
    };
    card.addEventListener('click', mostrarDescripcion);
    // También accesible con teclado (Enter) al estar enfocada la tarjeta
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') mostrarDescripcion();
    });
  });