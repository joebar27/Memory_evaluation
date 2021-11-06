/*####################################################################################################################################
##                                              Construction des fonctions pour le jeu                                              ##
####################################################################################################################################*/

/////////////////////////////////////// Fonction d'affichage du message de bienvenue //////////////////////////////////////////////////

function diplayWelcome() {
  // Affichage du message de bienvenue
  els.welcome.classList.remove('hidden');
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
  els.welcome.classList.add('hidden');
  els.dispThemes.classList.remove('hidden');
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
  els.dispThemes.classList.add('hidden');
  // Affichage du menu des difficultées
  els.dispDifficult.classList.remove('hidden');
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
  els.dispDifficult.classList.add('hidden');
  // Affichage du popup de lancement du jeu
  dispPopupStart();
  // Affichage des cartes
  changePlayCards();
  els.allCards.classList.remove('hidden');
};

////////////////////////////////////////// Fonction de lancement du compteur de temps de jeu //////////////////////////////////////////////
function gameStart() {
  // Effacement du message de lancement de la partie
  els.popStart.classList.add('hidden');
  // Affichage du compteur de coup ou de temps
  els.count.classList.remove('hidden');
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
    countMatchedCard++;
    if (countMatchedCard == 6) {
      // enregistrement du temps
      timeScore = time;
      // affichage des scores
      displayResult(timeScore, move);
      return;
    }
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
  }, 1500); // apres 1.5s de visualisation face visible
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
    els.count.innerHTML = 
    `
    <div id="innerCount" class="d-flex justify-content-center col-6 col-lg-6">
      <p>Temps écoulé : ${time} s</p>
    </div>
    `;
    time++;
    console.log(time);
  }
  setInterval(upTimes, 1000);
};

//////////////////////////////////////////////////// Fonction compteur de mouvement ///////////////////////////////////////////////////
function playMoves(move) {
  els.count.innerHTML = 
  `
  <div id="innerCount" class="d-flex justify-content-center col-10 col-lg-8">
    <p>Vous avez effectuez : ${move} mouvements</p>
  </div>
  `;
};

////////////////////////////////////////// Fonction d'affichage du resultat de la partie ///////////////////////////////////////////////
function displayResult(timeScore, move) {
  // si toute les carte sont retourner
  els.result.classList.remove('hidden');
  els.allCards.classList.add('hidden');
  els.count.classList.add('hidden');
  if (gameSelect[1] === "timeVs") {
    // affichage de la page de resultat pour les partie contre le temps
    els.result.innerHTML =
      `
    <div class="d-flex flex-wrap justify-content-center">
      <h1 class="d-flex justify-content-center text-center col-12 text-danger">BRAVO !!!</h1>
      <p class="d-flex text-center fs-5">Vous avez réussi en :</p>
    </div>
    <div class="d-flex flex-wrap justify-content-center col-12">
      <p class="d-flex text-center fs-2">        
        ${timeScore} seconds<br>
        et<br>
        ${move} coups
      </p>
    </div>
    <div class="d-flex flex-wrap justify-content-center col-12">
      <h2 class="d-flex justify-content-center col-12 mb-lg-5">Que voulez-vous faire ?</h2>
      <div class="d-flex justify-content-around col-12 col-lg-6 mt-lg-5">
        <button class="d-flex col-4 col-lg-3 justify-content-center align-items-center text-center" onclick="restartGame()">Rejoué</button>
        <button class="d-flex col-4 col-lg-3 justify-content-center align-items-center text-center" onclick="changeTheme()">Changer de theme</button>
      </div>
    </div>
    `;
  }
  if (gameSelect[1] === "playMoves") {
    // affichage de la page de resultat pour les partie contre les mouvements
    els.result.innerHTML =
      `
  <div class="d-flex flex-wrap justify-content-center">
    <h1 class="d-flex justify-content-center text-center col-12 text-danger">BRAVO !!!</h1>
    <p class="d-flex text-center fs-5">Vous avez réussi en :</p>
  </div>
  <div class="d-flex flex-wrap justify-content-center col-12">
    <p class="d-flex text-center fs-2">
      ${move} coups
    </p>
  </div>
  <div class="d-flex flex-wrap justify-content-center col-12">
    <h2 class="d-flex justify-content-center col-12 mb-lg-5">Que voulez-vous faire ?</h2>
    <div class="d-flex justify-content-around col-12 col-lg-6 mt-lg-5">
      <button class="d-flex col-4 col-lg-3 justify-content-center align-items-center text-center" onclick="restartGame()">Rejoué</button>
      <button class="d-flex col-4 col-lg-3 justify-content-center align-items-center text-center" onclick="changeTheme()">Changer de theme</button>
    </div>
  </div>
  `;
  }
};

