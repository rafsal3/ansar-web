import { useNavigate } from 'react-router-dom';
import { Briefcase, Users, TrendingUp, ArrowLeft } from 'lucide-react';
import { occupationStats } from '@/data/occupations';

const Occupations = () => {
    const navigate = useNavigate();

    const totalAlumni = occupationStats.reduce((sum, stat) => sum + stat.count, 0);

    const handleOccupationClick = (occupation: string) => {
        navigate(`/alumni/occupation/${encodeURIComponent(occupation)}`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-teal-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-12">
                    <button
                        onClick={() => navigate('/')}
                        className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium mb-8 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back to Home
                    </button>

                    <div className="text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-100 text-teal-700 rounded-full text-sm font-semibold mb-4">
                            <Users className="w-4 h-4" />
                            Alumni Network
                        </div>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                            All Occupations
                        </h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Explore our diverse alumni network across various industries and professions
                        </p>

                        {/* Total Alumni Count */}
                        <div className="mt-8 inline-flex items-center gap-3 px-6 py-4 bg-white rounded-2xl shadow-lg border border-gray-100">
                            <div className="p-3 bg-gradient-to-br from-teal-500 to-blue-500 rounded-xl">
                                <TrendingUp className="w-6 h-6 text-white" />
                            </div>
                            <div className="text-left">
                                <p className="text-sm text-gray-600 font-medium">Total Alumni</p>
                                <p className="text-3xl font-bold text-gray-900">{totalAlumni}+</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Occupation Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {occupationStats.map((stat) => (
                        <button
                            key={stat.occupation}
                            onClick={() => handleOccupationClick(stat.occupation)}
                            className="group relative bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden text-left"
                        >
                            {/* Gradient Background on Hover */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                            {/* Content */}
                            <div className="relative z-10 flex flex-col h-full">
                                {/* Icon and Briefcase */}
                                <div className="flex items-start justify-between mb-4">
                                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-3xl shadow-lg transform group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                                        {stat.icon}
                                    </div>
                                    <Briefcase className="w-5 h-5 text-gray-400 group-hover:text-teal-600 transition-colors flex-shrink-0" />
                                </div>

                                {/* Occupation Name */}
                                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors line-clamp-2">
                                    {stat.occupation}
                                </h3>

                                {/* Category */}
                                <p className="text-sm text-gray-500 mb-4">{stat.category}</p>

                                {/* Count */}
                                <div className="flex items-baseline gap-2 mb-4">
                                    <span className="text-4xl font-extrabold text-gray-900 group-hover:text-teal-600 transition-colors">
                                        {stat.count}
                                    </span>
                                    <span className="text-sm text-gray-500 font-medium">alumni</span>
                                </div>

                                {/* Hover Indicator */}
                                <div className="mt-auto pt-2 flex items-center gap-2 text-sm font-semibold text-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <span>View Details</span>
                                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Occupations;
