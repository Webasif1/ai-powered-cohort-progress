function openFeature() {
  const allElem = document.querySelectorAll(".elem");
  const fullElemPage = document.querySelectorAll(".fullElem");
  const fullElemPageBackBtn = document.querySelectorAll(".fullElem .back");

  allElem.forEach(function (elem, indx) {
    elem.addEventListener("click", function () {
      // console.log(elem);
      console.log(fullElemPage[indx]);
      fullElemPage[indx].style.display = "block";
    });
  });

  fullElemPageBackBtn.forEach(function (back, indx) {
    back.addEventListener("click", function () {
      console.log(indx);
      fullElemPage[indx].style.display = "none";
    });
  });
}
openFeature();

let form = document.querySelector(".addTask form");
let taskInput = document.querySelector(".addTask form #task-input");
let taskDetailInput = document.querySelector(".addTask form textarea");
let taskCheckbox = document.querySelector(".addTask form #check");
const allTask = document.querySelector(".allTask");

console.log(allTask);
let currentTask = [];

if(localStorage.getItem("currentTask")){
    currentTask = JSON.parse(localStorage.getItem("currentTask"))
}else{
    console.log("Current task is empty");
}

function renderTask() {
  let sum = "";
  currentTask.forEach((elem) => {
    sum += `<div class="task">
                        <h5>${elem.task} <span class="${elem.imp}">Imp</span></h5>
                        <button>Mark as completed</button>
                    </div>`;
  });
  allTask.innerHTML = sum;
}
renderTask();

// console.log(form);
form.addEventListener("submit", function (e) {
  e.preventDefault();

  currentTask.push({
    task: taskInput.value,
    details: taskDetailInput.value,
    imp: taskCheckbox.checked,
  });
  localStorage.setItem("currentTask", JSON.stringify(currentTask));
  taskInput.value = ''
  taskDetailInput.value = ''
  taskCheckbox.checked = ''
  renderTask()
});


