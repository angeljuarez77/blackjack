const p1Hit = document.getElementById('player1');

const player1 = {
  points: 0,
  handVal: 0,
  timesWon: 0
}

const dealer = {
  points: 0,
  handVal: 0,
  timesWon: 0
}

const suits = ["spades", "diamonds", "club", "heart"];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K",];
const deck = [];

for(let i = 0; i < suits.length; i++) {
  for(let j = 0; j < values.length; j++) {
    const card = { suit: suits[i], value: values[j] };
    deck.push(card);
  }
}

const shuffledDeck = [...deck];

// fisher yates
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}
shuffleArray(shuffledDeck);

let currentIndx = shuffledDeck.length - 1;

function evaluatePoints(card) {
  switch(card.value) {
    case "J":
    case "Q":
    case "K":
      return 10;
    case "A":
      return 11;
    default:
      return parseInt(card.value);
  }
}

dealer.handVal = dealer.handVal + evaluatePoints(shuffledDeck[currentIndx]);
currentIndx--;
dealer.handVal = dealer.handVal + evaluatePoints(shuffledDeck[currentIndx]);
currentIndx--;

// document.getElementById('dealers-hand').innerHTML = dealer.handVal;

if(dealer.handVal === 21) {
  alert("the dealer won immediately (they drew 2 cards and got 21)");
} else if (dealer.handVal > 21) {
  alert("omg you won. whatever");
}

p1Hit.addEventListener('click', () => {
  const card = shuffledDeck[currentIndx];
  currentIndx--;
  player1.handVal = evaluatePoints(card) + player1.handVal;

  if(player1.handVal === 21) {
    player1.timesWon = player1.timesWon + 1;
    alert("omg you won. whatever");
    window.location.reload();
  } else if (player1.handVal > 21) {
    alert("You lost. Wanna know why? Because.... YA BASIC");
    window.location.reload();
  }

  document.getElementById('players-hand').innerHTML = player1.handVal;
});

document.getElementById('stand').addEventListener('click', () => {
  if(player1.handVal > dealer.handVal) {
    alert("you have won. ya still basic")
  } else {
    alert("ya super basic")
  }

  window.location.reload();
})