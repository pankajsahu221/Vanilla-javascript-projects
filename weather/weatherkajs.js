window.addEventListener("load",function(){
let long;
let lat;
let locationTimezone = document.querySelector(".location-timezone");
let temperatureDegree = document.querySelector(".temperature-degree");
let temperatureDesc = document.querySelector(".temperature-desc");
let degreeSection = document.querySelector(".degree-section");
const degreeSpan = document.querySelector(".degree-section span");

if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position){
        // console.log(position);
        long = position.coords.longitude ; 
        lat = position.coords.latitude;
            
        const proxy = 'https://cors-anywhere.herokuapp.com/';
        const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}` ; 

        fetch(api)
           .then(function(response){
               return response.json();
           })
           .then(function(data){
                console.log(data); //to see all the data from the api

                const {temperature, summary, icon } = data.currently;

                // set DOM elements from the API.
                // we could also use  = data.currently.temperature
                temperatureDegree.textContent = temperature;
                locationTimezone.textContent = data.timezone;
                temperatureDesc.textContent = summary;

                // to set icon
                setIcons(icon , document.querySelector(".icon"));

                // change temperature to celsius/farenheit
                degreeSection.addEventListener("click",function(){
                    if(degreeSpan.textContent === "F"){
                        degreeSpan.textContent = "C";
                        temperatureDegree.textContent = Math.floor(((temperatureDegree.textContent)-32)*(5/9));
                    }
                    else{
                        degreeSpan.textContent = "F";
                        temperatureDegree.textContent = (temperatureDegree.textContent*(9/5)) + 32;
                    }
                })
          });

    })
}

function setIcons(icon , iconID){
    const skycons = new Skycons({ color:"white" });
    const currentIcon = icon.replace(/-/g,"_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
}

})