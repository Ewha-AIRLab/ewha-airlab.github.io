// Shared KUKA LBR iiwa 7 R800 model for the FK / IK pages:
// DH parameters, FK + Jacobian math, and the three.js scene.
// Expects three.js r128 + OrbitControls + RoomEnvironment, and a page with #viz-wrap / #viz3d.
'use strict';

// ── KUKA LBR iiwa 7 R800, standard DH ──
// All link offsets a_i are 0 and the twists alternate ±90°, so consecutive axes always
// intersect: shoulder (joints 1–2), elbow (3–4) and a spherical wrist (5–7).
const DH = [
  { d: 0.340, a: 0, alpha: -90 },
  { d: 0,     a: 0, alpha:  90 },
  { d: 0.400, a: 0, alpha:  90 },
  { d: 0,     a: 0, alpha: -90 },
  { d: 0.400, a: 0, alpha: -90 },
  { d: 0,     a: 0, alpha:  90 },
  { d: 0.126, a: 0, alpha:   0 },
];
const N = DH.length;
const JOINT_LIMITS = [170, 120, 170, 120, 170, 120, 175];   // ± degrees, from the KUKA datasheet
const D2R = Math.PI / 180;
const SUB = ['₀', '₁', '₂', '₃', '₄', '₅', '₆', '₇'];

// ── Math helpers ──
function dhMatrix(thetaDeg, { d, a, alpha }) {
  const t = thetaDeg * D2R, al = alpha * D2R;
  const ct = Math.cos(t), st = Math.sin(t), ca = Math.cos(al), sa = Math.sin(al);
  return new THREE.Matrix4().set(
    ct, -st * ca,  st * sa, a * ct,
    st,  ct * ca, -ct * sa, a * st,
    0,   sa,       ca,      d,
    0,   0,        0,       1
  );
}
function mul(a, b) { return new THREE.Matrix4().multiplyMatrices(a, b); }

function computeFK(q) {
  const A = DH.map((p, i) => dhMatrix(q[i], p));
  const T = [new THREE.Matrix4()];            // T[k] = T_0k
  for (let i = 0; i < N; i++) T.push(mul(T[i], A[i]));
  return { A, T };
}

// Geometric Jacobian (6×N): column i = [ z_i × (p_e − o_i) ; z_i ]
function jacobian(T) {
  const pe = new THREE.Vector3().setFromMatrixPosition(T[N]);
  const J = [[], [], [], [], [], []];
  for (let i = 0; i < N; i++) {
    const z = new THREE.Vector3().setFromMatrixColumn(T[i], 2);
    const o = new THREE.Vector3().setFromMatrixPosition(T[i]);
    const v = new THREE.Vector3().crossVectors(z, pe.clone().sub(o));
    [v.x, v.y, v.z, z.x, z.y, z.z].forEach((val, r) => { J[r][i] = val; });
  }
  return J;
}

function rows(m) {
  const e = m.elements;
  return [[e[0], e[4], e[8], e[12]], [e[1], e[5], e[9], e[13]], [e[2], e[6], e[10], e[14]], [e[3], e[7], e[11], e[15]]];
}
function fmt(n, dp = 3) {
  if (Math.abs(n) < 0.5 * Math.pow(10, -dp)) return (0).toFixed(dp);
  return (n < 0 ? '−' : '') + Math.abs(n).toFixed(dp);
}
function fmtDeg(n) { const r = Math.round(n); return `${r < 0 ? '−' : ''}${Math.abs(r)}°`; }

// roll-pitch-yaw (ZYX) of a rotation, in degrees
function rpyOf(m) {
  const e = m.elements;
  return {
    roll:  Math.atan2(e[6], e[10]) / D2R,
    pitch: Math.atan2(-e[2], Math.hypot(e[6], e[10])) / D2R,
    yaw:   Math.atan2(e[1], e[0]) / D2R,
  };
}

// ── Three.js setup ──
const vizWrap  = document.getElementById('viz-wrap');
const canvas   = document.getElementById('viz3d');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.88;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const scene = new THREE.Scene();
scene.background = null;   // CSS gradient shows through
// studio-like reflections for the glossy robot shell
const pmrem = new THREE.PMREMGenerator(renderer);
scene.environment = pmrem.fromScene(new THREE.RoomEnvironment(), 0.04).texture;

const camera = new THREE.PerspectiveCamera(40, 4/3, 0.01, 50);
camera.up.set(0, 0, 1);   // Z-up (robotics convention)
camera.position.set(1.2, -1.15, 0.95);

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.target.set(0.28, 0, 0.45);
controls.update();

