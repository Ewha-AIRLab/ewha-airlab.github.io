// Shared top navigation for the Intelligent Robotics course pages.
// Usage: <div class="topbar" id="course-nav"></div><script src="../nav.js"></script>
// Builds the breadcrumb + a dropdown menu per topic, and marks the current page.
(function () {
  'use strict';

  // [group, [[label, path relative to course/intelligent_robotics/], …]]
  const MENU = [
    ['Frames & Spaces', [
      ['2D Mobile Robot', 'coordinate_frames/2d.html'],
      ['3D Robot Arm', 'coordinate_frames/3d.html'],
      ['C-space Visualizer', 'motion_planning/c-space.html'],
      ['C-space vs. Workspace', 'trajectory/p2p.html'],
    ]],
    ['Kinematics', [
      ['FK 2D', 'kinematics/fk_2d.html'],
      ['FK 3D', 'kinematics/fk_3d.html'],
      ['IK 3D', 'kinematics/ik_3d.html'],
    ]],
    ['Motion Planning', [
      ['A* Planning', 'motion_planning/astar.html'],
      ['Sampling-based Planning', 'motion_planning/sampling.html'],
    ]],
  ];

  const base = new URL('.', document.currentScript.src);          // …/course/intelligent_robotics/
  const here = location.pathname.replace(/\/$/, '/index.html');
  const isHere = path => here.endsWith('/intelligent_robotics/' + path);

  const css = `
  #course-nav { gap: .5rem; }
  #course-nav .cn-menu { margin-left: auto; display: flex; gap: .15rem; flex-wrap: wrap; }
  #course-nav .cn-group { position: relative; }
  #course-nav .cn-btn { font: inherit; font-size: .8rem; font-weight: 500; color: #475569; background: none; border: none;
    padding: .32rem .6rem; border-radius: 7px; cursor: pointer; display: inline-flex; align-items: center; gap: .3rem; }
  #course-nav .cn-btn:hover, #course-nav .cn-group.open .cn-btn { background: #f1f5f9; color: #0f172a; }
  #course-nav .cn-group.cur .cn-btn { color: #00462A; font-weight: 600; }
  #course-nav .cn-btn svg { width: 9px; height: 9px; opacity: .6; }
  #course-nav .cn-drop { display: none; position: absolute; right: 0; top: calc(100% + 6px); min-width: 210px; z-index: 100;
    background: white; border: 1px solid #e2e8f0; border-radius: 10px; box-shadow: 0 8px 24px rgba(15,23,42,.12); padding: .3rem; }
  #course-nav .cn-group.open .cn-drop { display: block; }
  #course-nav .cn-group.open::after { content: ''; position: absolute; left: 0; right: 0; top: 100%; height: 8px; }   /* hover bridge to the dropdown */
  #course-nav .cn-drop a { display: block; padding: .45rem .65rem; border-radius: 7px; font-size: .82rem; color: #334155; text-decoration: none; font-weight: 500; }
  #course-nav .cn-drop a:hover { background: #f1f5f9; color: #0f172a; text-decoration: none; }
  #course-nav .cn-drop a.cur { background: #ecfdf3; color: #00462A; font-weight: 600; }
  #course-footer { max-width: 1400px; margin: 2.5rem auto 0; padding: 1.1rem 1.5rem 1.6rem; border-top: 1px solid #e2e8f0;
    font-size: .78rem; color: #94a3b8; display: flex; justify-content: space-between; gap: 1rem; flex-wrap: wrap; }
  #course-footer a { color: #64748b; text-decoration: none; } #course-footer a:hover { color: #00462A; }
  @media (max-width: 760px) { #course-nav .cn-menu { margin-left: 0; width: 100%; } #course-nav .cn-drop { left: 0; right: auto; } }`;
  document.head.appendChild(Object.assign(document.createElement('style'), { textContent: css }));

  const nav = document.getElementById('course-nav');
  const caret = '<svg viewBox="0 0 10 10"><path d="M1 3l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>';
  nav.innerHTML = `
    <a href="/">AIR Lab @ Ewha</a>
    <span class="sep">/</span>
    <span class="cur">Intelligent Robotics</span>
    <nav class="cn-menu">${MENU.map(([group, pages]) => `
      <div class="cn-group${pages.some(([, p]) => isHere(p)) ? ' cur' : ''}">
        <button class="cn-btn" type="button">${group}${caret}</button>
        <div class="cn-drop">${pages.map(([label, p]) =>
          `<a href="${new URL(p, base).pathname}"${isHere(p) ? ' class="cur" aria-current="page"' : ''}>${label}</a>`).join('')}
        </div>
      </div>`).join('')}
    </nav>`;

  // open on click (works on touch), close when clicking elsewhere or pressing Esc
  const groups = [...nav.querySelectorAll('.cn-group')];
  const closeAll = except => groups.forEach(g => { if (g !== except) g.classList.remove('open'); });
  groups.forEach(g => {
    g.querySelector('.cn-btn').addEventListener('click', e => { e.stopPropagation(); closeAll(g); g.classList.toggle('open'); });
    g.addEventListener('mouseenter', () => { if (matchMedia('(hover: hover)').matches) { closeAll(g); g.classList.add('open'); } });
    g.addEventListener('mouseleave', () => { if (matchMedia('(hover: hover)').matches) g.classList.remove('open'); });
  });
  document.addEventListener('click', () => closeAll());
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeAll(); });

  // footer with the author's name, added once the page body is complete
  const addFooter = () => {
    if (document.getElementById('course-footer')) return;
    const f = document.createElement('footer');
    f.id = 'course-footer';
    f.innerHTML = `<span>© ${new Date().getFullYear()} Daeun Song</span><a href="/">AIR Lab @ Ewha</a>`;
    document.body.appendChild(f);
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', addFooter); else addFooter();
})();
