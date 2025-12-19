import { useState, useEffect } from 'react';
import { Phone, Mail, Instagram, Facebook, MessageCircle, Briefcase, AlertTriangle, X, Eye } from 'lucide-react';
import { API_BASE_URL } from '../../api/apiClient';
import { alumniApi, Alumni, AlumniPagination } from '../../api/alumniApi';
import ViewAlumniModal from '../../components/admin/ViewAlumniModal';
import Pagination from '../../components/Pagination';

const AlumniAdmin = () => {
    const [alumni, setAlumni] = useState<Alumni[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [pagination, setPagination] = useState<AlumniPagination | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [confirmationModal, setConfirmationModal] = useState<{
        isOpen: boolean;
        alumniId: number | null;
        newStatus: boolean;
        alumniName: string;
    }>({
        isOpen: false,
        alumniId: null,
        newStatus: false,
        alumniName: '',
    });
    const [viewModal, setViewModal] = useState<{
        isOpen: boolean;
        alumniId: number | null;
    }>({
        isOpen: false,
        alumniId: null,
    });

    const fetchAlumni = async (page: number) => {
        try {
            setLoading(true);
            const response = await alumniApi.getAllAlumniAdmin(page, 5);
            setAlumni(response.data);
            setPagination(response.pagination);
            setError(null);
        } catch (err) {
            setError('Failed to fetch alumni data');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAlumni(currentPage);
    }, [currentPage]);

    const getPhotoUrl = (photos: string[]) => {
        if (photos && photos.length > 0) {
            return `${API_BASE_URL}${photos[0]}`;
        }
        return null; // or a placeholder
    };

    const handleStatusChange = (id: number, currentStatus: boolean, name: string) => {
        setConfirmationModal({
            isOpen: true,
            alumniId: id,
            newStatus: !currentStatus,
            alumniName: name,
        });
    };

    const confirmStatusChange = async () => {
        if (confirmationModal.alumniId === null) return;

        const id = confirmationModal.alumniId;
        const newStatus = confirmationModal.newStatus;

        try {
            // Optimistic update
            setAlumni(prev => prev.map(item =>
                item.id === id ? { ...item, isActive: newStatus } : item
            ));

            await alumniApi.updateStatus(id, newStatus);

            // Close modal
            setConfirmationModal(prev => ({ ...prev, isOpen: false }));
        } catch (err) {
            console.error('Failed to update status', err);
            // Revert optimistic update
            setAlumni(prev => prev.map(item =>
                item.id === id ? { ...item, isActive: !newStatus } : item
            ));
            // Show error in modal or toast
            setError('Failed to update status. Please try again.');
            setConfirmationModal(prev => ({ ...prev, isOpen: false }));
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Registered Alumni</h1>
                    <p className="text-gray-500 mt-1">View and manage all registered alumni</p>
                </div>
            </div>

            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg">
                    {error}
                </div>
            )}

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-900">Profile</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-900">Education</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-900">Job</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-900">Contact</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-900">Socials</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-900">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                        Loading alumni data...
                                    </td>
                                </tr>
                            ) : alumni.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                        No alumni found
                                    </td>
                                </tr>
                            ) : (
                                alumni.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center border border-gray-200">
                                                    {item.photos && item.photos.length > 0 ? (
                                                        <img
                                                            src={getPhotoUrl(item.photos)!}
                                                            alt={item.name}
                                                            className="w-full h-full object-cover"
                                                            onError={(e) => {
                                                                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/40';
                                                                (e.target as HTMLImageElement).style.display = 'none';
                                                                (e.target as HTMLImageElement).parentElement!.innerText = item.name.charAt(0);
                                                            }}
                                                        />
                                                    ) : (
                                                        <span className="text-gray-500 font-medium">{item.name.charAt(0)}</span>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900">{item.name}</p>
                                                    <p className="text-xs text-gray-500">ID: {item.id}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium text-gray-900">{item.course}</span>
                                                <span className="text-xs text-gray-500">{item.className}</span>
                                                <span className="text-xs text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full inline-block mt-1 w-fit">
                                                    {item.startYear} - {item.endYear}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.job ? (
                                                <div className="flex items-center gap-2 text-sm text-gray-700">
                                                    <Briefcase className="w-4 h-4 text-gray-400" />
                                                    {item.job.name}
                                                </div>
                                            ) : (
                                                <span className="text-sm text-gray-400 italic">Not specified</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    <Mail className="w-3.5 h-3.5" />
                                                    {item.email}
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    <Phone className="w-3.5 h-3.5" />
                                                    {item.phone}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                {item.instagram && (
                                                    <a href={item.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-700">
                                                        <Instagram className="w-4 h-4" />
                                                    </a>
                                                )}
                                                {item.facebook && (
                                                    <a href={item.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">
                                                        <Facebook className="w-4 h-4" />
                                                    </a>
                                                )}
                                                {item.whatsapp && (
                                                    <a href={`https://wa.me/${item.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700">
                                                        <MessageCircle className="w-4 h-4" />
                                                    </a>
                                                )}
                                                {!item.instagram && !item.facebook && !item.whatsapp && (
                                                    <span className="text-xs text-gray-400">-</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => handleStatusChange(item.id, item.isActive ?? false, item.name)}
                                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 ${item.isActive ? 'bg-teal-600' : 'bg-gray-200'
                                                    }`}
                                            >
                                                <span
                                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${item.isActive ? 'translate-x-6' : 'translate-x-1'
                                                        }`}
                                                />
                                            </button>
                                            <button
                                                onClick={() => setViewModal({ isOpen: true, alumniId: item.id })}
                                                className="p-2 text-teal-600 hover:bg-teal-50 rounded-full transition-colors ml-2"
                                                title="View Details"
                                            >
                                                <Eye className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {pagination && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={pagination.totalPages}
                        onPageChange={setCurrentPage}
                        hasNextPage={pagination.hasNextPage}
                        hasPrevPage={pagination.hasPrevPage}
                    />
                )}
            </div>

            {/* Confirmation Modal */}
            {
                confirmationModal.isOpen && (

                    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                            {/* Background overlay */}
                            <div
                                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                                aria-hidden="true"
                                onClick={() => setConfirmationModal(prev => ({ ...prev, isOpen: false }))}
                            ></div>

                            {/* Modal panel */}
                            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 sm:mx-0 sm:h-10 sm:w-10">
                                            <AlertTriangle className="h-6 w-6 text-yellow-600" aria-hidden="true" />
                                        </div>
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                            <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                                {confirmationModal.newStatus ? 'Approve Alumni Account' : 'Deactivate Alumni Account'}
                                            </h3>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">
                                                    Are you sure you want to {confirmationModal.newStatus ? 'approve' : 'deactivate'} the account for <strong>{confirmationModal.alumniName}</strong>?
                                                    {confirmationModal.newStatus
                                                        ? ' This will verify their account and allow full access to the platform.'
                                                        : ' This will restrict their access to the platform.'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <button
                                        type="button"
                                        className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm ${confirmationModal.newStatus ? 'bg-teal-600 hover:bg-teal-700 focus:ring-teal-500' : 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
                                            }`}
                                        onClick={confirmStatusChange}
                                    >
                                        {confirmationModal.newStatus ? 'Approve' : 'Deactivate'}
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={() => setConfirmationModal(prev => ({ ...prev, isOpen: false }))}
                                    >
                                        Cancel
                                    </button>
                                </div>
                                <button
                                    onClick={() => setConfirmationModal(prev => ({ ...prev, isOpen: false }))}
                                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }

            <ViewAlumniModal
                isOpen={viewModal.isOpen}
                onClose={() => setViewModal({ isOpen: false, alumniId: null })}
                alumniId={viewModal.alumniId}
            />
        </div >
    );
};

export default AlumniAdmin;
