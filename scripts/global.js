const openBtn = document.querySelector("#menu-open-btn");
const closeBtn = document.querySelector("#menu-close-btn");
const header = document.querySelector("#header");

openBtn.addEventListener("click", () => {
  header.style.left = "0";
})

closeBtn.addEventListener("click", () => {
  header.style.left = "-300px";
});

// load district info
const distrtictList = document.getElementById("district-list");
const fragment = new DocumentFragment();

if (localStorage.getItem("UttarakhandTourismData")) {
  const data = JSON.parse(localStorage.getItem("UttarakhandTourismData"));
  if (data) {
    for (const item of data) {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.setAttribute("href", `./district.html?district=${item.districtName}`);
      a.textContent = item.districtName;
      li.appendChild(a);
      fragment.appendChild(li);
    }
    distrtictList.appendChild(fragment);
  }
}

const footerSection = document.querySelector("#footerContainer");
if (footerSection) {
  // load footer
  footerSection.innerHTML = `
<div class="footer-container">
  <div class="footer">
    <div class="logobox">
      <div>
        <img src="./Assests/logo.svg" alt="logo" />
      </div>
      <address>
        Dalanwala Dehradun<br />
        Uttarakhand, India
      </address>
      <div class="icons">
        <a href="#" aria-label="facebook-link">
          <i class="fa-brands fa-facebook fa-xl" style="color: #ffffff"></i>
        </a>
        <a href="#" aria-label="twitter-link">
          <i class="fa-brands fa-twitter fa-xl" style="color: #ffffff"></i>
        </a>
        <a href="mailto:abc@gmail.com" aria-label="mail-link">
          <i class="fa-solid fa-envelope fa-xl" style="color: #ffffff"></i>
        </a>
        <a href="#" aria-label="instagram-link">
          <i class="fa-brands fa-instagram fa-xl" style="color: #ffffff"></i>
        </a>
      </div>
    </div>
    <div class="pages">
      <h3>Pages</h3>
      <ul>
        <li><a href="./about.html">About Us</a></li>
        <li><a href="./contact-us.html">Contact Us</a></li>
        <li><a href="./destinations.html">Destination</a></li>
      </ul>
    </div>
    <div class="important">
    </div>
  </div>
  <div class="copyright-section">
    <p>Copyright &copy; 2024 All right reserved</p>
  </div>
</div>`;
}