function heroRight() {

const heroImg = React.createElement(
  "div",
  { id: "heroImg" },
  React.createElement("img", {
    src: "./assets/image/the-man.png",
    alt: "Hero image"
  })
);

  const heroRightContent = React.createElement(
    "section",
    { id: "heroRightContent" },
    [heroImg]
  );


  return heroRightContent;
}

export default heroRight;
