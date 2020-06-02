
"use strict";

// importing block means it is immutable... should just move some functions across
import {set, checkEmpty, N_SIZE, EMPTY, classNameString} from './script.js'
import {blocks, createVirtualBoard} from './blocks.js'


let couldBlockBePlaced = false; // assume false, then switch to true 
let selectorId = 0; // Allows iteration through the different cells
let clickedBlockSelectorID;
let brainBlock; // Current mirrors 'block' used in script.js
let virtualBoard; // I think I might have to do this globally 

// countMarkedCells() is called after each turn (e.g. three moves)
// This doesn't work when I'm using the automaticBlockPlacer
export function countMarkedCells() {
    let elements = document.querySelectorAll('td');
    let countMarked = [].filter.call(elements, function(element){return RegExp('X').test(element.textContent);}).length;
    return countMarked;
};


export function blockSelectedVirtual() { 
    let clickedBlock = this.className;
    clickedBlockSelectorID = this.id;
    brainBlock = blocks[clickedBlock]; // This is setting 'brainBlock' which gets passed to processBlockVirtual() 
};


function countMarkedCellsVirtual(arr) {
    let sumOfCells = 0;
    for (let i = 0; i < arr.length; i++) {
        arr[i].forEach (function (element) {
            sumOfCells = sumOfCells + element;  
        });
    }
    return sumOfCells;
};


function clearAllCells() {
    //console.log('clearAllCells() called');
    for (let i = 0; i < N_SIZE; i++) {
        for (let j = 0; j < N_SIZE; j++) {
            // I needed to change the innerHTML and the Attribute so that the background changes! 
            document.querySelector(classNameString(i, j)).innerHTML = EMPTY;
            document.querySelector(classNameString(i, j)).setAttribute('id', '');
        };
    };    
};

// var and function declarations are 'hoisted'! This is why console.log seemed to behave strangely 
export function automaticBlockPlacerTest() {
    
    let virtualBoard = createVirtualBoard(N_SIZE);
    countMarkedCellsVirtual(virtualBoard);
    automaticBlockPlacerVirtual(virtualBoard);
}

// I should make a variation of automaticBlockPlacer() that interacts with the virtual board
// I can use this to test using a different approach to .push() and also test the speed

// Programatically places all of the block combinations 
// Needs to to do 0,1,2 - 0,2,1 - 1,2,0 - 1,0,2 - 2,1,0 - 2,0,1
// I can acheive the above with an array / object? 
// I should remove the concept of 'can place' I should just iterate through all variations
// keep track of 'score' or 'invalid' 

// automaticBlockPlacerVirtual() is called when [Start BRAIN] is clicked
function automaticBlockPlacerVirtual(virtualBoard) {
    //var t0 = performance.now()  

    console.log('automaticBlockPlacerVirtual() called');
    //console.log(virtualBoard);
    let arrCountMarkedCells = [];
    
    for (let i = 0; i < N_SIZE; i++) {
        for (let j = 0; j < N_SIZE; j++) {
            virtualBoard[i][j] = 1;
                    
            for (let k = 0; k < N_SIZE; k++) {
                for (let l = 0; l < N_SIZE; l++) {
                    virtualBoard[k][l] = virtualBoard[k][l] + 1;

                    for (let m = 0; m < N_SIZE; m++) {
                        for (let n = 0; n < N_SIZE; n++) {
                        
                        //This should just change the value 
                        virtualBoard[m][n] = virtualBoard[m][n] + 1;
                        
                        //Playing with virtual board brain.js ln 76 not working... 
                        arrCountMarkedCells.push(countMarkedCellsVirtual(virtualBoard));
                        /*
                        var r = confirm("Press a button!");
                            if (r == true) {
                                console.log("You pressed OK!");
                            } else {
                                return;
                            }  
                        */                                                                       
                        };
                    };
                };
            };    
        };
    }; 
    console.log('Array of countMarkedCells after all placed= ', arrCountMarkedCells);

    // var t1 = performance.now()
    // console.log("Run through automaticBlockPlacer took " + (t1 - t0) + " milliseconds.")
};
    
// You can also speed up for loop: allocate array with 1M elements and in for loop assign values.
// https://dev.to/henryjw/array-map-much-slower-than-for-loop-57if


