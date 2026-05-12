/* ══════════════════════════════════════════════════
   UI.JS — code partagé entre toutes les pages
   ══════════════════════════════════════════════════ */

/* ── Hamburger nav ── */
(function () {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (!hamburger || !mobileMenu) return;
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });
  mobileMenu.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    })
  );
})();

/* ── Helpers ── */
function statusBadgeHTML(status, version) {
  const label =
  status === 'done'
    ? (version ? `Terminé · v${version}` : 'Terminé')
    : status === 'paused'
      ? (version ? `Suspendu · v${version}` : 'Suspendu')
      : status === 'sleeping'
        ? (version ? `En veille · v${version}` : 'En veille')
        : status === 'stopped'
          ? (version ? `Arrêté · v${version}` : 'Arrêté')
          : (version ? `En cours · v${version}` : 'En cours');
const cls =
  status === 'done'
    ? 'status-done'
    : status === 'paused'
      ? 'status-paused'
      : status === 'stopped'
        ? 'status-stopped'
        : 'status-wip';
  return `<span class="status-badge ${cls}">${label}</span>`;
}

function tagsHTML(tags) {
  return tags.map(t => `<span class="tag">${t}</span>`).join('');
}

function cardHTML(p) {
  return `
    <a href="${p.id}.html" class="card project-item" data-tags="${p.tags.join(' ')}">
      ${statusBadgeHTML(p.status, p.version)}
      <img src="${p.images[0]}"
           alt="${p.title}"
           onerror="this.onerror=null;this.src='https://placehold.co/500x160/1b1b1d/7c5cff?text=${encodeURIComponent(p.title)}'">
      <div class="card-body">
        <h3>${p.title}${p.subtitle ? ' <span class="card-subtitle">— ' + p.subtitle + '</span>' : ''}</h3>
        <p>${p.desc}</p>
        <div class="card-tags">${tagsHTML(p.tags.slice(0, 4))}</div>
      </div>
    </a>`;
}

/* ── Home : render 3 random cards ── */
function renderHomeCards(containerId) {
  const el = document.getElementById(containerId);
  if (!el || typeof PROJECTS === 'undefined') return;
  const shuffled = [...PROJECTS].sort(() => Math.random() - 0.5).slice(0, 3);
  el.innerHTML = shuffled.map(cardHTML).join('');
}

/* ── Projects page : render all cards + filters ── */
function renderProjectsPage(gridId, searchId, noResultsId) {
  const grid = document.getElementById(gridId);
  if (!grid || typeof PROJECTS === 'undefined') return;
  grid.innerHTML = PROJECTS.map(cardHTML).join('');
  setupFilters(searchId, noResultsId);
}

function setupFilters(searchId, noResultsId) {
  const searchInput = document.getElementById(searchId);
  const noResults   = document.getElementById(noResultsId);
  const filterTags  = document.querySelectorAll('.filter-tag');
  const resetBtn    = document.getElementById('reset-btn');
  const summaryText = document.getElementById('summary-text');
  let activeFilters = new Set();

  function applyFilters() {
    const items = document.querySelectorAll('.project-item');
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    let visible = 0;
    items.forEach(item => {
      const text = item.textContent.toLowerCase();
      const tags = item.dataset.tags || '';
      const matchSearch = query === '' || text.includes(query);
      const matchFilter = activeFilters.size === 0 ||
        [...activeFilters].every(f => tags.includes(f));
      const show = matchSearch && matchFilter;
      item.style.display = show ? '' : 'none';
      if (show) visible++;
    });
    if (noResults) noResults.style.display = visible === 0 ? 'block' : 'none';
    const hasFilters = activeFilters.size > 0 || query !== '';
    if (summaryText) {
      if (!hasFilters) {
        summaryText.textContent = `${PROJECTS.length} projets affichés`;
      } else {
        const parts = [];
        if (activeFilters.size > 0) parts.push([...activeFilters].join(' + '));
        if (query) parts.push(`"${query}"`);
        summaryText.textContent = `Filtres : ${parts.join(' & ')}  —  ${visible} projet${visible !== 1 ? 's' : ''}`;
      }
    }
    if (resetBtn) resetBtn.style.display = hasFilters ? 'inline-block' : 'none';
  }

  filterTags.forEach(tag => {
    tag.addEventListener('click', () => {
      const f = tag.dataset.filter;
      if (activeFilters.has(f)) { activeFilters.delete(f); tag.classList.remove('active'); }
      else { activeFilters.add(f); tag.classList.add('active'); }
      applyFilters();
    });
  });
  if (searchInput) searchInput.addEventListener('input', applyFilters);
  if (resetBtn) resetBtn.addEventListener('click', () => {
    activeFilters.clear();
    filterTags.forEach(t => t.classList.remove('active'));
    if (searchInput) searchInput.value = '';
    applyFilters();
  });
  applyFilters();
}

