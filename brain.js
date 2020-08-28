
"use strict";

// importing block means it is immutable... should just move some functions across
import {N_SIZE} from './script.js'
import {blocks, createVirtualBoard} from './blocks.js'


let brainBlock; // Mirrors 'block' used in script.js
let virtualBoard; // This get created by the init() function in script.js
let arrVirtualBoard = [];

// This gets called when I click 'start BRAIN' 
export function startBrain() {
    auto_BlockPlacerVirtual(); // When I get rid of this it goes back to being fine - functions get hoisted 
    let result

    /*
    result = arrVirtualBoard.forEach (function (element){
        JSON.parse(element);
    });
    */
    console.log (result); // I REALLY WANT TO SEE THE BOARDS AS THEY ARE ITERATING - AND I CAN'T FOR THE LOVE
    console.log (arrVirtualBoard);
    // can I JSON.parse the array string? This works! stringify proves it's working!!! Yeeee! 
    // Fucking stringify! I don't get it - I think arrays are mutable objects, so wierd shit was happening! 
    // OF GOD FIGURE OUT WHY I CAN'T! 

}

// I need to automatically set brainBlock, so that I can use to iterate through...
// Do this later when I have auto_BlockPlacerVirtual() working 
export function auto_BlockSelectedVirtual() {

    for (let i = 0; i < 3; i++) {
        // Yep - I should be able to pull the class from this - and do some fancyness to set an array to let automaticBrainBlock = [];
        console.log(document.getElementById(`selector-box-${i}`));
    };
};

function countMarkedCellsVirtual(arr) { // The array received is the 2D virtualBoard array 
    let sumOfCells = 0;
    for (let i = 0; i < arr.length; i++) {
        arr[i].forEach (function (element) {
            sumOfCells += element; 
        });
    }
    return sumOfCells;
};


// Placing the cells, then calculating whether or not it was a good move, should also be separated out


// Programatically places all of the block combinations 
// Needs to to do 0,1,2 - 0,2,1 - 1,2,0 - 1,0,2 - 2,1,0 - 2,0,1
// I can acheive the above with an array / object? 
// I should remove the concept of 'can place' I should just iterate through all variations
// keep track of 'score' or 'invalid' 

