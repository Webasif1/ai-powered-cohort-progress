const windowBtn = document.querySelector('#window')
const leftWindow = document.querySelector("#left_window")


let count = 0;
windowBtn.addEventListener("click", ()=> {

  if(count === 0){
    leftWindow.style.bottom = "0%";
    count++;
    }else{
      leftWindow.style.bottom = "100%";
      count--;
    }
console.log(count);
})
