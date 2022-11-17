//TODO: update questions AND true/false indicator for answers
var question1 = {
  question: `1 + 1 = ____`,
  answer: [
    { text: "1", correct: false },
    { text: "2", correct: true },
    { text: "3", correct: false },
    { text: "4", correct: false },
  ],
};

var question2 = {
  question: "3 + 4 = ____",
  answer: [
    { text: "5", correct: false },
    { text: "6", correct: false },
    { text: "7", correct: true },
    { text: "8", correct: false },
  ],
};

var question3 = {
  question: "9 + 3 = ____",
  answer: [
    { text: "9", correct: false },
    { text: "10", correct: false },
    { text: "11", correct: false },
    { text: "12", correct: true },
  ],
};

var question4 = {
  question: "x + y = ____",
  answer: [
    { text: "a", correct: false },
    { text: "b", correct: false },
    { text: "c", correct: false },
    { text: "xy", correct: true },
  ],
};

var question5 = {
  question: "a + b = ____",
  answer: [
    { text: "c", correct: true },
    { text: "d", correct: false },
    { text: "e", correct: false },
    { text: "f", correct: false },
  ],
};

//declare and set initial variables
var questions = [question1, question2, question3, question4, question5];
var startEl = document.getElementById("start-btn");
var questEl = document.getElementById("question-content");
var timerEl = document.getElementById("countdown");
var timeLeft = 10;
var textHide = document.getElementById("hide");
var questionEl = document.getElementById("q-here");
var answerEl1 = document.getElementById("1");
var answerEl2 = document.getElementById("2");
var answerEl3 = document.getElementById("3");
var answerEl4 = document.getElementById("4");
var correctCount = 0;
var feedbackEl = document.getElementById("feedback");
var btnForEventL = document.querySelectorAll("button.btn");
var finalScore

//hide first q&a and timer until "start quiz"
questEl.style.visibility = "hidden";
textHide.style.visibility = "hidden";
//show q&a and start time once quiz started
var startQuizHandler = function () {
  startEl.style.visibility = "hidden";
  questEl.style.visibility = "visible";
  textHide.style.visibility = "visible";
  //prints countdown to screen
  var clockCountdown = document.createElement("h3");
  var timeInterval = setInterval(function () {
    if (timeLeft > 0) {
      clockCountdown.textContent = timeLeft;
      timerEl.appendChild(clockCountdown);
      timeLeft--;
    } else {
      clearInterval(timeInterval);
      clockCountdown.textContent = "TIME IS UP";
      timerEl.appendChild(clockCountdown);
    }
  }, 1000);
};

var questionNum = 0;
questionEl.textContent = JSON.stringify(questions[questionNum].question);
answerEl1.textContent = questions[questionNum].answer[0].text;
answerEl2.textContent = questions[questionNum].answer[1].text;
answerEl3.textContent = questions[questionNum].answer[2].text;
answerEl4.textContent = questions[questionNum].answer[3].text;

//checks if right/wrong, tells user if correct, tracks # answered correctly
var clickHandler = function () {
  btnForEventL.forEach((button) => {
    button.removeEventListener("click", clickHandler);
  });
  if (questions[questionNum].answer[this.id - 1].correct === true) {
    correctCount++;
   finalScore = Math.round((correctCount / (questionNum + 1)) * 100)
    feedbackEl.textContent =
      "CORRECT! So far your Score is " +
      finalScore + "%";
  } else {
    finalScore = Math.round((correctCount / (questionNum + 1)) * 100)
    feedbackEl.textContent =
      "Incorrect. Your Score is " +
      finalScore +
      "%";
    timeLeft = timeLeft - 5;
  }
  //delay prompt to next question
  setTimeout(() => {
    questionNum++;
    if (timeLeft > 0) {
      btnForEventL.forEach((button) => {
        button.addEventListener("click", clickHandler);
      });
      feedbackEl.textContent = "";
      questionEl.textContent = JSON.stringify(questions[questionNum].question);
      answerEl1.textContent = questions[questionNum].answer[0].text;
      answerEl2.textContent = questions[questionNum].answer[1].text;
      answerEl3.textContent = questions[questionNum].answer[2].text;
      answerEl4.textContent = questions[questionNum].answer[3].text;
    } else {
      feedbackEl.textContent =
        "Game Over! Your Final Score is " +
        finalScore +
        "%";
    }
  }, 2000);
};

//TODO:  GAME OVER when timer up or Q's answ
//TODO:  checks for time=0 || all questions answered

//TODO:  prompt for initials

//TODO:  save high score locally and display on screen

startEl.addEventListener("click", startQuizHandler);
btnForEventL.forEach((button) => {
  button.addEventListener("click", clickHandler);
});
