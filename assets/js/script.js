// Selecors for the different parts of the
var start = document.querySelector("#startQuiz");
var time = document.querySelector("#currentTime");
var quiz = document.querySelector(".quiz");
var questionsEl = document.querySelector(".questionsEl");

// Holds what question you are on
var questionIndex = 0;

// Holds the starting amount of time
// Holds interval time
var secondsLeft = 100;
var holdInterval = 0;
var penalty = 10;

var score = 0;
var ulCreate = document.createElement("ul");
// Questions array
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
          end();
          time.textContent = "Out of Time";
        }
      }, 1000);
    }
    render(questionIndex);
  });
  function render(questionIndex){
    // Clears question data/elements
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
      listItem.addEventListener("click", compare);
    });
  }
// Listens for selection and checks if answer is correct
  function compare(event) {
    var element = event.target;
  
    if (element.matches("li")) {
      var createDiv = document.createElement("div");
      createDiv.setAttribute("id", "createDiv");
      if (element.textContent == questions[questionIndex].answer) {
        score++;
        createDiv.textContent =
          "Awesome! Your answer:  " +
          questions[questionIndex].answer +
          " was correct!";
      } else {
        // Takes 5 seconds off if answered question wrong
        secondsLeft = secondsLeft - penalty;
        createDiv.textContent =
          "Wrong The correct answer was :  " + questions[questionIndex].answer;
      }
    }
    questionIndex++;

    if (questionIndex >= questions.length) {
      // All done will append last page with user stats
      end();
      createDiv.textContent =
        "All done. " +
        "You got  " +
        score +
        " out of " +
        questions.length +
        " Correct!";
    } else {
      render(questionIndex);
    }
    questionsEl.appendChild(createDiv);
  }

  function end() {
    questionsEl.innerHTML = "";
    currentTime.innerHTML = "";
  
    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "Game Over!";
  
    questionsEl.appendChild(createH1);
  
    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");
  
    questionsEl.appendChild(createP);
  
    // displays remaining time and score
    if (secondsLeft >= 0) {
      var timeRemaining = secondsLeft;
      var createP2 = document.createElement("p");
      clearInterval(holdInterval);
      createP.textContent = "Your final score is: " + timeRemaining;
    }
  
    // initials prompt
    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";
  
    questionsEl.appendChild(createLabel);
  
    // add initials text box
    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";
  
    questionsEl.appendChild(createInput);
  
    // submit name and score
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";
  
    questionsEl.appendChild(createSubmit);
  
    // captures score and name into local storage
    createSubmit.addEventListener("click", function () {
      var initials = createInput.value;
  
      // if user fails to enter initials
      if (initials === null) {
        console.log(
          "You must enter your initials to be posted on the High-Scores!"
        );
      } else {
        var finalScore = {
          initials: initials,
          score: timeRemaining,
        };
        console.log(finalScore);
        var allScores = localStorage.getItem("allScores");
        if (allScores === null) {
          allScores = [];
        } else {
          allScores = JSON.parse(allScores);
        }
        allScores.push(finalScore);
        var newScore = JSON.stringify(allScores);
        localStorage.setItem("allScores", newScore);
      }
    });
  }

var highscores = document.querySelector("#highScores");
var allScores = localStorage.getItem("allScores");
allScores = JSON.parse(allScores);
 var highscoresload = document.querySelector("#hsload")
 highscoresload.addEventListener("click", Loadhs)
  function Loadhs(){
    if (allScores !== null) {
    allScores.sort((a, b) => {
      return b.score - a.score;
    });
    for (var i = 0; i < allScores.length; i++) {
      var createLi = document.createElement("li");
      createLi.textContent = allScores[i].initials + " " + allScores[i].score;
      highscores.appendChild(createLi);
    }
  }
}