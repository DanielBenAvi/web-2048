// -------------------------------------------- variables
var board = new Array(4);
var score = 0;

let colors = {
  0: "#cdc1b4",
  2: "#eee4da",
  4: "#ede0c8",
  8: "#f2b179",
  16: "#f59563",
  32: "#f67c5f",
  64: "#f65e3b",
  128: "#edcf72",
  256: "#edcc61",
  512: "#edc850",
  1024: "#edc53f",
  2048: "#edc22e",
  4096: "#3c3a32",
};

// -------------------------------------------- functions
function newGame() {
  initBoard();
  displayBoard();
  addRandomTile();
  score = 0;
  updateScore();
}

function initBoard() {
  for (var i = 0; i < 4; i++) {
    board[i] = new Array(4);
    for (var j = 0; j < 4; j++) {
      board[i][j] = 0;
    }
  }
}

function displayBoard() {
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      var tile = document.getElementById("tile" + i + j);

      tile.innerHTML = board[i][j] == 0 ? "" : board[i][j];

      // set color based on value
      tile.style.backgroundColor = colors[board[i][j]];
    }
  }
}

function addRandomTile() {
  var emptyTiles = [];
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      if (board[i][j] == 0) {
        emptyTiles.push({ x: i, y: j });
      }
    }
  }

  var randomTile = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
  board[randomTile.x][randomTile.y] = 2;
  displayBoard();

  var tile = document.getElementById("tile" + randomTile.x + randomTile.y);
  tile.classList.add("new-tile");
  setTimeout(function () {
    tile.classList.remove("new-tile");
  }, 200); // Match the duration of the CSS animation
}

function isGameOver() {
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      if (board[i][j] == 0) {
        return false;
      }
    }
  }
  return true;
}

function updateScore() {
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      score += board[i][j];
    }
  }

  document.getElementById("score").innerHTML = "Score: " + score;
}

function animateTiles(animationClass) {
  var tiles = document.getElementsByClassName("cell");
  for (var i = 0; i < tiles.length; i++) {
    tiles[i].classList.add(animationClass);
  }
  setTimeout(function () {
    for (var i = 0; i < tiles.length; i++) {
      tiles[i].classList.remove(animationClass);
    }
  }, 200); // Match the duration of the CSS transition
}

function handleKeyPress(event) {
  if (isGameOver()) {
    alert("Game Over!");
    // reset game
    newGame();
    return;
  }

  if (
    event.key != "ArrowUp" &&
    event.key != "ArrowDown" &&
    event.key != "ArrowLeft" &&
    event.key != "ArrowRight"
  ) {
    return;
  }

  switch (event.key) {
    case "ArrowUp":
      animateTiles("move-up");
      moveUp();
      break;
    case "ArrowDown":
      animateTiles("move-down");
      moveDown();
      break;
    case "ArrowLeft":
      animateTiles("move-left");
      moveLeft();
      break;
    case "ArrowRight":
      animateTiles("move-right");
      moveRight();
      break;
  }
  displayBoard();
  addRandomTile();
  displayBoard();
  updateScore();
}

function moveUp() {
  // move tiles up
  // if two tiles are the same, merge them
  for (var j = 0; j < 4; j++) {
    for (var i = 1; i < 4; i++) {
      if (board[i][j] != 0) {
        var k = i - 1;
        while (k >= 0 && board[k][j] == 0) {
          k--;
        }

        if (k >= 0 && board[k][j] == board[i][j]) {
          board[k][j] *= 2;
          board[i][j] = 0;
        } else {
          board[k + 1][j] = board[i][j];
          if (k + 1 != i) {
            board[i][j] = 0;
          }
        }
      }
    }
  }
}

function moveDown() {
  // move tiles down
  // if two tiles are the same, merge them
  for (var j = 0; j < 4; j++) {
    for (var i = 2; i >= 0; i--) {
      if (board[i][j] != 0) {
        var k = i + 1;
        while (k < 4 && board[k][j] == 0) {
          k++;
        }

        if (k < 4 && board[k][j] == board[i][j]) {
          board[k][j] *= 2;
          board[i][j] = 0;
        } else {
          board[k - 1][j] = board[i][j];
          if (k - 1 != i) {
            board[i][j] = 0;
          }
        }
      }
    }
  }
}

function moveLeft() {
  // move tiles left
  // if two tiles are the same, merge them
  for (var i = 0; i < 4; i++) {
    for (var j = 1; j < 4; j++) {
      if (board[i][j] != 0) {
        var k = j - 1;
        while (k >= 0 && board[i][k] == 0) {
          k--;
        }

        if (k >= 0 && board[i][k] == board[i][j]) {
          board[i][k] *= 2;
          board[i][j] = 0;
        } else {
          board[i][k + 1] = board[i][j];
          if (k + 1 != j) {
            board[i][j] = 0;
          }
        }
      }
    }
  }
}

function moveRight() {
  // move tiles right
  // if two tiles are the same, merge them
  for (var i = 0; i < 4; i++) {
    for (var j = 2; j >= 0; j--) {
      if (board[i][j] != 0) {
        var k = j + 1;
        while (k < 4 && board[i][k] == 0) {
          k++;
        }

        if (k < 4 && board[i][k] == board[i][j]) {
          board[i][k] *= 2;
          board[i][j] = 0;
        } else {
          board[i][k - 1] = board[i][j];
          if (k - 1 != j) {
            board[i][j] = 0;
          }
        }
      }
    }
  }
}

// -------------------------------------------- main
document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("keydown", handleKeyPress);
  newGame();
});
