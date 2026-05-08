const gameBoard = document.getElementById('game-board');
const playerTurnEl = document.getElementById('player-turn');
const messageEl = document.getElementById('message');
const restartBtn = document.getElementById('restart-btn');
const rulesBtn = document.getElementById('rules-btn');

// Modals
const winnerModal = document.getElementById('winner-modal');
const winnerText = document.getElementById('winner-text');
const winnerTitle = document.getElementById('winner-title');
const modalRestartBtn = document.getElementById('modal-restart-btn');

const rulesModal = document.getElementById('rules-modal');
const startGameBtn = document.getElementById('start-game-btn');

let currentPlayer = 'X';
let boards = []; // 9 boards, each with 9 cells
let metaBoard = new Array(9).fill(null);
let validBoardIndices = [];

// Tracker for the last board played by each player
let lastMoveIndexX = null;
let lastMoveIndexO = null;

let gameActive = false; // Start inactive until rules accepted

// Initialize the game
function initGame() {
    gameBoard.innerHTML = '';
    boards = [];
    metaBoard = new Array(9).fill(null);
    currentPlayer = 'X';
    lastMoveIndexX = null;
    lastMoveIndexO = null;

    // Create structure
    for (let i = 0; i < 9; i++) {
        const subBoard = document.createElement('div');
        subBoard.classList.add('sub-board');
        subBoard.dataset.boardIndex = i;

        const boardState = new Array(9).fill(null);
        boards.push(boardState);

        for (let j = 0; j < 9; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.cellIndex = j;
            cell.addEventListener('click', () => handleCellClick(i, j));
            subBoard.appendChild(cell);
        }

        gameBoard.appendChild(subBoard);
    }

    calculateValidBoards();
    updateUI();
    winnerModal.classList.add('hidden');
    gameActive = true;
}

function handleCellClick(boardIndex, cellIndex) {
    if (!gameActive) return;

    if (!validBoardIndices.includes(boardIndex)) {
        flashMessage("Invalid Board");
        return;
    }

    if (boards[boardIndex][cellIndex] !== null) {
        return;
    }

    if (metaBoard[boardIndex] !== null) {
        flashMessage("Board Complete");
        return;
    }

    playMove(boardIndex, cellIndex);
}

function playMove(boardIndex, cellIndex) {
    boards[boardIndex][cellIndex] = currentPlayer;

    if (currentPlayer === 'X') {
        lastMoveIndexX = boardIndex;
    } else {
        lastMoveIndexO = boardIndex;
    }

    const subBoardEl = gameBoard.children[boardIndex];
    const cellEl = subBoardEl.children[cellIndex];
    cellEl.classList.add(currentPlayer.toLowerCase());
    cellEl.classList.add('taken');
    cellEl.textContent = currentPlayer;

    checkSubBoardWin(boardIndex);

    if (checkMetaWin()) {
        endGame(currentPlayer);
        return;
    } else if (isMetaDraw()) {
        endGame('Draw');
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

    calculateValidBoards();
    updateUI();
}

function calculateValidBoards() {
    const bannedIndices = new Set();

    let referenceMoveIndex = null;
    if (currentPlayer === 'X') {
        referenceMoveIndex = lastMoveIndexX;
    } else {
        referenceMoveIndex = lastMoveIndexO;
    }

    addBansForIndex(bannedIndices, referenceMoveIndex);

    validBoardIndices = [];
    for (let i = 0; i < 9; i++) {
        if (!bannedIndices.has(i) && metaBoard[i] === null && !isBoardFull(boards[i])) {
            validBoardIndices.push(i);
        }
    }

    if (validBoardIndices.length === 0) {
        for (let i = 0; i < 9; i++) {
            if (metaBoard[i] === null && !isBoardFull(boards[i])) {
                validBoardIndices.push(i);
            }
        }
    }
}

function addBansForIndex(set, boardIndex) {
    if (boardIndex === null) return;
    const row = Math.floor(boardIndex / 3);
    const col = boardIndex % 3;
    for (let c = 0; c < 3; c++) set.add(row * 3 + c);
    for (let r = 0; r < 3; r++) set.add(r * 3 + col);
}


function checkSubBoardWin(boardIndex) {
    const b = boards[boardIndex];
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    let winner = null;
    for (const pattern of winPatterns) {
        const [a, b_idx, c] = pattern;
        if (b[a] && b[a] === b[b_idx] && b[a] === b[c]) {
            winner = b[a];
            break;
        }
    }

    const subBoardEl = gameBoard.children[boardIndex];

    if (winner) {
        metaBoard[boardIndex] = winner;
        subBoardEl.classList.add('won');
        subBoardEl.setAttribute('data-winner', winner);
    } else if (isBoardFull(b)) {
        metaBoard[boardIndex] = 'D';
        subBoardEl.classList.add('won');
        subBoardEl.setAttribute('data-winner', 'Draw');
    }
}

function isBoardFull(board) {
    return board.every(cell => cell !== null);
}

function checkMetaWin() {
    const b = metaBoard;
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const pattern of winPatterns) {
        const [a, b_idx, c] = pattern;
        if (b[a] && b[a] !== 'D' && b[a] === b[b_idx] && b[a] === b[c]) {
            return true;
        }
    }
    return false;
}

