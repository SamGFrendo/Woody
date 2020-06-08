
"use strict";

// importing block means it is immutable... should just move some functions across
import {set, checkEmpty, N_SIZE, EMPTY, classNameString} from './script.js'
import {blocks, createVirtualBoard} from './blocks.js'


let couldBlockBePlaced = false; // assume false, then switch to true 
let selectorId = 0; // Allows iteration through the different cells
let clickedBlockSelectorID;
let brainBlock; // Current mirrors 'block' used in script.js
let virtualBoard; // I think I might have to do this globally 

export function initVirtualBoard() {
    virtualBoard = createVirtualBoard(N_SIZE);
};

// countMarkedCells() is called after each turn (e.g. three moves)
// This doesn't work when I'm using the automaticBlockPlacer
// Think I might need to get rid of this function 
export function countMarkedCells() {
    let elements = document.querySelectorAll('td');
    let countMarked = [].filter.call(elements, function(element){return RegExp('X').test(element.textContent);}).length;
    return countMarked;
};

// This is setting the brainBlock - the brain.js version of 'block' 
export function blockSelectedVirtual() { 
    let clickedBlock = this.className;
    clickedBlockSelectorID = this.id;
    brainBlock = blocks[clickedBlock]; // This is setting 'brainBlock' which gets passed to processBlockVirtual() 
};

function countMarkedCellsVirtual(arr) {
    let sumOfCells = 0;
    for (let i = 0; i < arr.length; i++) {
        arr[i].forEach (function (element) {
            sumOfCells = sumOfCells + element; // can put += here
        });
    }
    return sumOfCells;
};

// I will need to clearAllCells virtual - 
// This can perhaps be acheived by just resetting virtualBoard to "[[0,0]]""
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

// This might not be needed - but creates a virtualBoard and kicks things off - could refactor later
export function startBrain() {
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
    // console.log(virtualBoard);
    let arrCountMarkedCells = [];
    
    for (let i = 0; i < N_SIZE; i++) {
        for (let j = 0; j < N_SIZE; j++) {
            //virtualBoard[i][j] = 1;
            processBlockVirtual(i,j);
                    
            for (let k = 0; k < N_SIZE; k++) {
                for (let l = 0; l < N_SIZE; l++) {
                    virtualBoard[k][l] = virtualBoard[k][l] + 1;

                    for (let m = 0; m < N_SIZE; m++) {
                        for (let n = 0; n < N_SIZE; n++) {
                        
                        //This should just change the value 
                        virtualBoard[m][n] = virtualBoard[m][n] + 1;
                        
                        
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
// procesBlockVirtual - can be changed to be automatic 
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



// processBlockVirtual() gets called when a cell is clicked 
export function processBlockVirtual() {

    let clickedCellCol = parseInt(this.className.substring(3, 4)); // Note that we can't extend beyond a 10x10 square with this approach
    let clickedCellRow = parseInt(this.className.substring(8, 9));
    
    let col = clickedCellCol // Sort out this descrepancy later 
    let row = clickedCellRow // Sort out this descrepancy later 
    let checkFalse = []; // Used to determine if checkEmpty ever returns 'false' 
    // maybe check block isn't undefined and then catch the error

    if (brainBlock == undefined) { 
        // alert('You need to choose a block'); processBlock creates the alert 
        return;
    }

    // Check if the required cells are empty 
    for (var i = 0; i < brainBlock.length; i++) { 
        for (var j = 0; j < brainBlock[i].length; j++) {
            if (brainBlock[i][j] == 1) {
                checkFalse.push(checkEmptyVirtual(col, row));  
            }
            col += 1; 
        }
        row += 1
        col = col - brainBlock[0].length // This doesn't seem that eligant 
    }
    

    // If the rquired cells are empty then set them 
    col = clickedCellCol; // Need to reset because of the above line - doesn't feel elegant 
    row = clickedCellRow;

    if (checkFalse.every(Boolean)) { // update this later - currently not calling checkEmpty
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
        console.log('Overlay or Offlay detected in brain.js');
        return;
    }
    brainBlock = undefined; // When I import the block it becomes immutable! 

    console.log('processBlockVirtual logs virtualBoard ', virtualBoard);
    // call a function to set the real board - at some point  

    return;
};

function checkEmptyVirtual(checkRow, checkCol) {
    if (checkRow >= N_SIZE || checkCol >= N_SIZE) {
        return false;
    };
    if (virtualBoard[checkCol][checkRow] !== 0) { 
        return false;
    };  
    return true;
};



function clearVirtual(checkRow, checkCol) {
    let sumOfRow = 0;
    let sumOfCol = 0;
    let colArray = [];
    // Clear row if it is full
    virtualBoard[checkRow].forEach (function (element) {
        sumOfRow += element;  
    });
    if (sumOfRow == N_SIZE) {
        for (let i = 0; i < N_SIZE; i++) {
            virtualBoard[checkRow][i] = 0;
        };
    }
    // Clear col if it is full 
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
