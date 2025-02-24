import { fetchDataPlaces, getRegisteredUser, showError, validateName } from "./functions.js";
import { showAlert } from "./alerts.js";

let queryParam = window.decodeURIComponent(location.search);
if (queryParam.length === 0) {
  location.replace("./Error.html");
}
const place = queryParam.split("=")[1].toLowerCase();
if (!localStorage.getItem("UttarakhandTouristPlaces")) {
  fetchDataPlaces();
}

const places = JSON.parse(localStorage.getItem("UttarakhandTouristPlaces"));
const data = places.find(item => place === item.placeName.toLowerCase());

if (!data) {
  location.replace("./Error.html");
}

// get registered User
const currentUser = getRegisteredUser();

const locationInfo = document.querySelector("#location-details");
locationInfo.innerHTML = `
<div class="image">
        <img src="./Assests/login.jpg" alt="image" fetchpriority="high">
</div>
<div class="banner-info">
<div>
    <h1>${data.placeName}</h1>
    <h2 id="location-name">${data.districtName}</h2>
</div>
</div>`;

const locationInfoCard = document.querySelector("#location-info-card");
locationInfoCard.innerHTML = `
<div class="location-info">
<h3>What to Know</h3>
<p>${data.description}</p>
</div>
<div class="time-to-visit ">
<h3>Best time to Visit</h3>
<p>${data.bestTimeToVisit}</p>
</div>`;

const howToReach = document.querySelector("#how-to-reach");
howToReach.innerHTML = `<div class="card">
            <h3>By Road</h3>
            <p>${data.howToReach.byRoad}</p>
          </div>
          <div class="card">
            <h3>By Air</h3>
            <p>${data.howToReach.byAir}</p>
          </div>
          <div class="card">
            <h3>By Train</h3>
            <p>${data.howToReach.byTrain}</p>
          </div>`;




const reviewFormBtn = document.querySelector("#reviewFormBtn");
const reviewBoxForm = document.querySelector("#reviewForm");

reviewFormBtn.addEventListener("click", () => {
  if (!currentUser) {
    showAlert("error", "Please Login");
    return;
  }
  reviewBoxForm.classList.toggle("hide");
  document.querySelector("#useremail").value = currentUser.email;
  document.querySelector("#username").value = currentUser.name;
});



const galleryContainer = document.querySelector("#galleryContainer") || [];
const images = JSON.parse(localStorage.getItem("galleryImages") || "[]").filter(item => item.location == data.placeName).slice(-8);
console.log(data.placeName);
console.log(images);

if (images.length === 0) {
  galleryContainer.innerHTML = `<h4 class="tx-center m-1" style="grid-column:span 3">No Images 🥲</h4>`;
}
else {
  for (const item of images) {
    galleryContainer.innerHTML += `
       <div class="picture-card">
            <img src="${item.imageField}" alt="Picture">
        </div>`;
  }
}

// gallery section
const pictureUploadBtn = document.querySelector("#pictureUploadBtn");
const pictureUploadForm = document.querySelector("#pictureUploadForm");
document.querySelector("#uploaderName").value = currentUser.name;

pictureUploadBtn.addEventListener("click", () => {
  if (!currentUser) {
    showAlert("error", "Please Login");
    return;
  }
  pictureUploadForm.classList.toggle("hide");
});

document.querySelector("#imageField").addEventListener("input", (e) => {
  const image = e.target.value;
  showImagePreview(image);
})


function showImagePreview(image) {
  document.querySelector(".previewImage").src = image;
}
