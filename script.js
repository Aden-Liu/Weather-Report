const apiKey = "9487162d96ad86974316cb12c510f5dd";
const searchBox = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

searchButton.addEventListener("click", () => {
  getWeather(searchBox.value);
});

async function getWeather(city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  );

  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    let data = await response.json();
    console.log(data);
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temperature").innerHTML = `${Math.round(data.main.temp)}°C`;
    document.querySelector(".humidity").innerHTML = `${data.main.humidity}%`;
    document.querySelector(".wind").innerHTML = `${data.wind.speed}km/h`;

    switch (data.weather[0].main) {
      case "Clouds":
        weatherIcon.src = "images/clouds.png";
        break;
      case "Clear":
        weatherIcon.src = "images/clear.png";
        break;
      case "Rain":
        weatherIcon.src = "images/rain.png";
        break;
      case "Drizzle":
        weatherIcon.src = "images/drizzle.png";
        break;
      case "Mist":
        weatherIcon.src = "images/mist.png";
        break;
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}
