let hunger = 0;
let happiness = 10;
let energy = 10;

const hungerEl = document.getElementById("hunger");
const happinessEl = document.getElementById("happiness");
const energyEl = document.getElementById("energy");
const messageEl = document.getElementById("message");

function updateStats() {
  hungerEl.textContent = hunger;
  happinessEl.textContent = happiness;
  energyEl.textContent = energy;

  if (hunger >= 10) {
    messageEl.textContent = "😢 Your pet is too hungry!";
  } else if (happiness <= 0) {
    messageEl.textContent = "😢 Your pet is sad!";
  } else if (energy <= 0) {
    messageEl.textContent = "😴 Your pet is exhausted!";
  } else {
    messageEl.textContent = "";
  }
}

function feedPet() {
  if (hunger > 0) hunger--;
  energy--;
  updateStats();
}

function playWithPet() {
  happiness++;
  energy--;
  hunger++;
  updateStats();
}

function restPet() {
  energy += 2;
  hunger++;
  updateStats();
}

function tick() {
  hunger++;
  happiness--;
  energy--;
  updateStats();

  if (hunger >= 15 || happiness <= -5 || energy <= -5) {
    messageEl.textContent = "💀 Game Over: You neglected your pet!";
    clearInterval(gameInterval);
  }
}

const gameInterval = setInterval(tick, 5000); // every 5 seconds
updateStats();
