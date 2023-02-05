const SHREK_CLASS = 'shrek'
const FARQUAAD_CLASS = 'farquaad'
const WIN = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const fieldElements = document.querySelectorAll('[data-field')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
let farquaadTurn

startGame()

restartButton.addEventListener('click', startGame)

function startGame(){
    farquaadTurn = false
    fieldElements.forEach(field => {
        field.classList.remove(SHREK_CLASS)
        field.classList.remove(FARQUAAD_CLASS)
        field.removeEventListener('click', handleClick)
        field.addEventListener('click', handleClick, { once: true })
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')
}

function handleClick(e){
const field = e.target
const currentClass = farquaadTurn ? FARQUAAD_CLASS : SHREK_CLASS
placeMark(field, currentClass)
if(checkWin(currentClass)){
    endGame(false)
} else if (isDraw()){
    endGame(true)
} else {
    swapTurns()
    setBoardHoverClass()
}
}

function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = 'Draw!'
    }else {
        winningMessageTextElement.innerText = `${farquaadTurn ? "Farquaad" : "Shrek"} Wins!`
    }
    winningMessageElement.classList.add('show')
}

function isDraw(){
    return [...fieldElements].every(field => {
        return field.classList.contains(SHREK_CLASS) || field.classList.contains(FARQUAAD_CLASS)
    })
}

function placeMark(field, currentClass){
    field.classList.add(currentClass)
}

function swapTurns(){
    farquaadTurn = !farquaadTurn
}

function setBoardHoverClass() {
    board.classList.remove(SHREK_CLASS)
    board.classList.remove(FARQUAAD_CLASS)
    if(farquaadTurn){
        board.classList.add(FARQUAAD_CLASS)
    } else {
        board.classList.add(SHREK_CLASS)
    }
}

function checkWin(currentClass){
    return WIN.some(combination => {
        return combination.every(index => {
            return fieldElements[index].classList.contains(currentClass)
        })
    })
}