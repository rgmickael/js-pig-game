var scores, roundScore, activePlayer, dice, btnRoll, btnHold, btnNew, diceImg;

newGame(activePlayer = 0);

function updateDisplay(){
    document.querySelector('.player-0 .current').textContent = "";
    document.querySelector('.player-1 .current').textContent = "";
    document.querySelector('.player-'+activePlayer+' .score').textContent = scores[activePlayer];

    //check winner
    if(scores[activePlayer] >= 50 ){
        document.querySelector('.player-'+activePlayer+' .name').textContent = "Winner!";
        penGame();
    }
}

function flipPlayer(){
    // next player if the player one got an one and no winner
    if(scores[activePlayer] < 50 ){
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        document.querySelector('.player-0 .name').classList.toggle('active');
        document.querySelector('.player-1 .name').classList.toggle('active');
        roundScore = 0;
    }

    // don't show the dice on flip if it's not one
    if( dice == 1){
        diceImg.classList.add('one');
    }

    if(dice !== 1){
        diceImg.classList.remove('one');
        diceImg.setAttribute('style', 'display:none !important');
    }
}

btnRoll.addEventListener('click', function(){
    dice = Math.floor(Math.random() * 6) + 1;
    diceImg.setAttribute('style', 'display: block !important');
    diceImg.src = "images/dice0"+dice+".png";

    if(dice !== 1){
        roundScore += dice;
        document.querySelector('.player-'+activePlayer+' .current').textContent = "+"+roundScore;
    }else{
        updateDisplay();
        flipPlayer();
    }
})

btnHold.addEventListener('click', function(){
    scores[activePlayer] += roundScore;
    updateDisplay();
    flipPlayer();
})

btnNew.addEventListener('click', function(){
    newGame(activePlayer);
})

function newGame(activePlayer = 0){
    scores = [0, 0];
    roundScore = 0;

    document.querySelector('.player-0 .score').textContent = scores[0];
    document.querySelector('.player-1 .score').textContent = scores[1];

    document.querySelector('.player-0 .name').textContent = "PLayer 01";
    document.querySelector('.player-1 .name').textContent = "PLayer 02";

    btnRoll = document.querySelector('.btn-roll');
    btnHold = document.querySelector('.btn-hold');
    btnNew = document.querySelector('.btn-new');
    diceImg = document.querySelector('.dice img');

    diceImg.setAttribute('style', 'display:none !important');

    btnRoll.toggleAttribute('disabled');
    btnHold.toggleAttribute('disabled');

    updateDisplay();
}

function penGame(){
    btnRoll.toggleAttribute('disabled');
    btnHold.toggleAttribute('disabled');
}