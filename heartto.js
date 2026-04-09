const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75, window.innerWidth / window.innerHeight, 0.1, 1000
);
camera.position.z = 5;

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

const geometry = new THREE.ExtrudeGeometry(heartShape, {
  depth: 0.5,
  bevelEnabled: true
});

const material = new THREE.MeshStandardMaterial({
  color: 0xff4d6d,
  emissive: 0xff0000,
  emissiveIntensity: 1 });

const heart = new THREE.Mesh(geometry, material);

heart.scale.set(1.5, 1.5, 1.5);
heart.position.set(0, 0, 0);

scene.add(heart);

camera.position.z = 10;

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

  particleSystem.rotation.y += 0.002;

  renderer.render(scene, camera);
}

animate(); // 👈 เรียกใช้งานก่อน

const messages = [
  "This is for you babe ❤️",
  "You make me so happy",
  "I love you more everyday",
  "Stay with me forever",
  "You are my everything"
];

let index = 0;
const textEl = document.getElementById("loveText");

setInterval(() => {
  textEl.style.opacity = 0;

  setTimeout(() => {
    index = (index + 1) % messages.length;
    textEl.innerText = messages[index];
    textEl.style.opacity = 1;
  }, 1000);

}, 3500);
