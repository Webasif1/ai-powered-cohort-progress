import Nav from "./nav.js";
import hero from "./hero.js"

const container = document.querySelector("#container");

const div = React.createElement("div", { id: "main" }, [
  React.createElement(Nav),
  React.createElement(hero),

]);



const root = ReactDOM.createRoot(container);
root.render(div);

