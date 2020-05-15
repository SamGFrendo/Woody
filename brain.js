
"use strict";

import {set, checkEmpty, N_SIZE} from './script.js'
import {blocks} from './blocks.js'
// I want to build a brain to play the game

// first up, count the number of filled cells, then do it after each turn (e.g. three moves)

// countFilledCells is called after each turn (e.g. three moves)
export function countMarkedCells() {
    let elements = document.querySelectorAll('td');
    let countMarked = [].filter.call(elements, function(element){return RegExp('X').test(element.textContent);}).length;

    console.log('cells filled = ' + countMarked);
    // test is returning a blank array on first click
};

//Then get something that programatically places all of the cells
//Needs to to do 0,1,2 - 0,2,1 - 1,2,0 - 1,0,2 - 2,1,0 - 2,0,1

// picks up block at 0, places it, moves on etc.
// start of just iterating, marking each of the cells with blockOne
export function automaticBlockPlacer() {
    // I think this should call processBlock... but processBlock is based on 'this' - I could try and replicate it? 
    // I could pass processBlock a parameter - if it has the parameter use it... otherwise use what is passed 

    for (var i = 0; i < N_SIZE -1; i++) {
        for (var j = 0; j < N_SIZE -1; j++) {
            automaticProcessBlock(i,j)
        };
    };
};

let block = blocks.squareOne; //hmmm block is coming back as undefined when I do this 

// Why doesn't this work 
function automaticProcessBlock(colIndex,rowIndex) {
    
    var col = colIndex; // Sort out this descrepancy later 
    var row = rowIndex;

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
                checkFalse.push(checkEmpty(col, row));//This won't work   
            }
            col += 1; 
        }
        row += 1
        col = col - block[0].length // This doesn't seem that eligant 
    }

    // If the rquired cells are empty then set them 
    col = colIndex;
    row = rowIndex;

    if (checkFalse.every(Boolean)) {
        for (var i = 0; i < block.length; i++) { 
            for (var j = 0; j < block[i].length; j++) {
                if (block[i][j] == 1) {
                    set(col, row); // this won't 
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
