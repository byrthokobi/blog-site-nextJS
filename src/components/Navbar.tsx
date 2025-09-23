"use client"

import { LogIn, User, Menu, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import Logo from '../../public/logo.png'

export const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const closeMenu = () => {
        setIsMenuOpen(false)
    }

    return (
        <div className="border-b-1 border-b-gray bg-white sticky top-0 z-50">
            <div className="flex justify-between items-center px-4 sm:px-6 max-w-[90%] mx-auto">
                {/* Logo */}
                <div className="logo px-2 sm:px-4 py-2">
                    <Image
                        src={Logo}
                        width={180}
                        height={30}
                        alt="Logo.png"
                        className="sm:w-[240px] sm:h-[40px]"
                    />
                </div>

                {/* Desktop Menu Items */}
                <div className="hidden lg:flex justify-center gap-8 px-3 py-2">
                    <Link
                        href="/"
                        className="px-4 py-2 transition-all duration-300 transform rounded-xl hover:scale-110 hover:bg-yellow-400 font-medium"
                    >
                        Home
                    </Link>
                    <Link
                        href="/categories"
                        className="px-4 py-2 transition-all duration-300 transform rounded-xl hover:scale-110 hover:bg-yellow-400 font-medium"
                    >
                        Categories
                    </Link>
                    <Link
                        href="/about"
                        className="px-4 py-2 transition-all duration-300 transform rounded-xl hover:scale-110 hover:bg-yellow-400 font-medium"
                    >
                        About Us
                    </Link>
                    <Link
                        href="/contact"
                        className="px-4 py-2 transition-all duration-300 transform rounded-xl hover:scale-110 hover:bg-yellow-400 font-medium"
                    >
                        Contact Us
                    </Link>
                </div>

                {/* Desktop Profile */}
                <div className="hidden lg:flex nav-profile py-2 gap-3">
                    <button className="nav-button flex items-center gap-2 px-4 py-2 text-white transition-colors duration-300">
                        Login <LogIn size={16} />
                    </button>
                </div>

                {/* Mobile Hamburger Menu Button */}
                <button
                    onClick={toggleMenu}
                    className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300 relative"
                    aria-label="Toggle menu"
                >
                    <div className="relative w-6 h-6">
                        {/* Hamburger Icon Animation */}
                        <span
                            className={`absolute top-0 left-0 w-6 h-0.5 bg-gray-800 transition-all duration-300 ease-in-out ${isMenuOpen
                                ? 'rotate-45 translate-y-2.5'
                                : 'rotate-0 translate-y-0'
                                }`}
                        />
                        <span
                            className={`absolute top-2.5 left-0 w-6 h-0.5 bg-gray-800 transition-all duration-300 ease-in-out ${isMenuOpen
                                ? 'opacity-0'
                                : 'opacity-100'
                                }`}
                        />
                        <span
                            className={`absolute top-5 left-0 w-6 h-0.5 bg-gray-800 transition-all duration-300 ease-in-out ${isMenuOpen
                                ? '-rotate-45 -translate-y-2.5'
                                : 'rotate-0 translate-y-0'
                                }`}
                        />
                    </div>
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <div
                className={`lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${isMenuOpen
                    ? 'opacity-100 pointer-events-auto'
                    : 'opacity-0 pointer-events-none'
                    }`}
                onClick={closeMenu}
            />

            {/* Mobile Menu */}
            <div
                className={`lg:hidden fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isMenuOpen
                    ? 'translate-x-0'
                    : 'translate-x-full'
                    }`}
            >
                {/* Mobile Menu Header */}
                <div className="flex justify-between items-center p-6 border-b">
                    <div className="logo px-2 sm:px-4 py-2">
                        <Image
                            src={Logo}
                            width={180}
                            height={30}
                            alt="Logo.png"
                            className="sm:w-[240px] sm:h-[40px]"
                        />
                    </div>
                    <button
                        onClick={closeMenu}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                        aria-label="Close menu"
                    >
                        <X size={24} className="text-gray-600" />
                    </button>
                </div>

                {/* Mobile Menu Items */}
                <div className="flex flex-col p-6 space-y-4">
                    <Link
                        href="/"
                        onClick={closeMenu}
                        className="px-4 py-3 text-lg font-medium text-gray-700 rounded-xl hover:bg-yellow-400"
                    >
                        Home
                    </Link>
                    <Link
                        href="/categories"
                        onClick={closeMenu}
                        className="px-4 py-3 text-lg font-medium text-gray-700 rounded-xl hover:bg-yellow-400"
                    >
                        Categories
                    </Link>
                    <Link
                        href="/about"
                        onClick={closeMenu}
                        className="px-4 py-3 text-lg font-medium text-gray-700 rounded-xl hover:bg-yellow-400"
                    >
                        About Us
                    </Link>
                    <Link
                        href="/contact"
                        onClick={closeMenu}
                        className="px-4 py-3 text-lg font-medium text-gray-700 rounded-xl hover:bg-yellow-400"
                    >
                        Contact Us
                    </Link>

                    {/* Mobile Login Button */}
                    <div className="pt-4 mt-4 border-t">
                        <button
                            onClick={closeMenu}
                            className="w-full nav-button gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg transition-colors duration-300 font-medium"
                        >
                            Login <LogIn size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}