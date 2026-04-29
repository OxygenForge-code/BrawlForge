let bullets = [];

function createBullet(x, y, dirX, dirY, owner) {
  bullets.push({ x, y, dirX, dirY, owner });
}

function updateBullets() {
  const speed = 10;
  bullets.forEach(b => {
    b.x += b.dirX * speed;
    b.y += b.dirY * speed;
  });
}

function getBullets() {
  return bullets;
}

module.exports = { createBullet, updateBullets, getBullets };