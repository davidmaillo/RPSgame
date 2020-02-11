// Game rules
let yourOption;
let opponentOption;
let yourScore = 0;
let opponentScore = 0;
let countdown;
let countdownSeconds = 3;

// Elements
let playerText = document.querySelector("#player-text");
let countdownText = document.querySelector("#countdown-text");
let opponentIcon = document.querySelector("#opponent");
let buttons = document.querySelectorAll("button");
let outcome = document.querySelector("#outcome");

const play = option => {
  yourOption = option;
  countdown = countdownSeconds;

  // Disable the interface
  outcome.innerHTML = "";

  buttons.forEach(e => {
    // Emphatize the option what you have chosen (make the other ones a little transparent)
    e.id == yourOption
      ? e.classList.add("optionChosen")
      : e.classList.add("optionNotChosen");

    // Make the option buttons disabled
    e.disabled = true;
  });

  // Show your option in text
  playerText.innerHTML = "You choose " + yourOption;
  playerText.classList.remove("hidden");

  // Display a big text with a countdown
  countdownText.innerHTML = countdown;
  countdownText.classList.remove("hidden");

  startOpponentRoulette();

  let countdownTextInterval = setInterval(() => {
    countdown--;
    countdownText.innerHTML = countdown;

    if (countdown == 0) {
      countdownText.classList.add("hidden");
      clearInterval(countdownTextInterval);
    }
  }, 1000);
};

const startOpponentRoulette = () => {
  let opponentIconOptions = opponentIcon.querySelectorAll(".option");

  // Give opponent a human behavior. Random change his option to look like he's deciding what to choose.
  let changeOpponentIcon = setInterval(() => {
    // Hide all icons
    opponentIconOptions.forEach(e => {
      e.classList.add("hidden");
    });

    // Display one icon randomly every 0.5 seconds
    let random = getRandomNumber(0, 3);
    opponentIconOptions[random].classList.remove("hidden");
    opponentOption = opponentIconOptions[random].id;
  }, 500);

  setTimeout(() => {
    clearInterval(changeOpponentIcon);
    finishGame();
  }, countdownSeconds * 1000);
};

const finishGame = () => {
  // Wait a few seconds to let player watch the result and then enable interface
  setTimeout(() => {
    playerText.classList.add("hidden");

    buttons.forEach(e => {
      e.classList.remove("optionChosen");
      e.classList.remove("optionNotChosen");
      e.disabled = false;
    });
  }, 2000);

  // Add +1 point to winner
  if (yourOption == "paper") {
    if (opponentOption == "paper") addScore("tie");
    else if (opponentOption == "rock") addScore("player");
    else if (opponentOption == "scissors") addScore("opponent");
  }

  if (yourOption == "rock") {
    if (opponentOption == "rock") addScore("tie");
    else if (opponentOption == "scissors") addScore("player");
    else if (opponentOption == "paper") addScore("opponent");
  }

  if (yourOption == "scissors") {
    if (opponentOption == "scissors") addScore("tie");
    else if (opponentOption == "paper") addScore("player");
    else if (opponentOption == "rock") addScore("opponent");
  }
};

const addScore = who => {
  if (who == "player") {
    yourScore++;
    outcome.innerHTML = `<p>You win!</p><p>${globalScore()}</p>`;
  }

  if (who == "opponent") {
    opponentScore++;
    outcome.innerHTML = `<p>You lose!</p><p>${globalScore()}</p>`;
  }

  if (who == "tie") {
    outcome.innerHTML = `<p>Tie!</p><p>${globalScore()}</p>`;
  }
};

const globalScore = () => {
  return `You: ${yourScore} - Opponent: ${opponentScore}`;
};

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};
