const counter = document.querySelector('.counter');
const inc = document.querySelector('#btn1');
const dec = document.querySelector('#btn2');

let a = 0;

inc.addEventListener('click', function(){
  a++;
  counter.innerHTML = a;
})
dec.addEventListener('click', function(){
  if(a === 0){
    alert("Counter con't be negative value")
  }else{
    a--;
  }
  counter.innerHTML = a;
})
