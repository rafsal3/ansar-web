import { useState } from 'react';
import { Check, X, Search, GraduationCap } from 'lucide-react';

interface AlumniRequest {
    id: number;
    name: string;
    batch: string;
    course: string;
    email: string;
    status: 'Pending' | 'Approved' | 'Rejected';
}

const AlumniAdmin = () => {
    const [requests] = useState<AlumniRequest[]>([
        { id: 1, name: 'Rahul Kumar', batch: '2019-2022', course: 'B.Sc Computer Science', email: 'rahul@gmail.com', status: 'Pending' },
        { id: 2, name: 'Priya Singh', batch: '2020-2023', course: 'B.Com Finance', email: 'priya@gmail.com', status: 'Pending' },
        { id: 3, name: 'Amit Shah', batch: '2018-2021', course: 'BA English', email: 'amit@gmail.com', status: 'Approved' },
    ]);

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Alumni Management</h1>
                    <p className="text-gray-500 mt-1">Approve and manage alumni registrations</p>
                </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search alumni..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                </div>
                <select className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500">
                    <option value="Pending">Pending Requests</option>
                    <option value="Approved">Approved Alumni</option>
                    <option value="Rejected">Rejected</option>
                    <option value="All">All</option>
                </select>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-900">Name</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-900">Batch</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-900">Course</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-900">Status</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-900 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {requests.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-teal-50 rounded-lg text-teal-600">
                                                <GraduationCap className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">{item.name}</p>
                                                <p className="text-xs text-gray-500">{item.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{item.batch}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{item.course}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${item.status === 'Approved'
                                                ? 'bg-green-100 text-green-700'
                                                : item.status === 'Rejected'
                                                    ? 'bg-red-100 text-red-700'
                                                    : 'bg-yellow-100 text-yellow-700'
                                            }`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        {item.status === 'Pending' && (
                                            <div className="flex items-center justify-end gap-2">
                                                <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Approve">
                                                    <Check className="w-4 h-4" />
                                                </button>
                                                <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Reject">
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        )}
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

export default AlumniAdmin;
