let age = prompt("Enter your age");

//**prompt control
if(age === null){
  console.error("you canceled it");
}else{
  if(age.trim() === ""){
    console.error("some thinks went wrong");
  }else{
    age = Number(age.trim())
    if(isNaN(age)){
      console.error("Please enter your age in number...");
    }else{
      console.log("confirm this is the number");
    }
  }
}
