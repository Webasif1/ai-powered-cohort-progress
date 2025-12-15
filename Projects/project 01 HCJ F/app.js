var allElem = document.querySelectorAll(".elem");
var allFullElem = document.querySelectorAll(".fullElem")

allElem.forEach(function(elem,indx){
  elem.addEventListener("click", function(){
    // console.log(elem);
    console.log(allFullElem[indx])
    allFullElem[indx].style.display = "block";
  })
})
