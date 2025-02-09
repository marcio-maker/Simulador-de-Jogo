const gameArea = document.getElementById('gameArea');
const player = document.getElementById('player');
let obstacles = [];
let gameInterval;
let obstacleInterval;
let playerSpeed = 5;
let obstacleSpeed = 2;

document.addEventListener('keydown', movePlayer);

function movePlayer(event) {
  const left = parseInt(window.getComputedStyle(player).getPropertyValue('left'));

  if (event.key === 'ArrowLeft' && left > 0) {
    player.style.left = left - playerSpeed + 'px';
  }
  if (event.key === 'ArrowRight' && left < gameArea.clientWidth - player.clientWidth) {
    player.style.left = left + playerSpeed + 'px';
  }
}

function createObstacle() {
  const obstacle = document.createElement('div');
  obstacle.classList.add('obstacle');
  obstacle.style.left = Math.floor(Math.random() * (gameArea.clientWidth - 50)) + 'px';
  gameArea.appendChild(obstacle);
  obstacles.push(obstacle);
}

function moveObstacles() {
  obstacles.forEach((obstacle, index) => {
    const top = parseInt(window.getComputedStyle(obstacle).getPropertyValue('top'));
    if (top >= gameArea.clientHeight) {
      obstacle.remove();
      obstacles.splice(index, 1);
    } else {
      obstacle.style.top = top + obstacleSpeed + 'px';
      checkCollision(obstacle);
    }
  });
}

function checkCollision(obstacle) {
  const playerRect = player.getBoundingClientRect();
  const obstacleRect = obstacle.getBoundingClientRect();

  if (
    playerRect.left < obstacleRect.left + obstacleRect.width &&
    playerRect.left + playerRect.width > obstacleRect.left &&
    playerRect.top < obstacleRect.top + obstacleRect.height &&
    playerRect.top + playerRect.height > obstacleRect.top
  ) {
    endGame();
  }
}

function startGame() {
  gameInterval = setInterval(moveObstacles, 20);
  obstacleInterval = setInterval(createObstacle, 2000);
}

function endGame() {
  clearInterval(gameInterval);
  clearInterval(obstacleInterval);
  alert('Game Over!');
  obstacles.forEach(obstacle => obstacle.remove());
  obstacles = [];
}

startGame();
