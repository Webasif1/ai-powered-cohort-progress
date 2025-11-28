const p = document.querySelector('p')
const text = p.innerText
const char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
let iteration = 0;

function randomText(){
const str =text.split("").map((ch, index)=>{

  if(index<iteration){
    return ch
  }
  return char.split("")[Math.floor(Math.random()*52)]
}).join("")

iteration += 0.25

p.innerText = str
}

setInterval(randomText,100)
