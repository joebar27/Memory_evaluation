/*####################################################################################################################################
##                                              Construction des fonctions pour le jeu                                              ##
####################################################################################################################################*/

///////////////////////////////////////// Fonction d'affichage du choix difficulté ////////////////////////////////////////////////////
const displayDifficultChoices = () => {
  // Effacement du menu des themes
  els.dispThemes.classList.toggle('hidden');
  // Affichage du menu des difficultées
  els.dispDifficult.classList.toggle('hidden');
};

/////////////////////////////////////////// Fonction d'affichage du plateau de carte //////////////////////////////////////////////////
const displayCardsGenerate = () => {
  // Effacement du menu des difficultées
  els.dispDifficult.classList.toggle('hidden');
  // Affichage des cartes
  els.popStart.classList.toggle('hidden');
  generateCards(gameSelect);
  els.allCards.classList.toggle('hidden');
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
      backFace.alt = 'image du chateau disney';
    }
    // // frontface card background => img child drawing
    // console.log(frontFace);
    // for (let i = 0; i < 12; i++) {
    //   frontFace.src = '/img/THEMES/dessin_enfant/castel_disney.png';
    // }
  }

  if (gameSelect[0] == "langage") {
    // backface card background => img computer
    let backFaces = els.allCards.querySelectorAll('.back-face');
    console.log("if : ", backFaces);
    for (let backFace of backFaces) {
      console.log("back : ", backFace);
      backFace.src = '/img/THEMES/langage_prog/computer-programming-software-develo.png';
      backFace.alt = 'image programmeur';
    }
    // frontface card background => img logo language
    let frontFaces = els.allCards.querySelectorAll('.front-face');
    console.log("front : ", frontFaces);
    for (let frontFace of frontFaces){
        console.log(frontFace);
        //frontFace = frontFace.push(frontFaces);
    }
    // for (let i = 0; i <= frontFaces.length; i++) {
    // //frontFace.src = `/img/THEMES/langage_prog/${i}.png`;
    // //console.log(frontFace);
    // }
  }

  if (gameSelect[0] == "serie") {
    // backface card background => img mask casa de papel
    let hiddenCards = els.allCards.querySelectorAll('.back-face');
    for (let backFace of hiddenCards) {
      backFace.src = '/img/THEMES/casa_de_papel/casa-mask-papel.gif';
      backFace.alt = 'image du masque casa de papel';
    }
    // frontface card background => img actor photos
  }
};

////////////////////////////////////////// Fonction de lancement du compteur de temps de jeu //////////////////////////////////////////////
const gameStart = () => {
  // console.log(els.popStart);
  els.popStart.classList.toggle('hidden');
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
