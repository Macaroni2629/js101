const readline = require('readline-sync');
const CHOICES = ['r', 'p', 'sc', "l", "sp"];

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

let COMBOS = {
  r: ['sc', 'l'],
  p: ['r', 'sp'],
  sc: ['p', 'l'],
  l: ['sp', 'p'],
  sp: ['sc', 'r'],
};


function determineWinner(choice, computerChoice) {
  prompt(`You chose ${KEY[choice]}, computer chose ${KEY[computerChoice]}`);

  if (choice === computerChoice) {
    return "Tie";
  } else if (COMBOS[choice].includes(computerChoice)) {
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

function tabulateWinner(winner) {

  switch (winner) {
    case "User":
      SCORE["user"] += 1;
      break;
    case "Computer":
      SCORE["computer"] += 1;
      break;
    // default: // maybe delete this?
    //   break;
  }
}

function determineWinnerOfGame() {
  switch (true) {
    case SCORE["user"] === 3:
      return "Game is over! You win!";
    case SCORE["computer"] === 3:
      return "Game is over! Computer wins!";
    default:
      return "It's a tie!";
  }
}

function getChoice() {
  const ALL_VALID_CHOICES = ['r', 'p', 'sc', "l", "sp", 'rock', 'paper', 'scissors', 'lizard', 'spock'];

  prompt(`Choose one: ${ALL_VALID_CHOICES.join(', ')}`);
  let choice = readline.question().toLowerCase();
  
  while (!ALL_VALID_CHOICES.includes(choice)) {
    prompt("That's not a valid choice.  Please choose rock, paper, scissors, lizard or spock. Type r for rock, p for paper, sc for scissors, l for lizard, or sp for spock.");
    choice = readline.question().toLowerCase();
  }

  if (choice.startsWith('s')) return choice.slice(0, 2);

  return choice[0];
}

prompt("Welcome to Rock Paper Scissors!");

while (true) {
  console.clear();
  prompt(`This is round number ${ROUND}.  The score is as follows: user has a score of ${SCORE["user"]}.  Computer has a score of ${SCORE["computer"]}.  Best of ${MAX_ROUNDS} rounds wins! `);

  let choice = getChoice();

  let randomIndex = Math.floor(Math.random() * CHOICES.length);
  let computerChoice = CHOICES[randomIndex];

  let winner = determineWinner(choice, computerChoice);
  tabulateWinner(winner);
  displayWinner(winner);
  ROUND += 1;

  if (SCORE["user"] === 3 || SCORE["computer"] === 3) {
    let winner = determineWinnerOfGame();
    console.log(winner);
  }
  prompt("Do you want to play again? y for yes and n for no");

  let answer = readline.question().toLowerCase();

  while (!['n', 'no', 'y', 'yes'].includes(answer)) {
    prompt("Please enter y or n");
    answer = readline.question().toLowerCase();
  }

  if (answer[0] !== 'y') break;
}