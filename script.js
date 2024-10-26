// Найдем контейнер для сетки, который добавили в HTML
const grid = document.getElementById('grid');

// Создадим функцию для инициализации поля
function createBoard() {
    // Очистим сетку на случай, если будем перезагружать поле
    grid.innerHTML = '';
    
    // Создадим 16 клеток (4x4)
    for (let i = 0; i < 16; i++) {
        // Создаем элемент div для каждой ячейки
        const cell = document.createElement('div');
        cell.classList.add('cell'); // Присваиваем стиль cell из CSS
        cell.textContent = ''; // Оставим текст пустым для начала
        grid.appendChild(cell); // Добавляем ячейку в сетку
    }
}

// Вызовем функцию для отрисовки начального пустого поля
createBoard();