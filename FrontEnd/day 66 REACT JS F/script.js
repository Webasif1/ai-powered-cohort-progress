const h1 = React.createElement("h1", {id:"hero"}, "Can you see me")

const root = ReactDOM.createRoot(document.querySelector("#container"))

console.log(h1);
root.render(h1)
