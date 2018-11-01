/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// player scores
var scores, roundScore, activePlayer, previousScore, maxScore, previousScore2;
init();

document.querySelector('.btn-roll').addEventListener('click', function() {
    //Random number
    var dice = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;
    //display the image
    var diceDom = document.querySelector('.dice');
    var diceDom2 = document.querySelector('.dice2');

    diceDom.style.display = 'block';
    diceDom2.style.display = 'block';
    diceDom.src = 'dice-' + dice + '.png';
    diceDom2.src = 'dice-' + dice2 + '.png';

    // if two dices socres 6 back to back make score 0
    if ((dice == 6 && previousScore == 6) || dice2 == 6 && previousScore2 == 6) {
        scores[activePlayer] = 0;
        nextPlayer();
    } // either of tow dice is 1 make current 0
    else if (dice == 1 || dice2 == 1) {
        nextPlayer();
    } else {
        roundScore = roundScore + dice + dice2;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    }
    previousScore = dice;
    previousScore2 = dice2;
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    //Add cuurent score to the global score
    scores[activePlayer] = scores[activePlayer] + roundScore;

    //update the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    //check if player won
    maxScore = document.getElementById('winning').value;

    if (scores[activePlayer] >= maxScore) {
        document.querySelector('#name-' + activePlayer).textContent = 'Winner';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.dice2').style.display = 'none';

        // add the winner class one to player div and remove the active class for that player.
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
    } else {
        nextPlayer();
    }
})

//on New game click
document.querySelector('.btn-new').addEventListener('click', init);


// make scores 0 and roundscore=0 and remove all the css changes during the game.
function init() {
    activePlayer = 0;
    roundScore = 0;
    previousScore = 0;
    previousScore2 = 0;
    maxScore = document.getElementsByClassName('.winning-score').value;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
    scores = [0, 0];
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.querySelector('#name-0').textContent = 'Player-1';
    document.querySelector('#name-1').textContent = 'Player-2';
    document.querySelector('.player-' + '0' + '-panel').classList.remove('winner');
    document.querySelector('.player-' + '1' + '-panel').classList.remove('winner');
}

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    previousScore = 0;
    previousScore2 = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    //toggle
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';

}