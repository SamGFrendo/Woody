
"use strict";

// importing block means it is immutable... should just move some functions across
import {N_SIZE} from './script.js'
import {blocks, createVirtualBoard} from './blocks.js'


let brainBlock; // Mirrors 'block' used in script.js
let virtualBoard; // init() function in script.js calls initVirtualBoard()
// whose only purpose is to create and empty 2D array for virtualBoard
let arrVirtualBoard = []; // Use for testing purposes, so I can what the virtual board actually looks like


// This gets called when I click 'start BRAIN' 
export function startBrain() {
    
    let seeVirtualBoard; // testing purposes - don't delete (yet)
    
    // before calling auto_BlockPlacerVirutal(), I should call auto_BlockSelectedVirtual
    // I should find out what blocks there are on the board, pass them up to this function
    // and then pass then down to auto_BlockPlacerVirtual(block1,block2,block3)
    // they can be passed from there, straight into auto_ProcessBlockVirtual

    let arrBlockSelected = auto_BlockSelectedVirtual();
    //console.log(arrBlockSelected);

    auto_BlockPlacerVirtual(arrBlockSelected);
    
    
    
    /*
    // I created this variable to allow me parse arrVirtualBoard, which is stringified in auto_BlockPlacerVirtual()
    // this is only for testing purposes and can be commented out when not required 
    seeVirtualBoard = arrVirtualBoard.map(function(element) { return JSON.parse(element) });
    console.log ('seeVirtualBoard = ', seeVirtualBoard);
    */

}

