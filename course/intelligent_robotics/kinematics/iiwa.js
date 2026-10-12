// KUKA LBR iiwa 7 R800 model for the FK / IK pages: DH parameters, FK + Jacobian, and the robot meshes.
// Load after scene3d.js.
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
const SUB = ['₀', '₁', '₂', '₃', '₄', '₅', '₆', '₇'];

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

// ── Robot model (iiwa-style) ──
// Pitch joints (2, 4, 6) are drawn as cross-wise housings at the shoulder / elbow / wrist.
// Roll joints (1, 3, 5, 7) turn about the link itself, so they are drawn as orange
// rings on that link (the real robot hides them inside the link shell).
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
