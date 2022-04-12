const icons = {
  clear: "☀",
  rain: "️🌧",
  storm: "⛈",
  snow: "🌨",
  mist: "🌫",
  Clouds: "☁",
};
const currentHour = moment().format("H");
if (currentHour >= 3 && currentHour < 12) {
  greeting = "Good Morning";
} else if (Number(currentHour) >= 12 && currentHour < 15) {
  greeting = "Good Afternoon";
} else if (currentHour >= 15 && currentHour < 20) {
  greeting = "Good Evening";
} else if (currentHour >= 20) {
  console.log("20-3");
  greeting = "Good Night";
} else {
  greeting = "Hello";
}

console.log("greeting", greeting);

//Initial a request for the location
navigator.geolocation.getCurrentPosition(function (pos) {
  //'pos' return object has many properties we can grab
  var geoLat = pos.coords.latitude.toFixed(5);
  var geoLng = pos.coords.longitude.toFixed(5);
  var geoAcc = pos.coords.accuracy.toFixed(1);

  axios({
    method: "get",
    url: `https://api.openweathermap.org/data/2.5/weather?lat=${geoLat}&lon=${geoLng}&appid=17902c251c1cf2deb7ffd01c5c268e55`,
    //   url: "https://api.openweathermap.org/data/2.5/weather?q=innisfil&appid=17902c251c1cf2deb7ffd01c5c268e55",
  })
    .then((response) => {
      let temp = (response.data.main.temp - 273.15).toFixed();
      let icon = response.data.weather[0].main;

      $("body").append(
        `<div class ="weather">${icons[icon]} ${temp}°C <br /> ${response.data.name} `
      );
    })
    .catch();
});

axios({
  method: "get",
  url: "https://api.unsplash.com/photos/random?query=toronto&client_id=aaBITLAvJKPCWb2tHUZSF5QEWJ_yYOQxuky-CiCfLhA",
})
  .then((response) => {
    console.log(response.data.urls.raw);
    $("body").css("background-image", `url(${response.data.urls.raw})`);
  })
  .catch((error) => {
    console.log(error);
  });

axios({
  method: "get",
  url: "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json",
})
  .then((response) => {
    $("body").append(
      `<div class='quote'>"${response.data.quoteText}" <br/ > -${response.data.quoteAuthor} </div>`
    );
    time = moment().format("h:mm");
    $("body").append(`<div class='time'>${time}</div>`);
    $("body").append(`<div class='greeting'>${greeting}</div>`);
  })
  .catch();
