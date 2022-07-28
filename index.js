var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var start = 0;
var level = 0;

function nextSequence(){
    $("h1").text("Level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);
    console.log("game :"+gamePattern);

    $("#"+randomChosenColour).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200);

    playSound(randomChosenColour);
}

$(document).keypress(function () {
    if (start===0){
        nextSequence();
        start = 1;
        level = 0 ;
    }
})

$(".btn").click(handleClick);

function handleClick(event){
    userChosenColor = event.target.id;
    playSound(userChosenColor);
    animatePress(userChosenColor);
    userClickedPattern.push(userChosenColor);
    console.log("user :"+userClickedPattern);
    checkAnswer(userClickedPattern.length-1);
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function() {$("#"+currentColour).removeClass("pressed");}, 100)
}

function gameOver(){
    $("h1").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    start = 0;
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    setTimeout(function() {$("body").removeClass("game-over");}, 200)

}

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("success");
    }
    else {
        console.log("fail");
        playSound("wrong");
        gameOver();
    }
    if (gamePattern[currentLevel]===userClickedPattern[currentLevel] && gamePattern.length===userClickedPattern.length && gamePattern.length!==0){
        console.log("level success");
        level++;
        setTimeout(nextSequence,1000);
        userClickedPattern = [];
    }
}