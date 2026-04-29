function drawBullets(ctx, bullets) {
  ctx.fillStyle = "red";
  bullets.forEach(b => {
    ctx.fillRect(b.x, b.y, 10, 10);
  });
}

window.drawBullets = drawBullets;