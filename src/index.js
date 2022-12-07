import Board from './board.js'
import Game from './game.js'


window.onload = function () {
    let startGameModal = document.getElementById("startGameModal");

    
    let playButton = document.getElementsByClassName("gamePlay")[0];


    // playButton.onclick = function() {
    //     startGameModal.style.display = "none";
        
    //     const board = new Board()
    //     board.startGame();
    //     window.setInterval( function() {
    //         board.clash();
    //         board.slideDownBall();
    //         board.populateBall();
    //     }, 30)
    // }

    // When the user clicks anywhere outside of the modal, close it
    // window.onclick = function(event) {
    //     if (event.target == startGameModal) {
    //         startGameModal.style.display = "none";
    //     }
    // }
    // let canvas = document.getElementById("Xmas-Clash")
    // const board = new Board(canvas)


    document.addEventListener("click", (event) => {
        if (event.target.classList.contains("gamePlay")){
            startGameModal.style.display = "none";

            const board = new Board()
            board.startGame();
            window.setInterval( function() {
                board.clash();
                board.slideDownBall();
                board.populateBall();
            }, 30)
        }
    });
   
}
