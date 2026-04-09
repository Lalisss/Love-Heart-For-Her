const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75, window.innerWidth / window.innerHeight, 0.1, 1000
);
camera.position.z = 10;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 💖 สร้างรูปหัวใจ
const heartShape = new THREE.Shape();

heartShape.moveTo(0, 0);
heartShape.bezierCurveTo(0, 0, -1, -1, -2, 0);
heartShape.bezierCurveTo(-3, 2, 0, 3, 0, 4);
heartShape.bezierCurveTo(0, 3, 3, 2, 2, 0);
heartShape.bezierCurveTo(1, -1, 0, 0, 0, 0);

// 💖 geometry (หัวใจเส้น 3D)
const geometry = new THREE.SphereGeometry(2, 64, 64);

const pos = geometry.attributes.position;

for (let i = 0; i < pos.count; i++) {
  let x = pos.getX(i);
  let y = pos.getY(i);
  let z = pos.getZ(i);

  const newX = x * Math.sqrt(1 - (y * 0.5));
  const newY = y;
  const newZ = z * Math.sqrt(1 - (y * 0.5));

  pos.setXYZ(i, newX, newY, newZ);
}

geometry.computeVertexNormals();
const material = new THREE.MeshBasicMaterial({
  color: 0xff69b4,
  wireframe: true
});
const heart = new THREE.Mesh(geometry, material);

scene.add(heart);

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

  particleSystem.rotation.y += 0.002;

  renderer.render(scene, camera);
}

animate();

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
