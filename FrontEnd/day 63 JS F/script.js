// let apikey= "0a68694042c5af06905ae9d5f4b6bb06";

// function getWeather(city){
//   fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`)
//   .then((raw)=> raw.json())
//   .then((result)=> {
//     console.log(result);
//   })
// }
// getWeather("bangladesh")

//***with async await
// async function getWeather(city){
//   let apikey= `0a68694042c5af06905ae9d5f4b6bb06`;
//   let raw = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`)
//   let realData = await raw.json();

//   console.log(realData);
// }
// getWeather("bangladesh")


//***with try catch
async function getWeather(city){
  try{
    let apikey= `0a68694042c5af06905ae9d5f4b6bb06`;
    let raw = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`)

    if(!raw.ok) {
      throw new Error("Something went wrong")
    }
    let realData = await raw.json();
    console.log(realData);
  }
  catch{
    (err)=> {
      console.log(err.message);
    }
  }
}
getWeather("London")
