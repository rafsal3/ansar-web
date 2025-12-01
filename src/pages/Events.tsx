import { useState } from 'react';
import { ArrowRight, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const Events = () => {
    const [activeFilter, setActiveFilter] = useState('All');

    const filters = ['All', 'Academic', 'Cultural', 'Sports', 'Technical'];

    const upcomingEvents = [
        {
            id: 1,
            date: '15 DEC 2024',
            category: 'Cultural',
            title: 'Annual Cultural Fest 2024',
            description: 'Join us for a spectacular celebration of arts and culture.',
            time: '10:00 AM'
        },
        {
            id: 2,
            date: '20 DEC 2024',
            category: 'Academic',
            title: 'Science Exhibition',
            description: 'Showcase of innovative projects by students.',
            time: '9:00 AM'
        },
        {
            id: 3,
            date: '25 DEC 2024',
            category: 'Sports',
            title: 'Inter-School Sports Meet',
            description: 'Annual sports competition with various events.',
            time: '8:00 AM'
        }
    ];

    const olderEvents = [
        {
            id: 4,
            date: '10 NOV 2024',
            category: 'Technical',
            title: 'Tech Symposium 2024',
            description: 'Technical presentations and workshops.',
            time: '10:00 AM'
        },
        {
            id: 5,
            date: '05 NOV 2024',
            category: 'Cultural',
            title: 'Onam Celebration',
            description: 'Traditional festival celebration with cultural programs.',
            time: '11:00 AM'
        },
        {
            id: 6,
            date: '28 OCT 2024',
            category: 'Academic',
            title: 'Guest Lecture Series',
            description: 'Industry experts sharing insights and experiences.',
            time: '2:00 PM'
        }
    ];

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900">Events</h1>
                    <p className="mt-2 text-lg text-gray-600">Stay updated with upcoming and past events on campus.</p>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-4 mb-12 justify-center">
                    {filters.map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${activeFilter === filter
                                ? 'bg-teal-600 text-white'
                                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                                }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                {/* Upcoming Events Section */}
                <div className="mb-16">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <Calendar className="w-6 h-6 text-teal-600" />
                        Upcoming Events
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {upcomingEvents.map((event) => (
                            <div key={event.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
                                <div className="p-6">
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-xs font-medium text-gray-500">{event.date}</span>
                                        <span className="px-3 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded-full">
                                            {event.category}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                                    <p className="text-gray-600 mb-4 text-sm">{event.description}</p>

                                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                        <span className="text-sm text-gray-500">⏰ {event.time}</span>
                                        <Link
                                            to={`/events/${event.id}`}
                                            className="flex items-center text-teal-600 font-medium text-sm hover:text-teal-700 transition-colors"
                                        >
                                            Details <ArrowRight className="w-4 h-4 ml-2" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Older Events Section */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <Calendar className="w-6 h-6 text-gray-600" />
                        Older Events
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {olderEvents.map((event) => (
                            <div key={event.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 opacity-90">
                                <div className="p-6">
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-xs font-medium text-gray-500">{event.date}</span>
                                        <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                                            {event.category}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                                    <p className="text-gray-600 mb-4 text-sm">{event.description}</p>

                                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                        <span className="text-sm text-gray-500">⏰ {event.time}</span>
                                        <Link
                                            to={`/events/${event.id}`}
                                            className="flex items-center text-gray-600 font-medium text-sm hover:text-gray-700 transition-colors"
                                        >
                                            Details <ArrowRight className="w-4 h-4 ml-2" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Events;
