const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const btn3 = document.getElementById("btn3");
const btn4 = document.getElementById("btn4");
const quit = document.getElementById("QuitButton");
const restart = document.getElementById("RestartButton");
const options = document.querySelectorAll(".option");
const dispScore = document.getElementById("score");
let num = document.getElementById("num");
let numero,
  correct,
  score = 0;
let timer;
let duration = 10000;
let wrong = 0;
let isGameOver = false;

nextQuestion();

options.forEach((btn) => {
  btn.addEventListener("click", () => {
    let option = Number(btn.dataset.number);
    checkfb(option);
  });
});

quit.addEventListener("click", () => {
  gameOver();
});

restart.addEventListener("click", () => {
  restartGame();
});

function checkfb(option) {
  if (isGameOver) return;

  clearTimeout(timer);

  if (option === correct) {
    score++;
  } else {
    wrong++;

    if (wrong >= 3) {
      gameOver();
      return;
    }
  }
  dispScore.textContent = score;
  setTimeout(nextQuestion, 800);
}

function startTimer() {
  const bar = document.getElementById("timer-bar");

  bar.style.transition = "none";
  bar.style.width = "100%";
  void bar.offsetWidth;

  bar.style.transition = `width ${duration}ms linear`;
  bar.style.width = "0%";

  clearTimeout(timer);
  timer = setTimeout(timeUp, duration);
}

function nextQuestion() {
  random();
  startTimer();
}

function timeUp() {
  if (isGameOver) return;
  wrong++;
  if (wrong >= 3) {
    gameOver();
    return;
  }
  setTimeout(nextQuestion, 800);
}

function gameOver() {
  isGameOver = true;
  clearTimeout(timer);
  num.textContent = "GAME OVER!";
  console.log("Game Over!");
  options.forEach((btn) => (btn.disabled = true));
}

function restartGame() {
  clearTimeout(timer);

  score = 0;
  wrong = 0;
  isGameOver = false;

  options.forEach((btn) => (btn.disabled = false));

  num.textContent = "";

  nextQuestion();
}

function random() {
  numero = Math.floor(10000 + Math.random() * 90000);

  if (numero % 15 === 0) correct = 3;
  else if (numero % 5 === 0) correct = 2;
  else if (numero % 3 === 0) correct = 1;
  else correct = 4;

  num.textContent = numero;

  console.log("Number:", numero, "Correct Option:", correct);
}
