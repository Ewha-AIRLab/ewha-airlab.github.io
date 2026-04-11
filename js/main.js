'use strict';

// ─────────────────────────────────────────────
// Shared helpers
// ─────────────────────────────────────────────

const PHOTO_SVG = `<svg viewBox="0 0 200 250" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="250" fill="#f4f8f5"/><circle cx="100" cy="125" r="72" fill="#ddeae3"/><defs><clipPath id="av"><circle cx="100" cy="125" r="72"/></clipPath></defs><g clip-path="url(#av)"><circle cx="100" cy="108" r="30" fill="#b4cec2"/><ellipse cx="100" cy="192" rx="52" ry="40" fill="#b4cec2"/></g></svg>`;

const EMAIL_SVG  = `<svg viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg>`;
const GLOBE_SVG  = `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 3c-2.5 3-4 5.5-4 9s1.5 6 4 9M12 3c2.5 3 4 5.5 4 9s-1.5 6-4 9M3 12h18"/></svg>`;
const GITHUB_SVG = `<svg viewBox="0 0 24 24"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>`;

const BADGE_CLS = {
  'T-RO':'bdg-r','RA-L':'bdg-b','ICRA':'bdg-m','IROS':'bdg-y',
  // 'ICASSP':'bdg-b','ISER':'bdg-g','UR':'bdg-g',
};
function badgeCls(v) { return BADGE_CLS[v] || 'bdg-x'; }

function openLightbox(url) {
  let box = document.getElementById('lightbox');
  if (!box) {
    box = document.createElement('div');
    box.id = 'lightbox';
    box.innerHTML = '<div id="lightbox-inner"><button id="lightbox-close" onclick="closeLightbox()" aria-label="Close">&times;</button><div id="lightbox-content"></div></div>';
    box.addEventListener('click', e => { if (e.target === box) closeLightbox(); });
    document.body.appendChild(box);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
  }
  const isPdf = url.endsWith('.pdf');
  if (isPdf && window.innerWidth < 768) { window.open(url, '_blank'); return; }
  document.getElementById('lightbox-content').innerHTML = isPdf
    ? `<iframe src="${url}"></iframe>`
    : `<img src="${url}" alt="">`;
  box.classList.add('open');
}
window.openLightbox = openLightbox;

document.addEventListener('click', e => {
  const el = e.target.closest('[data-lightbox]');
  if (el) { e.preventDefault(); openLightbox(el.dataset.lightbox); }
});

function closeLightbox() {
  const box = document.getElementById('lightbox');
  if (box) box.classList.remove('open');
}

