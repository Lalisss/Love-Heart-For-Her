const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75, window.innerWidth / window.innerHeight, 0.1, 1000
);
camera.position.z = 4;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 💖 NEW: หัวใจแบบเส้น
const geometry = new THREE.BufferGeometry();
const vertices = [];

for (let t = 0; t < Math.PI * 2; t += 0.05) {
  for (let p = 0; p < Math.PI; p += 0.05) {

    const x = 16 * Math.pow(Math.sin(p), 3) * Math.sin(t);
    const y =
      13 * Math.cos(p) -
      5 * Math.cos(2 * p) -
      2 * Math.cos(3 * p) -
      Math.cos(4 * p);
    const z = 16 * Math.pow(Math.sin(p), 3) * Math.cos(t);

  vertices.push(x * 0.2, y * 0.2, z * 0.2);
  }
}

geometry.setAttribute(
  "position",
  new THREE.Float32BufferAttribute(vertices, 3)
);

geometry.center();

const material = new THREE.PointsMaterial({
  color: 0xff4d6d,
  size: 0.025
});

const heart = new THREE.Points(geometry, material);
scene.add(heart);

camera.position.z = 6;

const light2 = new THREE.AmbientLight(0xffffff, 1.5);
scene.add(light2);

const light = new THREE.PointLight(0xffffff, 2);
light.position.set(5, 5, 5);
scene.add(light);

// ✨ particle รอบๆ
const particles = new THREE.BufferGeometry();
const count = 500;

const positions = new Float32Array(count * 3);

for (let i = 0; i < count * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 10;
}

particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));

const pMaterial = new THREE.PointsMaterial({
  color: 0xff99cc,
  size: 0.05
});

const particleSystem = new THREE.Points(particles, pMaterial);
scene.add(particleSystem);

// 🎬 animation
function animate() {
  requestAnimationFrame(animate);

  heart.rotation.y += 0.01;
  heart.rotation.x += 0.005;

const beat = 2 + Math.sin(Date.now() * 0.004) * 0.12;
heart.scale.set(2, 2, 2);

  particleSystem.rotation.y += 0.002;

  renderer.render(scene, camera);
}

animate(); // 👈 เรียกใช้งานก่อน

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

document.addEventListener('click', () => {
  const audio = document.getElementById("bgm");
  if (audio) {
    audio.muted = false;
    audio.play();
  }
});
