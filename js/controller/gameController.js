const gameController = {
    startGame(event) {
        event.preventDefault();

        // Get player names from the form
        const player1 = document.getElementById('player1').value.trim();
        const player2 = document.getElementById('player2').value.trim();

        // Check if both players entered names
        if (player1 && player2) {
            // Assign names to the players
            gameModel.player1 = player1;
            gameModel.player2 = player2;

            // Update player names and points in the view
            document.getElementById('player1-name').textContent = `Player 1: ${player1}`;
            document.getElementById('player2-name').textContent = `Player 2: ${player2}`;
            gameView.updatePoints(gameModel.player1Points, gameModel.player2Points);

            document.getElementById('players-info').style.display = 'block';
            document.getElementById('start-game').disabled = true;

            // Enable the board so players can interact
            gameView.enableBoard();

            // Start the game
            gameModel.resetBoard(); g
            gameView.updateBoard(gameModel.board);
            gameView.updateCurrentPlayer(gameModel.currentPlayer);

        } else {
            alert('Please enter names for both players.');
        }
    },

    handleCellClick(event) {
        const cellId = event.target.id.split('-')[1];

        if (gameModel.board[cellId] !== '') return;

        // Update the board in the model
        gameModel.board[cellId] = gameModel.currentPlayer;

        // Update the board in the view
        gameView.updateBoard(gameModel.board);

        // Check if there's a winner
        if (gameModel.checkWinner()) {
            setTimeout(() => {
                gameModel.updatePoints();
                gameView.updatePoints(gameModel.player1Points, gameModel.player2Points);
                gameView.showWinner(gameModel.currentPlayer); 
                gameModel.resetBoard();
                gameView.updateBoard(gameModel.board); 
                gameView.updateCurrentPlayer(gameModel.currentPlayer); 
            }, 200);
        } else if (gameModel.isBoardFull()) { 
            setTimeout(() => {
                gameView.showTie();
                gameModel.resetBoard();
                gameView.updateBoard(gameModel.board); 
                gameView.updateCurrentPlayer(gameModel.currentPlayer); 
            }, 200);
        } else {
            gameModel.switchPlayer();
            gameView.updateCurrentPlayer(gameModel.currentPlayer); 
        }
    },

    resetGame() {
        gameModel.resetBoard();
        gameView.updateBoard(gameModel.board);

        gameModel.player1Points = 0;
        gameModel.player2Points = 0;
        gameView.updatePoints(gameModel.player1Points, gameModel.player2Points);

        document.getElementById('player1-name').textContent = '';
        document.getElementById('player2-name').textContent = '';

        gameModel.currentPlayer = 'X';
        gameView.updateCurrentPlayer(gameModel.currentPlayer);

        document.getElementById('start-game').disabled = false;
        document.getElementById('players-info').style.display = 'none';

        document.getElementById('player1').value = '';
        document.getElementById('player2').value = '';

        // Disable the board (make it non-interactive)
        gameView.disableBoard();
    }
};

document.getElementById('players-form').addEventListener('submit', gameController.startGame);
document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('click', gameController.handleCellClick);
});
document.getElementById('reset-button').addEventListener('click', gameController.resetGame);
