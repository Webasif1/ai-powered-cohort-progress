import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className="w-full flex justify-between items-center py-6 bg-white/20 backdrop-blur-sm px-8 fixed top-0 left-0 text-white z-99">
            <h1 className="text-3xl font-medium underline cursor-pointer">
                PokéVerse
            </h1>
            <div className="flex gap-10 items-center text-xl font-normal">
                <Link
                    className="px-3 py-2 hover:bg-zinc-700 rounded transition-all"
                    to="/"
                >
                    Home
                </Link>
                <Link
                    className="px-3 py-2 hover:bg-zinc-700 rounded transition-all"
                    to="/about"
                >
                    About
                </Link>
                <Link
                    className="px-3 py-2 hover:bg-zinc-700 rounded transition-all"
                    to="/pokemon"
                >
                    Pokemon
                </Link>
                <Link
                    className="px-3 py-2 hover:bg-zinc-700 rounded transition-all"
                    to="/favorite"
                >
                    Favorite
                </Link>
                <Link
                    className="px-3 py-2 hover:bg-zinc-700 rounded transition-all"
                    to="/pokemonDetails"
                >
                    PokemonDetails
                </Link>
            </div>
        </div>
    );
};

export default Header;
