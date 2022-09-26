const X_CLASS = 'x'
const O_CLASS = 'o'
const winConditions = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
const cellElements = document.querySelectorAll('[data-cell]')
const winningMessageElement =  document.getElementById("winningMessage")
const winningMessageTextSelector = document.querySelector('[data-winning-message-text]')
const boardElement = document.getElementById('board')
const restartButton = document.getElementById('restartButton')
let turn

startGame()

restartButton.addEventListener('click',startGame)

function startGame(){
    turn = false
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(O_CLASS)
        cell.removeEventListener('click',handleClick)
        cell.addEventListener('click',handleClick,{once : true})
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove("show")

}

function handleClick(event){
    const cell = event.target
    const currentClass = turn ? O_CLASS : X_CLASS
    placeSymbol(cell,currentClass)
    if(checkWin(currentClass)){
        endGame(false)
    }
    else if(isDraw()){
        endGame(true)
    }
    else{
        swapTurns()
        setBoardHoverClass()
    }

}

function placeSymbol(cell, currentClass){
    cell.classList.add(currentClass)
}

function swapTurns(){
    turn = !turn
}

function setBoardHoverClass(){
    boardElement.classList.remove(X_CLASS)
    boardElement.classList.remove(O_CLASS)
    turn ? boardElement.classList.add(O_CLASS) : boardElement.classList.add(X_CLASS)
}

function checkWin(currentClass){
    return winConditions.some(combinations => {
        return combinations.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}

function endGame(draw){
    if(draw){
        winningMessageTextSelector.innerHTML = "Draw!"
    }else{
        winningMessageTextSelector.innerHTML = `${turn ? "O's" : "X's"} Wins!`
    }
    winningMessageElement.classList.add("show")
}

function isDraw(){
    return [...cellElements].every(cell =>{
        return cell.classList.contains(X_CLASS) ||
            cell.classList.contains(O_CLASS)
    })
}