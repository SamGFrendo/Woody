

"use strict"

export {chooseRandomBlock, blocks, createVirtualBoard}

// This successfully creates 10x10 2D array populated with zeros 
function createVirtualBoard(boardSize) {
    
    let virtualBoard = new Array(boardSize); 
  
    // Loop to create 2D array using 1D array 
    for (let i = 0; i < virtualBoard.length; i++) { 
        virtualBoard[i] = []; 
    };      
    // Loop to initilize 2D array elements. 
    for (let i = 0; i < boardSize; i++) { 
        for (let j = 0; j < boardSize; j++) { 
            virtualBoard[i][j] = 0; 
        };
    };
    return virtualBoard;
};


function chooseRandomBlock() {

    let arrBlocks = [
        'squareOne',
        'squareTwo',
        'squareThree',
        //
        'rowTwo',
        'rowThree',
        'rowFour',
        'rowFive',
        //
        'colTwo',
        'colThree',
        'colFour',
        'colFive',
        //
        'L1Three',
        'L2Three',
        'L3Three',
        'L4Three',
        //
        'L1Two',
        'L2Two',
        'L3Two',
        'L4Two'
    ]
    return arrBlocks[Math.round(Math.random() * 18) ]; // remember to only go up to 18;
  
};


/* Sqaures *****************/ 

let blocks = {
    
// 1x1 square
squareOne: [
    [1]
], 
// 2x2 square
squareTwo: [
    [1,1],
    [1,1]
], 
// 3x3 square
squareThree: [
    [1,1,1],
    [1,1,1],
    [1,1,1]
], 
/* Rows *****************/ 
// 2x1 row
rowTwo: [
    [1,1]
], 
// 3x1 row 
rowThree: [
    [1,1,1]
], 
// 4x1 row
rowFour: [
    [1,1,1,1]
], 
// 4x1 row
rowFive: [
    [1,1,1,1,1]
], 
/* Columns *****************/
// 1x2 column
colTwo: [
    [1],
    [1]
], 
// 1x3 column
colThree: [
    [1],
    [1],
    [1]
], 
// 1x4 column
colFour: [
    [1],
    [1],
    [1],
    [1]
], 
// 1x5 column
colFive: [
    [1],
    [1],
    [1],
    [1],
    [1]
], 
/* Columns *****************/
// 3x3 L-shapes
L1Three: [
    [1,0,0],
    [1,0,0],
    [1,1,1]
], 
L2Three: [
    [1,1,1],
    [1,0,0],
    [1,0,0]
], 
L3Three: [
    [1,1,1],
    [0,0,1],
    [0,0,1]
],
L4Three: [
    [0,0,1],
    [0,0,1],
    [1,1,1]
], 
// 2x2 L-shapes
L1Two: [
    [1,0],
    [1,1]
], 
L2Two: [
    [1,1],
    [1,0]
], 
L3Two: [
    [1,1],
    [0,1]
], 
L4Two: [
    [0,1],
    [1,1]
]
};

