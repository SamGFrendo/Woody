
"use strict";

var N_SIZE = 3,
EMPTY = "&nbsp;",
boxes = [],
turn = "X",
score,
moves;


// Initialises the board in the UI and calls StartNewGame.

function init() {
    // board is a table element
    var board = document.createElement('table');
    board.setAttribute("border", 1);
    board.setAttribute("cellspacing", 0);

    // 'identifier' is involved in adding to the score variable... not sure why
    var identifier = 1;
    // Loops through and creates a table of size N_SIZE x N_SIZE
    for (var i = 0; i < N_SIZE; i++) {
        var row = document.createElement('tr');
        board.appendChild(row);
        for (var j = 0; j < N_SIZE; j++) {
            var cell = document.createElement('td');
            cell.setAttribute('height', 120);
            cell.setAttribute('width', 120);
            cell.setAttribute('align', 'center');
            cell.setAttribute('valign', 'center');
            // add classes to the cell to determine it's column position,
            // row position and if it is one or more of two diagonals
            cell.classList.add('col' + j,'row' + i);
                if (i == j) {
                    cell.classList.add('diagonal0');
                }
                if (j == N_SIZE - i - 1) {
                    cell.classList.add('diagonal1');
                }
            // Idintifier becomes a (property?) of the cell -
            // depending on which cell is clicked this is added to score object

            cell.identifier = identifier;
            //This will call the set function on click
            cell.addEventListener("click", set);
            //This is the equivalent of board.appendChild(row)
            row.appendChild(cell);
            // We are pushing 'cell' on to the boxes array
            boxes.push(cell);
            //identifier goes 1,2,4,8,16,32,64...
            identifier += identifier;


        }
    }
    //Here we append the board to an existing html element
    document.getElementById("tictactoe").appendChild(board);
    startNewGame();
}


// New game ************** Sets the 'start' state of the initiliased board

function startNewGame() {
    // score is an object where 'X' and 'O' are intialised as 0
    // We don't need 'score' this can be removed. 
    score = {
        "X": 0,
        "O": 0
    };
    moves = 0;
    turn = "X";
    //The forEach() method executes a provided function once for each array element.
    boxes.forEach(function (square) {
        square.innerHTML = EMPTY;
    });
}

// Check if a win or not **************

// I DO NOT UNDERSTAND HOW WIN IS DETERMINED
// When we define the function, the parameter is named 'clicked', when we call the function, we pass 'this' to it. 
// 'this' = the clicked cell

function win(clicked) {
    //memberOf is an array containing the position description of the clicked cell  ["col2", "row0", "diagonal1"]
    var memberOf = clicked.className.split(/\s+/);
    for (var i = 0; i < memberOf.length; i++) {
        //test class creates a set of strings based on the array in memberOf
        var testClass = '.' + memberOf[i];
        //console.log('test class is ', testClass)
        
        var items = contains('#tictactoe ' + testClass, turn);
        console.log(items) 
        // winning condition: turn == N_SIZE
        if (items.length == N_SIZE) {
            return true;
        }
    }
    return false;
}
// This function is called from the win fuction - remember it is called multiple times for each memberOf the clicked cell
function contains(selector, text) {
    //The Document method querySelectorAll() returns a NodeList representing a list
    //of the document's elements that match the specified group of selectors.
    //'elements' is where the magic is - it is returning the set of cells that COULD lead to that player winning

    var elements = document.querySelectorAll(selector);

    /*
    Uses a blank array in order to call the "filter" method. tells the filter to use 'elements' as the array to filter,
    and only returns those cells which have the textContent = turn (textContent is 'set' each time a cell is clicked)

    returning an array of those elements that contain the 'text' parameter, the text parameter is 'turn'  
    */ 
    // textContent is a property of the node!!! It is set as part of the set() function
    return [].filter.call(elements, function(element){return RegExp(text).test(element.textContent);});

 
}

// Sets clicked square and also updates the turn.**************
// 'onclick' this function is run -'this' is the cell that is clicked
function set() {
    if (this.innerHTML !== EMPTY) { //If the cell is already filled in, don't do anything
        return;
    }
    //Set the cell to whoever's turn it is.
    this.innerHTML = turn;
    moves += 1;
    //This just adds to the score object, depending on whose turn it is
    score[turn] += this.identifier; //score is not needed and can be removed here
    //console.log(score[turn]);
    //console.log(score);

    // Win function returns true or false -
    if (win(this)) {
        alert('Winner: Player ' + turn);
        startNewGame();
    // If no more moves can be made
    } else if (moves === N_SIZE * N_SIZE) {
        alert("Draw");
        startNewGame();
    // Need to find out what '?' this does...
    } else {
        //turn altinator - if it's X change to to O and visca versa
        turn = turn === "X" ? "O" : "X";
        // This is simply updating the info text at the bottom of the page
        document.getElementById('turn').textContent = 'Player ' + turn;
    }
}

init();