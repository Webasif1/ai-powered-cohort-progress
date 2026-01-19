// fetch(`https://randomuser.me/api/`)
// .then((raw) =>
//   raw.json()
// )
// .then((data) => {
//   console.log(data.results[0].name.first);
// })
// .catch(err => {
//   console.log(err);
// })

async function dataApi(){
  let raw = await fetch(`https://randomuser.me/api/`)
  let data = await raw.json()
  console.log(data);
}
dataApi()
