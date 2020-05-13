# Woody

## Introduction

https://guides.github.com/features/mastering-markdown/

Origin of the TicTacToe game - https://codepen.io/vasanthkay/pen/KVzYzG. 

I wanted to see if I could take this code, unpick the logic and then use it as the start of a coding project to determine 'a perfect game' in Woody. 

Outline of the logic behind the tictactoe game... 

All code is contained within 5 functions;
- init()
- startNewGame()
- win()
- contains()
- set()

The function init() get called when the code is run. init() is then calls startNewGame(). When it is called itit() applies the different sets of classes to the cells. In this way the code understands the relationship between cells - this is how it determines the win criteria. 

The function set() is called whenever a cell is clicked. The set() functions calls the win() function on each click to determine if the win criteria have been met. The set() function also sets a cell with the turn marker, 'X' or 'O'.  

The funcions win() and contains() work together to determine if win criteria have been met. 

The way that the code determines if the win criteria has been met is complicated but quite elegant.  

![console log output](./readme-images/console-log-testClass-and-elements.png)

When we click a cell we look at the set of all cells that could be completed with your turn marker (e.g. 'X' or 'O') to result in a win. We then count how many of this set contain the turn counter. The code looks at each win 'set' in turn (e.g. the rows or columns that could result in a win). If this = 3 then this turn wins. --- (This requires more explanation, but is enough for me for now)

The code included some red herrings that made it a little bit harder to unpick. The concepts of a 'cell identifier' / 'score' were not needed for the code to behave correctly, so I removed these. 

## Changes I made to the code 

1. The first thing I did was remove the concept of turns (e.g. 'X' and 'O'). Woody is not a turn based game, so we're not going to need them. 

2. The next thing I did was remove the concept of diagonals. In Woody, only columns and rows are important. 

3. Then I made the grid 5x5. While this isn't as large as the 10x10 grid used in Woody, it will allow me to add the largest object used in woody to the grid (the 5xsquare column, or row). 

4. Next up - a completed row or column shouldn't result in a win - it should clear that row or column... and add to the score. To do this I modified the win() function and changed its name to clear(). I needed to modify the approach to the clear() function so that a column AND and a row would be cleared if the criteria was met for each of them. 

I ran into an issue with the first draft of the clear() function. I hardcode the set() function to be able to set two cells at the same time. This showed that the clear() function would only clear one column, if two columns were completed at the same time. I could simply call it twice (e.g. for each marked cell) to allow it to clear two columns. 

5. I needed to create a new function checkEmpty() which get called ahead of set() and does a check on all of the cells to make sure they are empty. If they are not then we cannot call set(). This solved the 'overlay' function - meaning blocks start to feel a bit more solid. I also check for 'offlay' within the same function. 

6. In order to be able to place different blocks, I created a new function processBlocks() that iterates through the block arrays and determines whether or not to set the cells based on the array content. In order to do this it first calls checkEmpty() and uses an array to store the results of that series of function calls. If every one of those calls is 'true', then the processBlocks() function will then call the set() function. 

![blocks available](./readme-images/blocks.png)

7. Next up was the ability to select blocks. Four new function were needed for this. 

- buildBlockSelector() - This creates the html elements allowing the user to select the blocks. This function calls all the other functions. 
- blockSelected() - sets the blockSelected based on the html element clicked. 
- resetBlockSelector() - If there has been three clicks then refresh the block selector section. 
- chooseRandomBlock() - Returns a random block (string) every time it is called. 

During this process I realised it made sense to create an object to store the block arrays - this made them easier to access. 


*************************************************************************************************

to do... 

1. I also want to make it so you can't click a block twice - I need to capture behaviour if I click without selecting a block 

- I need to change it so I only change after there has been three placements, not three clicks

- I also need to catch the 'no block selected' issue - should set block to 'null' after it has been added. 

- Want to make score bigger... 


2. I should add function descriptions to all of the functions

3. I should replace var with let - check i can do this with no problem 

4. I should make it so that clear() results in a fadeout of cells rather than dissapearing... this might be tricky 

5. I should get my head around css grid. Seems like that is the way to go. 

Things to find out a little more about... 
1. The 'this' keyword in functions
2. [].filter
3. Splitting code across multipe files 
4. Different between innerHTML and textContent 
5. Should a function ALWAYS explicetly 'return'
6. I need to figure out the best way to split a project across multiple files - what are modules?! 



