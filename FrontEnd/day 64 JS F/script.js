function debounch(fn, delay) {
    let time;
    return function () {
        clearTimeout(time);
        time = setTimeout(fn, delay);
    };
}

document.querySelector("#search").addEventListener(
    "input",
    debounch(function () {
        console.log("chala");
    }, 400)
);

function throttle(fn, delay) {
    let last = 0;
    return function () {
        const now = Date.now();
        if (now - last >= delay) {
            last = now;
            fn();
        }
    };
}

window.addEventListener(
    "mousemove",
    throttle(function () {
        console.log("Hi");
    }, 2000)
);
