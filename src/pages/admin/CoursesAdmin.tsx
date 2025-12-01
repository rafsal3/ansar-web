import { useState } from 'react';
import { Plus, Pencil, Trash2, Search, BookOpen } from 'lucide-react';

interface CourseItem {
    id: number;
    name: string;
    department: string;
    duration: string;
    seats: number;
}

const CoursesAdmin = () => {
    const [courses] = useState<CourseItem[]>([
        { id: 1, name: 'Science (PCMB)', department: 'Science', duration: '2 Years', seats: 60 },
        { id: 2, name: 'Science (PCMC)', department: 'Science', duration: '2 Years', seats: 60 },
        { id: 3, name: 'Commerce with Maths', department: 'Commerce', duration: '2 Years', seats: 60 },
        { id: 4, name: 'Commerce with CA', department: 'Commerce', duration: '2 Years', seats: 60 },
        { id: 5, name: 'Humanities', department: 'Humanities', duration: '2 Years', seats: 60 },
    ]);

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Courses Management</h1>
                    <p className="text-gray-500 mt-1">Manage academic courses and programs</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors">
                    <Plus className="w-5 h-5" />
                    Add Course
                </button>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search courses..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-900">Course Name</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-900">Department</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-900">Duration</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-900">Seats</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-900 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {courses.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-teal-50 rounded-lg text-teal-600">
                                                <BookOpen className="w-4 h-4" />
                                            </div>
                                            <p className="font-medium text-gray-900">{item.name}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{item.department}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{item.duration}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{item.seats}</td>
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

export default CoursesAdmin;
