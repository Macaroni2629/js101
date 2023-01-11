const readline = require('readline-sync');
const VALID_CHOICES = ['rock', 'paper', 'scissors'];

function prompt(message) {
  console.log(`=> ${message}`);
}

function determineWinner(choice, computerChoice) {
  prompt(`You chose ${choice}, computer chose ${computerChoice}`)

  if ((choice === 'rock' && computerChoice === 'scissors') || (choice === 'paper' && computerChoice === 'rock') || (choice === 'scissors' && computerChoice === 'paper')) {
    return "User"
  } else if ((choice === 'rock' && computerChoice === 'paper') || (choice === 'paper' && computerChoice === 'scissors') || (choice === 'scissors' && computerChoice === 'rock')) {
    return "Computer"
  } else {
    return "Tie"
  }
}

function displayWinner(winner) {
  switch(winner) {
    case "User":
      console.log("=> User wins!")
      break;
    case "Computer":
      console.log("=> Computer wins!");
      break;
    default:
      console.log("=> It's a tie!")
  }
}

prompt("Welcome to Rock Paper Scissors!")

while (true) {
  prompt(`Choose one: ${VALID_CHOICES.join(', ')}`);
  let choice = readline.question();

  while (!VALID_CHOICES.includes(choice)) {
    prompt("That's not a valid choice.  Please choose rock, paper, or scissors.")
    choice = readline.question();
  }

  let randomIndex = Math.floor(Math.random() * VALID_CHOICES.length);
  let computerChoice = VALID_CHOICES[randomIndex];

  let winner = determineWinner(choice, computerChoice)
  
  displayWinner(winner);

  prompt("Do you want to play again? y for yes and n for no")

  let answer = readline.question().toLowerCase();

  while (answer[0] !== 'n' && answer[0] !== 'y') {
    prompt("Please enter y or n")
    answer = readline.question().toLowerCase
  }

  if (answer[0] !== 'y') break
}