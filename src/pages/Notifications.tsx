import { useState } from 'react';
import { Bell } from 'lucide-react';

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
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header with Filters */}
                <div className="flex justify-between items-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900">Notifications</h1>

                    {/* Filter Buttons */}
                    <div className="flex gap-3">
                        {filters.map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${activeFilter === filter
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
                <div className="space-y-4">
                    {notifications.map((notification) => (
                        <div
                            key={notification.id}
                            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 flex items-center gap-4 cursor-pointer"
                        >
                            <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                <Bell className="w-5 h-5 text-blue-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">{notification.title}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Notifications;
