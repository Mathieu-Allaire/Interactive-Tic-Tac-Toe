const tiles = document.querySelectorAll(".tile");
const PLAYER_X = "X";
const PLAYER_O = "O";
let turn = PLAYER_X;

const gridState = Array(tiles.length);
gridState.fill(null);

//Elements
const cross = document.getElementById("cross");
const gameOver = document.getElementById("game-over");
const gameOverText = document.getElementById("game-over-text");
const playAgain = document.getElementById("play-again");
const xScore=document.getElementById("X_score");
let X_SCORE=0;
let O_SCORE=0;
//xScore.innerText=X_SCORE
const oScore=document.getElementById("O_score");
playAgain.addEventListener("click", startNewGame);

//Sounds
const gameOverSound = new Audio("music/game_over.wav");
const clickSound = new Audio("music/click.wav");

tiles.forEach((tile) => tile.addEventListener("click", tileClick));

function setHoverText() {
  //remove all hover text
  tiles.forEach((tile) => {
    tile.classList.remove("x-hover");
    tile.classList.remove("o-hover");
  });

  const hoverClass = `${turn.toLowerCase()}-hover`;

  tiles.forEach((tile) => {
    if (tile.innerText == "") {
      tile.classList.add(hoverClass);
    }
  });
}

setHoverText();

function tileClick(event) {
  if (gameOver.classList.contains("visible")) {
    return;
  }

  const tile = event.target;
  const tileNumber = tile.dataset.index;
  if (tile.innerText != "") {
    return;
  }

  if (turn === PLAYER_X) {
    tile.innerText = PLAYER_X;
    gridState[tileNumber - 1] = PLAYER_X;
    turn = PLAYER_O;
  } else {
    tile.innerText = PLAYER_O;
    gridState[tileNumber - 1] = PLAYER_O;
    turn = PLAYER_X;
  }

  clickSound.play();
  setHoverText();
  winCheck();
}

function winCheck() {
  //Check for a winner
  for (const winningCombination of winningCombinations) {
    //Object Destructuring
    const { combo, crossClass } = winningCombination;
    const tile1 = gridState[combo[0] - 1];
    const tile2 = gridState[combo[1] - 1];
    const tile3 = gridState[combo[2] - 1];

    if (
      tile1 != null &&
      tile1 === tile2 &&
      tile1 === tile3
    ) {
      cross.classList.add(crossClass);
      gameOverScreen(tile1);
      if (tile1=="X"){
        X_SCORE+=1
      }
      else{
        O_SCORE+=1
      }
      xScore.innerText=X_SCORE;
      oScore.innerText=O_SCORE;
    
      return;
    }
  }

  //Check for a draw
  const allTileFilledIn = gridState.every((tile) => tile !== null);
  if (allTileFilledIn) {
    gameOverScreen(null);
  }
}

function gameOverScreen(winnerText) {
  let text = "Draw!";
  if (winnerText != null) {
    text = `Winner is ${winnerText}!`;
  }
  gameOver.className = "visible";
  gameOverText.innerText = text;
  gameOverSound.play();
}

function startNewGame() {
  cross.className = "cross";
  gameOver.className = "hidden";
  gridState.fill(null);
  tiles.forEach((tile) => (tile.innerText = ""));
  turn = PLAYER_X;
  setHoverText();
}

const winningCombinations = [
  //rows
  { combo: [1, 2, 3], crossClass: "cross-row-1" },
  { combo: [4, 5, 6], crossClass: "cross-row-2" },
  { combo: [7, 8, 9], crossClass: "cross-row-3" },
  //columns
  { combo: [1, 4, 7], crossClass: "cross-column-1" },
  { combo: [2, 5, 8], crossClass: "cross-column-2" },
  { combo: [3, 6, 9], crossClass: "cross-column-3" },
  //diagonals
  { combo: [1, 5, 9], crossClass: "cross-diagonal-1" },
  { combo: [3, 5, 7], crossClass: "cross-diagonal-2" },
];