function renderAuthors(arr) {
  return arr.map(a => a.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')).join(', ');
}

// ─────────────────────────────────────────────
// Nav helpers
// ─────────────────────────────────────────────

function toggleMobileNav() {
  document.getElementById('nav-links').classList.toggle('open');
  document.getElementById('hamburger').classList.toggle('open');
}

const NAV_MAP = {
  '': 'nav-home', 'home': 'nav-home',
  'members': 'nav-members', 'publications': 'nav-publications',
  'news': 'nav-news', 'projects': 'nav-projects',
};

function setActiveNav(page) {
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  const el = document.getElementById(NAV_MAP[page]);
  if (el) el.classList.add('active');
  document.title = 'AIR Lab @ Ewha';
  document.getElementById('nav-links').classList.remove('open');
  document.getElementById('hamburger').classList.remove('open');
}

// ─────────────────────────────────────────────
// Home page
// ─────────────────────────────────────────────

function renderHome() {
  const recentPubs = [...PUBLICATIONS].filter(p => p.featured).sort((a,b) => b.year - a.year);

  const carouselItems = recentPubs.map(p => {
    const lnk = (p.links || []).find(l => l.label === 'Website' || l.label === 'Webpage') ||
                (p.links || []).find(l => !l.award);
    const inner = `<div class="pub-thumb-slot">
        ${p.thumbnail ? `<img src="${p.thumbnail}" alt="" loading="lazy" onerror="this.parentElement.innerHTML=''">` : ''}
      </div>`;
    return `<div class="carousel-item">
      ${lnk ? `<a href="${lnk.url}" target="_blank" rel="noopener" class="carousel-thumb-lnk">${inner}</a>` : inner}
    </div>`;
  }).join('');

  const catPillCls   = { award:'pa', publication:'pm', grant:'pb', position:'pc', talk:'py', media:'pg', news:'pg' };
  const catPillLabel = { publication:'PAPER', news:'NEWS', award:'AWARD', talk:'TALK', grant:'GRANT', media:'MEDIA' };
  const newsRows = NEWS_DATA.slice(0, 5).map(item => {
    const cls   = catPillCls[item.cat];
    const label = catPillLabel[item.cat];
    const pill  = (cls && label) ? `<span class="pill ${cls}">${label}</span>` : '';
    return `<div class="news-row">
      <div class="news-date">${item.date}</div>
      <div class="news-cat">${pill}</div>
      <span class="news-text">${item.title}</span>
    </div>`;
  }).join('') || `<div class="news-row"><div class="news-date" style="color:var(--grey)">No news yet.</div><div></div></div>`;

  document.getElementById('page-content').innerHTML = `
    <div class="hero">
      <div class="wrap hero-grid">
        <div>
          <BR><BR><BR>
          <h1 class="hero-title fi fi2">Advanced Intelligent<br>Robotics Laboratory</h1>
          <p class="hero-abbr fi fi2">AIR Lab @ Ewha</p>
          <p class="hero-desc fi fi3">${LAB_INFO.intro}</p>
          <div class="hero-kws fi fi3">${(LAB_INFO.keywords||[]).map(k=>`<span class="hero-kw">${k.emoji} ${k.label}</span>`).join('')}</div>
        </div>
        <div class="hero-slideshow fi fi3" id="heroSlideshow">
          ${(LAB_INFO.gallery||[]).map((src,i)=>`<div class="hero-slide${i===0?' active':''}"><div class="hero-slide-img"><img src="${src}"></div></div>`).join('')}
          <div class="hero-dots" id="heroDots"></div>
        </div>
      </div>
    </div>

    <div class="home-sec">
      <div class="wrap">
        <div class="sec-eye">Latest Updates</div>
        <h2 class="sec-h2">Recent <em>News</em></h2>
        <div class="news-list">${newsRows}</div>
        <div class="var"><a href="#news" class="btn btn-og">View All News</a></div>
      </div>
    </div>

    <div class="home-sec" style="background:var(--pear);">
      <div class="wrap">
        <div class="sec-eye">About the Lab</div>
        <h2 class="sec-h2">Research <em>Highlight</em></h2>
        <div class="carousel-wrap">
          <button class="carousel-btn carousel-prev" onclick="slideCarousel(-1)" aria-label="Previous">&#8249;</button>
          <div class="carousel-viewport"><div class="carousel-track" id="resCarousel">${carouselItems}</div></div>
          <button class="carousel-btn carousel-next" onclick="slideCarousel(1)" aria-label="Next">&#8250;</button>
        </div>
        <div class="carousel-dots" id="carouselDots"></div>
      </div>
    </div>`;

  initHeroSlideshow();
  initCarousel();
}

function initHeroSlideshow() {
  const show = document.getElementById('heroSlideshow');
  if (!show) return;
  const slides = Array.from(show.querySelectorAll('.hero-slide'));
  const dotsEl = document.getElementById('heroDots');
  let current = 0;
  slides.forEach((_, i) => {
    const d = document.createElement('button');
    d.className = 'hero-dot' + (i === 0 ? ' active' : '');
    d.setAttribute('aria-label', 'Slide ' + (i + 1));
    d.onclick = () => goTo(i);
    dotsEl.appendChild(d);
  });
  function goTo(n) {
    slides[current].classList.remove('active');
    dotsEl.children[current].classList.remove('active');
    current = (n + slides.length) % slides.length;
    slides[current].classList.add('active');
    dotsEl.children[current].classList.add('active');
  }
  if (slides.length > 1) setInterval(() => goTo(current + 1), 3500);
}

function initCarousel() {
  const track = document.getElementById('resCarousel');
  if (!track) return;
  const dotsEl = document.getElementById('carouselDots');
  const items = Array.from(track.children);
  let index = 0;
  function getPerPage() { return window.innerWidth <= 640 ? 2 : 4; }
  function getItemWidth() {
    const viewport = track.parentElement;
    const perPage = getPerPage();
    const gap = 12;
    return (viewport.offsetWidth - gap * (perPage - 1)) / perPage;
  }
  function buildDots(maxIndex) {
    if (!dotsEl) return;
    dotsEl.innerHTML = '';
    for (let i = 0; i <= maxIndex; i++) {
      const d = document.createElement('button');
      d.className = 'hero-dot' + (i === 0 ? ' active' : '');
      d.setAttribute('aria-label', 'Go to ' + (i + 1));
      d.onclick = () => { index = i; update(true); };
      dotsEl.appendChild(d);
    }
  }
  function syncDots() {
    if (!dotsEl) return;
    Array.from(dotsEl.children).forEach((d, i) => d.classList.toggle('active', i === index));
  }
  function update(animate) {
    const perPage = getPerPage();
    const maxIndex = Math.max(0, items.length - perPage);
    index = Math.min(Math.max(index, 0), maxIndex);
    const itemW = getItemWidth();
    const offset = index * (itemW + 12);
    if (!animate) track.style.transition = 'none';
    track.style.transform = `translateX(-${offset}px)`;
    if (!animate) requestAnimationFrame(() => { track.style.transition = ''; });
    const prev = document.querySelector('.carousel-prev');
    const next = document.querySelector('.carousel-next');
    if (prev) prev.disabled = index === 0;
    if (next) next.disabled = index >= maxIndex;
    if (dotsEl && dotsEl.children.length !== maxIndex + 1) buildDots(maxIndex);
    syncDots();
  }
  window.slideCarousel = function(dir) { index += dir; update(true); };
  window._carouselResize = () => update(false);
  window.addEventListener('resize', window._carouselResize);

  // Touch swipe
  const vp = track.parentElement;
  let touchStartX = 0, didSwipe = false;
  vp.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
    didSwipe = false;
  }, { passive: true });
  vp.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 40) { didSwipe = true; index += dx < 0 ? 1 : -1; update(true); }
  }, { passive: true });
  vp.addEventListener('click', e => {
    if (didSwipe) { e.preventDefault(); e.stopPropagation(); didSwipe = false; }
  }, { capture: true });

  update(false);
}

