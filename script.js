const API_KEY = "c755646912354f3599160022230306";
const city = document.querySelector(".city");
const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}`;
const body = document.querySelector("body");
const searchbutton = document.querySelector(".search");
const textlist = document.querySelectorAll(".text");
const form = document.querySelector("input-form");
var temperature, visibility, realfeel, wind_speed, pressure, condition, cloud, humidity;
var is_day;

console.log(textlist);

function setData(response){
    textlist[0].textContent = response.location.name;
    textlist[1].textContent = response.location.region;
    if(textlist[1].textContent==false){
        textlist[1].textContent = textlist[0].textContent;
    }
    textlist[2].textContent = response.location.country;
    textlist[3].textContent = response.location.lat*(response.location.lat<0?-1:1) + (response.location.lat>0?"°N":"°S");
    textlist[4].textContent = response.location.lon*(response.location.lon<0?-1:1) + (response.location.lon>0?"°E":"°W");
    textlist[5].textContent = response.location.localtime.split(" ")[1];
    if(textlist[5].textContent[0]!='1' && textlist[5].textContent[0]!='2'){
        textlist[5].textContent = "0"+textlist[5].textContent;
    }

    textlist[6].textContent = response.current.condition.text;
    textlist[7].textContent = response.current.temp_c + "°C";
    textlist[8].textContent = response.current.feelslike_c + "°C";
    textlist[9].textContent = response.current.wind_kph;
    textlist[10].textContent = response.current.pressure_mb;
    textlist[11].textContent = response.current.cloud;
    is_day = response.current.is_day;
}

function getData(location){
    fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}`, {mode : 'cors'})
        .then(function(response){
            return (response.json());
        })
        .then(function(response){
            // console.log(response);         
            setData(response);
            body.style.cursor = "default";
        })
        .catch( () => {
            alert(`Seems like the ${location} does not exist!`);
            body.style.cursor = "default";
        });
}

searchbutton.addEventListener('click', () =>{
    body.style.cursor = "wait";
    getData(city.value);
});

document.addEventListener("keydown", (e)=>{
    if(e.code==='Enter'){
        body.style.cursor = "wait";
        getData(city.value); 
    }
})

getData("London");

