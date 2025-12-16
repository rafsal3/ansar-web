import { useState, useEffect } from 'react';
import { Search, ChevronDown, Mail, Phone, GraduationCap } from 'lucide-react';
import { fetchAllFaculty, Faculty as FacultyType } from '../api/facultyApi';
import { API_BASE_URL } from '../api/apiClient';

const Faculty = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [department] = useState('Department');
    const [sort] = useState('Sort by A - Z');
    const [facultyMembers, setFacultyMembers] = useState<FacultyType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadFaculty = async () => {
        try {
            setLoading(true);
            const response = await fetchAllFaculty(1, 100, searchQuery); // Fetch up to 100 for now
            setFacultyMembers(response.data);
            setError(null);
        } catch (err) {
            console.error('Failed to fetch faculty:', err);
            setError('Failed to load faculty members. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            loadFaculty();
        }, 500);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-extrabold text-gray-900">Our Faculty & Staff</h1>
                    <p className="mt-2 text-lg text-gray-600">Discover a wide range of academic programs designed to launch your career.</p>
                </div>

                {/* Controls */}
                <div className="flex flex-col md:flex-row gap-4 mb-12">
                    <div className="relative flex-grow">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search by name, designation or keyword"
                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-4">
                        <div className="relative hidden"> {/* Hidden for now as API doesn't support department/sort yet */}
                            <button className="flex items-center justify-between w-40 px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50">
                                <span>{department}</span>
                                <ChevronDown className="w-4 h-4 ml-2" />
                            </button>
                        </div>
                        <div className="relative hidden">
                            <button className="flex items-center justify-between w-40 px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50">
                                <span>{sort}</span>
                                <ChevronDown className="w-4 h-4 ml-2" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                )}

                {/* Error State */}
                {!loading && error && (
                    <div className="text-center text-red-600 py-12">
                        {error}
                    </div>
                )}

                {/* Faculty Grid */}
                {!loading && !error && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {facultyMembers.map((member) => (
                            <div key={member.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 flex flex-col h-full">
                                {/* Image Placeholder */}
                                <div className="h-64 bg-gray-200 w-full relative overflow-hidden group">
                                    {member.photo ? (
                                        <img
                                            src={`${API_BASE_URL}${member.photo}`}
                                            alt={member.name}
                                            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-100">
                                            <span className="text-sm">No Image</span>
                                        </div>
                                    )}
                                </div>

                                <div className="p-6 flex flex-col flex-grow">
                                    <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                                    <p className="text-sm text-blue-600 font-medium mb-3">{member.designation}</p>

                                    <div className="space-y-2 mt-auto">
                                        <div className="flex items-center text-gray-600 text-sm">
                                            <GraduationCap className="w-4 h-4 mr-2 flex-shrink-0" />
                                            <span className="truncate">{member.qualification}</span>
                                        </div>
                                        <div className="flex items-center text-gray-600 text-sm">
                                            <Mail className="w-4 h-4 mr-2 flex-shrink-0" />
                                            <span className="truncate" title={member.email}>{member.email}</span>
                                        </div>
                                        <div className="flex items-center text-gray-600 text-sm">
                                            <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
                                            <span className="truncate">{member.phone}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {!loading && !error && facultyMembers.length === 0 && (
                    <div className="text-center text-gray-500 py-12">
                        No faculty members found.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Faculty;
