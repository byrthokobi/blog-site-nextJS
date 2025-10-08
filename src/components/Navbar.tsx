"use client"

import { LogIn, X, HomeIcon, ChevronUp, ChevronDown, UserCog } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Logo from '../../public/logo.png'
import { CategoryUI } from '@/lib/types/categories'
import { slugify } from '@/lib/utils/slugify'
import Cookies from 'js-cookie'
import { logoutUser } from '@/lib/api/auth'
import { useRouter } from "next/navigation";
import { useAuth } from '@/lib/context/AuthContext'

interface NavbarProps {
    categories: CategoryUI[];
}

export const Navbar = ({ categories }: NavbarProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const router = useRouter();
    const { user, setUser } = useAuth();

    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            await logoutUser();
        } catch (err) {
            console.warn("Logout API failed:", err);
        } finally {
            Cookies.remove("payloadSession");
            setUser(null);
            router.push("/login");
            setIsLoggingOut(false);
        }
    };

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <div className="border-b-1 border-b-gray bg-white sticky top-0 z-50">
            <div className="flex justify-between items-center px-4 sm:px-6 max-w-[90%] mx-auto">
                <Link href="/">
                    <div className="logo px-2 sm:px-4 py-2">
                        <Image
                            src={Logo}
                            width={180}
                            height={30}
                            alt="Logo.png"
                            className="sm:w-[240px] sm:h-[40px]"
                        />
                    </div>
                </Link>

                {/* Desktop Menu Items */}
                <div className="hidden lg:flex justify-center gap-8 px-3 py-2">
                    <Link
                        href="/"
                        className="flex items-center gap-2 px-4 py-2 transition-all duration-300 transform rounded-xl hover:scale-110 hover:bg-yellow-400 font-medium"
                    >
                        <p>Home</p>
                        <HomeIcon size={16} />
                    </Link>
                    {/* Categories with Dropdown */}
                    <div
                        className="relative"
                        onMouseEnter={() => setIsCategoriesOpen(true)}
                        onMouseLeave={() => setIsCategoriesOpen(false)}
                    >
                        <div
                            className="flex items-center gap-2 px-4 py-2 transition-all duration-300 transform rounded-xl hover:scale-110 hover:bg-yellow-400 font-medium"
                        >
                            <span>Categories</span>
                            <div className="transition-transform duration-200 ease-in-out">
                                {isCategoriesOpen ? (
                                    <ChevronUp size={16} className="transform transition-transform duration-200" />
                                ) : (
                                    <ChevronDown size={16} className="transform transition-transform duration-200" />
                                )}
                            </div>
                        </div>

                        {/* Dropdown Menu */}
                        <div
                            className={`absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-xl shadow-lg transition-all duration-300 ease-in-out transform origin-top ${isCategoriesOpen
                                ? 'opacity-100 scale-y-100 translate-y-0 pointer-events-auto'
                                : 'opacity-0 scale-y-95 -translate-y-2 pointer-events-none'
                                }`}
                        >
                            <div className="py-2">
                                {categories.map((category, index) => (
                                    <Link
                                        key={category.categoryName}
                                        href={`/blogs/${slugify(category.categoryName)}`}
                                        className="block px-4 py-3 text-gray-700 hover:bg-yellow-400 hover:text-gray-900 transition-colors duration-200 font-medium"
                                        style={{
                                            transitionDelay: isCategoriesOpen ? `${index * 30}ms` : '0ms'
                                        }}
                                    >
                                        {category.categoryName}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
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

                <div className="hidden lg:flex nav-profile py-2 gap-3">
                    {user ? (
                        <button
                            className="nav-button flex items-center gap-2 px-4 py-2 text-white transition-colors duration-300"
                            onClick={handleLogout}
                            disabled={isLoggingOut}>
                            {isLoggingOut ? "Logging Out..." : `${user.firstName} | LogOut`} <UserCog size={16} />
                        </button>
                    ) : (
                        <>
                            <Link href="/login">
                                <button className="nav-button flex items-center gap-2 px-4 py-2 text-white transition-colors duration-300">
                                    Login <LogIn size={16} />
                                </button>
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Hamburger Menu Button */}
                <button
                    onClick={toggleMenu}
                    className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300 relative"
                    aria-label="Toggle menu"
                >
                    <div className="relative w-6 h-6">
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

                <div className="flex flex-col p-6 space-y-4">
                    <Link
                        href="/"
                        onClick={closeMenu}
                        className="flex items-center gap-2 px-4 py-3 text-lg font-medium text-gray-700 rounded-xl hover:bg-yellow-400"
                    >
                        <p>Home</p>
                        <HomeIcon size={16} />
                    </Link>
                    <div className="space-y-2">
                        <button
                            onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                            className="w-full flex items-center justify-between px-4 py-3 text-lg font-medium text-gray-700 rounded-xl hover:bg-yellow-400 transition-colors duration-200"
                        >
                            <span>Categories</span>
                            <div className="transition-transform duration-200 ease-in-out">
                                {isCategoriesOpen ? (
                                    <ChevronUp size={16} />
                                ) : (
                                    <ChevronDown size={16} />
                                )}
                            </div>
                        </button>

                        {/* Mobile Categories Dropdown */}
                        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isCategoriesOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                            }`}>
                            <div className="ml-4 space-y-2 pt-2">
                                {categories.map((category, index) => (
                                    <Link
                                        key={category.categoryName}
                                        href={`/blogs/${slugify(category.categoryName)}`}
                                        onClick={closeMenu}
                                        className="block px-4 py-2 text-base font-medium text-gray-600 rounded-lg hover:bg-yellow-300 hover:text-gray-900 transition-colors duration-200"
                                        style={{
                                            transitionDelay: isCategoriesOpen ? `${index * 50}ms` : '0ms'
                                        }}
                                    >
                                        {category.categoryName}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
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
                    <div className="hidden lg:flex nav-profile py-2 gap-3">
                        {user ? (
                            <button className="nav-button flex items-center gap-2 px-4 py-2 text-white transition-colors duration-300">
                                {user.firstName} | LogOut <UserCog size={16} />
                            </button>
                        ) : (
                            <>
                                <Link href="/login">
                                    <button className="nav-button flex items-center gap-2 px-4 py-2 text-white transition-colors duration-300">
                                        Login <LogIn size={16} />
                                    </button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}