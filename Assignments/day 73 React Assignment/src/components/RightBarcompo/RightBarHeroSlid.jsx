import React, { useEffect, useState } from "react";

const RightBarHeroSlid = () => {
const HeroSlider = [
    {
        trad: "🔥 Now Trending",
        tag: ["Drama", "Fantasy"],
        title: "Dimensional kids on an Adventure",
        des: "When two curious kid stumble into a hidden portal, they travel across magical dimension while trying to find their way home...",
        bgImg: "./adventure.jpg",
    },
    {
        trad: "🔥 Now Trending",
        tag: ["Drama", "Fantasy"],
        title: "Dimensional kids on an Adventure🥰",
        des: "When two curious kid stumble into a hidden portal, they travel across magical dimension while trying to find their way home...",
        bgImg: "./adventure1.jpg",
    },
    {
        trad: "🔥 Now Trending",
        tag: ["Drama", "Fantasy"],
        title: "Dimensional kids on an Adventure",
        des: "When two curious kid stumble into a hidden portal, they travel across magical dimension while trying to find their way home...",
        bgImg: "./adventure2.jpg",
    },
];

const [current, setCurrent] = useState(0);
const slid = HeroSlider[current];
// function timeCon(){
//     setInterval(()=>{
//         setCurrent(
//             current === HeroSlider.length - 1 ? 0 : current + 1
//         )
//     },3000)
// }
// timeCon()
// console.log(timeCon);

useEffect(()=> {
    const intervalTime = setInterval(()=>{
                setCurrent(
                    current === HeroSlider.length - 1 ? 0 : current + 1
                )
            },500)
return ()=> clearInterval(intervalTime)
},[])


return (
    <div className="flex relative">
        <div
            className="w-full h-140 mt-8 overflow-hidden border border-zinc-500 rounded-2xl bg-cover bg-center absolute transition delay-150 duration-300 ease-in-out"
            style={{ backgroundImage: `url(${slid.bgImg})` }}
        >
            <div className="w-full h-full relative flex flex-col justify-between  p-8 ">
                <div className="h-full w-150 absolute left-0 top-0 bg-(--c4) blur-2xl scale-110">
                    {" "}
                </div>
                <p className="text-white text-xl font-light bg-(--c4) w-fit py-1 px-5 rounded-full z-10">
                    🔥 Now Trending
                </p>
                <div className="z-10">
                    <p className="text-white text-xl font-light bg-(--c4) w-fit py-2 px-5 rounded-full mb-5">
                        Drama
                    </p>
                    <h1 className="text-white text-5xl font-bold w-120 leading-14">
                        {slid.title}
                    </h1>
                    <p className="text-white text-xl w-140 mt-3">
                        When two curious kid stumble into a hidden portal,
                        they travel across magical dimension while trying to
                        find their way home...
                    </p>
                    <div className="flex items-center gap-4 text-white mt-8">
                        <button className="px-7 py-3 bg-(--c1) text-black text-xl font-medium rounded-2xl cursor-pointer">
                            <i className="ri-play-fill text-2xl"></i> Watch
                            Now
                        </button>
                        <i className="ri-download-2-line text-3xl p-2 bg-(--c4) rounded-xl cursor-pointer"></i>
                    </div>
                </div>
            </div>
            <button
                onClick={() =>
                    setCurrent(
                        current === 0 ? HeroSlider.length - 1 : current - 1
                    )
                }
                className="absolute right-10 bottom-10 -translate-y-1/2 text-white text-4xl z-20"
            >
                ‹
            </button>

            <button
                onClick={() =>
                    setCurrent(
                        current === HeroSlider.length - 1 ? 0 : current + 1
                    )
                }
                className="absolute right-5 bottom-10 -translate-y-1/2 text-white text-4xl z-20"
            >
                ›
            </button>
        </div>
    </div>
);
};

export default RightBarHeroSlid;
