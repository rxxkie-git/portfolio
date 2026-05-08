let playerCountSelect, startButton, modeToggle, gameTitle, body, gameArea, controls, statusDiv, boardDiv, scoreAreaDiv, showMenuButton;

let playerCount = 2;
let maxRows, maxNumber;
let currentPlayer = 1;
let currentNumber = 1;
let boardState = [];
let gameMode = 'black-hole';

let threeBgDiv;


document.addEventListener('DOMContentLoaded', () => {
    playerCountSelect = document.getElementById('player-count');
    startButton = document.getElementById('start-button');
    modeToggle = document.getElementById('mode-toggle');
    gameTitle = document.getElementById('game-title');
    body = document.body;
    gameArea = document.getElementById('game-area');
    controls = document.querySelector('.controls');
    statusDiv = document.getElementById('status');
    boardDiv = document.getElementById('game-board');
    scoreAreaDiv = document.getElementById('score-area');
    showMenuButton = document.getElementById('show-menu-button');
    threeBgDiv = document.getElementById('three-bg'); // Cached here
});


function toggleMode() {
    if (modeToggle.checked) {
        gameMode = 'white-hole';
        gameTitle.textContent = 'White Hole Game';
        body.classList.add('white-hole-mode');
    } else {
        gameMode = 'black-hole';
        gameTitle.textContent = 'Black Hole Game';
        body.classList.remove('white-hole-mode');
    }
    setWhiteHoleBackground(gameMode === 'white-hole');
}

function startGame() {
    playerCount = parseInt(playerCountSelect.value);
    controls.style.opacity = '0';
    controls.addEventListener('transitionend', () => {
        controls.classList.add('hidden');
        gameArea.classList.remove('hidden');
        gameArea.style.opacity = '1';
        initializeGame();
    }, { once: true });
    startButton.disabled = true;
}

function returnToMenu() {
    showMenuButton.style.opacity = '0';
    showMenuButton.addEventListener('transitionend', () => {
        showMenuButton.classList.add('hidden');
    }, { once: true });

    gameArea.style.opacity = '0';
    gameArea.addEventListener('transitionend', () => {
        gameArea.classList.add('hidden');
        resetToInitialState();
        controls.classList.remove('hidden');
        controls.style.opacity = '1';
    }, { once: true });
    setWhiteHoleBackground(false);
}

function handleCircleClick(circleId) {
    const circle = boardState[circleId];
    const circleElement = circle.element;

    if (!circleElement || circleElement.classList.contains('disabled')) return;

    if (circle.owner === null) {
        circle.owner = currentPlayer;
        circle.value = currentNumber;
        circleElement.textContent = currentNumber;
        circleElement.classList.add(`p${currentPlayer}`, 'filled');
        if (currentPlayer === playerCount) {
            currentPlayer = 1;
            if (currentNumber < maxNumber) { currentNumber++; }
        } else { currentPlayer++; }
        updateStatus();
        const emptyCircles = boardState.filter(c => c.owner === null);
        if (emptyCircles.length === 1) { endGame(emptyCircles[0]); }
    }
}


function resetToInitialState() {
    modeToggle.checked = false;
    gameMode = 'black-hole';
    gameTitle.textContent = 'Black Hole Game';
    body.classList.remove('white-hole-mode');
    startButton.textContent = "Start Game";
    startButton.disabled = false;
    setWhiteHoleBackground(false);
}

function initializeGame() {
    currentPlayer = 1;
    currentNumber = 1;
    boardState = [];
    boardDiv.innerHTML = '';
    scoreAreaDiv.innerHTML = '';
    scoreAreaDiv.className = '';
    document.querySelectorAll('.circle').forEach(c => {
        c.style.pointerEvents = 'auto';
        c.classList.remove('disabled');
    });
    maxRows = playerCount === 2 ? 6 : 7;
    maxNumber = playerCount === 2 ? 10 : 9;
    createBoard();
    updateStatus();
}

function createBoard() {
    let circleId = 0;
    let boardWidth = maxRows * 60;
    boardDiv.style.width = `${boardWidth}px`;
    boardDiv.style.height = `${maxRows * 55}px`;
    for (let row = 0; row < maxRows; row++) {
        const circlesInRow = row + 1;
        const rowWidth = circlesInRow * 60;
        for (let col = 0; col < circlesInRow; col++) {
            const circle = document.createElement('div');
            circle.classList.add('circle');
            circle.dataset.id = circleId;
            circle.setAttribute('onclick', `handleCircleClick(${circleId})`);
            circle.style.top = `${row * 55}px`;
            circle.style.left = `${(boardWidth - rowWidth) / 2 + col * 60}px`;
            boardState.push({
                id: circleId, row, col, owner: null, value: null, neighbors: [], element: circle
            });
            boardDiv.appendChild(circle);
            circleId++;
        }
    }
    findNeighbors();
}

