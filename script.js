const textColor = document.getElementById("textColor");
const backgroundCanvas = document.getElementById("backgroundCanvas");
const canvas = document.getElementById("myCanvas");
const clear = document.getElementById("clearButton");
const save = document.getElementById("saveButton");
const retrieve = document.getElementById("retrieveButton");
const fontSize = document.getElementById("fontSize");

const ctx = canvas.getContext("2d");

textColor.addEventListener("change", (e) => {
  ctx.strokeStyle = e.target.value;
  ctx.fillStyle = e.target.value;
});

canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  lastX = event.offsetX;
  lastY = event.offsetY;
});

canvas.addEventListener("mousemove", (e) => {
  if (isDrawing) {
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();

    lastX = event.offsetX;
    lastY = event.offsetY;
  }
});

canvas.addEventListener("mouseup", () => {
  isDrawing = false;
});

backgroundCanvas.addEventListener("change", (e) => {
  ctx.fillStyle = e.target.value;
  ctx.fillRect(0, 0, 800, 500);
});

fontSize.addEventListener("change", (e) => {
  ctx.lineWidth = e.target.value;
});

clear.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

save.addEventListener("click", () => {
  localStorage.setItem("canvasContents", canvas.toDataURL());

  let link = document.createElement("a");
  link.download = "my-canvas.png";
  link.href = canvas.toDataURL();
  link.click();
});

retrieve.addEventListener("click", () => {
  let savedCanvas = localStorage.getItem("canvasContents");

  if (savedCanvas) {
    let img = new Image();
    img.src = savedCanvas;
    ctx.drawImage(img, 0, 0);
  }
});
