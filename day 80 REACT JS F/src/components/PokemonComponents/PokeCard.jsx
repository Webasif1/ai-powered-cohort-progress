import React, { useState } from "react";

const PokeCard = (props) => {
    const [image, setimage] = useState(props.image);

    return (
        <>
            <div key={props.name}>
                <div className="w-70 h-100 bg-zinc-700 rounded-2xl flex flex-col items-center py-4 hover:shadow-2xl">
                    <p className="text-zinc-300 text-2xl my-3 mb-4 py-1 px-3 bg-white/30 w-fit rounded-full">
                        #{props.id}
                    </p>
                    <div
                        onMouseEnter={() => {
                            setimage(props.gif);
                        }}
                        onMouseLeave={() => {
                            setimage(props.image);
                        }}
                        className="rounded-full"
                    >
                        <img
                            className="w-30 h-30"
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
                            <p className="text-center text-md mt-1.5">
                                {props.weight}kg
                            </p>
                        </div>
                        <div>
                            <p className="text-center text-xl text-gray-300">
                                Height
                            </p>
                            <p className="text-center text-md mt-1.5">
                                {props.height}m
                            </p>
                        </div>
                    </div>
                    <p>
                        Type:
                        {props.type.map((elem) => <span>{elem}/</span>)}
                    </p>
                </div>
            </div>
        </>
    );
};

export default PokeCard;
