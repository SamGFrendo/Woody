

"use strict"

// *********** List of blocks ****************
// create 2D arrays of blocks
/*
//I think I deal with 3 different types to begin with 
1. 2x2 square
2. 4x1 row
3. 3x3 L4 -- This one is going to be tricky because the clicked cell isn't marked 
*/

/* Sqaures *****************/ 

// 1x1 square
let squareOne = [
  [1]
];
// 2x2 square
let squareTwo = [
  [1,1],
  [1,1]
];
// 3x3 square
let squareThree = [
  [1,1,1],
  [1,1,1],
  [1,1,1]
];

/* Rows *****************/ 

// 2x1 row
let rowTwo = [
  [1,1]
];

// 3x1 row 
let rowThree = [
  [1,1,1]
];

// 4x1 row
let rowFour = [
  [1,1,1,1]
];

// 4x1 row
let rowFive = [
  [1,1,1,1,1]
];

/* 
XXXX

XXXXX

/* Columns *****************/

// 1x2 column
let colTwo = [
  [1],
  [1]
];

// 1x3 column
// 1x4 column
let colThree = [
  [1],
  [1],
  [1]
];

// 1x4 column
let colFour = [
  [1],
  [1],
  [1],
  [1]
];

// 1x5 column
let colFive = [
  [1],
  [1],
  [1],
  [1],
  [1]
];

/* Columns *****************/

// 3x3 L-shapes

let L1Three = [
  [1,0,0],
  [1,0,0],
  [1,1,1]
];

let L2Three = [
  [1,1,1],
  [1,0,0],
  [1,0,0]
];

let L3Three = [
  [1,1,1],
  [0,0,1],
  [0,0,1]
];

let L4Three = [
  [0,0,1],
  [0,0,1],
  [1,1,1]
];

// 2x2 L-shapes

let L1Two = [
  [1,0],
  [1,1]
];

let L2Two = [
  [1,1],
  [1,0]
];

let L3Two = [
  [1,1],
  [1,1]
];

let L4Two = [
  [0,1],
  [1,1]
];