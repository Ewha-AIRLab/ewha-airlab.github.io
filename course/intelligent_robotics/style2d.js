// Shared 2D drawing style for the Intelligent Robotics pages.
// Flat 2D look in the same colours as the 3D robot (scene3d.js): grey links, orange joint
// accents, dark base, green tool tip, muted red / green frame axes.
//
// Shapes are built once as a list of primitive "ops" and can be drawn either on a <canvas>
// (draw2d) or as an SVG string (svg2d), so canvas and SVG pages look the same.
'use strict';

const P2 = {
  bg: '#ffffff', grid: '#eef2f6', gridMajor: '#e2e8f0', axis: '#cbd5e1', text: '#64748b', textDim: '#94a3b8', ink: '#0f172a',
  link: '#c9d0d7', linkEdge: '#7d8792', jointBody: '#e4e8ec', cap: '#ee7a1e', base: '#3b4656', flange: '#b8c1cb', tip: '#16a34a',
  x: '#c4392f', y: '#2e8b4f', z: '#2f66c4',
  start: '#f59e0b', goal: '#8b5cf6', path: '#e11d48', hit: '#d62828', hitFill: '#f6c9c9', free: '#e9f5f1', point: '#8b5cf6',
};

// ── primitives ──
const op = {
  line: (a, b, width, color, extra) => ({ t: 'line', a, b, width, color, cap: 'round', ...extra }),
  circle: (c, r, fill, stroke, sw, extra) => ({ t: 'circle', c, r, fill, stroke, sw: sw || 0, ...extra }),
  poly: (pts, fill, stroke, sw, extra) => ({ t: 'poly', pts, fill, stroke, sw: sw || 0, ...extra }),
  text: (p, str, color, size, extra) => ({ t: 'text', p, str, color, size, weight: 600, align: 'left', ...extra }),
  // rounded rectangle: centre c, size w × h, corner radius r, rotated by angle (rad, math convention)
  rrect: (c, w, h, r, angle, fill, extra) => ({ t: 'rrect', c, w, h, r, angle, fill, ...extra }),
};

// ── robot arm (planar), flat style: pts = joint positions in px, base → tool ──
// opts: w (link width px), alpha, hit (array of bools per link)
function armOps(pts, opts = {}) {
  const w = opts.w || 12, alpha = opts.alpha ?? 1, hit = opts.hit || [];
  const ops = [];
  const A = o => Object.assign(o, { alpha });
  ops.push(A(op.circle(pts[0], w * 1.25, P2.base)));                         // base
  for (let i = 0; i < pts.length - 1; i++)                                  // links: flat, round ends
    ops.push(A(op.line(pts[i], pts[i + 1], w, hit[i] ? P2.hit : '#aab3bd')));
  for (let i = 0; i < pts.length - 1; i++) {                                // joints: white disc, orange centre
    ops.push(A(op.circle(pts[i], w * 0.62, '#ffffff')));
    ops.push(A(op.circle(pts[i], w * 0.34, P2.cap)));
  }
  ops.push(A(op.circle(pts[pts.length - 1], w * 0.42, P2.tip, '#ffffff', 2)));   // tool tip
  return ops;
}

