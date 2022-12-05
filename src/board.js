const balls = ["Blue", "Green", "Purple", "Red", "Yellow"];
const background  = new Image()
background.src = './images/christmas-background.jpg'
const ballsSource = './images/'
let currentBall;
let otherBall;

import Game from './game.js'

export default class Board {

    constructor (){
        this.grid = [];
        this.rows = 9
        this.columns = 9; 
        this.score = 0; 
        this.movements = 20;
    }

    startGame() {
        for (let r = 0; r < this.rows; r++) { 
            let row = []
            for (let c = 0; c < this.columns; c++) {
                let img = document.createElement("img");

                img.id = r.toString() + "-" + c.toString(); // => img id = "0-0" "0-1" "0-2" (position)
                img.src = ballsSource + this.randomBall() + ".jpg" // =>  "images/Blue.png"
                // console.log("img: ", img);
                // this.dragBall(img)
                this.makeBallDragable(img)
                document.getElementById("board").append(img);

                row.push(img);
            }
            // console.log("document: ", document)
            this.grid.push(row); //2D array  [[img, img, img, img, img, img, img, img]]
        }

        // console.log("grid: ", this.grid);
    }

    randomBall() {
        return balls[Math.floor(Math.random() * balls.length)];
    }


    makeBallDragable(img) {

        img.addEventListener("dragstart", this.dragStart); //click on the ball => starts the drag proces
        img.addEventListener("dragover", this.dragOver); //move of the mouse with the ball 
        img.addEventListener("dragenter", this.dragEnter); //dragginf the ball to another ball 
        img.addEventListener("dragleave", this.dragLeave);//leave the ball 
        img.addEventListener("drop", this.dragDrop);
        img.addEventListener("dragend", this.dragEnd.bind(this));
    }

    dragStart() {
        currentBall = this;
        // console.log("hit the dragStart");
        // console.log("img: ", img);
    }

    dragOver(e) {
        e.preventDefault()
    }

    dragEnter(e) {
        e.preventDefault()
    }

    dragLeave(e) {
        e.preventDefault()
    }


    dragDrop() {
        otherBall = this; 
        // console.log("hit the dragEnd");
        // console.log("img: ", img);
    }

    dragEnd() {
        if (currentBall.src.includes("blank") || otherBall.src.includes("blank")) { // check that a ball does not swap with a blank img
            return; 
        }


        let currentCoords = currentBall.id.split("-") // "0-0" => ['0','0']
        let row1 = parseInt(currentCoords[0]);  // '0' => 0
        let column1 = parseInt(currentCoords[1]);


        let otherCoords = otherBall.id.split("-") // "0-0" => [0,0]
        let row2 = parseInt(otherCoords[0]); // '0' => 0
        let column2 = parseInt(otherCoords[1]);

        let movLeft = column2 === (column1 - 1) && row1 === row2
        let movRight = column2 === (column1 + 1) && row1 === row2
        let movUp = row2 === (row1 - 1) && column2 === column1
        let movDown = row2 === (row1 + 1) && column2 === column1

        let allowMov = movLeft || movUp || movDown || movRight

        if (allowMov) {

            let currentImg = currentBall.src; 
            let otherImg = otherBall.src;
        
            //swap images
            currentBall.src = otherImg;
            otherBall.src = currentImg;

            let valid = this.validMove()

            if (!valid) {
                let currentImg = currentBall.src; 
                let otherImg = otherBall.src;
            
                //swap images
                currentBall.src = otherImg;
                otherBall.src = currentImg;
            }
        } 
    }

    clashBalls() {
        this.clashThree()
        this.clashFour()
        this.clashFive()
        document.getElementById("score").innerText = this.score; // to get the score 
        document.getElementById("movements").innerText = this.movements
    }

