let form = document.querySelector("form");
let userName = document.querySelector("#name");
let profession = document.querySelector("#profession");
let image = document.querySelector("#image");
let bio = document.querySelector("#bio");
let userContainer = document.querySelector(".userContainer");

try {
  const userManager = {
    user: [],
    init: function () {
      this.loadUser();
      form.addEventListener("submit", this.submitForm.bind(this));
    },
    submitForm: function (e) {
      e.preventDefault();
      // console.log(this.user);
      this.addUser();
      this.renderUi();
      this.saveUser();
    },
    addUser: function () {
      try {
        if (
          userName.value === "" ||
          profession.value === "" ||
          image.value === "" ||
          bio.value === ""
        ) {
          throw new Error("Fill the blank field");
        }
        this.user.push({
          userName: userName.value,
          profession: profession.value,
          image: image.value,
          bio: bio.value,
        });
      } catch (err) {
        console.log(err.message);
      }

      form.reset();
    },
    renderUi: function () {
      userContainer.innerHTML = "";
      this.user.forEach((user, index) => {
        // Create main container
        const userDetails = document.createElement("div");
        userDetails.className = "user-details";
        userDetails.id = "details";

        // Heading
        // const h2 = document.createElement("h2");
        // h2.textContent = "User Details";

        // Image
        const img = document.createElement("img");
        img.id = "d-image";
        img.src = user.image;
        img.alt = "User Image";

        // Name
        const nameP = document.createElement("p");
        nameP.innerHTML = `${user.userName}`;

        // Profession
        const professionP = document.createElement("p");
        professionP.innerHTML = `${user.profession}`;

        // Bio
        const bioP = document.createElement("p");
        bioP.innerHTML = `${user.bio}`;

        // DELETE BUTTON
        const delBtn = document.createElement("button");
        delBtn.innerHTML = `<i class="ri-delete-bin-7-line"></i>`;
        delBtn.className = "delete-btn";

        delBtn.addEventListener("click", () => {
          try {
            this.removeUser(index);
          } catch (err) {
            console.log("Delete Error:", err.message);
          }
        });

        // Finally add everything to container
        userDetails.append(img, nameP, professionP, bioP, delBtn);
        userContainer.appendChild(userDetails);
      });
    },
    saveUser: function () {
      localStorage.setItem("users", JSON.stringify(this.user));
    },

    loadUser: function () {
      const data = localStorage.getItem("users");

      if (data) {
        try {
          this.user = JSON.parse(data);
          this.renderUi();
        } catch {
          throw new Error("Failed to load user data from storage.");
        }
      }
    },
    removeUser: function (index) {
      if (index < 0 || index >= this.user.length) {
        throw new Error("Invalid user index");
      }

      this.user.splice(index, 1);
      this.saveUser();
      this.renderUi();
    },
  };
  userManager.init();
} catch (err) {
  console.log(err.message);
}
// form.addEventListener("submit", (e)=>{
//    e.preventDefault();
//   console.log("form submit");
// })