scene.add(new THREE.HemisphereLight(0xffffff, 0xcfd8e3, 0.35));
const sun = new THREE.DirectionalLight(0xffffff, 1.6);
sun.position.set(0.9, -0.7, 3.0);
sun.target.position.set(0.2, 0, 0);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
Object.assign(sun.shadow.camera, { left: -1.5, right: 1.5, top: 1.5, bottom: -1.5, near: 0.5, far: 8 });
sun.shadow.bias = -0.0004;
sun.shadow.normalBias = 0.01;
scene.add(sun, sun.target);

// floor: invisible plane that only catches the robot's shadow, plus a faint grid
const floor = new THREE.Mesh(new THREE.PlaneGeometry(6, 6), new THREE.ShadowMaterial({ opacity: 0.22 }));
floor.receiveShadow = true;
scene.add(floor);
const grid = new THREE.GridHelper(3, 30, 0x7f8c9b, 0xa3afbc);
grid.rotation.x = Math.PI / 2;
grid.position.z = 0.0005;
scene.add(grid);

// ── Geometry helpers ──
const Y = new THREE.Vector3(0, 1, 0);
// colours are written in sRGB; convert so they look the same after sRGB output
function mat(color, opts = {}) {
  const m = new THREE.MeshPhysicalMaterial(Object.assign({ color, roughness: 0.45, metalness: 0.05, envMapIntensity: 0.75 }, opts));
  m.color.convertSRGBToLinear();
  return m;
}

// cylinder with rounded edges along +Y, centred at origin (true size, not scaled)
function mkRounded(r, len, bevel, material, seg = 56) {
  const b = Math.min(bevel, r * 0.5, len * 0.5), h = len / 2, pts = [new THREE.Vector2(0, -h)];
  for (let i = 0; i <= 8; i++) {
    const t = -Math.PI / 2 + (i / 8) * (Math.PI / 2);
    pts.push(new THREE.Vector2(r - b + b * Math.cos(t), -h + b + b * Math.sin(t)));
  }
  for (let i = 0; i <= 8; i++) {
    const t = (i / 8) * (Math.PI / 2);
    pts.push(new THREE.Vector2(r - b + b * Math.cos(t), h - b + b * Math.sin(t)));
  }
  pts.push(new THREE.Vector2(0, h));
  const mesh = new THREE.Mesh(new THREE.LatheGeometry(pts, seg), material);
  mesh.castShadow = true;
  return mesh;
}

// unit cylinder along +Y centred at origin; placed with placeBetween / placeAlong
function mkCyl(r, material, seg = 48) {
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(r, r, 1, seg), material);
  mesh.castShadow = true;
  return mesh;
}
function placeBetween(mesh, p1, p2) {
  const dir = new THREE.Vector3().subVectors(p2, p1);
  const len = dir.length();
  mesh.visible = len > 1e-4;
  if (!mesh.visible) return;
  mesh.position.copy(p1).addScaledVector(dir, 0.5);
  mesh.quaternion.setFromUnitVectors(Y, dir.normalize());
  mesh.scale.set(1, len, 1);
}
function placeAlong(mesh, center, axis, len) {
  mesh.position.copy(center);
  mesh.quaternion.setFromUnitVectors(Y, axis.clone().normalize());
  mesh.scale.set(1, len, 1);
}

// solid arrow (cylinder shaft + cone head) along +Y, so it can be drawn thicker than a GL line
function mkArrow(len, color) {
  const g = new THREE.Group(), m = new THREE.MeshStandardMaterial({ color, roughness: 0.45, metalness: 0, envMapIntensity: 0.4 });
  m.color.convertSRGBToLinear();
  m.emissive.copy(m.color).multiplyScalar(0.35);   // keeps the colour strong on the shaded side
  const head = len * 0.26, shaftR = len * 0.05, headR = len * 0.115;
  const shaft = new THREE.Mesh(new THREE.CylinderGeometry(shaftR, shaftR, len - head, 12), m);
  shaft.position.y = (len - head) / 2;
  const cone = new THREE.Mesh(new THREE.ConeGeometry(headR, head, 16), m);
  cone.position.y = len - head / 2;
  g.add(shaft, cone);
  return g;
}

// muted x/y/z colours: still red/green/blue, but easier on the eye
const AXIS_COLORS = [0xc4392f, 0x2e8b4f, 0x2f66c4];

