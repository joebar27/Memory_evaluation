/*####################################################################################################################################
##                                              Construction des fonctions pour le jeu                                              ##
####################################################################################################################################*/

///////////////////////////////////////// Fonction d'affichage du choix difficulté ////////////////////////////////////////////////////
function displayDifficultChoices() {
  // Effacement du menu des themes
  els.dispThemes.classList.toggle('hidden');
  // Affichage du menu des difficultées
  els.dispDifficult.classList.toggle('hidden');
};

/////////////////////////////////////////// Fonction d'affichage du plateau de carte //////////////////////////////////////////////////
function displayCards() {
  // Effacement du menu des difficultées
  els.dispDifficult.classList.toggle('hidden');
  // Affichage des cartes
  els.popStart.classList.toggle('hidden');
  //generateCards(gameSelect);
  els.allCards.classList.toggle('hidden');
};
/////////////////////////////////////////// Fonction du retournement des cartes ///////////////////////////////////////////////////////
function flipCard() {
  if (lockCards) {
    return;
  }
  if (this === firstPlayCard) {
    return;
}
  this.classList.add('flip');
  // console.log("after : ",playCardIsFlipped);
  if (!playCardIsFlipped) {
    playCardIsFlipped = true;
    firstPlayCard = this;
    // console.log("before : ",playCardIsFlipped);
    // console.log(firstPlayCard);
    return;
  }
  secondPlayCard = this;
  //playCardIsFlipped = false;
  comparedCard();
};

////////////////////////////////////////// Fonction de comparaison des cartes retourner ///////////////////////////////////////////////////
function comparedCard() {    
  if (firstPlayCard.dataset.framework === secondPlayCard.dataset.framework) {
    disableCards();
    return;
  } else {
    unflipPlayedCards();
  }
};

////////////////////////////////////////// Fonction de désactivation des cartes retourner /////////////////////////////////////////////////
function disableCards() {
  firstPlayCard.removeEventListener('click', flipCard);
  secondPlayCard.removeEventListener('click', flipCard);
  unlockCards();
};

////////////////////////////////////////// Fonction de remise face cacher des cartes retourner ////////////////////////////////////////////
function unflipPlayedCards() {
    lockCards = true;
  setTimeout(() => {
    firstPlayCard.classList.remove('flip');
    secondPlayCard.classList.remove('flip');
    //lockCards = false;
    unlockCards();
  }, 1500);
}

//////////////////////////////////////// Fonction de reinitialisation du verouillage des cartes ///////////////////////////////////////////
function unlockCards() {
    [playCardIsFlipped, lockCards] = [false, false];
    [firstPlayCard, secondPlayCard] = [null, null];
}

////////////////////////////////////////// Fonction de lancement du compteur de temps de jeu //////////////////////////////////////////////
function shuffle() {
    els.playCards.forEach(playCard => {
      let ramdomPos = Math.floor(Math.random() * 12);
      playCard.style.order = ramdomPos;
    });
  };

////////////////////////////////////////// Fonction de lancement du compteur de temps de jeu //////////////////////////////////////////////
function gameStart() {
  // console.log(els.popStart);
  els.popStart.classList.toggle('hidden');
  els.count.classList.toggle('hidden');
  if (gameSelect[1] == "timeVs") {
    playTime();
  }
  if (gameSelect[1] == "playMoves") {
    playMoves();
  }
};

//////////////////////////////////////////////////// Fonction compteur de temps de jeu ///////////////////////////////////////////////////
function playTime() {
  function upTimes() {
    els.count.innerHTML = `<div id="innerCount" class="d-flex justify-content-center col-6">Temps écoulé : ${time} s</div>`;
    time++;
  }
  setInterval(upTimes, 1000);
};

//////////////////////////////////////////////////// Fonction compteur de mouvement ///////////////////////////////////////////////////
function playMoves() {
  function upMove() {
    els.count.innerHTML = `<div id="innerCount" class="d-flex justify-content-center col-10">Vous avez effectuez : ${move} mouvements</div>`;
    move++;
  }
  setInterval(upMove, 1000)
};
