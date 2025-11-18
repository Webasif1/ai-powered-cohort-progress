const btn = document.querySelector("button");
const main = document.querySelector('main');


btn.addEventListener("click" , function(){
  const div = document.createElement("div")
  let x = Math.floor(Math.random() * 100)
  let y = Math.floor(Math.random() * 100)
  let r = Math.floor(Math.random() * 100)
  let c1 = Math.floor(Math.random() * 256)
  let c2 = Math.floor(Math.random() * 256)
  let c3 = Math.floor(Math.random() * 256)

  div.style.height = '50px'
  div.style.width = '50px'
  div.style.position = 'absolute'
  div.style.borderRadius = '50px'
  div.style.border = `8px solid rgb(${c1}, ${c2}, ${c3})`


  // div.style.backgroundColor = `rgb(${c1}, ${c2}, ${c3})`
  div.style.left = x+'%'
  div.style.top = y+'%'
  div.style.rotate = r + "deg"
  console.log(div);

  main.appendChild(div)
})



// window.addEventListener('mousemove', function(e) {

//   const div = document.createElement("div")
//   let r = Math.floor(Math.random() * 100)
//   let c1 = Math.floor(Math.random() * 256)
//   let c2 = Math.floor(Math.random() * 256)
//   let c3 = Math.floor(Math.random() * 256)

//   div.style.height = '50px'
//   div.style.width = '50px'
//   div.style.position = 'absolute'
//   div.style.borderRadius = '50px'
//   div.style.border = `8px solid rgb(${c1}, ${c2}, ${c3})`


//   // div.style.backgroundColor = `rgb(${c1}, ${c2}, ${c3})`
//   div.style.left = e.clientX+'px'
//   div.style.top = e.clientY+'px'
//   div.style.rotate = r + "deg"
//   console.log(div);

//   main.appendChild(div)



//   // console.log('Mouse moved!');
//   // console.log('X:', e.clientX, 'Y:', e.clientY);
// })
