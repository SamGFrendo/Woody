
"use strict";

// I wonder if we could think about moving these variables inside functions?
// I think these are funcitoning as global variables that can be accessed across functions
var N_SIZE = 5, // I don't know why these are capitalised...? 
EMPTY = "&nbsp;", // I don't know why these are capitalised...? 
boxes = [],
marker = "X", // Concept of 'X' and 'O' has been removed - we can keep this though
score; // 'score' set in startNewGame() - Not sure if this is the best approach?


//console.log(squareTwo)
//console.log(rowFour)
//console.log(L4three)

// ******** Just set the block by hand for testing now 
var block = L4Three;
//var block = squareTwo; 
//var block = rowFour;
//var block = colFour; 
//var block = rowFive;
//var block = L2Two;
//var block = squareThree;

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

            //cell.addEventListener("click", set); // can I call two functions from an event listener? 
            // doesn't look like I can add two functions to an event listener using this approach 
            // Call checkEmpty for test purposes 
            
            // cell.addEventListener("click", checkEmpty);

            // I will need to call processBlock only (I think!)
            cell.addEventListener("click", processBlock);

            row.appendChild(cell);
            boxes.push(cell); // I'm not sure why I need to push cell to the boxes array here... except it doesn't work if I don't... 
        }
    }
    document.getElementById("tictactoe").appendChild(board);
    startNewGame();
}

// New game ************** Sets the 'start' state of the initiliased board

function startNewGame() {
    score = 0;
    boxes.forEach(function (square) {
        square.innerHTML = EMPTY;
    });
}

// ******** Check if columns and/or rows should be cleared criteria is met **************

// The clear() function is only being passed the clicked cells... it should be passed all marked cells

function clear(marked) {
    // The column/row of the clicked cell
    var memberOfColumn = marked.className.split(/\s+/)[0];
    var memberOfRow = marked.className.split(/\s+/)[1];
    // The set of cells in the clicked column/row that have an X marker
    var itemsColumn = contains('.' + memberOfColumn, marker);
    var itemsRow = contains('.' + memberOfRow, marker); 
    
    if (itemsColumn.length == N_SIZE) {
        itemsColumn.forEach(function (square) {
            square.innerHTML = EMPTY; // should change 'square' to 'cell' to be consistent
            square.setAttribute('id', ''); // css can style background
        });
        score += N_SIZE;
    }
    if (itemsRow.length == N_SIZE) {
        itemsRow.forEach(function (square) {
            square.innerHTML = EMPTY; 
            square.setAttribute('id', ''); // css can style background
        });
        score += N_SIZE;
    }
    return; // Not sure I need return here
}

function contains(selector, text) {
    var elements = document.querySelectorAll(selector);
    return [].filter.call(elements, function(element){return RegExp(text).test(element.textContent);});
 
}

// Takes two numbers as an input and will return a correctly formatted class string e.g. 'col2 .row3'
function classNameString(colNum, rowNum) {
    return '.col' + colNum + '.row' + rowNum;
}

// ******* Sets clicked cell, updates moves and checks the clear criteria *****
function set(colNum, rowNum) { 
    //Use the classNameString() function to complete the cell with the marker
    var markCell = document.querySelector(classNameString(colNum, rowNum)); 

    markCell.innerHTML = marker; 
    markCell.setAttribute('id', 'marked'); // css can style background
    
    clear(markCell); // Every time I mark a cell, check if a column or row should be cleared 
    
    score += 1;
    document.getElementById('score').textContent = 'Score = ' + score; // Why don't we use innerHTML, instead of text content?
}

function checkEmpty(colNum, rowNum) { 
    var checkCell = document.querySelector(classNameString(colNum, rowNum)); 
        if (checkCell == null) {
            return false;
        } 
        if (checkCell.innerHTML !== EMPTY) { //This will error: 'Cannot read property 'innerHTML' of null'
            return false; // If any of the cells are marked then exit function  
        }  
        return true;
}

function processBlock() {
    var clickedCellCol = parseInt(this.className.substring(3, 4)); // Note that we can't extend beyond a 10x10 square with this approach
    var clickedCellRow = parseInt(this.className.substring(8, 9));

    var col = clickedCellCol // Sort out this descrepancy later 
    var row = clickedCellRow // Sort out this descrepancy later 

    var checkFalse = [];

    for (var i = 0; i < block.length; i++) { 
        for (var j = 0; j < block[i].length; j++) {
            if (block[i][j] == 1) {
                checkFalse.push(checkEmpty(col, row));  
            }
            col += 1; 
        }
        row += 1
        col = col - block[0].length // This doesn't seem that eligant 
    }

    col = clickedCellCol; // Need to reset because of the above line - doesn't feel elegant 
    row = clickedCellRow;

    if (checkFalse.every(Boolean)) {
        for (var i = 0; i < block.length; i++) { 
            for (var j = 0; j < block[i].length; j++) {
                if (block[i][j] == 1) {
                    set(col, row);
                }
                col += 1; 
            }
            row += 1
            col = col - block[0].length 
        }
    } else {
        console.log('Overlay or Offlay detected');
        return;
    }
    return;
}

init();