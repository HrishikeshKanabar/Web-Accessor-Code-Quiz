function displayHighscores() {
    // either get scores from localstorage or set to empty array
    var highScore = JSON.parse(localStorage.getItem("Scores")) || [];

    // sort highscores by score property in descending order
    highScore.sort(function(a, b) {
      return b.score - a.score;
    });
  
    highScore.forEach(function(score) {
      // create list for each high score
      var listScore= document.createElement("li");
      listScore.textContent = score.initials + " - " + score.score;
 
      // display on page
      var info= document.getElementById("high");
      info.appendChild(listScore);
      
    });
  }

var buttonClear=document.querySelector("#clear")

buttonClear.addEventListener("click",function(){
    localStorage.removeItem("Scores")
    window.location.reload();
})

displayHighscores();