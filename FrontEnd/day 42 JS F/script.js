const h1 =document.querySelector('h1');


// **change text using dom
h1.textContent = "It change by dom";

// **change color using dom
h1.style.color = "royalBlue"


// addEventListener in h1
h1.addEventListener('click', function(){
  console.log("h1 clicked!");
})
