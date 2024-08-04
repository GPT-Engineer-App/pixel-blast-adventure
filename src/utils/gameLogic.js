export const CANVAS_WIDTH = 800;
export const CANVAS_HEIGHT = 600;

export const updateGame = (state, key) => {
  const newState = { ...state };

  if (newState.gameOver) return newState;

  // Update player position
  if (key) {
    switch (key) {
      case 'w':
        newState.player.y = Math.max(0, newState.player.y - newState.player.speed);
        break;
      case 's':
        newState.player.y = Math.min(CANVAS_HEIGHT - 30, newState.player.y + newState.player.speed);
        break;
      case 'a':
        newState.player.x = Math.max(0, newState.player.x - newState.player.speed);
        break;
      case 'd':
        newState.player.x = Math.min(CANVAS_WIDTH - 30, newState.player.x + newState.player.speed);
        break;
      case ' ':
        newState.bullets.push({ x: newState.player.x + 15, y: newState.player.y, speed: 10 });
        break;
    }
  }

  // Update bullets
  newState.bullets = newState.bullets.filter((bullet) => bullet.y > 0);
  newState.bullets.forEach((bullet) => {
    bullet.y -= bullet.speed;
  });

  // Spawn enemies
  if (Math.random() < 0.02) {
    newState.enemies.push({
      x: Math.random() * (CANVAS_WIDTH - 20),
      y: 0,
      speed: 2 + Math.random() * 2,
    });
  }

  // Update enemies
  newState.enemies = newState.enemies.filter((enemy) => enemy.y < CANVAS_HEIGHT);
  newState.enemies.forEach((enemy) => {
    enemy.y += enemy.speed;
  });

  // Check collisions
  newState.enemies = newState.enemies.filter((enemy) => {
    const hitByBullet = newState.bullets.some((bullet) => {
      const hit = Math.abs(bullet.x - enemy.x) < 20 && Math.abs(bullet.y - enemy.y) < 20;
      if (hit) {
        newState.score += 10;
      }
      return hit;
    });
    return !hitByBullet;
  });

  newState.bullets = newState.bullets.filter((bullet) => {
    return !newState.enemies.some((enemy) => {
      return Math.abs(bullet.x - enemy.x) < 20 && Math.abs(bullet.y - enemy.y) < 20;
    });
  });

  // Check for game over
  if (newState.enemies.some(enemy => enemy.y + 20 > newState.player.y)) {
    newState.gameOver = true;
  }

  return newState;
};

export const drawGame = (ctx, state) => {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  // Draw player
  ctx.fillStyle = 'blue';
  ctx.fillRect(state.player.x, state.player.y, 30, 30);

  // Draw bullets
  ctx.fillStyle = 'yellow';
  state.bullets.forEach((bullet) => {
    ctx.fillRect(bullet.x - 2, bullet.y - 5, 4, 10);
  });

  // Draw enemies
  ctx.fillStyle = 'red';
  state.enemies.forEach((enemy) => {
    ctx.fillRect(enemy.x, enemy.y, 20, 20);
  });
};
