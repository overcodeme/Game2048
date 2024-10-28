const grid = document.getElementById('grid');
document.addEventListener('keydown', handleKeyPress);

let board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];

function createBoard() {
    const grid = document.getElementById('grid');
    grid.innerHTML = ''; 

    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');

            if (board[row][col] !== 0) {
                cell.textContent = board[row][col];
                cell.classList.add(`tile-${board[row][col]}`);
            }

            grid.appendChild(cell);
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




createBoard();
addRandomTile(); 
addRandomTile(); 