import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Share2, MapPin } from 'lucide-react';
import { getEventById, Event } from '../api/eventsApi';
import { API_BASE_URL } from '../api/apiClient';

const EventDetail = () => {
    const { id } = useParams();
    const [event, setEvent] = useState<Event | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEventDetail = async () => {
            if (!id) return;
            try {
                const data = await getEventById(Number(id));
                setEvent(data);
            } catch (err) {
                console.error("Failed to fetch event detail:", err);
                setError("Failed to load event details.");
            } finally {
                setLoading(false);
            }
        };

        fetchEventDetail();
    }, [id]);

    // Format date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        }).toUpperCase();
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-teal-600 text-lg">Loading event...</div>
            </div>
        );
    }

    if (error || !event) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="text-red-500 mb-4">{error || "Event not found"}</div>
                    <Link to="/events" className="text-teal-600 hover:underline">
                        Back to Events
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Button */}
                <Link
                    to="/events"
                    className="inline-flex items-center text-teal-600 hover:text-teal-700 mb-8 font-medium"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Events
                </Link>

                {/* Event Article */}
                <article className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    {/* Event Image */}
                    {event.image && (
                        <div className="w-full h-96 overflow-hidden">
                            <img
                                src={`${API_BASE_URL}${event.image}`}
                                alt={event.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}

                    <div className="p-8 md:p-12">
                        {/* Meta Information */}
                        <div className="flex flex-wrap items-center gap-4 mb-6">
                            <div className="flex items-center text-gray-500 text-sm">
                                <Calendar className="w-4 h-4 mr-2" />
                                {formatDate(event.date)}
                            </div>
                            <div className="flex items-center">
                                <span className={`px-3 py-1 text-xs font-medium rounded-full ${event.status === 'upcoming'
                                    ? 'bg-blue-100 text-blue-600'
                                    : 'bg-gray-100 text-gray-600'
                                    }`}>
                                    {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                                </span>
                            </div>
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
                            {event.name}
                        </h1>

                        {/* Location */}
                        <div className="flex items-start gap-3 mb-8 p-4 bg-teal-50 rounded-xl">
                            <MapPin className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="font-semibold text-gray-900">Location</p>
                                <p className="text-gray-600">{event.location}</p>
                            </div>
                        </div>

                        {/* Event Details */}
                        <div className="border-t border-gray-200 my-8"></div>

                        <div className="prose prose-lg max-w-none text-gray-700">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Event</h2>

                            {event.description ? (
                                <div className="mb-8">
                                    <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                                        {event.description}
                                    </p>
                                </div>
                            ) : (
                                <div className="mb-8">
                                    <p className="text-gray-700">
                                        {event.status === 'upcoming'
                                            ? 'Join us for this exciting event! Mark your calendars and don\'t miss out on this wonderful opportunity.'
                                            : 'This event has been successfully completed. Thank you to all participants and attendees.'}
                                    </p>
                                </div>
                            )}

                            <div className="border-t border-gray-200 pt-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Event Details</h3>
                                <div className="space-y-4">
                                    <div>
                                        <p className="font-semibold text-gray-900">Date:</p>
                                        <p className="text-gray-600">{event.date}</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">Status:</p>
                                        <p className="text-gray-600 capitalize">{event.status}</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">Location:</p>
                                        <p className="text-gray-600">{event.location}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Share Section */}
                        <div className="border-t border-gray-200 mt-12 pt-8">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-bold text-gray-900">Share this event</h3>
                                <button
                                    onClick={() => {
                                        if (navigator.share) {
                                            navigator.share({
                                                title: event.name,
                                                text: `Check out this event: ${event.name}`,
                                                url: window.location.href,
                                            });
                                        } else {
                                            navigator.clipboard.writeText(window.location.href);
                                            alert('Link copied to clipboard!');
                                        }
                                    }}
                                    className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition-colors"
                                >
                                    <Share2 className="w-4 h-4" />
                                    Share
                                </button>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    );
};

export default EventDetail;
