const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('reset');
const scoreX = document.getElementById('scoreX');
const scoreO = document.getElementById('scoreO');

let currentPlayer = 'X';
let board = Array(9).fill(null);
let gameActive = true;
let scores = { X: 0, O: 0 };

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleCellClick(e) {
  const cell = e.target;
  const index = cell.getAttribute('data-index');

  if (board[index] || !gameActive) return;

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add('taken');

  if (checkWin()) {
    statusText.textContent = `Player ${currentPlayer} Wins!`;
    updateScore(currentPlayer);
    highlightWinningCells();
    gameActive = false;
    return;
  }

  if (board.every(cell => cell)) {
    statusText.textContent = `It's a Draw!`;
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function checkWin() {
  return winningCombinations.some(combination => {
    return combination.every(index => board[index] === currentPlayer);
  });
}

function highlightWinningCells() {
  winningCombinations.forEach(combination => {
    if (combination.every(index => board[index] === currentPlayer)) {
      combination.forEach(index => {
        cells[index].style.backgroundColor = '#90EE90';
      });
    }
  });
}

function updateScore(player) {
  scores[player]++;
  scoreX.textContent = scores.X;
  scoreO.textContent = scores.O;
}

function resetGame() {
  board = Array(9).fill(null);
  cells.forEach(cell => {
    cell.textContent = '';
    cell.style.backgroundColor = '#ffffff';
    cell.classList.remove('taken');
  });
  currentPlayer = 'X';
  gameActive = true;
  statusText.textContent = `Player X's Turn`;
}

// Event Listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
