import { fetchData } from "./functions.js";
const placeToVisit = document.querySelector("#placesToVisit");
const allBtn = document.querySelector("#allBtn");
const templeBtn = document.querySelector("#templeBtn");
const trekkingBtn = document.querySelector("#trekkingBtn");
const landmarksBtn = document.querySelector("#landmarksBtn");

const searchParam = decodeURIComponent(window.location.search);
if (searchParam.length === 0) {
  location.replace("./Error.html");
}
const district = searchParam.split("=")[1].toLowerCase();
if (!localStorage.getItem("UttarakhandTourismData")) {
  fetchData();
}
const data = JSON.parse(localStorage.getItem("UttarakhandTourismData"));

const districtData = data.find((item) => item.districtName.toLowerCase() === district);
if (!districtData) {
  location.replace("./Error.html");
}

placeToVisit.textContent = `Places to Visit in ${districtData.districtName}`;
const districtInfo = document.querySelector("#district-info");
districtInfo.innerHTML = `
<div class="left">
  <h2 class="heading">${districtData.districtName}</h2>
  <p>${districtData.info} </p>
</div>
<div class="right">
  <div class="image-container">
    <div>
      <img src="${districtData?.images[0]}" alt="image">
    </div>
    <div>
      <div>
        <img src="${districtData?.images[1]}" alt="image">
      </div>
      <div>
        <img src="${districtData?.images[2]}" alt="image">
      </div>
    </div>
  </div>
</div>`;

const attractionContainer = document.querySelector("#attraction-container");
const placesData = JSON.parse(localStorage.getItem("UttarakhandTouristPlaces"));

const places = placesData.filter((item) => item.districtName.toLowerCase() === district);
if (places.length === 0) {
  attractionContainer.innerHTML = `<h2 class="sub-heading" style="grid-column:span 3;text-align:center">No Places</h2>`;
}
else {
  for (const item of places) {
    attractionContainer.innerHTML += `
    <div class="attraction-card">
    <img src="./Assests/places/${item.image}" alt="Attractions image" loading="lazy">
    <div class="info">
    <h3>${item.placeName}</h3>
    <a href="./location.html?place=${item.placeName}" class="btn-style">Read More</a>
    </div>
    </div>`
  }
}

// filter function to filter out places
function filterPlaces(filterType = "all") {
  let filterPlace = [];
  attractionContainer.innerHTML = "";

  filterType = filterType.toLowerCase();
  if (filterType === "all") {
    filterPlace = places;
  }
  else {
    filterPlace = places.filter((item) => item.category.toLowerCase() === filterType);
  }
  if (filterPlace.length === 0) {
    attractionContainer.innerHTML = `<h2 class="sub-heading" style="grid-column:span 3;text-align:center">No Places</h2>`;
    return;
  }
  for (const item of filterPlace) {
    attractionContainer.innerHTML += `
    <div class="attraction-card">
    <img src="./Assests/places/${item.image}" alt="Attractions image" loading="lazy">
    <div class="info">
    <h3>${item.placeName}</h3>
    <a href="./location.html?place=${item.placeName}" class="btn-style">Read More</a>
    </div>
    </div>`
  }
}

allBtn.addEventListener("click", () => {
  filterPlaces()
});
templeBtn.addEventListener("click", () => {
  filterPlaces("temple")
});
trekkingBtn.addEventListener("click", () => {
  filterPlaces("trekking")
});
landmarksBtn.addEventListener("click", () => {
  filterPlaces("landmark")
});
