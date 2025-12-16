import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Search, Mail, Phone, GraduationCap } from 'lucide-react';
import { fetchAllFaculty, Faculty } from '../../api/facultyApi';
import { API_BASE_URL } from '../../api/apiClient';

const FacultyAdmin = () => {
    const [facultyMembers, setFacultyMembers] = useState<Faculty[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const loadFaculty = async () => {
        try {
            setLoading(true);
            const response = await fetchAllFaculty(1, 100, searchQuery);
            setFacultyMembers(response.data);
            setError(null);
        } catch (err) {
            console.error('Failed to fetch faculty:', err);
            setError('Failed to load faculty list');
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
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Faculty Management</h1>
                    <p className="text-gray-500 mt-1">Manage faculty members and staff</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors">
                    <Plus className="w-5 h-5" />
                    Add Faculty
                </button>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search faculty..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-900">Name</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-900">Designation</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-900">Qualification</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-900">Contact</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-900 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                        Loading faculty...
                                    </td>
                                </tr>
                            )}

                            {!loading && error && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-red-500">
                                        {error}
                                    </td>
                                </tr>
                            )}

                            {!loading && !error && facultyMembers.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                        No faculty members found
                                    </td>
                                </tr>
                            )}

                            {!loading && !error && facultyMembers.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            {item.photo ? (
                                                <img
                                                    src={`${API_BASE_URL}${item.photo}`}
                                                    alt={item.name}
                                                    className="w-8 h-8 rounded-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold text-sm">
                                                    {item.name.charAt(0)}
                                                </div>
                                            )}
                                            <p className="font-medium text-gray-900">{item.name}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{item.designation}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        <div className="flex items-center gap-2">
                                            <GraduationCap className="w-4 h-4 text-gray-400" />
                                            {item.qualification}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-1 text-sm text-gray-500">
                                            <div className="flex items-center gap-2">
                                                <Mail className="w-3 h-3" />
                                                <span className="truncate max-w-[150px]" title={item.email}>{item.email}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Phone className="w-3 h-3" />
                                                {item.phone}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-2 text-gray-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors">
                                                <Pencil className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default FacultyAdmin;
