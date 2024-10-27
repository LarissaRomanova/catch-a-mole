// 🐹 🎉 😢
let isGameActive = false;
let score = 0;
let rounds = 3;
let roundTime = 5000;
let timerSeconds = 1000;
let previousPosition;
let seconds = 5;

const startButton = document.getElementById('start-button');
const cells = document.querySelectorAll('.cell');
const scoreElement = document.getElementById('score');
const roundsElement = document.getElementById('rounds');
const messageElement = document.getElementById('message');
const timerElement = document.getElementById('timer');
const timeForRound = '00:05';

// ID таймера, чтобы отменить таймер раунда
let timerId;

//ID интервала, для таймера обратного отчета
let interval;

// Активация/деактивация ячеек игрового поля
const activeCells = (isGameActive) => {
  if (isGameActive) {
    cells.forEach((cell) => {
      cell.style.pointerEvents = 'auto';
    })
  } else {
    cells.forEach((cell) => {
      cell.style.pointerEvents = 'none';
    })
  }
}

// Запуск игры
const startGame = () => {
  isGameActive = true;
  startButton.disabled = true;
  showMole();
  messageElement.textContent = '';
  activeCells(true);
}

// Показать крота
const showMole = () => {
  const randomIndex = getRandomNumber(0, 9);
  if (randomIndex !== previousPosition) {
    cells[randomIndex].textContent = '🐹';
    previousPosition = randomIndex;
  } else {
    showMole();
  } 
}

// Скрыть крота
const hideMole = () => {
  cells[previousPosition].textContent = '';
}

// Генерировать случайное положение крота
const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
}

// Нажатие на ячейку
const handleCellClick = (cell) => {
  
  if(cell.textContent === '🐹') {
    timerElement.textContent = timeForRound;
    score += 1;
    rounds -= 1;
    updateLabels();
    clearTimeout(timerId);
    clearInterval(interval);
       
    if (score > 2) {
      endGame(true);
    } else {
      hideMole();
      showMole();
      countDown();
    }
    
  } else {
    endGame(false);
  }
} 

// Сброс игры
const resetGame = () => {
  score = 0;
  rounds = 3;
  updateLabels();
  hideMole();
  isGameActive = false;
  activeCells(false);  
  clearTimeout(timerId);
  clearInterval(interval);
  timerElement.textContent = '00:00';
}

// Обновление счета и количества раундов
const updateLabels = () => {
  scoreElement.textContent = `Счёт: ${score}`;
  roundsElement.textContent = `Осталось раундов: ${rounds}`;
} 

// Завершение игры
const endGame = (win) => {
  isGameActive = false;
  startButton.disabled = false;
  activeCells(false);
  if(win) {
    alert('Вы выиграли! 🎉');
    messageElement.textContent = 'Вы выиграли! Чтобы начать игру, нажмите кнопку "Старт"!';
    timerElement.textContent = timeForRound;
  } else {
    alert('Вы проиграли! 😢');
    messageElement.textContent = 'Вы проиграли! Чтобы начать игру, нажмите кнопку "Старт"!';
    timerElement.textContent = timeForRound;
  }
  resetGame();
}

// Таймер обратного отчета времени
const updateTime = () => {
  seconds -= 1;
  timerElement.textContent = `00:${seconds.toString().padStart(2, '0')}`;
}

// Визуал таймера обратного отчета
const countDown = () => {
  timerElement.textContent = timeForRound;
  seconds = 5; 
  timerId = setTimeout(() => endGame(false), roundTime);
  interval = setInterval(() => updateTime(seconds), timerSeconds);
} 

// Клик на кнопку старт
startButton.addEventListener('click', () => {
  startGame();
  updateTime();
  countDown();
});

// Клик на любую ячейку
cells.forEach((cell) => {
    cell.addEventListener('click', () => {
      if(isGameActive) {
        handleCellClick(cell);
      }
    })
})