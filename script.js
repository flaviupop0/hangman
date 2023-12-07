const words = ["car", "wrong", "perfect", "bear", "banana", "cat", "dog", "man", "woman", "life", "table"];
const draws = ["gallows", "head", "body", "rightHarm", "leftHarm", "rightLeg", "leftLeg", "rightFoot", "leftFoot"];
let wrongTries = -1;
let selectedWord = "";
let guessedWord = [];

function updateWordDisplay() {
    const wordDisplay = document.getElementById("word-display");
    wordDisplay.textContent = guessedWord.join(" ");
}

function chooseRandomWord() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    guessedWord = Array(selectedWord.length).fill("_");
    updateWordDisplay();
}

function toggleErrorModal(errorType) {
    const errorModal = new bootstrap.Modal(document.getElementById(errorType));
    errorModal.toggle();
}

function generateLetterButtons() {
    const buttonsContainer = document.querySelector(".buttons");
    const ACode = "A".charCodeAt(0);
    for (let i = 0; i < 26; ++i) {
        const letter = String.fromCharCode(ACode + i);
        const button = document.createElement("button");
        button.innerText = letter;
        button.addEventListener("click", () => makeGuess(letter));
        buttonsContainer.appendChild(button);
    }
}

function makeGuess(letter) {
    const buttonsContainer = document.querySelector(".buttons");
    const buttons = buttonsContainer.querySelectorAll("button");
    let correctGuess = false;
    for (const button of buttons) {
        if (button.innerText === letter) {
            button.disabled = true;
        }
    }
    for (let i = 0; i < selectedWord.length; ++i) {
        if (selectedWord[i].toLowerCase() === letter.toLowerCase()) {
            guessedWord[i] = selectedWord[i];
            correctGuess = true;
        }
    }
    if (correctGuess) {
        updateWordDisplay();
        if (guessedWord.join("").toLowerCase() === selectedWord.toLowerCase()) {
            toggleErrorModal("win");
            disableButtons(buttons, true);
        }
    } else {
        draw(draws[++wrongTries]);
        if (wrongTries >= draws.length - 3) {
            toggleErrorModal("lost");
            changeButtons(buttons, true);
        }
    }
}

function changeButtons(buttons, kind) {
    for (const button of buttons) {
        button.disabled = kind;
    }
}

function draw(part) {
    const canvas = document.getElementById("hangman");
    const context = canvas.getContext("2d");
    switch (part) {
        case "gallows":
            context.strokeStyle = "#444";
            context.lineWidth = 10;
            context.beginPath();
            context.moveTo(175, 225);
            context.lineTo(5, 225);
            context.moveTo(40, 225);
            context.lineTo(25, 5);
            context.lineTo(100, 5);
            context.lineTo(100, 25);
            context.stroke();
            break;
        case "head":
            context.lineWidth = 5;
            context.beginPath();
            context.arc(100, 50, 25, 0, Math.PI * 2, true);
            context.closePath();
            context.stroke();
            break;
        case "body":
            context.beginPath();
            context.moveTo(100, 75);
            context.lineTo(100, 140);
            context.stroke();
            break;
        case "rightHarm":
            context.beginPath();
            context.moveTo(100, 85);
            context.lineTo(60, 100);
            context.stroke();
            break;
        case "leftHarm":
            context.beginPath();
            context.moveTo(100, 85);
            context.lineTo(140, 100);
            context.stroke();
            break;
        case "rightLeg":
            context.beginPath();
            context.moveTo(100, 140);
            context.lineTo(80, 190);
            context.stroke();
            break;
        case "leftLeg":
            context.beginPath();
            context.moveTo(100, 140);
            context.lineTo(125, 190);
            context.stroke();
            break;
    }
}

function resetGame() {
    const buttonsContainer = document.querySelector(".buttons");
    const buttons = buttonsContainer.querySelectorAll("button");
    changeButtons(buttons, false);
    const canvas = document.getElementById("hangman");
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    wrongTries = -1;
    selectedWord = "";
    guessedWord = [];
    chooseRandomWord();
    updateWordDisplay();
}

chooseRandomWord();
generateLetterButtons();
