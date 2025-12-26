import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Phone, Calendar, GraduationCap, Save, ArrowLeft, Camera, KeyRound } from 'lucide-react';
import { alumniApi, AlumniProfile } from '@/api/alumniApi';
import { getAllJobs, Job } from '@/api/jobApi';
import { resetAlumniPassword } from '@/api/authApi';
import { API_BASE_URL } from '@/api/apiClient';

const EditProfile = () => {
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [profileData, setProfileData] = useState<AlumniProfile | null>(null);
    const [jobs, setJobs] = useState<Job[]>([]);
    const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);

    // Password reset state (separate from profile update)
    const [resettingPassword, setResettingPassword] = useState(false);
    const [passwordResetError, setPasswordResetError] = useState<string | null>(null);
    const [passwordResetSuccess, setPasswordResetSuccess] = useState<string | null>(null);
    const [passwordData, setPasswordData] = useState({
        newPassword: '',
        confirmPassword: ''
    });

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
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                // Fetch profile data and jobs in parallel
                const [profileResponse, jobsResponse] = await Promise.all([
                    alumniApi.getAlumniMe(),
                    getAllJobs()
                ]);

                setProfileData(profileResponse);
                setJobs(jobsResponse.data);

                // Pre-fill form with fetched data
                setFormData({
                    fullName: profileResponse.name || '',
                    email: profileResponse.email || '',
                    phone: profileResponse.phone || '',
                    startYear: profileResponse.startYear?.toString() || '',
                    endYear: profileResponse.endYear?.toString() || '',
                    course: profileResponse.course || '',
                    className: profileResponse.className || '',
                    jobId: profileResponse.job?.id.toString() || '',
                    instagram: profileResponse.instagram || '',
                    facebook: profileResponse.facebook || '',
                    whatsapp: profileResponse.whatsapp || ''
                });
            } catch (err: any) {
                console.error('Error fetching data:', err);
                setError(err.response?.data?.message || 'Failed to load data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setSubmitting(true);
            setError(null);
            setSuccessMessage(null);

            const updateData = {
                name: formData.fullName,
                email: formData.email,
                phone: formData.phone,
                course: formData.course,
                startYear: formData.startYear,
                endYear: formData.endYear,
                className: formData.className,
                jobId: formData.jobId,
                instagram: formData.instagram,
                facebook: formData.facebook,
                whatsapp: formData.whatsapp,
                photo: selectedPhoto || undefined
            };

            const response = await alumniApi.updateAlumniProfile(updateData);
            setSuccessMessage(response.message || 'Profile updated successfully!');

            // Refresh profile data
            const updatedData = await alumniApi.getAlumniMe();
            setProfileData(updatedData);

            // Clear photo selection
            setSelectedPhoto(null);
            setPhotoPreview(null);

            // Scroll to top to show success message
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (err: any) {
            console.error('Error updating profile:', err);
            setError(err.response?.data?.message || 'Failed to update profile');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } finally {
            setSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedPhoto(file);
            // Create preview URL
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordData({
            ...passwordData,
            [e.target.name]: e.target.value
        });
        // Clear errors when user starts typing
        setPasswordResetError(null);
    };

    const handlePasswordReset = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate passwords match
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setPasswordResetError('Passwords do not match');
            return;
        }

        // Validate password length
        if (passwordData.newPassword.length < 6) {
            setPasswordResetError('Password must be at least 6 characters long');
            return;
        }

        if (!profileData?.email) {
            setPasswordResetError('Email not found. Please try again.');
            return;
        }

        try {
            setResettingPassword(true);
            setPasswordResetError(null);
            setPasswordResetSuccess(null);

            await resetAlumniPassword({
                email: profileData.email,
                newPassword: passwordData.newPassword
            });

            setPasswordResetSuccess('Password reset successfully!');

            // Clear password fields
            setPasswordData({
                newPassword: '',
                confirmPassword: ''
            });

            // Scroll to password section to show success message
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        } catch (err: any) {
            console.error('Error resetting password:', err);
            setPasswordResetError(err.response?.data?.message || 'Failed to reset password. Please try again.');
        } finally {
            setResettingPassword(false);
        }
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
                    {/* Success Message */}
                    {successMessage && (
                        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                            <p className="text-green-800 text-sm font-medium">{successMessage}</p>
                        </div>
                    )}

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                            <p className="text-red-800 text-sm font-medium">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Profile Photo Section */}
                        <div className="flex flex-col items-center mb-6">
                            <div className="relative">
                                <img
                                    src={photoPreview || (profileData?.photos && profileData.photos.length > 0
                                        ? `${API_BASE_URL}${profileData.photos[0]}`
                                        : '/default-avatar.png')}
                                    alt={profileData?.name || 'Profile'}
                                    className="w-32 h-32 rounded-full object-cover border-4 border-teal-500 shadow-lg"
                                />
                                <label
                                    htmlFor="photo-upload"
                                    className="absolute bottom-0 right-0 w-10 h-10 bg-teal-600 hover:bg-teal-700 rounded-full flex items-center justify-center border-2 border-white cursor-pointer transition-colors"
                                >
                                    <Camera className="w-5 h-5 text-white" />
                                </label>
                                <input
                                    id="photo-upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={handlePhotoChange}
                                    className="hidden"
                                />
                            </div>
                            <p className="mt-3 text-sm font-medium text-gray-700">{profileData?.name}</p>
                            <p className="text-xs text-gray-500">{profileData?.email}</p>
                            {selectedPhoto && (
                                <p className="mt-2 text-xs text-teal-600">New photo selected: {selectedPhoto.name}</p>
                            )}
                        </div>

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

                                {/* Job/Occupation */}
                                <div className="md:col-span-2">
                                    <label htmlFor="jobId" className="block text-sm font-medium text-gray-700 mb-2">
                                        Current Occupation *
                                    </label>
                                    <select
                                        id="jobId"
                                        name="jobId"
                                        required
                                        value={formData.jobId}
                                        onChange={handleChange}
                                        className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all bg-white"
                                    >
                                        <option value="">Select your occupation</option>
                                        {jobs.map((job) => (
                                            <option key={job.id} value={job.id.toString()}>
                                                {job.name}
                                            </option>
                                        ))}
                                    </select>
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
                            disabled={submitting}
                            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-colors shadow-lg shadow-teal-200"
                        >
                            {submitting ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="w-5 h-5" />
                                    Save Changes
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Password Reset Card - Separate from Profile Update */}
                <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 mt-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <KeyRound className="w-5 h-5 text-teal-600" />
                        Reset Password
                    </h3>
                    <p className="text-sm text-gray-600 mb-6">
                        Use this section to reset your password. This is separate from updating your profile information.
                    </p>

                    {/* Password Reset Success Message */}
                    {passwordResetSuccess && (
                        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                            <p className="text-green-800 text-sm font-medium">{passwordResetSuccess}</p>
                        </div>
                    )}

                    {/* Password Reset Error Message */}
                    {passwordResetError && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                            <p className="text-red-800 text-sm font-medium">{passwordResetError}</p>
                        </div>
                    )}

                    <form onSubmit={handlePasswordReset} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* New Password */}
                            <div>
                                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                    New Password *
                                </label>
                                <input
                                    id="newPassword"
                                    name="newPassword"
                                    type="password"
                                    required
                                    value={passwordData.newPassword}
                                    onChange={handlePasswordChange}
                                    className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                                    placeholder="Enter new password"
                                    disabled={resettingPassword}
                                    minLength={6}
                                />
                                <p className="mt-1 text-xs text-gray-500">Must be at least 6 characters</p>
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                    Confirm New Password *
                                </label>
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    required
                                    value={passwordData.confirmPassword}
                                    onChange={handlePasswordChange}
                                    className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                                    placeholder="Confirm new password"
                                    disabled={resettingPassword}
                                    minLength={6}
                                />
                            </div>
                        </div>

                        {/* Reset Password Button */}
                        <button
                            type="submit"
                            disabled={resettingPassword}
                            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-all shadow-lg shadow-teal-200"
                        >
                            {resettingPassword ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                    Resetting Password...
                                </>
                            ) : (
                                <>
                                    <KeyRound className="w-5 h-5" />
                                    Reset Password
                                </>
                            )}
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
