const stats = document.getElementById('stats');
const restart = document.getElementById('restart');
let board_size_num = 4; // Переменная для изменения размера доски
let board_size = document.querySelectorAll(".size");
document.addEventListener('keydown', handleKeyPress);

board_size.forEach(size => {
    size.addEventListener("click", function() {
        board_size_num = parseInt(size.textContent[0]);
        console.log(`Выбран размер поля ${board_size_num}`);
        
        restartGame(); // Перезапускаем игру с новым размером доски
    });
});

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
let board = Array.from({ length: board_size_num }, () => 
    Array(board_size_num).fill(0)
);

stats.textContent = `Score: ${score}`;
restart.addEventListener('click', restartGame);

function createBoard() {
    const container = document.querySelector('.game-container');
    const overlay = document.querySelector('#overlay')
    container.innerHTML = ''; 

    const grid = document.createElement('div');
    grid.classList.add(`grid${board_size_num}`);
    container.appendChild(overlay)
    container.appendChild(grid);

    for (let row = 0; row < board_size_num; row++) {
        for (let col = 0; col < board_size_num; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');

            if (board[row][col] !== 0) {
                cell.textContent = board[row][col];
                cell.style.backgroundColor = colors[Math.log2(board[row][col]) - 1];
            }

            grid.appendChild(cell); 
        }
    }
}

function addRandomTile() {
    let emptyCells = [];
    for (let row = 0; row < board_size_num; row++) {
        for (let col = 0; col < board_size_num; col++) {
            if (board[row][col] === 0) emptyCells.push({ row, col });
        }
    }

    if (emptyCells.length > 0) {
        let { row, col } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        board[row][col] = Math.random() > 0.1 ? 2 : 4;
    }
}

function slideRowLeft(row) {
    let filteredRow = row.filter(value => value !== 0);

    while (filteredRow.length < board_size_num) {
        filteredRow.push(0);
    }

    return filteredRow; 
}

function combineRow(row) {
    for (let i = 0; i < row.length - 1; i++) {
        if (row[i] === row[i + 1] && row[i] !== 0) {
            row[i] *= 2;  
            row[i + 1] = 0; 
            score += row[i];
            stats.textContent = `Score: ${score}`;
        }
    }
    return row;
}

function transpose(matrix) {
    const transposed = [];

    for (let colIndex = 0; colIndex < board_size_num; colIndex++) {
        const newRow = []; 
        for (let rowIndex = 0; rowIndex < board_size_num; rowIndex++) {
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
    for (let row = 0; row < board_size_num; row++) {
        board[row] = slideRowLeft(board[row]); 
        board[row] = combineRow(board[row]); 
        board[row] = slideRowLeft(board[row]); 
    }
    addRandomTile();
    createBoard(); 
}

function moveRight() {
    for (let row = 0; row < board_size_num; row++) {
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
    for (let row = 0; row < board_size_num; row++) {
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
    for (let row = 0; row < board_size_num; row++) {
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
    for (let row = 0; row < board_size_num; row++) {
        for (let col = 0; col < board_size_num; col++) {
            if (board[row][col] === 0) {
                return false; 
            }
        }
    }

    for (let row = 0; row < board_size_num; row++) {
        for (let col = 0; col < board_size_num; col++) {
            if (col < board_size_num - 1 && board[row][col] === board[row][col + 1]) {
                return false;
            }
            if (row < board_size_num - 1 && board[row][col] === board[row + 1][col]) {
                return false;
            }
        }
    }

    if (confirm('Game Over, Do you wanna restart game?')) {
        restartGame();
    }

    return true;
}

function restartGame() {
    board = Array.from({ length: board_size_num }, () => 
        Array(board_size_num).fill(0)
    );
    score = 0;
    stats.textContent = `Score: ${score}`;
    addRandomTile();
    addRandomTile();
    createBoard();
}

addRandomTile(); 
addRandomTile();
createBoard();
