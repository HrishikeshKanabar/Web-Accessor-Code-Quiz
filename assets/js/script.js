var highScore = 75;
var score=0;
var timecountdown = 75;
var index = 0;
var timeInterval;
//Time
var timeEl = document.querySelector("#cnt"); 
//show the final score
var scoreFinal = document.getElementById("final-score"); 
//button to start quiz
var startButton = document.querySelector("#start-quiz-button"); 
var buttonHigScoreView = document.querySelector("#high-score-link");
//show question on the page
var seeQuestion = document.createElement("h3"); 
var questionAnswer = document.querySelector("#show-questions");
var listAnswer = document.createElement("ol"); //order list
var list1 = document.createElement("li"); //list
var list2 = document.createElement("li");
var list3 = document.createElement("li");
var list4 = document.createElement("li");
//button for answer
var ans1 = document.createElement("button");
var ans2 = document.createElement("button");
var ans3 = document.createElement("button");
var ans4 = document.createElement("button");
var input = document.createElement("input");

var formLabel = document.createElement("label");
var submit = document.querySelector("#submit-button");
var scoreForm = document.querySelector("#score-form");
//message to store 

var userinitialImput = document.querySelector("#user-initial");
var score = document.querySelector("#user-score");
var form = document.querySelector("#user-info");
var buttonClearStorage = document.querySelector("#clear");

//array object with question,answer and the correct answer

var arrayquestion = [
{question: "1. How do you write 'Hello World' in an alert box?",
    choices: ["1. msg('Hello World')", "2. msgBox('Hello World');", "3. alertBox('Hello World');", "4. alert('Hello World');"],
    correctAnswer: "3. alertBox('Hello World');"
}, {
    question: "2. How to empty an array in JavaScript?",
    choices: ["1. arrayList[]", "2. arrayList(0)", "3. arrayList.length=0", "4. arrayList.len(0)"],
    correctAnswer: "3. arrayList.length=0"
}, {
    question: "3. What function to add an element at the begining of an array and one at the end?",
    choices: ["1. push,unshift", "2. unshift,push", "3. first,push", "4. unshift,last"],
    correctAnswer: "2. unshift,push"
}, {
    question: "4. What will this output? var a = [1, 2, 3]; console.log(a[6]);",
    choices: ["1. undefined", "2. 0", "3. prints nothing", "4. Syntax error"],
    correctAnswer: "1. undefined"
}, {
    question: "5. What would following code return? console.log(typeof typeof 1);",
    choices: ["1. string", "2. number", "3. Syntax error", "4. undefined"],
    correctAnswer: "1. string"
}
];

/*
#############################################################
Name :showQuestions()
Description:
-Function to show the questions
#############################################################
*/

function showQuestions() {
  if (index === 0) {
    var removeQuiz = document.getElementById("start");
    // 1.) Remove the selected element from document
    // 2.) Removing the starting screen of quiz to show question
    removeQuiz.remove();
    starTimer();
  }

  // Display questions[i] to document element
  seeQuestion.innerHTML = arrayquestion[index].question;

  
  
  if (arrayquestion[index] !== 4) {
    console.log(arrayquestion[index].question);
    // Display answers for the question [i]
    ans1.textContent = arrayquestion[index].choices[0];
    ans2.textContent = arrayquestion[index].choices[1];
    ans3.textContent = arrayquestion[index].choices[2];
    ans4.textContent = arrayquestion[index].choices[3];

    // show the dynamic element on the page
    list1.appendChild(ans1);
    list2.appendChild(ans2);
    list3.appendChild(ans3);
    list4.appendChild(ans4);
    listAnswer.appendChild(list1);
    listAnswer.appendChild(list2);
    listAnswer.appendChild(list3);
    listAnswer.appendChild(list4);
    questionAnswer.appendChild(seeQuestion);
    questionAnswer.appendChild(listAnswer);

    // listener when select a answer
    ans1.addEventListener("click", Result);
    ans2.addEventListener("click", Result);
    ans3.addEventListener("click", Result);
    ans4.addEventListener("click", Result);
  } else {
    ShowScore();
  }
}

