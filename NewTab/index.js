let backgroundImage = document.getElementById('backgroundImage');

chrome.storage.sync.get('blue', (data) => {
  const defaultBgColor = data.blue;
  document.body.style.backgroundColor = defaultBgColor;
});

chrome.storage.sync.get('white', (data) => {
  const defaultTextColor = data.white;
  document.body.style.color = defaultTextColor;
});

function prefixZero(num) {
  return num < 10 ? `0${num}` : num;
}

function today() {
  const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const date = new Date();
  const numDate = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const currDay = date.getDay();
  const whatDay = DAYS[currDay];

  document.querySelector('#whatday').innerHTML = whatDay;
  document.querySelector('#today').innerHTML = prefixZero(numDate);
  document.querySelector('#month').innerHTML = prefixZero(month);
  document.querySelector('#year').innerHTML = year;
}

today();

function getHours() {
  let time = new Date();
  chrome.storage.sync.get('twofourtimeformat', (data) => {
    const timeformat = data.twofourtimeformat;
    if (timeformat) {
      if (time.getHours() >= 12)
        document.querySelector('#ampm').innerHTML = 'PM';
      else
        document.querySelector('#ampm').innerHTML = 'AM';
      document.querySelector('#hours').innerHTML = prefixZero(time.getHours() - 12);
    }
    else{
      document.querySelector('#ampm').innerHTML = '';
      document.querySelector('#hours').innerHTML = prefixZero(time.getHours());
    }
  });
}

function loadSystemTime() {
  const time = new Date();
  getHours();
  document.querySelector('#minutes').innerHTML = prefixZero(time.getMinutes());
  document.querySelector('#seconds').innerHTML = prefixZero(time.getSeconds());
}

loadSystemTime();

function updateSystemTime() {
  let time = new Date();
  if (time.getSeconds() == 0) {
    if (time.getMinutes() == 0) {
      getHours();
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
  updateSystemTime();
}, 1000);

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

setInterval(function () {
  timeFrame();
}, 3600000);

function loadBgImage() {
  fetch(`https://source.unsplash.com/3840x2160/?nature`).then((response) => {
    const imageUrl = response.url;
    chrome.storage.sync.set({ imageUrl });
    backgroundImage.style.backgroundImage = `url(${imageUrl})`;
  });
}

function drawWeather( data ) {
  var celcius = Math.round(parseFloat(data.main.temp)-273.15);
  // var fahrenheit = Math.round(((parseFloat(d.main.temp)-273.15)*1.8)+32);
  var description = data.weather[0].description; 
  
  document.getElementById('weather_description').innerHTML = description;
  document.getElementById('weather_temp').innerHTML = celcius + '&deg;';
  document.getElementById('weather_location').innerHTML = data.name;
  
  if( description.indexOf('rain') > 0 ) {
    document.body.className = 'rainy';
  } else if( description.indexOf('cloud') > 0 ) {
    document.body.className = 'cloudy';
  } else if( description.indexOf('sunny') > 0 ) {
    document.body.className = 'sunny';
  } else {
    document.body.className = 'clear';
  }
}

function weatherBallon( cityName ) {
  const key = 'ee7282f5ea6e0c75caebf32e113e3813';
  if(key=='')
    document.getElementById('weather_error').innerHTML = 'Openweathermap api key missing!';
  else {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityName+ '&appid=' + key)  
    .then(function(resp) { return resp.json() }) // Convert data to json
    .then(function(data) {
      drawWeather(data);
    })
    .catch(function() {
      // catch any errors
    });
  }
}


chrome.storage.sync.get('cityName', (data) => {
  const cityName = data.cityName;
  weatherBallon(cityName);
})

// this function which should run once a day
function runOncePerDay() {
  let date = new Date().toLocaleDateString();
  let localdate = null;

  chrome.storage.sync.get('localdate', (data) => {
    localdate = data.localdate;
    if (localdate == date) {
      chrome.storage.sync.get('imageUrl', (data) => {
        const imageUrl = data.imageUrl;
        if (imageUrl) {
          backgroundImage.style.backgroundImage = `url(${imageUrl})`;
        }
        else {
          loadBgImage();
        }
      });
    }
    else {
      localdate = date;
      chrome.storage.sync.set({ localdate });
      loadBgImage();
    }
  });
}

runOncePerDay();

// let page = document.getElementById("backgrounColor");
// let selectedClassName = "active";
// const btnColors = ["#1976d2", "#dc004e", "#79e902", "#fa9403", "#fdc702"];



// // Reacts to a button click by marking the selected button and saving the selection
// function handleButtonClick(event) {
//   // Remove styling from the previously selected color
//   let current = event.target.parentElement.querySelector(`.${selectedClassName}`);
//   if (current && current !== event.target) {
//     current.classList.remove(selectedClassName);
//   }
//   // Mark the button as selected
//   let color = event.target.dataset.color;
//   event.target.classList.add(selectedClassName);
//   chrome.storage.sync.set({ color });
//   document.body.style.backgroundColor = color;
// }

// // Add a button to the page for each supplied color
// function constructOptions(buttonColors) {
//   chrome.storage.sync.get("color", (data) => {
//     let currentColor = data.color;
//     // For each color we were provided…
//     for (let buttonColor of buttonColors) {
//       // …create a button with that color…
//       let button = document.createElement("button");
//       button.dataset.color = buttonColor;
//       button.style.backgroundColor = buttonColor;

//       // …mark the currently selected color…
//       if (buttonColor === currentColor) {
//         button.classList.add(selectedClassName);
//       }

//       // …and register a listener for when that button is clicked
//       button.addEventListener("click", handleButtonClick);
//       page.appendChild(button);
//     }
//   });
// }

// // Initialize the page by constructing the color options
// constructOptions(btnColors);

// const settingsBtn = document.getElementById("settings");
// const settingsModel = document.getElementById("settings_model");
// settingsBtn.addEventListener("click", function () {
//   if(settingsModel.classList.contains("active")) {
//     settingsModel.classList.remove("active");
//     settingsBtn.classList.remove("active");
//   }
//   else {
//     settingsModel.classList.add("active");
//     settingsBtn.classList.add("active");
//   }
// });