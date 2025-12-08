import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Lock, Mail, Phone, Calendar, GraduationCap, ArrowRight, Loader2, Upload } from 'lucide-react';
import { createAlumni, getAllJobs, type Job } from '@/api';

const Register = () => {
    const navigate = useNavigate();
    const [jobs, setJobs] = useState<Job[]>([]);
    const [photo, setPhoto] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        startYear: '',
        endYear: '',
        course: '',
        className: '',
        jobId: '',
        password: '',
        confirmPassword: ''
    });

    // Fetch jobs/occupations on mount
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const data = await getAllJobs();
                setJobs(data);
            } catch (err) {
                console.error('Error fetching jobs:', err);
            }
        };
        fetchJobs();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Validate passwords match
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match!');
            return;
        }

        setLoading(true);

        try {
            // Create FormData for file upload
            const data = new FormData();
            data.append('name', formData.fullName);
            data.append('email', formData.email);
            data.append('phone', formData.phone);
            data.append('course', formData.course);
            data.append('startYear', formData.startYear);
            data.append('endYear', formData.endYear);
            data.append('className', formData.className);
            data.append('password', formData.password);
            data.append('confirmPassword', formData.confirmPassword);
            data.append('jobId', formData.jobId);

            if (photo) {
                data.append('photos', photo);
            }

            await createAlumni(data);

            setSuccess('Registration successful! Redirecting to login...');

            // Reset form
            setFormData({
                fullName: '',
                email: '',
                phone: '',
                startYear: '',
                endYear: '',
                course: '',
                className: '',
                jobId: '',
                password: '',
                confirmPassword: ''
            });
            setPhoto(null);

            // Redirect to login after 2 seconds
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (err: any) {
            console.error('Registration error:', err);
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setPhoto(e.target.files[0]);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                {/* Logo/Header */}
                <div className="text-center mb-8">
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-2">Alumni Registration</h2>
                    <p className="text-gray-600">Join the Ansar Higher Secondary School Alumni Network</p>
                </div>

                {/* Registration Card */}
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
                                            max="2024"
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
                                            max="2024"
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
                                        placeholder="e.g., Computer Science, Commerce"
                                    />
                                </div>

                                {/* Class Name */}
                                <div>
                                    <label htmlFor="className" className="block text-sm font-medium text-gray-700 mb-2">
                                        Class *
                                    </label>
                                    <input
                                        id="className"
                                        name="className"
                                        type="text"
                                        required
                                        value={formData.className}
                                        onChange={handleChange}
                                        className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                                        placeholder="e.g., 12 A, 10 B"
                                    />
                                </div>

                                {/* Occupation/Job */}
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
                                        className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                                    >
                                        <option value="">Select Occupation</option>
                                        {jobs.map((job) => (
                                            <option key={job.id} value={job.id}>
                                                {job.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Photo Upload */}
                                <div className="md:col-span-2">
                                    <label htmlFor="photo" className="block text-sm font-medium text-gray-700 mb-2">
                                        Profile Photo
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Upload className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            id="photo"
                                            name="photo"
                                            type="file"
                                            accept="image/*"
                                            onChange={handlePhotoChange}
                                            className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                                        />
                                    </div>
                                    {photo && (
                                        <p className="mt-2 text-sm text-gray-600">
                                            Selected: {photo.name}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Password Section */}
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Lock className="w-5 h-5 text-teal-600" />
                                Create Password
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
                                        minLength={8}
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
                                        minLength={8}
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

                        {/* Error Message */}
                        {error && (
                            <div className="p-3 bg-red-50 border border-red-200 rounded-xl">
                                <p className="text-sm text-red-600 text-center">{error}</p>
                            </div>
                        )}

                        {/* Success Message */}
                        {success && (
                            <div className="p-3 bg-green-50 border border-green-200 rounded-xl">
                                <p className="text-sm text-green-600 text-center">{success}</p>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-xl transition-colors shadow-lg shadow-teal-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
