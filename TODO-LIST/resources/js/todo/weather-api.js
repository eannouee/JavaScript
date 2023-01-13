

let getWeather = async coords => {
    const APP_ID = 'a2423a3321222d22522569be93fea394';
    let apiURL = 'https://api.openweathermap.org/data/2.5/weather?';

    let params = {
        lat : coords.lat,
        lon : coords.log,
        appid : APP_ID,
        lang : 'kr',
        units : 'metric'
    }

    let res = await fetch(apiURL+getQueryString(params));
    return res.json();


}

let getUserCoord = () =>{

    return new Promise((resolve, reject) =>{
        navigator.geolocation.getCurrentPosition(position => {
            resolve({
                lat : position.coords.latitude,
                log : position.coords.longitude
            })
          }, error => {
            reject(error);
          });
    })
      
}

(async() => {
    let coords = await getUserCoord();
    let weatherData = await getWeather(coords);
    console.dir(weatherData);

    //name, main.temp
    let weatherDiv = $('.weather');
    let weatherSpan = createElement('span', `${weatherData.main.temp}°C @ ${weatherData.name}`);
    weatherDiv.append(weatherSpan);


})();

