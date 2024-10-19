let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let player1 = ""; // Name for Player O
let player2 = ""; // Name for Player X
let currentPlayer = ""; // To track the current player's name
let turnO = true; // Player O starts first
let count = 0; // To track the number of moves
let gameOver = false; // To track if the game is over

// Function to ask for player names
const askPlayerNames = () => {
    player1 = prompt("Enter name for Player O:");
    player2 = prompt("Enter name for Player X:");
    currentPlayer = player1; // O starts first
};

// Call the function to ask for names when the page loads
window.onload = askPlayerNames;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const resetGame = () => {
    turnO = true;
    count = 0; // Reset the count
    gameOver = false; // Reset game over status
    enableBoxes();
    msgContainer.classList.add("hide");
    currentPlayer = player1; // Reset to player1 (O)
};

// Add event listeners for each box
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (gameOver) return; // Prevent further moves if the game is over

        if (turnO) {
            box.innerText = "O";
            box.classList.add("o"); // Add class for O
            currentPlayer = player1; // Player O's turn
            turnO = false;
        } else {
            box.innerText = "X";
            box.classList.add("x"); // Add class for X
            currentPlayer = player2; // Player X's turn
            turnO = true;
        }
        box.disabled = true;
        count++; // Increment the count after each move
        checkWinner();
    });
});

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("x", "o"); // Remove color classes
    }
};

const showWinner = (winner) => {
    let winnerName = winner === "O" ? player1 : player2;
    msg.innerText = `Congratulations! Winner is ${winnerName} 🎉`;
    msgContainer.classList.remove("hide");
    disableBoxes();
    gameOver = true; // Mark the game as over
};

const showDraw = () => {
    msg.innerText = "It's a Draw! 😕";
    msgContainer.classList.remove("hide");
    disableBoxes();
    gameOver = true; // Mark the game as over
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if (pos1val !== "" && pos2val !== "" && pos3val !== "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                showWinner(pos1val);
                return; // Stop checking further if a winner is found
            }
        }
    }

    // If count reaches 9 and no winner is found, declare it a draw
    if (count === 9) {
        showDraw();
    }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
