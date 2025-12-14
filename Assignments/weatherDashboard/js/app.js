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
