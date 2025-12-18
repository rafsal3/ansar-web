import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Briefcase, ChevronDown, Loader2, User } from 'lucide-react';
import { getAllJobs, Job } from '@/api/jobApi';
import { alumniApi, Alumni } from '@/api/alumniApi';
import { useEffect, useState } from 'react';
import apiClient from '@/api/apiClient';

const OccupationAlumni = () => {
    const { occupation } = useParams<{ occupation: string }>();
    const navigate = useNavigate();
    const location = useLocation();

    const [jobs, setJobs] = useState<Job[]>([]);
    const [selectedJobId, setSelectedJobId] = useState<number | null>(null);
    const [selectedJobName, setSelectedJobName] = useState<string>('');
    const [selectedJobIcon, setSelectedJobIcon] = useState<string>('');
    const [alumni, setAlumni] = useState<Alumni[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [totalCount, setTotalCount] = useState(0);

    // Fetch all jobs on mount
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const jobsResponse = await getAllJobs();
                setJobs(jobsResponse.data);

                // Set initial job from URL parameter
                const jobId = parseInt(occupation || '');
                if (!isNaN(jobId)) {
                    setSelectedJobId(jobId);
                    const job = jobsResponse.data.find(j => j.id === jobId);
                    setSelectedJobName(job?.name || location.state?.jobName || '');
                    setSelectedJobIcon(job?.icon || '');
                }
            } catch (err) {
                console.error('Error fetching jobs:', err);
                setError('Failed to load jobs.');
            }
        };

        fetchJobs();
    }, [occupation, location.state]);

    // Fetch alumni when job changes
    useEffect(() => {
        if (selectedJobId === null) return;

        const fetchAlumni = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await alumniApi.filterAlumni(selectedJobId, 1, 100);
                setAlumni(response.data);
                setTotalCount(response.count);
            } catch (err) {
                console.error('Error fetching alumni:', err);
                setError('Failed to load alumni.');
                setAlumni([]);
                setTotalCount(0);
            } finally {
                setLoading(false);
            }
        };

        fetchAlumni();
    }, [selectedJobId]);

    const handleJobChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const jobId = parseInt(e.target.value);
        const job = jobs.find(j => j.id === jobId);

        if (job) {
            setSelectedJobId(jobId);
            setSelectedJobName(job.name);
            setSelectedJobIcon(job.icon);
            navigate(`/alumni/occupation/${jobId}`, { state: { jobName: job.name } });
        }
    };

    // Get initials for avatar
    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    // Generate random gradient for avatar
    const getAvatarGradient = (index: number) => {
        const gradients = [
            'from-blue-500 to-cyan-500',
            'from-purple-500 to-pink-500',
            'from-green-500 to-teal-500',
            'from-orange-500 to-red-500',
            'from-indigo-500 to-purple-500',
            'from-teal-500 to-emerald-500',
        ];
        return gradients[index % gradients.length];
    };

    // Get full image URL
    const getImageUrl = (photoPath: string) => {
        if (!photoPath) return null;
        if (photoPath.startsWith('http')) return photoPath;
        return `${apiClient.defaults.baseURL}${photoPath}`;
    };

    // Get full icon URL
    const getIconUrl = (iconPath: string) => {
        if (!iconPath) return null;
        if (iconPath.startsWith('http')) return iconPath;
        return `${apiClient.defaults.baseURL}${iconPath}`;
    };

    if (loading && selectedJobId !== null) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-teal-50 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 text-teal-600 animate-spin mx-auto mb-4" />
                    <p className="text-gray-600 font-medium">Loading alumni...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-teal-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                        <button
                            onClick={() => navigate('/occupations')}
                            className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Back to Occupations
                        </button>

                        {/* Occupation Selector */}
                        <div className="relative">
                            <select
                                value={selectedJobId || ''}
                                onChange={handleJobChange}
                                className="appearance-none bg-white border border-gray-200 text-gray-700 py-3 pl-4 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent shadow-sm font-medium cursor-pointer min-w-[200px]"
                            >
                                <option value="">Select Occupation</option>
                                {jobs.map((job) => (
                                    <option key={job.id} value={job.id}>
                                        {job.name}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-4 bg-gradient-to-br from-teal-500 to-blue-500 rounded-2xl overflow-hidden">
                                {selectedJobIcon && getIconUrl(selectedJobIcon) ? (
                                    <img
                                        src={getIconUrl(selectedJobIcon)!}
                                        alt={selectedJobName}
                                        className="w-8 h-8 object-cover"
                                        onError={(e) => {
                                            // Fallback to Briefcase icon if image fails to load
                                            const target = e.target as HTMLImageElement;
                                            target.style.display = 'none';
                                            const parent = target.parentElement;
                                            if (parent) {
                                                const icon = document.createElement('div');
                                                icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-briefcase"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>';
                                                parent.appendChild(icon);
                                            }
                                        }}
                                    />
                                ) : (
                                    <Briefcase className="w-8 h-8 text-white" />
                                )}
                            </div>
                            <div>
                                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                                    {selectedJobName || 'Select an Occupation'}
                                </h1>
                                <p className="text-gray-600 mt-1">
                                    {totalCount} {totalCount === 1 ? 'alumnus' : 'alumni'} found
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Error State */}
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8">
                        <p className="text-red-600 font-medium">{error}</p>
                    </div>
                )}

                {/* Alumni Grid */}
                {!loading && alumni.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {alumni.map((alumnus, index) => {
                            const imageUrl = alumnus.photos && alumnus.photos.length > 0
                                ? getImageUrl(alumnus.photos[0])
                                : null;

                            return (
                                <div
                                    key={alumnus.id}
                                    className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden"
                                >
                                    {/* Card Header with Gradient */}
                                    <div className={`h-24 bg-gradient-to-br ${getAvatarGradient(index)} relative`}>
                                        <div className="absolute -bottom-12 left-6">
                                            {imageUrl ? (
                                                <div className="w-24 h-24 rounded-2xl shadow-xl border-4 border-white overflow-hidden">
                                                    <img
                                                        src={imageUrl}
                                                        alt={alumnus.name}
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => {
                                                            // Fallback to initials if image fails to load
                                                            const target = e.target as HTMLImageElement;
                                                            target.style.display = 'none';
                                                            const parent = target.parentElement;
                                                            if (parent) {
                                                                parent.className = `w-24 h-24 rounded-2xl bg-gradient-to-br ${getAvatarGradient(index)} flex items-center justify-center text-white text-2xl font-bold shadow-xl border-4 border-white`;
                                                                parent.textContent = getInitials(alumnus.name);
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            ) : (
                                                <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${getAvatarGradient(index)} flex items-center justify-center text-white text-2xl font-bold shadow-xl border-4 border-white`}>
                                                    {getInitials(alumnus.name)}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Card Content */}
                                    <div className="pt-16 px-6 pb-6">
                                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                                            {alumnus.name}
                                        </h3>
                                        <p className="text-sm text-teal-600 font-medium mb-3">
                                            {alumnus.job?.name || 'No occupation'}
                                        </p>

                                        {/* Additional Info */}
                                        <div className="space-y-2 text-sm text-gray-600">
                                            {alumnus.course && (
                                                <p className="flex items-center gap-2">
                                                    <span className="font-medium">Course:</span>
                                                    <span>{alumnus.course}</span>
                                                </p>
                                            )}
                                            {alumnus.className && (
                                                <p className="flex items-center gap-2">
                                                    <span className="font-medium">Class:</span>
                                                    <span>{alumnus.className}</span>
                                                </p>
                                            )}
                                            {alumnus.startYear && alumnus.endYear && (
                                                <p className="flex items-center gap-2">
                                                    <span className="font-medium">Batch:</span>
                                                    <span>{alumnus.startYear} - {alumnus.endYear}</span>
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : !loading && selectedJobId !== null ? (
                    <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <User className="w-10 h-10 text-gray-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">No Alumni Found</h3>
                        <p className="text-gray-600 mb-6">
                            No alumni found with the occupation "{selectedJobName}"
                        </p>
                        <button
                            onClick={() => navigate('/occupations')}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 text-white font-medium rounded-xl hover:bg-teal-700 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Back to Occupations
                        </button>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default OccupationAlumni;