function mkAxes(scale) {
  const g = new THREE.Group();
  const ax = mkArrow(scale, AXIS_COLORS[0]); ax.rotation.z = -Math.PI / 2;   // +Y → +X
  const ay = mkArrow(scale, AXIS_COLORS[1]);
  const az = mkArrow(scale, AXIS_COLORS[2]); az.rotation.x = Math.PI / 2;    // +Y → +Z
  g.add(ax, ay, az);
  return g;
}

// text sprite for frame labels
function mkLabel() {
  const c = document.createElement('canvas');
  c.width = 128; c.height = 64;
  const tex = new THREE.CanvasTexture(c);
  tex.encoding = THREE.sRGBEncoding;
  const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, depthTest: false, transparent: true, toneMapped: false, sizeAttenuation: false }));
  sp.renderOrder = 10;
  sp.userData = { c, tex };
  return sp;
}
function drawLabel(sp, text, highlighted, color) {
  const { c, tex } = sp.userData, g = c.getContext('2d');
  g.clearRect(0, 0, c.width, c.height);
  g.fillStyle = color || (highlighted ? '#f59e0b' : 'rgba(15,23,42,.82)');
  g.beginPath(); g.roundRect ? g.roundRect(4, 8, 120, 48, 14) : g.rect(4, 8, 120, 48); g.fill();
  g.fillStyle = 'white';
  g.font = `600 ${text.length > 4 ? 26 : 32}px "IBM Plex Mono", monospace`;
  g.textAlign = 'center'; g.textBaseline = 'middle';
  g.fillText(text, 64, 33);
  tex.needsUpdate = true;
  sp.scale.set(0.072, 0.036, 1);   // fraction of the view height (sizeAttenuation off)
}

// ── Robot model (iiwa-style) ──
// Pitch joints (2, 4, 6) are drawn as cross-wise housings at the shoulder / elbow / wrist.
// Roll joints (1, 3, 5, 7) turn about the link itself, so they are drawn as orange
// rings on that link (the real robot hides them inside the link shell).
const M_BODY   = () => mat(0xb3bac2, { roughness: 0.38, clearcoat: 0.35, clearcoatRoughness: 0.35, envMapIntensity: 0.55 });
const M_LINK   = () => mat(0xa8b0b9, { roughness: 0.4, clearcoat: 0.3, clearcoatRoughness: 0.4, envMapIntensity: 0.55 });
const M_ORANGE = () => mat(0xee7a1e, { roughness: 0.45 });

const basePlate = mkRounded(0.12, 0.03, 0.01, mat(0x3b4656, { roughness: 0.6 }));
basePlate.rotation.x = Math.PI / 2; basePlate.position.z = 0.015;
basePlate.receiveShadow = true;
scene.add(basePlate);

const IS_ROLL  = [true, false, true, false, true, false, true];
const LINK_R   = [0.07, 0, 0.062, 0, 0.055, 0, 0.042];        // link i runs o_i → o_{i+1}
const PITCH_R  = [0, 0.074, 0, 0.066, 0, 0.056, 0];
const PITCH_L  = [0, 0.17, 0, 0.15, 0, 0.13, 0];
const ROLL_AT  = [0.42, 0, 0.42, 0, 0.42, 0, 0.35];            // ring position along its link

const jointMeshes = [], links = [];
for (let i = 0; i < N; i++) {
  const ms = [];
  if (IS_ROLL[i]) {
    ms.push(mkRounded(LINK_R[i] * 1.07, 0.028, 0.008, M_ORANGE()));
  } else {
    const body = mkRounded(PITCH_R[i], PITCH_L[i], 0.03, M_BODY());
    body.receiveShadow = true;
    ms.push(body,
      mkRounded(PITCH_R[i] * 0.72, 0.012, 0.005, M_ORANGE()),
      mkRounded(PITCH_R[i] * 0.72, 0.012, 0.005, M_ORANGE()));
  }
  ms.forEach(m => scene.add(m));
  jointMeshes.push(ms);
  const link = LINK_R[i] ? mkCyl(LINK_R[i], M_LINK()) : null;
  if (link) { link.receiveShadow = true; scene.add(link); }
  links.push(link);
}
// tool flange + a notch so that q7 rotation is visible
const flange = mkRounded(0.04, 0.016, 0.004, mat(0xb8c1cb, { metalness: 0.85, roughness: 0.32 }));
scene.add(flange);
const notch = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.012, 0.012), mat(0xf59e0b, { roughness: 0.4 }));
notch.castShadow = true;
scene.add(notch);
const eeDot = new THREE.Mesh(new THREE.SphereGeometry(0.014, 24, 24), mat(0x16a34a, { roughness: 0.35, emissive: 0x0b3d1d }));
scene.add(eeDot);