    clashThree() {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.columns - 2; col++) {
                //console.log("grid: ", this.grid)
                let ball1 = this.grid[row][col];
                let ball2 = this.grid[row][col + 1];
                let ball3 = this.grid[row][col + 2];

                if ((ball1.src === ball2.src) && (ball2.src === ball3.src) && !ball1.src.includes("blank") ) {
                    ball1.src = './images/blank.png'
                    ball2.src = './images/blank.png'
                    ball3.src = './images/blank.png'
                    this.score += 10;
                    this.movements -= 1;
                }
            }
        }


        for (let col = 0; col < this.rows; col++) {
            for (let row = 0; row < this.columns - 2; row++) {
                let ball1 = this.grid[row][col];
                let ball2 = this.grid[row + 1][col];
                let ball3 = this.grid[row + 2][col];

                if ((ball1.src === ball2.src) && (ball2.src === ball3.src) && !ball1.src.includes("blank") ) {
                    ball1.src = './images/blank.png'
                    ball2.src = './images/blank.png'
                    ball3.src = './images/blank.png'
                    this.score += 10;
                    this.movements -= 1;
                }
            }
        }

    }

    clashFour() {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.columns - 3; col++) {
                
                let ball1 = this.grid[row][col];
                let ball2 = this.grid[row][col + 1];
                let ball3 = this.grid[row][col + 2];
                let ball4 = this.grid[row][col + 3];

                if ((ball1.src === ball2.src) && (ball2.src === ball3.src) && (ball3.src === ball4.sr ) && !ball1.src.includes("blank") ) {
                    ball1.src = './images/blank.png'
                    ball2.src = './images/blank.png'
                    ball3.src = './images/blank.png'
                    ball4.src = './images/blank.png'
                    this.score += 20
                }
            }
        }


        for (let col = 0; col < this.rows; col++) {
            for (let row = 0; row < this.columns - 3; row++) {
                let ball1 = this.grid[row][col];
                let ball2 = this.grid[row + 1][col];
                let ball3 = this.grid[row + 2][col];
                let ball4 = this.grid[row + 3][col];

                if ((ball1.src === ball2.src) && (ball2.src === ball3.src) && (ball3.src === ball4.sr ) && !ball1.src.includes("blank") ) {
                    ball1.src = './images/blank.png'
                    ball2.src = './images/blank.png'
                    ball3.src = './images/blank.png'
                    ball4.src = './images/blank.png'
                    this.score += 20
                }
            }
        }

    }

    clashFive() {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.columns - 4; col++) {
               
                let ball1 = this.grid[row][col];
                let ball2 = this.grid[row][col + 1];
                let ball3 = this.grid[row][col + 2];
                let ball4 = this.grid[row][col + 3];
                let ball5 = this.grid[row][col + 4];

                if ((ball1.src === ball2.src) && (ball2.src === ball3.src) && (ball3.src === ball4.sr ) && (ball4.src === ball5.sr ) && !ball1.src.includes("blank") ) {
                    ball1.src = './images/blank.png'
                    ball2.src = './images/blank.png'
                    ball3.src = './images/blank.png'
                    ball4.src = './images/blank.png'
                    ball4.src = './images/blank.png'
                    this.score += 30
                }
            }
        }


        for (let col = 0; col < this.rows; col++) {
            for (let row = 0; row < this.columns - 4; row++) {
                let ball1 = this.grid[row][col];
                let ball2 = this.grid[row + 1][col];
                let ball3 = this.grid[row + 2][col];
                let ball4 = this.grid[row + 3][col];
                let ball5 = this.grid[row + 4][col];

                if ((ball1.src === ball2.src) && (ball2.src === ball3.src) && (ball3.src === ball4.sr ) && (ball4.src === ball5.sr ) && !ball1.src.includes("blank") ) {
                    ball1.src = './images/blank.png'
                    ball2.src = './images/blank.png'
                    ball3.src = './images/blank.png'
                    ball4.src = './images/blank.png'
                    this.score += 30
                }
            }
        }

    }

    validMove() {
        this.gameOver();
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.columns - 2; col++) {
                let ball1 = this.grid[row][col];
                let ball2 = this.grid[row][col + 1];
                let ball3 = this.grid[row][col + 2];

                if ((ball1.src === ball2.src) && (ball2.src === ball3.src) && !ball1.src.includes("blank") ) {
                    return true;
                }
            }
        }


        for (let col = 0; col < this.rows; col++) {
            for (let row = 0; row < this.columns - 2; row++) {
                let ball1 = this.grid[row][col];
                let ball2 = this.grid[row + 1][col];
                let ball3 = this.grid[row + 2][col];

                if ((ball1.src === ball2.src) && (ball2.src === ball3.src) && !ball1.src.includes("blank") ) {
                    return true; 
                }
            }
        }

        return false; 
    }


    slideDownBall() {
        for (let col = 0; col < this.columns; col++) { // column 0 
            let idx = this.rows - 1 // idx = 8
            for (let row = this.columns - 1; row >= 0; row --) {  // start at column 0 row 8
                // console.log(this.grid[row][col])
                if (!this.grid[row][col].src.includes("blank")){ // we only care about img that are blank 
                    this.grid[idx][col].src = this.grid[row][col].src; // set the img that is blank with the next that is not 
                    idx -= 1
                }
            }

            for (let row = idx; row >= 0; row--) { // idx = last position there was an img that was shifted down so now it has to be blank 
                this.grid[row][col].src = './images/blank.png';
            }
        }

    }

    populateBall() {
        for (let col = 0; col < this.columns; col++) {
            if (this.grid[0][col].src.includes("blank")) {
                this.grid[0][col].src = ballsSource + this.randomBall() + ".jpg";
            }
        }
    }

    gameOver() {
        if (this.movements === 0) {
            document.getElementById("gameOver-modal").style.display = "block";
        }
    }

}


