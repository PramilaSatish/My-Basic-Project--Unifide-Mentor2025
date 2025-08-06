const scenes = [
    {
      text: "Scene 1- The Idle Boy: Once upon a time, a boy named Rahul spent his days idly, unaware of how precious time was.",
      image: "00.jpeg",
      audio: "Sugar - Anno Domini Beats.mp3"
    },
    {
      text: "Scene 2- Missed Opportunities: Rahul often missed important events because he never valued punctuality.",
      image: "02.jpeg",
      audio: "Sugar - Anno Domini Beats.mp3"
    },
    {
      text: "Scene 3- A Friend's Advice: His friend Ram advised, 'Be punctual; time and tide wait for none.'",
      image: "03.jpeg",
      audio: "Sugar - Anno Domini Beats.mp3"
    },
    {
      text: "Scene 4- Realization: Rahul realized the importance of time after missing his exam.",
      image: "04.jpeg",
      audio: "Sugar - Anno Domini Beats.mp3"
    },
    {
      text: "Scene 5- Embracing Change: Determined to change, Rahul started managing his time wisely.",
      image: "05.jpeg",
      audio: "Sugar - Anno Domini Beats.mp3"
    },
    {
      text: "Scene 6- Achieving Success: With better time management, Rahul excelled in his studies.",
      image: "06.jpeg",
      audio: "Sugar - Anno Domini Beats.mp3"
    },
    {
      text: "Scene 7- Inspiring Others: Rahul began teaching others the value of time.",
      image: "07.jpeg",
      audio: "Sugar - Anno Domini Beats.mp3"
    },
    {
      text: "Scene 8- The Moral: Time is precious; value it before it's too late.",
      image: "08.jpeg",
      audio: "Sugar - Anno Domini Beats.mp3"
    }
  ];
  
  let currentIndex = 0;
  const imageEl = document.getElementById("storyImage");
  const textEl = document.getElementById("storyText");
  const narration = document.getElementById("narration");
  const container = document.getElementById("storyContainer");
  
  function loadScene(index) {
    const scene = scenes[index];
    imageEl.src = scene.image;
    textEl.textContent = scene.text;
    narration.src = scene.audio;
  
    // Play audio after source is set
    narration.play().catch(err => {
      console.log("Audio play error:", err);
    });
  
    // Trigger animation
    container.classList.remove("fade-in");
    void container.offsetWidth; // reflow
    container.classList.add("fade-in");
  }
  
  function nextScene() {
    currentIndex = (currentIndex + 1) % scenes.length;
    loadScene(currentIndex);
  }
  
  function prevScene() {
    currentIndex = (currentIndex - 1 + scenes.length) % scenes.length;
    loadScene(currentIndex);
  }
  
  document.getElementById("nextBtn").addEventListener("click", nextScene);
  document.getElementById("prevBtn").addEventListener("click", prevScene);
  
  // Auto change every 5 seconds
  setInterval(nextScene, 5000);
  
  // Load first scene
//   loadScene(currentIndex);
