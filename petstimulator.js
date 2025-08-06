function feedPet() {
  const hunger = document.getElementById("hunger");
  hunger.textContent = Math.max(parseInt(hunger.textContent) - 10, 0);
  playSound("feed");
  animatePet();
  updatePetMood();
}

function playWithPet() {
  const happiness = document.getElementById("happiness");
  happiness.textContent = Math.min(parseInt(happiness.textContent) + 10, 100);
  playSound("play");
  animatePet();
  updatePetMood();
}

function sleepPet() {
  const pet = document.getElementById("pet");
  const happiness = document.getElementById("happiness");
  const hunger = document.getElementById("hunger");
  const zzz = document.getElementById("zzz");

  happiness.textContent = Math.min(parseInt(happiness.textContent) + 5, 100);
  hunger.textContent = Math.min(parseInt(hunger.textContent) + 5, 100);

  pet.classList.add("sleeping");
  zzz.style.display = "block";
  playSound("sleep");

  setTimeout(() => {
    pet.classList.remove("sleeping");
    zzz.style.display = "none";
    updatePetMood();
  }, 2000);
}

function animatePet() {
  const pet = document.getElementById("pet");
  pet.classList.add("happy");
  setTimeout(() => pet.classList.remove("happy"), 600);
}

function playSound(type) {
  const sounds = {
    feed: document.getElementById("soundFeed"),
    play: document.getElementById("soundPlay"),
    sleep: document.getElementById("soundSleep"),
  };
  if (sounds[type]) {
    sounds[type].currentTime = 0;
    sounds[type].play();
  }
}

function updatePetMood() {
  const pet = document.getElementById("pet");
  const hunger = parseInt(document.getElementById("hunger").textContent);
  const happiness = parseInt(document.getElementById("happiness").textContent);

  if (hunger >= 80) {
    pet.src = "03.png";
  } else if (happiness >= 80) {
    pet.src = "02.png";
  } else if (happiness < 30) {
    pet.src = "03.png";
  } else {
    pet.src = "00.png";
  }
}
