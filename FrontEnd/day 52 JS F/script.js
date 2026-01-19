const root = document.documentElement;
const revile = document.querySelector(".cover")

console.log(root);
revile.addEventListener("mousemove", (dets) => {

  // console.log(dets);
  root.style.setProperty('--x', `${dets.clientX}px`);
  root.style.setProperty('--y', `${dets.clientY}px`);
})
