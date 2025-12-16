import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Tag, Bell, Download, FileText } from 'lucide-react';
import { getNotificationById, Notification } from '../api/notificationApi';
import { API_BASE_URL } from '../api/apiClient';

const NotificationDetail = () => {
    const { id } = useParams();
    const [notification, setNotification] = useState<Notification | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            fetchNotification(parseInt(id));
        }
    }, [id]);

    const fetchNotification = async (notificationId: number) => {
        try {
            setLoading(true);
            const data = await getNotificationById(notificationId);
            setNotification(data);
            setError(null);
        } catch (err) {
            console.error('Failed to fetch notification:', err);
            setError('Failed to load notification. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="bg-gray-50 min-h-screen py-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-center py-12">
                        <div className="text-gray-500">Loading notification...</div>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !notification) {
        return (
            <div className="bg-gray-50 min-h-screen py-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Link
                        to="/notifications"
                        className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8 font-medium"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Notifications
                    </Link>
                    <div className="flex items-center justify-center py-12">
                        <div className="text-red-500">{error || 'Notification not found'}</div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Button */}
                <Link
                    to="/notifications"
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8 font-medium"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Notifications
                </Link>

                {/* Notification Article */}
                <article className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-8 md:p-12">
                        {/* Header with Bell Icon */}
                        <div className="flex items-start gap-4 mb-6">
                            <div className="flex-shrink-0 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                                <Bell className="w-8 h-8 text-blue-600" />
                            </div>
                            <div className="flex-1">
                                {/* Meta Information */}
                                <div className="flex flex-wrap items-center gap-4 mb-3">
                                    <div className="flex items-center text-gray-500 text-sm">
                                        <Calendar className="w-4 h-4 mr-2" />
                                        {new Date(notification.createdAt).toLocaleDateString('en-US', {
                                            day: '2-digit',
                                            month: 'short',
                                            year: 'numeric'
                                        }).toUpperCase()}
                                    </div>
                                    <div className="flex items-center">
                                        <Tag className="w-4 h-4 mr-2 text-blue-600" />
                                        <span className="px-3 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded-full capitalize">
                                            {notification.audiance}
                                        </span>
                                    </div>
                                </div>

                                {/* Title */}
                                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                                    {notification.title}
                                </h1>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-gray-200 my-8"></div>

                        {/* Message Content */}
                        <div className="prose prose-lg max-w-none text-gray-700">
                            <p className="whitespace-pre-wrap">{notification.message}</p>
                        </div>

                        {/* Attachments Section */}
                        {notification.files && (
                            <div className="mt-8 p-6 bg-gray-50 rounded-2xl">
                                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <FileText className="w-5 h-5" />
                                    Attachment
                                </h3>
                                <div className="space-y-3">
                                    <a
                                        href={`${API_BASE_URL}${notification.files}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        download
                                        className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-sm transition-all group"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                                <FileText className="w-5 h-5 text-blue-600" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900 group-hover:text-blue-600">
                                                    {notification.files.split('/').pop()}
                                                </p>
                                                <p className="text-sm text-gray-500">Click to download</p>
                                            </div>
                                        </div>
                                        <Download className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                </article>
            </div>
        </div>
    );
};

export default NotificationDetail;
