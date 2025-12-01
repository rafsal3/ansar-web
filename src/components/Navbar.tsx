import { Link, useLocation } from "react-router-dom";
import { User, LogOut, ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
    const { isAuthenticated, isAlumni, isAdmin, logout, user } = useAuth();
    const location = useLocation();
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mobileDropdownOpen, setMobileDropdownOpen] = useState<string | null>(null);

    const isActive = (path: string): boolean => {
        if (path === "/") {
            return location.pathname === "/";
        }
        return location.pathname.startsWith(path);
    };

    const isDropdownActive = (paths: string[]): boolean => {
        return paths.some(path => location.pathname.startsWith(path));
    };

    const navLinkClass = (path: string): string => {
        return `relative text-gray-700 hover:text-blue-600 transition-colors pb-1 ${isActive(path)
            ? "text-blue-600 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-600"
            : ""
            }`;
    };

    const mobileNavLinkClass = (path: string): string => {
        return `block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors ${isActive(path) ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600" : ""
            }`;
    };

    const dropdownLinkClass = (paths: string[]): string => {
        return `relative text-gray-700 hover:text-blue-600 transition-colors pb-1 flex items-center gap-1 cursor-pointer ${isDropdownActive(paths)
            ? "text-blue-600 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-600"
            : ""
            }`;
    };

    const handleMouseEnter = (dropdown: string): void => {
        setActiveDropdown(dropdown);
    };

    const handleMouseLeave = (): void => {
        setActiveDropdown(null);
    };

    const toggleMobileMenu = (): void => {
        setMobileMenuOpen(!mobileMenuOpen);
        setMobileDropdownOpen(null);
    };

    const toggleMobileDropdown = (dropdown: string): void => {
        setMobileDropdownOpen(mobileDropdownOpen === dropdown ? null : dropdown);
    };

    const closeMobileMenu = (): void => {
        setMobileMenuOpen(false);
        setMobileDropdownOpen(null);
    };

    return (
        <nav className="bg-white shadow-md relative z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link
                        to="/"
                        className="text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors"
                        onClick={closeMobileMenu}
                    >
                        Ansar Higher Secondary School
                    </Link>

                    {/* Desktop Navigation */}
                    <ul className="hidden lg:flex space-x-8">
                        <li>
                            <Link to="/" className={navLinkClass("/")}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/about" className={navLinkClass("/about")}>
                                About
                            </Link>
                        </li>

                        {/* Academics Dropdown */}
                        <li
                            className="relative"
                            onMouseEnter={() => handleMouseEnter('academics')}
                            onMouseLeave={handleMouseLeave}
                        >
                            <div className={dropdownLinkClass(["/notifications", "/faculty", "/events", "/courses"])}>
                                <span>Academics</span>
                                <ChevronDown className="w-4 h-4" />
                            </div>
                            {activeDropdown === 'academics' && (
                                <div
                                    className="absolute top-full left-0 mt-0 w-48 bg-white rounded-lg shadow-lg py-2 border border-gray-100"
                                    onMouseEnter={() => handleMouseEnter('academics')}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <Link
                                        to="/notifications"
                                        className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                    >
                                        Notifications
                                    </Link>
                                    <Link
                                        to="/faculty"
                                        className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                    >
                                        Faculty
                                    </Link>
                                    <Link
                                        to="/events"
                                        className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                    >
                                        Events
                                    </Link>
                                    <Link
                                        to="/courses"
                                        className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                    >
                                        Courses
                                    </Link>
                                </div>
                            )}
                        </li>

                        <li>
                            <Link to="/news" className={navLinkClass("/news")}>
                                News
                            </Link>
                        </li>

                        <li>
                            <Link to="/contact" className={navLinkClass("/contact")}>
                                Contact
                            </Link>
                        </li>

                        {/* Alumni Dropdown - Only show if user is alumni */}
                        {isAlumni && (
                            <li
                                className="relative"
                                onMouseEnter={() => handleMouseEnter('alumni')}
                                onMouseLeave={handleMouseLeave}
                            >
                                <div className="relative flex items-center gap-1 cursor-pointer">
                                    <div className={`px-3 py-1.5 rounded-full bg-gradient-to-r from-teal-500 to-teal-600 text-white flex items-center gap-1.5 hover:from-teal-600 hover:to-teal-700 transition-all shadow-sm ${isDropdownActive(["/memories", "/batch-mates"]) ? "ring-2 ring-teal-300 shadow-md" : ""
                                        }`}>
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                                        </svg>
                                        <span className="font-medium text-sm">Alumni</span>
                                        <ChevronDown className="w-3.5 h-3.5" />
                                    </div>
                                </div>
                                {activeDropdown === 'alumni' && (
                                    <div
                                        className="absolute top-full left-0 mt-0 pt-2 w-52 z-50"
                                        onMouseEnter={() => handleMouseEnter('alumni')}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        <div className="bg-white rounded-xl shadow-xl py-2 border border-teal-100">
                                            <div className="px-3 py-2 border-b border-gray-100">
                                                <p className="text-xs font-semibold text-teal-600 uppercase tracking-wide">Alumni Portal</p>
                                            </div>
                                            <Link
                                                to="/memories"
                                                className="block px-4 py-2.5 text-gray-700 hover:bg-teal-50 hover:text-teal-700 transition-colors flex items-center gap-2"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                Memories
                                            </Link>
                                            <Link
                                                to="/batch-mates"
                                                className="block px-4 py-2.5 text-gray-700 hover:bg-teal-50 hover:text-teal-700 transition-colors flex items-center gap-2"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                </svg>
                                                Batch Mates
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </li>
                        )}



                        {/* Admin Dashboard Link */}
                        {isAdmin && (
                            <li>
                                <Link to="/admin" className={navLinkClass("/admin")}>
                                    Dashboard
                                </Link>
                            </li>
                        )}
                    </ul>

                    {/* Desktop Login/Logout Button */}
                    <div className="hidden lg:block">
                        {isAuthenticated && user ? (
                            <div
                                className="relative"
                                onMouseEnter={() => handleMouseEnter('profile')}
                                onMouseLeave={handleMouseLeave}
                            >
                                <button
                                    className="w-10 h-10 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center border border-teal-200 hover:bg-teal-200 transition-colors"
                                >
                                    <span className="font-bold text-lg">
                                        {user.name ? user.name.charAt(0).toUpperCase() : <User className="w-5 h-5" />}
                                    </span>
                                </button>

                                {activeDropdown === 'profile' && (
                                    <div className="absolute right-0 mt-0 w-64 bg-white rounded-xl shadow-xl py-4 border border-gray-100 z-50">
                                        <div className="px-4 pb-3 border-b border-gray-100 mb-2">
                                            <p className="font-bold text-gray-900">{user.name || 'User'}</p>
                                            <p className="text-sm text-gray-500 truncate">{user.email}</p>
                                            {isAlumni && user.batch && (
                                                <p className="text-xs text-teal-600 font-medium mt-1">Batch: {user.batch}</p>
                                            )}
                                        </div>
                                        <Link
                                            to="/edit-profile"
                                            className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm"
                                        >
                                            <User className="w-4 h-4" />
                                            Edit Profile
                                        </Link>
                                        <div className="border-t border-gray-100 my-1"></div>
                                        <button
                                            onClick={logout}
                                            className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2 text-sm"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            Sign Out
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link
                                    to="/login"
                                    className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="bg-teal-600 hover:bg-teal-700 px-5 py-2 rounded-full text-white flex items-center gap-2 transition-colors shadow-sm"
                                >
                                    <User className="w-4 h-4" />
                                    <span>Alumni Registration</span>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMobileMenu}
                        className="lg:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors"
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        <Link to="/" className={mobileNavLinkClass("/")} onClick={closeMobileMenu}>
                            Home
                        </Link>
                        <Link to="/about" className={mobileNavLinkClass("/about")} onClick={closeMobileMenu}>
                            About
                        </Link>

                        {/* Mobile Academics Dropdown */}
                        <div>
                            <button
                                onClick={() => toggleMobileDropdown('academics')}
                                className={`w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors ${isDropdownActive(["/notifications", "/faculty", "/events", "/courses"]) ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600" : ""
                                    }`}
                            >
                                <span>Academics</span>
                                <ChevronDown className={`w-4 h-4 transition-transform ${mobileDropdownOpen === 'academics' ? 'rotate-180' : ''
                                    }`} />
                            </button>
                            {mobileDropdownOpen === 'academics' && (
                                <div className="bg-gray-50 pl-4">
                                    <Link
                                        to="/notifications"
                                        className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                        onClick={closeMobileMenu}
                                    >
                                        Notifications
                                    </Link>
                                    <Link
                                        to="/faculty"
                                        className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                        onClick={closeMobileMenu}
                                    >
                                        Faculty
                                    </Link>
                                    <Link
                                        to="/events"
                                        className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                        onClick={closeMobileMenu}
                                    >
                                        Events
                                    </Link>
                                    <Link
                                        to="/courses"
                                        className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                        onClick={closeMobileMenu}
                                    >
                                        Courses
                                    </Link>
                                </div>
                            )}
                        </div>

                        <Link to="/news" className={mobileNavLinkClass("/news")} onClick={closeMobileMenu}>
                            News
                        </Link>

                        {/* Mobile Alumni Dropdown - Only show if user is alumni */}
                        {isAlumni && (
                            <div className="px-4 py-2">
                                <button
                                    onClick={() => toggleMobileDropdown('alumni')}
                                    className={`w-full flex items-center justify-between px-4 py-3 rounded-full bg-gradient-to-r from-teal-500 to-teal-600 text-white hover:from-teal-600 hover:to-teal-700 transition-all shadow-sm ${isDropdownActive(["/memories", "/batch-mates"]) ? "ring-2 ring-teal-300 shadow-md" : ""
                                        }`}
                                >
                                    <div className="flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                                        </svg>
                                        <span className="font-medium">Alumni Portal</span>
                                    </div>
                                    <ChevronDown className={`w-4 h-4 transition-transform ${mobileDropdownOpen === 'alumni' ? 'rotate-180' : ''
                                        }`} />
                                </button>
                                {mobileDropdownOpen === 'alumni' && (
                                    <div className="mt-2 bg-teal-50 rounded-xl border border-teal-100 overflow-hidden">
                                        <Link
                                            to="/memories"
                                            className="flex items-center gap-2 px-4 py-3 text-gray-700 hover:bg-teal-100 hover:text-teal-700 transition-colors border-b border-teal-100"
                                            onClick={closeMobileMenu}
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            Memories
                                        </Link>
                                        <Link
                                            to="/batch-mates"
                                            className="flex items-center gap-2 px-4 py-3 text-gray-700 hover:bg-teal-100 hover:text-teal-700 transition-colors"
                                            onClick={closeMobileMenu}
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                            Batch Mates
                                        </Link>
                                    </div>
                                )}
                            </div>
                        )}

                        <Link to="/contact" className={mobileNavLinkClass("/contact")} onClick={closeMobileMenu}>
                            Contact
                        </Link>

                        {/* Admin Dashboard Link Mobile */}
                        {isAdmin && (
                            <Link to="/admin" className={mobileNavLinkClass("/admin")} onClick={closeMobileMenu}>
                                Dashboard
                            </Link>
                        )}

                        {/* Mobile Login/Logout Button */}
                        <div className="px-4 py-3">
                            {isAuthenticated && user ? (
                                <div className="space-y-3">
                                    <div className="px-2 py-2 bg-gray-50 rounded-lg border border-gray-100">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center font-bold">
                                                {user.name ? user.name.charAt(0).toUpperCase() : <User className="w-5 h-5" />}
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900 text-sm">{user.name || 'User'}</p>
                                                <p className="text-xs text-gray-500 truncate max-w-[150px]">{user.email}</p>
                                            </div>
                                        </div>
                                        {isAlumni && user.batch && (
                                            <div className="text-xs text-teal-600 font-medium px-1">
                                                Batch: {user.batch}
                                            </div>
                                        )}
                                    </div>
                                    <Link
                                        to="/edit-profile"
                                        className="w-full bg-white border border-gray-200 hover:bg-gray-50 px-5 py-2 rounded-full text-gray-700 flex items-center justify-center gap-2 transition-colors shadow-sm"
                                        onClick={closeMobileMenu}
                                    >
                                        <User className="w-4 h-4" />
                                        <span>Edit Profile</span>
                                    </Link>
                                    <button
                                        onClick={() => {
                                            logout();
                                            closeMobileMenu();
                                        }}
                                        className="w-full bg-red-600 hover:bg-red-700 px-5 py-2 rounded-full text-white flex items-center justify-center gap-2 transition-colors shadow-sm"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        <span>Logout</span>
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-3">
                                    <Link
                                        to="/login"
                                        className="w-full border border-gray-300 hover:bg-gray-50 px-5 py-2 rounded-full text-gray-700 flex items-center justify-center gap-2 transition-colors shadow-sm"
                                        onClick={closeMobileMenu}
                                    >
                                        <span>Login</span>
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="w-full bg-teal-600 hover:bg-teal-700 px-5 py-2 rounded-full text-white flex items-center justify-center gap-2 transition-colors shadow-sm"
                                        onClick={closeMobileMenu}
                                    >
                                        <User className="w-4 h-4" />
                                        <span>Alumni Registration</span>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;