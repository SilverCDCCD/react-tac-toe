import React from 'react'
import './TicTacToe.css'
import circle from '../Assets/circle.png'
import cross from '../Assets/cross.png'



const TicTacToe = () => {

    let xTurn = false;
    let gameOver = 0;
    let boardData = [" ", " ", " ", " ", " ", " ", " ", " ", " "];

    const boardFull = () => {
        for (var i = 0; i < 9; i++) {
            if (boardData[i] === " ")
                return false;
        }
        return true;
    }

    const checkColumn = (index) => {
        var col = index % 3;
        return (boardData[col] === boardData[col+3] && boardData[col] === boardData[col+6] && boardData[col] != " ");
    }

    const checkDiagonals = () => {
       return (boardData[4] !== " ") && ((boardData[0] === boardData[4] && boardData[4] === boardData[8]) || (boardData[2] === boardData[4] && boardData[4] === boardData[6]));
    }

    const checkRow = (index) => {
        var row = Math.floor(index / 3) * 3;
        return (boardData[row] === boardData[row+1] && boardData[row] === boardData[row+2] && boardData[index] !== " ");
    }

    const checkGameOver = (index) => {
        return (checkColumn(index) || checkRow(index) || checkDiagonals() || boardFull());
    }

    const claim = (e, index) => {
        if (gameOver)
            return;
        if (boardData[index] !== " ") {
            console.log(`Cannot claim square ${index}!`)
        }
        else {
            e.target.innerHTML = `<img src="${xTurn ? cross : circle}">`
            boardData[index] = xTurn ? "X" : "O";
            xTurn = !xTurn;
            gameOver = checkGameOver(index);
        }
        if (gameOver) {
            var headerText = document.getElementById("header-text")
            headerText.innerText = getHeaderText()
        }
    }

    const getHeaderText = () => {
        if (gameOver) {
            if (boardFull()) {
                return "Draw Game!"
            }
            else {
                return `${xTurn ? 'O' : 'X'} Wins!`
            }
        }
        return "React-Tac-Toe"
    }
    
    const onPress = (e, index) => {
        claim(e, index);
        showBoard(index);
    }

    const resetBoard = () => {
        let squares = document.getElementsByClassName("board-square");
        for (var i = 0; i < 9; i++) {
            squares[i].style.background = "#caf";
            squares[i].innerHTML = "";
            boardData[i] = " ";
        }
        xTurn = false;
        gameOver = false;
        document.getElementById("header-text").innerText = getHeaderText();
        showBoard();
    }

    const showBoard = (index) => {
        console.clear()
        console.log(`${boardData[0]} | ${boardData[1]} | ${boardData[2]}`)
        console.log("---------")
        console.log(`${boardData[3]} | ${boardData[4]} | ${boardData[5]}`)
        console.log("---------")
        console.log(`${boardData[6]} | ${boardData[7]} | ${boardData[8]}`)
        console.log(`Tic-Tac-Toe on Row? ${checkRow(index)}`)
        console.log(`Tic-Tac-Toe on Column? ${checkColumn(index)}`)
        console.log(`Tic-Tac-Toe on Diagonal? ${checkDiagonals()}`)
        console.log(`Board Full? ${boardFull()}`)
        console.log(`Game Over? ${checkGameOver(index)}`)
        console.log(`Header Text: ${getHeaderText()}`)
    }

    return (
        <div id="container">
            <h1 id="header-text">{ getHeaderText() }</h1>
            <div id="board">
                <div className="board-row">
                    <div className="board-square" onClick={(e) => onPress(e, 0)}></div>
                    <div className="board-square" onClick={(e) => onPress(e, 1)}></div>
                    <div className="board-square" onClick={(e) => onPress(e, 2)}></div>
                </div>
                <div className="board-row">
                    <div className="board-square" onClick={(e) => onPress(e, 3)}></div>
                    <div className="board-square" onClick={(e) => onPress(e, 4)}></div>
                    <div className="board-square" onClick={(e) => onPress(e, 5)}></div>
                </div>
                <div className="board-row">
                    <div className="board-square" onClick={(e) => onPress(e, 6)}></div>
                    <div className="board-square" onClick={(e) => onPress(e, 7)}></div>
                    <div className="board-square" onClick={(e) => onPress(e, 8)}></div>
                </div>
            </div>
            <button id="reset-button" onClick={() => resetBoard()}>Reset</button>
        </div>
    )
}

export default TicTacToe