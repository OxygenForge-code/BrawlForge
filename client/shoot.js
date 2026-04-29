document.addEventListener("click", (e) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  let dirX = mouseX - centerX;
  let dirY = mouseY - centerY;

  const length = Math.sqrt(dirX * dirX + dirY * dirY);
  dirX /= length;
  dirY /= length;

  socket.emit("shoot", { dirX, dirY });
});