// I need to automatically set brainBlock, so that I can use to iterate through...
// Do this later when I have auto_BlockPlacerVirtual() working 
// (I export this function but it's not being used, so I don't think I need to)
export function auto_BlockSelectedVirtual() {

    let arrBlockSelected = [];
    for (let i = 0; i < 3; i++) {
        // Yep - I should be able to pull the class from this - and do some fancyness to set an array to let automaticBrainBlock = [];
        let blockSelected = document.getElementById(`selector-box-${i}`).className
        //console.log(blockSelected);
        arrBlockSelected.push(blockSelected);
    };
    //console.log(arrBlockSelected);
    return arrBlockSelected;
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


// I need to programatically places all of the block combinations 
// Needs to to do 0,1,2 - 0,2,1 - 1,2,0 - 1,0,2 - 2,1,0 - 2,0,1
// I can acheive the above with an array / object? 
// I should remove the concept of 'can place' I should just iterate through all variations
// keep track of 'score' or 'invalid' 

function auto_BlockPlacerVirtual(arr) { 
    
    //var t0 = performance.now()  

    // I should create a new variable that receives the array of blocks selected 
    // I think I meant this to be able to shift through combinations of boxes... 
    // possibly sandwich a function in between this one and startBrain()
    let arrBlockSelected = arr;
    console.log(arrBlockSelected);
    let block1 = arrBlockSelected[0];
    let block2 = arrBlockSelected[1];
    let block3 = arrBlockSelected[2];
    console.log(block1, block2, block3); 
    let auto_virtualBoard = [];
    // We pass auto_virtualBoard to all the functions... it is set to blank every time 'brain' is run
    // What I need to do is make it so that when I click 'start brain' I let auto_virtualBoard = the existing setup
    // I need a way of creating an array (like createVirtualBoard) which actually creates the array from the existing state in the html
    // I currently create the virtual board in the 'blocks' file, so I should probably just do it there... 
    // CAN I JUST MAKE IT EQUAL VIRTUAL BOARD


    ///let auto_virtualBoard = createVirtualBoard(N_SIZE);

    /**** This is where I'm trying to have the board which is calculated from
     * be set to be equal to the board that is created by placing the blocks
     * Something is going wrong - and when 
     */

    // Array is a 'reference type' - This means what I was happening is that there was only one virtualBoard with two things
    // pointing to it 
    // auto_virtualBoard = virtualBoard;

    // Clone the object - = the values of the array... rather than 
    auto_virtualBoard = virtualBoard.map(function(arr) {
        return arr.slice();
    });

    // auto_virtualBoard is being updated with virtualBoard... it is just wrong at this point
    console.log('Virtual board is', JSON.stringify(virtualBoard)); //'auto is ', JSON.stringify(auto_virtualBoard))
    // When I can visualise the virtual board I can see it is updating - but it seems to be updating
    // Incorrectly - Maby it is correct, but then being ignored for some reason? 


    let arrCountMarkedCells = [];
    let arrCountMarkedCellsTriplet = [];
    let arrMove = [];
    let arrMoveTriplet = [];


    for (let i = 0; i < N_SIZE; i++) { // i = rowIndex, j = colIndex, this processes let to right, top to bottom 
        for (let j = 0; j < N_SIZE; j++) {           
            for (let k = 0; k < N_SIZE; k++) {
                for (let l = 0; l < N_SIZE; l++) {                   
                    for (let m = 0; m < N_SIZE; m++) {
                        for (let n = 0; n < N_SIZE; n++) {
                            // I could definitely make this logic more efficient - but let's brute force it for now... 
                            if (auto_ProcessBlockVirtual(i, j, block1, auto_virtualBoard)){ // returns true if block can be placed
                                arrMoveTriplet.push(i, j, block1);
                                arrCountMarkedCellsTriplet.push(countMarkedCellsVirtual(auto_virtualBoard));
                                // arrVirtualBoard.push(JSON.stringify(auto_virtualBoard)); // For testing purposes only 
                            } else { // function will have returned false if the block cannot be placed
                                arrMoveTriplet.push(i, j, block1); // sure I won't have to do this in the final one
                                arrCountMarkedCellsTriplet.push(null);
                                //arrVirtualBoard.push(JSON.stringify(auto_virtualBoard)); // For testing purposes only 
                            }
                            if (auto_ProcessBlockVirtual(k, l, block2, auto_virtualBoard)){
                                arrMoveTriplet.push(k ,l ,block2);
                                arrCountMarkedCellsTriplet.push(countMarkedCellsVirtual(auto_virtualBoard));
                                //arrVirtualBoard.push(JSON.stringify(auto_virtualBoard)); // For testing purposes only 
                            } else {
                                arrMoveTriplet.push(k, l, block2);
                                arrCountMarkedCellsTriplet.push(null);
                                //arrVirtualBoard.push(JSON.stringify(auto_virtualBoard)); // For testing purposes only 
                            }
                            if (auto_ProcessBlockVirtual(m, n, block3, auto_virtualBoard)){
                                arrMoveTriplet.push(m, n, block3);
                                arrCountMarkedCellsTriplet.push(countMarkedCellsVirtual(auto_virtualBoard));
                                //arrVirtualBoard.push(JSON.stringify(auto_virtualBoard)); // For testing purposes only 
                            } else {
                                arrMoveTriplet.push(m, n, block3);
                                arrCountMarkedCellsTriplet.push(null);
                                //arrVirtualBoard.push(JSON.stringify(auto_virtualBoard)); // For testing purposes only 
                                
                            }

                            // Add the triplet (e.g. 3 block move) to the array 
                            arrCountMarkedCells.push(arrCountMarkedCellsTriplet);
                            // reset the triplets after each iteration 
                            arrCountMarkedCellsTriplet = [];   
                            
                            arrMove.push(arrMoveTriplet);
                            arrMoveTriplet = [];

                            // All three moves are made, then it is nuked. 
                            // This actually works fine

                            auto_virtualBoard = virtualBoard.map(function(arr) {
                                return arr.slice();
                            }); 
                            // Initial clear can just wipe, but in reality I want to go back to to 
                            // the virtual board in the previous state (E.g. live/Shadow)
                            
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

    // arrCountMarkedCells is triplets representing the total count of marked cells after 
    // each block is placed. If the block can't be placed a 'null' is registered 
    console.log('Array of countMarkedCells after function runs = ', arrCountMarkedCells);
    
    // arrMove is triplets representing each move 'block1/2/3' are just holding values
    // so array = [1,3,'squareOne'],[0,3,'squareTwo'],[0,3,'squareTwo']]
    // this should be the name of the block that is placed 
    console.log('Array of Move = ', arrMove);    

    // After the loop above has run and produce a number of arrays, I then process these to determine the best move (perhaps some other stuff)

    // If elements contains a 'null' return 'null'. Otherwise, take the last score from the move
    // This is why we need to work through every variation of the blocks 
    let arrCountMarkedCellsSinglet = []
    arrCountMarkedCells.forEach(function (element) {
        if (element.includes(null)) {
            arrCountMarkedCellsSinglet.push(null)
        }
        else {
            arrCountMarkedCellsSinglet.push(element.slice(-1).pop());
        };
    });
    console.log('Array of countMarkedCellsSinglet = ', arrCountMarkedCellsSinglet);

    // Use of .boolean removes 0's as well as nulls 
    let array = arrCountMarkedCellsSinglet.filter(function (element) {
        return element != null;
      });


    let forLoopMinMax = () => { // This is a new style function call. Revert? Or is this more readable? 
        let min = array[0]
        for (let i = 1; i < array.length; i++) {
          let value = array[i]
          min = (value < min) ? value : min
        }
        return [min]
      };

    // For a 3x3 square this isn't returning zero
    let [arrCMCSmin] = forLoopMinMax()
    console.log('Minimum value = ', arrCMCSmin) 

    // I really like this bit of coding!! Real breakthrough way of getting to arrays to 'interact'
    // Loop through array 1 and if it returns true (it is the smallest value),
    // then take the value of array 2 and push it to a new array 

    let bestMoveArray = []

    for (let i = 0; i < arrCountMarkedCellsSinglet.length; i++) { 
        if (arrCountMarkedCellsSinglet[i] === arrCMCSmin) {
            bestMoveArray.push(arrMove[i]);
        };
    };

    console.log('the array with all the best moves is = ', bestMoveArray)

    //document.getElementById('best-move').textContent = bestMoveArray[0]; // This looks shit not being formatted but can be done




    // var t1 = performance.now()
    // console.log("Run through automaticBlockPlacer took " + (t1 - t0) + " milliseconds.")
};



// This gets called by autoBlockPlacerVirtual 
// but brainBlock is undefined at this stage (because nothing has been clicked/set from script.js/DOM - I need to do this virtually)
function auto_ProcessBlockVirtual(rowIndex, colIndex, block, auto_virtualBoard) {
    // I pass 'block' just as a test currently from auto_BlockPlacerVirtual(), but I could pass the real thing... 

    //console.log('automaticProcessBlock= ', block);

    let col = colIndex; 
    let row = rowIndex;
    let checkFalse = []; // Used to determine if checkEmpty ever returns 'false' 
    let brainBlock = blocks[block]; //Had to use square bracked notation instead of dot notation

    // We get past a block, don't hard code it... 
    // should be doing something like, let brainBlock = blocks.block

    //console.log('col = ', col, 'row = ', row, block) 

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
    We will want to create a virtual score - as well as the real score (maybe)
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
    let clickedBlockSelectorID = this.id; // strange that this isn't being used 
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
                    clearVirtual(row, col); // clear virtual just checks if cells should be cleared 
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

    return;
}


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
