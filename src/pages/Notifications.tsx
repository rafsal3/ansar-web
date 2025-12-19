import { useState, useEffect } from 'react';
import { Bell, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getAllNotifications, Notification } from '../api/notificationApi';
import Pagination from '../components/Pagination';

const Notifications = () => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [audianceFilter, setAudianceFilter] = useState<string>('');

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 10; // Show 10 notifications per page

    useEffect(() => {
        fetchNotifications();
    }, [audianceFilter, currentPage]);

    // Reset to page 1 when filter changes
    useEffect(() => {
        setCurrentPage(1);
    }, [audianceFilter]);

    const fetchNotifications = async () => {
        try {
            setLoading(true);
            const response = await getAllNotifications({
                audiance: audianceFilter || undefined,
                page: currentPage,
                limit: limit
            });
            setNotifications(response.data);
            if (response.meta) {
                setTotalPages(response.meta.totalPages);
            }
            setError(null);
        } catch (err) {
            console.error('Failed to fetch notifications:', err);
            setError('Failed to load notifications. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Since we're now filtering on the server side, we can use notifications directly
    const filteredNotifications = notifications;

    return (
        <div className="bg-gray-50 min-h-screen py-6 sm:py-8 md:py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header with Filters */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-6 mb-8 sm:mb-10 md:mb-12">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900">Notifications</h1>

                    {/* Filter Buttons */}
                    <div className="flex gap-2 flex-wrap">
                        <button
                            onClick={() => setAudianceFilter('')}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${audianceFilter === ''
                                ? 'bg-teal-600 text-white'
                                : 'bg-white text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setAudianceFilter('students')}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${audianceFilter === 'students'
                                ? 'bg-teal-600 text-white'
                                : 'bg-white text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            Students
                        </button>
                        <button
                            onClick={() => setAudianceFilter('alumni')}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${audianceFilter === 'alumni'
                                ? 'bg-teal-600 text-white'
                                : 'bg-white text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            Alumni
                        </button>
                        <button
                            onClick={() => setAudianceFilter('faculty')}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${audianceFilter === 'faculty'
                                ? 'bg-teal-600 text-white'
                                : 'bg-white text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            Faculty
                        </button>
                    </div>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex items-center justify-center py-12">
                        <div className="text-gray-500">Loading notifications...</div>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="flex items-center justify-center py-12">
                        <div className="text-red-500">{error}</div>
                    </div>
                )}

                {/* Notifications List */}
                {!loading && !error && (
                    <div className="space-y-3 sm:space-y-4">
                        {filteredNotifications.length === 0 ? (
                            <div className="bg-white rounded-xl p-8 text-center">
                                <p className="text-gray-500">No notifications found</p>
                            </div>
                        ) : (
                            filteredNotifications.map((notification) => (
                                <Link
                                    key={notification.id}
                                    to={`/notifications/${notification.id}`}
                                    className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 flex items-start gap-3 sm:gap-4 cursor-pointer group"
                                >
                                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                                        <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 leading-snug mb-1">
                                            {notification.title}
                                        </h3>
                                        <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 mb-2">
                                            {notification.message}
                                        </p>
                                        <div className="flex items-center gap-3 flex-wrap">
                                            <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full capitalize">
                                                {notification.audiance}
                                            </span>
                                            <span className="text-xs text-gray-500">
                                                {new Date(notification.createdAt).toLocaleDateString()}
                                            </span>
                                            {notification.files && (
                                                <span className="flex items-center gap-1 text-xs text-teal-600">
                                                    <FileText className="w-3 h-3" />
                                                    Attachment
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                )}

                {/* Pagination */}
                {!loading && !error && filteredNotifications.length > 0 && (
                    <div className="mt-8">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Notifications;