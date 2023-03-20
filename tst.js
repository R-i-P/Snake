// Define the canvas and its dimensions
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;

// Define the snake's starting position and size
let snake = [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }];
let direction = "right";

// Define the food's position
let food = { x: Math.floor(Math.random() * 39) + 1, y: Math.floor(Math.random() * 39) + 1 };

// Define the game loop
function loop() {
  // Move the snake
  let head = { x: snake[0].x, y: snake[0].y };
  if (direction === "right") head.x++;
  else if (direction === "left") head.x--;
  else if (direction === "up") head.y--;
  else if (direction === "down") head.y++;
  snake.unshift(head);

  // Check for collision with food
  if (head.x === food.x && head.y === food.y) {
    food = { x: Math.floor(Math.random() * 39) + 1, y: Math.floor(Math.random() * 39) + 1 };
  } else {
    snake.pop();
  }

  // Check for collision with walls
  if (head.x < 0 || head.x >= width / 10 || head.y < 0 || head.y >= height / 10) {
    clearInterval(interval);
    alert("Game over!");
    location.reload()
  }

  // Check for collision with itself
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      clearInterval(interval);
      alert("Game over!");
      location.reload()
    }
  }

  // Draw the snake
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "green";
  for (let i = 0; i < snake.length; i++) {
    ctx.fillRect(snake[i].x * 10, snake[i].y * 10, 10, 10);
  }

  // Draw the food
  ctx.fillStyle = "red";
  ctx.fillRect(food.x * 10, food.y * 10, 10, 10);
  bot()
}

// Add event listeners for arrow key presses
document.addEventListener("keydown", function (event) {
  if (event.keyCode === 37 && direction !== "right") {
    direction = "left";
  } else if (event.keyCode === 38 && direction !== "down") {
    direction = "up";
  } else if (event.keyCode === 39 && direction !== "left") {
    direction = "right";
  } else if (event.keyCode === 40 && direction !== "up") {
    direction = "down";
  }

});

function bot() {
    // Get the head and food positions
    const head = snake[0];
    const foodX = food.x;
    const foodY = food.y;
  
    // Calculate the distances to the food in each direction using Euclidean distance
    const upDist = distance(head.x, head.y - 1, foodX, foodY);
    const downDist = distance(head.x, head.y + 1, foodX, foodY);
    const leftDist = distance(head.x - 1, head.y, foodX, foodY);
    const rightDist = distance(head.x + 1, head.y, foodX, foodY);
  
    // Create an array of possible directions
    const possibleDirections = [];
    if (upDist < downDist && direction !== "down" && direction !== "down") {
      possibleDirections.push("up");
    }
    if (downDist < upDist && direction !== "up" && direction !== "up") {
      possibleDirections.push("down");
    }
    if (leftDist < rightDist && direction !== "right" && direction !== "right") {
      possibleDirections.push("left");
    }
    if (rightDist < leftDist && direction !== "left" && direction !== "left") {
      possibleDirections.push("right");
    }
  
    // Choose a random direction from the possible directions, or continue straight if there are no other options
    if (possibleDirections.length > 0) {
      const randomIndex = Math.floor(Math.random() * possibleDirections.length);
      direction = possibleDirections[randomIndex];
    }
  }
  

  //Define a helper function to calculate the distance between two points
  function distance(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
  }


// Start the game loop
const interval = setInterval(loop, 10);