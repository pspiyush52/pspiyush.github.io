let buttonColors = ["green", "red", "yellow", "blue"];
let gameSequence = [];
let userSequence = [];

let level = 0;
let gameOn = false;

const nextSequence = () => {
    userSequence = [];

    randomNumber = Math.floor(4 * Math.random());
    randomColor = buttonColors[randomNumber];
    gameSequence.push(randomColor);
    
    playSound(randomColor);
    $(`#${randomColor}`).fadeOut(100).fadeIn(100);
    
    level++;
    $("#level-title").text(`Level ${level}`);
}

$(document).on("keydown", () => {
    // Detecting whether it is the first key press
    if (!gameOn) {
        $("#level-title").text(`Level ${level}`);
        gameOn = true;
        nextSequence();
    }
})

// Detecting user clicks
$(".btn").on("click", (e) => {
    color = e.target.id;
    userSequence.push(color);
    playSound(color);
    pressedAnimation(color);

    if (userSequence.length === gameSequence.length) {
        checkAnswer();
    }
})

const playSound = (color) => {
    audio = new Audio(`sounds/${color}.mp3`)
    audio.play();
}

const pressedAnimation = (color) => {
    $(`#${color}`).addClass("pressed");
    setTimeout(() => {
        $(`#${color}`).removeClass("pressed");
    }, 100);
}

const checkAnswer = () => {
    let isCorrect = true;

    for(let i = 0; i < gameSequence.length; i++) {
        if (gameSequence[i] != userSequence[i]) {
            isCorrect = false;
        }
    }
    if (isCorrect) {
        console.log("correct");
        // Calling nextSequence automatically only if the input was correct
        setTimeout(nextSequence, 1000);
    } else {
        console.log("incorrect");
        $("body").addClass("game-over");
        setTimeout(() => { $("body").removeClass("game-over"); }, 200);
        $("#level-title").text("Game Over, Press any key to go again...");
        startOver();
    }
}

const startOver = () => {
    gameSequence = [];
    level = 0;
    gameOn = false;
}