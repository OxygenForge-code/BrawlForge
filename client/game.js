const socket = io();
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let players = {};
let input = {};

document.addEventListener("keydown", (e) => {
  if (e.key === "w") input.up = true;
  if (e.key === "s") input.down = true;
  if (e.key === "a") input.left = true;
  if (e.key === "d") input.right = true;
});

document.addEventListener("keyup", (e) => {
  if (e.key === "w") input.up = false;
  if (e.key === "s") input.down = false;
  if (e.key === "a") input.left = false;
  if (e.key === "d") input.right = false;
});

setInterval(() => {
  socket.emit("move", input);
}, 50);

socket.on("state", (serverPlayers) => {
  players = serverPlayers;
});

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let id in players) {
    let p = players[id];
    ctx.fillStyle = "white";
    ctx.fillRect(p.x, p.y, 30, 30);
  }

  requestAnimationFrame(draw);
}

draw();
