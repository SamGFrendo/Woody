
"use strict";

import {set, checkEmpty, N_SIZE, EMPTY, classNameString} from './script.js'
import {blocks} from './blocks.js'

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

// Then get something that programatically places all of the blocks
// Needs to to do 0,1,2 - 0,2,1 - 1,2,0 - 1,0,2 - 2,1,0 - 2,0,1
// I can acheive the above with an array 

// picks up block at 0, places it, moves on etc. It moves top to bottom, left to right

// 1st of all I need to be able to iterate through every variation of placing blocks in 0,1,2 

// I should remove the concept of 'can place' I should just iterate through all variations
// keep track of 'score' or 'invalid' 


// automaticBlockPlacer() is called when [Start BRAIN] is clicked
export function automaticBlockPlacer() {
var t0 = performance.now()  

    console.log('automaticBlockPlacer() called');
    let arrCountMarkedCells = [];
    
    // Need to look at every combination of three blocks - start with just 0,1,2
    // Determine the number of marked cells for each of those combinations 
    // I need to clear the cells after I have counted them 

    //This way, I do all combinations of 0,12
    
        for (let i = 0; i < N_SIZE; i++) {
            for (let j = 0; j < N_SIZE; j++) {
    
                block = blocks[document.getElementById(`selector-box-0`).className];
                automaticProcessBlock(i,j);
                
                for (let k = 0; k < N_SIZE; k++) {
                    for (let l = 0; l < N_SIZE; l++) {

                        block = blocks[document.getElementById(`selector-box-1`).className];
                        automaticProcessBlock(k,l);

                            for (let m = 0; m < N_SIZE; m++) {
                                for (let n = 0; n < N_SIZE; n++) {

                                 block = blocks[document.getElementById(`selector-box-2`).className]; 
                                 automaticProcessBlock(m,n);     
                                 
                                // I think I should create an object to store this info 
                                // I should store cells marked as well as the xy coordiates for every cell
                                // arrCountMarkedCells.push(countMarkedCells());

                                // Should clear cells after counted - then reloop on to the next 
                                // clearAllCells()
                                
                                //******* This is for testing purposes only at this stage */
                                // This has shown me that the DOM doesn't get updated until events are finished
                                /*
                                var r = confirm("Press a button!");
                                if (r == true) {
                                    console.log("You pressed OK!");
                                } else {
                                    return;
                                }
                                */
                                 
                                }

                            }


                    }
                }

                //console.log('cells marked = ' + countMarkedCells());

                // I need to clear all blocks during each iteration, in order for count to be accurate 

        };
    };
    console.log('Array of countMarkedCells after all placed= ', arrCountMarkedCells);

var t1 = performance.now()
console.log("Run through automaticBlockPlacer took " + (t1 - t0) + " milliseconds.")
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
