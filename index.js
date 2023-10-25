var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;


$(document).on("keydown", function () {

    if(started != true){
        nextSequence();
        
    }
    started = true;

})



function nextSequence() {

    userClickedPattern = [];
    level++;
    $("h1").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
    animatePress(randomChosenColour);

}

$(".btn").on("click", function () {

    var userChosenColour;
    
    if($(this).attr("id") == "red"){
        userChosenColour = "red";
    }else if($(this).attr("id") == "yellow"){
        userChosenColour = "yellow";
    }else if($(this).attr("id") == "blue"){
        userChosenColour = "blue";
    }else if($(this).attr("id") == "green"){
        userChosenColour = "green";
    }

    playSound(userChosenColour);
    animatePress(userChosenColour);

    userClickedPattern.push(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);

})

function playSound(name) {

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}

function animatePress(currentColour) {

    var self = $("." + currentColour);
    self.addClass("pressed");

    setTimeout( function() {
        self.removeClass("pressed");
    }, 100)

}

function checkAnswer(currentLevel) {

    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                nextSequence();
            },1000)
        }

    }else {
        
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();

        $("body").addClass("game-over");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200)

        $("h1").text("Game Over, Press Any Key to Restart");

        startOver();

    }

}

function startOver() {
    started = false;
    level = 0;
    gamePattern = [];
}