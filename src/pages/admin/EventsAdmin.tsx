import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Search, X, Upload, Calendar, MapPin } from 'lucide-react';
import { getAllEvents, Event, createEvent, updateEvent, deleteEvent, CreateEventPayload } from '../../api/eventsApi';
import { API_BASE_URL } from '../../api/apiClient';

const EventsAdmin = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState<Event | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);

    // Search state
    const [searchQuery, setSearchQuery] = useState('');

    // Form States
    const [formData, setFormData] = useState<Partial<CreateEventPayload>>({
        name: '',
        location: '',
        status: 'upcoming',
        date: new Date().toISOString().split('T')[0]
    });

    // Fetch events on component mount
    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            setLoading(true);
            const response = await getAllEvents();
            setEvents(response.data);
            setError(null);
        } catch (err) {
            console.error('Failed to fetch events:', err);
            setError('Failed to load events. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (eventItem?: Event) => {
        if (eventItem) {
            setEditingEvent(eventItem);
            setFormData({
                name: eventItem.name,
                location: eventItem.location,
                status: eventItem.status,
                date: eventItem.date
            });
            // Set preview image from existing event
            if (eventItem.image) {
                setPreviewImage(`${API_BASE_URL}${eventItem.image}`);
            } else {
                setPreviewImage(null);
            }
            setUploadedFile(null);
        } else {
            setEditingEvent(null);
            setFormData({
                name: '',
                location: '',
                status: 'upcoming',
                date: new Date().toISOString().split('T')[0]
            });
            setPreviewImage(null);
            setUploadedFile(null);
        }
        setIsModalOpen(true);
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setUploadedFile(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const removeImage = () => {
        setPreviewImage(null);
        setUploadedFile(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const payload: CreateEventPayload = {
                name: formData.name!,
                location: formData.location!,
                status: formData.status as 'upcoming' | 'completed',
                date: formData.date!,
                image: uploadedFile || undefined
            };

            console.log('Submitting event with payload:', {
                ...payload,
                image: payload.image ? { name: payload.image.name, size: payload.image.size, type: payload.image.type } : undefined
            });

            if (editingEvent) {
                const result = await updateEvent(editingEvent.id, payload);
                console.log('Update result:', result);
            } else {
                const result = await createEvent(payload);
                console.log('Create result:', result);
            }

            await fetchEvents(); // Refresh the list
            setIsModalOpen(false);
        } catch (err: any) {
            console.error('Failed to save event:', err);
            const errorMessage = err.response?.data?.message || err.message || 'Failed to save event. Please try again.';
            alert(errorMessage);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this event?')) return;

        try {
            await deleteEvent(id);
            await fetchEvents(); // Refresh the list
        } catch (err) {
            console.error('Failed to delete event:', err);
            alert('Failed to delete event. Please try again.');
        }
    };

    // Filter events based on search
    const filteredEvents = events.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesSearch;
    });

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="text-gray-500">Loading events...</div>
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
                    <h1 className="text-2xl font-bold text-gray-900">Events Management</h1>
                    <p className="text-gray-500 mt-1">Schedule and manage school events</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    Add Event
                </button>
            </div>

            {/* Search */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search events..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-900">Event Name</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-900">Date</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-900">Location</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-900">Status</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-900 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredEvents.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                        No events found
                                    </td>
                                </tr>
                            ) : (
                                filteredEvents.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <p className="font-medium text-gray-900">{item.name}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <Calendar className="w-4 h-4" />
                                                <span className="text-sm">{item.date}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            <div className="flex items-center gap-1">
                                                <MapPin className="w-4 h-4" />
                                                <span>{item.location}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 text-xs font-medium rounded-full ${item.status === 'upcoming'
                                                ? 'bg-blue-100 text-blue-700'
                                                : 'bg-gray-100 text-gray-700'
                                                }`}>
                                                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                                            </span>
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
                                {editingEvent ? 'Edit Event' : 'Add New Event'}
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
                                <label className="block text-sm font-medium text-gray-700 mb-2">Event Name</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    placeholder="Enter event name"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    placeholder="Event location"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                                    <select
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value as 'upcoming' | 'completed' })}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    >
                                        <option value="upcoming">Upcoming</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                                    <input
                                        type="date"
                                        required
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Event Image</label>
                                <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-teal-500 transition-colors cursor-pointer relative">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                    <p className="text-sm text-gray-500">Click to upload event image</p>
                                </div>

                                {/* Image Preview */}
                                {previewImage && (
                                    <div className="mt-4 relative aspect-video rounded-lg overflow-hidden bg-gray-100">
                                        <img
                                            src={previewImage}
                                            alt="Preview"
                                            className="w-full h-full object-cover"
                                        />
                                        <button
                                            type="button"
                                            onClick={removeImage}
                                            className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-6 py-2 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700 font-medium"
                                >
                                    {editingEvent ? 'Save Changes' : 'Create Event'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EventsAdmin;
