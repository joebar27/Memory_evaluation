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
      <h1 class="d-flex col-10 text-center justify-content-center mb-5 text-danger">Bienvenue</h1>
      <p class="d-flex col-10 text-center">
        Vous avez fait le bon choix de venir sur la page de mon jeu de paires, mais oserez-vous battre tout les records.
      </p>
    </div>
    `;
    sessionStorage.setItem("informed", true);
    setTimeout(displayThemesChoices, 5000);
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

//////////////////////////////////// Fonction d'affichage du popup de lancement de la partie //////////////////////////////////////////
function dispPopupStart() {
  // Affichage du message de lancement de la partie
  els.popStart.innerHTML =
    `
    <div class="position-absolute align-items-center top-25 start-0 bg-black bg-opacity-50 popstart pt-5 pt-md-5">
      <div class="d-flex justify-content-center align-items-center mt-5 mt-md-5">
        <div class="d-flex flex-column justify-content-center bg-light bg-opacity-75 m-5 m-md-5">
          <h1 class="d-flex justify-content-center fw-bold text-danger m-2 m-md-5">Etes-vous prêt ?</h1>
          <button id="start" class="rounded-pill m-3 m-md-5" onclick=gameStart()>GO!!!</button>
        </div>
      </div>
    </div>
    `;
};

/////////////////////////////////////////// Fonction d'affichage du plateau de carte //////////////////////////////////////////////////
function displayCards() {
  // Effacement du menu des difficultées
  els.dispDifficult.classList.toggle('hidden');
  // Affichage du popup de lancement du jeu
  dispPopupStart();
  // Affichage des cartes
  els.allCards.classList.toggle('hidden');
};

////////////////////////////////////////// Fonction de lancement du compteur de temps de jeu //////////////////////////////////////////////
function gameStart() {
  // Effacement du message de lancement de la partie
  els.popStart.classList.toggle('hidden');
  // Affichage du compteur de coup ou de temps
  els.count.classList.toggle('hidden');
  // Selection du compteur selon le choix utilisateur précédent
  if (gameSelect[1] == "timeVs") {
    playTime();
  }
  if (gameSelect[1] == "playMoves") {
    playMoves(move);
  }
};

/////////////////////////////////////////// Fonction du retournement des cartes ///////////////////////////////////////////////////////
function flipCard() {
  // si les carte sont verouiller pas d'execution de la fonction
  if (lockCards) {
    return;
  }
  //si la carte clické est = a la premiere carte pas d'execution de la fonction
  if (this === firstPlayCard) {
    return;
  }
  // retournement de la carte clické
  this.classList.add('flip');
  //si aucune carte est retourner
  if (!playCardIsFlipped) {
    playCardIsFlipped = true;
    //on lui iassigne que c'est la premiere
    firstPlayCard = this;
    return;
  }
  // si une carte était déjà retourner ont lui assigne que c'est la deuxième
  secondPlayCard = this;
  // on lance la fonction de comparaison ayant 2 cartes retourner
  comparedCard();
};

////////////////////////////////////////// Fonction de comparaison des cartes retourner ///////////////////////////////////////////////////
function comparedCard() {
  // chaque comparaison ajoute un mouvement
  move++;
  playMoves(move);
  // si les deux cartes sont identique elle sont desactivé
  if (firstPlayCard.dataset.framework === secondPlayCard.dataset.framework) {
    disableCards();
    return;
  }
  // sinon elle sont remise face caché
  else {
    unflipPlayedCards();
  }
};

////////////////////////////////////////// Fonction de désactivation des cartes retourner /////////////////////////////////////////////////
function disableCards() {
  firstPlayCard.removeEventListener('click', flipCard);
  secondPlayCard.removeEventListener('click', flipCard);
  // appel de la fonction de deverouillage des cartes
  unlockCards();
};

////////////////////////////////////////// Fonction de remise face cacher des cartes retourner ////////////////////////////////////////////
function unflipPlayedCards() {
  // verouillage du retournement de toute les cartes 
  lockCards = true;
  // effacement de la class flip sur les deux cartes
  setTimeout(() => {
    firstPlayCard.classList.remove('flip');
    secondPlayCard.classList.remove('flip');
    // appel de la fonction de dévérouillage de toute les cartes
    unlockCards();
  }, 1500);// apres 1.5s de visualisation face visible
};

//////////////////////////////////////// Fonction de reinitialisation du verouillage des cartes ///////////////////////////////////////////
function unlockCards() {
  // changement des variables de verouillage des cartes par destructuration ES6
  [playCardIsFlipped, lockCards] = [false, false];
  [firstPlayCard, secondPlayCard] = [null, null];
};

////////////////////////////////////////// Fonction de lancement du compteur de temps de jeu //////////////////////////////////////////////
function shuffle() {
  // parcour du tableau des 12 cartes 
  els.playCards.forEach(playCard => {
    // choix aléatoire d'un nombre
    let ramdomPos = Math.floor(Math.random() * 12);
    // affectation a chaque carte d'un nombre aleatoire pour déterminé son ordre de positionnement
    playCard.style.order = ramdomPos;
  });
};

//////////////////////////////////////////////////// Fonction compteur de temps de jeu ///////////////////////////////////////////////////
function playTime() {
  function upTimes() {
    els.count.innerHTML = `<div id="innerCount" class="d-flex justify-content-center col-6 col-lg-4">Temps écoulé : ${time} s</div>`;
    time++;
  }
  setInterval(upTimes, 1000);
};

//////////////////////////////////////////////////// Fonction compteur de mouvement ///////////////////////////////////////////////////
function playMoves(move) {
  els.count.innerHTML = `<div id="innerCount" class="d-flex justify-content-center col-10 col-lg-6">Vous avez effectuez : ${move} mouvements</div>`;
};

////////////////////////////////////////// Fonction d'affichage du resultat de la partie ///////////////////////////////////////////////
function displayResultat() {
  // si toute les carte sont retourner

  // arret du temps

  // affichage de la page de resultat avec les valeur récuperer
}