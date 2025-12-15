function themeDarkLight() {
  let count = 0;
  document.querySelector("button").addEventListener("click", () => {
    if (count === 0) {
      document.body.classList.add("light-mode");
      document.querySelector("button").innerHTML = "dark";
      count++;
    } else {
      document.body.classList.remove("light-mode");
      document.querySelector("button").innerHTML = "light";
      count--;
    }
    console.log(count);
  });
}

function setUV(uv) {
  const maxUV = 11;
  const circle = document.querySelector(".progress");
  const value = document.querySelector(".uv_center h2");
  const label = document.querySelector(".uv_center span");

  const radius = 60;
  const circumference = 2 * Math.PI * radius;

  const percent = Math.min(uv / maxUV, 1);
  circle.style.strokeDashoffset =
    circumference - circumference * percent;

  value.textContent = uv;

  let color = "#22c55e"; // green
  let text = "Low";

  if (uv >= 11) {
    color = "#7c3aed"; // purple
    text = "Extreme";
  } else if (uv >= 8) {
    color = "#ef4444"; // red
    text = "Very High";
  } else if (uv >= 6) {
    color = "#f97316"; // orange
    text = "High";
  } else if (uv >= 3) {
    color = "#eab308"; // yellow
    text = "Moderate";
  }

  circle.style.stroke = color;
  label.textContent = text;
  label.style.color = color;
  circle.style.filter =
  uv >= 6 ? `drop-shadow(0 0 6px ${color})` : "none";

}

setUV(7);

function setSunPosition(sunrise, sunset, now) {
  const path = document.getElementById("sunArc");
  const sun = document.querySelector(".sun_icon");

  const pathLength = path.getTotalLength();

  const totalTime = sunset - sunrise;
  const passedTime = Math.min(Math.max(now - sunrise, 0), totalTime);

  const progress = passedTime / totalTime;

  // Update arc fill
  path.style.strokeDasharray = pathLength;
  path.style.strokeDashoffset =
    pathLength - pathLength * progress;

  // Get exact point on arc
  const point = path.getPointAtLength(pathLength * progress);

  sun.style.left = `${point.x}px`;
  sun.style.top = `${point.y}px`;
}
const sunrise = 1 * 60 + 12;
const sunset = 1 * 60 + 45;
const now = 14 * 60 + 30;

setSunPosition(sunrise, sunset, now);


function updateMetrics({ humidity, visibility, feels }) {
  document.querySelector(".humidity span").style.width = `${humidity}%`;
  document.querySelector(".humidity h2").innerHTML = `${humidity}<span>%</span>`;

  document.querySelector(".visibility span").style.width = `${visibility * 10}%`;
  document.querySelector(".visibility h2").innerHTML = `${visibility}<span>km</span>`;

  document.querySelector(".feels h2").innerHTML = `${feels}<span>°</span>`;
}

updateMetrics({
  humidity: 72,
  visibility: 6.4,
  feels: 31
});


