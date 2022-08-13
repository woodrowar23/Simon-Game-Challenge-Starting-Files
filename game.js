var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;

function nextSequence(){
   var randomNumber = Math.floor(Math.random()*4);
   var randomChosenColour = buttonColours[randomNumber];
   gamePattern.push(randomChosenColour);//push random color to gamePattern array
   $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
   playSound(randomChosenColour);//button will flash and play sound for every nextSequence() call
   level++;
   $("#level-title").text("Level "+level);
   userClickedPattern = [];
}

$(".btn").on("click", function(){//detect button click
  var userChosenColour = $(this).attr("id");//store the id of the button clicked with "this"
  //  this.id can also be used
  userClickedPattern.push(userChosenColour);//every button click pushes color to userClickedPattern array
  playSound(userChosenColour);//button will flash and play sound for every button clicked
  animatePress(userChosenColour);//add and remove pressed class on button click
  checkAnswer(userClickedPattern.length-1);//index of last answer in userClickedPattern
});

function playSound(name){//function will take the color and concatenate to id and play sound
  var sound = new Audio("sounds/"+name+".mp3");
  sound.play();
}

function animatePress(currentColour){//add and remove pressed class
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  }, 100);
}

$(document).on("keydown", function(){//detect when a keyboard key has been pressed
  if(started === false){//only call nextSequence() the first time
    // (!started) can also be used which the opposite of true
    $("#level-title").text("Level "+level);
    nextSequence();
    started = true;
  }
})

function checkAnswer(currentLevel){//check if userClickedPattern and gamePattern are the same
  if(userClickedPattern[currentLevel] === gamePattern[gamePattern.length-1]){//should be last gamePattern index
    console.log("success");
    if(userClickedPattern.length === 1){
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart ");
    startOver();
  }
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
