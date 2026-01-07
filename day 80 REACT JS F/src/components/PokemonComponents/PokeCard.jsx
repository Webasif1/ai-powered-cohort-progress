import React, { useState } from "react";

const PokeCard = (props) => {
  const [image, setimage] = useState(props.image);
  const primaryType = props.type?.[0];

  const typeColors = {
    fire: "orange-500",
    water: "blue-500",
    grass: "green-500",
    electric: "yellow-400",
    poison: "purple-600",
    flying: "sky-400",
    bug: "lime-600",
    normal: "zinc-400",
    ground: "amber-600",
    fairy: "rose-300",
    fighting: "red-700",
    psychic: "pink-500",
    rock: "stone-600",
    ghost: "indigo-700",
    ice: "cyan-400",
    dragon: "indigo-500",
    dark: "neutral-800",
    steel: "slate-400",
  };



  return (
    <>
      <div key={props.name}>
        <div className={`w-70 bg-zinc-700 rounded-2xl hover:-translate-y-3 transition-all duration-300 flex flex-col items-center py-5 shadow-white/20  hover:shadow-2xl border-2 border-${typeColors[primaryType] || "border-gray-300"} cursor-pointer`}>
          <p className={`text-zinc-300 text-xl my-3 mb-4 py-1 px-3 bg-white/30 w-fit rounded-full`}>
            #{props.id}
          </p>
          <div
            onMouseEnter={() => {
              setimage(props.gif);
            }}
            onMouseLeave={() => {
              setimage(props.image);
            }}
            className={`rounded-full relative`}
          >
            <div className={`bg-${typeColors[primaryType]} z-0 w-30 h-30 rounded-full blur-3xl top-0 left-0 absolute`}></div>
            <img
              className="w-30 h-30 relative z-10"
              src={image || "/placeholder.png"}
              alt="Pokemon character image"
            />
          </div>
          <h4 className="text-white text-4xl">
            {props.name.charAt(0).toUpperCase() +
              props.name.slice(1)}
          </h4>
          <div className="flex items-center justify-between w-[60%] mt-5">
            <div>
              <p className="text-center text-xl text-gray-300">
                Wight
              </p>
              <p className="text-center text-md mt-1.5 font-medium">
                {props.weight}kg
              </p>
            </div>
            <div>
              <p className="text-center text-xl text-gray-300">
                Height
              </p>
              <p className="text-center text-md mt-1.5 font-medium">
                {props.height}m
              </p>
            </div>
          </div>
          <p className="text-md mt-5 flex items-center gap-2">
            Type:
            <span className="flex items-center gap-1">
              {props.type.map((elem, idx) => <p key={idx} className="text-md font-semibold py-1 px-2 bg-white/20 rounded-full">{elem}</p>)}
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default PokeCard;
