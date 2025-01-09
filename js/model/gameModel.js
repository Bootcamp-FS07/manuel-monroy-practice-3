const gameModel = {
    player1: '',
    player2: '',
    currentPlayer: 'X', 
    player1Points: 0,
    player2Points: 0,
    board: ['', '', '', '', '', '', '', '', ''], 

    // Switch player turn
    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    },

    // Reset the board to initial state
    resetBoard() {
        this.board = ['', '', '', '', '', '', '', '', '']; // Empty board
        this.currentPlayer = 'X'; // Player 1 starts
    },

    // Check if there is a winner
    checkWinner() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        return winningCombinations.some(combination => {
            const [a, b, c] = combination;
            return this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c];
        });
    },

    // Check if the board is full (a tie)
    isBoardFull() {
        return this.board.every(cell => cell !== '');
    },

    // Update points after a win
    updatePoints() {
        if (this.currentPlayer === 'X') {
            this.player1Points++;
        } else {
            this.player2Points++;
        }
    }
};
