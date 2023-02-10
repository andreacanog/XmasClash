import Board from './board.js'
// import Game from './game.js'



window.onload = function () {
    let startGameModal = document.getElementById("startGameModal");
    // let backgroundMusic = document.getElementById("music-element");
    // let crush3 = document.getElementById("crush3");
    // let crush4 = document.getElementById("crush4");
    // let crush5 = document.getElementById("crush5");
    // let musicSwitch = document.getElementById("music-switch")

    let gameWonModal = document.getElementById("gameWon");
    let gameOverModal = document.getElementById("gameOver");
    const board = new Board()

    document.addEventListener("click", (event) => {
    
        if (event.target.classList.contains("gamePlay")){
            startGameModal.style.display = "none";

            // backgroundMusic.play()
            // crush3.play();
            // crush4.play();
            // crush5.play();
          
            board.startGame();
            window.setInterval( function() {
                board.clash();
                board.slideDownBall();
                board.populateBall();
            }, 100)
        }
    });

    // const handleMusic = () => {
    //     if (musicSwitch.src === "./images/pause.png")
    // }

    //musicSwitch.addEventListener("click", () => {

        // if (backgroundMusic.paused) {
        //     backgroundMusic.play();
        //     musicSwitch.src = "./images/pause.png"
    
        // } else {
        //     backgroundMusic.pause();
        //     musicSwitch.src = "./images/start.png"
        // }

        // if (crush3.paused && crush4.paused && crush5.paused) {
        //     crush3.play();
        //     crush4.play();
        //     crush5.play();
        //     musicSwitch.src = "./images/pause.png"
    
        // } else {
        //     crush3.pause();
        //     crush4.pause();
        //     crush5.pause();
        //     musicSwitch.src = "./images/start.png"
        // }
      
    //})

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
            board.currentLevel = 1;
            board.goalPoints = 500;

        } else if (event.target.id === "nextLevel"){
            if (gameWonModal.style.display === "block") {
                gameWonModal.style.display = "none";
            } else if (gameOverModal.style.display === "block") {
                gameOverModal.style.display = "none"
            }

            board.score = 0;

            // if (this.currentLevel === 1) {
            //     board.movements = 20;
            // } else if (this.currentLevel === 2) {
            //     board.movements = 23;
            // } else if (this.currentLevel === 3) {
            //     board.movements = 26;
            // }
            board.movements = 20 + (3 + board.currentLevel);
            board.goalPoints += 100;
            board.currentLevel++;
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
