import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-teal-700 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Ansar College Section */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Ansar College</h3>
                        <p className="text-teal-100 text-sm mb-6">
                            Committed to excellence in education and fostering holistic development of students since our establishment.
                        </p>
                        <div className="flex gap-3">
                            <a href="#" className="w-10 h-10 bg-teal-600 hover:bg-teal-500 rounded-lg flex items-center justify-center transition-colors">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-teal-600 hover:bg-teal-500 rounded-lg flex items-center justify-center transition-colors">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-teal-600 hover:bg-teal-500 rounded-lg flex items-center justify-center transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-teal-600 hover:bg-teal-500 rounded-lg flex items-center justify-center transition-colors">
                                <Linkedin className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/about" className="text-teal-100 hover:text-white transition-colors text-sm">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/courses" className="text-teal-100 hover:text-white transition-colors text-sm">
                                    Courses
                                </Link>
                            </li>
                            <li>
                                <Link to="/faculty" className="text-teal-100 hover:text-white transition-colors text-sm">
                                    Faculty
                                </Link>
                            </li>
                            <li>
                                <Link to="/news" className="text-teal-100 hover:text-white transition-colors text-sm">
                                    News & Announcements
                                </Link>
                            </li>
                            <li>
                                <Link to="/events" className="text-teal-100 hover:text-white transition-colors text-sm">
                                    Events
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Academics */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Academics</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-teal-100 hover:text-white transition-colors text-sm">
                                    Undergraduate Programs
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-teal-100 hover:text-white transition-colors text-sm">
                                    Postgraduate Programs
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-teal-100 hover:text-white transition-colors text-sm">
                                    Research
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-teal-100 hover:text-white transition-colors text-sm">
                                    Library
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-teal-100 hover:text-white transition-colors text-sm">
                                    Admissions
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Us */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Contact Us</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-teal-100 flex-shrink-0 mt-0.5" />
                                <span className="text-teal-100 text-sm">
                                    Ansar College Campus, Education District, City 000000
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-teal-100 flex-shrink-0" />
                                <span className="text-teal-100 text-sm">
                                    +91 1234567890
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-teal-100 flex-shrink-0" />
                                <span className="text-teal-100 text-sm">
                                    info@ansarcollege.edu
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Copyright Bar */}
            <div className="border-t border-teal-600">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <p className="text-center text-teal-100 text-sm">
                        © 2025 Ansar College. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
