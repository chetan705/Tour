import { fetchData, fetchDataPlaces, verifySignIn } from "./functions.js";
verifySignIn();

if (!localStorage.getItem("UttarakhandTourismData")) {
  fetchData();
}
if (!localStorage.getItem("UttarakhandTouristPlaces")) {
  fetchDataPlaces();
}

fetchHomeData();
async function fetchHomeData() {
  try {
    const response = await fetch("./json/home.json");
    const data = await response.json();
    displaySlider(data.slider);
    displayInfo(data.info);
    displayChardham(data.chardhamm);
    displayTestimonial(data.testimonials);
    displayGallery(data.gallery);
  }
  catch (e) {
    console.log(e);
  }
}


function displaySlider(slider) {
  const sliderSection = document.querySelector("#sliderSection");
  sliderSection.firstElementChild.textContent = slider.heading;
  for (const item of slider.slides) {
    sliderSection.lastElementChild.firstElementChild.innerHTML += `
      <div class="swiper-slide">
          <div class="left">
            <img src="${item.image}" alt="${item.heading}" fetchpriority="high" />
          </div>
          <div class="right">
            <h3>${item.heading}</h3>
            <p>${item.content}</p>
          </div>
      </div>`;
  }
}

function displayTestimonial(testimonial) {
  const testimonialSection = document.querySelector("#testimonialSection");
  testimonialSection.firstElementChild.innerHTML =
    `<div>
      <h3>Testimonials</h3>
      <h2 class="heading">${testimonial.heading}</h2>
    </div>
    <p>${testimonial.content}</p>`;

  let container = testimonialSection.lastElementChild;
  for (const item of testimonial.testimonialsCards) {
    container.innerHTML += `
      <div class="testimonial-card">
        <div class="top">
          <p>${item.testimonial} </p>
          <div class="userimage">
            <img src="${item.userImage}" alt="${item.name}" loading="lazy" />
          </div>
        </div>
        <div>
          <span>${item.name}</span>
          <span>Traveler</span>
        </div>
      </div>`;
  }
}

function displayChardham(data) {
  const chardhamSection = document.querySelector("#chardhamSection");
  chardhamSection.firstElementChild.textContent = data.heading;
  let left = chardhamSection.lastElementChild.firstElementChild.firstElementChild;
  for (const item of data.images) {
    left.innerHTML += `
      <div>
        <img src="${item}" alt="Badrinath">
      </div>`;
  }
  left.nextElementSibling.innerHTML = `
            <h3 class="mb-1">${data.subHeading}</h3>
            <p>${data.content}</p>`;
}

function displayGallery(data) {
  const gallerySection = document.querySelector("#gallerySection");
  gallerySection.firstElementChild.innerHTML = `
  <div>
    <h3>Photo Gallery</h3>
    <h2 class="heading">${data.heading}</h2>
  </div>
  <p>${data.content}</p>`;

  for (const item of data.galleryImages) {
    gallerySection.lastElementChild.innerHTML += `
    <div>
    <img src="${item}" alt="gallery Image">
    </div>`;
  }
}

function displayInfo(data) {
  const infoSection = document.querySelector("#infoSection");
  infoSection.firstElementChild.innerHTML = `
    <h2 class="heading m-0">${data.heading}</h2>
    <p>${data.content}</p>`;
}

const searchField = document.querySelector("#searchField");
const searchedItemContainer = document.querySelector("#searchedItemContainer");

const allPlaces = JSON.parse(localStorage.getItem("UttarakhandTouristPlaces"));

searchField.addEventListener("input", () => {
  filterSearchPlaces(searchField.value);
});

function filterPlace(searchValue) {
  let filteredItem = [];
  searchValue = searchValue.toLowerCase();
  searchedItemContainer.innerHTML = "";

  if (searchValue.length === 0) {
    filteredItem = [];
    searchedItemContainer.innerHTML = '';
    return;
  }
  else {
    filteredItem = allPlaces.filter(item => item.placeName.toLowerCase().includes(searchValue));
  }
  if (filteredItem.length === 0) {
    searchedItemContainer.innerHTML = `<li><a>No Match Found</a></li>`;
    return
  }
  for (const item of filteredItem) {
    searchedItemContainer.innerHTML += `<li><a href="./location.html?place=${item.placeName}">${item.placeName}, ${item.districtName}</a></li>`
  }
}

function debounce(fun, delay = 500) {
  let timer;
  return (searchVal) => {
    clearTimeout(timer);
    timer = setTimeout(() => { fun.call({}, searchVal) }, delay);
  }
}
const filterSearchPlaces = debounce(filterPlace, 700);

// script for blog section
fetchBlogs();
async function fetchBlogs() {
  try {
    const response = await fetch('./json/blog.json');
    if (response.status !== 200) {
      throw new Error("Request Failed");
    }
    else {
      let blogs = await response.json();
      if ((localStorage.getItem("blogsData") == null || localStorage.getItem("blogsData") == "[]")) {
        localStorage.setItem("blogsData", JSON.stringify(blogs));
      }
      const localStorageBlog = JSON.parse(localStorage.getItem("blogsData"));
      displayHomeBlogs(localStorageBlog);
    }
  }
  catch (e) {
    console.log("Failed To fetch blogs.");
  }
}

function displayHomeBlogs(allBlogs) {

  const blogSection = document.querySelector("#blogSection");
  let blogHeader = document.createElement("div");
  blogHeader.innerHTML = `
      <h2 class="heading">Read Our Lastest Blog Here</h2>
      <p class="mb-1">
        we share stories, insights, and tips that bring to life the diverse experiences this Himalayan paradise
        offers. From hidden gems and adventure activities to cultural heritage our blogs cover everything
      </p>`;

  blogSection.firstElementChild.prepend(blogHeader);
  const latestBlog = blogSection.firstElementChild.lastElementChild;
  const blogContainer = blogSection.lastElementChild;
  const firstFourBlogs = allBlogs.slice(-4);

  if (allBlogs.length == 0) {
    latestBlog.innerHTML = `<h4> No Blogs Available</h4>`;
  }
  else {
    latestBlog.innerHTML = `
    <img src = "${allBlogs.at(-1).image}" alt = "blog cover" loading ="lazy"/>
      <div class="overlay">
        <h3 title="${allBlogs.at(-1).heading}">${allBlogs.at(-1).heading}</h3>
        <a href="./blog.html?blogId=${allBlogs.at(-1).blogId}">Read More -></a>
      </div>`;
  }
  if (firstFourBlogs.length > 0) {
    blogContainer.innerHTML = '';
    for (const item of firstFourBlogs) {
      blogContainer.innerHTML += `
        <div class="blog-card">
          <div class="blog-image">
            <img src="${item.image ? item.image : "./Assests/blog_default2.jpg"}" alt="blog imgae" loading="lazy"/>
          </div>
          <div class="blog-data">
            <h3 title="${item.heading}">${item.heading}</h3>
            <p>${item.message.slice(0, 60)}... </p>
            <a href="./blog.html?blogId=${item.blogId}">Read More-></a>
          </div>
      </div> `;
    }
  }
}
