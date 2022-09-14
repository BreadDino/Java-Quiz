// selecors for the different parts of the
var start = document.querySelector("#startQuiz");
var time = document.querySelector("#currentTime");
var quiz = document.querySelector(".quiz");
var questionsEl = document.querySelector(".questionsEl");

// holds what question you are on
questionIndex = 0;

//  holds the starting amount of time
var secondsLeft = 100;
// Holds interval time
var holdInterval = 0;
var ulCreate = document.createElement("ul");

// questions array
var questions = [
  {
    question:
      "A string must be inside ___________ when being assigned to variables.",
    choices: ["quotes", "parentheses", "commas", "curly brackets"],
    answer: "quotes",
  },

  {
    question:
      "A tool to see if your code is running through properly is _____________",
    choices: ["JavaScript", "console.log", "terminal/GitBash", "for loops"],
    answer: "console.log",
  },

  {
    question: "What can be stored in an array?",
    choices: ["booleans", "additional arrays", "strings", "all of the above"],
    answer: "all of the above",
  },

  {
    question: "An if/else statement is put inside of _____________.",
    choices: ["quotes", "parentheses", "curly brackets", "square brackets"],
    answer: "curly brackets",
  },

  {
    question: "An uncommon used data type is ___________",
    choices: ["alerts", "booleans", "strings", "numbers"],
    answer: "alerts",
  },
];

start.addEventListener("click", function () {
    if (holdInterval === 0) {
      holdInterval = setInterval(function () {
        secondsLeft--;
        time.textContent = "Time: " + secondsLeft;
  
        if (secondsLeft <= 0) {
          clearInterval(holdInterval);
          allDone();
          time.textContent = "Out of Time";
        }
      }, 1000);
    }
    render(questionIndex);
  });
  function render(questionIndex){
    // clears question data/elements
    questionsEl.innerHTML = "";
    ulCreate.innerHTML = "";
    for (var i = 0; i < questions.length; i++) {
      var userQuestion = questions[questionIndex].question;
      var userChoices = questions[questionIndex].choices;
      questionsEl.textContent = userQuestion;
    }
    // Creates a list element for each answer option
    userChoices.forEach(function (newItem) {
      var listItem = document.createElement("li");
      listItem.textContent = newItem;
      questionsEl.appendChild(ulCreate);
      ulCreate.appendChild(listItem);
    //   listItem.addEventListener("click", compare);
    });
  }