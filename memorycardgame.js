const board = document.getElementById("gameBoard");
const movesCounter = document.getElementById("moves");
const timerDisplay = document.getElementById("timer");
const newGameBtn = document.getElementById("newGame");
const congratsMsg = document.getElementById("congrats");
const difficultySelect = document.getElementById("difficulty");

const emojiSets = {
  easy: ['🍎', '🍌'],
  medium: ['🍎', '🍌', '🍇', '🍓', '🍒', '🍉', '🍋', '🍍'],
  hard: ['🍎', '🍌', '🍇', '🍓', '🍒', '🍉', '🍋', '🍍', '🥝', '🥭', '🍈', '🍑', '🍏', '🍊', '🥥', '🥑', '🍠', '🍅']
};

let flippedCards = [], matchedCards = 0, moves = 0, timer, seconds = 0, currentCards = [];

function getCardSet(difficulty) {
  const selected = emojiSets[difficulty];
  const count = difficulty === 'easy' ? 2 : difficulty === 'medium' ? 8 : 18;
  return [...selected.slice(0, count), ...selected.slice(0, count)];
}

function startGame() {
  const difficulty = difficultySelect.value;
  currentCards = getCardSet(difficulty).sort(() => 0.5 - Math.random());

  board.innerHTML = '';
  congratsMsg.classList.add('hidden');
  flippedCards = [];
  matchedCards = 0;
  moves = 0;
  seconds = 0;
  clearInterval(timer);
  timer = setInterval(updateTimer, 1000);
  movesCounter.textContent = 'Moves: 0';
  timerDisplay.textContent = 'Time: 0s';
  document.getElementById('score').textContent = 'Score: 1000';

  if (difficulty === 'easy') {
    board.style.gridTemplateColumns = 'repeat(2, 80px)';
  } else if (difficulty === 'medium') {
    board.style.gridTemplateColumns = 'repeat(4, 80px)';
  } else {
    board.style.gridTemplateColumns = 'repeat(6, 80px)';
  }

  currentCards.forEach(value => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front"></div>
        <div class="card-back">${value}</div>
      </div>
    `;
    card.addEventListener('click', () => flipCard(card, value));
    board.appendChild(card);
  });
}

function flipCard(card, value) {
  if (card.classList.contains('flipped') || flippedCards.length === 2) return;

  card.classList.add('flipped');
  flippedCards.push({ card, value });

  if (flippedCards.length === 2) {
    moves++;
    movesCounter.textContent = `Moves: ${moves}`;
    updateScore();

    const [first, second] = flippedCards;
    if (first.value === second.value) {
      matchedCards += 2;
      flippedCards = [];
      if (matchedCards === currentCards.length) {
        clearInterval(timer);
        congratsMsg.classList.remove('hidden');
      }
    } else {
      setTimeout(() => {
        first.card.classList.remove('flipped');
        second.card.classList.remove('flipped');
        flippedCards = [];
      }, 800);
    }
  }
}

function updateTimer() {
  seconds++;
  timerDisplay.textContent = `Time: ${seconds}s`;
  updateScore();
}

function updateScore() {
  let rawScore = 1000 - (moves * 5 + seconds * 2);
  let score = Math.max(rawScore, 0);
  document.getElementById('score').textContent = `Score: ${score}`;
}

newGameBtn.addEventListener('click', startGame);
window.addEventListener('load', startGame);
