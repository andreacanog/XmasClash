const balls = ["Pink", "Green", "White", "Red", "Yellow"];
const ballsWithStars = ["GreenLines", "PinkLines", "RedLines", "YellowLines", "WhiteLines"]
const background  = new Image()
background.src = "./images/background.png"
const ballsSource = './images/'
let currentBall;
let otherBall;

import Game from './game.js'

export default class Board {

    constructor () {
        this.grid = [];
        this.rows = 9
        this.columns = 9; 
        this.score = 0; 
        this.movements = 20;
        this.updatedByUser = false;
        this.ballObj = { 
            "GreenStar.png": "Green.png", 
            "PinkStar.png": "Pink.png",
            "RedStar.png": "Red.png", 
            "WhiteStar.png": "White.png", 
         "  YellowStar.png": "Yellow.png"
        };
    }

    startGame() {
        for (let r = 0; r < this.rows; r++) { 
            let row = []
            for (let c = 0; c < this.columns; c++) {
                let img = document.createElement("img");

                img.id = r.toString() + "-" + c.toString(); // => img id = "0-0" "0-1" "0-2" (position)
                img.src = ballsSource + this.randomBall() + ".png" // =>  "images/Blue.png"
                
                this.makeBallDragable(img)
                document.getElementById("board").append(img);

                row.push(img);
            }
            // console.log("document: ", document)
            this.grid.push(row); //2D array  [[img, img, img, img, img, img, img, img]]
        }

        // if (this.updateByUser === false) {
        //     this.movements += 0
        // }

        //console.log(this.updateByUser)
    }

    randomBall() {
        return balls[Math.floor(Math.random() * balls.length)];
    }
    randomBallWithLines() {
        return ballsWithStars[Math.floor(Math.random() * ballsWithStars.length)];
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
        //this.updateByUser = true; 
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
       
    }