// frames {0}..{7}
const frames = [], labels = [];
for (let k = 0; k <= N; k++) {
  const ax = mkAxes(0.12);
  scene.add(ax); frames.push(ax);
  const lb = mkLabel(); scene.add(lb); labels.push(lb);
}
// DH puts frames of intersecting axes at the same point ({1}&{2} shoulder, {3}&{4} elbow,
// {5}&{6} wrist), so the two labels of such a pair are pushed to opposite sides.
const LABEL_OFF = k => k % 2 ? new THREE.Vector3(0.06, 0.06, -0.03) : new THREE.Vector3(-0.05, -0.05, 0.07);

// robot meshes are drawn after the (opaque) frame arrows, so a see-through shell
// still hides what is behind it but lets the frames inside the joints show through
function setGhost(mesh, ghost, alpha) {
  const a = ghost ? Math.min(0.12, alpha) : alpha;
  mesh.material.transparent = a < 1;
  mesh.material.opacity = a;
  mesh.material.depthWrite = a >= 1;
  mesh.castShadow = !ghost;
}

// ── Robot pose update ──
// T: [T_00 .. T_07]. st: { K: chain step (links after A_K are ghosted), HL: highlighted frame,
//                          showFrames, showLabels, alpha: shell opacity }
function updateRobot(T, st) {
  const { K = N, HL = -1, showFrames = true, showLabels = true, alpha = 1 } = st || {};
  const o = T.map(m => new THREE.Vector3().setFromMatrixPosition(m));
  const z = T.map(m => new THREE.Vector3().setFromMatrixColumn(m, 2));
  const x = T.map(m => new THREE.Vector3().setFromMatrixColumn(m, 0));

  for (let i = 0; i < N; i++) {
    // joint i+1 turns about z_i through o_i
    const ms = jointMeshes[i];
    if (IS_ROLL[i]) {
      const c = o[i].clone().lerp(o[i + 1], ROLL_AT[i]);
      placeAlong(ms[0], c, z[i], 1);
    } else {
      const off = z[i].clone().multiplyScalar(PITCH_L[i] * 0.5);
      placeAlong(ms[0], o[i], z[i], 1);
      placeAlong(ms[1], o[i].clone().add(off), z[i], 1);
      placeAlong(ms[2], o[i].clone().sub(off), z[i], 1);
    }
    if (links[i]) placeBetween(links[i], o[i], o[i + 1]);

    const ghost = i >= K;   // A_{i+1} not yet applied in the chain
    ms.forEach(m => setGhost(m, ghost, alpha));
    if (links[i]) setGhost(links[i], ghost, alpha);
  }

  placeAlong(flange, o[N].clone().addScaledVector(z[N], -0.008), z[N], 1);
  notch.position.copy(o[N]).addScaledVector(x[N], 0.035);
  notch.quaternion.setFromRotationMatrix(new THREE.Matrix4().extractRotation(T[N]));
  eeDot.position.copy(o[N]);
  [flange, notch, eeDot].forEach(m => setGhost(m, K < N, alpha));
  setGhost(basePlate, false, alpha);

  const isHL = k => k === HL || (HL < 0 && k === K && K < N);
  for (let k = 0; k <= N; k++) {
    const ax = frames[k], lb = labels[k];
    const vis = k <= K;
    ax.visible = vis && showFrames;
    ax.position.copy(o[k]);
    ax.quaternion.setFromRotationMatrix(new THREE.Matrix4().extractRotation(T[k]));

    lb.visible = vis && showFrames && showLabels;
    drawLabel(lb, `{${k}}`, isHL(k));
    lb.position.copy(o[k]).add(LABEL_OFF(k));
  }
}

// ── Resize / render loop ──
const frameHooks = [];   // pages can push callbacks that run every frame
function onResize() {
  const w = vizWrap.clientWidth, h = vizWrap.clientHeight;
  if (!w || !h) return;
  renderer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}
new ResizeObserver(onResize).observe(vizWrap);
onResize();

(function loop() {
  requestAnimationFrame(loop);
  frameHooks.forEach(f => f());
  controls.update();
  renderer.render(scene, camera);
})();
