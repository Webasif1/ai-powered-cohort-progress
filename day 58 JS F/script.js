let form = document.querySelector("form");
let userName = document.querySelector("#name");
let profession = document.querySelector("#profession");
let image = document.querySelector("#image");
let bio = document.querySelector("#bio");

const userManager = {
  user: [],
  init: function () {
    form.addEventListener("submit", this.submitForm.bind(this));
  },
  submitForm: function (e) {
    e.preventDefault();
    console.log(this.user);
    this.addUser();
  },
  addUser: function () {
    this.user.push({
      userName: userName.value,
      profession: profession.value,
      image: image.value,
      bio: bio.value,
    });
    form.reset();
  },
  renderUi: function (){
    this.user.forEach((user)=>{

    })
  },
  removeUser: function () {},
};

userManager.init();

// form.addEventListener("submit", (e)=>{
//    e.preventDefault();
//   console.log("form submit");
// })
