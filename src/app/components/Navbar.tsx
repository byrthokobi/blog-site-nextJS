import Link from 'next/link'
import React from 'react'

export const Navbar = () => {
    return (
        <div className="bg-gray-600 flex justify-between items-center px-6">
            {/* Logo */}
            <div className="logo bg-black text-white px-4 py-2">
                Logo
            </div>

            {/* Menu Items */}
            <div className="menu-items flex justify-center gap-8 px-3 py-2 bg-green-300">
                <Link
                    href="/"
                    className="px-4 py-2 transition transform rounded-xl hover:scale-110 hover:bg-yellow-400"
                >
                    Home
                </Link>
                <Link
                    href="/categories"
                    className="px-4 py-2 transition transform rounded-xl hover:scale-110 hover:bg-yellow-400"
                >
                    Categories
                </Link>
                <Link
                    href="/about"
                    className="px-4 py-2 transition transform rounded-xl hover:scale-110 hover:bg-yellow-400"
                >
                    About Us
                </Link>
                <Link
                    href="/contact"
                    className="px-4 py-2 transition transform rounded-xl hover:scale-110 hover:bg-yellow-400"
                >
                    Contact Us
                </Link>
            </div>

            {/* Profile */}
            <div className="nav-profile bg-yellow-700 px-4 py-2 flex gap-3">
                <button>Login</button>
                <button>SignUp</button>
            </div>
        </div>
    )
}
