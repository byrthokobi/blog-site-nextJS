"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export const HamburgerMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="md:hidden w-full">
            {/* Hamburger button */}
            <button
                className="flex items-center mb-2"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Menu items */}
            <div
                className={`flex flex-col gap-2 overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96" : "max-h-0"
                    }`}
            >
                <Link href="/" className="px-4 py-2 rounded-xl hover:bg-yellow-400">
                    Home
                </Link>
                <Link
                    href="/categories"
                    className="px-4 py-2 rounded-xl hover:bg-yellow-400"
                >
                    Categories
                </Link>
                <Link href="/about" className="px-4 py-2 rounded-xl hover:bg-yellow-400">
                    About Us
                </Link>
                <Link
                    href="/contact"
                    className="px-4 py-2 rounded-xl hover:bg-yellow-400"
                >
                    Contact Us
                </Link>
            </div>
        </div>
    );
};
