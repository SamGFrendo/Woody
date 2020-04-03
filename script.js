
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
    // I think I really need to figure out what this identifer is doing... 
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
            // It's wierd that I can't see an identifer in the DOM
            cell.identifier = identifier;
            //This will call the set function on click
            cell.addEventListener("click", set);
            row.appendChild(cell);
            // We are pushing things on to the boxes array
            boxes.push(cell);
            //identifier goes 1,2,4,8,16,32,64...
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
    //The forEach() method executes a provided function once for each array element.
    //On init, set all boxes to empty
    boxes.forEach(function (square) {
        square.innerHTML = EMPTY;
    });
}

// Check if a win or not **************

// I DO NOT UNDERSTAND HOW WIN IS DETERMINED 
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
// This function is called from the win fuction
function contains(selector, text) {
    //The Document method querySelectorAll() returns a static (not live) NodeList representing a list 
    //of the document's elements that match the specified group of selectors.
    var elements = document.querySelectorAll(selector);
    return [].filter.call(elements, function(element){
        return RegExp(text).test(element.textContent);
    });
}

// Sets clicked square and also updates the turn.**************

function set() {
    //If the cell is already filled in, don't do anything
    //Need to find out more about 'this'
    if (this.innerHTML !== EMPTY) {
        return;
    }
    //Set the cell to whoever's turn it is.
    this.innerHTML = turn;
    moves += 1;
    //This just adds to the score object, depending on whose turn it is 
    score[turn] += this.identifier;
    //console.log(score[turn]);
    //console.log(score);

    // Win function returns true or false
    if (win(this)) {
        alert('Winner: Player ' + turn);
        startNewGame();
    // If no more moves can be made
    } else if (moves === N_SIZE * N_SIZE) {
        alert("Draw");
        startNewGame();
    // Need to find out what '?' this does... 
    } else {
        //turn altinator
        turn = turn === "X" ? "O" : "X";
        document.getElementById('turn').textContent = 'Player ' + turn;
    }
}

// Call init function to initialise the page
init();