// ─────────────────────────────────────────────
// Members page
// ─────────────────────────────────────────────

function renderMembers() {
  const pi = MEMBERS_DATA.pi;
  const piPhoto = pi.photo
    ? `<img src="${pi.photo}" alt="${pi.name}">`
    : PHOTO_SVG;
  const piLinks = pi.links.map(l =>
    `<a href="${l.url}" class="pi-link" target="_blank" rel="noopener">${l.label}</a>`
  ).join('');

  let groupsHtml = '';
  (MEMBERS_DATA.groups || []).forEach(grp => {
    if (grp.type === 'alumni') {
      const items = grp.members.map(m => `
        <div class="alumni-item">
          <div class="alumni-name">${m.name}</div>
          <div class="alumni-now">${m.now}</div>
        </div>`).join('');
      groupsHtml += `<div class="grp">
        <div class="grp-title">${grp.title}</div>
        <div class="alumni-grid">${items}</div>
      </div>`;
    } else if (grp.type === 'staff') {
      const rows = grp.members.map(m => `
        <tr>
          <td><div style="font-weight:600">${m.name}</div><div style="font-size:.75rem;color:var(--ink3)">${m.period}</div></td>
          <td style="font-size:.82rem;color:var(--ink2)">${m.focus}</td>
          <td>${m.email ? `<a href="mailto:${m.email}" class="mem-email">${m.email}</a>` : ''}</td>
          <td><span class="mem-badge" style="background:var(--gl);color:var(--ink2)">Staff</span></td>
        </tr>`).join('');
      groupsHtml += `<div class="grp">
        <div class="grp-title">${grp.title}</div>
        <table class="staff-tbl">${rows}</table>
      </div>`;
    } else {
      const cards = grp.members.map(m => {
        const photo = m.photo ? `<img src="${m.photo}" alt="${m.name}">` : PHOTO_SVG;
        const emailLnk = m.email ? `<span class="mem-email-lnk">${EMAIL_SVG}<a href="mailto:${m.email}">${m.email}</a></span>` : '';
        const webLnk    = m.website ? `<span class="mem-email-lnk">${GLOBE_SVG}<a href="${m.website}" target="_blank" rel="noopener">${m.website.replace(/^https?:\/\//, '')}</a></span>` : '';
        const githubLnk = m.github  ? `<span class="mem-email-lnk">${GITHUB_SVG}<a href="${m.github}" target="_blank" rel="noopener">${m.github.replace(/^https?:\/\/(www\.)?github\.com\//, '')}</a></span>` : '';
        return `<div class="mem-card">
          <div class="photo-slot mem-photo-slot">${photo}</div>
          <div class="mem-info">
            <div class="mem-name">${m.name}</div>
            ${m.role  ? `<div class="mem-role">${m.role}</div>` : ''}
            ${(emailLnk || webLnk || githubLnk) ? `<div class="mem-links">${emailLnk}${webLnk}${githubLnk}</div>` : ''}
            ${m.focus ? `<div class="mem-focus">${m.focus}</div>` : ''}
          </div>
        </div>`;
      }).join('');
      groupsHtml += `<div class="grp">
        <div class="grp-title">${grp.title}</div>
        <div class="mem-grid">${cards}</div>
      </div>`;
    }
  });

  document.getElementById('page-content').innerHTML = `
    <div class="page-hd">
      <div class="wrap">
        <h1>Members</h1>
        <div class="page-sub">Meet our team</div>
      </div>
    </div>
    <div class="mem-body"><div class="wrap">
      <div class="pi-block">
        <div class="photo-slot pi-photo-slot">${piPhoto}</div>
        <div>
          <div class="pi-name">${pi.name}</div>
          <div class="pi-role">${pi.role}</div>
          ${pi.dept ? `<div class="pi-dept">${pi.dept}</div>` : ''}
          <div class="pi-meta">
            <span><strong>Office:</strong> ${pi.office}</span>
            <span><strong>Tel:</strong> ${pi.tel}</span>
            <span><strong>Email:</strong> ${pi.email}</span>
          </div>
          <div class="pi-bio">${[
            // pi.education && pi.education.length ? `<div class="pi-bio-section"><span class="pi-bio-label">Education</span><ul>${pi.education.map(e=>`<li>${e.degree}, ${e.field}, ${e.school}${e.year ? ', '+e.year : ''}</li>`).join('')}</ul></div>` : '',
            pi.experience && pi.experience.length ? `<div class="pi-bio-section"><span class="pi-bio-label">Professional Experience</span><ul>${pi.experience.map(e=>{const labHtml=e.lab?(e.org_url?`<a href="${e.org_url}" class="pi-bio-link" target="_blank" rel="noopener">${e.lab}</a>`:e.lab):'';const orgHtml=labHtml?(e.uni?labHtml+', '+e.uni:labHtml):(e.org||e.uni||'');return`<li>${e.role}, ${orgHtml}${e.period?` <span class="pi-bio-sub">(${e.period})</span>`:''}</li>`;}).join('')}</ul></div>` : '',
            // pi.bio || ''
          ].join('')}</div>
          <div class="pi-links">${piLinks}</div>
        </div>
      </div>
      ${groupsHtml}
      <div style="border:1px solid var(--green);border-radius:6px;padding:1.5rem 2rem;display:grid;grid-template-columns:1fr auto;align-items:center;gap:1rem;">
        <div>
          <div style="font-weight:600;margin-bottom:.3rem;">Join Us!</div>
          <div style="font-size:.88rem;color:var(--ink2);">We are actively looking for self-motivated <b>undergraduate interns</b> and <b>graduate students (M.S./Ph.D.)</b> with a passion for robotics and AI! If you are interested in joining us, please reach out to Prof. Song.</div>
        </div>
        <a href="mailto:${pi.email}" class="btn btn-g" style="white-space:nowrap;">Contact</a>
      </div>
    </div></div>`;
}

