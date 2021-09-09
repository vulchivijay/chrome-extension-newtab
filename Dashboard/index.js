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
  const hour = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  document.querySelector('#hours').innerHTML = prefixZero(hour);
  document.querySelector('#minutes').innerHTML = prefixZero(minutes);
  document.querySelector('#seconds').innerHTML = prefixZero(seconds);
}

time();

setInterval(function () {
  time();
}, 1000);
