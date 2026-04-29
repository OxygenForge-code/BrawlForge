const { createBullet } = require("./bullets");

function handleShoot(player, dirX, dirY, id) {
  createBullet(player.x, player.y, dirX, dirY, id);
}

module.exports = { handleShoot };