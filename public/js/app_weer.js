      // Selectie van de onderdelen
var input      = document.querySelector('#input_text');
var main       = document.querySelector('#name');
var icon       = document.querySelector('#icong');
var image      = document.querySelector('#image');
var temp       = document.querySelector('#temp');
var desc       = document.querySelector('#desc');
var wind       = document.querySelector('#wind');
var windr      = document.querySelector('#windr');
var button     = document.querySelector('#submit');
var message    = document.querySelector('#message');
var input      = document.getElementById("input_text");
var sun        = document.querySelector('#sun')

// Instellingen voor de fetch functie
var units      = 'metric';
var lang       = 'nl';
var APIKey     = 'API KEY';

// druk op Enter voor zoekfunctie
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("submit").click();
  }
});

//druk op zoeken voor zoekfunctie
button.addEventListener('click', function(name){

//Haal API gegevens op van OpenWeatherMap.
fetch("https://api.openweathermap.org/data/2.5/weather?q=" +input.value+ "&units=" +units+ "&lang=" +lang+ "&appid=" +APIKey)

.then(response => response.json())
.then(data => {
  // Zet variabelen
  var nameValue     = data['name'];
  var iconValuecode = data['weather'][0]['icon'];
  var tempValue     = data['main']['temp'];
  var windValue     = data['wind']['speed'];
  var descValue     = data['weather'][0]['description'];
  var windrValue    = data['wind']['deg'];
  var sunSet        = data['sys']['sunset'];
  var sunRise       = data['sys']['sunrise'];

  var timeRise = new Date (sunRise*1000);
  var Risehours = timeRise.getHours();
  var Riseminutes = "0" + timeRise.getMinutes();
  var RiseTime = Risehours + ':' + Riseminutes.substr(-2);

  var timeSet  = new Date (sunSet*1000);
  var Sethours = timeSet.getHours();
  var Setminutes = "0" + timeSet.getMinutes();
  var SetTime = Sethours + ':' + Setminutes.substr(-2);

  //Windrichting
  var windrichting	 = ["Noord", "Noord Noord Oost", "Noord Oost", "Oost Noord Oost", "Oost", "Oost Zuid Oost", "Zuid Oost", "Zuid", "Zuid Zuid West", "Zuid West", "West Zuid West", "West", "West Noord West", "Noord West", "Noord Noord West", "Noord"];
  
  var iconurl = "http://openweathermap.org/img/w/" + iconValuecode + ".png";



  // Het invullen van de pagina
    main.innerHTML  = nameValue;
  // icon.innerHTML  = iconValuecode;
  //icon.innerHTML  =  iconurl

  //icon.innerHTML= '<img src="' + iconurl +'" height="50" width="50">'
  icon.innerHTML= '<img src="' + iconurl +'">'
  temp.innerHTML  = tempValue+"&deg;C";
  wind.innerHTML  = "<b>Windsnelheid:</b> "+windValue+" m/s <br>" + "<b>Windrichting:</b> " +windrichting[(windrValue / 22.5).toFixed(0) - 1];
  sun.innerHTML   = "Zonsopkomst: " + RiseTime + "<br> Zonsondergang: " + SetTime; 
  desc.innerHTML  = "Weeromschrijving:<br>"+descValue;
  message.innerHTML = "";
  input.value       = "";
})

// Fout afhandeling als er geen plaats gevonden is.
.catch (err => message.innerHTML = "Helaas hebben wij geen weerdata gevonden voor deze locatie.",
//.catch (err => message.innerHTML = err.message,
main.innerHTML = "",
icon.innerHTML = "",
temp.innerHTML = "",
wind.innerHTML = "",
sun.innerHTML  = "",
desc.innerHTML = "");
})
