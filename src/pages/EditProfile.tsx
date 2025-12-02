import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Phone, Calendar, GraduationCap, Save, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const EditProfile = () => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        graduationYear: '',
        stream: '',
        class: '',
        occupation: ''
    });

    useEffect(() => {
        if (user) {
            // Pre-fill with mock data or user data if available
            setFormData({
                fullName: user.name || 'Alumni User',
                email: user.email || 'alumni@gmail.com',
                phone: '+91 9876543210',
                graduationYear: user.batch ? user.batch.split('-')[1] : '2023',
                stream: 'Science',
                class: '12 A',
                occupation: 'Software Engineer'
            });
        }
    }, [user]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle profile update logic here
        console.log('Profile update attempt:', formData);
        alert('Profile updated successfully!');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-2">Edit Profile</h2>
                    <p className="text-gray-600">Update your personal and academic information</p>
                </div>

                {/* Edit Profile Card */}
                <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Personal Information Section */}
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <User className="w-5 h-5 text-teal-600" />
                                Personal Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Full Name */}
                                <div className="md:col-span-2">
                                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                                        Full Name *
                                    </label>
                                    <input
                                        id="fullName"
                                        name="fullName"
                                        type="text"
                                        required
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                                        placeholder="John Doe"
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address *
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Mail className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                                            placeholder="your.email@example.com"
                                            disabled // Email usually shouldn't be changed easily
                                        />
                                    </div>
                                </div>

                                {/* Phone */}
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                        Phone Number *
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Phone className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            id="phone"
                                            name="phone"
                                            type="tel"
                                            required
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                                            placeholder="+91 1234567890"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Academic Information Section */}
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <GraduationCap className="w-5 h-5 text-teal-600" />
                                Academic Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Graduation Year */}
                                <div>
                                    <label htmlFor="graduationYear" className="block text-sm font-medium text-gray-700 mb-2">
                                        Graduation Year *
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Calendar className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            id="graduationYear"
                                            name="graduationYear"
                                            type="number"
                                            required
                                            value={formData.graduationYear}
                                            onChange={handleChange}
                                            className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                                            placeholder="2024"
                                            min="1950"
                                            max="2024"
                                        />
                                    </div>
                                </div>

                                {/* Stream */}
                                <div>
                                    <label htmlFor="stream" className="block text-sm font-medium text-gray-700 mb-2">
                                        Stream *
                                    </label>
                                    <select
                                        id="stream"
                                        name="stream"
                                        required
                                        value={formData.stream}
                                        onChange={handleChange}
                                        className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                                    >
                                        <option value="">Select Stream</option>
                                        <option value="Science">Science</option>
                                        <option value="Commerce">Commerce</option>
                                        <option value="Humanities">Humanities</option>
                                    </select>
                                </div>

                                {/* Class */}
                                <div className="md:col-span-2">
                                    <label htmlFor="class" className="block text-sm font-medium text-gray-700 mb-2">
                                        Class *
                                    </label>
                                    <select
                                        id="class"
                                        name="class"
                                        required
                                        value={formData.class}
                                        onChange={handleChange}
                                        className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                                    >
                                        <option value="">Select Class</option>
                                        <option value="12 A">12 A</option>
                                        <option value="12 B">12 B</option>
                                        <option value="12 C">12 C</option>
                                        <option value="10 A">10 A</option>
                                        <option value="10 B">10 B</option>
                                    </select>
                                </div>

                                {/* Occupation */}
                                <div className="md:col-span-2">
                                    <label htmlFor="occupation" className="block text-sm font-medium text-gray-700 mb-2">
                                        Current Occupation *
                                    </label>
                                    <select
                                        id="occupation"
                                        name="occupation"
                                        required
                                        value={formData.occupation}
                                        onChange={handleChange}
                                        className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                                    >
                                        <option value="">Select Occupation</option>
                                        <option value="Software Engineer">Software Engineer</option>
                                        <option value="Doctor">Doctor</option>
                                        <option value="Teacher">Teacher</option>
                                        <option value="Business Owner">Business Owner</option>
                                        <option value="Civil Engineer">Civil Engineer</option>
                                        <option value="Mechanical Engineer">Mechanical Engineer</option>
                                        <option value="Electrical Engineer">Electrical Engineer</option>
                                        <option value="Nurse">Nurse</option>
                                        <option value="Pharmacist">Pharmacist</option>
                                        <option value="Lawyer">Lawyer</option>
                                        <option value="Accountant">Accountant</option>
                                        <option value="Architect">Architect</option>
                                        <option value="Designer">Designer</option>
                                        <option value="Marketing Professional">Marketing Professional</option>
                                        <option value="Sales Professional">Sales Professional</option>
                                        <option value="Government Employee">Government Employee</option>
                                        <option value="Student">Student</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-xl transition-colors shadow-lg shadow-teal-200"
                        >
                            <Save className="w-5 h-5" />
                            Save Changes
                        </button>
                    </form>
                </div>

                {/* Back to Home */}
                <div className="mt-6 text-center">
                    <Link to="/" className="text-sm text-gray-600 hover:text-gray-900 inline-flex items-center gap-1">
                        <ArrowLeft className="w-4 h-4" /> Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;
