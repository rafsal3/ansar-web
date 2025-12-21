import { MapPin, Phone, Mail, Instagram, Facebook, MessageCircle } from 'lucide-react';

const Contact = () => {
    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900">Contact Us</h1>
                    <p className="mt-2 text-lg text-gray-600">Get in touch with us for any inquiries or information</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                    {/* Contact Form */}
                    <div className="bg-white rounded-3xl p-8 shadow-sm">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Send us a Message</h2>
                        <p className="text-gray-600 mb-8">Get in touch with us for any inquiries or information</p>

                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="fullName1" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    <input type="text" id="fullName1" placeholder="Name" className="w-full px-4 py-3 rounded-lg bg-gray-50 border-transparent focus:border-blue-500 focus:bg-white focus:ring-0 transition-colors" />
                                </div>
                                <div>
                                    <label htmlFor="fullName2" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    <input type="text" id="fullName2" placeholder="Name" className="w-full px-4 py-3 rounded-lg bg-gray-50 border-transparent focus:border-blue-500 focus:bg-white focus:ring-0 transition-colors" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="fullName3" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    <input type="text" id="fullName3" placeholder="Name" className="w-full px-4 py-3 rounded-lg bg-gray-50 border-transparent focus:border-blue-500 focus:bg-white focus:ring-0 transition-colors" />
                                </div>
                                <div>
                                    <label htmlFor="fullName4" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    <input type="text" id="fullName4" placeholder="Name" className="w-full px-4 py-3 rounded-lg bg-gray-50 border-transparent focus:border-blue-500 focus:bg-white focus:ring-0 transition-colors" />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <textarea id="message" rows={6} placeholder="Name" className="w-full px-4 py-3 rounded-lg bg-gray-50 border-transparent focus:border-blue-500 focus:bg-white focus:ring-0 transition-colors resize-none"></textarea>
                            </div>
                            <button type="submit" className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
                                Send Message
                            </button>
                        </form>
                    </div>

                    {/* Contact Information */}
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-8">Contact Information</h2>
                        <div className="space-y-6">
                            {/* Address */}
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-indigo-100 rounded-xl text-indigo-600">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">Address</h3>
                                    <p className="text-indigo-600">Ansar Higher Secondary School Campus,<br />Education City, State - 123456</p>
                                </div>
                            </div>

                            {/* Admission Office */}
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-indigo-100 rounded-xl text-indigo-600">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">Admission office</h3>
                                    <p className="text-indigo-600">+91 98765 43210</p>
                                </div>
                            </div>

                            {/* General Inquiries */}
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-indigo-100 rounded-xl text-indigo-600">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">General Inquiries</h3>
                                    <p className="text-indigo-600">+91 98765 43210</p>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-indigo-100 rounded-xl text-indigo-600">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">Email Us</h3>
                                    <p className="text-indigo-600">info@ansarhss.edu</p>
                                </div>
                            </div>

                            {/* Instagram */}
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-red-100 rounded-xl text-gray-900">
                                    <Instagram className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">Instagram</h3>
                                    <p className="text-indigo-600">info@ansarhss.edu</p>
                                </div>
                            </div>

                            {/* Facebook */}
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-blue-100 rounded-xl text-gray-900">
                                    <Facebook className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">Facebook</h3>
                                    <p className="text-indigo-600">info@ansarhss.edu</p>
                                </div>
                            </div>

                            {/* Whatsapp */}
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-green-100 rounded-xl text-gray-900">
                                    <MessageCircle className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">Whatsapp</h3>
                                    <p className="text-indigo-600">info@ansarhss.edu</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Location Map */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">Our Location</h2>
                    <div className="w-full h-96 bg-gray-200 rounded-3xl overflow-hidden shadow-sm">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3954.1038887624854!2d75.6277809!3d11.601701!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba686a4e4e3c875%3A0x272f983b05265cc6!2sMemunda%20Rd%2C%20Memunda%2C%20Kerala%20673104!5e1!3m2!1sen!2sin!4v1766297698151!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="ANSAR Junior College Location"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
