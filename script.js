
"use strict";

// I wonder if we could think about moving these variables inside functions?
var N_SIZE = 5, // I don't know why these are capitalised...? 
EMPTY = "&nbsp;", // I don't know why these are capitalised...? 
boxes = [],
marker = "X", // Concept of 'marker' (e.g. 'X', 'O') has been removed
score, // 'score' and 'moves' set in startNewGame() - Not sure if this is the best approach?
moves; // 'score' and 'moves' set in startNewGame() - Not sure if this is the best approach?

//console.log(squareOne)
//console.log(squareTwo)
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
    moves = 0; // I don't need moves
    score = 0;
    boxes.forEach(function (square) {
        square.innerHTML = EMPTY;
    });
}

// ******** Check if columns and/or rows should be cleared criteria is met **************

function clear(clicked) {
    // The column/row of the clicked cell
    var memberOfColumn = clicked.className.split(/\s+/)[0];
    var memberOfRow = clicked.className.split(/\s+/)[1];
    // The set of cells in the clicked column/row that have an X marker
    var itemsColumn = contains('.' + memberOfColumn, marker); 
    var itemsRow = contains('.' + memberOfRow, marker); 
    

    if (itemsColumn.length == N_SIZE) {
        itemsColumn.forEach(function (square) {
            square.innerHTML = EMPTY;
        });
        score += N_SIZE;
    }
    if (itemsRow.length == N_SIZE) {
        itemsRow.forEach(function (square) {
            square.innerHTML = EMPTY; 
        });
        score += N_SIZE;
    }
    return; // Not sure I need return here
}

function contains(selector, text) {
    var elements = document.querySelectorAll(selector);
    return [].filter.call(elements, function(element){return RegExp(text).test(element.textContent);});
 
}

// ******* Sets clicked cell, updates moves and checks the win criteria 

// Let's make it so that this fills in two cells instead of one - the one selected 
// and the one next to it
function set() {
    if (this.innerHTML !== EMPTY) { //If the cell is already filled in, don't do anything
        return;
    }
    // className - A String, representing the class, or a space-separated list of classes, of an element
    var clickedCellCol = parseInt(this.className.substring(3, 4)); // Note that we can't extend beyond a 10x10 square with this approach
    var clickedCellRow = parseInt(this.className.substring(8, 9));
    // console.log('clickedCellCol= ', clickedCellCol ,'clickedCellRow =', clickedCellRow);

    // I will need to think about how to prevent overlays... 

    for (var i = 0; i < 2; i++) { // This will need to be generalised to deal with different blocks... 
        //Use the classNameString() function to complete the cell with the marker
        var clickedCell = document.querySelector(classNameString(clickedCellCol, clickedCellRow)); //This works
        clickedCell.innerHTML = marker; 
        clickedCellCol += 1; // This will need to be generalised to deal with different blocks... 
    }

    // *************** Nothing to do with selecting cells below here
    moves += 1; // I don't need moves
    score += 1; // Score will need to be extended to deal with different blocks... 
    
    clear(this); // Check if any columns/rows should be cleared 
    
    document.getElementById('score').textContent = 'Score = ' + score; // Why don't we use innerHTML, instead of text content?
}

// Takes two numbers as an input and will return a correctly formatted class string e.g. 'col2 .row3'
function classNameString(colNum, rowNum) {
    return '.col' + colNum + '.row' + rowNum;
}



init();