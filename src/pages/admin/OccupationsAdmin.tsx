import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Briefcase, Image as ImageIcon } from 'lucide-react';
import { createJob, updateJob, deleteJob, getAllJobs, Job } from '../../api/jobApi';
import { API_BASE_URL } from '../../api/apiClient';
import Pagination from '../../components/Pagination';

const OccupationsAdmin = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPrevPage, setHasPrevPage] = useState(false);

    // Form states
    const [name, setName] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editingJob, setEditingJob] = useState<Job | null>(null);

    const fetchJobs = async (page: number = 1) => {
        try {
            setIsLoading(true);
            const response = await getAllJobs(page, 5);
            setJobs(response.data);
            setCurrentPage(response.meta.page);
            setTotalPages(response.meta.totalPages);
            setHasNextPage(response.meta.hasNextPage);
            setHasPrevPage(response.meta.hasPrevPage);
        } catch (error) {
            console.error('Failed to fetch jobs:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs(currentPage);
    }, [currentPage]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name) {
            alert('Please fill in job name');
            return;
        }

        if (!editingJob && !selectedFile) {
            alert('Please select an icon for new job');
            return;
        }

        try {
            setIsSubmitting(true);

            if (editingJob) {
                // Edit existing job
                await updateJob(editingJob.id, name, selectedFile || undefined);
            } else {
                // Create new job
                // Automatically set date to today's date as per requirement
                const today = new Date().toISOString().split('T')[0];
                await createJob(name, selectedFile!, today);
            }

            // Refresh list and reset form
            setCurrentPage(1); // Reset to first page
            await fetchJobs(1);
            handleCloseModal();
        } catch (error) {
            console.error('Failed to save job:', error);
            alert('Failed to save job');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEdit = (job: Job) => {
        setEditingJob(job);
        setName(job.name);
        setSelectedFile(null); // Reset file input
        setIsModalOpen(true);
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this job?')) {
            return;
        }

        try {
            await deleteJob(id);
            await fetchJobs(currentPage);
        } catch (error) {
            console.error('Failed to delete job:', error);
            alert('Failed to delete job');
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingJob(null);
        setName('');
        setSelectedFile(null);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Jobs Management</h1>
                    <p className="text-gray-500 mt-1">Manage jobs and occupations</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    Add Job
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-900">Icon</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-900">Job Name</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-900">Date</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-900 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                                        Loading jobs...
                                    </td>
                                </tr>
                            ) : jobs.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                                        No jobs found
                                    </td>
                                </tr>
                            ) : (
                                jobs.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center">
                                                {item.icon ? (
                                                    <img
                                                        src={`${API_BASE_URL}${item.icon}`}
                                                        alt={item.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <Briefcase className="w-5 h-5 text-gray-400" />
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="font-medium text-gray-900">{item.name}</p>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{item.date}</td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleEdit(item)}
                                                    className="p-2 text-gray-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
                                                    title="Edit"
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(item.id)}
                                                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Delete (Not Implemented)"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    hasNextPage={hasNextPage}
                    hasPrevPage={hasPrevPage}
                />
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            {editingJob ? 'Edit Job' : 'Create Job'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                    Job Name *
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                                    placeholder="e.g., Software Engineer"
                                />
                            </div>

                            <div>
                                <label htmlFor="icon" className="block text-sm font-medium text-gray-700 mb-2">
                                    {editingJob ? 'Icon (Optional)' : 'Icon *'}
                                </label>
                                <div className="relative">
                                    <input
                                        id="icon"
                                        type="file"
                                        accept="image/*"
                                        required={!editingJob}
                                        onChange={(e) => {
                                            if (e.target.files && e.target.files[0]) {
                                                setSelectedFile(e.target.files[0]);
                                            }
                                        }}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
                                    />
                                    <ImageIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                </div>
                                {editingJob && editingJob.icon && !selectedFile && (
                                    <p className="mt-2 text-xs text-gray-500">
                                        Current icon: {editingJob.icon.split('/').pop()}
                                    </p>
                                )}
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex-1 px-4 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? (editingJob ? 'Updating...' : 'Creating...') : (editingJob ? 'Update Job' : 'Create Job')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OccupationsAdmin;