/*
#############################################################
  Name : Result
  Description:
  - Function to check result
#############################################################
*/

function Result() {
  //create element for show wrong answwer
  var correct = document.createElement("h6");
  var wrong = document.createElement("h6");
  wrong.textContent = "Wrong";
  correct.textContent = "Correct";
  console.log("Index: "+index);
  if(index>arrayquestion.length-1){
    ShowScore();
  }
 
 
  //style for the elements
  correct.setAttribute(
    "Style",
    "font-size:20px ;margin:15px;color:green; text-decoration: underline"
  );
  wrong.setAttribute(
    "Style",
    "font-size:20px ;margin:15px;color:red; text-decoration: underline"
  );

  //condition to check correct answer
  
  if (this.textContent === arrayquestion[index].correctAnswer) {
    questionAnswer.appendChild(correct);
    setTimeout(function () {
      questionAnswer.innerHTML = "";
      
      if (index === arrayquestion.length) {
        ShowScore();
      } else {
        showQuestions();
      }
      
    }, 1000);
    index++;
   
  } else {
    
    // 1.) Substract 10 seconds when user selects wrong answer
    // 2.) Only substract if total time is greated or equal to 10 to avoid negative score
    if (timecountdown >= 10) {
      timecountdown = timecountdown - 10;
    }

    console.log("time: "+timecountdown);
    timeEl.textContent = timecountdown;

    
    highScore = timecountdown;
    console.log(highScore);
    questionAnswer.appendChild(wrong);
    setTimeout(function () {
      questionAnswer.innerHTML = "";

       
      if (index === arrayquestion.length) {
        ShowScore();
      } else {
        showQuestions();
      }
    

      //showQuestions();
    }, 1000);
    index++;
   
  }
} 

/*
#############################################################
 Name: starTimer
 Description:
  -Show the current time
#############################################################
*/

function starTimer() {
  timeInterval = setInterval(function () {
    timecountdown--;

    timeEl.textContent = timecountdown;

    if (timecountdown === 0) {
      ShowScore();
      clearArea();
      //clearInterval(timeInterval);
    }
  }, 1000);
}

/*
#############################################################
 Name: clearArea()
 Description:
  - Function to clear questions and answer
#############################################################
*/

function clearArea() {
  var removeAnswer = document.getElementById("show-questions");
  removeAnswer.style.display = "none";
}

/*
#############################################################
 Name:ShowScore()
 Description:
   - Function show the results to the user and save his initial
#############################################################
*/

function ShowScore() {
  //get the final score for the user
  scoreFinal.textContent = highScore;
  clearInterval(timeInterval);
  //show the form
  form.style.display = "block";
}

//Show the last user register
var listScore = [];
function renderLastRegistered() {
  listScore = JSON.parse(localStorage.getItem("Scores"));
}

//function save localStorage

function saveInformation() {
  var initialUser = document.querySelector("#initialUser").value;
  var scoreUser = highScore;

  //check for no  let empty
  if (initialUser === "") {
    alert("Initial cannot be blank");
  } else {
    listScore = JSON.parse(localStorage.getItem("Scores")) || [];
    var scores = {
      score: scoreUser,
      initials: initialUser,
    };

    listScore.push(scores);
    localStorage.setItem("Scores", JSON.stringify(listScore));
  }
}

// 1.) Add event listener to star quiz button
// 2.) Calls here showQuestions function on click
startButton.addEventListener("click", showQuestions);

buttonHigScoreView.addEventListener("click", renderLastRegistered);

form.style.display = "none";

submit.addEventListener("click", (event) => {
  event.preventDefault();
  saveInformation();
  window.location.href = "viewhightscore.html";
});
