const gameView = {
    initialize() {
        this.disableBoard(); 
    },

    updateBoard(board) {
        board.forEach((value, index) => {
            const cell = document.getElementById(`cell-${index}`);
            cell.textContent = value; 
        });
    },

    // Show current player's name
    updateCurrentPlayer(player) {
        const currentPlayerName = player === 'X' ? gameModel.player1 : gameModel.player2;
        document.getElementById('current-player').textContent = `Current Player: ${currentPlayerName}`;
    },

    updatePoints(player1Points, player2Points) {
        document.getElementById('player1-points').textContent = player1Points; 
        document.getElementById('player2-points').textContent = player2Points; 
    },

    disableBoard() {
        document.querySelectorAll('.cell').forEach(cell => {
            cell.style.pointerEvents = 'none'; 
        });
    },

    enableBoard() {
        document.querySelectorAll('.cell').forEach(cell => {
            cell.style.pointerEvents = 'auto'; 
        });
    },

    showWinner(player) {
        const winnerName = player === 'X' ? gameModel.player1 : gameModel.player2;
        alert(`${winnerName} wins!`); 
    },

    showTie() {
        alert('It\'s a tie!'); 
    }
};

document.addEventListener('DOMContentLoaded', () => {
    gameView.initialize();
});
