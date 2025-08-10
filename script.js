alert("Welcome to Ashrit's Website");

let boxes = document.getElementsByClassName("box");
let statusBox = document.getElementById("status");
let resultPopup = document.getElementById("result-popup");
let resultMessage = document.getElementById("result-message");
let newGameBtn = document.getElementById("new-game-btn");

const disableBoxes = () => {
    for (let box of boxes) {
        box.style.pointerEvents = "none";
    }
};
const enableBoxes = () => {
    for (let box of boxes) {
        box.style.pointerEvents = "auto";
    }
};

// Winner patterns
let winPattern = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];

const checkWinner = () => {
    for (let pattern of winPattern) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;
        if (pos1 !== '' && pos2 !== '' && pos3 !== '') {
            if (pos1 === pos2 && pos2 === pos3) {
                disableBoxes();
                return pos1; // winner symbol return
            }
        }
    }
    return null; // no winner
};

function isDraw() {
    for (let box of boxes) {
        if (box.innerText === '') {
            return false;
        }
    }
    return true;
}

let text = 'X';

for (let box of boxes) {
    box.addEventListener("click", () => {
        if (box.innerText === '') {
            box.innerText = text;

            if (checkWinner()) {
                resultMessage.innerText = `🎉 Player ${text} Wins!`;
                resultPopup.style.display = "flex";
                disableBoxes();
                return;
            }

            if (isDraw()) {
                resultMessage.innerText = "🤝 It's a Draw!";
                resultPopup.style.display = "flex";
                return;
            }

            text = (text === 'X') ? 'O' : 'X';
            statusBox.innerText = `Player ${text}'s Turn`;
        }
    });
}

let resetbtn = document.getElementById("reset");
resetbtn.addEventListener("click", () => {
    for (let box of boxes) {
        box.innerText = ''; 
        enableBoxes();
    }
    text = 'X';
    statusBox.innerText = `Player ${text}'s Turn`;
});

newGameBtn.addEventListener("click", () => {
    for (let box of boxes) {
        box.innerText = '';
        enableBoxes();
    }
    text = 'X';
    statusBox.innerText = `Player ${text}'s Turn`;
    resultPopup.style.display = "none";
});
