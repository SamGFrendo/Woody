
"use strict";

var N_SIZE = 3,
EMPTY = "&nbsp;",
boxes = [],
turn = "X",
score,
moves;

// ************** Initialises the board in the UI and calls StartNewGame.

function init() {

    var board = document.createElement('table');
    board.setAttribute("border", 1);
    board.setAttribute("cellspacing", 0);

    for (var i = 0; i < N_SIZE; i++) {
        var row = document.createElement('tr');
        board.appendChild(row);
        for (var j = 0; j < N_SIZE; j++) {
            var cell = document.createElement('td');
            cell.setAttribute('height', 120);
            cell.setAttribute('width', 120);
            cell.setAttribute('align', 'center');
            cell.setAttribute('valign', 'center');
            cell.setAttribute('id', 'table0');
            cell.classList.add('col' + j,'row' + i);
                if (i == j) {
                    cell.classList.add('diagonal0');
                }
                if (j == N_SIZE - i - 1) {
                    cell.classList.add('diagonal1');
                }
            cell.addEventListener("click", set);
            row.appendChild(cell);
            boxes.push(cell);
        }
    }
    document.getElementById("tictactoe-0").appendChild(board);
    startNewGame();
}

// New game ************** Sets the 'start' state of the initiliased board

function startNewGame() {
    moves = 0;
    turn = "X";
    //The forEach() method executes a provided function once for each array element.
    boxes.forEach(function (square) {
        square.innerHTML = EMPTY;
    });
}

// ******** Check if win criteria is met **************

function win(clicked) {
    var memberOf = clicked.className.split(/\s+/);
    for (var i = 0; i < memberOf.length; i++) {
        var testClass = '.' + memberOf[i];        
        var items = contains('#tictactoe-0 ' + testClass, turn);
        // winning condition: turn == N_SIZE
        if (items.length == N_SIZE) {
            return true;
        }
    }
    return false;
}

function contains(selector, text) {
    var elements = document.querySelectorAll(selector);
    return [].filter.call(elements, function(element){return RegExp(text).test(element.textContent);});
 
}

// ************** Sets clicked cell, updates moves and checks the win criteria 

function set() {
    if (this.innerHTML !== EMPTY) { //If the cell is already filled in, don't do anything
        return;
    }
    this.innerHTML = turn;
    moves += 1;
    // Win function returns true or false - it determines win criteria based on the cell clicked
    if (win(this)) {
        alert('Winner: Player ' + turn);
        startNewGame();
    } else if (moves === N_SIZE * N_SIZE) {
        alert("Draw");
        startNewGame();
    } else {
        turn = turn === "X" ? "O" : "X";
        document.getElementById('turn').textContent = 'Player ' + turn;
    }
}

init();