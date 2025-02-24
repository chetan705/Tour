

export async function fetchData() {
  try {
    const response = await fetch("./Json/data.json");
    const data = await response.json();
    if (data) {
      window.localStorage.setItem("UttarakhandTourismData", JSON.stringify(data))
    }
  }
  catch (err) {
    alert(err.message);
  }
}

export async function fetchDataPlaces() {
  try {
    const response = await fetch("./Json/places.json");
    const data = await response.json();
    if (data) {
      window.localStorage.setItem("UttarakhandTouristPlaces", JSON.stringify(data))
    }
  }
  catch (err) {
    alert(err.message);
  }
}



export function showError(errorMsg) {
  const errorEle = document.querySelector("#showError");
  const ele = document.createElement("span");
  ele.textContent = errorMsg;
  errorEle.append(ele);
  setTimeout(() => {
    errorEle.removeChild(ele);
  }, 2000);
}