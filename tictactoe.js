
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
        },

        reset() {
            emptyBoard = [
                ['', '', ''],
                ['', '', ''],
                ['', '', '']
            ];
        }

    }
}

function gameController() {
    let currentMark = 'X';
    let gameOver = false;

    let playerOne = player('Player One', 'X');
    let playerTwo = player('Player Two', 'O');

    return {

        setPlayers(name1, name2) {
            playerOne = player(name1.trim(), 'X') || 'Player One';
            playerTwo = player(name2.trim(), 'O') || 'Player Two';
        },

        getCurrentMark() {
            return currentMark;
        },

        getPlayerNameForMark(mark) {
            if (mark === 'X') return playerOne.name || 'Player One'
            
            if (mark === 'O') return playerTwo.name || 'Player Two'
            return '';
        },

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

                let pair0 = lines[0];
                let pair1 = lines[1];
                let pair2 = lines[2];

                let firstValue = board.getCell(pair0[0], pair0[1]);
                let secondValue = board.getCell(pair1[0], pair1[1]);
                let thirdValue = board.getCell(pair2[0], pair2[1]);

                if (firstValue === secondValue && firstValue === thirdValue && firstValue !== '') {
                    gameOver = true;
                    return 'Winner: ' + this.getPlayerNameForMark(firstValue);
                }
            }

            let value;
            for (let j = 0; j <= 2; j++) {
                for (let k = 0; k <= 2; k++) {
                    value = board.getCell(j, k);

                    if (value === '') {
                        return '';
                    }
                }
            }
            gameOver = true;
            return 'Tie';
        },

        playMove(board, row, col) {

            if (gameOver) {
                return 'Game is Over. Start new game.';
            }

            const success = board.placeMark(row, col, currentMark)
            if (!success) {
                return "";
            }

            const gameStatus = this.checkWinner(board);

            if (!gameOver) {
                currentMark = currentMark === 'X' ? 'O' : 'X';
            }
            return gameStatus;

        },

        reset() {
            currentMark = 'X';
            gameOver = false;
        }
    }
}

function player(name, mark){
    
    return {
        name,
        mark
    }
}

const renderer = (function displayController() {

    const resetButton = document.getElementById('resetButton');
    const winnerText = document.getElementById('winnerText');
    const playerTurn = document.getElementById('playerTurn');
    const submitButton = document.getElementById('submitButton');
    const playerName1Input = document.getElementById('playerName1');
    const playerName2Input = document.getElementById('playerName2');
    const getDivs = document.querySelectorAll("div.gameBoard div");


    const board = gameBoard();
    const game = gameController();
    let lastResult;

    const updatePlayerTurn = () => {
        const currentMark = game.getCurrentMark();
        const currentName = game.getPlayerNameForMark(currentMark);
        playerTurn.textContent = `${currentName}'s turn (${currentMark})`;
    }

    return {
        render() {
            getDivs.forEach((div) => {
                const rowValue = Number(div.dataset.row);
                const colValue = Number(div.dataset.col);
                div.textContent = board.getCell(rowValue, colValue);
            });
            updatePlayerTurn();
            winnerText.textContent = lastResult || "";

        },

        events() {
        
            getDivs.forEach((div) => {
                div.addEventListener('click', () => {
                    const rowValue = Number(div.dataset.row);
                    const colValue = Number(div.dataset.col);
                    lastResult = game.playMove(board, rowValue, colValue);
                    renderer.render();
                });
            });

            resetButton.addEventListener('click', () => {
                board.reset();
                game.reset();
                lastResult = "";
                renderer.render();    
            });

            submitButton.addEventListener('click', () => {
                const getValue1 = playerName1Input.value;
                const getValue2 = playerName2Input.value;
                game.setPlayers(getValue1, getValue2);
                renderer.render();
            });
        },
        
        init() {
            this.render();
            this.events();
        }
    }

})();

renderer.init();


