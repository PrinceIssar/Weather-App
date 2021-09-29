if ('geolocation' in navigator){  console.log('geolocation available');  navigator.geolocation.getCurrentPosition(function (position) {    console.log(position);  });}else {  console.log('geolocation is not available');}const  weatherApi = {  key: "450c434e365abba58a7a314a0746d7c1",  baseUrl: "https://api.openweathermap.org/data/2.5/weather?"}const searchInputBox =document.getElementById('input-box');// EventListener function on keypresssearchInputBox.addEventListener('keypress', (event) => {  if (event.keyCode == 13) {    getWeatherReport(searchInputBox.value); // calling "getWeatherReport" function here nad inside value of "searchInputBox"    document.querySelector('.weather-body').style.display = "block";    // in css write display none and JS doc selector of the class and we need to change the display style and that is block  }});//Get weather Reportfunction getWeatherReport(city){ // city parameter is need cause we need reports according to city  // details are going to come from api , so fetch function to fetch the data from the URL; from the function baseurl  fetch(`${weatherApi.baseUrl}q=${city}&appid=${weatherApi.key}&units=metric`)      //&units=metric : Get data in degree      //implement the object we created in fetch function ex: key or baseUrl      //q=${city} : The info of city is coming from "searchInputBox" and that happens when the "getWeatherReport" function is called      // appid= :  that's the key is the "weatherApi" 's "key"      .then(weather => { // fetch the data in weather        return weather.json(); // then we'll return the "weather" data in json format      }).then(showWeatherReport); // once data is in json format we'll call function "Show weather Report" by passing it into parameter}// Show weather Reportfunction showWeatherReport(weather){ // once called this function then url will show the data// what is needed to be shown in the weather report is what we need to add now  // to show data in 2nd div once you type the name of the city  let city = document.getElementById('city');  city.innerText = `${weather.name},${weather.sys.country}`; //.sys because country property is in sys if you see in console  //innerText to change the text of city  // .name for ex the "." helps us to get the property from this object  let temperature = document.getElementById('temp');  temperature.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;  // math to have a round no.  //innerHTML to change the text in html rather then innerText otherwise it'll show the text  let minMaxTemp = document.getElementById('min-max');  minMaxTemp.innerHTML = `${Math.floor(weather.main.temp_min)}&deg;C (min)/ ${Math.ceil(weather.main.temp_max)}&deg;C (max)`;  //Floor give the lower value::::: Ceil for the max  // innerHTML rather then text because of the degree we are making.  let weatherType = document.getElementById('weatherImg');  weatherType.innerText = `${weather.weather[0].main}`; // now fetch  let date = document.getElementById('date');  let todayDate = new Date(); //new Date will pass date of the day  date.innerText = dateManage(todayDate);// and from a dateManage function we'll fire the todayDate function AND THE DATA BELOW WILL START CHANGING  let iconImg = document.getElementById('icon');  let icon = `${weather.weather[0].icon}`;  iconImg.src = "https://openweathermap.org/img/wn/" + icon + ".png";  document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${searchInputBox.value}')`;}// Date managefunction dateManage(dateArg){ // pass a value it can be any  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]; // need months and days and we'll call from the array  let months = ["January", "February ", "March", "April ", "May", "June", "July", "August", "September", "October", "November", "December"];  let year = dateArg.getFullYear(); // The argument as to take from this function "dateArg"  let month = months[dateArg.getMonth()];  let date = dateArg.getDate();  let day = days[dateArg.getDay()];  return `${date} ${month} (${day}), ${year}`;}