
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

// I DON'T KNOW WHY THIS DOESN'T WORK
function clearAllCells() {
    console.log('Is this function called');
    for (let i = 0; i < N_SIZE; i++) {
        for (let j = 0; j < N_SIZE; j++) {
            console.log('Does the loop get called');
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
    
    let arrCountMarkedCells = [];
    
    // I NEED TO LOOK AT EVERY COMBINATION OF THREE BLOCKS
    // AND THE NUMBER OF MARKED CELLS FOR EACH OF THOSE COMBINATIONS 
    // AND A WAY OF STORING THE COMBINATIONS 
    // I need to clear the cells after I have counted them 

    
    for (let i = 0; i < N_SIZE; i++) {
        for (let j = 0; j < N_SIZE; j++) {

            // Set the block to use based on what is in the first selector 

            // This will error on the next turn because I need to reset selctor 
            block = blocks[document.getElementById(`selector-box-${selectorId}`).className];

            automaticProcessBlock(i,j);
            
            if (couldBlockBePlaced == true) { // get rid of this concept - just iterate through all 
                selectorId += 1;
                if (selectorId > 2) {
                    console.log('cells marked = ' + countMarkedCells());
                    
                    //I think I should create an object to store this info 
                    // I should store cells marked as well as // xy coordiates for every cell
                    arrCountMarkedCells.push(countMarkedCells());
                    console.log('Array of countMarkedCells after all placed= ', arrCountMarkedCells);
                    // Should clear cells after counted - then reloop on to the next 
                    clearAllCells()
                    return;
                }
            }

            // I need to clear all blocks during each iteration, in order for count to be accurate 



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
            
        };
    };
};


function automaticProcessBlock(colIndex,rowIndex) {

    console.log('automaticProcessBlock= ', block);
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
        console.log('Overlay or Offlay detected');
        couldBlockBePlaced = false;
        return;
    }
    return;
}
