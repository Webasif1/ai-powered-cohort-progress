var allElem = document.querySelectorAll(".elem");
var fullElemPage = document.querySelectorAll(".fullElem")
var fullElemPageBackBtn = document.querySelectorAll(".fullElem .back")

allElem.forEach(function(elem,indx){
  elem.addEventListener("click", function(){
    // console.log(elem);
    console.log(fullElemPage[indx])
    fullElemPage[indx].style.display = "block";
  })
})

fullElemPageBackBtn.forEach(function(back, indx){
  back.addEventListener("click", function(){
    console.log(indx);
    fullElemPage[indx].style.display = "none";
  })
})