/* ── Project detail page header + carousel ── */
function renderProjectPage(projectId) {
  if (typeof PROJECTS === 'undefined') return;
  const p = PROJECTS.find(x => x.id === projectId);
  if (!p) return;

  /* header */
  const headerEl = document.getElementById('project-header');
  if (headerEl) {
    headerEl.innerHTML = `
      <a href="projects.html" class="back-link">← Retour aux projets</a>
      <h1>${p.title}${p.subtitle ? ' <span>' + p.subtitle + '</span>' : ''}</h1>
      <div class="project-meta">
        ${statusBadgeHTML(p.status, p.version)}
        ${p.github ? `<a href="${p.github}" target="_blank" rel="noopener" class="btn-github">GitHub →</a>` : ''}
      </div>
      <p class="project-desc">${p.desc}</p>
      <div class="tags">${tagsHTML(p.tags)}</div>
    `;
  }

  /* carousel */
  const carouselEl = document.getElementById('project-carousel');
  if (carouselEl && p.images.length > 0) {
    let current = 0;
    const imgs = p.images;
    const showArrows = imgs.length > 1;
    carouselEl.innerHTML = `
      <div class="carousel">
        <img id="carousel-img" class="project-img-main"
             src="${imgs[0]}"
             alt="${p.title}"
             onerror="this.onerror=null;this.src='https://placehold.co/900x420/1b1b1d/7c5cff?text=${encodeURIComponent(p.title)}'">
        ${showArrows ? `
          <button class="carousel-btn carousel-prev" id="carousel-prev">&#8249;</button>
          <button class="carousel-btn carousel-next" id="carousel-next">&#8250;</button>
        ` : ''}
        ${imgs.length > 1 ? `
          <div class="carousel-dots" id="carousel-dots">
            ${imgs.map((_, i) => `<span class="carousel-dot${i === 0 ? ' active' : ''}" data-i="${i}"></span>`).join('')}
          </div>
        ` : ''}
      </div>`;

    function goTo(i) {
      current = (i + imgs.length) % imgs.length;
      const imgEl = document.getElementById('carousel-img');
      imgEl.style.opacity = '0';
      setTimeout(() => {
        imgEl.src = imgs[current];
        imgEl.onerror = function () { this.onerror=null; this.src=`https://placehold.co/900x420/1b1b1d/7c5cff?text=${encodeURIComponent(p.title)}`; };
        imgEl.style.opacity = '1';
      }, 180);
      document.querySelectorAll('.carousel-dot').forEach((d, idx) =>
        d.classList.toggle('active', idx === current));
    }

    if (showArrows) {
      document.getElementById('carousel-prev').addEventListener('click', () => goTo(current - 1));
      document.getElementById('carousel-next').addEventListener('click', () => goTo(current + 1));
    }
    document.querySelectorAll('.carousel-dot').forEach(dot =>
      dot.addEventListener('click', () => goTo(+dot.dataset.i)));
  }
}
