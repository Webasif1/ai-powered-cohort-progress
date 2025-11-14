const box = document.querySelector('.box');
const btn = document.querySelector('button');


btn.addEventListener("click", function(){
  const c1 = Math.floor(Math.random() * 256);
  const c2 = Math.floor(Math.random() * 256);
  const c3 = Math.floor(Math.random() * 256);

  box.style.backgroundColor = `rgb(${c1}, ${c2}, ${c3})`;
  box .innerHTML =  `rgb(${c1}, ${c2}, ${c3})`;
  console.log(c1, c2, c3);
})
