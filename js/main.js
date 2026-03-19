'use strict';

// ─────────────────────────────────────────────
// Shared helpers
// ─────────────────────────────────────────────

const PHOTO_SVG = `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="200" fill="#e8e8e6"/><circle cx="100" cy="75" r="35" fill="#c8c8c5"/><ellipse cx="100" cy="185" rx="65" ry="50" fill="#c8c8c5"/></svg>`;

const EMAIL_SVG  = `<svg viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg>`;
const GLOBE_SVG  = `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 3c-2.5 3-4 5.5-4 9s1.5 6 4 9M12 3c2.5 3 4 5.5 4 9s-1.5 6-4 9M3 12h18"/></svg>`;

const BADGE_CLS = {
  'T-RO':'bdg-r','RA-L':'bdg-b','ICRA':'bdg-m','IROS':'bdg-y',
  // 'ICASSP':'bdg-b','ISER':'bdg-g','UR':'bdg-g',
};
function badgeCls(v) { return BADGE_CLS[v] || 'bdg-x'; }

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
  'news': 'nav-news', 'research': 'nav-research',
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

  const carouselItems = recentPubs.map(p => `
    <div class="carousel-item">
      <div class="pub-thumb-slot">
        ${p.thumbnail ? `<img src="${p.thumbnail}" alt="" loading="lazy" onerror="this.parentElement.innerHTML=''">` : ''}
      </div>
    </div>`).join('');

  const catPillCls = { award:'pg', publication:'pm', grant:'pb', position:'pc', conference:'py', media:'pg', announcement:'pg' };
  const newsRows = NEWS_DATA.slice(0, 5).map(item => {
    const pill = item.cat ? `<span class="pill ${catPillCls[item.cat]||'pg'}">${item.cat.charAt(0).toUpperCase()+item.cat.slice(1)}</span>` : '';
    return `<div class="news-row">
      <div class="news-date">${item.date}</div>
      <div>${pill}<span class="news-text">${item.title}</span></div>
      <a class="news-lnk" href="#news">Details →</a>
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
  let touchStartX = 0, touchStartY = 0;
  track.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }, { passive: true });
  track.addEventListener('touchmove', e => {
    const dx = e.touches[0].clientX - touchStartX;
    const dy = e.touches[0].clientY - touchStartY;
    if (Math.abs(dx) > Math.abs(dy)) e.preventDefault();
  }, { passive: false });
  track.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 40) { index += dx < 0 ? 1 : -1; update(true); }
  }, { passive: true });

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
        <div class="grp-title">${grp.title} <span class="grp-n">${String(grp.members.length).padStart(2,'0')}</span></div>
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
        <div class="grp-title">${grp.title} <span class="grp-n">${String(grp.members.length).padStart(2,'0')}</span></div>
        <table class="staff-tbl">${rows}</table>
      </div>`;
    } else {
      const cards = grp.members.map(m => {
        const photo = m.photo ? `<img src="${m.photo}" alt="${m.name}">` : PHOTO_SVG;
        const emailLnk = m.email ? `<a href="mailto:${m.email}" class="mem-icon-lnk" title="Email">${EMAIL_SVG}</a>` : '';
        const webLnk = m.website ? `<a href="${m.website}" class="mem-icon-lnk" title="Personal website">${GLOBE_SVG}</a>` : '';
        return `<div class="mem-card">
          <div class="photo-slot mem-photo-slot">${photo}</div>
          <div class="mem-info">
            <div class="mem-name">${m.name}</div>
            <div class="mem-period">${m.period}</div>
            <div class="mem-focus">${m.focus}</div>
            <div class="mem-links">${emailLnk}${webLnk}</div>
          </div>
        </div>`;
      }).join('');
      groupsHtml += `<div class="grp">
        <div class="grp-title">${grp.title} <span class="grp-n">${String(grp.members.length).padStart(2,'0')}</span></div>
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
          <div style="font-size:.85rem;color:var(--ink2);">We are actively looking for self-motivated <b>undergraduate interns</b> and <b>graduate students (M.S./Ph.D.)</b> with a passion for robotics and AI! If you are interested in joining us, please reach out to Dr. Song.</div>
        </div>
        <a href="mailto:${pi.email}" class="btn btn-g" style="white-space:nowrap;">Contact</a>
      </div>
    </div></div>`;
}

// ─────────────────────────────────────────────
// News page
// ─────────────────────────────────────────────

function renderNews() {
  const catPillCls = { award:'pg', publication:'pm', grant:'pb', position:'pc', conference:'py', media:'pg', announcement:'pg' };

  const items = NEWS_DATA.map((item) => {
    const pill = item.cat
      ? `<span class="pill ${catPillCls[item.cat]||'pg'}">${item.cat.charAt(0).toUpperCase()+item.cat.slice(1)}</span>`
      : '';
    return `<div class="news-full-item" data-cat="${item.cat||''}">
      <div class="nf-meta"><div class="nf-date">${item.date}</div>${pill}</div>
      <div><div class="nf-title">${item.title}</div><div class="nf-body">${item.body||''}</div></div>
    </div>`;
  }).join('') || '<div style="padding:2rem 0;color:var(--ink2)">No news yet.</div>';

  document.getElementById('page-content').innerHTML = `
    <div class="page-hd">
      <div class="wrap">
        <h1>News</h1>
        <div class="page-sub">Lab updates</div>
      </div>
    </div>
    <div class="news-page-body"><div class="wrap">
      <div class="filters">
        <button class="fbtn active" onclick="fnews('all',this)">All</button>
        <button class="fbtn" onclick="fnews('publication',this)">Publications</button>
        <button class="fbtn" onclick="fnews('award',this)">Awards</button>
        <button class="fbtn" onclick="fnews('grant',this)">Grants</button>
        <button class="fbtn" onclick="fnews('announcement',this)">Announcement</button>
      </div>
      <div class="news-full-list">${items}</div>
    </div></div>`;
}

window.fnews = function(filter, btn) {
  document.querySelectorAll('.filters .fbtn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.news-full-item').forEach(item => {
    item.classList.toggle('hidden', filter !== 'all' && item.dataset.cat !== filter);
  });
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
          ? `<a href="${l.url}" class="pub-award" target="_blank" rel="noopener">🏆 ${l.label}</a>`
          : `<span class="pub-award">🏆 ${l.label}</span>`)
      : `<a href="${l.url}" class="pub-lnk" target="_blank" rel="noopener">${l.label}</a>`
  ).join('');
  return `<div class="pub-item" data-type="${pub.type}">
    <div class="pub-thumb-slot">${thumb}</div>
    <div>
      <div class="pub-title">${pub.title}</div>
      <div class="pub-authors">${renderAuthors(pub.authors)}</div>
      <div class="pub-venue">
        ${pub.venue_short ? `<span class="bdg ${badgeCls(pub.venue_short)}" style="flex-shrink:0;font-style:normal;white-space:nowrap;">${pub.venue_short}</span>` : ''}
        <span class="pub-venue-text">${pub.venue_full}</span>
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
        const show = i.dataset.type === filter;
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
  const projects = RESEARCH_DATA.projects.map(p => `
    <div class="proj-card">
      <div class="proj-left">
        <div class="proj-title">${p.title}</div>
        <div class="proj-agency">${p.agency}</div>
        <div class="proj-desc">${p.desc}</div>
      </div>
      <div class="proj-right">
        <span class="proj-status ps-active">${p.status === 'active' ? 'Active' : 'Completed'}</span>
        <div class="proj-budget">${p.budget}</div>
        <div class="proj-period">${p.period}</div>
      </div>
    </div>`).join('');

  const areas = RESEARCH_DATA.areas.map(a => `
    <div class="ra-card">
      <div class="ra-bar" style="background:${a.color};"></div>
      <div class="ra-icon">${a.icon}</div>
      <div class="ra-name">${a.name}</div>
      <div class="ra-desc">${a.desc}</div>
    </div>`).join('');

  document.getElementById('page-content').innerHTML = `
    <div class="page-hd">
      <div class="wrap">
        <div class="page-eye">AIR Lab · Ewha Womans University</div>
        <h1>Research</h1>
        <div class="page-sub">Active projects and research grants</div>
      </div>
    </div>
    <div class="res-body"><div class="wrap">
      <div class="res-intro">
        <div class="sec-eye">Overview</div>
        <h2 class="sec-h2" style="margin-bottom:1rem;">Active <em>Projects</em></h2>
        <p>AIR Lab currently runs funded research projects spanning robot learning, safe human-robot coexistence, foundation model integration, and dexterous manipulation.</p>
      </div>
      <div class="proj-list">${projects}</div>
      <div style="margin-top:3rem;padding-top:3rem;border-top:1px solid var(--gmd);">
        <div class="sec-eye">Themes</div>
        <h2 class="sec-h2">Research <em>Areas</em></h2>
        <div class="ra-grid" style="grid-template-columns:repeat(4,1fr);">${areas}</div>
      </div>
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
    case 'research':     renderResearch();     break;
    default:             renderHome();
  }
}

window.addEventListener('hashchange', route);
window.addEventListener('DOMContentLoaded', () => { renderFooter(); route(); });
