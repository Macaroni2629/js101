const readline = require('readline-sync');
const sinon = require("sinon")
const VALID_CHOICES = ['r', 'p', 'sc', "l", "sp", "rock", "paper", "scissors", "lizard", "spock"];

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
  sp: "spock",
  rock: "rock",
  paper: "paper",
  scissors: "scissors",
  lizard: "lizard",
  spock: "spock"
};

let COMBOS = {
  r: ['sc', 'l'],
  p: ['r', 'sp'],
  sc: ['p', 'l'],
  l: ['sp', 'p'],
  sp: ['sc', 'r'],
  rock: ['sc', 'l'],
  paper: ['r', 'sp'],
  scissors: ['p', 'l'],
  lizard: ['sp', 'p'],
  spock: ['sc', 'r'],
};

function translateChoice(choice) {
  if (choice.length === 1) return choice;

  switch (choice) {
    case "rock":
      return "r";
    case "paper":
      return "p";
    case "lizard":
      return "l";
    case "scissors":
      return "sc";
    case "spock":
      return "sp";
  }
}


function determineWinner(choice, computerChoice) {
  console.log(choice, "this is choice inside determineWinner function")
  console.log(computerChoice, "this is computerChoice inside determineWinner funciton")
  console.log(KEY[computerChoice], "this is computer choice inside determineWinner function")
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
    return "Game is over!  It's a tie!";
  }
}

prompt("Welcome to Rock Paper Scissors Lizard Spock!");

while (true) {
  console.clear();
  prompt(`This is round number ${ROUND}.  The score is as follows: user has a score of ${SCORE["user"]}.  Computer has a score of ${SCORE["computer"]}.  Best of ${MAX_ROUNDS} rounds wins! `);

  prompt(`Choose one: rock, paper, scissors, lizard, or spock.`);
  let choice = readline.question();

  while (!VALID_CHOICES.includes(choice)) {
    prompt("That's not a valid choice.  Please choose rock, paper, scissors, lizard or spock. Type 'r' or 'rock' for rock, 'p' or 'paper' for paper, 'sc' or 'scissors' for scissors, 'l' or 'lizard' for lizard, or 'sp' or 'spock' for spock.");
    choice = readline.question();
  }

  let randomIndex = Math.floor(Math.random() * VALID_CHOICES.length);
  let computerChoice = VALID_CHOICES[randomIndex];
  console.log(computerChoice, "this is computer choice")

  choice = translateChoice(choice);
  computerChoice = translateChoice(computerChoice);
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

  while (answer[0] !== 'n' && answer[0] !== 'y') {
    prompt("Please enter y or n");
    answer = readline.question().toLowerCase;
  }

  if (answer[0] !== 'y') break;
}