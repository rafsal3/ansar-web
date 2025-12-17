import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, GraduationCap, Briefcase, Upload, Loader2, Facebook, Instagram, Save } from 'lucide-react';
import { alumniApi } from '@/api/alumniApi';
import { getAllJobs, Job } from '@/api/jobApi';
import { API_BASE_URL } from '@/api/apiClient';
import { useAuth } from '@/contexts/AuthContext';
import toast from 'react-hot-toast';

const EditProfile = () => {
    const navigate = useNavigate();
    const { isAuthenticated, isAlumni } = useAuth();

    // Redirect if not authenticated or not alumni
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        } else if (!isAlumni) {
            navigate('/');
        }
    }, [isAuthenticated, isAlumni, navigate]);

    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(false);
    const [fetchingData, setFetchingData] = useState(true);
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        course: '',
        startYear: '',
        endYear: '',
        className: '',
        jobId: '',
        instagram: '',
        facebook: '',
        whatsapp: ''
    });

    const [photo, setPhoto] = useState<File | null>(null);

    // Fetch initial data
    useEffect(() => {
        const loadData = async () => {
            setFetchingData(true);
            try {
                // Fetch jobs and profile in parallel
                const [jobsResponse, profileData] = await Promise.all([
                    getAllJobs(),
                    alumniApi.getAlumniCurrentProfile()
                ]);

                setJobs(jobsResponse.data);

                // Populate form with profile data
                if (profileData) {
                    setFormData({
                        name: profileData.name || '',
                        email: profileData.email || '',
                        phone: profileData.phone || '',
                        course: profileData.course || '',
                        startYear: profileData.startYear?.toString() || '',
                        endYear: profileData.endYear?.toString() || '',
                        className: profileData.className || '',
                        jobId: profileData.job?.id?.toString() || '',
                        instagram: profileData.instagram || '',
                        facebook: profileData.facebook || '',
                        whatsapp: profileData.whatsapp || ''
                    });

                    // Set photo preview if available
                    if (profileData.photos && profileData.photos.length > 0) {
                        setPhotoPreview(`${API_BASE_URL}${profileData.photos[0]}`);
                    }
                }
            } catch (error) {
                console.error('Failed to load profile data:', error);
                toast.error('Failed to load profile details');
            } finally {
                setFetchingData(false);
            }
        };

        if (isAuthenticated && isAlumni) {
            loadData();
        }
    }, [isAuthenticated, isAlumni]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setPhoto(file);
            setPhotoPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await alumniApi.updateAlumniProfile({
                ...formData,
                photos: photo // passing the file object if changed, otherwise undefined/null logic in api handles it
            });
            toast.success('Profile updated successfully!');
            // Optionally refresh specific data or just stay on page
        } catch (error: any) {
            console.error('Update failed:', error);
            const errorMessage = error.response?.data?.message || 'Failed to update profile. Please try again.';
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    if (fetchingData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
                    <p className="text-gray-500 font-medium">Loading profile...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-teal-600 to-teal-700 px-8 py-8 text-white">
                        <h2 className="text-3xl font-bold">Edit Profile</h2>
                        <p className="text-teal-100 mt-2">Update your personal and professional information</p>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 space-y-8">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Left Column - Photo & Basic Info */}
                            <div className="lg:col-span-1 space-y-6">
                                {/* Photo Upload */}
                                <div className="flex flex-col items-center">
                                    <div className="relative group">
                                        <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-lg bg-gray-100">
                                            {photoPreview ? (
                                                <img
                                                    src={photoPreview}
                                                    alt="Profile"
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                    <User className="w-20 h-20" />
                                                </div>
                                            )}
                                        </div>
                                        <label
                                            htmlFor="photo-upload"
                                            className="absolute bottom-2 right-2 p-2 bg-teal-600 text-white rounded-full cursor-pointer hover:bg-teal-700 transition-colors shadow-md"
                                        >
                                            <Upload className="w-4 h-4" />
                                        </label>
                                        <input
                                            id="photo-upload"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            className="hidden"
                                        />
                                    </div>
                                    <p className="mt-3 text-sm text-gray-500">Allowed: JPG, PNG, GIF</p>
                                </div>

                                {/* Social Links */}
                                <div className="space-y-4 pt-4 border-t border-gray-100">
                                    <h3 className="font-semibold text-gray-900">Social Media</h3>

                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Instagram className="h-4 w-4 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            name="instagram"
                                            value={formData.instagram}
                                            onChange={handleChange}
                                            placeholder="Instagram URL"
                                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-teal-500 focus:border-teal-500"
                                        />
                                    </div>

                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Facebook className="h-4 w-4 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            name="facebook"
                                            value={formData.facebook}
                                            onChange={handleChange}
                                            placeholder="Facebook URL"
                                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-teal-500 focus:border-teal-500"
                                        />
                                    </div>

                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Phone className="h-4 w-4 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            name="whatsapp"
                                            value={formData.whatsapp}
                                            onChange={handleChange}
                                            placeholder="WhatsApp Number"
                                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-teal-500 focus:border-teal-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Form Fields */}
                            <div className="lg:col-span-2 space-y-6">
                                {/* Personal Info */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 border-b pb-2">
                                        <User className="w-5 h-5 text-teal-600" />
                                        Personal Information
                                    </h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Email (Read-only)</label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    disabled
                                                    className="w-full pl-10 pr-4 py-2 border border-gray-200 bg-gray-50 rounded-lg text-gray-500 cursor-not-allowed"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                            <input
                                                type="text"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Academic Info */}
                                <div className="space-y-4 pt-4">
                                    <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 border-b pb-2">
                                        <GraduationCap className="w-5 h-5 text-teal-600" />
                                        Academic History
                                    </h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
                                            <input
                                                type="text"
                                                name="course"
                                                value={formData.course}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Class Name</label>
                                            <input
                                                type="text"
                                                name="className"
                                                value={formData.className}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Start Year</label>
                                            <input
                                                type="number"
                                                name="startYear"
                                                value={formData.startYear}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">End Year</label>
                                            <input
                                                type="number"
                                                name="endYear"
                                                value={formData.endYear}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Professional Info */}
                                <div className="space-y-4 pt-4">
                                    <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 border-b pb-2">
                                        <Briefcase className="w-5 h-5 text-teal-600" />
                                        Professional Information
                                    </h3>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Current Occupation</label>
                                        <select
                                            name="jobId"
                                            value={formData.jobId}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                                        >
                                            <option value="">Select Occupation</option>
                                            {jobs.map((job) => (
                                                <option key={job.id} value={job.id}>
                                                    {job.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="pt-6 flex gap-4 justify-end border-t border-gray-100">
                                    <button
                                        type="button"
                                        onClick={() => navigate('/')}
                                        className="px-6 py-2 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="flex items-center gap-2 px-6 py-2 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors shadow-lg shadow-teal-200 disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                Saving...
                                            </>
                                        ) : (
                                            <>
                                                <Save className="w-4 h-4" />
                                                Save Changes
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;
