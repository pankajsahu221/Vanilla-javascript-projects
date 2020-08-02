const WINNING_COMBINATIONS = [
    [0 ,1 ,2],
    [3 ,4 ,5],
    [6 ,7 ,8],
    [0 ,3 ,6],
    [1 ,4 ,7],
    [2 ,5 ,8],
    [0 ,4 ,8],
    [2 ,4 ,6],
]
const X_CLASS = "x";
const CIRCLE_CLASS = "circle";
const cellElements = document.querySelectorAll(".cell");
const board = document.getElementById("board");
const winMsg = document.querySelector(".win-msg");
const msgInfo = document.querySelector("[data-win-msg-text]");
const restartBtn = document.getElementById("restart-btn");
let circleTurn;

start();

restartBtn.addEventListener("click",start);

function start(){
    circleTurn = false;

    cellElements.forEach(function(cell){
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        cell.removeEventListener("click", cellClick );
        cell.addEventListener("click",cellClick, { once: true });

    });
    setBoardHover();     // to set hover of X when starting playing
    winMsg.classList.remove("show");
}    

cellElements.forEach(function(cell){
    cell.addEventListener("click", cellClick , { once: true } );
});


function cellClick(e){
    const cell = e.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;

    cell.classList.add(currentClass);
    // check for win
    if(checkWin(currentClass)){
        // console.log("winner")
        msgInfo.innerText = `${circleTurn ? "O's" : "X's"} Wins!`;
        winMsg.classList.add("show");
    }
    // check for draw
    else if(checkDraw()){
        msgInfo.innerHTML = "Draw!";
        winMsg.classList.add("show");
    }
    // switching turn
    else{
        swapTurns();
        setBoardHover();
    }
}
function swapTurns(){
    circleTurn = !circleTurn;
}
function setBoardHover(){
    board.classList.remove(CIRCLE_CLASS);
    board.classList.remove(X_CLASS);

    if(circleTurn){
        board.classList.add(CIRCLE_CLASS)
    }
    else{
        board.classList.add(X_CLASS);
    }
}

function checkWin(currentClass){
    return WINNING_COMBINATIONS.some(function(combination){
        return combination.every(function(index){
            return cellElements[index].classList.contains(currentClass);
        })  
    }) 
}

function checkDraw(){
    // we can only use '.every' and '.some' etc in an array and cellElements is not an array so I used 
    // array destructoring.
    return [...cellElements].every(function(cell){
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS);
    });
}