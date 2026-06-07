import Link from "next/link";
import React from "react";
import { ModeToggle } from "./ToggleTheme";

const Navbar = () => {
  return (
    <header className="w-full border-b bg-background">
      <div className="container mx-auto h-16 flex items-center justify-between px-4">

        {/* Logo */}
        <h1 className="text-xl font-bold whitespace-nowrap">
          Zewar E-Commerce
        </h1>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/home" className="hover:text-primary transition">
            Home
          </Link>
          <Link href="/products" className="hover:text-primary transition">
            Products
          </Link>
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-3 shrink-0">
          <button className="px-4 py-2 text-sm rounded-md bg-primary text-primary-foreground hover:opacity-90 transition">
            Login
          </button>

          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