// ─────────────────────────────────────────────
// News page
// ─────────────────────────────────────────────

function renderNews() {
  const catPillCls   = { award:'pa', publication:'pm', grant:'pb', position:'pc', talk:'py', media:'pg', news:'pg' };
  const catPillLabel = { publication:'PAPER', news:'NEWS', award:'AWARD', talk:'TALK', grant:'GRANT', media:'MEDIA' };

  const CUTOFF_YEAR = '2025';
  let prevYear = null;
  const recentItems = [], olderItems = [];
  NEWS_DATA.forEach(item => {
    const year = item.date.slice(0, 4);
    const yearBreak = (prevYear && year !== prevYear) ? ' year-break' : '';
    prevYear = year;
    const cls   = catPillCls[item.cat];
    const label = catPillLabel[item.cat];
    const pill  = (cls && label) ? `<span class="pill ${cls}">${label}</span>` : '';
    let titleHtml = item.title;
    if (item.awardUrl && item.awardLabel) {
      const isExternal = item.awardUrl.startsWith('http');
      const linked = isExternal
        ? `<a class="award-lnk" href="${item.awardUrl}" target="_blank" rel="noopener">${item.awardLabel}</a>`
        : `<span class="award-lnk" data-lightbox="${item.awardUrl}">${item.awardLabel}</span>`;
      titleHtml = titleHtml.replace(item.awardLabel, linked);
    }
    const html = `<div class="news-full-item${yearBreak}" data-cat="${item.cat||''}">
      <div class="nf-date">${item.date}</div>
      <div class="nf-cat">${pill}</div>
      <div class="nf-content">${titleHtml}</div>
    </div>`;
    (year >= CUTOFF_YEAR ? recentItems : olderItems).push(html);
  });
  const olderSection = olderItems.length ? `
    <div class="news-older-toggle" onclick="toggleOlderNews(this)">
      <span class="not-label">Before ${CUTOFF_YEAR}</span><span class="not-arrow">▸</span>
    </div>
    <div class="news-older-list hidden">${olderItems.join('')}</div>` : '';
  const items = (recentItems.join('') || '<div style="padding:2rem 0;color:var(--ink2)">No news yet.</div>') + olderSection;

  const catOrder  = ['publication', 'award', 'talk', 'grant', 'news', 'media'];
  const catBtnLbl = { publication:'Publications', award:'Awards', talk:'Talks', grant:'Grants', news:'News', media:'Media' };
  const catBtnCls = { award:'fbtn fbtn-award' };
  const usedCats  = new Set(NEWS_DATA.map(i => i.cat));
  const filterBtns = catOrder
    .filter(c => usedCats.has(c))
    .map(c => `<button class="${catBtnCls[c]||'fbtn'}" data-filter="${c}" onclick="fnews('${c}',this)">${catBtnLbl[c]}</button>`)
    .join('');

  document.getElementById('page-content').innerHTML = `
    <div class="page-hd">
      <div class="wrap">
        <h1>News</h1>
        <div class="page-sub">Lab updates</div>
      </div>
    </div>
    <div class="news-page-body"><div class="wrap">
      <div class="filters">
        <button class="fbtn active" data-filter="all" onclick="fnews('all',this)">All</button>
        ${filterBtns}
      </div>
      <div class="news-full-list">${items}</div>
    </div></div>`;
}

