// création du tableau des éléments HTML
const els = {
  dispThemes: null,
  dispDifficult: null,
  allCards: null,
}

// Déclaration des variables
let theme = "";
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
  console.log(theme);

  // écoute du click sur le choix des themes
  els.dispThemes.addEventListener('click', ({
    target
  }) => {
    if (target.matches('#themeEnfant')) {
      theme = "enfant";
      //console.log(theme);
      displayDifficultChoices(theme);
    } else if (target.matches('#themeLangage')) {
      theme = "langage";
      //console.log(theme);
      displayDifficultChoices(theme);
    } else if (target.matches('#themeSerie')) {
      theme = "serie";
      //console.log(theme);
      displayDifficultChoices(theme);
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
    `
};

// Fonction d'affichage du choix difficulté
const displayDifficultChoices = () => {
  els.dispThemes.classList.replace("d-flex", "hidden");
  console.log("dispdif : " ,theme);
  els.dispDifficult.innerHTML =
    `
    
    `
};


window.addEventListener('load', () => {
  init();
});
