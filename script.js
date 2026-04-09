// 🎬 SCENE
const scene = new THREE.Scene();

// 🎥 CAMERA
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 8; // ปรับให้พอดีเห็นหัวใจ

// 🖥️ RENDERER
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000);
document.body.appendChild(renderer.domElement);

// 💖 HEART GEOMETRY 3D (ตาข่ายจริง)
const geometry = new THREE.ParametricGeometry((u, v, target) => {
  const t = u * Math.PI * 2;
  const p = v * Math.PI;

  const x = 16 * Math.pow(Math.sin(p), 3) * Math.sin(t);
  const y = 13 * Math.cos(p) - 5 * Math.cos(2 * p) - 2 * Math.cos(3 * p) - Math.cos(4 * p);
  const z = 16 * Math.pow(Math.sin(p), 3) * Math.cos(t);

  target.set(x * 0.05, y * 0.05, z * 0.05);
}, 50, 50); // ละเอียดสูงเพื่อให้ตาข่ายเนียน

// 💖 MATERIAL (ตาข่ายจริง)
const material = new THREE.MeshBasicMaterial({
  color: 0xff69b4,
  wireframe: true
});

// 💖 HEART MESH
const heart = new THREE.Mesh(geometry, material);
heart.scale.set(3, 3, 3);
scene.add(heart);

// 💖 GLOW (ซ้อนอีกชั้น, ตาข่ายจริง)
const glowMaterial = new THREE.MeshBasicMaterial({
  color: 0xff99cc,
  wireframe: true,
  transparent: true,
  opacity: 0.2
});
const glow = new THREE.Mesh(geometry, glowMaterial);
glow.scale.set(3.2, 3.2, 3.2);
scene.add(glow);
// ✨ PARTICLES (ฟุ้งรอบหัวใจ)
const particles = new THREE.BufferGeometry();
const count = 2000;

const positions = new Float32Array(count * 3);
const radius = 5;

for (let i = 0; i < count; i++) {
  const angle = Math.random() * Math.PI * 2;
  const r = radius + Math.random() * 2;

  positions[i * 3] = Math.cos(angle) * r;
  positions[i * 3 + 1] = (Math.random() - 0.5) * 10; // 🔥 สูงขึ้น
  positions[i * 3 + 2] = Math.sin(angle) * r;
}

particles.setAttribute(
  "position",
  new THREE.BufferAttribute(positions, 3)
);

// 🔥 เพิ่ม texture ก่อน
const texture = new THREE.TextureLoader().load(
  "https://threejs.org/examples/textures/sprites/disc.png"
);

// 🔥 แทนที่ pMaterial เดิม
const pMaterial = new THREE.PointsMaterial({
  map: texture,
  color: 0xff99cc,
  size: 0.15,
  transparent: true,
  opacity: 1,
  depthWrite: false,
  blending: THREE.AdditiveBlending, // 🔥 ต้องมี comma
  alphaTest: 0.01                   // 🔥 ใส่หลัง comma
});

const particleSystem = new THREE.Points(particles, pMaterial);
scene.add(particleSystem);

// 💡 LIGHT (เผื่ออนาคตใช้ shading)
const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 2);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// 🎬 ANIMATION
function animate() {
  requestAnimationFrame(animate);

  heart.rotation.y += 0.01;
  heart.rotation.x += 0.005;
  glow.rotation.y += 0.01;
  glow.rotation.x += 0.005;
  particleSystem.rotation.y += 0.004;
  particleSystem.rotation.x += 0.002;
  particleSystem.position.z = 2; // 🔥 ดันออกมาข้างหน้า

  const beat = 1 + Math.sin(Date.now() * 0.005) * 0.1;
  heart.scale.set(3 * beat, 3 * beat, 3 * beat);
  glow.scale.set(3.2 * beat, 3.2 * beat, 3.2 * beat);

  renderer.render(scene, camera);
}
animate();

// 📱 RESPONSIVE
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// 💬 TEXT
const messages = [
  "This is for you babe ",
  "You make me so happy",
  "I love you more everyday",
  "Stay with me forever",
  "You make my world brighter",
  "I love you more than words can say",
  "You are my favorite person",
  "Being with you feels like home",
  "I’m so lucky to have you",
  "You are my happiness",
  "Every moment with you is special",
  "I fall in love with you every day",
  "You complete me",
  "I’ll always choose you",
  "You are my safe place",
  "My heart belongs to you",
  "You make everything better",
  "I can’t imagine life without you",
  "You are my dream come true",
  "Forever isn’t enough with you",
  "You are my sunshine",
  "With you, I feel whole",
  "You are the best thing in my life",
  "I just want to be with you always",
  "You mean everything to me",
  "You are my one and only",
  "I love you endlessly",
  "You are my forever",
  "You are my everything"
];

let index = 0;
const textEl = document.getElementById("loveText");

if (textEl) {
  setInterval(() => {
    textEl.style.opacity = 0;

    setTimeout(() => {
      index = (index + 1) % messages.length;
      textEl.innerText = messages[index];
      textEl.style.opacity = 1;
    }, 1000);
  }, 3500);
}

// 🔊 AUDIO
document.addEventListener("click", () => {
  const audio = document.getElementById("bgm");
  if (audio) {
    audio.muted = false;
    audio.play();
  }
});