window.fnews = function(filter, btn) {
  document.querySelectorAll('.filters .fbtn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.news-full-item').forEach(item => {
    const catMatch = filter === 'all' || item.dataset.cat === filter;
    const inOlder  = item.closest('.news-older-list');
    const olderOpen = inOlder && !inOlder.classList.contains('hidden');
    item.classList.toggle('hidden', !catMatch || (inOlder && !olderOpen));
  });
};

window.toggleOlderNews = function(btn) {
  const list = btn.nextElementSibling;
  const open = list.classList.toggle('hidden') === false;
  btn.querySelector('.not-arrow').textContent = open ? '▾' : '▸';
  if (open) {
    const activeBtn = document.querySelector('.filters .fbtn.active');
    const activeFilter = activeBtn?.dataset?.filter || 'all';
    list.querySelectorAll('.news-full-item').forEach(item => {
      item.classList.toggle('hidden', activeFilter !== 'all' && item.dataset.cat !== activeFilter);
    });
  }
};

// ─────────────────────────────────────────────
// Publications page
// ─────────────────────────────────────────────

const CUTOFF = 2025;

function buildPubCard(pub) {
  const thumb = pub.thumbnail
    ? `<img src="${pub.thumbnail}" alt="" loading="lazy" onerror="this.parentElement.innerHTML=''">`
    : '';
  const links = (pub.links || []).map(l =>
    l.award
      ? (l.url
          ? `<span class="pub-award" data-lightbox="${l.url}">🏆 ${l.label}</span>`
          : `<span class="pub-award">🏆 ${l.label}</span>`)
      : `<a href="${l.url}" class="pub-lnk" target="_blank" rel="noopener">${l.label}</a>`
  ).join('');
  const typeAttr = Array.isArray(pub.type) ? pub.type.join(' ') : (pub.type || '');
  return `<div class="pub-item" data-type="${typeAttr}">
    <div class="pub-thumb-slot">${thumb}</div>
    <div>
      <div class="pub-title">${pub.title}</div>
      <div class="pub-authors">${renderAuthors(pub.authors)}</div>
      <div class="pub-venue">
        ${(pub.venues || (pub.venue_short || pub.venue_full ? [{ short: pub.venue_short, full: pub.venue_full }] : []))
          .map(v => `<div class="pub-venue-row">
            ${v.short ? `<span class="bdg ${badgeCls(v.short)}" style="flex-shrink:0;font-style:normal;white-space:nowrap;">${v.short}</span>` : ''}
            <span class="pub-venue-text">${v.full||''}</span>
          </div>`).join('')}
      </div>
      <div class="pub-links">${links}</div>
    </div>
  </div>`;
}

