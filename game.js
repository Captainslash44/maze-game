//Initialized variables
let is_game_running = false; 
let score = 0;
let remaining_time = 10;
let prize_sound = new Audio("sounds/harp-metal-97812.mp3");
let winning_sound = new Audio("sounds/get-up-pierrot-atm-notification-94647.mp3");
let losing_sound = new Audio("sounds/trumpet-fail-242645.mp3");

//Declared variables
let end;
let start;
let boundaries;
let status_display;
let reset;
let countDown;
let prize1, prize2;


document.addEventListener("DOMContentLoaded", loadPage);


function displayScore(message){
    if(message == "You Won!"){
        status_display.innerHTML = message + "<br/>" + "Your Score is: " + score;
    }
    else if(message == "Game Over!"){
        status_display.innerHTML = message + "<br/>" + "Your Score is: " + score;
} else{
    startTimer();
}
}

function gameOver(){
    if(is_game_running){
        for(let i = 0; i < boundaries.length; i++)
            boundaries[i].style.backgroundColor = "rgb(243, 159, 159)"; 
        if(score > 0)
            score = score - 1;
        displayScore("Game Over!");
        losing_sound.play();
        clearInterval(countDown);
        is_game_running = false;
    }
}

function startGame(){
    displayScore("Game has started: ");
    is_game_running = true;
    
    for(let i = 0; i < boundaries.length; i++)
        boundaries[i].style.backgroundColor = "#eeeeee"; 
}

function endGame(){
    if(is_game_running){
        for(let i = 0; i < boundaries.length; i++)
            boundaries[i].style.backgroundColor = "rgb(113 225 141)"; 
        score = score + 5;
        displayScore("You Won!");
        winning_sound.play();
        clearInterval(countDown);
        is_game_running = false;
    }
}

function startTimer(){
    
    countDown = setInterval(function(){
        status_display.innerHTML = `Game has started; 00:${remaining_time}`;
        remaining_time --;
        if(remaining_time == 0){
            gameOver();
            clearInterval(countDown);
        }
    },1000);
}

function resetGame(){
    location.reload();
}



function loadPage(){
    end = document.getElementById("end");
    start = document.getElementById("start");
    boundaries = document.getElementsByClassName("boundary");
    status_display =  document.getElementById("status");
    reset = document.getElementById("reset-button");
    prize1 = document.getElementById("star");
    prize2 = document.getElementById("wheel");


    end.addEventListener("mouseover", endGame);
    start.addEventListener("click", startGame);
    for(let i = 0; i < boundaries.length; i++){
        boundaries[i].addEventListener("mouseover", gameOver);
    }
    reset.addEventListener("click", resetGame);
}


