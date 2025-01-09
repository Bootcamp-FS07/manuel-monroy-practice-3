// Initialize game variables for players and game state
let player1 = '';
let player2 = '';
let currentPlayer = 'X';  // Player 'X' starts the game
let player1Points = 0;
let player2Points = 0;

// Get references to the DOM elements for the game board and player info
const cells = document.querySelectorAll('.cell'); 
const currentPlayerDisplay = document.getElementById('current-player'); 
const startGameButton = document.getElementById('start-game');
const gameBoard = document.getElementById('game-board'); 
const resetButton = document.getElementById('reset-button'); 
const player1NameDisplay = document.getElementById('player1-name'); 
const player2NameDisplay = document.getElementById('player2-name'); 
const player1PointsDisplay = document.getElementById('player1-points'); 
const player2PointsDisplay = document.getElementById('player2-points'); 

// Handle form submission to start the game with player names
document.getElementById('players-form').addEventListener('submit', function (event) {
    event.preventDefault(); 

    // Get player names from the input fields
    player1 = document.getElementById('player1').value.trim();
    player2 = document.getElementById('player2').value.trim();

    // Check if both players have entered names
    if (player1 && player2) {
        // Display player names and initial points
        player1NameDisplay.textContent = `Player 1: ${player1}`;
        player2NameDisplay.textContent = `Player 2: ${player2}`;
        player1PointsDisplay.textContent = player1Points;
        player2PointsDisplay.textContent = player2Points;

        // Show the game area and hide the "start" button
        document.getElementById('players-info').style.display = 'block';
        startGameButton.disabled = true;

        // Start the game
        updateCurrentPlayer();
        gameBoard.style.pointerEvents = 'auto'; 
    } else {
        alert('Please enter names for both players.');
    }
});

// Update the display to show the current player
function updateCurrentPlayer() {
    if (currentPlayer === 'X') {
        currentPlayerDisplay.textContent = player1; 
    } else {
        currentPlayerDisplay.textContent = player2; 
    }
}

// Handle clicks on game board cells
cells.forEach(cell => {
    cell.addEventListener('click', function () {
        // Prevent clicking on already-filled cells
        if (cell.textContent !== '' || startGameButton.disabled === false) return;

        // Place the current player's mark in the clicked cell
        cell.textContent = currentPlayer;

        // Check for a winner or a tie
        if (checkWinner()) {
            setTimeout(() => {
                // Increase points for the winner and reset the game
                if (currentPlayer === 'X') {
                    player1Points++;
                    alert(`${player1} has won!`);
                } else {
                    player2Points++;
                    alert(`${player2} has won!`);
                }
                updatePoints();
                resetGame();
            }, 200); 
        } else if (isBoardFull()) {
            setTimeout(() => {
                alert('It\'s a tie!');
                resetGame();
            }, 200); 
        } else {
            // Switch to the other player
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            updateCurrentPlayer();
        }
    });
});

// Reset the game when the reset button is clicked
resetButton.addEventListener('click', resetGame);

function resetGame() {
    // Clear all the cells and reset the game state
    cells.forEach(cell => {
        cell.textContent = ''; 
    });
    currentPlayer = 'X'; 
    updateCurrentPlayer(); 
    startGameButton.disabled = false; 
    gameBoard.style.pointerEvents = 'none'; 
}

// Check if the game board is full (i.e., no empty cells left)
function isBoardFull() {
    return [...cells].every(cell => cell.textContent !== ''); 
}

// Check for a winning combination
function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],  
        [0, 3, 6], [1, 4, 7], [2, 5, 8],  
        [0, 4, 8], [2, 4, 6]               
    ];

    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent;
    });
}

// Update the points on the screen
function updatePoints() {
    player1PointsDisplay.textContent = player1Points;
    player2PointsDisplay.textContent = player2Points;
}
