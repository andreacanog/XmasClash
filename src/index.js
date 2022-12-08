import Board from './board.js'
// import Game from './game.js'


window.onload = function () {
    let startGameModal = document.getElementById("startGameModal");
    let backgroundMusic = document.getElementById("music-element");
    let musicSwitch = document.getElementById("music-switch")

    let gameWonModal = document.getElementById("gameWon");
    let gameOverModal = document.getElementById("gameOver");
    const board = new Board()
    document.addEventListener("click", (event) => {
    
        if (event.target.classList.contains("gamePlay")){
            startGameModal.style.display = "none";

            backgroundMusic.play()
          
            board.startGame();
            window.setInterval( function() {
                board.clash();
                board.slideDownBall();
                board.populateBall();
            }, 30)
        }
    });

    musicSwitch.addEventListener("click", () => {

        if (backgroundMusic.paused) {
            backgroundMusic.play();
            musicSwitch.src = "./images/pause.png"
    
        } else {
            backgroundMusic.pause();
            musicSwitch.src = "./images/start.png"
        }
    })

    let intructionsButton = document.getElementById("gameInstructions");
    let instructionsContainer = document.getElementById("instructions-div");


    intructionsButton.addEventListener('mouseover', function handleMouseOver() {
        instructionsContainer.style.display = 'block';
      });
    //instructionsContainer.style.display = "block";
      
    intructionsButton.addEventListener('mouseout', function handleMouseOut() {
        instructionsContainer.style.display = 'none';
    });

    document.addEventListener("click", (event) => {
        if (event.target.classList.contains("restart")){
            if (gameWonModal.style.display === "block") {
                gameWonModal.style.display = "none";
            } else if (gameOverModal.style.display === "block") {
                gameOverModal.style.display = "none"
            }
    
            board.score = 0;
            board.movements = 20;
        }
    });


    document.addEventListener("click", (event) => {
        if (event.target.classList.contains("restart2")){
            if (gameWonModal.style.display === "block") {
                gameWonModal.style.display = "none";
            } else if (gameOverModal.style.display === "block") {
                gameOverModal.style.display = "none"
            }
    
            board.score = 0;
            board.movements = 20;
        }
    });
}
