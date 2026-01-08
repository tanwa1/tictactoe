// const row = 
// const column =

// 2) List the 8 winning lines (on paper / in comments)

// Rows: (0,1,2) (3,4,5) (6,7,8)
// Cols: (0,3,6) (1,4,7) (2,5,8)
// Diags: (0,4,8) (2,4,6)

const player1 = document.getElementById('player1');
const player2 = document.getElementById('player2');

function gameBoard() {
    let emptyBoard = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];

    return {
        printBoard() {
            console.table(emptyBoard);
        },

        placeMark(row, column, mark) {
            if (row < 0 || row > 2 || column < 0 || column > 2) {
                console.log('Invalid position. Choose row and column between 0 and 2.');
                return false;
            }
            else if (mark !== 'X' && mark !== 'O') {
                console.log('Invalid mark. Choose either X or O.');
                return false;
            }
            else if (emptyBoard[row][column] === '') {
                emptyBoard[row][column] = mark;
                console.log(`Placed ${mark} at row: ${row}, and column: ${column}`);
                return true;
            }

            else {
                console.log('This spot is already taken. Choose another.');
                return false;
            }
        },

        getCell(row, column) {
            return emptyBoard[row][column];
        }

    }
}

// function player() {

// }

function gameController() {
    let currentMark = 'X';
    let gameOver = false;

    return {
        checkWinner(board) {
            const winningLines = [
                //Rows
                [[0, 0], [0, 1], [0, 2]],
                [[1, 0], [1, 1], [1, 2]],
                [[2, 0], [2, 1], [2, 2]],
                //Columns
                [[0, 0], [1, 0], [2, 0]],
                [[0, 1], [1, 1], [2, 1]],
                [[0, 2], [1, 2], [2, 2]],
                //Diagonals
                [[0, 0], [1, 1], [2, 2]],
                [[0, 2], [1, 1], [2, 0]]
            ]

            let lines;

            for (let i = 0; i < winningLines.length; i++) {
                lines = winningLines[i];
                // console.log(lines)

                let pair0 = lines[0];
                let pair1 = lines[1];
                let pair2 = lines[2];

                let firstValue = board.getCell(pair0[0], pair0[1]);
                let secondValue = board.getCell(pair1[0], pair1[1]);
                let thirdValue = board.getCell(pair2[0], pair2[1]);

                if (firstValue === secondValue && firstValue === thirdValue && firstValue !== '') {
                    console.log('Winner: ', firstValue);
                    gameOver = true;
                    return;
                }
            }
            
            let value;
            for (let j = 0; j <= 2; j++){
                for (let k = 0; k <= 2 ; k++) {
                    value = board.getCell(j, k);
                    
                    if (value === ''){
                        console.log('Ongoing');
                        return;
                    }
                }
            }
            console.log('Tie');
            gameOver = true;
            return;
        },
        
        playMove(board, row, col) {
        
             if (gameOver){
                 console.log('Game is Over. Start new game.');
                 return;
             }   
             
            const success = board.placeMark(row, col, currentMark);
            
            if (!success){
                return;
             }
             
             else {
                 this.checkWinner(board);
             }
             
            if(!gameOver){
                currentMark = currentMark === 'X' ? 'O' : 'X';
            }
             
        }
    }
}

const board = gameBoard();
const game = gameController();
board.getCell(0, 2);
game.playMove(board, 0, 0);
game.playMove(board, 0, 1);
game.playMove(board, 1, 1);
game.playMove(board, 2, 2);
game.playMove(board, 2, 2);
game.playMove(board, 2, 0);
game.playMove(board, 0, 2);
game.playMove(board, 1, 0);
board.printBoard();