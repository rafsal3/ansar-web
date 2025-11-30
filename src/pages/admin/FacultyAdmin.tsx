import { useState } from 'react';
import { Plus, Pencil, Trash2, Search, Mail, Phone } from 'lucide-react';

interface FacultyItem {
    id: number;
    name: string;
    designation: string;
    department: string;
    email: string;
    phone: string;
}

const FacultyAdmin = () => {
    const [faculty] = useState<FacultyItem[]>([
        { id: 1, name: 'Dr. John Smith', designation: 'Professor', department: 'Computer Science', email: 'john@ansar.edu', phone: '+91 9876543210' },
        { id: 2, name: 'Prof. Sarah Johnson', designation: 'Associate Professor', department: 'Commerce', email: 'sarah@ansar.edu', phone: '+91 9876543211' },
        { id: 3, name: 'Dr. Michael Brown', designation: 'Assistant Professor', department: 'English', email: 'michael@ansar.edu', phone: '+91 9876543212' },
    ]);

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
                                <th className="px-6 py-4 text-sm font-semibold text-gray-900">Department</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-900">Contact</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-900 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {faculty.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold text-sm">
                                                {item.name.charAt(0)}
                                            </div>
                                            <p className="font-medium text-gray-900">{item.name}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{item.designation}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{item.department}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-1 text-sm text-gray-500">
                                            <div className="flex items-center gap-2">
                                                <Mail className="w-3 h-3" />
                                                {item.email}
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
