// import { ok } from "assert";
import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  
  // let data = await fetch("http://3.108.3.2:8082/cities");
  // let cities = await data.json();
  // return cities;

  try {
    let data = await fetch(config.backendEndpoint+"/cities");
    // if(!data.ok){
    //   throw new Error("Error");
    // }
    let cities = await data.json();
    return cities;
  } catch (error) {
    return null;
  }

}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let rowContainer = document.querySelector("#data");

  // Creating Cards 
  let cards = document.createElement("div");
  cards.className = " cards col-6 col-sm-6 col-md-3";
  rowContainer.append(cards);

  // Creating Anchor-Tag
  let redirect = document.createElement("a");
  redirect.href = `pages/adventures/?city=${id}`;
  redirect.id = id;
  cards.append(redirect);

  // Creating Tile
  let tile = document.createElement("div");
  tile.className = "tile";
  redirect.append(tile);

  //  Creating Tile-Text
  let tiletext = document.createElement("div");
  tiletext.className = "tile-text";
  tiletext.innerHTML = `<h5>${city}</h5> <p>${description}</p>`;
  tile.append(tiletext); 

  // Creating Image-Tag
  let tileImage = document.createElement("img");
  tileImage.className = "img-fluid";
  tileImage.src = image;
  tile.append(tileImage); 

}

export { init, fetchCities, addCityToDOM };
