import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" className="text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors">
                        Ansar College
                    </Link>
                    <ul className="flex space-x-8">
                        <li>
                            <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
                                About
                            </Link>
                        </li>
                        <li>
                            <Link to="/news" className="text-gray-700 hover:text-blue-600 transition-colors">
                                News
                            </Link>
                        </li>
                        <li>
                            <Link to="/events" className="text-gray-700 hover:text-blue-600 transition-colors">
                                Events
                            </Link>
                        </li>
                        <li>
                            <Link to="/courses" className="text-gray-700 hover:text-blue-600 transition-colors">
                                Courses
                            </Link>
                        </li>
                        <li>
                            <Link to="/notifications" className="text-gray-700 hover:text-blue-600 transition-colors">
                                Notifications
                            </Link>
                        </li>
                        <li>
                            <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
