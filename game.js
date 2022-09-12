var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var level = 0;
var started = false;

var userClickedPattern = [];

$( ".btn" ).click(function() {
  userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  playSound(userChosenColour);
  checkAnswer(userClickedPattern.length-1); 
});

function nextSequence(){
  userClickedPattern = [];
  level = level + 1;
  $("#level-title").text("Level " + level);
  var randomNumber =  Math.floor(Math.random() *4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  //animation(randomChosenColour);
  playSound(randomChosenColour);
  
  
}

function checkAnswer(currentlevel) {
  console.log("Game: " + gamePattern);
  console.log("User: " + gamePattern);
  if (gamePattern[currentlevel] === userClickedPattern[currentlevel]) {
    
    
    if (userClickedPattern.length === gamePattern.length ){
      $("#level-title").text("You Win!");
      setTimeout(function (){
        nextSequence();
      }, 1000); 
    }
  } else {
    var loseAudio = new Audio("sounds/wrong.mp3")
    loseAudio.play();
    $("#level-title").text("You Lose! Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function (){
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}
function startOver() {
  started = false;
  level = 0;
  gamePattern = [];
}

function playSound(name){
  var audio = new Audio(`sounds/${name}.mp3`);
  audio.play();
}
function animatePress(currentColour){  
  $("#" + currentColour).addClass("pressed");
  setTimeout(function(){
  $("#" + currentColour).removeClass("pressed");
});
}

$("body").keypress(startGame);

function startGame() {
  if (started == false) {
  $("#level-title").text("Level " + level);
  nextSequence();
  started = true;
}
else {
  console.log(started);
}
}
