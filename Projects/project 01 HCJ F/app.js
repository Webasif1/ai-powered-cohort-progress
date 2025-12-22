// openFeature js
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

// Todo Feature
function todoList() {
    let form = document.querySelector(".addTask form");
    let taskInput = document.querySelector(".addTask form #task-input");
    let taskDetailInput = document.querySelector(".addTask form textarea");
    let taskCheckbox = document.querySelector(".addTask form #check");
    const allTask = document.querySelector(".allTask");

    console.log(allTask);
    let currentTask = [];

    if (localStorage.getItem("currentTask")) {
        currentTask = JSON.parse(localStorage.getItem("currentTask"));
    } else {
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
        localStorage.setItem("currentTask", JSON.stringify(currentTask));

        const markComletedBtn = document.querySelectorAll(".task button");

        markComletedBtn.forEach((btn, indx) => {
            btn.addEventListener("click", function () {
                currentTask.splice(indx, 1);
                renderTask();
            });
        });
    }
    renderTask();

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        currentTask.push({
            task: taskInput.value,
            details: taskDetailInput.value,
            imp: taskCheckbox.checked,
        });

        taskInput.value = "";
        taskDetailInput.value = "";
        taskCheckbox.checked = false;
        renderTask();
    });
}
todoList();

// Day Planner
function dailyPlanner() {
    let dayPlanData = JSON.parse(localStorage.getItem("dayPlanData")) || {};
    const dayPlanner = document.querySelector(".day-planner");

    const hours = Array.from(
        { length: 18 },
        (_, idx) => `${6 + idx}:00 - ${7 + idx}:00`
    );

    let wholeDaySum = "";
    hours.forEach(function (elem, idx) {
        let savedData = dayPlanData[idx] || "";
        wholeDaySum += `<div class="day-planner-time">
                        <p>${elem}</p>
                        <input id=${idx} type="text" placeholder="..." value= ${savedData}>
                    </div>`;
    });

    dayPlanner.innerHTML = wholeDaySum;
    const dayPlannerInput = document.querySelectorAll(
        ".day-planner .day-planner-time input"
    );

    dayPlannerInput.forEach((elem) => {
        elem.addEventListener("input", function () {
            dayPlanData[elem.id] = elem.value;
            localStorage.setItem("dayPlanData", JSON.stringify(dayPlanData));
        });
    });
}

dailyPlanner()
