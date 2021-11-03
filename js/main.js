// création du tableau des éléments HTML
const els = {
  dispThemes: null,
  dispDifficult: null,
  allCards: null,
  popStart: null,
}
// affectation des éléments HTML
els.dispThemes = document.querySelector('#displayThemes');
els.dispDifficult = document.querySelector('#displayDifficult');
els.allCards = document.querySelector('#allCards');
els.popStart = document.querySelector('#popStart');
// Déclaration des variables
let gameSelect = [];

/*######################################################################################################
##                                        Initialisation du jeu                                       ##
######################################################################################################*/

// Fonction d'initialisation du jeu au lancement de la page.
const init = () => {
  console.log("init");
  // Affichage du choix des themes
  displayThemeChoices();

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
      displayCardsGenerate(gameSelect);
    } else if (target.matches('#btnPlayMoves')) {
      gameSelect.push("playMoves");
      console.log(gameSelect);
      displayCardsGenerate(gameSelect);
    }
  });

  /////////////////////////// écoute du click sur le choix des cartes///////////////////////////////////////
  els.allCards.addEventListener('click', ({
    target
  }) => {
    if (target.matches('.card')) {

      console.log("carte clické");
      // displayCardsGenerate(gameSelect);
      // } else if (target.matches('#btnPlayMoves')) {
      //   gameSelect.push("playMoves");
      //   console.log(gameSelect);
      //   displayCardsGenerate(gameSelect);
    }
  });

};
/*############################################ FIN INIT ####################################################*/

window.addEventListener('load', () => {
  init();
});
