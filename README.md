# Tic Tac Toe

Vanilla JavaScript Tic Tac Toe (3×3) built with a clean separation between game logic (board + controller) and the DOM/UI renderer.

## Features

- Two-player local play (X vs O)
- Prevents overwriting occupied cells
- Win detection (rows, columns, diagonals)
- Tie detection
- Player name inputs + turn display
- Reset button to start a new game

## How to Run

### Option 1: Open the HTML file

1. Open [index.html](index.html) in your browser (double-click works on most systems).

### Option 2: Use a local server (recommended)

Using VS Code, you can use an extension like “Live Server” to serve the folder and auto-reload.

If you prefer the terminal, run a simple server from the project folder:

- Python: `python3 -m http.server`
- Node: `npx serve`

Then open the printed URL (usually http://localhost:8000).

## How to Play

1. (Optional) Enter names for Player One and Player Two, then click **Submit**.
2. Click a square to place the current player’s mark.
3. The game announces a winner or a tie.
4. Click **Reset** to start over.

## Project Structure

- [index.html](index.html): UI layout (name inputs, 3×3 grid, status text, reset)
- [tictactoe.css](tictactoe.css): Styling
- [tictactoe.js](tictactoe.js):
	- `gameBoard()` factory: owns the 3×3 array and board operations
	- `player()` factory: represents a player as an object (`name`, `mark`)
	- `gameController()` factory: manages turns, win/tie checks, and game state
	- `renderer` module (IIFE): binds DOM events once and re-renders UI from state

## Notes / Possible Improvements

- Disable the board after the game ends (win/tie)
- Highlight the winning line
- Add a computer player (AI) option

## Credits

Built as part of The Odin Project’s Tic Tac Toe project.
