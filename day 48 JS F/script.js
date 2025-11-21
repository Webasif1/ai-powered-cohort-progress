const text = document.querySelector("main h1");
const sounds = [
  new Audio("Sound/0.mp3"),
  new Audio("Sound/1.mp3"),
  new Audio("Sound/2.mp3"),
  new Audio("Sound/3.mp3"),
  new Audio("Sound/4.mp3"),
  new Audio("Sound/5.mp3"),
  new Audio("Sound/6.mp3"),
  new Audio("Sound/7.mp3"),
  new Audio("Sound/9.mp3"),
  new Audio("Sound/10.mp3")
]

let currentSound = null;

document.body.addEventListener("keydown", function(val){
  if(val.key === " "){
    text.innerHTML = "SPC"
  }else{
  text.innerHTML = val.key
  }

  // sound = val.key;

  soundPlay(val.key)


})

function playSound(i) {

  // stop last sound
  if (currentSound) {
    currentSound.pause();
    currentSound.currentTime = 0;
  }

  // play fresh sound
  currentSound = new Audio(`Sound/${i}.mp3`);
  currentSound.play();
}


function soundPlay(key){
  switch(key){
    case "a":
      playSound(0)
      break;
    case "s":
      playSound(1)
      break;
    case "d":
      playSound(2)
      break;
    case "f":
      playSound(3)
      break;
    case "g":
      playSound(4)
      break;
    case "h":
      playSound(5)
      break;
    case "j":
      playSound(6)
      break;
    case "k":
      playSound(7)
      break;
    case "l":
      playSound(9)
      break;
    case ";":
      playSound(10)
      break;

      default:
  }
}

sounds[i].load();
