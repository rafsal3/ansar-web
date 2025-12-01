import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Tag, Share2, Clock, MapPin } from 'lucide-react';

const EventDetail = () => {
    const { id } = useParams();

    // Mock data - in a real app, this would come from an API based on the ID
    const event = {
        id: id,
        date: '15 DEC 2024',
        category: 'Cultural',
        title: 'Annual Cultural Fest 2024',
        description: 'Join us for a spectacular celebration of arts and culture.',
        time: '10:00 AM',
        location: 'Main Auditorium, Ansar Higher Secondary School',
        fullContent: `
            <p class="mb-4">We are excited to announce the Annual Cultural Fest 2024, a grand celebration of arts, culture, and creativity. This year's fest promises to be bigger and better than ever before.</p>
            
            <h2 class="text-2xl font-bold text-gray-900 mb-3 mt-6">Event Highlights</h2>
            <ul class="list-disc list-inside mb-4 space-y-2">
                <li>Classical and contemporary dance performances</li>
                <li>Music concerts featuring renowned artists</li>
                <li>Drama and theatrical performances</li>
                <li>Art exhibitions and installations</li>
                <li>Food stalls with diverse cuisines</li>
                <li>Interactive workshops and competitions</li>
            </ul>
            
            <h2 class="text-2xl font-bold text-gray-900 mb-3 mt-6">Schedule</h2>
            <p class="mb-4">The fest will run for three days, from December 15-17, 2024. Each day will feature different events and performances:</p>
            <ul class="list-disc list-inside mb-4 space-y-2">
                <li><strong>Day 1:</strong> Inauguration ceremony and classical performances</li>
                <li><strong>Day 2:</strong> Competitions and contemporary shows</li>
                <li><strong>Day 3:</strong> Grand finale with celebrity performances</li>
            </ul>
            
            <h2 class="text-2xl font-bold text-gray-900 mb-3 mt-6">Registration</h2>
            <p class="mb-4">Students interested in participating in competitions must register before December 10, 2024. Registration forms are available at the student affairs office.</p>
            
            <h2 class="text-2xl font-bold text-gray-900 mb-3 mt-6">Entry Details</h2>
            <p class="mb-4">The event is open to all students and faculty members. External guests are welcome with prior registration. Entry passes can be collected from the main office.</p>
            
            <p class="mb-4">For more information, please contact the cultural committee or visit the student affairs office.</p>
        `
    };

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
                    <div className="p-8 md:p-12">
                        {/* Meta Information */}
                        <div className="flex flex-wrap items-center gap-4 mb-6">
                            <div className="flex items-center text-gray-500 text-sm">
                                <Calendar className="w-4 h-4 mr-2" />
                                {event.date}
                            </div>
                            <div className="flex items-center text-gray-500 text-sm">
                                <Clock className="w-4 h-4 mr-2" />
                                {event.time}
                            </div>
                            <div className="flex items-center">
                                <Tag className="w-4 h-4 mr-2 text-blue-600" />
                                <span className="px-3 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded-full">
                                    {event.category}
                                </span>
                            </div>
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
                            {event.title}
                        </h1>

                        {/* Description */}
                        <p className="text-xl text-gray-600 mb-6">
                            {event.description}
                        </p>

                        {/* Location */}
                        <div className="flex items-start gap-3 mb-8 p-4 bg-teal-50 rounded-xl">
                            <MapPin className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="font-semibold text-gray-900">Location</p>
                                <p className="text-gray-600">{event.location}</p>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-gray-200 my-8"></div>

                        {/* Full Content */}
                        <div
                            className="prose prose-lg max-w-none text-gray-700"
                            dangerouslySetInnerHTML={{ __html: event.fullContent }}
                        />

                        {/* Share Section */}
                        <div className="border-t border-gray-200 mt-12 pt-8">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-bold text-gray-900">Share this event</h3>
                                <button className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition-colors">
                                    <Share2 className="w-4 h-4" />
                                    Share
                                </button>
                            </div>
                        </div>
                    </div>
                </article>

                {/* Related Events Section */}
                <div className="mt-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Events</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[1, 2].map((item) => (
                            <Link
                                key={item}
                                to={`/events/${item}`}
                                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                            >
                                <div className="flex justify-between items-center mb-3">
                                    <span className="text-xs font-medium text-gray-500">20 DEC 2024</span>
                                    <span className="px-3 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded-full">
                                        Academic
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">Related Event Title {item}</h3>
                                <p className="text-gray-600 text-sm mb-3">Brief description of the related event.</p>
                                <div className="text-sm text-gray-500">⏰ 9:00 AM</div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetail;
