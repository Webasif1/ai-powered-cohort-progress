// openFeature js
function openFeature() {
  const allElem = document.querySelectorAll(".elem");
  const fullElemPage = document.querySelectorAll(".fullElem");
  const fullElemPageBackBtn = document.querySelectorAll(".fullElem .back");

  allElem.forEach(function (elem, indx) {
    elem.addEventListener("click", function () {
      fullElemPage[indx].style.display = "block";
    });
  });

  fullElemPageBackBtn.forEach(function (back, indx) {
    back.addEventListener("click", function () {
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

dailyPlanner();

// Motivation
function motivationalQuote() {
  const motivationQuote = document.querySelector(".motivation-2 h3");
  const motivationAuthor = document.querySelector(".motivation-3 h4");

  async function fetchQuote() {
    let res = await fetch("https://dummyjson.com/quotes/random");
    let data = await res.json();

    motivationQuote.innerHTML = data.quote;
    motivationAuthor.innerHTML = data.author;
  }

  fetchQuote();
}

motivationalQuote();

// Pomodoro Timer
function pomodoroTimer() {
  const timers = document.querySelector(".pomo-timer h4");
  const session = document.querySelector(".pomodoro-fullpage .session");
  const startBtn = document.querySelector(".pomo-timer .start-timer");
  const pasueBtn = document.querySelector(".pomo-timer .pause-timer");
  const resetBtn = document.querySelector(".pomo-timer .reset-timer");
  let isWorkSession = true;
  let timerInterval = null;
  let totalSeconds = 25 * 60;

  function updateTimer() {
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    timers.innerHTML = `${String(minutes).padStart("2", "0")}:${String(
      seconds
    ).padStart("2", "0")}`;
  }
  function startTimer() {
    clearInterval(timerInterval);
    if (isWorkSession) {
      timerInterval = setInterval(() => {
        if (totalSeconds > 0) {
          totalSeconds--;
          updateTimer();
        } else {
          isWorkSession = false;
          clearInterval(timerInterval);
          session.innerHTML = "Break Session";
          session.style.backgroundColor = "var(--blue)";
          timers.innerHTML = "05:00";
          totalSeconds = 5 * 60;
        }
      }, 1000);
    } else {
      timerInterval = setInterval(() => {
        if (totalSeconds > 0) {
          totalSeconds--;
          updateTimer();
        } else {
          isWorkSession = true;
          clearInterval(timerInterval);
          session.innerHTML = "Work  Session";
          session.style.backgroundColor = "var(--green)";
          timers.innerHTML = "25:00";
          totalSeconds = 25 * 60;
        }
      }, 10);
    }
  }

  function pauseTimer() {
    clearInterval(timerInterval);
    updateTimer();
  }
  function resetTimer() {
    clearInterval(timerInterval);
    totalSeconds = 25 * 60;
    updateTimer();
  }

  startBtn.addEventListener("click", () => {
    startTimer();
    // upDateTimer()
  });
  pasueBtn.addEventListener("click", () => {
    pauseTimer();
    // upDateTimer()
  });
  resetBtn.addEventListener("click", () => {
    resetTimer();
    // upDateTimer()
  });
}
pomodoroTimer();

// Weather
const APIkey = "8b5e4246052c4db2bf6112248261001";
let city = "Dhaka";
const header1Day = document.querySelector(".header1 h1");
const header1Date = document.querySelector(".header1 h2");
const header2temp = document.querySelector(".header2 h2");
const header2text = document.querySelector(".header2 p");
const header2precip = document.querySelector(".header2 .precip");
const header2humidity = document.querySelector(".header2 .humidity");
const header2wind = document.querySelector(".header2 .wind");
console.log(header2precip, header2humidity, header2wind);

let data = null;
async function weatherAPICall() {
  const response = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=${APIkey}&q=${city}`
  );
  data = await response.json();
  let temp = data.current.temp_c;
  let text = data.current.condition.text;
  let heatIndx = data.current.heatindex_c;
  let humidity = data.current.humidity;
  let wind = data.current.wind_kph;
  console.log(data.current);

  header2temp.innerHTML = `${temp}°C`;
  header2text.innerHTML = `${text}`;
  header2precip.innerHTML = `Heat: ${heatIndx}°C`;
  header2humidity.innerHTML = `Humidity: ${humidity}%`;
  header2wind.innerHTML = `Wind: ${wind}km/h`;
}
weatherAPICall();

function timeDate() {
  let date = new Date();
  function currentDay() {
    const totalDaysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let dayOfWeek = totalDaysOfWeek[date.getUTCDay()];
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    // let AmPm = hours >= 12 ? 'PM' : 'AM'
    if (hours >= 12) {
      header1Day.innerHTML = `${dayOfWeek}, ${String(hours - 12).padStart(
        "2",
        "0"
      )}:${String(minutes).padStart("2", "0")}:${String(seconds).padStart(
        "2",
        "0"
      )} PM`;
    } else {
      header1Day.innerHTML = `${dayOfWeek}, ${String(hours).padStart(
        "2",
        "0"
      )}:${String(minutes).padStart("2", "0")}:${String(seconds).padStart(
        "2",
        "0"
      )} AM`;
    }
  }
  currentDay();

  function currentDate() {
    const totalMonthsOfYear = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let today = date.getDate();
    let month = totalMonthsOfYear[date.getMonth()];
    let year = date.getFullYear();
    header1Date.innerHTML = `${today} ${month}, ${year}`;
  }
  currentDate();
}

setInterval(() => {
  timeDate();
}, 1000);


console.log(new Date());
