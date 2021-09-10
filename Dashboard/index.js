let page = document.getElementById("backgrounColor");
let selectedClassName = "active";
const btnColors = ["#1976d2", "#dc004e", "#79e902", "#fa9403", "#fdc702"];

function prefixZero(num) {
  return num < 10 ? `0${num}` : num;
}

function timeFrame() {
  const date = new Date();
  const currHour = date.getHours();
  if (currHour >= 6 && currHour <= 11) {
    timeframe = 'morning';
  } else if (currHour >= 12 && currHour <= 16) {
    timeframe = 'afternoon';
  } else if (currHour >= 17 && currHour <= 20) {
    timeframe = 'evening';
  } else {
    timeframe = 'night';
  }
  
  document.querySelector('#timeframe').innerHTML = timeframe;
}

timeFrame();

function day() {
  const date = new Date();
  const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const numDate = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const currDay = date.getDay();
  const dayString = DAYS[currDay];

  document.querySelector('#day').innerHTML = dayString;
  document.querySelector('#num-date').innerHTML = prefixZero(numDate);
  document.querySelector('#month').innerHTML = prefixZero(month);
  document.querySelector('#year').innerHTML = year;
}

day();

function time () {
  let time = new Date();
  document.querySelector('#hours').innerHTML = prefixZero(time.getHours());
  document.querySelector('#minutes').innerHTML = prefixZero(time.getMinutes());
  document.querySelector('#seconds').innerHTML = prefixZero(time.getSeconds());
}

time();

function timeInterval () {
  let time = new Date();
  if (time.getSeconds() == 0) {
    if (time.getMinutes() == 0) {
      document.querySelector('#hours').innerHTML = prefixZero(time.getHours());
    }
    else {
      document.querySelector('#minutes').innerHTML = prefixZero(time.getMinutes());
    }
  }
  else {
    document.querySelector('#seconds').innerHTML = prefixZero(time.getSeconds());
  }
}

setInterval(function () {
  timeInterval();
}, 1000);


// Reacts to a button click by marking the selected button and saving the selection
function handleButtonClick(event) {
  // Remove styling from the previously selected color
  let current = event.target.parentElement.querySelector(`.${selectedClassName}`);
  if (current && current !== event.target) {
    current.classList.remove(selectedClassName);
  }
  // Mark the button as selected
  let color = event.target.dataset.color;
  event.target.classList.add(selectedClassName);
  chrome.storage.sync.set({ color });
  document.body.style.backgroundColor = color;
}

// Add a button to the page for each supplied color
function constructOptions(buttonColors) {
  chrome.storage.sync.get("color", (data) => {
    let currentColor = data.color;
    // For each color we were provided…
    for (let buttonColor of buttonColors) {
      // …create a button with that color…
      let button = document.createElement("button");
      button.dataset.color = buttonColor;
      button.style.backgroundColor = buttonColor;

      // …mark the currently selected color…
      if (buttonColor === currentColor) {
        button.classList.add(selectedClassName);
      }

      // …and register a listener for when that button is clicked
      button.addEventListener("click", handleButtonClick);
      page.appendChild(button);
    }
  });
}

// Initialize the page by constructing the color options
constructOptions(btnColors);

const settingsBtn = document.getElementById("settings");
const settingsModel = document.getElementById("settings_model");
settingsBtn.addEventListener("click", function () {
  if(settingsModel.classList.contains("active")) {
    settingsModel.classList.remove("active");
    settingsBtn.classList.remove("active");
  }
  else {
    settingsModel.classList.add("active");
    settingsBtn.classList.add("active");
  }
});