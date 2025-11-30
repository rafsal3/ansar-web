import { useState } from 'react';
import { Bell } from 'lucide-react';
import { Link } from 'react-router-dom';

const Notifications = () => {
    const [activeFilter, setActiveFilter] = useState('ALL');

    const filters = ['ALL', 'UG', 'PG', 'BOTH'];

    const notifications = [
        { id: 1, title: 'FYUGP Major & Minor Courses' },
        { id: 2, title: 'FOURTH SEMESTER CBCSS-UG BSC/BCA TIMETABLE' },
        { id: 3, title: 'FOURTH SEMESTER CBCSS-UG BCOM TIMETABLE' },
        { id: 4, title: 'FOURTH SEMESTER CBCSS-UG BBA TIMETABLE' },
        { id: 5, title: 'Fourth Semester CBCSS- UG BA Timetable' },
        { id: 6, title: 'Fourth Semester Exam Registration' }
    ];

    return (
        <div className="bg-gray-50 min-h-screen py-6 sm:py-8 md:py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header with Filters */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-6 mb-8 sm:mb-10 md:mb-12">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900">Notifications</h1>

                    {/* Filter Buttons */}
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                        {filters.map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors duration-200 ${activeFilter === filter
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                                    }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Notifications List */}
                <div className="space-y-3 sm:space-y-4">
                    {notifications.map((notification) => (
                        <Link
                            key={notification.id}
                            to={`/notifications/${notification.id}`}
                            className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 flex items-center gap-3 sm:gap-4 cursor-pointer"
                        >
                            <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                            </div>
                            <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 leading-snug">
                                {notification.title}
                            </h3>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Notifications;