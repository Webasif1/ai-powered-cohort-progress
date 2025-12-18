const items = ["About Me", "Portfolio", "Service", "Blog"];

const resNavLogo = React.createElement(
    "span",
    { id: "resNavLogo" },
    React.createElement("i", { class: "ri-reactjs-line" })
);
const navLogo = React.createElement(
    "span",
    { id: "logo" },
    React.createElement("i", { class: "ri-reactjs-line" })
);

const menuitem = React.createElement(
    "ul",
    { id: "menuitem" },
    items.map((item) => React.createElement("li", { key: item }, item))
);

const navMenuBox = React.createElement("div", { id: "navMenuBox" }, [menuitem]);
const navLeft = React.createElement("div", { id: "navLeft" }, [
    navLogo,
    navMenuBox,
]);

const navBtn = React.createElement(
    "button",
    { id: "navBtn" },
    React.createElement("a", null, "Book A Call"),
      "",
    React.createElement("i", { class: "ri-arrow-right-up-long-line" })
);
const navRight = React.createElement("div", { id: "navRight" }, [navBtn]);


const menuResIcon  = React.createElement(
  "span",
  { id: "menuIcon" },
  React.createElement("i", { class: "ri-menu-3-line" })
);
const navFullBox = React.createElement("div",{id:"fullNav"},[navLeft, navRight])
const nav = React.createElement("nav", { id: "nav" }, [resNavLogo,navFullBox,,menuResIcon]);
export default nav;
