const readline = require('readline-sync');
const VALID_CHOICES = ['r', 'p', 'sc', "l", "sp"];

let KEY = {
  r: "rock",
  p: "paper",
  sc: "scissors",
  l: "lizard",
  sp: "spock"
}


function prompt(message) {
  console.log(`=> ${message}`);
}

function determineWinner(choice, computerChoice) {
  prompt(`You chose ${KEY[choice]}, computer chose ${KEY[computerChoice]}`)

  if ((choice === 'r' && computerChoice === 'sc') || (choice === 'p' && computerChoice === 'r') || (choice === 'sc' && computerChoice === 'p') || (choice === 'sp' && computerChoice === 'r') || (choice === 'l' && computerChoice === 'p')) {
    return "User"
  } else if ((choice === 'r' && computerChoice === 'p') || (choice === 'p' && computerChoice === 'sc') || (choice === 'sc' && computerChoice === 'r') || (choice === 'p' && computerChoice === 'l') || (choice === 'r' && computerChoice === 'sp')) {
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
    prompt("That's not a valid choice.  Please choose rock, paper, scissors, lizard or spock. Type r for rock, p for paper, sc for scissors, l for lizard, or sp for spock.")
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