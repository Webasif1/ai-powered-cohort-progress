const btn = document.querySelector("button");
const line = document.querySelector(".green-line")
const showNumber = document.querySelector(".contain h1")
const downIn = document.querySelector(".card p")
const downCom = document.querySelector(".card h2")


let a = 0;

btn.addEventListener("click", ()=>{
  let ranNum = 50 +Math.floor(Math.random()* 100);
  console.log(`Download will completed in ${ranNum / 10}`);
  downIn.innerHTML = `Download will completed in ${ranNum / 10} s`
  btn.style.pointerEvents = "none";
  const int = setInterval(function(){
    a++;
    console.log();
    showNumber.innerHTML = a+ "%";
    line.style.width = a+"%";
      if(a === 100) console.log("Download completed!");
  },ranNum)

  setTimeout(() => {
    clearInterval(int)
    btn.style.opacity = ".5";
    downCom.innerHTML = "Download completed! 👌"
  }, ranNum*100);


})
