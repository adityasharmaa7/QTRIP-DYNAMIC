
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const city = new URLSearchParams(search);
  const cityID = city.get('city');
  // console.log(cityID);
  return cityID;

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data

  // `config.backendEndpoint/adventures?city=` 
  
  try {
    const response = await fetch(config.backendEndpoint+'/adventures?city='+city);
    const adventure = await response.json();
    return adventure;
  } catch (error) {
    return null;
  }
  

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM

  let n = adventures.length;
  let rowContainer = document.querySelector("#data");

  for(let i=0;i<n;i++){

    let cards = document.createElement("div");
    cards.className = "cards col-6 col-sm-6 col-lg-3";
    rowContainer.append(cards);


    let anchor = document.createElement("a");
    anchor.id = adventures[i].id;
    anchor.href = `detail/?adventure=${adventures[i].id}`;
    cards.append(anchor);

    let tile = document.createElement("div");
    tile.className = "activity-card";
    anchor.append(tile);

    let image = document.createElement("img");
    image.src = adventures[i].image;
    image.className = "card-img-top";
    tile.append(image);

    let category = document.createElement("div");
    category.innerText = adventures[i].category;
    category.className = "category-banner";
    tile.append(category);


    let cardDetail = document.createElement("div");
    cardDetail.className = "card-datail";
    tile.appendChild(cardDetail);

    let card1 = document.createElement("div");
    card1.className = "card-body text-center d-md-flex justify-content-between";
    card1.innerHTML = `<p>${adventures[i].name}</p> <p>₹${adventures[i].costPerHead}</p>`;
    cardDetail.appendChild(card1);

    let card2 = document.createElement("div");
    card2.className = "card-body text-center d-md-flex justify-content-between";
    card2.innerHTML = `<p>Duration</p> <p>${adventures[i].duration} Hours</p>`;
    cardDetail.appendChild(card2);
  }

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list,low,high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list

  let filteredAdventures = [];
  for(let i=0;i<list.length;i++){
    let adventure = list[i];
    if(adventure.duration >= low && adventure.duration <= high){
      filteredAdventures.push(adventure);
    } 
  }
  return filteredAdventures;

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list

  let filteredAdventures = [];
  for(let i=0;i<list.length;i++){
    let adventure = list[i];
    for(let j=0;j<categoryList.length;j++){
      let category = categoryList[j];
      if(adventure.category == category){
        filteredAdventures.push(adventure);
      }
    }
  }
  return filteredAdventures;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  

  let durationValue = filters.duration;
  function splitStringIntoNumbers(durationValue) {
    const numberStrings = durationValue.split("-");
    const numbers = numberStrings.map(Number);
    return numbers;
  }
  const result = splitStringIntoNumbers(durationValue);
  let low = result[0];
  let high = result[1];
  let categoryValue = filters.category;

  // 1. Filter by duration only
  if(durationValue.length > 0 && categoryValue.length === 0){
    let filteredList = filterByDuration(list,low,high);
    console.log(filteredList);
    return filteredList;
  }

  // 2. Filter by category only
  if(durationValue.length === 0 && categoryValue.length > 0){
    let filteredList = filterByCategory(list,categoryValue);
    return filteredList;
  }


  // 3. Filter by duration and category together
  if(durationValue.length > 0 && categoryValue.length > 0){
    let filteredList = filterByCategory(list,categoryValue);
    filteredList = filterByDuration(filteredList,low,high);
    return filteredList;
  }
  
    return list;
  

  // Place holder for functionality to work in the Stubs
  // return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem('filters', JSON.stringify(filters));
   
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  // JSON.parse(localStorage.getItem('filters'));

  return JSON.parse(localStorage.getItem('filters'));
  // Place holder for functionality to work in the Stubs
  // return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  let pills = filters['category'];
  for(let i=0;i<pills.length;i++){
    let pillContainer = document.querySelector("#category-list");
    let newPill = document.createElement("div");
    newPill.className = "category-filter";
    newPill.textContent = pills[i];
    pillContainer.append(newPill);
  }
  

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
