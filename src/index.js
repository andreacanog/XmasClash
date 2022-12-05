import Board from './board.js'
import Game from './game.js'


window.onload = function () {
    // let canvas = document.getElementById("Xmas-Clash")
    // const board = new Board(canvas)
    const board = new Board()
    board.startGame();
    board.gameOver();
    window.setInterval( function() {
        board.clashBalls();
        board.slideDownBall();
        board.populateBall();
    }, 1000)
}
