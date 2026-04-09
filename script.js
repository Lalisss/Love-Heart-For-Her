// 🎬 SCENE
const scene = new THREE.Scene();

// 🎥 CAMERA
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 10;

// 🖥️ RENDERER
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000);
document.body.appendChild(renderer.domElement);

// 💖 HEART (เส้นล้วน)
const geometry = new THREE.BufferGeometry();
const vertices = [];

for (let t = 0; t < Math.PI * 2; t += 0.02) {
  const x = 16 * Math.pow(Math.sin(t), 3);
  const y =
    13 * Math.cos(t) -
    5 * Math.cos(2 * t) -
    2 * Math.cos(3 * t) -
    Math.cos(4 * t);

  vertices.push(x * 0.2, y * 0.2, 0);
}

geometry.setAttribute(
  "position",
  new THREE.Float32BufferAttribute(vertices, 3)
);

geometry.center(); // ✅ ต้องมาก่อน

const line = new THREE.LineLoop(
  geometry,
  new THREE.LineBasicMaterial({ color: 0xff69b4 })
);

line.scale.set(2, 2, 2);

scene.add(line);

// 💡 LIGHT
const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 2);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// ✨ PARTICLES
const particles = new THREE.BufferGeometry();
const count = 500;
const positions = new Float32Array(count * 3);

for (let i = 0; i < count * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 10;
}

particles.setAttribute(
  "position",
  new THREE.BufferAttribute(positions, 3)
);

const pMaterial = new THREE.PointsMaterial({
  color: 0xff99cc,
  size: 0.05
});

const particleSystem = new THREE.Points(particles, pMaterial);
scene.add(particleSystem);

// 🎬 ANIMATION
function animate() {
  requestAnimationFrame(animate);

  line.rotation.z += 0.01;

  // 💓 เต้น
  const beat = 1 + Math.sin(Date.now() * 0.005) * 0.1;
  line.scale.set(2 * beat, 2 * beat, 2 * beat);

  particleSystem.rotation.y += 0.002;

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
