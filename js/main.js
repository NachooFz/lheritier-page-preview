// Lheritier redesign preview — page behaviour
(() => {
  const $ = (s) => document.querySelector(s);
  const IMG = 'assets/img/';
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Brand marquee (list repeated so the loop is seamless)
  const brands = ['b-picodulce', 'b-pelotitas', 'b-pocillo', 'b-maltife', 'b-bessone'];
  $('#track').innerHTML = Array(4).fill(brands).flat()
    .map((b) => `<img src="${IMG}${b}.webp" alt="" height="52">`).join('');

  // Product categories
  const categories = [
    ['Chupetines Pico Dulce', 'picodulce', '#FFE3E1'],
    ['Gomitas', 'gomitas', '#E5F3E8'],
    ['Chicles', 'chicles', '#FDE6EF'],
    ['Cebada El Pocillo', 'cebada', '#FFF0D2'],
    ['Cappuccino', 'cappuccino', '#F2E8DD'],
    ['Heladería', 'heladeria', '#FBE4E2'],
    ['Budines y Pan Dulce', 'budines', '#F5E2D8'],
    ['Yerba La Tradición', 'yerba', '#EEF3D6'],
  ];
  $('#cats').innerHTML = categories.map(([name, file, bg]) => `
    <a class="card" href="#productos" style="background:${bg}">
      <div class="im"><img src="${IMG}cat-${file}.webp" alt="" loading="lazy"></div>
      <div class="nm"><span>${name}</span><span class="ar" aria-hidden="true">→</span></div>
    </a>`).join('');

  // Private label retailers
  const retailers = [
    ['Día', 'dia'], ['Carrefour', 'carrefour'], ['M&amp;K', 'mk'], ['La Anónima', 'laanonima'],
    ['Cuisine &amp; Co', 'cuisineco'], ['Primer Precio', 'primerprecio'], ['Best', 'best'],
  ];
  $('#retail').innerHTML = retailers
    .map(([name, file]) => `<div><img src="${IMG}r-${file}.webp" alt="${name}" loading="lazy"></div>`).join('');

  // Hero slider: auto-advance, dots, arrow keys, pause on hover
  const slides = [...document.querySelectorAll('.slide')];
  const dots = $('#dots');
  dots.innerHTML = slides.map((_, i) => `<button aria-label="Diapositiva ${i + 1}"></button>`).join('');
  const dotButtons = [...dots.children];
  let current = 0;
  let timer;

  const show = (i) => {
    current = (i + slides.length) % slides.length;
    slides.forEach((s, k) => {
      s.classList.toggle('on', k === current);
      s.setAttribute('aria-hidden', String(k !== current));
    });
    dotButtons.forEach((d, k) => d.setAttribute('aria-current', String(k === current)));
    dots.style.setProperty('--dot', getComputedStyle(slides[current]).getPropertyValue('--dot'));
  };
  const play = () => {
    clearInterval(timer);
    if (!reduceMotion) timer = setInterval(() => show(current + 1), 5000);
  };

  dotButtons.forEach((d, k) => d.addEventListener('click', () => { show(k); play(); }));
  const hero = $('#hero');
  hero.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { show(current + 1); play(); }
    if (e.key === 'ArrowLeft') { show(current - 1); play(); }
  });
  hero.addEventListener('mouseenter', () => clearInterval(timer));
  hero.addEventListener('mouseleave', play);
  show(0);
  play();

  // Export counter animates when visible
  const counter = $('#count');
  const counterObserver = new IntersectionObserver((entries) => {
    if (!entries[0].isIntersecting || reduceMotion) return;
    counterObserver.disconnect();
    const t0 = performance.now();
    const step = (t) => {
      const k = Math.min(1, (t - t0) / 1400);
      counter.textContent = Math.round(20 * (1 - Math.pow(1 - k, 3)));
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, { threshold: 0.5 });
  counterObserver.observe(counter);

  // Export map: dotted world with routes from Santa Fe
  const regions = [
    ['América del Norte', 150, 110], ['Centroamérica y Caribe', 175, 175], ['América del Sur', 215, 265],
    ['Europa', 320, 100], ['Medio Oriente', 380, 155], ['África', 335, 225],
  ];
  const grid = [];
  for (let y = 20; y < 370; y += 16) {
    for (let x = 20; x < 590; x += 16) grid.push(`<circle cx="${x}" cy="${y}" r="1.6" fill="#5A3236"/>`);
  }
  const origin = '<circle cx="228" cy="300" r="7" fill="#FFC72C"/>'
    + '<text x="240" y="318" fill="#FFC72C" font-size="13" font-weight="600">San Carlos, Santa Fe</text>';
  const routes = regions.map(([name, x, y], i) => `
    <g class="rg" style="opacity:0;transition:opacity .6s ${i * 0.15}s">
      <path d="M228 300 Q ${(228 + x) / 2} ${Math.min(y, 300) - 60} ${x} ${y}" fill="none" stroke="#D62027" stroke-width="2" stroke-dasharray="4 5"/>
      <circle cx="${x}" cy="${y}" r="9" fill="#D62027"/>
      <text x="${x}" y="${y - 16}" fill="#FFF6E8" font-size="13" text-anchor="middle">${name}</text>
    </g>`).join('');
  $('#map').innerHTML = grid.join('') + origin + routes;
  const mapObserver = new IntersectionObserver((entries) => {
    if (!entries[0].isIntersecting) return;
    document.querySelectorAll('.rg').forEach((g) => { g.style.opacity = 1; });
    mapObserver.disconnect();
  }, { threshold: 0.4 });
  mapObserver.observe($('.map'));

  // Language switcher (visual only in this preview)
  const langButtons = document.querySelectorAll('.lang button');
  langButtons.forEach((b) => b.addEventListener('click', () => {
    langButtons.forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
  }));

  // Contact form is not connected in this preview
  $('#form').addEventListener('submit', (e) => {
    e.preventDefault();
    $('#note').textContent = 'Vista previa: este formulario todavía no envía datos.';
  });
})();
