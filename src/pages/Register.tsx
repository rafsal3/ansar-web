import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Lock, Mail, Phone, Calendar, GraduationCap, ArrowRight, Briefcase, Upload, Loader2, BookOpen } from 'lucide-react';
import { alumniApi } from '../api/alumniApi';
import { getAllJobs, Job } from '../api/jobApi';
import toast from 'react-hot-toast';

const Register = () => {
    const navigate = useNavigate();
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(false);
    const [fetchingJobs, setFetchingJobs] = useState(true);
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
        password: '',
        confirmPassword: ''
    });

    const [photo, setPhoto] = useState<File | null>(null);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await getAllJobs();
                setJobs(response.data);
            } catch (error) {
                console.error('Failed to fetch jobs:', error);
                toast.error('Failed to load occupations');
            } finally {
                setFetchingJobs(false);
            }
        };

        fetchJobs();
    }, []);

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

        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match!');
            return;
        }

        if (!photo) {
            toast.error('Please upload a profile photo');
            return;
        }

        setLoading(true);

        try {
            await alumniApi.register({
                ...formData,
                photos: photo
            });
            toast.success('Registration successful! Please login.');
            navigate('/login');
        } catch (error: any) {
            console.error('Registration failed:', error);
            const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                {/* Logo/Header */}
                <div className="text-center mb-8">
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-2">Alumni Registration</h2>
                    <p className="text-gray-600">Join the Ansar Higher Secondary School Alumni Network</p>
                </div>

                {/* Registration Card */}
                <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Personal Information Section */}
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2 border-b pb-2">
                                <User className="w-5 h-5 text-teal-600" />
                                Personal Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Profile Photo Upload */}
                                <div className="md:col-span-2 flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer relative bg-gray-50">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                    {photoPreview ? (
                                        <div className="text-center">
                                            <img
                                                src={photoPreview}
                                                alt="Preview"
                                                className="h-32 w-32 object-cover rounded-full mx-auto border-4 border-white shadow-md"
                                            />
                                            <p className="text-sm text-teal-600 mt-2 font-medium">Click to change photo</p>
                                        </div>
                                    ) : (
                                        <div className="text-center py-4">
                                            <div className="mx-auto h-12 w-12 text-gray-400 flex items-center justify-center rounded-full bg-white shadow-sm mb-2">
                                                <Upload className="h-6 w-6" />
                                            </div>
                                            <p className="text-sm font-medium text-gray-900">Upload Profile Photo</p>
                                            <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 5MB</p>
                                        </div>
                                    )}
                                </div>

                                {/* Full Name */}
                                <div className="md:col-span-2">
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                        Full Name *
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <User className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                                            placeholder="John Doe"
                                        />
                                    </div>
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
                                            placeholder="1234567890"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Academic Information Section */}
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2 border-b pb-2">
                                <GraduationCap className="w-5 h-5 text-teal-600" />
                                Academic Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Course */}
                                <div className="md:col-span-2">
                                    <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-2">
                                        Course *
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <BookOpen className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            id="course"
                                            name="course"
                                            type="text"
                                            required
                                            value={formData.course}
                                            onChange={handleChange}
                                            className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                                            placeholder="e.g. Computer Science, Science (PCMB)"
                                        />
                                    </div>
                                </div>

                                {/* Class Name */}
                                <div className="md:col-span-2">
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
                                        placeholder="e.g. 12 A, Final Year MSc"
                                    />
                                </div>

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
                                            type="text"
                                            required
                                            value={formData.startYear}
                                            onChange={handleChange}
                                            className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                                            placeholder="e.g. 2021"
                                        />
                                    </div>
                                </div>

                                {/* End Year */}
                                <div>
                                    <label htmlFor="endYear" className="block text-sm font-medium text-gray-700 mb-2">
                                        End Year (Graduation) *
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Calendar className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            id="endYear"
                                            name="endYear"
                                            type="text"
                                            required
                                            value={formData.endYear}
                                            onChange={handleChange}
                                            className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                                            placeholder="e.g. 2023"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Professional Information */}
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2 border-b pb-2">
                                <Briefcase className="w-5 h-5 text-teal-600" />
                                Professional Information
                            </h3>
                            <div>
                                <label htmlFor="jobId" className="block text-sm font-medium text-gray-700 mb-2">
                                    Current Occupation *
                                </label>
                                <select
                                    id="jobId"
                                    name="jobId"
                                    required
                                    value={formData.jobId}
                                    onChange={handleChange}
                                    disabled={fetchingJobs}
                                    className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all disabled:bg-gray-100"
                                >
                                    <option value="">
                                        {fetchingJobs ? 'Loading occupations...' : 'Select Occupation'}
                                    </option>
                                    {jobs.map((job) => (
                                        <option key={job.id} value={job.id}>
                                            {job.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Password Section */}
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2 border-b pb-2">
                                <Lock className="w-5 h-5 text-teal-600" />
                                Security
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Password */}
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                        Password *
                                    </label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                                        placeholder="••••••••"
                                        minLength={6}
                                    />
                                </div>

                                {/* Confirm Password */}
                                <div>
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                        Confirm Password *
                                    </label>
                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        required
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                                        placeholder="••••••••"
                                        minLength={6}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Terms and Conditions */}
                        <div className="flex items-start">
                            <input
                                id="terms"
                                name="terms"
                                type="checkbox"
                                required
                                className="h-4 w-4 mt-1 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                            />
                            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                                I agree to the{' '}
                                <a href="#" className="text-teal-600 hover:text-teal-700 font-medium">
                                    Terms and Conditions
                                </a>{' '}
                                and{' '}
                                <a href="#" className="text-teal-600 hover:text-teal-700 font-medium">
                                    Privacy Policy
                                </a>
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-xl transition-colors shadow-lg shadow-teal-200 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Registering...
                                </>
                            ) : (
                                <>
                                    Register
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Login Link */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Already have an account?{' '}
                            <Link to="/login" className="font-medium text-teal-600 hover:text-teal-700">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Back to Home */}
                <div className="mt-6 text-center">
                    <Link to="/" className="text-sm text-gray-600 hover:text-gray-900">
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