    dragEnd() {
        this.updatedByUser = true; 
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
            let valid1 = this.validMoveForThree()
            let valid2 = this.validMoveForFour()
            let valid3 = this.validMoveForFive()
            

            if (!valid3 && !valid2 && !valid1) {
                let currentImg = currentBall.src; 
                let otherImg = otherBall.src;
            
                //swap images
                currentBall.src = otherImg;
                otherBall.src = currentImg;
                this.movements += 1;
            }
            
        
            if (this.updatedByUser) {
                this.movements -= 1;
                
            }
        } 
        this.updatedByUser = false; 
       
    }


    clash() {
        this.clashFive()
        this.clashFour()
        this.clashThree()
        document.getElementById("score").innerText = this.score; // to get the score 
        document.getElementById("movements").innerText = this.movements
    }

    clashThree() {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.columns - 2; col++) {
                let ball1 = this.grid[row][col];
                let ball2 = this.grid[row][col + 1];
                let ball3 = this.grid[row][col + 2];
                // let haveStar = this.checkIfWeHaveStart(ball1, ball2, ball3);
                let haveStar = false
                let matchingStar = false;

                // check if matching star only if we have a star. 
                // haveStar = this.checkIfWeHaveStart()

                // if (haveStar !== false) {
                //     matchingStar = this.allowThreeWithStar(ball1, ball2, ball3, haveStar);
                // }

                // let matchingStart = this.allowThreeWithStar(ball1.src, ball2.src, ball3.src);

                if (((ball1.src === ball2.src) && (ball2.src === ball3.src) || matchingStar) && !ball1.src.includes("blank") ) {
                    ball1.src = './images/blank.png'
                    ball2.src = './images/blank.png'
                    ball3.src = './images/blank.png'
                    this.score += 10; 
                    this.checkIfGameWonOrLost();
                    
                }
            }
        }


        for (let col = 0; col < this.rows; col++) {
            for (let row = 0; row < this.columns - 2; row++) {
                let ball1 = this.grid[row][col];
                let ball2 = this.grid[row + 1][col];
                let ball3 = this.grid[row + 2][col];
                // let haveStar = this.checkIfWeHaveStart(ball1, ball2, ball3);
                let haveStar = false;
                let matchingStar = false;

                // if (haveStar !== false) {
                //     matchingStar = this.allowThreeWithStar(ball1, ball2, ball3, haveStar);
                // }

                if (((ball1.src === ball2.src) && (ball2.src === ball3.src) || matchingStar) && !ball1.src.includes("blank") ) {
                    ball1.src = './images/blank.png'
                    ball2.src = './images/blank.png'
                    ball3.src = './images/blank.png'
                    this.score += 10;
                    // this.movements -= 1;
                    this.checkIfGameWonOrLost();
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
              
                if ((ball1.src === ball2.src) && (ball2.src === ball3.src) && (ball3.src === ball4.src) && !ball1.src.includes("blank")) {
                    ball1.src = './images/blank.png'
                    ball2.src = './images/blank.png'
                    ball3.src = './images/blank.png'
                    ball4.src = ballsSource + this.randomBallWithLines() + ".png" 
                    this.score += 20;
                    this.checkIfGameWonOrLost();
                }

            }
        }


        for (let col = 0; col < this.rows; col++) {
            for (let row = 0; row < this.columns - 3; row++) {
                let ball1 = this.grid[row][col];
                let ball2 = this.grid[row + 1][col];
                let ball3 = this.grid[row + 2][col];
                let ball4 = this.grid[row + 3][col];

            

                if ((ball1.src === ball2.src) && (ball2.src === ball3.src) && (ball3.src === ball4.src) && !ball1.src.includes("blank")) {
                    ball1.src = './images/blank.png'
                    ball2.src = './images/blank.png'
                    ball3.src = './images/blank.png'
                    ball4.src =  ballsSource + this.randomBallWithLines() + ".png" 
                    this.score += 20;
                    this.checkIfGameWonOrLost();
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
        

                if ((ball1.src === ball2.src) && (ball2.src === ball3.src) && (ball3.src === ball4.src) && (ball4.src === ball5.src) && !ball1.src.includes("blank")) {
            
                    ball1.src = './images/blank.png'
                    ball2.src = './images/blank.png'
                    ball3.src = './images/blank.png'
                    ball4.src = './images/blank.png'
                    ball5.src = './images/blank.png'
                    this.score += 30;
                    this.checkIfGameWonOrLost();
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
                
                if ((ball1.src === ball2.src) && (ball2.src === ball3.src) && (ball3.src === ball4.src) && (ball4.src === ball5.src) && !ball1.src.includes("blank") ) {
            
                    ball1.src = './images/blank.png'
                    ball2.src = './images/blank.png'
                    ball3.src = './images/blank.png'
                    ball4.src = './images/blank.png'
                    ball5.src = './images/blank.png'
                    this.score += 30;
                    // this.movements -= 1;
                    this.checkIfGameWonOrLost();
                }
            }
        }
    }

    validMoveForThree() {

        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.columns - 2; col++) {
                let ball1 = this.grid[row][col];
                let ball2 = this.grid[row][col + 1];
                let ball3 = this.grid[row][col + 2];
                // let haveStar = this.checkIfWeHaveStart(ball1, ball2, ball3);
                let haveStar = false;
                let matchingStar = false;
                
                if (haveStar !== false) {
                    matchingStar = this.allowThreeWithStar(ball1, ball2, ball3, haveStar);
                }
                console.log(" horizontal haveStar: ", haveStar);
                console.log(" horizontal matchingStar: ", matchingStar);

                if (((ball1.src === ball2.src) && (ball2.src === ball3.src) || matchingStar) && !ball1.src.includes("blank") ){
                    return true;
                }
            }
        }


        for (let col = 0; col < this.rows; col++) {
            for (let row = 0; row < this.columns - 2; row++) {
                let ball1 = this.grid[row][col];
                let ball2 = this.grid[row + 1][col];
                let ball3 = this.grid[row + 2][col];
                // let haveStar = this.checkIfWeHaveStart(ball1, ball2, ball3);
                let haveStar = false;
                let matchingStar = false;

                if (haveStar !== false) {
                    matchingStar = this.allowThreeWithStar(ball1, ball2, ball3, haveStar);
                }
                console.log(" vertical haveStar: ", haveStar);
                console.log(" vertical matchingStar: ", matchingStar);

                if (((ball1.src === ball2.src) && (ball2.src === ball3.src) || matchingStar) && !ball1.src.includes("blank") ) {
                    return true; 
                }
            }
        }
    
        return false; 
    }

    validMoveForFour() {

        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.columns - 3; col++) {
                
                let ball1 = this.grid[row][col];
                let ball2 = this.grid[row][col + 1];
                let ball3 = this.grid[row][col + 2];
                let ball4 = this.grid[row][col + 3];
                
                if ((ball1.src === ball2.src) && (ball2.src === ball3.src) && (ball3.src === ball4.src) && !ball1.src.includes("blank")) {
                    return true; 
                }
                
            }
        }
        
        
        for (let col = 0; col < this.rows; col++) {
            for (let row = 0; row < this.columns - 3; row++) {
            let ball1 = this.grid[row][col];
            let ball2 = this.grid[row + 1][col];
            let ball3 = this.grid[row + 2][col];
            let ball4 = this.grid[row + 3][col];

                if ((ball1.src === ball2.src) && (ball2.src === ball3.src) && (ball3.src === ball4.src) && !ball1.src.includes("blank")) {
                    return true;
                } 
            }
        }
    
    }


    validMoveForFive() {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.columns - 4; col++) {
               
                let ball1 = this.grid[row][col];
                let ball2 = this.grid[row][col + 1];
                let ball3 = this.grid[row][col + 2];
                let ball4 = this.grid[row][col + 3];
                let ball5 = this.grid[row][col + 4];
        

                if ((ball1.src === ball2.src) && (ball2.src === ball3.src) && (ball3.src === ball4.src) && (ball4.src === ball5.src) && !ball1.src.includes("blank")) {
                    return true; 
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

                if ((ball1.src === ball2.src) && (ball2.src === ball3.src) && (ball3.src === ball4.src) && (ball4.src === ball5.src) && !ball1.src.includes("blank") ) {
                    return true; 
                }
            }
        }
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
                this.grid[0][col].src = ballsSource + this.randomBall() + ".png";
            }
        }
    }

    checkIfGameWonOrLost() {
        this.gameOver();
        this.gameWon();
    }

    
    gameOver() {
        if (this.movements === 0) {
            document.getElementById("gameOver").style.display = "block";
        }
    }

    gameWon() {
        if (this.score >= 1000) {
            document.getElementById("gameWon").style.display = "block";
        }
    }

    // checkIfWeHaveStart(ball1, ball2, ball3) {
    //     console.log("checkIfWeHaveStart");
    //     let balls = [ball1, ball2, ball3];
    //     for (let i = 0; i < balls.length; i++) {
    //         let ball = balls[i].src.split("/")[8];
    //         console.log("in checkIfWeHaveStart ball: ", ball);
    //         if (this.ballObj[ball] !== undefined) {
    //             return [ball, i];
    //         }
    //     }
    //     return false;
    // }


    // allowThreeWithStar(ball1, ball2, ball3, hasStar) {
    //     console.log("hit allowThreeWithStar ");
    //     // let ballObj = { "GreenStar.png": "Green.png", 
    //     //                 "PinkStar.png": "Pink.png",
    //     //                  "RedStar.png": "Red.png", 
    //     //                  "WhiteStar.png": "White.png", 
    //     //                  "YellowStar.png": "Yellow.png"
    //     //             }

    //     let arr = [ball1, ball2, ball3]
    //     let newArr = [];
    //     for (let i = 0; i < arr.length; i++) {
    //         let currBall = arr[i].src.split("/")[8];
    //         newArr.push(currBall);
    //     }
    //     newArr[hasStar[1]] = hasStar[0];
    //     // let starIdx;
    //     // let starBall = arr.forEach((ball, idx) => {
    //     //     let currentBall = ball.split("/")[8];
    //     //     console.log("currentBall: ", currentBall);
    //     //     console.log("inside each - ball: ", ball)
    //     //     if (this.ballObj[currentBall] !== undefined) {
    //     //         console.log("inside the each and if");
    //     //         starIdx = idx;
    //     //         return currentBall;
    //     //     }
    //     // });
    //     // console.log("starBall: ", starBall);
    //     // console.log("starIdx: ", starIdx)
    //     // let coloredBall = this.ballObj[starBall];
    //     // // if (coloredBall == ball2 && coloredBall == )
    //     // arr[starIdx] = coloredBall;
    //     return newArr[0] === newArr[1] && newArr[1] === newArr[2];

    // }

}


