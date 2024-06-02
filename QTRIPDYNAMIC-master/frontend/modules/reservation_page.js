import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try{
    const url=`${config.backendEndpoint}/reservations`;
    const data=await fetch(url);
    const result=await data.json();
    return result;
  }
  // Place holder for functionality to work in the Stubs
  catch{
    return null;
  }


  // Place holder for functionality to work in the Stubs
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent
  if(reservations.length){
    document.getElementById("no-reservation-banner").style.display = "none";
    document.getElementById("reservation-table-parent").style.display = "block";
  } else {
    document.getElementById("no-reservation-banner").style.display = "block";
    document.getElementById("reservation-table-parent").style.display = "none";
  }

  for(let i=0;i<reservations.length;i++){
    var date=new Date(reservations[i].date);
    var time=new Date(reservations[i].time);
    var month=time.toLocaleString(undefined,{month:"long"})
    var day=time.getDate();
    var year=time.getFullYear();
    var booktime=time.toLocaleString("en-IN").split(" ");

    let k=reservations[i].adventure

    var tr=document.createElement("tr");
    tr.innerHTML=`<th>${reservations[i].id}</th>
    <td>${reservations[i].name}</td>
    <td>${reservations[i].adventureName}</td>
    <td>${reservations[i].person}</td>
    <td>${date.toLocaleDateString("en-IN")}</td>
    <td>${reservations[i].price}</td>
    <td>${day} ${month} ${year}, ${booktime[1]} ${booktime[2]}</td>
    <td id="${reservations[i].id}"><a href="../detail/?adventure=${k}">
    <button class="reservation-visit-button">Visit Adventure</button>
    </a></td>`
    
    document.getElementById("reservation-table").append(tr);
  }
}

export { fetchReservations, addReservationToTable };