function isMetaDraw() {
    return metaBoard.every(cell => cell !== null);
}

function endGame(winner) {
    gameActive = false;
    setTimeout(() => {
        if (winner === 'Draw') {
            winnerTitle.textContent = "It's a Draw";
            winnerText.textContent = "Game Over";
            winnerText.style.color = "var(--text-secondary)";
        } else {
            winnerTitle.textContent = "Victory!";
            winnerText.textContent = `Player ${winner} Wins!`;
            winnerText.style.color = winner === 'X' ? 'var(--accent-x)' : 'var(--accent-o)';
        }
        winnerModal.classList.remove('hidden');
    }, 500);
}

function updateUI() {
    const allBoards = document.querySelectorAll('.sub-board');
    allBoards.forEach(b => {
        b.classList.remove('active-board', 'banned-board', 'active-x', 'active-o');
    });

    if (!gameActive) return;

    let availableCount = 0;
    allBoards.forEach((b, idx) => {
        if (validBoardIndices.includes(idx)) {
            b.classList.add('active-board');
            b.classList.add(currentPlayer === 'X' ? 'active-x' : 'active-o');
            availableCount++;
        } else {
            b.classList.add('banned-board');
        }
    });

    if (availableCount > 0) {
        if (validBoardIndices.length === 9) {
            messageEl.textContent = "Play Anywhere";
        } else {
            messageEl.textContent = "Select Highlighted";
        }
    } else {
        messageEl.textContent = "Game Over";
    }

    // Update Player Turn Indication
    const playerBadge = playerTurnEl.querySelector('.current-player');
    if (playerBadge) playerBadge.textContent = currentPlayer;

    if (currentPlayer === 'O') {
        document.body.classList.add('check-o');
    } else {
        document.body.classList.remove('check-o');
    }
}

function flashMessage(msg) {
    const original = messageEl.textContent;
    messageEl.textContent = msg;
    messageEl.style.color = '#ef4444';
    setTimeout(() => {
        if (messageEl.textContent === msg) {
            updateUI();
            messageEl.style.color = '';
        }
    }, 1500);
}

// Event Listeners
startGameBtn.addEventListener('click', () => {
    rulesModal.classList.add('hidden');
    initGame();
});

rulesBtn.addEventListener('click', () => {
    rulesModal.classList.remove('hidden');
});

restartBtn.addEventListener('click', initGame);
modalRestartBtn.addEventListener('click', () => {
    winnerModal.classList.add('hidden');
    initGame();
});

// Initial logic: Don't start game immediately, wait for rule modal
// But if user refreshes, maybe show rules again.
// Default state of rulesModal is visible in HTML.
