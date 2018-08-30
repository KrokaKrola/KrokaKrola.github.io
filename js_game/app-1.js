/*
GAME RULES: 

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, gamePlaying, maxScore;
var i = 0;
var firstHitDiceOne = 0;
var secondHitDiceOne = 0;
var firstHitDiceTwo = 0;
var secondHitDiceTwo = 0;
init ();

maxScore = 100;

//document.querySelector('#current-' + activePlayer).textContent = dice;
// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

// var x = document.querySelector('#score-0').textContent;

// console.log(x);

document.querySelector('.max-score').textContent = maxScore;

document.querySelector('.btn-roll').addEventListener('click', function(){

  if(gamePlaying) {
    // 1. Random number
    var dice = Math.floor(Math.random() * 6) + 1;

    var diceSecond = Math.floor(Math.random() * 6) + 1;

    // 2. Display the result
    var diceDOM = document.querySelector('.dice');
    var diceDOMSecond = document.querySelector('.dice--2');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';
    diceDOMSecond.style.display = 'block';
    diceDOMSecond.src = 'dice-' + diceSecond + '.png';
    // 3. Update the round score IF the rolled number was not a 1
    if ( (dice !== 1) && (diceSecond !== 1) ) {
      // add score
      roundScore += dice + diceSecond;
      document.querySelector('#current-' + activePlayer).textContent = roundScore;

    } else {
      // Next player
      nextPlayer();
    }

    i++;

    if( (i % 2) !== 0) {
     firstHitDiceOne = dice;
     firstHitDiceTwo = diceSecond;
    } else {
     secondHitDiceOne = dice;
     secondHitDiceTwo = diceSecond;
    }

    if( ( (firstHitDiceOne === 6) && (secondHitDiceOne === 6) ) || ( (firstHitDiceSecond === 6) && (secondHitDiceSecond === 6) ) ){
      scores[activePlayer] = 0;
      document.querySelector('#score-' + activePlayer).textContent = '0';
      console.log('hit 2 x 6');
      firstHitDiceOne = secondHitDiceOne = 0;
      firstHitDiceSecond = secondHitDiceSecond = 0;
      nextPlayer();
    }
  }
});

document.querySelector('.btn-add').addEventListener('click', function() {

  // rewrite max score; default 100
  maxScore = document.querySelector('.add-input').value;
  document.querySelector('.add-input').value = '';

  console.log(maxScore);

  document.querySelector('.max-score').textContent = maxScore;

});

document.querySelector('.btn-hold').addEventListener('click', function() {

  if(gamePlaying) {
    // Add current score to global score
    scores[activePlayer] += roundScore;

    // update UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    // check if player won the game

    if (scores[activePlayer] >= maxScore) {
      document.querySelector('#name-' + activePlayer).textContent = 'WINNER';
      document.querySelector('.dice').style.display = 'none';
      document.querySelector('.dice--2').style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      gamePlaying = false;
    } else {
      nextPlayer();
    }
  }
});

function nextPlayer () {
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;

  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  document.querySelector('.dice').style.display = 'none';
  document.querySelector('.dice--2').style.display = 'none';

  firstHitDiceOne = 0;
  secondHitDiceOne = 0;
  firstHitDiceSecond = 0;
  secondHitDiceSecond = 0;
}

document.querySelector('.btn-new').addEventListener('click', init);

function init () {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;

  document.querySelector('.dice').style.display = 'none';
  document.querySelector('.dice--2').style.display = 'none';

  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');

  document.querySelector('.player-0-panel').classList.add('active');

  gamePlaying = true;
}

document.querySelector('.FAQ').addEventListener('click', function(){
  document.querySelector('.overlay').style.display = 'block';
});

document.querySelector('.overlay__close').addEventListener('click', function(){
  document.querySelector('.overlay').style.display = 'none';
});