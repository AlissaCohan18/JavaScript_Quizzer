var question1 = {
  question: `Javascript is an ____ language`,
  answer: [
    { text: "Object-Oriented", correct: true },
    { text: "Object-Based", correct: false },
    { text: "Procedural", correct: false },
    { text: "None of the Above", correct: false },
  ],
};

var question2 = {
  question: "Which of the following methods is used to access HTML elements using Javascript?",
  answer: [
    { text: "getElementbyId()", correct: false },
    { text: "getElementByClassName()", correct: false },
    { text: "Both A and B", correct: true },
    { text: "None of the above", correct: false },
  ],
};

var question3 = {
  question: "Which of the following methods can be used to display data in some form using Javascript?",
  answer: [
    { text: "document.write()", correct: false },
    { text: "console.log()", correct: false },
    { text: "window.alert()", correct: false },
    { text: "All of the above", correct: true },
  ],
};

var question4 = {
  question: "What does the Javascript “debugger” statement do?",
  answer: [
    { text: "It will debug all the errors in the program at runtime", correct: false },
    { text: "It acts as a breakpoint in a program", correct: true },
    { text: "it will debug in the current statement if any", correct: false },
    { text: "all of the above", correct: false },
  ],
};

var question5 = {
  question: "Which function is used to serialize an object into a JSON string in Javascript?",
  answer: [
    { text: "stringify()", correct: true },
    { text: "parse()", correct: false },
    { text: "convert()", correct: false },
    { text: "None of the above", correct: false },
  ],
};

var question6 = {
  question: "How to stop an interval timer in Javascript?",
  answer: [
    { text: "clearInterval", correct: true },
    { text: "clearTimer", correct: false },
    { text: "intervalOver", correct: false },
    { text: "None of the above", correct: false },
  ],
};

//declare and set initial variables
var questions = [question1, question2, question3, question4, question5, question6];
var startEl = document.getElementById("start-btn");
var questEl = document.getElementById("question-content");
var timerEl = document.getElementById("countdown");
var textHide = document.getElementById("hide");
var questionEl = document.getElementById("q-here");
var answerEl1 = document.getElementById("1");
var answerEl2 = document.getElementById("2");
var answerEl3 = document.getElementById("3");
var answerEl4 = document.getElementById("4");
var feedbackEl = document.getElementById("feedback");
var btnForEventL = document.querySelectorAll("button.btn");
var finalScore;
var formInput = document.getElementById("form");
var timeLeft = 60;
var correctCount = 0;
var highScores = [];
var highScoresObj;
var scoreBoardEl = document.getElementById("score-board");
var restartEl = document.getElementById("restart");

//hide first q&a and timer until "start quiz"
questEl.style.visibility = "hidden";
textHide.style.visibility = "hidden";
formInput.style.visibility = "hidden";
scoreBoardEl.style.visibility = "hidden";
restartEl.style.visibility = "hidden";
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
    finalScore = Math.round((correctCount / (questionNum + 1)) * 100);
    feedbackEl.textContent =
      "CORRECT! So far your Score is " + finalScore + "%";
  } else {
    finalScore = Math.round((correctCount / (questionNum + 1)) * 100);
    feedbackEl.textContent = "Incorrect. Your Score is " + finalScore + "%";
    timeLeft = timeLeft - 8;
  }
  //delay prompt to next question
  setTimeout(() => {
    questionNum++;
    if (timeLeft > 0 && questions.length > questionNum) {
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
        "Game Over! Your Final Score is " + finalScore + "%";
      textHide.style.visibility = "hidden";
      
      formInput.style.visibility = "visible";
      formInput.addEventListener("submit", function (event) {
        event.preventDefault();

        highScoresObj = { name: initials.value, score: finalScore };
        var highScores = JSON.parse(
          localStorage.getItem("high-scores") || "[]"
        );
        highScores.push(highScoresObj);
        highScores.sort((a, b) => b.score - a.score);
        localStorage.setItem("high-scores", JSON.stringify(highScores));

        //display leader board
       
        formInput.style.visibility = "hidden";
        scoreBoardEl.style.visibility = "visible";
        restartEl.style.visibility = "visible";
        highScores.forEach((e) => {
          var leaderBoard = document.createElement("p");
          leaderBoard.innerText = `${e.name} - ${e.score}%`;
          document.getElementById("scores").appendChild(leaderBoard);
        });
      });
    }
  }, 2000);
};

function reset() {
  window.location.reload();
}

startEl.addEventListener("click", startQuizHandler);
btnForEventL.forEach((button) => {
  button.addEventListener("click", clickHandler);
});
restartEl.addEventListener("click",reset);
