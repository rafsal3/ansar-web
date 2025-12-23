import { useNavigate } from 'react-router-dom';
import { Briefcase, Users, TrendingUp, ArrowLeft, Loader2 } from 'lucide-react';
import { getAllJobs, Job } from '@/api/jobApi';
import { alumniApi } from '@/api/alumniApi';
import { useEffect, useState } from 'react';
import { API_BASE_URL } from '@/api/apiClient';

interface JobWithCount extends Job {
    count: number;
}

const Occupations = () => {
    const navigate = useNavigate();
    const [jobs, setJobs] = useState<JobWithCount[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchJobsWithCounts = async () => {
            try {
                setLoading(true);
                setError(null);

                // Fetch all jobs
                const jobsResponse = await getAllJobs();

                // Fetch alumni count for each job
                const jobsWithCounts = await Promise.all(
                    jobsResponse.data.map(async (job) => {
                        try {
                            const alumniResponse = await alumniApi.filterAlumni(job.id, 1, 1);
                            return {
                                ...job,
                                count: alumniResponse.count || 0
                            };
                        } catch (err) {
                            console.error(`Error fetching count for job ${job.id}:`, err);
                            return {
                                ...job,
                                count: 0
                            };
                        }
                    })
                );

                setJobs(jobsWithCounts);
            } catch (err) {
                console.error('Error fetching jobs:', err);
                setError('Failed to load occupations. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchJobsWithCounts();
    }, []);

    const totalAlumni = jobs.reduce((sum, job) => sum + job.count, 0);

    const handleOccupationClick = (jobId: number, jobName: string) => {
        navigate(`/alumni/occupation/${jobId}`, { state: { jobName } });
    };

    // Generate random gradient for each job
    const getGradient = (index: number) => {
        const gradients = [
            'from-blue-500 to-cyan-500',
            'from-purple-500 to-pink-500',
            'from-green-500 to-teal-500',
            'from-orange-500 to-red-500',
            'from-indigo-500 to-purple-500',
            'from-teal-500 to-emerald-500',
            'from-rose-500 to-pink-500',
            'from-amber-500 to-orange-500',
        ];
        return gradients[index % gradients.length];
    };

    // Get full icon URL
    const getIconUrl = (iconPath: string) => {
        if (!iconPath) return null;
        if (iconPath.startsWith('http')) return iconPath;
        return `${API_BASE_URL}${iconPath}`;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-teal-50 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 text-teal-600 animate-spin mx-auto mb-4" />
                    <p className="text-gray-600 font-medium">Loading occupations...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-teal-50 flex items-center justify-center px-4">
                <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Briefcase className="w-8 h-8 text-red-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Occupations</h3>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-3 bg-teal-600 text-white font-medium rounded-xl hover:bg-teal-700 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

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

                {/* Alumni Network Description */}
                <div className="mb-12 bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-10">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Alumni Network</h2>

                    <div className="space-y-4 text-gray-600 leading-relaxed">
                        <p>
                            Our alumni are a testament to the excellence and vision nurtured on campus. From their humble beginnings in classrooms and labs, they have grown into global leaders, innovators, and changemakers across diverse fields. Always connected to their alma mater, they guide and inspire current students through mentorship, share industry insights, and contribute to building a thriving professional network.
                        </p>
                        <p>
                            Each success story reflects the spirit of learning, ambition, and achievement that defines our college, making our alumni a source of pride and inspiration for generations to come.
                        </p>
                        <p className="pt-2 border-t border-gray-200">
                            We conduct annual meets, reunions, and networking events to celebrate achievements and stay connected.
                        </p>
                    </div>
                </div>

                {/* Occupation Cards Grid */}
                {jobs.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {jobs.map((job, index) => {
                            const iconUrl = getIconUrl(job.icon);

                            return (
                                <button
                                    key={job.id}
                                    onClick={() => handleOccupationClick(job.id, job.name)}
                                    className="group relative bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden text-left"
                                >
                                    {/* Gradient Background on Hover */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${getGradient(index)} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                                    {/* Content */}
                                    <div className="relative z-10 flex flex-col h-full">
                                        {/* Icon and Briefcase */}
                                        <div className="flex items-start justify-between mb-4">
                                            <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${getGradient(index)} flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300 flex-shrink-0 overflow-hidden`}>
                                                {iconUrl ? (
                                                    <img
                                                        src={iconUrl}
                                                        alt={job.name}
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => {
                                                            // Fallback to Briefcase icon if image fails to load
                                                            const target = e.target as HTMLImageElement;
                                                            target.style.display = 'none';
                                                            const parent = target.parentElement;
                                                            if (parent) {
                                                                const icon = document.createElement('div');
                                                                icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>';
                                                                parent.appendChild(icon);
                                                            }
                                                        }}
                                                    />
                                                ) : (
                                                    <Briefcase className="w-8 h-8 text-white" />
                                                )}
                                            </div>
                                            <Briefcase className="w-5 h-5 text-gray-400 group-hover:text-teal-600 transition-colors flex-shrink-0" />
                                        </div>

                                        {/* Occupation Name */}
                                        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors line-clamp-2">
                                            {job.name}
                                        </h3>

                                        {/* Count */}
                                        <div className="flex items-baseline gap-2 mb-4">
                                            <span className="text-4xl font-extrabold text-gray-900 group-hover:text-teal-600 transition-colors">
                                                {job.count}
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
                            );
                        })}
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Briefcase className="w-10 h-10 text-gray-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">No Occupations Found</h3>
                        <p className="text-gray-600">
                            No occupations are currently available.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Occupations;

