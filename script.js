
"use strict";

import { /*countMarkedCells,*/ startBrain, processBlockVirtual, blockSelectedVirtual, initVirtualBoard, auto_BlockSelectedVirtual } from './brain.js'
import { chooseRandomBlock, blocks } from './blocks.js'


export let N_SIZE = 5; // I don't know why these are capitalised...? 
export let EMPTY = "&nbsp;"; // I don't know why these are capitalised...? 
let boxes = [];
let marker = "X"; // A lot runs based on innerHTML - so I should keep this
let score; // 'score' set in startNewGame() - Not sure if this is the best approach?

let clickedBlockSelectorID;
let block;
let reset = 0;

//********** Initialises the board in the UI and calls StartNewGame

function init() {

    var board = document.createElement('table');
    board.setAttribute("border", 1);
    board.setAttribute("cellspacing", 0);

    for (var i = 0; i < N_SIZE; i++) {
        var row = document.createElement('tr');
        board.appendChild(row);
        for (var j = 0; j < N_SIZE; j++) {
            var cell = document.createElement('td');
            cell.setAttribute('height', 40); // Don't forget font-size in css will need to be modified 
            cell.setAttribute('width', 40); // Don't forget font-size in css will need to be modified 
            cell.setAttribute('align', 'center');
            cell.setAttribute('valign', 'center');
            cell.classList.add('col' + j, 'row' + i);
            cell.addEventListener("click", processBlock);
            cell.addEventListener("click", processBlockVirtual);
            cell.addEventListener("click", resetBlockSelector);
            row.appendChild(cell);
            boxes.push(cell); // I'm not sure why I need to push cell to the boxes array here... except it doesn't work if I don't... 
        }
    }
    document.getElementById('tictactoe').appendChild(board);
    startNewGame();
    buildBlockSelector();
    initVirtualBoard();
    // This allows us to access the functions in 'brain' by clicking 'start Brain' 
    document.getElementById('start-brain').addEventListener('click', startBrain);

}

//************** Sets the 'start' state of the initiliased board

function startNewGame() {
    score = 0;
    boxes.forEach(function (square) {
        square.innerHTML = EMPTY;
    });
}


// buildBlockSelector() appends the selectBlock <div>
// In the final version I want to input blocks, but for now I will replicate Woody
function buildBlockSelector() {
    for (let i = 0; i < 3; i++) {
        let selectBlockImage = document.createElement('img');
        let specificBlock = chooseRandomBlock();

        document.getElementById('block-selector').appendChild(selectBlockImage)
        selectBlockImage.src = `./images/${specificBlock}.png`;
        selectBlockImage.className = specificBlock; //className is used to control 
        selectBlockImage.id = 'selector-box-' + i;
        selectBlockImage.addEventListener('click', blockSelected);
        selectBlockImage.addEventListener('click', blockSelectedVirtual);

    };
};

// Detects with block has been selected
function blockSelected() {
    let clickedBlock = this.className;
    clickedBlockSelectorID = this.id;
    // blocks is the object in blocks.js which contains all possible blocks
    block = blocks[clickedBlock]; 
};

// Once three blocks have been placed, resets block selector with three new random blocks
function resetBlockSelector() {
    if (reset >= 3) {
        let blockSelector = document.getElementById('block-selector')
        while (blockSelector.firstChild) {
            blockSelector.removeChild(blockSelector.firstChild);
        }
        buildBlockSelector();
        reset = 0;
        //countMarkedCells();
    };
};

// ******** Check if columns or rows should be cleared - called every time a block is placed 

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
};

// Called by clear() - return set of cells that meet criteria
function contains(selector, text) {
    var elements = document.querySelectorAll(selector);
    return [].filter.call(elements, function (element) { return RegExp(text).test(element.textContent); });
};

// Takes two numbers as an input and will return a correctly formatted class string e.g. 'col2 .row3'
export function classNameString(colNum, rowNum) {
    return '.col' + colNum + '.row' + rowNum;
};

// ******* Sets cells based on processBlock, updates moves and checks the clear criteria 
export function set(colNum, rowNum) {
    //Use the classNameString() function to complete the cell with the marker
    var markCell = document.querySelector(classNameString(colNum, rowNum));
    markCell.innerHTML = marker;
    markCell.setAttribute('id', 'marked'); // css can style background - Not actually sure I need to add an X! 
    clear(markCell); // Every time I mark a cell, check if a column or row should be cleared 
    score += 1;
    document.getElementById('score').textContent = 'Score = ' + score; // Why don't we use innerHTML, instead of text content?
}

export function checkEmpty(colNum, rowNum) {
    var checkCell = document.querySelector(classNameString(colNum, rowNum));
    if (checkCell == null) {
        return false;
    }
    if (checkCell.innerHTML !== EMPTY) { //This will error: 'Cannot read property 'innerHTML' of null'
        return false; // If any of the cells are marked then exit function  
    }
    return true;
}

//processBlock gets called when a cell on the board is clicked
function processBlock() {

    var clickedCellCol = parseInt(this.className.substring(3, 4)); // Note that we can't extend beyond a 10x10 square with this approach
    var clickedCellRow = parseInt(this.className.substring(8, 9));

    var col = clickedCellCol // Sort out this descrepancy later 
    var row = clickedCellRow // Sort out this descrepancy later 
    var checkFalse = []; // Used to determine if checkEmpty ever returns 'false' 
    // maybe check block isn't undefined and then catch the error

    if (block == undefined) {
        alert('You need to choose a block');
        return;
    }
    // Check if the required cells are empty 
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
    // If the rquired cells are empty then set them 
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
        console.log('Overlay or Offlay detected in script.js');
        return;
    }
    block = undefined; // Once the block has been set, you need to choose another block 
    document.getElementById(clickedBlockSelectorID).className = null // but you can't choose any that have been set
    document.getElementById(clickedBlockSelectorID).src = '/images/Blank.png'

    //countMarkedCells();
    reset += 1;
    return;
}

init();