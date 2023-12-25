/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
 */

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from "./games.js";

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA);

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
 */

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
  games.forEach((game) => {
    const gameCard = document.createElement("div");
    gameCard.classList.add("game-card");
    gameCard.innerHTML = `
            <img src="${game.img}" alt="${game.name}" />
            <h3>${game.name}</h3>
            <p>${game.description}</p>
            <p>Backers: ${game.backers}</p>
            <p>Pledged: $${game.pledged.toLocaleString()}</p>
            <p>Goal: $${game.goal.toLocaleString()}</p>
        `;
    gamesContainer.appendChild(gameCard);
  });
  // loop over each item in the data

  // create a new div element, which will become the game card

  // add the class game-card to the list

  // set the inner HTML using a template literal to display some info
  // about each game
  // TIP: if your images are not displaying, make sure there is space
  // between the end of the src attribute and the end of the tag ("/>")

  // append the game to the games-container
}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
 */

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
contributionsCard.innerText = `
    ${GAMES_JSON.reduce((total, game) => {
      return total + game.backers;
    }, 0)}`;

// set the inner HTML using a template literal and toLocaleString to get a number with commas

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
raisedCard.innerText = `
    $${GAMES_JSON.reduce((total, game) => {
      return total + game.pledged;
    }, 0)}`;

// set inner HTML using template literal

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
gamesCard.innerText = `${GAMES_JSON.length}`;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
 */

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
  deleteChildElements(gamesContainer);
  addGamesToPage(GAMES_JSON.filter((game) => game.pledged < game.goal));
  // use filter() to get a list of games that have not yet met their goal

  // use the function we previously created to add the unfunded games to the DOM
}

// show only games that are fully funded
function filterFundedOnly() {
  deleteChildElements(gamesContainer);
  addGamesToPage(GAMES_JSON.filter((game) => game.pledged >= game.goal));

  // use filter() to get a list of games that have met or exceeded their goal

  // use the function we previously created to add unfunded games to the DOM
}

// show all games
function showAllGames() {
  deleteChildElements(gamesContainer);
  addGamesToPage(GAMES_JSON);
  // add all games from the JSON data to the DOM
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
 */

// grab the description container
const descriptionContainer = document.getElementById("description-container");

const calculateUnfundedGames = () =>
  GAMES_JSON.filter((game) => game.pledged < game.goal).length;

// use filter or reduce to count the number of unfunded games
const numUnfunded = calculateUnfundedGames();
descriptionContainer.innerHTML =
  numUnfunded === 1
    ? `There is ${numUnfunded} unfunded game on this site.`
    : `There are ${
        numUnfunded === 0 ? "no" : numUnfunded
      } unfunded games on this site.`;
// create a string that explains the number of unfunded games using the ternary operator

// create a new DOM element containing the template string and append it to the description container

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames = GAMES_JSON.sort((item1, item2) => {
  return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [topGame, runnerUp] = sortedGames;
console.log(topGame, runnerUp);

// create a new element to hold the name of the top pledge game, then append it to the correct element
const topGameName = document.createElement("h3");
topGameName.innerText = topGame.name;
firstGameContainer.appendChild(topGameName);

// do the same for the runner up item
const runnerUpName = document.createElement("h3");
runnerUpName.innerText = runnerUp.name;
secondGameContainer.appendChild(runnerUpName);

addGamesToPage(GAMES_JSON);
const backgroundInfo = `
<p>
    Established in the heart of a bustling metropolis twelve years ago, our esteemed enterprise, Sea Monster Crowdfunding, embarked on a remarkable journey with a visionary zeal to kindle the flames of creativity in the realm of independent game development. Our raison d'être is to serve as a beacon of hope and a catalyst for innovation, offering a platform where the seeds of ingenuity can find fertile soil and the nourishment they require to bloom into the captivating digital experiences that gamers around the world cherish and laud.
</p>
<p>
    Over the span of our operations, which has witnessed the wax and wane of many a moon, we have had the privilege of witnessing a cavalcade of games, each unique in its narrative and gameplay, come to life through the generous contributions of patrons who share our passion for gaming renaissance. Despite our numerous successes, and the myriad of games that have soared beyond their funding aspirations, a not insignificant number of promising ventures still remain on the cusp of realization, awaiting the munificent support of contributors to cross the threshold from the unfunded echelons into the pantheon of fully-funded masterpieces. As of the present moment, the number of such games that stand unfunded, each a sleeping giant with the potential to revolutionize the gaming landscape, is a matter we intend to disclose with precise numbers to evoke action from our esteemed supporters.
</p>
`;

// JS code to insert the verbose background information into the description container
document.getElementById("description-container").innerHTML = backgroundInfo;

// Assuming you have a function to calculate the number of unfunded games
const unfundedGamesCount = calculateUnfundedGames(); // This function should return the count of unfunded games
const unfundedGamesInfo = `
<p>
    As we stand on the precipice of the current fiscal year, an analytical gaze cast upon our portfolio of projects reveals that a total of ${unfundedGamesCount} games, each with their own unique artistry and interactive storytelling potential, are yet to achieve the funding necessary to catapult them from the drawing board into the waiting hands of eager gamers and connoisseurs of the gaming arts. This number, while reflective of the vast ocean of untapped potential that lies dormant within our collective creative endeavors, also stands as a clarion call to our beloved community, beckoning the support and contributions that can transform these embryonic concepts into fully-fledged gaming experiences.
</p>
`;

// Insert the unfunded games information into the stats container
document.getElementById("num-contributions").innerHTML = unfundedGamesInfo;
