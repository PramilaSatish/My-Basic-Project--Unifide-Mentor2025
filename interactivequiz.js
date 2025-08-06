const container = document.querySelector('.container');
 const questionBox = document.querySelector('.question');
 const choicesBox = document.querySelector('.choices');
 const nextBtn = document.querySelector('.nextBtn');
 const scoreCard = document.querySelector('.scoreCard');
 const alert = document.querySelector('.alert');
 const startBtn = document.querySelector('.startBtn');
 const timer = document.querySelector('.timer');
 
 
 // Make an array of objects that stores question, choices of question and answer
 const quiz = [
     {
         question: "Q.Which HTML Tag will use to scroll a text in web page?",
         choices: ["marquee", "scroll", "mar", "mar= scroll"],
         answer: "marquee"
     },
     {
         question: "Q.Which of the following is NOT a benefit of using CSS?",
         choices: [" Increased server-side processing", " Better accessibility for users with disabilities", "Improved website performance", "Separation of content and presentation"],
         answer: " Increased server-side processing"
     },
     {
         question: "Q. Which of the following is not a JavaScript data type?",
         choices: ["string", "boolean", "object", "float"],
         answer: "float"
     },
     {
         question: "Q. What is the primary purpose of CSS?",
         choices: ["To define the structure of web documents", "To add interactivity to web pages", "To enhance the accessibility of web content", " To style the presentation of web documents"],
         answer: "To style the presentation of web documents"
     },
     {
        question: "Q. What is the difference between 'var', 'let', and 'const' keywords?",
        choices: ["'var' is scoped globally, 'let' is scoped to the block, and 'const' is immutable.", "They all have the same scope and behavior.", "'var' is case-sensitive, 'let' and 'const' are not.", " Only 'var' can be used to declare variables."],
        answer: "'var' is scoped globally, 'let' is scoped to the block, and 'const' is immutable."
    },
    {
        question: "Q. What is the purpose of the 'this' keyword in JavaScript?",
        choices: ["To access global variables.", "To reference the current object within a method.", " To create new objects.", "To loop through arrays."],
        answer: "To create new objects."  
    },
    {
        question: "Q.  What is a closure in JavaScript?",
        choices: [" A function that can access variables from its outer scope.", " A special type of object.", "A way to loop through arrays.", "A predefined function."],
        answer: "A function that can access variables from its outer scope."
    }

 ];
 
 // Making Variables
 let currentQuestionIndex = 0;
 let score = 0;
 let quizOver = false;
 let timeLeft = 15;
 let timerID = null;
 
 // Arrow Function to Show Questions
 const showQuestions = () => {
     const questionDetails = quiz[currentQuestionIndex];
     questionBox.textContent = questionDetails.question;
 
     choicesBox.textContent = "";
     for (let i = 0; i < questionDetails.choices.length; i++) {
         const currentChoice = questionDetails.choices[i];
         const choiceDiv = document.createElement('div');
         choiceDiv.textContent = currentChoice;
         choiceDiv.classList.add('choice');
         choicesBox.appendChild(choiceDiv);
 
         choiceDiv.addEventListener('click', () => {
             if (choiceDiv.classList.contains('selected')) {
                 choiceDiv.classList.remove('selected');
             }
             else {
                 choiceDiv.classList.add('selected');
             }
         });
     }
 
     if(currentQuestionIndex < quiz.length){
         startTimer();
     }
 }
 
 // Function to check answers
 const checkAnswer = () => {
     const selectedChoice = document.querySelector('.choice.selected');
     if (selectedChoice.textContent === quiz[currentQuestionIndex].answer) {
         // alert("Correct Answer!");
         displayAlert("Correct Answer!");
         score++;
     }
     else {
         // alert("Wrong answer");
         displayAlert(`Wrong Answer! ${quiz[currentQuestionIndex].answer} is the Correct Answer`);
     }
     timeLeft = 15;
     currentQuestionIndex++;
     if (currentQuestionIndex < quiz.length) {
         showQuestions();
     }
     else {
         stopTimer();
         showScore();
     }
 }
 
 // Function to show score
 const showScore = () => {
     questionBox.textContent = "";
     choicesBox.textContent = "";
     scoreCard.textContent = `You Scored ${score} out of ${quiz.length}!`;
     displayAlert("You have completed this quiz!");
     nextBtn.textContent = "Play Again";
     quizOver = true;
     timer.style.display = "none";
 }
 
 // Function to Show Alert
 const displayAlert = (msg) => {
     alert.style.display = "block";
     alert.textContent = msg;
     setTimeout(()=>{
         alert.style.display = "none";
     }, 2000);
 }
 
 // Function to Start Timer
 const startTimer = () => {
     clearInterval(timerID); // Check for any exist timers
     timer.textContent = timeLeft;
 
     const countDown = ()=>{
         timeLeft--;
         timer.textContent = timeLeft;
         if(timeLeft === 0){
             const confirmUser = confirm("Time Up!!! Do you want to play the quiz again");
             if(confirmUser){
                 timeLeft = 15;
                 startQuiz();
             }
             else{
                 startBtn.style.display = "block";
                 container.style.display = "none";
                 return;
             }
         }
     }
     timerID = setInterval(countDown, 1000);
 }
 
 // Function to Stop Timer
 const stopTimer = () =>{
     clearInterval(timerID);
 }
 
 // Function to shuffle question
 const shuffleQuestions = () =>{
     for(let i=quiz.length-1; i>0; i--){
         const j = Math.floor(Math.random() * (i+1));
         [quiz[i], quiz[j]] = [quiz[j], quiz[i]];
     }
     currentQuestionIndex = 0;
     showQuestions();
 }
 
 // Function to Start Quiz
 const startQuiz = () =>{
     timeLeft = 15;
     timer.style.display = "flex";
     shuffleQuestions();
 }
 
 // Adding Event Listener to Start Button
 startBtn.addEventListener('click', ()=>{
     startBtn.style.display = "none";
     container.style.display = "block";
     startQuiz();
 });
 
 nextBtn.addEventListener('click', () => {
     const selectedChoice = document.querySelector('.choice.selected');
     if (!selectedChoice && nextBtn.textContent === "Next") {
         // alert("Select your answer");
         displayAlert("Select your answer");
         return;
     }
     if (quizOver) {
         nextBtn.textContent = "Next";
         scoreCard.textContent = "";
         currentQuestionIndex = 0;
         quizOver = false;
         score = 0;
         startQuiz();
     }
     else {
         checkAnswer();
     }
 });
 