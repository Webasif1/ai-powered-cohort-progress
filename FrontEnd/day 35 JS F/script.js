let attempt = 0;
let pass = "asif"

let userPass = prompt("write your pass");
attempt++;
while(pass !== userPass){
  if(attempt === 3){
    console.error("Account has locked");
    break;
  }
  userPass = prompt("write your pass");
  attempt++;
}


