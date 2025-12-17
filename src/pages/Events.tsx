import { useState, useEffect } from 'react';
import { ArrowRight, Calendar, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getAllEvents, Event } from '../api/eventsApi';
import { API_BASE_URL } from '../api/apiClient';

const Events = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeFilter, setActiveFilter] = useState('All');

    const filters = ['All', 'Upcoming', 'Completed'];

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            setLoading(true);
            const response = await getAllEvents({ status: 'upcoming,completed' });
            setEvents(response.data);
            setError(null);
        } catch (err) {
            console.error('Failed to fetch events:', err);
            setError('Failed to load events. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Filter events based on active filter
    const filteredEvents = events.filter(event => {
        if (activeFilter === 'All') return true;
        if (activeFilter === 'Upcoming') return event.status === 'upcoming';
        if (activeFilter === 'Completed') return event.status === 'completed';
        return true;
    });

    // Separate upcoming and completed events
    const upcomingEvents = filteredEvents.filter(e => e.status === 'upcoming');
    const completedEvents = filteredEvents.filter(e => e.status === 'completed');

    // Format date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase();
    };

    if (loading) {
        return (
            <div className="bg-gray-50 min-h-screen py-12 flex items-center justify-center">
                <div className="text-gray-500">Loading events...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-gray-50 min-h-screen py-12 flex items-center justify-center">
                <div className="text-red-500">{error}</div>
            </div>
        );
    }

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
                {(activeFilter === 'All' || activeFilter === 'Upcoming') && upcomingEvents.length > 0 && (
                    <div className="mb-16">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <Calendar className="w-6 h-6 text-teal-600" />
                            Upcoming Events
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {upcomingEvents.map((event) => (
                                <div key={event.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
                                    {/* Event Image */}
                                    {event.image && (
                                        <div className="h-48 overflow-hidden">
                                            <img
                                                src={`${API_BASE_URL}${event.image}`}
                                                alt={event.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    )}

                                    <div className="p-6">
                                        <div className="flex justify-between items-center mb-4">
                                            <span className="text-xs font-medium text-gray-500">{formatDate(event.date)}</span>
                                            <span className="px-3 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded-full">
                                                Upcoming
                                            </span>
                                        </div>

                                        <h3 className="text-xl font-bold text-gray-900 mb-2">{event.name}</h3>

                                        <div className="flex items-center gap-2 text-gray-600 mb-4">
                                            <MapPin className="w-4 h-4" />
                                            <span className="text-sm">{event.location}</span>
                                        </div>

                                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                            <span className="text-sm text-gray-500">📅 {event.date}</span>
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
                )}

                {/* Completed Events Section */}
                {(activeFilter === 'All' || activeFilter === 'Completed') && completedEvents.length > 0 && (
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <Calendar className="w-6 h-6 text-gray-600" />
                            Completed Events
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {completedEvents.map((event) => (
                                <div key={event.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 opacity-90">
                                    {/* Event Image */}
                                    {event.image && (
                                        <div className="h-48 overflow-hidden">
                                            <img
                                                src={`${API_BASE_URL}${event.image}`}
                                                alt={event.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    )}

                                    <div className="p-6">
                                        <div className="flex justify-between items-center mb-4">
                                            <span className="text-xs font-medium text-gray-500">{formatDate(event.date)}</span>
                                            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                                                Completed
                                            </span>
                                        </div>

                                        <h3 className="text-xl font-bold text-gray-900 mb-2">{event.name}</h3>

                                        <div className="flex items-center gap-2 text-gray-600 mb-4">
                                            <MapPin className="w-4 h-4" />
                                            <span className="text-sm">{event.location}</span>
                                        </div>

                                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                            <span className="text-sm text-gray-500">📅 {event.date}</span>
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
                )}

                {/* No Events Message */}
                {filteredEvents.length === 0 && (
                    <div className="text-center py-12">
                        <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 text-lg">No events found</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Events;
