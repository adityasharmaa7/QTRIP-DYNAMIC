import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  try {
    const params = new URLSearchParams(search);
    const adventureId = params.get("adventure");
    return adventureId;
  } catch (error) {
    return null;
  }
  // // Place holder for functionality to work in the Stubs
  // return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    const url = config.backendEndpoint + `/adventures/detail/?adventure=${adventureId}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }


  // // Place holder for functionality to work in the Stubs
  // return null;
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
const {id,name,content,subtitle,images=[]} = adventure;

  const adventureNameElement = document.getElementById("adventure-name");
  const adventureSubtitleElement = document.getElementById("adventure-subtitle");
  const adventureContentElement = document.getElementById("adventure-content");
  const photoGalleryElement = document.getElementById("photo-gallery");
  
  adventureNameElement.textContent = name;
  adventureContentElement.textContent = content;
  adventureSubtitleElement.textContent = subtitle;

  images.forEach(image => {
    const imageContainer = document.createElement("div");
    imageContainer.className = "col-lg-8 w-100";
    imageContainer.innerHTML = `
    <img
    src = ${image}
    alr = "image"
    class = "activity-card-image "
    />
    `
    photoGalleryElement.append(imageContainer);
  });
  
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  const outerBody = `
  <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div id="carousel-indicators-button" class="carousel-indicators">
  </div>
  <div id="carousel-inner-container" class="carousel-inner">
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
  `; 

  const photoGalleryElement = document.getElementById("photo-gallery");
  photoGalleryElement.innerHTML = outerBody;

  const carouselInnerContainr = document.getElementById("carousel-inner-container");
  images.forEach((image,index)=>{
    const imgContainer = document.createElement("div");
    imgContainer.className = `carousel-item ${index === 0 ? 'active': ''}`;
    imgContainer.innerHTML = `
    <img
    src=${image}
    alt="image"
    class="activity-card-image w-100"
    />
    `;

    carouselInnerContainr.append(imgContainer);
  });

  const carouselIndicatorsButtonElement = document.getElementById("carousel-indicators-button");
  images.forEach((image,index)=>{
    const newButton = document.createElement("button");
    newButton.className = `${index === 0 ? 'active' : ''}`;
    newButton.type = "button";
    newButton.dataset.bsTarget = "#carouselExampleIndicators";
    newButton.dataset.bsSlideTo = index;

    carouselIndicatorsButtonElement.append(newButton);
  });
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  const{available,costPerHead} = adventure;

  const reservationPersonCostElement = document.getElementById("reservation-person-cost");
  reservationPersonCostElement.innerHTML = costPerHead;

  const reservationPanelAvailableElement = document.getElementById("reservation-panel-available");
  const reservationPanelSoldOutElement = document.getElementById("reservation-panel-sold-out");

  if(available){
    reservationPanelAvailableElement.style.display = "block";
    reservationPanelSoldOutElement.style.display = "none";
  }else{
    reservationPanelAvailableElement.style.display = "none";
    reservationPanelSoldOutElement.style.display = "block";
  }

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  const {costPerHead} = adventure;
  const total = Number(costPerHead) * Number(persons);
  const reservationCostElement = document.getElementById("reservation-cost");
  reservationCostElement.innerHTML = total;

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  const myForm = document.getElementById("myForm")
  myForm.addEventListener("submit",async(e) =>{
    e.preventDefault()
    let res = {
      name: myForm.elements.name.value,
      date: myForm.elements.date.value,
      person: myForm.elements.person.value,
      adventure: adventure.id
    } 
    const options = {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(res),
      };
    try {
        const url = `${config.backendEndpoint}/reservations/new`
        const response = await fetch(url,options)
        const verify = await response.json()
        alert("Success")
        window.location.reload()

      } catch(error){
        console.log(error)
        alert("Failed")
    }
  })
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't

  const {reserved}  =adventure;
  const reservedBannerElement = document.getElementById("reserved-banner");

  if(reserved){
    reservedBannerElement.style.display = "block";
  }else{
    reservedBannerElement.style.display = "none";
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