function findNeighbors() {
    boardState.forEach(c => c.neighbors = []);
    for (let i = 0; i < boardState.length; i++) {
        for (let j = i + 1; j < boardState.length; j++) {
            const c1 = boardState[i];
            const c2 = boardState[j];
            let areNeighbors = false;
            if (c1.row === c2.row && Math.abs(c1.col - c2.col) === 1) { areNeighbors = true; }
            if (Math.abs(c1.row - c2.row) === 1) {
                const upper = c1.row < c2.row ? c1 : c2;
                const lower = c1.row < c2.row ? c2 : c1;
                if (lower.col === upper.col || lower.col === upper.col + 1) { areNeighbors = true; }
            }
            if (areNeighbors) { c1.neighbors.push(c2.id); c2.neighbors.push(c1.id); }
        }
    }
}

function updateStatus() {
    statusDiv.innerHTML = `Player <span class="p${currentPlayer}">${currentPlayer}</span>, place the number: <strong>${currentNumber}</strong>`;
    statusDiv.classList.remove('status-update');
    void statusDiv.offsetWidth;
    statusDiv.classList.add('status-update');
}

async function endGame(finalHole) {
    const holeElement = finalHole.element;

    if (gameMode === 'white-hole') {
        holeElement.classList.add('white-hole');
        statusDiv.innerHTML = "<strong>Game Over! A White Hole appears!</strong>";
    } else {
        holeElement.classList.add('black-hole');
        statusDiv.innerHTML = "<strong>Game Over! A Black Hole appears!</strong>";
    }

    document.querySelectorAll('.circle').forEach(c => c.classList.add('disabled'));
    const neighborElements = [];
    for (const neighborId of finalHole.neighbors) {
        const neighbor = boardState[neighborId];
        if (neighbor.owner !== null) {
            const nElement = neighbor.element;
            neighborElements.push(nElement);
            const bhRect = holeElement.getBoundingClientRect();
            const nRect = nElement.getBoundingClientRect();
            const dx = (bhRect.left + bhRect.width / 2) - (nRect.left + nRect.width / 2);
            const dy = (bhRect.top + bhRect.height / 2) - (nRect.top + nRect.height / 2);
            nElement.style.setProperty('--dx', `${dx}px`);
            nElement.style.setProperty('--dy', `${dy}px`);
            nElement.classList.add('suck-in');
        }
    }

    await new Promise(resolve => setTimeout(resolve, 1000));

    const scores = Array(playerCount).fill(0);
    finalHole.neighbors.forEach(neighborId => {
        const neighbor = boardState[neighborId];
        if (neighbor.owner !== null) { scores[neighbor.owner - 1] += neighbor.value; }
    });

    scoreAreaDiv.className = 'results-card';
    scoreAreaDiv.innerHTML = '<h3>Final Scores:</h3>';
    const scoreLines = [];
    let winners = [];

    if (gameMode === 'black-hole') {
        let minScore = Infinity;
        for (let i = 0; i < playerCount; i++) {
            scoreLines.push(`Player <span class="p${i + 1}">${i + 1}</span>: ${scores[i]}`);
            if (scores[i] < minScore) { minScore = scores[i]; winners = [i + 1]; }
            else if (scores[i] === minScore) { winners.push(i + 1); }
        }
    } else {
        let maxScore = -1;
        for (let i = 0; i < playerCount; i++) {
            scoreLines.push(`Player <span class="p${i + 1}">${i + 1}</span>: ${scores[i]}`);
            if (scores[i] > maxScore) { maxScore = scores[i]; winners = [i + 1]; }
            else if (scores[i] === maxScore && scores[i] >= 0) { winners.push(i + 1); }
        }
    }

    for (let i = 0; i < scoreLines.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 400));
        const lineDiv = document.createElement('div');
        lineDiv.classList.add('score-line');
        lineDiv.innerHTML = scoreLines[i];
        scoreAreaDiv.appendChild(lineDiv);
    }

    await new Promise(resolve => setTimeout(resolve, 500));
    const winnerDiv = document.createElement('div');
    winnerDiv.classList.add('winner-text');
    winnerDiv.innerHTML = `Player <span class="p${winners.join(' p')}">${winners.join(' & ')}</span> wins!`;
    scoreAreaDiv.appendChild(winnerDiv);

    for (const nElement of neighborElements) {
        nElement.classList.remove('suck-in');
        nElement.classList.add('pop-out');
    }

    await new Promise(resolve => setTimeout(resolve, 800));
    let backBtn = document.createElement('button');
    backBtn.textContent = "Back to Setup";
    backBtn.style.marginTop = "20px";
    backBtn.onclick = () => {
        gameArea.classList.add('hidden');
        controls.classList.remove('hidden');
        controls.style.opacity = '1';
        showMenuButton.classList.add('hidden');
        resetToInitialState();
    };
    scoreAreaDiv.appendChild(backBtn);
}

function setWhiteHoleBackground(active) {
    if (!threeBgDiv) return;
    if (active) {
        threeBgDiv.style.filter = "invert(1) hue-rotate(180deg)";
    } else {
        threeBgDiv.style.filter = "";
    }
}


