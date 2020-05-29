
"use strict";

import {set, checkEmpty, N_SIZE, EMPTY, classNameString} from './script.js'
import {blocks, createVirtualBoard} from './blocks.js'

let block;
let couldBlockBePlaced = false; // assume false, then switch to true 
let selectorId = 0; // Allows iteration through the different cells

// countMarkedCells() is called after each turn (e.g. three moves)
// This doesn't work when I'm using the automaticBlockPlacer
export function countMarkedCells() {
    let elements = document.querySelectorAll('td');
    let countMarked = [].filter.call(elements, function(element){return RegExp('X').test(element.textContent);}).length;
    
    return countMarked;
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
                        virtualBoard[m][n] = virtualBoard[k][l] + 1;
                        
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



function automaticProcessBlock(colIndex,rowIndex) {

    //console.log('automaticProcessBlock= ', block);
    var col = colIndex; 
    var row = rowIndex;

    var checkFalse = []; // Used to determine if checkEmpty() ever returns 'false' 

    if (block == undefined) {
        alert('You need to choose a block');
        return;
    }

    // ** Check if the required cells are empty **
    for (var i = 0; i < block.length; i++) { 
        for (var j = 0; j < block[i].length; j++) {
            if (block[i][j] == 1) {
                checkFalse.push(checkEmpty(col, row));
            }
            col += 1; 
        }
        row += 1
        col = col - block[0].length  
    }

    // ** If the rquired cells are empty then set them **
    col = colIndex;
    row = rowIndex;

    if (checkFalse.every(Boolean)) {
        for (var i = 0; i < block.length; i++) { 
            for (var j = 0; j < block[i].length; j++) {
                if (block[i][j] == 1) {
                    set(col, row); 
                    couldBlockBePlaced = true;
                }
                col += 1; 
            }
            row += 1
            col = col - block[0].length 
        }
    } else {
        //console.log('Overlay or Offlay detected');
        couldBlockBePlaced = false;
        return;
    }
    return;
}
