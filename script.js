
"use strict";

var N_SIZE = 3,
//Interestingly seems to work with a blank string as well as a non-breaking space
EMPTY = "&nbsp;",
boxes = [],
turn = "X",
score,
moves;

/*
* Initializes the Tic Tac Toe board and starts the game.
*/
function init() {
    // board is a table element
    var board = document.createElement('table');
    board.setAttribute("border", 1);
    board.setAttribute("cellspacing", 0);

    // I'm not clear what this identifier is doing... 
    var identifier = 1;
    //for statement depending on the size of the board 
    for (var i = 0; i < N_SIZE; i++) {
        var row = document.createElement('tr');
        board.appendChild(row);
        for (var j = 0; j < N_SIZE; j++) {
            var cell = document.createElement('td');
            cell.setAttribute('height', 120);
            cell.setAttribute('width', 120);
            cell.setAttribute('align', 'center');
            cell.setAttribute('valign', 'center');
            // add classes to the cell to determine if it is on the diagonal
            cell.classList.add('col' + j,'row' + i);
                if (i == j) {
                    cell.classList.add('diagonal0');
                }
                if (j == N_SIZE - i - 1) {
                    cell.classList.add('diagonal1');
                }
            cell.identifier = identifier;
            cell.addEventListener("click", set);
            row.appendChild(cell);
            // We are pushing things on to the boxes array
            boxes.push(cell);
            identifier += identifier;
            
        }
    }
    //boxes is an array of cells
    console.log(boxes);

    //Here we append the board to an existing html element
    document.getElementById("tictactoe").appendChild(board);
    startNewGame();
}


// New game **************

function startNewGame() {
    //score is an object where 'X' and 'O' are intialised as 0
    score = {
        "X": 0,
        "O": 0
    };
    moves = 0;
    turn = "X";
    boxes.forEach(function (square) {
        square.innerHTML = EMPTY;
    });
}

// Check if a win or not **************

function win(clicked) {
    // Get all cell classes
    var memberOf = clicked.className.split(/\s+/);
    for (var i = 0; i < memberOf.length; i++) {
        var testClass = '.' + memberOf[i];
    var items = contains('#tictactoe ' + testClass, turn);
        // winning condition: turn == N_SIZE
        if (items.length == N_SIZE) {
            return true;
        }
    }
    return false;
}

function contains(selector, text) {
    var elements = document.querySelectorAll(selector);
    return [].filter.call(elements, function(element){
        return RegExp(text).test(element.textContent);
    });
}

// Sets clicked square and also updates the turn.**************

function set() {
    if (this.innerHTML !== EMPTY) {
        return;
    }
    this.innerHTML = turn;
    moves += 1;
    score[turn] += this.identifier;
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

// Call init function to initialise the page
init();