const readline = require('readline-sync');
const VALID_CHOICES = ["Rock", "Paper", "Scissors", "Lizard", "Spock"];
const COMPUTER_CHOICES = ["r", "p", "sc", "l", "sp"]

let MAX_ROUNDS = 5;

let SCORE = {
  user: 0,
  computer: 0,
};

let ROUND = 1;

function prompt(message) {
  console.log(`=> ${message}`);
}

let KEY = {
  r: "rock",
  p: "paper",
  sc: "scissors",
  l: "lizard",
  sp: "spock"
};

let WIN_CONDITIONS = {
  r: ['sc', 'l'],
  p: ['r', 'sp'],
  sc: ['p', 'l'],
  l: ['sp', 'p'],
  sp: ['sc', 'r'],
};

let CHOICE_MAPPINGS = {
  r: ["r", "rock"],
  p: ["p", "paper"],
  sc: ["sc", "scissors"],
  l: ["l", "lizard"],
  sp: ["sp", "spock"],
}

// iterate through object want access to key and value
function encodeChoice(userInput) {
  for (let key in CHOICE_MAPPINGS) {
    let variations = CHOICE_MAPPINGS[key]
  
    if (variations.includes(userInput)) {
      return key
    }
  }

  return null
}

function determineWinner(choice, computerChoice) {
  prompt(`You chose ${KEY[choice]}, computer chose ${KEY[computerChoice]}`);

  if (choice === computerChoice) {
    return "Tie";
  } else if (WIN_CONDITIONS[choice].includes(computerChoice)) {
    return "User";
  } else {
    return "Computer";
  }
}

function displayWinner(winner) {
  switch (winner) {
    case "User":
      console.log("=> User wins!");
      break;
    case "Computer":
      console.log("=> Computer wins!");
      break;
    default:
      console.log("=> It's a tie!");
  }
}

function updateScores(winner) {

  switch (winner) {
    case "User":
      SCORE["user"] += 1;
      break;
    case "Computer":
      SCORE["computer"] += 1;
      break;
    default:
      break;
  }
}

function determineWinnerOfGame() {
  if (SCORE["user"] === 3) {
    return "Game is over!  You win!";
  } else if (SCORE["computer"] === 3) {
    return "Game is over!  Computer wins!";
  } else {
    return "It's a tie!";
  }
}

prompt("Welcome to Rock Paper Scissors!");

while (true) {
  console.clear();
  prompt(`This is round number ${ROUND}.  The score is as follows: user has a score of ${SCORE["user"]}.  Computer has a score of ${SCORE["computer"]}.  Best of ${MAX_ROUNDS} rounds wins! `);

  prompt(`Choose one: ${VALID_CHOICES.join(', ')}`);
  let userInput = readline.question();

   // Translate user input to internal encoding
  let choice = encodeChoice(userInput.toLowerCase())

  while (choice === null) {
    prompt("That's not a valid choice.  Please choose rock, paper, scissors, lizard or spock. Type r for rock, p for paper, sc for scissors, l for lizard, or sp for spock.");
    userInput = readline.question();
    choice = encodeChoice(userInput.toLowerCase());
  }

 

  // Computer's turn
  let randomIndex = Math.floor(Math.random() * COMPUTER_CHOICES.length);
  let computerChoice = COMPUTER_CHOICES[randomIndex];

  let winner = determineWinner(choice, computerChoice);
  updateScores(winner);
  displayWinner(winner);
  ROUND += 1;

  if (SCORE["user"] === 3 || SCORE["computer"] === 3) {
    let winner = determineWinnerOfGame();
    console.log(winner);
  }
  prompt("Do you want to play again? y for yes and n for no");

  let answer = readline.question().toLowerCase();

  while (answer[0] !== 'n' && answer[0] !== 'y') {
    prompt("Please enter y or n");
    answer = readline.question().toLowerCase;
  }

  if (answer[0] !== 'y') break;
}