//////////////////////////////////////////////// Fonction redémarage d'une partie ///////////////////////////////////////////////
function restartGame() {
  // effacer l'affichage du resultat de la partie precedente
  els.result.classList.toggle('hidden');
  // appel de la fonction de reboot
  rebootInit();
  // Affichage du popup de lancement du jeu
  els.popStart.classList.toggle('hidden');
  dispPopupStart();
  // Affichage des cartes
  els.allCards.classList.toggle('hidden');
};

///////////////////////////// Fonction redémarage d'une partie avec choix des themes et difficulté /////////////////////////////////
function changeTheme() {
  // cacher section resultat
  els.result.classList.toggle('hidden');
  // montrer section du choix des themes
  els.dispThemes.classList.toggle('hidden');
  // montrer section du choix des difficulté
  //els.dispDifficult.classList.toggle('hidden');
  // appel de la fonction de reboot
  rebootInit();
  // réinitialisation du theme et de la difficulté choisi précédemment
  gameSelect = [];
  // appel de la fonction d'affichage du menu 
  displayThemesChoices();
};

////////////////////////////////////////// Fonction réinitialisation des fonction du jeu ///////////////////////////////////////////////
function rebootInit() {
  // réinitialisation des variables
  [move, time, timeScore, countMatchedCard, playCardIsFlipped] = [0, 1, null, 0, false];
  // remise de toute les carte face caché
  els.playCards.forEach(playCard => {
    playCard.classList.toggle('flip');
    playCard.addEventListener('click', flipCard);
  });
  //relancer un melange des cartes
  shuffle();
};

////////////////////////////////////////////////// Fonction pour changer les themes /////////////////////////////////////////////////////
function changePlayCards() {

  if (gameSelect[0] === "serie") {
    //changement de toute les back-faces
    els.backFaces.forEach(backCard => {
      backCard.src = "./img/THEMES/casa_de_papel/casa-mask-papel.gif";
      backCard.alt = "image du masque de casa de papel";
    });
    //changement de toute les front-faces
    themechosen = gameSelect[0];
    tableCard(themechosen);
  }

  if (gameSelect[0] === "enfant") {
    //changement de toute les back-faces
    els.backFaces.forEach(backCard => {
      backCard.src = "./img/THEMES/dessin_enfant/castel_disney.png";
      backCard.alt = "dessin du chateau de disney";
    });
    //changement de toute les front-faces
    themechosen = gameSelect[0];
    tableCard(themechosen);
  }

  if (gameSelect[0] === "langage") {
    //changement de toute les back-faces
    els.backFaces.forEach(backCard => {
      backCard.src = "./img/THEMES/langage_prog/programmer-computer.png";
      backCard.alt = "programmer computer";
    });
    //changement de toute les front-faces
    themechosen = gameSelect[0];
    tableCard(themechosen);
  }
};

////////////////////////////////////////////////// Fonction pour changer les themes /////////////////////////////////////////////////////
function tableCard(themechosen) {
  let playCardSrc = './Data/table_card.json';
  let httpRequest = new XMLHttpRequest();

  httpRequest.onreadystatechange = function () {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      // tout va bien, la réponse a été reçue
      if (httpRequest.status === 200) {
        let data = JSON.parse(httpRequest.response);

        // themes serie :
        if (themechosen === "serie") {
          for (let i = 0; i < 12; i++) {
            els.frontFaces[i].src = data.serie[i + 1].src;
            els.frontFaces[i].alt = data.serie[i + 1].alt;
            els.playCards[i].dataset.framework = data.serie[i + 1].framework;
          }
        }

        // themes dessins enfant :
        if (themechosen === "enfant") {
          for (let i = 0; i < 12; i++) {
            els.frontFaces[i].src = data.enfant[i + 1].src;
            els.frontFaces[i].alt = data.enfant[i + 1].alt;
            els.playCards[i].dataset.framework = data.enfant[i + 1].framework;
          }
        }

        // themes logo langage :
        if (themechosen === "langage") {
          for (let i = 0; i < 12; i++) {
            els.frontFaces[i].src = data.langage[i + 1].src;
            els.frontFaces[i].alt = data.langage[i + 1].alt;
            els.playCards[i].dataset.framework = data.langage[i + 1].framework;
          }
        }
      } else {
        // il y a eu un problème avec la requête,
        console.log("un probleme est intervenue");
      }
    }
  }
  httpRequest.open('GET', playCardSrc);
  httpRequest.send();

}
