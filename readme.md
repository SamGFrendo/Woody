# Woody

## Introduction

https://guides.github.com/features/mastering-markdown/

Origin of the TicTacToe game - https://codepen.io/vasanthkay/pen/KVzYzG

I wanted to see if I could take this code, unpick the logic and then use it as the start of a coding project to determine 'a perfect game' in Woody. 

Outline of the logic behind the tictactoe game... 

All code is contained within 5 functions;
- init()
- startNewGame()
- win()
- contains()
- set()

The function init() get called when the code is run. init() then calls startNewGame(). When it is called itit() applies the different sets of classes to the cells. These classes are what the code uses to understand the relationship between cells - this is how it determines the win criteria. 

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

8. I finished up creating woody by making a few tweaks that made it easier for users to follow what was going on. This involved creating a few more global variables, which seemed a bit off - but I didn't want to concern myself too much about this at this stage. Also some faffing with CSS. Next up I want to create a BRAIN. 

## Creating the BRAIN.

1. Having built Woody, I wanted to create a way of playing it programatically - that way I could get testing different approaches and see if I could build a program that would allow me smash my high score. First up I needed a way of knowing how many cells were marked on the board. Having a large number of blank cells after each set of three blocks seemed like a good approach to a winning strategy. 

2. Having created another js file - I realised it made more sense to use the import/export from modules to keep things simple and orgnaised. 

3. The function automaticBlockPlacer() is the start of being able to iterate all the cells on the board, placing different blocks. It looked like it run in 5 thousandths of a milliseconds - but this didn't hold true at scale. 

Interesting point discovered - when I added an 'alert' inside a loop I couldn't see any change in the UI - This is becuase the DOM doesn't get updated while events are happening - https://javascript.info/event-loop. By adding a 'confirm' I could opt out of the loop. 

4. The function clearAllCells() does what it says on the tin. This will allow us to count each different variation of placed cells. The problem with this is that it turns out to be highly inefficient - it's making 100 calls to the DOM browser API. When I use it in combination 

5. Function automaticBlockPlacer() places every possible combination of available blocks. The issue is it takes too long to run! I think we are doing two expensive things; 
- Accessing the DOM via the browser API multiple times. 
- using push() to add elements to an array 

I tried the function with a few different variations. 
a) No clearAllCells() - Calling clearAllCells() was slowing things down a lot. Even though it's needed, I got rid of it for testing
b) No push() - I'm interested to see if this is what is causing things to slow down
c) No automaticProcessBlock() - How fast could it go, if it's not actually doing something - In this case it run in about 0.3 seconds when 10x10. 

I used performance.now() to measure how long the function takes to run.

![function performance](./readme-images/function-performance.png)

automaticBlockPlacer() calls a number of other functions;
- automaticProcessBlock(), which then calls;
- - checkEmpty() and;
- - set() which then calls;
- - - clear();

6. I created a virtual board, the idea being that this will be a more efficient way of processing information. - I may need to extend this, so I can use it to populate the 'real' board.

Using the function automaticBlockPlacerVirtual() I can iterate through the virtual board. This is the time it takes to iterate through, simply adding 1 to the cell and creating an array of a count of all cells 
- 5x5=0.024s
- 6x6=0.032s 
- 7x7=0.061s
- 8x8=0.128s
- 9x9=0.306s
- 10x10=0.699s

Clearly this is way better - but we're not placing blocks yet - and we're not calculating clearing them - so there are a number of function which will slow this down. If we virtualise all of them, 

- processBlockVirtual() - Is working! - it didn't need a setVirtual as it can be done within the function 

7. clearVirtual() function created - allows rows and cols to be cleared on the virtual board. If I add this to the automaticBlockPlacerVirtual how much does it slow things down? 
5x5=0.135s
6x6=0.100s 
7x7=0.132s
8x8=0.318s
9x9=0.612s
10x10=1.609s
We can see that it does start to negatively impact the speed at which we can iterate through the different combinations. I don't think we need to start to worry just yet - but as we add more and more function I could see this getter very slow. 

I think this is probably a dumb way of doing things - we can just moved between a live and shadow board... resetting to the previous state in this way

8. Finally got auto_ProcessBlockVirtual() working with the help of Andy B. The trick was to call all of the functions within the final loop of the next loop. It's easy when you know how. 

Another thing I got stuck on was console logging the array - It kept just going to the last iteration all the way along. I wonder if this is perhaps something along the lines of 'assigned by value' vs 'assigned by position'. - I had a lot of trouble logging the array as it got processed. I finally cracked this by using JSON.stringify. I need to learn more about how arrays function in js. I think I was running in to trouble, as it was only processing/returning the final iteration of the array. Arrays are mutable? Something like this perhaps... need to research. 

9. A bunch of new arrays got things going. I am able to determine the 'best move' ( = one with lowest score after placing all three blocks) by creating an array of all moves, an array of score (reducing the array of score down to sinlets (e.g. move is complete)) and then pulling out the lowest number from the array of score, by then looping through array of score and adding array of moves (at that index) to a new array 'bestMoveArray' I create an array of best moves

10. I managed to move from doing this with a test block to doing it with the actual blocks that are randomly generated in the blocks.js file, when the page loads. 

I've learned that - Math.min is a recursive function and crashes on large arrays 
and
"Function calls are expensive, therefore with really big arrays a simple loop will perform much better than findIndex:"
https://stackoverflow.com/questions/15997879/get-the-index-of-the-object-inside-an-array-matching-a-condition

11. To find the best move I had some fun with arrays - basically I created one which stored all the moves, and another which stored the all the scores. I then found the lowest value from scores array and used that to iterate through scores array, but returned the move from the moves array - creating a new array of the best scores 


*************************************************************************************************

to do... 

