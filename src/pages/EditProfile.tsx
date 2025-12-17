import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Phone, Calendar, GraduationCap, Save, ArrowLeft } from 'lucide-react';
import { alumniApi, AlumniProfile } from '@/api/alumniApi';
import { API_BASE_URL } from '@/api/apiClient';

const EditProfile = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [profileData, setProfileData] = useState<AlumniProfile | null>(null);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        startYear: '',
        endYear: '',
        course: '',
        className: '',
        jobId: '',
        instagram: '',
        facebook: '',
        whatsapp: ''
    });

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await alumniApi.getAlumniMe();
                setProfileData(data);

                // Pre-fill form with fetched data
                setFormData({
                    fullName: data.name || '',
                    email: data.email || '',
                    phone: data.phone || '',
                    startYear: data.startYear?.toString() || '',
                    endYear: data.endYear?.toString() || '',
                    course: data.course || '',
                    className: data.className || '',
                    jobId: data.job?.id.toString() || '',
                    instagram: data.instagram || '',
                    facebook: data.facebook || '',
                    whatsapp: data.whatsapp || ''
                });
            } catch (err: any) {
                console.error('Error fetching profile:', err);
                setError(err.response?.data?.message || 'Failed to load profile data');
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, []);

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

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                        <div className="flex items-center justify-center py-12">
                            <div className="text-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
                                <p className="text-gray-600">Loading profile...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                        <div className="text-center py-12">
                            <p className="text-red-600 mb-4">{error}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl transition-colors"
                            >
                                Retry
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

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
                        {/* Profile Photo Section */}
                        {profileData?.photos && profileData.photos.length > 0 && (
                            <div className="flex flex-col items-center mb-6">
                                <div className="relative">
                                    <img
                                        src={`${API_BASE_URL}${profileData.photos[0]}`}
                                        alt={profileData.name}
                                        className="w-32 h-32 rounded-full object-cover border-4 border-teal-500 shadow-lg"
                                    />
                                    <div className="absolute bottom-0 right-0 w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center border-2 border-white">
                                        <User className="w-4 h-4 text-white" />
                                    </div>
                                </div>
                                <p className="mt-3 text-sm font-medium text-gray-700">{profileData.name}</p>
                                <p className="text-xs text-gray-500">{profileData.email}</p>
                            </div>
                        )}

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
                                {/* Start Year */}
                                <div>
                                    <label htmlFor="startYear" className="block text-sm font-medium text-gray-700 mb-2">
                                        Start Year *
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Calendar className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            id="startYear"
                                            name="startYear"
                                            type="number"
                                            required
                                            value={formData.startYear}
                                            onChange={handleChange}
                                            className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                                            placeholder="2020"
                                            min="1950"
                                            max="2030"
                                        />
                                    </div>
                                </div>

                                {/* End Year */}
                                <div>
                                    <label htmlFor="endYear" className="block text-sm font-medium text-gray-700 mb-2">
                                        End Year *
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Calendar className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            id="endYear"
                                            name="endYear"
                                            type="number"
                                            required
                                            value={formData.endYear}
                                            onChange={handleChange}
                                            className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                                            placeholder="2024"
                                            min="1950"
                                            max="2030"
                                        />
                                    </div>
                                </div>

                                {/* Course */}
                                <div>
                                    <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-2">
                                        Course *
                                    </label>
                                    <input
                                        id="course"
                                        name="course"
                                        type="text"
                                        required
                                        value={formData.course}
                                        onChange={handleChange}
                                        className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                                        placeholder="BSc, MSc, etc."
                                    />
                                </div>

                                {/* Class Name */}
                                <div>
                                    <label htmlFor="className" className="block text-sm font-medium text-gray-700 mb-2">
                                        Class Name *
                                    </label>
                                    <input
                                        id="className"
                                        name="className"
                                        type="text"
                                        required
                                        value={formData.className}
                                        onChange={handleChange}
                                        className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                                        placeholder="Class A, Class B, etc."
                                    />
                                </div>

                                {/* Job/Occupation - Note: This would ideally be a dropdown populated from jobs API */}
                                <div className="md:col-span-2">
                                    <label htmlFor="jobId" className="block text-sm font-medium text-gray-700 mb-2">
                                        Current Occupation *
                                    </label>
                                    <input
                                        id="jobId"
                                        name="jobId"
                                        type="text"
                                        required
                                        value={formData.jobId}
                                        onChange={handleChange}
                                        className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                                        placeholder="Job ID"
                                    />
                                    {profileData?.job && (
                                        <p className="mt-2 text-sm text-gray-600">
                                            Current: {profileData.job.name}
                                        </p>
                                    )}
                                </div>

                                {/* Social Media Links */}
                                <div className="md:col-span-2">
                                    <h4 className="text-md font-semibold text-gray-800 mb-3">Social Media (Optional)</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {/* Instagram */}
                                        <div>
                                            <label htmlFor="instagram" className="block text-sm font-medium text-gray-700 mb-2">
                                                Instagram
                                            </label>
                                            <input
                                                id="instagram"
                                                name="instagram"
                                                type="text"
                                                value={formData.instagram}
                                                onChange={handleChange}
                                                className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                                                placeholder="@username"
                                            />
                                        </div>

                                        {/* Facebook */}
                                        <div>
                                            <label htmlFor="facebook" className="block text-sm font-medium text-gray-700 mb-2">
                                                Facebook
                                            </label>
                                            <input
                                                id="facebook"
                                                name="facebook"
                                                type="text"
                                                value={formData.facebook}
                                                onChange={handleChange}
                                                className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                                                placeholder="Profile URL"
                                            />
                                        </div>

                                        {/* WhatsApp */}
                                        <div>
                                            <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700 mb-2">
                                                WhatsApp
                                            </label>
                                            <input
                                                id="whatsapp"
                                                name="whatsapp"
                                                type="text"
                                                value={formData.whatsapp}
                                                onChange={handleChange}
                                                className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                                                placeholder="Phone number"
                                            />
                                        </div>
                                    </div>
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
