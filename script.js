const stats = document.getElementById('stats');
const restart = document.getElementById('restart')
const grid4 = document.getElementById('grid4');
let board_size = 4; // Переменная для изменения размера доски
document.addEventListener('keydown', handleKeyPress);

const colors = [
    '#EEE4DA', // 2
    '#EDE0C8', // 4
    '#F2B179', // 8
    '#F59563', // 16
    '#F67C5F', // 32
    '#F65E3B', // 64
    '#EDCF72', // 128
    '#EDCC61', // 256
    '#EDC850', // 512
    '#EDC53F', // 1024
    '#EDC22E'  // 2048
];

let score = 0;
let board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
]; // Изменить создание матрицы в зависимости от переменной board_size

stats.textContent = `Score: ${score}`
restart.addEventListener('click', restartGame);

function createBoard() {
    const grid4 = document.getElementById('grid4');
    grid4.innerHTML = ''; 

    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');

            if (board[row][col] !== 0) {
                cell.textContent = board[row][col];
                cell.style.backgroundColor = colors[Math.log2(board[row][col])-1];
            }

            grid4.appendChild(cell); 
        }
    }
}

function addRandomTile() {
    let emptyCells = [];
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            if (board[row][col] === 0) emptyCells.push({ row, col });
        }
    }

    if (emptyCells.length > 0) {
        let { row, col } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        board[row][col] = Math.random() > 0.1 ? 2 : 4;
        createBoard();
    }
}

function slideRowLeft(row) {
    let filteredRow = row.filter(value => value !== 0);

    while (filteredRow.length < 4) {
        filteredRow.push(0);
    }

    return filteredRow; 
}

function combineRow(row) {
    for (let i = 0; i < row.length - 1; i++) {
        if (row[i] === row[i + 1] && row[i] !== 0) {
            row[i] *= 2;  
            row[i + 1] = 0; 
            score += (row[i] + row[i+1]);
            stats.textContent = `Score: ${score}`
        }
    }
    return row;
}

function transpose(matrix) {
    const transposed = [];

    for (let colIndex = 0; colIndex < 4; colIndex++) {
        const newRow = []; 
        for (let rowIndex = 0; rowIndex < 4; rowIndex++) {
            newRow.push(matrix[rowIndex][colIndex]); 
        }
        transposed.push(newRow); 
    }

    return transposed; 
}

function handleKeyPress(event) {
    switch (event.key) {
        case 'ArrowUp':
            moveUp(); 
            break;
        case 'ArrowDown':
            moveDown();
            break;
        case 'ArrowLeft':
            moveLeft(); 
            break;
        case 'ArrowRight':
            moveRight(); 
            break;
    }
    createBoard();

    isGameOver();
}


function moveLeft() {
    for (let row = 0; row < 4; row++) {
        board[row] = slideRowLeft(board[row]); 
        board[row] = combineRow(board[row]); 
        board[row] = slideRowLeft(board[row]); 
    }
    addRandomTile();
    createBoard(); 
}

function moveRight() {
    for (let row = 0; row < 4; row++) {
        board[row].reverse(); 
        board[row] = slideRowLeft(board[row]);
        board[row] = combineRow(board[row]);
        board[row] = slideRowLeft(board[row]);
        board[row].reverse(); 
    }
    addRandomTile();
    createBoard();
}

function moveUp() {
    board = transpose(board);    
    for (let row = 0; row < 4; row++) {
        board[row] = slideRowLeft(board[row]);
        board[row] = combineRow(board[row]);
        board[row] = slideRowLeft(board[row]);
    }
    board = transpose(board); 
    addRandomTile();
    createBoard();
}

function moveDown() {
    board = transpose(board);  
    for (let row = 0; row < 4; row++) {
        board[row].reverse();  
        board[row] = slideRowLeft(board[row]);
        board[row] = combineRow(board[row]);
        board[row] = slideRowLeft(board[row]);
        board[row].reverse();         
    }
    board = transpose(board);     
    addRandomTile();
    createBoard();
}

function isGameOver() {
    for (let row = 0; row < 4; row ++) {
        for (let col = 0; col < 4; col++) {
            if (board[row][col] === 0) {
                return False
            }
        }
    }

    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col ++) {

            if (board[row][col] === board[row][col+1]) {
                return False
            }

            if (board[row][col] === board[row+1][col]) {
                return False
            }
        }
    }

    if (confirm('Game Over, Do you wanna restart game?')) {
        restartGame()
    }
    
    return True
}


function restartGame() {
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];

    addRandomTile();
    addRandomTile();
    createBoard();
    score = 0
    stats.textContent = `Score: ${score}`
}


createBoard();
addRandomTile(); 
addRandomTile(); 