function renderPublications() {
  const pubs = [...PUBLICATIONS].sort((a,b) => b.year - a.year);
  const groups = {};
  pubs.forEach(p => {
    const key = p.year >= CUTOFF ? String(p.year) : 'before' + CUTOFF;
    if (!groups[key]) groups[key] = [];
    groups[key].push(p);
  });
  const yearKeys = Object.keys(groups).sort((a,b) => {
    const na = a.startsWith('before') ? 0 : parseInt(a);
    const nb = b.startsWith('before') ? 0 : parseInt(b);
    return nb - na;
  });

  let filterBtns = `<button class="fbtn active" data-filter="all">All</button>`;
  yearKeys.forEach(k => {
    const label = k.startsWith('before') ? 'Before ' + CUTOFF : k;
    filterBtns += `<button class="fbtn" data-filter="${k}">${label}</button>`;
  });
  filterBtns += `<button class="fbtn" data-filter="journal">Journals</button>
                 <button class="fbtn" data-filter="conference">Conferences</button>
                 <button class="fbtn" data-filter="extended_abstract">Extended Abstracts</button>`;

  let groupsHtml = '';
  yearKeys.forEach(k => {
    const label = k.startsWith('before') ? 'Before ' + CUTOFF : k;
    groupsHtml += `<div class="pub-year-grp" data-year="${k}">
      <div class="pub-year-lbl">${label}</div>
      <div class="pub-list">${groups[k].map(buildPubCard).join('')}</div>
    </div>`;
  });

  document.getElementById('page-content').innerHTML = `
    <div class="page-hd">
      <div class="wrap">
        <h1>Publications</h1>
        <div class="page-sub">Reseach contributions</div>
      </div>
    </div>
    <div class="pub-body"><div class="wrap">
      <div class="filters" id="filterBar">${filterBtns}</div>
      <div class="pub-footnote">* Equal Contribution &nbsp;&nbsp; &dagger; Corresponding Author(s)</div><BR>
      <div id="pubContainer">${groupsHtml}</div>
    </div></div>`;

  document.getElementById('filterBar').querySelectorAll('.fbtn').forEach(btn => {
    btn.addEventListener('click', () => applyPubFilter(btn.dataset.filter));
  });
}

