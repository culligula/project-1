// #region MENU NAVIGATION VARIABLES
const mainMenuBtn = document.getElementById("return-to-main-menu");
const ingredientsMenuBtn = document.getElementById("ingredients-menu-btn");
const findRecipesBtn = document.getElementById("find-recipes-btn");
const viewSavedRecipesBtn = document.getElementById("view-saved-recipes-btn");
const mainMenuBtn2 = document.getElementById("return-to-main-menu-2");
const yesBtn = document.getElementById("weather-yes");
const noBtn = document.getElementById("weather-no");

const mainMenu = document.getElementById("main-menu");
const ingredientsMenu = document.getElementById("ingredients-menu");
const findRecipesMenu = document.getElementById("new-recipes-menu");
const savedRecipesMenu = document.getElementById("saved-recipes-menu");
const popup = document.getElementById("popup");
const main = document.getElementById("main");
// #endregion

let longitude = 0;
let latitude = 0;

//template for locating user coordinates from MDN: https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API/Using_the_Geolocation_API
function geoLocation() {
  let status = document.querySelector("#status");
  //called the lat/long coordinates from the browser; re-declared status to house coordinates
  function success(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    status = `${latitude} , ${longitude}`;
    //set coordinates to local storage
    localStorage.setItem("Latitude", latitude);
    localStorage.setItem("Longitude", longitude);
    gets();
  }
  //created catch criteria in case of errors
  function error() {
    status.textContent = "Unable to retrieve your location";
  }

  if (!navigator.geolocation) {
    status.textContent = "Geolocation is not supported by your browser";
  } else {
    navigator.geolocation.getCurrentPosition(success, error);
  }
  //utilized OpenWeather API to return temperature using coordinates
  var gets = function (user) {
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=343936b9fd05267869e0bf8c1d533d1c&units=imperial`;
    fetch(apiUrl)
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            console.log(data);
            displayWeather();

            function displayWeather() {
              console.log(data);

              var temperature = data.main.temp;
              console.log(temperature);
            }
          });
        } else {
          alert("Error: " + response.statusText);
        }
      })
      .catch(function (error) {
        alert("Unable to recommend recipes");
      });
  };
}

// #region MENU NAVIGATION
function resetConditions() {
  //erase ingredients selection string and buttons
}

function showMainMenu() {
  mainMenu.style.display = "block";
  ingredientsMenu.style.display = "none";
  findRecipesMenu.style.display = "none";
  savedRecipesMenu.style.display = "none";
  popup.style.display = "none";
}

function showIngredientsMenu() {
  mainMenu.style.display = "none";
  ingredientsMenu.style.display = "block";
  findRecipesMenu.style.display = "none";
  savedRecipesMenu.style.display = "none";
  popup.style.display = "none";
}

function showFindRecipesMenu() {
  mainMenu.style.display = "none";
  ingredientsMenu.style.display = "none";
  findRecipesMenu.style.display = "block";
  savedRecipesMenu.style.display = "none";
  popup.style.display = "none";
}

function showSavedRecipesMenu() {
  mainMenu.style.display = "none";
  ingredientsMenu.style.display = "none";
  findRecipesMenu.style.display = "none";
  savedRecipesMenu.style.display = "block";
  popup.style.display = "none";
}

function showModal() {
  popup.style.display = "block";
}

function openPopup() {
  popup.classList.add("open-popup");
  main.classList.add("overlay");
}

function closePopup() {
  popup.classList.remove("open-popup");
  main.classList.remove("overlay");
}

mainMenuBtn.addEventListener("click", showMainMenu);

ingredientsMenuBtn.addEventListener("click", showIngredientsMenu);

findRecipesBtn.addEventListener("click", showModal);

viewSavedRecipesBtn.addEventListener("click", showSavedRecipesMenu);

mainMenuBtn2.addEventListener("click", showMainMenu);

yesBtn.addEventListener("click", () => {
  geoLocation();
  showFindRecipesMenu();
});

noBtn.addEventListener("click", showFindRecipesMenu);
//#endregion
