let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turn0 = true; // Player 1 starts first
let count = 0; // Count the number of turns taken

const winPatterns = [
  [0, 1, 2], // Row 1
  [0, 3, 6], // Row 2
  [0, 4, 8], // Row 3
  [1, 4, 7], // Column 1
  [2, 5, 8], // Column 2
  [2, 4, 6], // Column 3
  [3, 4, 5], // Diagonal 1
  [6, 7, 8], // Diagonal 2
];

const resetGame = () => {
  turn0 = true; // Reset to Player 1
  count = 0; // Reset the turn count
  enableBoxes(); // Enable all boxes
  msgContainer.classList.add("hide"); // Hide the message container
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turn0) {
      //playerO
      box.innerText = "O"; // Player 1
      turn0 = false; // Switch to Player 2
    } else {
      //playerX
      box.innerText = "X"; // Player 2
      turn0 = true; // Switch to Player 1
    }

    box.Disabled = true; // Disable the clicked box
    count++; // Increment the turn count

    let isWinner = checkWinner(); // Check for a winner
    if (count === 9 && !isWinner) {
      gameDrwa(); // Check for a draw
    }
  });
});

const gameDrwa = () => {
  msg.innerText = "Game was draw!";
  msgContainer.classList.remove("hide"); // Show the message container
  disableBoxes(); // Disable all boxes
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true; // Disable all boxes
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false; // Enable all boxes
    box.innerText = ""; // Clear the box text
  }
};

const showWinner = (winner) => {
  msg.innerText = `${winner} is the winner!`; // Show the winner message
  msgContainer.classList.remove("hide"); // Show the message container
  disableBoxes(); // Disable all boxes
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1val1 = boxes[pattern[0]].innerText; // Get the value of the first box in the pattern
    let pos2val2 = boxes[pattern[1]].innerText; // Get the value of the second box in the pattern
    let pos3val3 = boxes[pattern[2]].innerText; // Get the value of the third box in the pattern
    if (pos1val1 === pos2val2 && pos2val2 === pos3val3 && pos1val1 !== "") {
      // If all three boxes in the pattern have the same value and are not empty
      showWinner(pos1val1); // Show the winner
      return true; // Return true if a winner is found
    }
  }
};

newGameBtn.addEventListener("click", resetGame); // Reset the game when the new game button is clicked
resetBtn.addEventListener("click", resetGame); // Reset the game when the reset button is clicked