// automaticBlockPlacerVirtual() is called when [Start BRAIN] is clicked - via the startBrain() function
// It is causing the virtualBoard to get marked in unusual ways 
function auto_BlockPlacerVirtual() { // I DIDN'T EVEN NEED TO PASSED virtualBoard!!
    
    //var t0 = performance.now()  
    let arrCountMarkedCells = [];
    let arrCountMarkedCellsTriplet = [];
    let auto_virtualBoard = createVirtualBoard(N_SIZE);


    for (let i = 0; i < N_SIZE; i++) {
        for (let j = 0; j < N_SIZE; j++) {           
            for (let k = 0; k < N_SIZE; k++) {
                for (let l = 0; l < N_SIZE; l++) {                   
                    for (let m = 0; m < N_SIZE; m++) {
                        for (let n = 0; n < N_SIZE; n++) {
                            // I could definitely make this logic more efficient - but let's brute force it for now... 
                            if (auto_ProcessBlockVirtual(i, j, 'block1', auto_virtualBoard)){ // returns true if block can be placed
                                arrCountMarkedCellsTriplet.push(countMarkedCellsVirtual(auto_virtualBoard));
                                arrVirtualBoard.push(JSON.stringify(auto_virtualBoard)); 
                                // For some bloody reason stringify is working!! 
                            } else { // returns false if the block cannot be placed
                                arrCountMarkedCellsTriplet.push(null);
                                arrVirtualBoard.push(JSON.stringify(auto_virtualBoard)); 
                            }
                            if (auto_ProcessBlockVirtual(k, l, 'block2', auto_virtualBoard)){
                                arrCountMarkedCellsTriplet.push(countMarkedCellsVirtual(auto_virtualBoard));
                                arrVirtualBoard.push(JSON.stringify(auto_virtualBoard)); 
                            } else {
                                arrCountMarkedCellsTriplet.push(null);
                                arrVirtualBoard.push(JSON.stringify(auto_virtualBoard)); 
                            }
                            if (auto_ProcessBlockVirtual(m, n, 'block3', auto_virtualBoard)){
                                arrCountMarkedCellsTriplet.push(countMarkedCellsVirtual(auto_virtualBoard));
                                arrVirtualBoard.push(JSON.stringify(auto_virtualBoard)); 
                            } else {
                                arrCountMarkedCellsTriplet.push(null);
                                arrVirtualBoard.push(JSON.stringify(auto_virtualBoard)); 
                                
                            }
                            
                            // It does seem the above logic is sound
                            // Each triplet represents the placement of three blocks

                            /*
                            I've figured out what the problem is using the virtualBoard... 
                            It is used in this automaticProcess, but this automatic process, also calls upon non-automatic functions
                            This means that it is set as a global variable, which causes all sorts of issues
                            I need to create automatic versions of each of the check functions etc. (This will allow the virtualBoard to still
                                be updated by interacting with the 'real' board)

                            I should probably try and make it so it isn't a global variable, but rather gets passed between functions
                            That way I (hopefully won't get these wierd console.log behaviour)
                            */

                            arrCountMarkedCells.push(arrCountMarkedCellsTriplet);
                            arrCountMarkedCellsTriplet = [];     
                            JSON.stringify(arrVirtualBoard);

                            // I think this nukes everything because we're calling it at the wrong place
                            // The functions that get called get run first 
                            // virtualBoard = createVirtualBoard(N_SIZE); // Putting this in just nukes everythin after the first iteration


                        //console.log('clear here'); I would want to countMarkedCellsVirtual, and then clear virtual board
                        //Initial clear can just wipe, but in reality I want to go back to to the virtual board in the previous state 
                        //Live/Shadow



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
    console.log('Array of countMarkedCells after function runs = ', arrCountMarkedCells);
    
    //JSON.stringify(arrVirtualBoard);
    // var t1 = performance.now()
    // console.log("Run through automaticBlockPlacer took " + (t1 - t0) + " milliseconds.")
};


// This gets called by automaticBlockPlacerVirtual 
// but brainBlock is undefined at this stage (because nothing has been clicked/set from script.js/DOM - I need to do this virtually)
function auto_ProcessBlockVirtual(colIndex, rowIndex, block, auto_virtualBoard) {


    //console.log('automaticProcessBlock= ', block);
    let col = colIndex; 
    let row = rowIndex;
    let checkFalse = []; // Used to determine if checkEmpty ever returns 'false' 
    let brainBlock = blocks.squareOne;

    console.log('col = ', col, 'row = ', row, block) 

    if (brainBlock == undefined) { 
        // alert('You need to choose a block'); // processBlock creates the alert 
        return;
    }

    // Check if the required cells are empty, so that block can be placed
    for (var i = 0; i < brainBlock.length; i++) { 
        for (var j = 0; j < brainBlock[i].length; j++) {
            if (brainBlock[i][j] == 1) {
                checkFalse.push(auto_checkEmptyVirtual(col, row, auto_virtualBoard)); //checkEmpltyVirtual is just returning true OR false  
            }
            col += 1; 
        }
        row += 1
        col = col - brainBlock[0].length // This doesn't seem that eligant 
    }
    
    // If the required cells are empty then set them 
    col = colIndex; // Need to reset because of the above - this doesn't feel elegant 
    row = rowIndex;

    if (checkFalse.every(Boolean)) { //If checkFalse array is true for all of them, then we can place the block 
        for (var i = 0; i < brainBlock.length; i++) { 
            for (var j = 0; j < brainBlock[i].length; j++) {
                if (brainBlock[i][j] == 1) {
                    // This fails is there is offlay 
                    auto_virtualBoard[row][col] = 1; // This sets the value of the array based on brainBlock
                    auto_clearVirtual(row, col, auto_virtualBoard); // This sees if any columns should be cleared 
                }
                col += 1; 
            }
            row += 1
            col = col - brainBlock[0].length 
        }
    } else {

        //console.log('Overlay or Offlay detected in brain.js');


        return false;


    };
    //brainBlock = undefined; // When I import the block it becomes immutable! // This is needed for setting blocks on the real board


    return true;


};





function auto_checkEmptyVirtual(checkRow, checkCol, auto_virtualBoard) {
    if (checkRow >= N_SIZE || checkCol >= N_SIZE) {
        return false;
    };
    if (auto_virtualBoard[checkCol][checkRow] !== 0) { 
        return false;
    };  
    return true;
};


function auto_clearVirtual(checkRow, checkCol, auto_virtualBoard) {
    let sumOfRow = 0;
    let sumOfCol = 0;
    let colArray = [];
    // Clear row if it is full
    auto_virtualBoard[checkRow].forEach (function (element) {
        sumOfRow += element;  
    });
    if (sumOfRow == N_SIZE) {
        for (let i = 0; i < N_SIZE; i++) {
            auto_virtualBoard[checkRow][i] = 0;
        };
    }
    // Clear col if it is full 
    for (let i = 0; i < N_SIZE; i++) {
        colArray.push(auto_virtualBoard[i][checkCol]);
    };
    colArray.forEach (function (element) {
        sumOfCol += element;
    });
    if (sumOfCol == N_SIZE) {
        for (let i = 0; i < N_SIZE; i++) {
            auto_virtualBoard[i][checkCol] = 0;
        };
    };

    /*
    We will want to create a virtual score - as well as the real score 
    */
};













//************ From this point down we're simply replicating the html board on the virtual board ***************/
//************************************************************************************************************ */

// This gets called by init() in script.js
export function initVirtualBoard() {
    virtualBoard = createVirtualBoard(N_SIZE);
};

// This gets called when selectBlockImage is clicked
export function blockSelectedVirtual() { 
    let clickedBlock = this.className;
    clickedBlockSelectorID = this.id;
    brainBlock = blocks[clickedBlock]; // This is setting 'brainBlock' which gets passed to processBlockVirtual() 
};

// processBlockVirtual() gets called when a cell is clicked (it is also copied as 'automaticProcessBlockVirtual')
// It is the 'virtual' equivalent of processBlock
// This places a block on the Virtual board
export function processBlockVirtual() {

    let clickedCellCol = parseInt(this.className.substring(3, 4)); // Note that we can't extend beyond a 10x10 square with this approach
    let clickedCellRow = parseInt(this.className.substring(8, 9));
    
    let col = clickedCellCol // Sort out this descrepancy later 
    let row = clickedCellRow // Sort out this descrepancy later 
    let checkFalse = []; // Used to determine if checkEmpty ever returns 'false' 
    // maybe check block isn't undefined and then catch the error

    if (brainBlock == undefined) { 
        // alert('You need to choose a block'); // processBlock creates the alert, so I don't need to do it here 
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

    if (checkFalse.every(Boolean)) { 
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

    console.log('virtualBoard logged by processBlockVirtual() = ', virtualBoard);
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


// clearVirtual clears the Rows or Columns if they are full... 
// It get called from processBlockVirtual & automaticProcessBlockVirtual
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
