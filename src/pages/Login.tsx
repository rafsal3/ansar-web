import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [userType, setUserType] = useState<'alumni' | 'admin'>('alumni');
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const success = await login(formData.email, formData.password, userType);
            if (success) {
                if (userType === 'admin') {
                    navigate('/admin');
                } else {
                    navigate('/');
                }
            }
        } catch (err: any) {
            // Extract error message from the API response
            let errorMessage = 'An error occurred during login. Please try again.';

            if (err?.response?.data?.message) {
                errorMessage = err.response.data.message;
            } else if (err?.message) {
                errorMessage = err.message;
            }

            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-indigo-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full">
                {/* Logo/Header */}
                <div className="text-center mb-8">
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-2">Welcome Back</h2>
                    <p className="text-gray-600">Sign in to access your account</p>
                </div>

                {/* Login Card */}
                <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                    {/* User Type Selector */}
                    <div className="flex gap-2 mb-8 p-1 bg-gray-100 rounded-full">
                        <button
                            type="button"
                            onClick={() => setUserType('alumni')}
                            className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all ${userType === 'alumni'
                                ? 'bg-teal-600 text-white shadow-sm'
                                : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            Alumni
                        </button>
                        <button
                            type="button"
                            onClick={() => setUserType('admin')}
                            className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all ${userType === 'admin'
                                ? 'bg-teal-600 text-white shadow-sm'
                                : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            Admin
                        </button>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
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

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                                    Remember me
                                </label>
                            </div>
                            <a href="#" className="text-sm font-medium text-teal-600 hover:text-teal-700">
                                Forgot password?
                            </a>
                        </div>

                        {/* Error/Warning Message */}
                        {error && (
                            <div className={`p-4 rounded-xl border ${error.toLowerCase().includes('not yet approved') || error.toLowerCase().includes('not approved')
                                    ? 'bg-amber-50 border-amber-200'
                                    : 'bg-red-50 border-red-200'
                                }`}>
                                <p className={`text-sm text-center font-medium ${error.toLowerCase().includes('not yet approved') || error.toLowerCase().includes('not approved')
                                        ? 'text-amber-800'
                                        : 'text-red-600'
                                    }`}>
                                    {error}
                                </p>
                                {(error.toLowerCase().includes('not yet approved') || error.toLowerCase().includes('not approved')) && (
                                    <p className="text-xs text-amber-600 text-center mt-2">
                                        Your account is pending approval. Please contact the administrator for assistance.
                                    </p>
                                )}
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-xl transition-colors shadow-lg shadow-teal-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Signing In...' : 'Sign In'}
                            {!loading && <ArrowRight className="w-5 h-5" />}
                        </button>
                    </form>

                    {/* Register Link - Only for Alumni */}
                    {userType === 'alumni' && (
                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-600">
                                Not registered yet?{' '}
                                <Link to="/register" className="font-medium text-teal-600 hover:text-teal-700">
                                    Register as Alumni
                                </Link>
                            </p>
                        </div>
                    )}
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

export default Login;
