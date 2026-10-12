// Shared three.js scene for the 3D robotics pages (FK, IK, A*):
// renderer, camera, lights, floor, drawing helpers, robot materials and the render loop.
// Expects three.js r128 + OrbitControls + RoomEnvironment, and a page with #viz-wrap / #viz3d.
// Robot models (e.g. iiwa.js) are loaded after this file and add their meshes to `scene`.
'use strict';

const D2R = Math.PI / 180;

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

// ── Robot look: light-grey shell, orange joint accents ──
const M_BODY   = () => mat(0xb3bac2, { roughness: 0.38, clearcoat: 0.35, clearcoatRoughness: 0.35, envMapIntensity: 0.55 });
const M_LINK   = () => mat(0xa8b0b9, { roughness: 0.4, clearcoat: 0.3, clearcoatRoughness: 0.4, envMapIntensity: 0.55 });
const M_ORANGE = () => mat(0xee7a1e, { roughness: 0.45 });

// robot meshes are drawn after the (opaque) frame arrows, so a see-through shell
// still hides what is behind it but lets the frames inside the joints show through
function setGhost(mesh, ghost, alpha) {
  const a = ghost ? Math.min(0.12, alpha) : alpha;
  mesh.material.transparent = a < 1;
  mesh.material.opacity = a;
  mesh.material.depthWrite = a >= 1;
  mesh.castShadow = !ghost;
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
