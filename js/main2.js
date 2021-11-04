// création du tableau des éléments HTML
const els = {
  dispThemes: null,
  dispDifficult: null,
  allCards: null,
  playCards: null,
  popStart: null,
  count: null,
  backFace: null,
  frontFace: null,
}

// affectation des éléments HTML
els.dispThemes = document.querySelector('#displayThemes');
els.dispDifficult = document.querySelector('#displayDifficult');
els.allCards = document.querySelector('#allCards');
els.popStart = document.querySelector('#popStart');
els.count = document.querySelector('#count');
els.backFace = document.querySelectorAll('.back-face');
els.frontFace = document.querySelectorAll('.front-face');
els.playCards = document.querySelectorAll('.playCard');

// Déclaration des variables
let gameSelect = [];
let move = 0;
let time = 1;
let playCardIsFlipped = false;
let firstPlayCard, secondPlayCard;

/*######################################################################################################
##                                        Initialisation du jeu                                       ##
######################################################################################################*/

// Fonction d'initialisation du jeu au lancement de la page.
const init = () => {
  console.log("init");
  
  ////////////////////////////////// écoute du click sur le choix des themes/////////////////////////////////
  els.dispThemes.addEventListener('click', ({
    target
  }) => {
    if (target.matches('#themeEnfant')) {
      gameSelect.push("enfant");
      console.log(gameSelect);
      displayDifficultChoices(gameSelect);
    } else if (target.matches('#themeLangage')) {
      gameSelect.push("langage");
      console.log(gameSelect);
      displayDifficultChoices(gameSelect);
    } else if (target.matches('#themeSerie')) {
      gameSelect.push("serie");
      console.log(gameSelect);
      displayDifficultChoices(gameSelect);
    }
  });

  ///////////////////////////////// écoute du click sur le choix des difficultées//////////////////////////////
  els.dispDifficult.addEventListener('click', ({
    target
  }) => {
    if (target.matches('#btnTimeVs')) {
      gameSelect.push("timeVs");
      console.log(gameSelect);
      displayCards(gameSelect);
    } else if (target.matches('#btnPlayMoves')) {
      gameSelect.push("playMoves");
      console.log(gameSelect);
      displayCards(gameSelect);
    }
  });

  /////////////////////////// écoute du click sur le choix des cartes///////////////////////////////////////
  els.playCards.forEach(playCard => playCard.addEventListener('click', flipCard));


};
/*############################################ FIN INIT ####################################################*/

window.addEventListener('load', () => {
  init();
});