// I think this function might become redundant / need to change once we move to virtualising things 
// This was linked up to automaticBlockPlacer - but that has now been virtualised
function automaticProcessBlock(colIndex,rowIndex) {

    //console.log('automaticProcessBlock= ', block);
    var col = colIndex; 
    var row = rowIndex;

    var checkFalse = []; // Used to determine if checkEmpty() ever returns 'false' 

    if (brainBlock == undefined) {
        alert('You need to choose a block');
        return;
    }

    // ** Check if the required cells are empty **
    for (var i = 0; i < brainBlock.length; i++) { 
        for (var j = 0; j < brainBlock[i].length; j++) {
            if (brainBlock[i][j] == 1) {
                checkFalse.push(checkEmpty(col, row));
            }
            col += 1; 
        }
        row += 1
        col = col - brainBlock[0].length  
    }

    // ** If the rquired cells are empty then set them **
    col = colIndex;
    row = rowIndex;

    if (checkFalse.every(Boolean)) {
        for (var i = 0; i < brainBlock.length; i++) { 
            for (var j = 0; j < brainBlock[i].length; j++) {
                if (brainBlock[i][j] == 1) {
                    set(col, row); 
                    couldBlockBePlaced = true;
                }
                col += 1; 
            }
            row += 1
            col = col - brainBlock[0].length 
        }
    } else {
        //console.log('Overlay or Offlay detected');
        couldBlockBePlaced = false;
        return;
    }
    return;
}

export function initVirtualBoard() {
    virtualBoard = createVirtualBoard(N_SIZE);
};

// This function should return the clicked cells - and call all the required functions to set the virtual board
// It should get called when the cell on the board is clicked 


export function processBlockVirtual() {

    let clickedCellCol = parseInt(this.className.substring(3, 4)); // Note that we can't extend beyond a 10x10 square with this approach
    let clickedCellRow = parseInt(this.className.substring(8, 9));
    
    let col = clickedCellCol // Sort out this descrepancy later 
    let row = clickedCellRow // Sort out this descrepancy later 
    let checkFalse = []; // Used to determine if checkEmpty ever returns 'false' 
    // maybe check block isn't undefined and then catch the error

    if (brainBlock == undefined) { // get set to undefined by the other function - might not need it here as well 
        alert('You need to choose a block');
        return;
    }

    /* Look into implementing checkEmpty on the virutal board
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
    */

    // If the rquired cells are empty then set them 
    col = clickedCellCol; // Need to reset because of the above line - doesn't feel elegant 
    row = clickedCellRow;

    if (/*checkFalse.every(Boolean)*/ true) { // update this later - currently not calling checkEmpty
        for (var i = 0; i < brainBlock.length; i++) { 
            for (var j = 0; j < brainBlock[i].length; j++) {
                if (brainBlock[i][j] == 1) {
                    // This fails is there is offlay 
                    virtualBoard[row][col] = 1; // This sets the value of the array based on brainBlock
                    clearVirtual(row, col);
                }
                col += 1; 
            }
            row += 1
            col = col - brainBlock[0].length 
        }
    } else {
        console.log('Overlay or Offlay detected');
        return;
    }
    brainBlock = undefined; // When I import the block it becomes immutable! 
    //document.getElementById(clickedBlockSelectorID).className = null // won't work in brain.js
    //document.getElementById(clickedBlockSelectorID).src = '/images/Blank.png' // won't work in brain.js

    //countMarkedCells();
    //reset += 1; // won't work in brain.js
    console.log('processBlockVirtual logs virtualBoard ', virtualBoard);
    // call a function to set the real board 
    return;
};


function clearVirtual(checkRow, checkCol) {
    let sumOfRow = 0;
    let sumOfCol = 0;
    let colArray = [];
    // Clear row   
    virtualBoard[checkRow].forEach (function (element) {
        sumOfRow += element;  
    });
    if (sumOfRow == N_SIZE) {
        for (let i = 0; i < N_SIZE; i++) {
            virtualBoard[checkRow][i] = 0;
        };
    }
    // Clear col
    for (let i = 0; i < N_SIZE; i++) {
        colArray.push(virtualBoard[i][checkCol]);
    };
    colArray.forEach (function (element) {
        sumOfCol += element;
    });
    if (sumOfCol == N_SIZE) {
        for (let i = 0; i < N_SIZE; i++) {
            virtualBoard[i][checkCol] = 0;
        };
    };
    /*
    We will want to craete a virtual score - as well as the real score 
    */
};
