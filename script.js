const grid = document.getElementById('grid');

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
        // Случайным образом выбираем одну из пустых клеток
        let { row, col } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        // Устанавливаем значение 2 или 4
        board[row][col] = Math.random() > 0.1 ? 2 : 4; // 90% вероятность 2, 10% вероятность 4
        createBoard(); // Обновляем отображение игрового поля
    }
}


createBoard();
addRandomTile(); 
addRandomTile(); 