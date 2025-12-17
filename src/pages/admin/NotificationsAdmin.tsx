import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Search, X, Upload, FileText, Bell } from 'lucide-react';
import {
    getAllNotifications,
    Notification,
    createNotification,
    updateNotification,
    deleteNotification,
    CreateNotificationPayload
} from '../../api/notificationApi';
import { API_BASE_URL } from '../../api/apiClient';

const NotificationsAdmin = () => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingNotification, setEditingNotification] = useState<Notification | null>(null);
    const [previewFile, setPreviewFile] = useState<string | null>(null);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);

    // Search state
    const [searchQuery, setSearchQuery] = useState('');
    const [audianceFilter, setAudianceFilter] = useState('');

    // Form States
    const [formData, setFormData] = useState<Partial<CreateNotificationPayload>>({
        title: '',
        message: '',
        audiance: 'students',
    });

    const [submitting, setSubmitting] = useState(false);

    // Fetch notifications on component mount
    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            setLoading(true);
            const response = await getAllNotifications();
            setNotifications(response.data);
            setError(null);
        } catch (err) {
            console.error('Failed to fetch notifications:', err);
            setError('Failed to load notifications. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (notification?: Notification) => {
        if (notification) {
            setEditingNotification(notification);
            setFormData({
                title: notification.title,
                message: notification.message,
                audiance: notification.audiance,
            });
            // Set preview file from existing notification
            if (notification.files) {
                setPreviewFile(`${API_BASE_URL}${notification.files}`);
            }
            setUploadedFile(null);
        } else {
            setEditingNotification(null);
            setFormData({
                title: '',
                message: '',
                audiance: 'students',
            });
            setPreviewFile(null);
            setUploadedFile(null);
        }
        setIsModalOpen(true);
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setUploadedFile(file);
            setPreviewFile(URL.createObjectURL(file));
        }
    };

    const removeFile = () => {
        setPreviewFile(null);
        setUploadedFile(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (submitting) return;

        try {
            setSubmitting(true);
            const payload: CreateNotificationPayload = {
                title: formData.title!,
                message: formData.message!,
                audiance: formData.audiance!,
                file: uploadedFile || undefined,
            };

            console.log('Submitting notification with payload:', {
                ...payload,
                file: payload.file ? { name: payload.file.name, size: payload.file.size, type: payload.file.type } : undefined
            });

            if (editingNotification) {
                const result = await updateNotification(editingNotification.id, payload);
                console.log('Update result:', result);
            } else {
                const result = await createNotification(payload);
                console.log('Create result:', result);
            }

            await fetchNotifications(); // Refresh the list
            setIsModalOpen(false);
        } catch (err: any) {
            console.error('Failed to save notification:', err);
            const errorMessage = err.response?.data?.message || err.message || 'Failed to save notification. Please try again.';
            alert(errorMessage);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this notification?')) return;

        try {
            await deleteNotification(id);
            await fetchNotifications(); // Refresh the list
        } catch (err) {
            console.error('Failed to delete notification:', err);
            alert('Failed to delete notification. Please try again.');
        }
    };

    // Filter notifications based on search and audiance
    const filteredNotifications = notifications.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.message.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesAudiance = !audianceFilter || item.audiance === audianceFilter;
        return matchesSearch && matchesAudiance;
    });

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="text-gray-500">Loading notifications...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="text-red-500">{error}</div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Notifications Management</h1>
                    <p className="text-gray-500 mt-1">Create and manage notifications</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    Add Notification
                </button>
            </div>

            {/* Filters & Search */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search notifications..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                </div>
                <select
                    value={audianceFilter}
                    onChange={(e) => setAudianceFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                    <option value="">All Audiences</option>
                    <option value="students">Students</option>
                    <option value="alumni">Alumni</option>
                    <option value="faculty">Faculty</option>
                    <option value="all">All</option>
                </select>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-900">Title</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-900">Message</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-900">Audience</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-900">File</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-900">Date</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-900 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredNotifications.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                                        No notifications found
                                    </td>
                                </tr>
                            ) : (
                                filteredNotifications.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-teal-50 rounded-lg text-teal-600">
                                                    <Bell className="w-4 h-4" />
                                                </div>
                                                <p className="font-medium text-gray-900">{item.title}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{item.message}</td>
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full capitalize">
                                                {item.audiance}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {item.files ? (
                                                <a
                                                    href={`${API_BASE_URL}${item.files}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-1 text-teal-600 hover:text-teal-700"
                                                >
                                                    <FileText className="w-4 h-4" />
                                                    <span>View</span>
                                                </a>
                                            ) : (
                                                <span className="text-gray-400">No file</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {new Date(item.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleOpenModal(item)}
                                                    className="p-2 text-gray-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(item.id)}
                                                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
                            <h2 className="text-xl font-bold text-gray-900">
                                {editingNotification ? 'Edit Notification' : 'Add New Notification'}
                            </h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    placeholder="Enter notification title"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                                <textarea
                                    rows={4}
                                    required
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    placeholder="Write your notification message here..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
                                <select
                                    value={formData.audiance}
                                    onChange={(e) => setFormData({ ...formData, audiance: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                                >
                                    <option value="students">Students</option>
                                    <option value="alumni">Alumni</option>
                                    <option value="faculty">Faculty</option>
                                    <option value="all">All</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Attachment (Optional)</label>
                                <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-teal-500 transition-colors cursor-pointer relative">
                                    <input
                                        type="file"
                                        accept="image/*,application/pdf,.doc,.docx"
                                        onChange={handleFileUpload}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                    <p className="text-sm text-gray-500">Click to upload file</p>
                                    <p className="text-xs text-gray-400 mt-1">PDF, DOC, DOCX, or Images</p>
                                </div>

                                {/* File Preview */}
                                {previewFile && (
                                    <div className="mt-4 relative group">
                                        <div className="p-4 bg-gray-50 rounded-lg flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <FileText className="w-5 h-5 text-teal-600" />
                                                <span className="text-sm text-gray-700">
                                                    {uploadedFile?.name || 'Existing file'}
                                                </span>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={removeFile}
                                                className="p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-6 py-2 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 font-medium"
                                    disabled={submitting}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={submitting}
                                >
                                    {submitting ? 'Saving...' : (editingNotification ? 'Save Changes' : 'Create Notification')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationsAdmin;
