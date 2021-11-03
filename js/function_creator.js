/*####################################################################################################################################
##                                              Construction des fonctions pour le jeu                                              ##
####################################################################################################################################*/

//////////////////////////////////////////// Fonction d'affichage du choix des themes ////////////////////////////////////////////////
const displayThemeChoices = () => {
  els.dispThemes.innerHTML =
    `
      <h2 class="d-flex col-10 justify-content-center align-items-center my-5 mx-auto">Choisissez votre thèmes :</h2>
        <div id="themes" class="d-flex flex-column col-12 justify-content-center align-items-center">
          <button id="themeEnfant" class="d-flex col-8 justify-content-center align-items-center py-3 my-3">Dessins d'enfants</button>
          <button id="themeLangage" class="d-flex col-8 justify-content-center align-items-center py-3 my-3">Logos Langages</button>
          <button id="themeSerie" class="d-flex col-8 justify-content-center align-items-center py-3 my-3">Séries</button>
        </div>
      `;
};

///////////////////////////////////////// Fonction d'affichage du choix difficulté ////////////////////////////////////////////////////
const displayDifficultChoices = () => {
  // Effacement du menu des themes
  els.dispThemes.classList.replace("d-flex", "hidden");
  // Affichage du menu des difficultées
  els.dispDifficult.innerHTML =
    `
      <h2 class="d-flex col-12 justify-content-center align-items-center my-5 mx-auto">Choisissez votre style de jeu :</h2>
        <div id="difficulty" class="d-flex flex-column col-12 justify-content-center align-items-center">
          <button id="btnTimeVs" class="d-flex col-8 justify-content-center align-items-center py-3 my-3">Contre la montre</button>
          <button id="btnPlayMoves" class="d-flex col-8 justify-content-center align-items-center py-3 my-3">Nombre de coup</button>
        </div>
      `;
};

/////////////////////////////////////////// Fonction d'affichage du plateau de carte //////////////////////////////////////////////////
const displayCardsGenerate = () => {
  // Effacement du menu des difficultées
  els.dispDifficult.classList.replace("d-flex", "hidden");
  for (let i = 0; i < 12; i++) {
    els.allCards.innerHTML +=
      `<div class="card card-lg">
    <img class="front-face" src="" alt="">
    <img class="back-face" src="" alt="">
    </div>
    `;
  }
  generateCards(gameSelect);
  startPopup();
};

///////////////////////////////////////// Génération des cartes suivant le theme choisi ///////////////////////////////////////////////
const generateCards = (gameSelect) => {
  if (gameSelect[0] == "enfant") {
    // backface card background => img disney castel
    let backFaces = els.allCards.querySelectorAll('.back-face');
    console.log("if : ", backFaces);
    for (let backFace of backFaces) {
      console.log("for : ", backFace);
      backFace.src = '/img/THEMES/dessin_enfant/castel_disney.png';
    }
    // frontface card background => img child drawing
    let frontFace = els.allCards.querySelectorAll('.front-face');
    console.log(frontFace);
    for (let i = 0; i < frontFace.lenght; i++) {
      frontFace.src = '/img/THEMES/dessin_enfant/castel_disney.png';
    }
  }

  if (gameSelect[0] == "langage") {
    // backface card background => img computer
    let backFaces = els.allCards.querySelectorAll('.back-face');
    console.log("if : ", backFaces);
    for (let backFace of backFaces) {
      console.log("back : ", backFace);
      backFace.src = '/img/THEMES/langage_prog/computer-programming-software-develo.png';
    }
    // frontface card background => img logo language
    let frontFace = els.allCards.querySelectorAll('.front-face');
    console.log("front : ",frontFace);
    for (let i = 0; i <= frontFace.length; i++) {
      frontFace.src = `/img/THEMES/langage_prog/${i}.png`;
      console.log(frontFace);
    }
  }

  if (gameSelect[0] == "serie") {
    // backface card background => img mask casa de papel
    let hiddenCards = els.allCards.querySelectorAll('.back-face');
    for (let backFace of hiddenCards) {
      backFace.src = '/img/THEMES/casa_de_papel/casa-mask-papel.gif';
    }
    // frontface card background => img actor photos
  }
};

//////////////////////////////////////// Affichage du startPopup pour le lancement de la partie ///////////////////////////////////////////
const startPopup = () => {
  els.popStart.innerHTML =
    `<div class="position-absolute align-items-center top-25 start-0 bg-black bg-opacity-50 popstart">
        <div class="d-flex justify-content-center align-items-center">
          <div class="d-flex flex-column justify-content-center bg-light bg-opacity-75 col-10 col-md-8 offset-md-2 mt-5 my-auto">
            <h1 class="d-flex justify-content-center mt-5 fw-bold text-danger">Etes-vous prêt ?</h1>
            <button id="start" class="rounded-pill col-4 offset-4 col-md-2 offset-md-5 my-5" onclick= gameStart()>GO!!!</button>
          </div>
        </div>
      </div>
      `;
}

////////////////////////////////////////// Fonction de lancement du compteur de temps de jeu //////////////////////////////////////////////
const gameStart = () => {
  // console.log(els.popStart);
  els.popStart.classList.add('hidden');
  if (gameSelect[1] == "timeVs") {
    playTime();
  }
  if (gameSelect[1] == "playMoves") {
    playMoves();
  }
}

//////////////////////////////////////////////////// Fonction compteur de temps de jeu ///////////////////////////////////////////////////
const playTime = () => {
  function upTimes() {
    els.count.innerHTML = `<div id="innerCount" class="d-flex justify-content-center col-6">Temps écoulé : ${time} s</div>`;
    time++;
  }
  setInterval(upTimes, 1000)
}

//////////////////////////////////////////////////// Fonction compteur de mouvement de carte ///////////////////////////////////////////////////
const playMoves = () => {
  els.count.innerHTML = `<div id="innerCount" class="d-flex justify-content-center col-8">Mouvement joué : ${count} coups</div>`;
  //count++;
}
/////////////////////////////////////////////////////// Fonction de flip des carte ///////////////////////////////////////////////////////
const flipCard = (cardTarget) => {
  //console.log("flip : ", cardTarget);
  cardTarget.classList.toggle('flip');
}
