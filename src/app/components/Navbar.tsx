import { LogIn, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Logo from '../../../public/logo.png'

export const Navbar = () => {
    return (
        <div className="border-b-1 border-b-gray flex justify-between items-center px-6 max-w-[90%] mx-auto">
            {/* Logo */}
            <div className="logo px-4 py-2">
                <Image
                    src={Logo}
                    width={240}
                    height={40}
                    alt="Logo.png"
                />
            </div>

            {/* Menu Items */}
            <div className="menu-items flex justify-center gap-8 px-3 py-2">
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
            <div className="nav-profile py-2 flex gap-3">
                <button className='nav-button'>Login <LogIn /></button>
            </div>
        </div>
    )
}
