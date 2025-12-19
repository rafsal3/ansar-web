import { useState, useEffect } from 'react';
import { Search, Image as ImageIcon, Eye, X, Trash2, AlertTriangle } from 'lucide-react';
import { memoryApi, AdminMemory } from '../../api/memoryApi';
import { API_BASE_URL } from '../../api/apiClient';
import Pagination from '../../components/Pagination';

const MemoriesAdmin = () => {
    const [memories, setMemories] = useState<AdminMemory[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [hasNextPage, setHasNextPage] = useState<boolean>(false);
    const [hasPrevPage, setHasPrevPage] = useState<boolean>(false);
    const [selectedMemory, setSelectedMemory] = useState<AdminMemory | null>(null);
    const [confirmationModal, setConfirmationModal] = useState<{
        isOpen: boolean;
        actionType: 'status' | 'delete' | null;
        memoryId: number | null;
        newStatus?: boolean; // Only for status change
        userName?: string;
    }>({
        isOpen: false,
        actionType: null,
        memoryId: null
    });

    useEffect(() => {
        fetchMemories();
    }, [currentPage]);

    const fetchMemories = async () => {
        try {
            setLoading(true);
            const response = await memoryApi.getAdminMemories(currentPage, 5);
            setMemories(response.data);
            setCurrentPage(response.meta.page);
            setTotalPages(response.meta.totalPages);
            setHasNextPage(response.meta.hasNextPage);
            setHasPrevPage(response.meta.hasPrevPage);
            setError(null);
        } catch (err) {
            console.error('Failed to fetch memories:', err);
            setError('Failed to load memories. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleStatusToggle = (id: number, currentStatus: boolean, userName: string) => {
        setConfirmationModal({
            isOpen: true,
            actionType: 'status',
            memoryId: id,
            newStatus: !currentStatus,
            userName
        });
    };

    const handleDeleteClick = (id: number, userName: string) => {
        setConfirmationModal({
            isOpen: true,
            actionType: 'delete',
            memoryId: id,
            userName
        });
    };

    const confirmAction = async () => {
        const { actionType, memoryId, newStatus } = confirmationModal;
        if (!memoryId || !actionType) return;

        try {
            if (actionType === 'status' && newStatus !== undefined) {
                // Optimistic update
                setMemories(memories.map(m =>
                    m.id === memoryId ? { ...m, isApproved: newStatus } : m
                ));
                await memoryApi.updateMemoryStatus(memoryId, newStatus);
            } else if (actionType === 'delete') {
                // Optimistic update
                setMemories(memories.filter(m => m.id !== memoryId));
                await memoryApi.deleteMemory(memoryId);
            }
            setConfirmationModal(prev => ({ ...prev, isOpen: false }));
        } catch (err) {
            console.error(`Failed to ${actionType} memory:`, err);
            // Revert updates if needed - simplified here for brevity, usually would re-fetch or store prev state
            // For now just re-fetch to ensure sync
            fetchMemories();
            alert(`Failed to ${actionType} memory.`);
            setConfirmationModal(prev => ({ ...prev, isOpen: false }));
        }
    };

    const filteredMemories = memories.filter(memory =>
        memory.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        memory.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Memories Management</h1>
                    <p className="text-gray-500 mt-1">Review and moderate alumni memories</p>
                </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search memories..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
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
                                <th className="px-6 py-4 text-sm font-semibold text-gray-900">Author</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-900">Content</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-900">Date</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-900 text-center">Approved</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-900 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                        Loading memories...
                                    </td>
                                </tr>
                            ) : filteredMemories.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                        No memories found.
                                    </td>
                                </tr>
                            ) : (
                                filteredMemories.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="font-medium text-gray-900">{item.user.name}</p>
                                                <p className="text-xs text-gray-500">User ID: {item.user.id}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="max-w-md">
                                                <p className="text-sm text-gray-600 truncate">{item.description}</p>
                                                {item.photos && item.photos.length > 0 && (
                                                    <div className="flex items-center gap-1 mt-1 text-xs text-teal-600">
                                                        <ImageIcon className="w-3 h-3" />
                                                        <span>{item.photos.length} Photo{item.photos.length > 1 ? 's' : ''}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {new Date(item.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    className="sr-only peer"
                                                    checked={item.isApproved}
                                                    onChange={() => handleStatusToggle(item.id, item.isApproved, item.user.name)}
                                                />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                                            </label>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => setSelectedMemory(item)}
                                                    className="p-2 text-gray-500 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
                                                    title="View Details"
                                                >
                                                    <Eye className="w-5 h-5" />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteClick(item.id, item.user.name)}
                                                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Delete Memory"
                                                >
                                                    <Trash2 className="w-5 h-5" />
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

            {/* View Memory Modal */}
            {selectedMemory && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-start sticky top-0 bg-white">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">Memory Details</h2>
                                <p className="text-sm text-gray-500">
                                    Posted by {selectedMemory.user.name} on {new Date(selectedMemory.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                            <button
                                onClick={() => setSelectedMemory(null)}
                                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Author Info */}
                            <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Author</p>
                                    <p className="text-gray-900 font-semibold">{selectedMemory.user.name}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-medium text-gray-500">Status</p>
                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${selectedMemory.isApproved
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-yellow-100 text-yellow-700'
                                        }`}>
                                        {selectedMemory.isApproved ? 'Approved' : 'Pending'}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div>
                                <h3 className="text-sm font-medium text-gray-900 mb-2">Description</h3>
                                <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                                    {selectedMemory.description}
                                </p>
                            </div>

                            {/* Photos */}
                            {selectedMemory.photos && selectedMemory.photos.length > 0 && (
                                <div>
                                    <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
                                        <ImageIcon className="w-4 h-4" />
                                        Photos ({selectedMemory.photos.length})
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        {selectedMemory.photos.map((photo) => (
                                            <div key={photo.id} className="relative rounded-lg overflow-hidden bg-gray-100 aspect-video group">
                                                <img
                                                    src={photo.url.startsWith('http') ? photo.url : `${API_BASE_URL}/uploads/${photo.url.startsWith('/') ? photo.url.slice(1) : photo.url}`}
                                                    alt="Memory attachment"
                                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).style.display = 'none';
                                                    }}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="p-6 border-t border-gray-100 bg-gray-50 rounded-b-2xl flex justify-end gap-3">
                            <button
                                onClick={() => setSelectedMemory(null)}
                                className="px-4 py-2 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Close
                            </button>
                            <button
                                onClick={() => {
                                    // Close detail modal, open confirmation modal
                                    setSelectedMemory(null);
                                    handleStatusToggle(selectedMemory.id, selectedMemory.isApproved, selectedMemory.user.name);
                                }}
                                className={`px-4 py-2 font-medium rounded-lg text-white transition-colors ${selectedMemory.isApproved
                                    ? 'bg-yellow-500 hover:bg-yellow-600'
                                    : 'bg-teal-600 hover:bg-teal-700'
                                    }`}
                            >
                                {selectedMemory.isApproved ? 'Revoke Approval' : 'Approve Memory'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Confirmation Modal */}
            {confirmationModal.isOpen && (
                <div className="fixed inset-0 z-[60] overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
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
                                    <div className={`mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full sm:mx-0 sm:h-10 sm:w-10 ${confirmationModal.actionType === 'delete' ? 'bg-red-100' : 'bg-yellow-100'
                                        }`}>
                                        <AlertTriangle className={`h-6 w-6 ${confirmationModal.actionType === 'delete' ? 'text-red-600' : 'text-yellow-600'
                                            }`} aria-hidden="true" />
                                    </div>
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                            {confirmationModal.actionType === 'delete'
                                                ? 'Delete Memory'
                                                : (confirmationModal.newStatus ? 'Approve Memory' : 'Revoke Approval')}
                                        </h3>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                {confirmationModal.actionType === 'delete'
                                                    ? `Are you sure you want to delete this memory by ${confirmationModal.userName}? This action cannot be undone.`
                                                    : `Are you sure you want to ${confirmationModal.newStatus ? 'approve' : 'revoke the approval for'} this memory by ${confirmationModal.userName}?`
                                                }
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm ${confirmationModal.actionType === 'delete'
                                        ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
                                        : (confirmationModal.newStatus ? 'bg-teal-600 hover:bg-teal-700 focus:ring-teal-500' : 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500')
                                        }`}
                                    onClick={confirmAction}
                                >
                                    {confirmationModal.actionType === 'delete'
                                        ? 'Delete'
                                        : (confirmationModal.newStatus ? 'Approve' : 'Revoke')}
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
            )}
        </div>
    );
};

export default MemoriesAdmin;
