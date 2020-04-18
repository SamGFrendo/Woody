# Woody

https://guides.github.com/features/mastering-markdown/

Origin of the TicTacToe game - https://codepen.io/vasanthkay/pen/KVzYzG. Can I take this, unpick the logic, and use it as the start of a coding project to determine 'a perfect game' in Woody. 

Logic behind the tictactoe game... 

All code is contained in functions. There are 5 functions;
- init()
- startNewGame()
- win()
- contains()
- set()

The function init() get called when the code is run. init() is also calls startNewGame(). Applying the different sets of classes to the cells is the way the code understands the realtionship between cells, and therefore how it determines the win criteria. 

The function set() is called whenever a cell is clicked. The set() functions calls the win() function on each click to determine if the win criteria have been met. The set() function also sets a cell as being 'X' or 'O'.  

The funcions win() and contains() work together to determine if win criteria have been met. 

The way that the code determines if the win criteria has been met is complicated but quite elegant.  

![console log output](./images/console-log-testClass-and-elements.png)

When we click a cell we look at the set of all cells that could be completed with your turn counter (e.g. 'X' or 'O') to result in a win. We then count how many of this set contain the turn counter. If this = 3 then this turn wins. 

**************************************************************************************************************


First things to do...
1. Make it so there is only X
2. Remove the concept of diagonals 
3. make the grid 5x5 - This will be simple to do - just update the variable. This will allows us to start testing woody object...
    The problem is I can't get these to be the correct height when I do this! 
4. make it so a horrizontal or vertical row dissapears 

Things to do...
1. Find out more detail about the 'this' keyword in functions


I should think about how to create the different shaped block objects 
Woody objects 

blocks

X

XX
XX

XXX
XXX
XXX

Rows... 

XX

XXX

XXXX

XXXXX

columns...

X
X

X
X
X

X
X
X

l-shapes... 

X
XX

X
X
XXXX

XX
 X

XXX
  X
  x

