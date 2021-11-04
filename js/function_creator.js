/*####################################################################################################################################
##                                              Construction des fonctions pour le jeu                                              ##
####################################################################################################################################*/

/////////////////////////////////////// Fonction d'affichage du message de bienvenue //////////////////////////////////////////////////

function diplayWelcome() {
  // Affichage du message de bienvenue
  // pour ne pas affiché le message de bienvenue a chaque refresh de la page
  if (!sessionStorage.getItem("informed")) {
    els.welcome.innerHTML =
      `
    <div class="d-flex flex-wrap justify-content-center">
        <h1 class="d-flex col-10 text-center justify-content-center mb-5">Bienvenue</h1>
        <p class="d-flex col-10 text-center">
            Vous avez fait le bon choix de venir sur la page de mon jeu de paires, mais oserez-vous battre tout les records.
        </p>
    </div>
    `;
    setTimeout(displayThemesChoices, 8000);
  } else {
    displayThemesChoices();
  }
};
///////////////////////////////////////// Fonction d'affichage du choix des themes ////////////////////////////////////////////////////
function displayThemesChoices() {
  // Effacement du menu du message de bienvenue
  els.welcome.classList.toggle('hidden');
  // Affichage du menu des themes
  els.dispThemes.innerHTML =
    `
    <h2 class="d-flex col-10 justify-content-center text-center my-5 mx-auto">
        Choisissez votre thèmes :
    </h2>
    <div id="themes" class="d-flex flex-column col-12 justify-content-center align-items-center">
        <button id="themeEnfant" class="d-flex col-8 justify-content-center align-items-center py-3 my-3">
            Dessins d'enfants
        </button>
        <button id="themeLangage" class="d-flex col-8 justify-content-center align-items-center py-3 my-3">
            Logos Langages
        </button>
        <button id="themeSerie" class="d-flex col-8 justify-content-center align-items-center py-3 my-3">
            Séries
        </button>
    </div>
    `;
};
///////////////////////////////////////// Fonction d'affichage du choix difficulté ////////////////////////////////////////////////////
function displayDifficultChoices() {
  // Effacement du menu des themes
  els.dispThemes.classList.toggle('hidden');
  // Affichage du menu des difficultées
  els.dispDifficult.innerHTML =
    `
    <h2 class="d-flex col-12 justify-content-center align-items-center my-5 mx-auto">
        Choisissez votre style de jeu :
    </h2>
    <div id="difficulty" class="d-flex flex-column col-12 justify-content-center align-items-center">
        <button id="btnTimeVs" class="d-flex col-8 justify-content-center align-items-center py-3 my-3">
            Contre la montre
        </button>
        <button id="btnPlayMoves" class="d-flex col-8 justify-content-center align-items-center py-3 my-3">
            Nombre de coup
        </button>
    </div>
  `;
};

/////////////////////////////////////////// Fonction d'affichage du plateau de carte //////////////////////////////////////////////////
function displayCards() {


  // Effacement du menu des difficultées
  els.dispDifficult.classList.toggle('hidden');
  // Affichage du popup de lancement du jeu
  els.popStart.classList.toggle('hidden');
  // Affichage des cartes
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