// ── coordinate frame: origin o (px), angle (rad, screen y down → pass the math angle), len px ──
function arrowOps(o, angle, len, color, opts = {}) {
  const width = opts.width || 2.5, head = opts.head || Math.max(8, len * 0.22);
  const ex = o.x + Math.cos(angle) * len, ey = o.y - Math.sin(angle) * len;
  const bx = o.x + Math.cos(angle) * (len - head * 0.8), by = o.y - Math.sin(angle) * (len - head * 0.8);
  const nx = Math.sin(angle) * head * 0.45, ny = Math.cos(angle) * head * 0.45;
  const g = opts.gap || 0;                         // start the shaft this far from the origin (clear of a joint disc)
  const s0 = { x: o.x + Math.cos(angle) * g, y: o.y - Math.sin(angle) * g };
  return [
    op.line(s0, { x: bx, y: by }, width, color, { cap: 'butt', dash: opts.dash, alpha: opts.alpha ?? 1 }),
    op.poly([{ x: ex, y: ey }, { x: bx + nx, y: by + ny }, { x: bx - nx, y: by - ny }], color, null, 0, { alpha: opts.alpha ?? 1 }),
  ];
}
function frameOps(o, angle, len, opts = {}) {
  const ops = [
    ...arrowOps(o, angle, len, P2.x, opts),
    ...arrowOps(o, angle + Math.PI / 2, len, P2.y, opts),
  ];
  if (!opts.noDot) ops.push(op.circle(o, 3.5, P2.ink, '#ffffff', 1.2));   // origin dot (skip when a joint is drawn there)
  if (opts.label) {   // labelAt: {dx, dy} to move the name clear of whatever sits on the origin
    const at = opts.labelAt || { dx: 8, dy: 16 };
    ops.push(op.text({ x: o.x + at.dx, y: o.y + at.dy }, opts.label, P2.ink, opts.size || 13, { halo: true, align: opts.labelAt ? 'center' : 'left' }));
  }
  if (opts.axisLabels) {
    const lx = { x: o.x + Math.cos(angle) * (len + 9), y: o.y - Math.sin(angle) * (len + 9) + 4 };
    const ly = { x: o.x + Math.cos(angle + Math.PI / 2) * (len + 9), y: o.y - Math.sin(angle + Math.PI / 2) * (len + 9) + 4 };
    ops.push(op.text(lx, 'x', P2.x, 12, { align: 'center' }), op.text(ly, 'y', P2.y, 12, { align: 'center' }));
  }
  return ops;
}

// ── mobile robot, top view, soft rounded shapes: centre c (px), heading (rad), s = half-length px ──
function mobileOps(c, heading, s = 34) {
  const at = (x, y) => ({ x: c.x + x * Math.cos(heading) - y * Math.sin(heading), y: c.y - (x * Math.sin(heading) + y * Math.cos(heading)) });
  const hw = s * 0.72;
  return [
    // wheels: rounded pills poking out of the sides
    ...[[-0.5, 1], [0.5, 1], [-0.5, -1], [0.5, -1]].map(([x, side]) =>
      op.rrect(at(s * x, side * hw), s * 0.52, s * 0.26, s * 0.13, heading, P2.base)),
    op.rrect(c, s * 2, hw * 2, hw * 0.75, heading, '#aab3bd'),                       // body
    op.rrect(at(s * 0.78, 0), s * 0.18, hw * 1.3, s * 0.09, heading, P2.cap),        // front bumper
    op.circle(at(-s * 0.1, 0), s * 0.3, '#ffffff'),                                  // sensor dome
    op.circle(at(-s * 0.1, 0), s * 0.14, P2.base),
  ];
}

// ── camera, top view ──
function cameraOps(c, heading, s = 12) {
  const at = (x, y) => ({ x: c.x + x * Math.cos(heading) - y * Math.sin(heading), y: c.y - (x * Math.sin(heading) + y * Math.cos(heading)) });
  return [
    op.line(at(s, 0), at(s * 2.4, 0), 2, P2.z, { dash: [4, 3], cap: 'butt' }),
    op.rrect(c, s * 2, s * 1.4, s * 0.4, heading, P2.z),
    op.circle(at(s * 0.3, 0), s * 0.36, '#ffffff'),
  ];
}

