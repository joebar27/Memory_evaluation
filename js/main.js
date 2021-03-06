/*######################################################################################################
##                                     Initialisation des variables                                   ##
######################################################################################################*/

// création du tableau des éléments HTML
const els = {
  welcome: null,
  dispThemes: null,
  dispDifficult: null,
  popStart: null,
  allCards: null,
  playCards: null,  
  count: null,
  result: null,
  backFaces: null,
  frontFaces: null,
};

// affectation des éléments HTML
els.welcome = document.querySelector('#welcome');
els.dispThemes = document.querySelector('#displayThemes');
els.dispDifficult = document.querySelector('#displayDifficult');
els.popStart = document.querySelector('#popStart');
els.allCards = document.querySelector('#allCards');
els.count = document.querySelector('#count');
els.result = document.querySelector('#result');

els.backFaces = document.querySelectorAll('.back-face');
els.frontFaces = document.querySelectorAll('.front-face');
els.playCards = document.querySelectorAll('.playCard');

// Déclaration des variables
let gameSelect = [];
let move = 0;
let time = 1;
let timeScore = null;
let countMatchedCard = 0;
let playCardIsFlipped = false;
let firstPlayCard, secondPlayCard;
let lockCards = false;

/*######################################################################################################
##                                        Initialisation du jeu                                       ##
######################################################################################################*/

// Fonction d'initialisation du jeu au lancement de la page.
const init = () => {
  //console.log("init");
  ////////////////////////// appel de la fonction d'affichage du message du bienvenue /////////////////////////
  diplayWelcome();

  ////////////////////////////////// appel de la fonction de melange de carte /////////////////////////////////
  shuffle();

  ////////////////////////////////// écoute du click sur le choix des themes /////////////////////////////////
  els.dispThemes.addEventListener('click', ({
    target
  }) => {
    if (target.matches('#themeEnfant')) {
      gameSelect.push("enfant");
      console.log(gameSelect);
      changePlayCards(gameSelect[0]);
      displayDifficultChoices(gameSelect);
    } else if (target.matches('#themeLangage')) {
      gameSelect.push("langage");
      console.log(gameSelect);
      displayDifficultChoices(gameSelect);
    } else if (target.matches('#themeSerie')) {
      gameSelect.push("serie");
      console.log(gameSelect);
      changePlayCards(gameSelect[0]);
      displayDifficultChoices(gameSelect);
    }
  });

  ///////////////////////////////// écoute du click sur le choix des difficultées //////////////////////////////
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

  /////////////////////////// écoute du click sur le choix des cartes ///////////////////////////////////////
  els.playCards.forEach(playCard => playCard.addEventListener('click', flipCard));


};
/*############################################ FIN INIT ####################################################*/

window.addEventListener('load', () => {
  init();
});
