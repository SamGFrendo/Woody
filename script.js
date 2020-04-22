
"use strict";

// I wonder if we could think about moving these variables inside functions?
var N_SIZE = 5, // I don't know why these are capitalised...? 
EMPTY = "&nbsp;", // I don't know why these are capitalised...? 
boxes = [],
turn = "X", // Concept of 'turn' (e.g. 'X', 'O') has been removed
score, // 'score' and 'moves' set in startNewGame() - Not sure if this is the best approach?
moves; // 'score' and 'moves' set in startNewGame() - Not sure if this is the best approach?


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
            cell.setAttribute('height', 80); // Don't forget font-size in css will need to be modified 
            cell.setAttribute('width', 80); // Don't forget font-size in css will need to be modified 
            cell.setAttribute('align', 'center');
            cell.setAttribute('valign', 'center');
            cell.classList.add('col' + j,'row' + i);

            cell.addEventListener("click", set);
            row.appendChild(cell);
            boxes.push(cell); // I'm not sure why I need to push cell to the boxes array here... except it doesn't work if I don't... 
        }
    }
    document.getElementById("tictactoe").appendChild(board);
    startNewGame();
}

// New game ************** Sets the 'start' state of the initiliased board

function startNewGame() {
    moves = 0;
    score = 0;
    boxes.forEach(function (square) {
        square.innerHTML = EMPTY;
    });
}

// ******** Check if rows or columns should be cleared criteria is met **************
// This currently doesn't work for multiple rows and columns being cleared at the same time!! 
function clear(clicked) {
    var memberOf = clicked.className.split(/\s+/);
    for (var i = 0; i < memberOf.length; i++) {
        var testClass = '.' + memberOf[i];        
        var items = contains('#tictactoe ' + testClass, turn);
        console.log(items)
        // winning condition: turn == N_SIZE
        if (items.length == N_SIZE) {
            // If this is true, this is where we want to clear... 
            // items is an array, that contains the location of each of the boxes to clear
            // We need to loop through each element inside items and set the innerHTML to EMPTY for each of them
            items.forEach(function (square) {
                square.innerHTML = EMPTY;
            });
            score += N_SIZE
        }
    }
    return false;
}

function contains(selector, text) {
    // What is querySelectAll doing - selector is id _space_ .Class
    var elements = document.querySelectorAll(selector);
    return [].filter.call(elements, function(element){return RegExp(text).test(element.textContent);});
 
}



// ******* Sets clicked cell, updates moves and checks the win criteria 

function set() {
    if (this.innerHTML !== EMPTY) { //If the cell is already filled in, don't do anything
        return;
    }
    this.innerHTML = turn; // This sets the textContent? Used in clear criteria? 
    moves += 1;
    score += 1;
    
    clear(this);

    // I should rework this if statement - as actually all I from it is the need to ability to iterate the score
    if (clear(this)) { // clear() no longer returns true 
        alert('Winner: Player ' + turn); 
        startNewGame(); // Also I won't need to start new game when I win in future 
    } else if (moves === N_SIZE * N_SIZE) { // I need to remove the concept of draw... 
        alert("Draw");
        startNewGame();
    } else {
        document.getElementById('score').textContent = 'Score = ' + score; // Why don't we use innerHTML, instead of text content?
    }
    
}

init();