// ── renderers ──
function draw2d(ctx, ops) {
  for (const o of ops) {
    ctx.save();
    ctx.globalAlpha = o.alpha ?? 1;
    if (o.t === 'line') {
      ctx.lineCap = o.cap || 'round'; ctx.lineWidth = o.width; ctx.strokeStyle = o.color;
      if (o.dash) ctx.setLineDash(o.dash);
      ctx.beginPath(); ctx.moveTo(o.a.x, o.a.y); ctx.lineTo(o.b.x, o.b.y); ctx.stroke();
    } else if (o.t === 'circle') {
      ctx.beginPath(); ctx.arc(o.c.x, o.c.y, o.r, 0, Math.PI * 2);
      if (o.fill) { ctx.fillStyle = o.fill; ctx.fill(); }
      if (o.stroke && o.sw) { ctx.lineWidth = o.sw; ctx.strokeStyle = o.stroke; ctx.stroke(); }
    } else if (o.t === 'poly') {
      ctx.lineJoin = 'round';
      ctx.beginPath(); o.pts.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y))); ctx.closePath();
      if (o.fill) { ctx.fillStyle = o.fill; ctx.fill(); }
      if (o.stroke && o.sw) { ctx.lineWidth = o.sw; ctx.strokeStyle = o.stroke; ctx.stroke(); }
    } else if (o.t === 'rrect') {
      ctx.translate(o.c.x, o.c.y); ctx.rotate(-o.angle);
      const r = Math.min(o.r, o.w / 2, o.h / 2), x = -o.w / 2, y = -o.h / 2;
      ctx.beginPath();
      ctx.moveTo(x + r, y); ctx.arcTo(x + o.w, y, x + o.w, y + o.h, r); ctx.arcTo(x + o.w, y + o.h, x, y + o.h, r);
      ctx.arcTo(x, y + o.h, x, y, r); ctx.arcTo(x, y, x + o.w, y, r); ctx.closePath();
      ctx.fillStyle = o.fill; ctx.fill();
    } else if (o.t === 'text') {
      ctx.font = `${o.weight} ${o.size}px "IBM Plex Sans", sans-serif`; ctx.fillStyle = o.color; ctx.textAlign = o.align;
      if (o.halo) { ctx.lineWidth = 4; ctx.strokeStyle = 'rgba(255,255,255,.92)'; ctx.lineJoin = 'round'; ctx.strokeText(o.str, o.p.x, o.p.y); }
      ctx.fillText(o.str, o.p.x, o.p.y);
    }
    ctx.restore();
  }
}
function svg2d(ops) {
  const n = v => (+v).toFixed(2);
  const a = o => (o.alpha ?? 1) < 1 ? ` opacity="${o.alpha}"` : '';
  return ops.map(o => {
    if (o.t === 'line') return `<line x1="${n(o.a.x)}" y1="${n(o.a.y)}" x2="${n(o.b.x)}" y2="${n(o.b.y)}" stroke="${o.color}" stroke-width="${o.width}" stroke-linecap="${o.cap || 'round'}"${o.dash ? ` stroke-dasharray="${o.dash.join(' ')}"` : ''}${a(o)}/>`;
    if (o.t === 'circle') return `<circle cx="${n(o.c.x)}" cy="${n(o.c.y)}" r="${n(o.r)}" fill="${o.fill || 'none'}"${o.stroke && o.sw ? ` stroke="${o.stroke}" stroke-width="${o.sw}"` : ''}${a(o)}/>`;
    if (o.t === 'poly') return `<polygon points="${o.pts.map(p => `${n(p.x)},${n(p.y)}`).join(' ')}" fill="${o.fill || 'none'}"${o.stroke && o.sw ? ` stroke="${o.stroke}" stroke-width="${o.sw}" stroke-linejoin="round"` : ''}${a(o)}/>`;
    if (o.t === 'rrect') return `<rect x="${n(-o.w / 2)}" y="${n(-o.h / 2)}" width="${n(o.w)}" height="${n(o.h)}" rx="${n(Math.min(o.r, o.w / 2, o.h / 2))}" fill="${o.fill}" transform="translate(${n(o.c.x)},${n(o.c.y)}) rotate(${n(-o.angle * 180 / Math.PI)})"${a(o)}/>`;
    if (o.t === 'text') return `<text x="${n(o.p.x)}" y="${n(o.p.y)}" fill="${o.color}" font-size="${o.size}" font-weight="${o.weight}" font-family="IBM Plex Sans, sans-serif" text-anchor="${{ left: 'start', center: 'middle', right: 'end' }[o.align]}"${o.halo ? ' stroke="#ffffff" stroke-width="4" stroke-linejoin="round" paint-order="stroke"' : ''}>${o.str}</text>`;
    return '';
  }).join('');
}
