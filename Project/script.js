const cityNameInput = document.querySelector(".cityInput.begInput input");
const conditionImage=document.querySelector("#tempImg");
const tempVal=(document.querySelector("#tempVal"));
const windVal=(document.querySelector("#windVal"));
const humidityVal=(document.querySelector("#humidityVal"));
const box=document.querySelector(".box.begBox");
const input=document.querySelector(".cityInput");


let searchBtn=document.querySelector(".searchButton");
const conditions=["Rain","Mist","Clouds","Clear","Drizzle","Snow"];

searchBtn.addEventListener("click" , async ()=>{
    const cityName = cityNameInput.value;

    try{
        let cityDetails= await getPlaceDetails(cityName);
        if(!cityDetails[0]) throw new Error("Invalid input");
        let cityLat=cityDetails[0].lat;
        let cityLon=cityDetails[0].lon;

        let weatherDetails= await getWeatherDetails(cityLat,cityLon);

        const temperature=Math.round(weatherDetails.main.temp-273.15);
        const humidity=weatherDetails.main.humidity;
        const windSpeed=weatherDetails.wind.speed;
        const condition=weatherDetails.weather[0].main;


        updateWeatherImage(conditionImage,condition);
        updateTemp(tempVal,temperature);
        updateWind(windVal,windSpeed);
        updateHumidity(humidityVal,humidity);

        box.classList.remove("begBox");
        input.classList.remove("begInput");
        cityNameInput.classList.remove("begInputBox");
        searchBtn.classList.remove("begSearchButton");
        (document.querySelector(".displayTemp")).classList.remove("hide");
        (document.querySelector(".displayOtherDetails")).classList.remove("hide");
        (document.querySelector("#tempText")).innerText=`${condition}`;

    }catch(error){
        console.log("Error in fetching details: ", error);
        (document.querySelector(".inputBox")).value="";
        alert("Invalid input");
        return [];
    }

})

let getPlaceDetails = async(areaName) => {

    try{
        let placeDetailsURL = `http://api.openweathermap.org/geo/1.0/direct?q=${areaName}&limit=1&appid=e18e4afea3f13859839d69eb9578f4d7`;
        let response = await fetch(placeDetailsURL);  
        if(!response.ok) throw new Error("Invalid input");    
        return await response.json();      
    }catch(error){
        console.log("Error in fetching details: ", error);
        return [];
    }

}

let getWeatherDetails = async (cityLat,cityLon) => {

    try{
        let weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${cityLat}&lon=${cityLon}&appid=e18e4afea3f13859839d69eb9578f4d7`;
        let result = await fetch(weatherURL);
        if(!result.ok)throw  new Error("Failed to fetch details");
        return await result.json();
    }catch(error){
        console.log("Error in fetching details: ", error);
        alert("Could not fetch weather details. Please try again later.")
        return [];
    }

}

let updateWeatherImage = (conditionImage,condition) => {
    for(let cond of conditions){
        if(cond===condition){
            let newCond = condition.toLowerCase();
            conditionImage.src=`images/${newCond}.png`;
        }
    }
}

let updateTemp = (tempVal,temperature) => {
    tempVal.innerText=`${temperature} °C`;
}

let updateWind = (windVal,windSpeed) => {
    windVal.innerText=`${windSpeed} km/h`;
}

let updateHumidity = (humidityVal,humidity) => {
    humidityVal.innerText=`${humidity} %`;
}

