-- Actual I think I was just counting the rows/columns wrong 
-- When figuring out where to place a block, it's 'down' then 'right' and remember to add one to the number 

- Then after that I need to figure out the 'live'/'shadow' situation, so I can actually progress in the game

- I think I should also split this file into the next brain-0 version? Maybe? Could be interesting to keep... 

^^^ I CAN ACTUALLY RETURN THE BEST MOVE - My code runs in about 8 seconds on 10x10! Will be longer when I do every combination! 

I can. But, I can only run brain once, I'm not storing the state of the board using 'live'/'shadow', so after I run in once it thinks that the boards is empty again, I tried to resolve this... 
- So by trying to let 'auto_virtualBoard' be replaced with 'virtualBoard' I want to be able to progress through the game


- I think I should be careful about when virtual boards are getting created - it happens on page load AND when I select virtual brain

- What did I I mean by the above ^^^^ It seems like it does only get created on page load... 

- I think another clue why it might not be working is the unexpected Overlay or Offlay I get when a block is placed that disappears 

- Also think of difference between 'let' and 'var' 
- But what is wierd is that console.log is correct? 

- I have a way of having the virtual board effected by what I place on the html board. 
- This is when I'm not doing 'auto' - This is what happens when I actually place the blocks on the board 
- It's seems sometimes what 'virtualBoard' returns on the second step is correct and sometimes it isn't
- When I place a bunch of blocks on the board and press 'start Brain' 'virtualBoard' returns the correct pattern 
-- This is even the case when I add blocks that dissapear 
-- However, while 'virtualBoard' contains the correct pattern after I place cells and run startBrain 'startBrain' acts like the board is empty 

- If I press startBrain twice, 'virtualBoard' is logged as something incorrect the second time! Something is up with running the thing twice... 
This makes sense perhaps? 
Ah hah! I've got a clue in the trail! 
When I press startBrain twice the second print of virtualBoard is simply the first block...
Something is going wrong and things are iterating once to far
... If I figure this out I may have continuous game play going 
So... what happens when I call brain twice which means this happens
- The plot thinkens... it seems, if the first block would dissapear, the second block is placed on VirtualBoard 
- When I place some blocks and then hit startBrain, virtualBoard appears correct, but the calculations act like virtualBoard is empty 
- I think the issue is I'm call function, which then call OTHER functions, which update virtualBoard
- I should check the one that clears etc. I'M ALMOST CERTIAIN THIS IS WHAT IS HAPPENING - TWO STREAMS ARE OVERLAPPING - I'M USING THE SAME FUNCTION IN TWO SLIGHLY DIFFERENT STREAMS THAT SHOULDN'T OVERLAP - I JUST NEED TO CREATE A NEW FUNCTION FOR THESE 
- More clues... When I run the brain three times, what virtualBoard is returning is the pattern of trying to place the 1st and the 2nd blocks, this is obviously different if blocks overlay, or dissapear, or can actually be placed... this is why it somehow seems a big random...

I need to think about the state of things when startBrain finishes running... it appears to go once step to far down the blocks each time it is pressed... 

virtualBoard gets called inside...
processBlockVirtual() 
checkEmptyVirtual()
clearVirtual()

processBlockVirtual() gets called by... 
a cell being clicked 

checkEmptyVirtual() get called by... 
processBlockVirtual 

clearVirtual() gets called by...
processBlockVirtual 

AND running the brain calls...
auto_BlockSelectedVirtual()
auto_BlockPlacerVirtual()

AND
auto_BlockPlacerVirtual() calls...
auto_ProcessBlockVirtual()

AND
auto_ProcessBlackVirtual calls...
auto_clearVirtual()
auto_checkEmptyVirtual()

NEW FLASH
auto_virtualBoard gets reset to be blank INSIDE the 3xloop of auto_BlockPlacerVirtual()
... auto_virtualBoard = createVirtualBoard(N_SIZE); 




Remember 'virtualBoard' doesn't actually return anything, I am simply logging the state of the array when console.log runs (I think)




Never use underscore in variable names - it makes them super difficult to search! 

Now I need to figure out how to do this 'live'/'shadow' business 

BUT I also need to be able to programatically place the blocks in every combination! I'm currently only doing it 1/2/3
This is important because different combinations can open up different possibilities of lower scores, especially when the board has squares filled 

- I can display the best move on the page but it looks messy at the moment (just choose the first 'answer')







Adding the count of marked cells to an array seems to be very quick when I do it virtually 


I should also look at changing how I build the array to be more efficient - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/set 

You can also speed up for loop: allocate array with 1M elements and in for loop assign values.
https://dev.to/henryjw/array-map-much-slower-than-for-loop-57if



## Additional stuff to do 

1. I should add function descriptions to all of the functions

2. I should replace var with let - check i can do this with no problem 

3. I should make it so that clear() results in a fadeout of cells rather than dissapearing... this might be tricky 

4. I should get my head around css grid. Seems like that is the way to go. 

5. Replace '==' with '==='

6. See this - https://levelup.gitconnected.com/javascript-refactoring-tips-making-functions-clearer-and-cleaner-c568c299cbb2

7. Clear up naming - 'marked', 'mark', 'markCell' etc. 

Things to find out a little more about... 
1. The 'this' keyword in functions
2. [].filter
3. Look into 'debugger'
4. Different between innerHTML and textContent 
5. Should a function ALWAYS explicetly 'return'
6. I need to figure out the best way to split a project across multiple files - what are modules?! 
7. Look into codespaces -https://onezero.medium.com/the-future-of-code-is-in-your-browser-2c51a08e8ab2
8. https://medium.com/better-programming/this-visual-studio-code-shortcut-changed-my-life-f6f18be7b1bb 
9. Hoisting - This tripped me up a couple of times - check it out! 


