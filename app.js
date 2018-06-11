/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores, roundScore, activePlayer;
const winCondition = 100;

scores = [0, 0];
roundScore = 0; 
activePlayer = 0;

document.querySelector(`.dice`).style.display = `none`;

document.getElementById(`score-0`).textContent = `0`;
document.getElementById(`score-1`).textContent = `0`;
document.getElementById(`current-0`).textContent = `0`;
document.getElementById(`current-1`).textContent = `0`;

document.querySelector(`.btn-roll`).addEventListener(`click`, function() {
  const dice = Math.floor(Math.random() * 6) + 1;
  const diceDOM = document.querySelector(`.dice`);
  
  diceDOM.style.display = `block`;
  diceDOM.src = `dice-${dice}.png`;
  
  if (dice !== 1) {
    // Add score
    roundScore += dice;
    document.getElementById(`current-${activePlayer}`).textContent = roundScore;
  } else {
    // Next player
    nextPlayer();
  }
});

document.querySelector(`.btn-hold`).addEventListener(`click`, function() {
  // Add CURRENT score to GLOBAL score
  scores[activePlayer] += roundScore;
  
  // Update UI
  document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer];
  document.getElementById(`current-${activePlayer}`).textContent = 0;

  // Check if the player won the game
  if (scores[activePlayer] >= 10) {
    document.querySelector(`#name-${activePlayer}`).textContent = `Winner!!!`;
    document.querySelector(`.player-${activePlayer}-panel`).classList.add(`winner`); 
    document.querySelector(`.player-${activePlayer}-panel`).classList.remove(`active`); 
    document.querySelector(`.dice`).style.display = `none`;
  } else {
    // Next player
    nextPlayer();
  }
});

function nextPlayer() {
  activePlayer = (activePlayer === 0) ? 1 : 0;
  roundScore = 0;
  
  document.getElementById(`current-0`).textContent = 0;
  document.getElementById(`current-1`).textContent = 0;

  document.querySelector(`.player-0-panel`).classList.toggle(`active`);
  document.querySelector(`.player-1-panel`).classList.toggle(`active`);
}