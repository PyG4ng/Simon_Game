var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;


$(document).on("keypress", () => {
    if (level === 0) {
        nextSequence();
    }
})

$(document).on("click", () => {
    if (level === 0) {
        nextSequence();
    }
})


function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];

    setTimeout(function () {
        $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
        playSound(randomChosenColour);
    }, 1000);

    gamePattern.push(randomChosenColour);

    // CheatCode 8-)
    // console.log(gamePattern);

    level++;

    $("h1").text("Level " + level);


    // Reset user's clicked patern to allow starting a new one
    userClickedPattern = [];
}


$(".btn").on("click", function () {
    var userChosenColour = this.id;
    animatePress(userChosenColour)
    playSound(userChosenColour)

    userClickedPattern.push(userChosenColour)
    
    checkAnswer(userClickedPattern.length - 1)

    // Pour utiliser this dans setTimeout ou dans setInterval il faut utiliser bind(this) ou associer this a une variable avant le setTimeout, genre: var that = this, et ensuite ecrire $that dans le setTimeout
    // $(this).addClass("pressed");
    // setTimeout(function () {
    //     $(this).removeClass("pressed");
    // }.bind(this), 100)

})



function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");

    setTimeout(function () {
        document.querySelector("#" + currentColour).classList.remove("pressed");
    }, 100)
}


function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        // count++;
        console.log("success");

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(nextSequence, 1000);
        }
    
    } else {
        gameover();
        startOver();

        console.log("wrong");
        // console.log("count " + count)
        // console.log("userPatern " + userClickedPattern)
        // console.log("gamePatern " + gamePattern)
        // console.log("last clicked color " + this.id)
    }
}


function gameover() {
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();

    $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over, Press Any Key to Restart");

    
}


function startOver(){
    level = 0;
    gamePattern = [];
}
