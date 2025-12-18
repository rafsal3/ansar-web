import { useNavigate } from 'react-router-dom';
import { Briefcase, Users, TrendingUp, Loader2 } from 'lucide-react';
import { getAllJobs, Job } from '@/api/jobApi';
import { alumniApi } from '@/api/alumniApi';
import { useEffect, useState } from 'react';
import { API_BASE_URL } from '@/api/apiClient';

interface JobWithCount extends Job {
    count: number;
}

const AlumniByOccupation = () => {
    const navigate = useNavigate();
    const [jobs, setJobs] = useState<JobWithCount[]>([]);
    const [loading, setLoading] = useState(true);
    const [totalAlumni, setTotalAlumni] = useState(0);

    useEffect(() => {
        const fetchJobsWithCounts = async () => {
            try {
                setLoading(true);

                // Fetch first 4 jobs using limit parameter
                const jobsResponse = await getAllJobs();
                const firstFourJobs = jobsResponse.data.slice(0, 4);

                // Fetch alumni count for each job
                const jobsWithCounts = await Promise.all(
                    firstFourJobs.map(async (job) => {
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

                // Calculate total alumni count
                const total = jobsWithCounts.reduce((sum, job) => sum + job.count, 0);
                setTotalAlumni(total);
            } catch (err) {
                console.error('Error fetching jobs:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchJobsWithCounts();
    }, []);

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
        ];
        return gradients[index % gradients.length];
    };

    // Get full icon URL
    const getIconUrl = (iconPath: string) => {
        if (!iconPath) return null;
        if (iconPath.startsWith('http')) return iconPath;
        return `${API_BASE_URL}${iconPath}`;
    };

    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-blue-50 to-teal-50">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-100 text-teal-700 rounded-full text-sm font-semibold mb-4">
                        <Users className="w-4 h-4" />
                        Alumni Network
                    </div>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                        Our Alumni by Occupation
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Discover where our alumni are making an impact across various industries and professions
                    </p>

                    {/* Total Alumni Count */}
                    <div className="mt-8 inline-flex items-center gap-3 px-6 py-4 bg-white rounded-2xl shadow-lg border border-gray-100">
                        <div className="p-3 bg-gradient-to-br from-teal-500 to-blue-500 rounded-xl">
                            <TrendingUp className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-left">
                            <p className="text-sm text-gray-600 font-medium">Total Alumni</p>
                            <p className="text-3xl font-bold text-gray-900">
                                {loading ? (
                                    <Loader2 className="w-8 h-8 animate-spin inline-block" />
                                ) : (
                                    `${totalAlumni}+`
                                )}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Occupation Cards Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div
                                key={i}
                                className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 animate-pulse"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-16 h-16 rounded-xl bg-gray-200"></div>
                                    <div className="w-5 h-5 bg-gray-200 rounded"></div>
                                </div>
                                <div className="h-6 bg-gray-200 rounded mb-2 w-3/4"></div>
                                <div className="h-4 bg-gray-200 rounded mb-4 w-1/2"></div>
                                <div className="h-10 bg-gray-200 rounded w-1/3"></div>
                            </div>
                        ))}
                    </div>
                ) : jobs.length > 0 ? (
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
                                        <h3 className="text-lg font-bold text-gray-900 mb-4 group-hover:text-teal-600 transition-colors line-clamp-2">
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
                    <div className="text-center py-12">
                        <p className="text-gray-500">No occupations available at the moment.</p>
                    </div>
                )}

                {/* View All Link */}
                <div className="text-center mt-12">
                    <button
                        onClick={() => navigate('/occupations')}
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-teal-600 to-blue-600 text-white font-semibold rounded-xl hover:from-teal-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                        <Users className="w-5 h-5" />
                        View All Occupations
                    </button>
                </div>
            </div>
        </section>
    );
};

export default AlumniByOccupation;

