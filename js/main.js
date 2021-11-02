// création du tableau des éléments HTML
const els = {
  dispThemes: null,
  dispDifficult: null,
  allCards: null,
}

// Déclaration des variables
let gameSelect = [];

/*#####################################################################
##                        Initialisation du jeu                      ##
#####################################################################*/

// Fonction d'initialisation du jeu au lancement de la page.
const init = () => {

  // affectation des éléments HTML
  els.dispThemes = document.querySelector('#displayThemes');
  els.dispDifficult = document.querySelector('#displayDifficult');
  els.allCards = document.querySelector('#allCards');
  console.log("init");


  displayThemeChoices();
  console.log(gameSelect);

  // écoute du click sur le choix des themes
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

  // écoute du click sur le choix des difficultées
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

};

/*#####################################################################
##                        Construction des fonctions                 ##
#####################################################################*/

// Fonction d'affichage du choix des themes
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

// Fonction d'affichage du choix difficulté
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

// Fonction d'affichage du plateau de carte
const displayCardsGenerate = () => {
  // Effacement du menu des difficultées
  els.dispDifficult.classList.replace("d-flex", "hidden");
  generateCards(gameSelect);
};

// Génération des cartes suivant le theme choisi
const generateCards = (gameSelect) => {
  console.log("generate fonction : ",gameSelect[0]);
  if (gameSelect[0] == "enfant"){
    els.allCards.innerHTML = 
    `
    
    `;
  }
};

window.addEventListener('load', () => {
  init();
});
