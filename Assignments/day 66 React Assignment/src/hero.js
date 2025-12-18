import heroLeft from "./hero-left.js"
import heroRight from "./hero-right.js"
function Hero(){
return React.createElement("section", {id:"heroSection"}, [
  React.createElement(heroLeft),
  React.createElement(heroRight),
]);

}

export default Hero
