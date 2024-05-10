function nextSequence() {
    userClickedPattern = [];
    console.log(userClickedPattern);
    $("h1").text("Level: " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).animate({opacity: 0.1}).animate({opacity: 1});
    playSound(randomChosenColour);
    level++;
}


function playSound(name){
    var sound = new Audio("sounds/" + name + ".mp3")
    sound.play();
}


function gG(currentColour) {
    $("body").addClass("game-over");

    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 200);
}


function animatePress(currentColour) {
    $("div #" + currentColour).addClass("pressed");

    setTimeout(function() {
        $("div #" + currentColour).removeClass("pressed");
    }, 100);
}


function checkAnswer(userClickedPattern) {
    for (item = 0; item < userClickedPattern.length; item++){
        if (gamePattern[item] !== userClickedPattern[item]){
            gG();
            return gameOver();
        } 
    }
    if (gamePattern.length == userClickedPattern.length){
        setTimeout(function() {
            nextSequence();
        }, 1000);
        
    }
}


function gameOver(){
    started = false;
    $("h1").text("Game Over! You got to level:" + (level-1) + " Press a key to restart.");
    level = 0;
    gamePattern = [];
}


var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var level = 0;
var started = false;


$("div .btn").click(function() {
    if (started != false){
        var userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);
        animatePress(userChosenColour);
        playSound(userChosenColour);
        checkAnswer(userClickedPattern);
    }
});


$(document).keydown(function(event){
    if (started === false){
        nextSequence();
        started = true;
    }
});

