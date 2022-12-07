import Board from './board.js'
import Game from './game.js'


window.onload = function () {
    let startGameModal = document.getElementById("startGameModal");

    // Get the <span> element that closes the modal
    let playButton = document.getElementsByClassName("gamePlay")[0];

    // When the user clicks on the button, open the modal
    // btn.onclick = function() {
    //     startGameModal.style.display = "block";
    // }

    // When the user clicks on <span> (x), close the modal
    playButton.onclick = function() {
        startGameModal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    // window.onclick = function(event) {
    //     if (event.target == startGameModal) {
    //         startGameModal.style.display = "none";
    //     }
    // }
    // let canvas = document.getElementById("Xmas-Clash")
    // const board = new Board(canvas)
    const board = new Board()
    board.startGame();
    window.setInterval( function() {
        board.clash();
        board.slideDownBall();
        board.populateBall();
    }, 30)
}
