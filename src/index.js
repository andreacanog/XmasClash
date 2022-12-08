import Board from './board.js'
import Game from './game.js'


window.onload = function () {
    let startGameModal = document.getElementById("startGameModal");
    let backgroundMusic = document.getElementById("music-element");
    let musicSwitch = document.getElementById("music-switch")
    // let playButton = document.getElementsByClassName("gamePlay")[0];

    document.addEventListener("click", (event) => {
        if (event.target.classList.contains("gamePlay")){
            startGameModal.style.display = "none";

            //backgroundMusic.load()
            backgroundMusic.play()
          
            // backgroundMusic.pause()

            const board = new Board()
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

    
   
}
