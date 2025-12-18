import nav from "./nav.js"

const container = document.querySelector("#container");

// const h1 = React.createElement("h1", {id:"heading"}, "");
const div = React.createElement("div", {id:"main"}, [nav]);
const root = ReactDOM.createRoot(container);
root.render(div)
