import { useState, useEffect } from 'react';
import { Search, Mail, Phone, MapPin, GraduationCap } from 'lucide-react';
import { alumniApi, Alumni } from '../api/alumniApi';
import { API_BASE_URL } from '../api/apiClient';
import Pagination from '../components/Pagination';

const BatchMates = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedYear, setSelectedYear] = useState('All Years');
    const [selectedDepartment, setSelectedDepartment] = useState('All Departments');
    const [alumniList, setAlumniList] = useState<Alumni[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchAlumni = async () => {
            try {
                setLoading(true);
                const response = await alumniApi.getAllAlumni(currentPage, 12); // 12 items per page for 3-column grid
                setAlumniList(response.data);
                setTotalPages(response.pagination.totalPages);
            } catch (error) {
                console.error('Failed to fetch alumni:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAlumni();
    }, [currentPage]);

    // Reset to page 1 when filters change
    useEffect(() => {
        if (currentPage !== 1) {
            setCurrentPage(1);
        }
    }, [searchQuery, selectedYear, selectedDepartment]);

    const filteredBatchMates = alumniList.filter(mate => {
        const matchesSearch = mate.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesYear = selectedYear === 'All Years' || mate.endYear.toString() === selectedYear;
        const matchesDepartment = selectedDepartment === 'All Departments' ||
            mate.course.toLowerCase().includes(selectedDepartment.toLowerCase());
        return matchesSearch && matchesYear && matchesDepartment;
    });

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900">Batch Mates</h1>
                    <p className="mt-2 text-lg text-gray-600">Connect with your fellow alumni</p>
                </div>

                {/* Search and Filters */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Search */}
                        <div className="md:col-span-1">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search by name..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        {/* Year Filter */}
                        <div>
                            <select
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            >
                                <option>All Years</option>
                                <option>2024</option>
                                <option>2023</option>
                                <option>2022</option>
                                <option>2021</option>
                                <option>2020</option>
                                <option>2019</option>
                            </select>
                        </div>

                        {/* Department Filter */}
                        <div>
                            <select
                                value={selectedDepartment}
                                onChange={(e) => setSelectedDepartment(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            >
                                <option>All Departments</option>
                                <option>Computer Science</option>
                                <option>Commerce</option>
                                <option>English</option>
                                <option>Mathematics</option>
                                <option>Msc</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Results Counter */}
                {!loading && (
                    <div className="mb-6 text-sm text-gray-600">
                        Showing <span className="font-semibold text-gray-900">{filteredBatchMates.length}</span> of{' '}
                        <span className="font-semibold text-gray-900">{alumniList.length}</span> batchmates on this page
                    </div>
                )}

                {/* Batch Mates Grid */}
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            {filteredBatchMates.map((mate) => (
                                <div key={mate.id} className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
                                    {/* Profile Picture Placeholder */}
                                    <div className="flex items-start gap-4 mb-4">
                                        {mate.photos && mate.photos.length > 0 ? (
                                            <img
                                                src={`${API_BASE_URL}${mate.photos[0]}`}
                                                alt={mate.name}
                                                className="w-16 h-16 rounded-full object-cover border-2 border-teal-500"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).onerror = null;
                                                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150'; // Fallback
                                                }}
                                            />
                                        ) : (
                                            <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                                                <span className="text-xl font-bold text-white">
                                                    {mate.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                                                </span>
                                            </div>
                                        )}
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-gray-900">{mate.name}</h3>
                                            <p className="text-sm text-gray-600">{mate.job?.name || 'Alumni'}</p>
                                        </div>
                                    </div>

                                    {/* Details */}
                                    <div className="space-y-3 mb-4">
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <GraduationCap className="w-4 h-4 text-teal-600" />
                                            <span>{mate.course} - {mate.endYear}</span>
                                        </div>
                                        {mate.className && (
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <MapPin className="w-4 h-4 text-teal-600" />
                                                <span>{mate.className}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Contact Actions */}
                                    <div className="flex gap-2 pt-4 border-t border-gray-100">
                                        <a
                                            href={`mailto:${mate.email}`}
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-teal-50 text-teal-600 rounded-xl hover:bg-teal-100 transition-colors"
                                        >
                                            <Mail className="w-4 h-4" />
                                            <span className="text-sm font-medium">Email</span>
                                        </a>
                                        <a
                                            href={`tel:${mate.phone}`}
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors"
                                        >
                                            <Phone className="w-4 h-4" />
                                            <span className="text-sm font-medium">Call</span>
                                        </a>
                                        {mate.instagram && (
                                            <a href={mate.instagram} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-pink-50 text-pink-600 rounded-xl hover:bg-pink-100 transition-colors">
                                                <span className="w-4 h-4 font-bold">IG</span>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={setCurrentPage}
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default BatchMates;
