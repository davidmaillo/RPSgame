console.log("Connected");

// Game rules
let yourOption;
let opponentOption;
let yourScore = 0;
let opponentScore = 0;
let countdown;
let countdownSeconds = 3;

// Elements
let playerText = document.querySelector("#player-text");
let bigText = document.querySelector("#big-text");
let opponentIcon = document.querySelector("#opponent");
let buttons = document.querySelectorAll("button");
let outcome = document.querySelector("#outcome");

const play = option => {
  console.log(`You played ${option}`);

  yourOption = option;
  startGame();
};

const startGame = () => {
  countdown = countdownSeconds;

  // Disable the interface
  outcome.innerHTML = "";

  buttons.forEach(e => {
    // Emphatize the option what you have chosen (make the other ones a little transparent)
    if (e.id == yourOption) {
      e.classList.add("optionChosen");
    } else {
      e.classList.add("optionNotChosen");
    }

    // Make the option buttons disabled
    e.disabled = true;
  });

  // Show your option in text
  playerText.innerHTML = "You choose " + yourOption;
  playerText.classList.remove("hidden");

  // Display a big text with a countdown
  bigText.innerHTML = countdown;
  bigText.classList.remove("hidden");

  startOpponentRoulette();

  let bigTextInterval = setInterval(() => {
    countdown--;
    bigText.innerHTML = countdown;

    if (countdown == 0) {
      bigText.classList.add("hidden");
      clearInterval(bigTextInterval);
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
    let random = getRandomNumber(0, 2);
    opponentIconOptions[random].classList.remove("hidden");
    opponentOption = opponentIconOptions[random].id;
  }, 500);

  setTimeout(() => {
    clearInterval(changeOpponentIcon);
    finishGame();
  }, countdownSeconds * 1000);

  console.log(opponentIconOptions);
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
    outcome.innerHTML = `<p>You win!</p><p>You: ${yourScore} - Opponent: ${opponentScore}</p>`;
  }
  if (who == "opponent") {
    opponentScore++;
    outcome.innerHTML = `<p>You lose!</p><p>You: ${yourScore} - Opponent: ${opponentScore}</p>`;
  }

  if (who == "tie") {
    outcome.innerHTML = `<p>Tie!</p><p>You: ${yourScore} - Opponent: ${opponentScore}</p>`;
  }
};

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};
