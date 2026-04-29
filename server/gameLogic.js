function movePlayer(player, input) {
  const speed = 5;

  if (input.up) player.y -= speed;
  if (input.down) player.y += speed;
  if (input.left) player.x -= speed;
  if (input.right) player.x += speed;
}

module.exports = { movePlayer };