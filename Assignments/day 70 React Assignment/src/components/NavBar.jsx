import { useState } from "react";

const NavBar = () => {
    const [open, setOpen] = useState(false);
    return (
        <div className="flex md:flex-row md:items-center justify-between px-6 md:px-10 py-6 gap-6 md:gap-0">
            <div>
                <h4 className="text-4xl font-semibold text-white">DVSY</h4>
            </div>

            <div
                className={`absolute md:static top-20 right-6 bg-zinc-950 w-full md:w-auto flex-col md:flex-row items-end text-white gap-4 p-4
                  ${open ? "flex" : "hidden"} md:flex`}
            >
                <a
                    className="px-3  py-2 md:bg-zinc-700 rounded  sm:w-auto text-center"
                    href="#"
                >
                    DESIGNERS
                </a>
                <a
                    className="px-3  py-2 md:bg-zinc-700 rounded  sm:w-auto text-center"
                    href="#"
                >
                    COLLABS
                </a>
                <a
                    className="px-3  py-2 md:bg-zinc-700 rounded  sm:w-auto text-center"
                    href="#"
                >
                    EVENTS
                </a>
                <a
                    className="px-3  py-2 md:bg-zinc-700 rounded  sm:w-auto text-center"
                    href="#"
                >
                    BLOG
                </a>
                <a
                    className="px-3  py-2 md:bg-zinc-700 rounded  sm:w-auto text-center"
                    href="#"
                >
                    CARD
                </a>

                <button className="bg-red-500 px-4 py-2 text-xl rounded sm:w-auto cursor-pointer">
                    Get In Touch
                </button>
            </div>
            <div
                className="text-white text-4xl md:hidden"
                onClick={() => setOpen(!open)}
            >
                <i
                    className={`${
                        open ? "ri-close-large-fill" : " ri-menu-3-fill"
                    }`}
                ></i>
            </div>
        </div>
    );
};

export default NavBar;
