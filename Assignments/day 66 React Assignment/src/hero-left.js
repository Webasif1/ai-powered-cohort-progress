function heroLeft() {
  const details = [
    {
      number: 200,
      details: "Project completed",
    },
    {
      number: 50,
      details: "Startup raise",
    },
  ];
  const heroTop = React.createElement(
    "div",
    { id: "projects" },
    details.map((item, index) =>
      React.createElement(
        "div",
        { key: index, className: "project-item" },
        React.createElement("h2", null, "+"," ", item.number),
        React.createElement("p", null, item.details)
      )
    )
  );

  const heroTittle = React.createElement("h1", {id:"heroTittle"}, "Hello")
  const heroPara = React.createElement("p", {id:"heroPara"}, "-It's Arafat a Developer")
  const heroScroll = React.createElement("div", {id:"heroScroll"}, "Scroll",React.createElement("i", { class: "ri-arrow-down-long-line" }))

  const heroText = React.createElement("div", {id:"textHero"}, [heroTittle,heroPara])
  const heroLeftContent = React.createElement(
    "div",
    { id: "heroLeftContent" },
    [heroTop,heroText,heroScroll]
  );


  return heroLeftContent;
}

export default heroLeft;
