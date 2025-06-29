const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");
let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;
const fontSize = 16;
const columns = Math.floor(width / fontSize);
const drops = new Array(columns).fill(0);
const chars = "01";

function drawMatrix() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = "#4caf50";
  ctx.font = fontSize + "px 'Share Tech Mono'";
  for (let i = 0; i < drops.length; i++) {
    const text = chars.charAt(Math.floor(Math.random() * chars.length));
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
    if (drops[i] * fontSize > height && Math.random() > 0.975) {
      drops[i] = 0;
    } else {
      drops[i]++;
    }
  }
  requestAnimationFrame(drawMatrix);
}
drawMatrix();

window.addEventListener("resize", () => {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
});

const fileInput = document.getElementById("fileInput");
const textInput = document.getElementById("textInput");
const keyInput = document.getElementById("keyInput");
const resultDiv = document.getElementById("result");
const downloadLink = document.getElementById("downloadLink");
const fileNameSpan = document.getElementById("fileName");

fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];
  if (!file) {
    fileNameSpan.textContent = "No file chosen";
    return;
  }
  if (!file.name.endsWith(".txt")) {
    alert("Please upload a .txt file");
    fileInput.value = "";
    fileNameSpan.textContent = "No file chosen";
    return;
  }
  fileNameSpan.textContent = file.name;
  const reader = new FileReader();
  reader.onload = (e) => {
    textInput.value = e.target.result;
  };
  reader.readAsText(file);
});

function xor(text, key) {
  if (!key.length) return "";
  let result = "";
  for (let i = 0; i < text.length; i++) {
    result += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
  }
  return result;
}

function showResult(text) {
  resultDiv.textContent = text;
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  downloadLink.href = url;
  downloadLink.style.display = "inline-block";
}

document.getElementById("encryptBtn").addEventListener("click", () => {
  const text = textInput.value;
  const key = keyInput.value;
  if (!text || !key) {
    alert("Enter text and key");
    return;
  }
  const result = xor(text, key);
  showResult(result);
});

document.getElementById("decryptBtn").addEventListener("click", () => {
  const text = textInput.value;
  const key = keyInput.value;
  if (!text || !key) {
    alert("Enter text and key");
    return;
  }
  const result = xor(text, key);
  showResult(result);
});

document.getElementById("clearBtn").addEventListener("click", () => {
  textInput.value = "";
  resultDiv.textContent = "";
  downloadLink.style.display = "none";
  fileInput.value = "";
  fileNameSpan.textContent = "No file chosen";
});
