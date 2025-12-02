import { useState } from 'react';
import { Plus, Pencil, Trash2, Search, Briefcase } from 'lucide-react';

interface OccupationItem {
    id: number;
    name: string;
    category: string;
    createdAt: string;
}

const OccupationsAdmin = () => {
    const [occupations, setOccupations] = useState<OccupationItem[]>([
        { id: 1, name: 'Software Engineer', category: 'Technology', createdAt: '2024-01-15' },
        { id: 2, name: 'Doctor', category: 'Healthcare', createdAt: '2024-01-16' },
        { id: 3, name: 'Teacher', category: 'Education', createdAt: '2024-01-17' },
        { id: 4, name: 'Business Owner', category: 'Business', createdAt: '2024-01-18' },
        { id: 5, name: 'Civil Engineer', category: 'Engineering', createdAt: '2024-01-19' },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingOccupation, setEditingOccupation] = useState<OccupationItem | null>(null);
    const [formData, setFormData] = useState({ name: '', category: '' });
    const [searchTerm, setSearchTerm] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingOccupation) {
            // Update existing occupation
            setOccupations(occupations.map(occ =>
                occ.id === editingOccupation.id
                    ? { ...occ, name: formData.name, category: formData.category }
                    : occ
            ));
        } else {
            // Add new occupation
            const newOccupation: OccupationItem = {
                id: Math.max(...occupations.map(o => o.id), 0) + 1,
                name: formData.name,
                category: formData.category,
                createdAt: new Date().toISOString().split('T')[0]
            };
            setOccupations([...occupations, newOccupation]);
        }
        handleCloseModal();
    };

    const handleEdit = (occupation: OccupationItem) => {
        setEditingOccupation(occupation);
        setFormData({ name: occupation.name, category: occupation.category });
        setIsModalOpen(true);
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this occupation?')) {
            setOccupations(occupations.filter(occ => occ.id !== id));
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingOccupation(null);
        setFormData({ name: '', category: '' });
    };

    const filteredOccupations = occupations.filter(occ =>
        occ.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        occ.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Occupations Management</h1>
                    <p className="text-gray-500 mt-1">Manage occupation categories for alumni</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    Add Occupation
                </button>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search occupations..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-900">Occupation Name</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-900">Category</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-900">Created Date</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-900 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredOccupations.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-teal-50 rounded-lg text-teal-600">
                                                <Briefcase className="w-4 h-4" />
                                            </div>
                                            <p className="font-medium text-gray-900">{item.name}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                                            {item.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{item.createdAt}</td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => handleEdit(item)}
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
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            {editingOccupation ? 'Edit Occupation' : 'Add New Occupation'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                    Occupation Name *
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                                    placeholder="e.g., Software Engineer"
                                />
                            </div>
                            <div>
                                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                                    Category *
                                </label>
                                <input
                                    id="category"
                                    type="text"
                                    required
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                                    placeholder="e.g., Technology"
                                />
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors font-medium"
                                >
                                    {editingOccupation ? 'Update' : 'Add'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OccupationsAdmin;