function applyPubFilter(filter) {
  document.querySelectorAll('#filterBar .fbtn').forEach(b =>
    b.classList.toggle('active', b.dataset.filter === filter)
  );
  document.querySelectorAll('.pub-year-grp').forEach(grp => {
    if (filter === 'all') {
      grp.classList.remove('hidden');
      grp.querySelectorAll('.pub-item').forEach(i => i.style.display = '');
    } else if (filter === 'journal' || filter === 'conference' || filter === 'extended_abstract') {
      let any = false;
      grp.querySelectorAll('.pub-item').forEach(i => {
        const show = i.dataset.type.split(' ').includes(filter);
        i.style.display = show ? '' : 'none';
        if (show) any = true;
      });
      grp.classList.toggle('hidden', !any);
    } else {
      grp.classList.toggle('hidden', grp.dataset.year !== filter);
      grp.querySelectorAll('.pub-item').forEach(i => i.style.display = '');
    }
  });
}

// ─────────────────────────────────────────────
// Research page
// ─────────────────────────────────────────────

function renderResearch() {
  const areas = RESEARCH_DATA.areas.map(area => {
    const img = area.image
      ? `<img src="${area.image}" alt="${area.title}" class="ra-img">`
      : `<div class="ra-img-placeholder"></div>`;

    const paperItems = area.papers.map(title => {
      const pub = PUBLICATIONS.find(p => p.title === title);
      if (!pub) return '';
      const mainLink = (pub.links || []).find(l => l.label === 'Webpage' || l.label === 'Website')
                    || (pub.links || []).find(l => l.label === 'Paper');
      const href = mainLink ? mainLink.url : '#';
      return `<li>
        <a href="${href}" target="_blank" rel="noopener" class="ra-paper-link">
          <span class="ra-paper-venue">${pub.venue_short} ${pub.year}</span>
          <span class="ra-paper-title">${pub.title}</span>
        </a>
      </li>`;
    }).join('');

    return `<div class="ra-area-card">
      <div class="ra-area-img">${img}</div>
      <div class="ra-area-body">
        <h2 class="ra-area-title">${area.title}</h2>
        <div class="ra-area-desc">${area.desc}</div>
        ${paperItems ? `<div class="ra-paper-label">Related Publications</div><ul class="ra-paper-list">${paperItems}</ul>` : ''}
      </div>
    </div>`;
  }).join('');

  document.getElementById('page-content').innerHTML = `
    <div class="page-hd">
      <div class="wrap">
        <h1>Projects</h1>
        <div class="page-sub">Research areas</div>
      </div>
    </div>
    <div class="res-body"><div class="wrap">
      <div class="ra-area-list">${areas}</div>
    </div></div>`;
}

// ─────────────────────────────────────────────
// Footer
// ─────────────────────────────────────────────

function renderFooter() {
  document.getElementById('site-footer').innerHTML = `
    <div class="ft-inner">
      <div>
        <div class="ft-brand">${LAB_INFO.full_name}</div>
        <div class="ft-uni">${LAB_INFO.department}<br>${LAB_INFO.university}</div>
      </div>
      <div>
        <div class="ft-uni">${(Array.isArray(LAB_INFO.address) ? LAB_INFO.address.join('<br>') : LAB_INFO.address)}<br>${LAB_INFO.phone}</div>
      </div>
    </div>
    <div class="ft-bottom"><span>&copy; ${LAB_INFO.copyright_year} AIR Lab, Ewha Womans University</span></div>`;
}

// ─────────────────────────────────────────────
// Router
// ─────────────────────────────────────────────

function route() {
  const page = location.hash.replace('#', '') || '';
  setActiveNav(page);
  window.scrollTo(0, 0);

  if (window._carouselResize) {
    window.removeEventListener('resize', window._carouselResize);
    window._carouselResize = null;
  }

  switch (page) {
    case 'members':      renderMembers();      break;
    case 'news':         renderNews();         break;
    case 'publications': renderPublications(); break;
    case 'projects':     renderResearch();     break;
    default:             renderHome();
  }
}

window.addEventListener('hashchange', route);
window.addEventListener('DOMContentLoaded', () => { renderFooter(); route(); });
