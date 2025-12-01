import { useState } from 'react';
import { Check, X, Search, Image as ImageIcon, Trash2 } from 'lucide-react';

interface MemoryItem {
    id: number;
    author: string;
    batch: string;
    content: string;
    date: string;
    status: 'Pending' | 'Approved' | 'Rejected';
    hasImage: boolean;
}

const MemoriesAdmin = () => {
    const [memories] = useState<MemoryItem[]>([
        {
            id: 1,
            author: 'Rahul Kumar',
            batch: '2019-2022',
            content: 'Had the best time of my life in the school canteen with friends!',
            date: '2024-03-15',
            status: 'Pending',
            hasImage: true
        },
        {
            id: 2,
            author: 'Priya Singh',
            batch: '2020-2023',
            content: 'Missing the library sessions and professors.',
            date: '2024-03-14',
            status: 'Approved',
            hasImage: false
        },
        {
            id: 3,
            author: 'Amit Shah',
            batch: '2018-2021',
            content: 'Graduation day memories...',
            date: '2024-03-10',
            status: 'Rejected',
            hasImage: true
        },
    ]);

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Memories Management</h1>
                    <p className="text-gray-500 mt-1">Review and moderate alumni memories</p>
                </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search memories..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                </div>
                <select className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500">
                    <option value="Pending">Pending Review</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                    <option value="All">All Memories</option>
                </select>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-900">Author</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-900">Content</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-900">Date</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-900">Status</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-900 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {memories.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="font-medium text-gray-900">{item.author}</p>
                                            <p className="text-xs text-gray-500">Batch {item.batch}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="max-w-md">
                                            <p className="text-sm text-gray-600 truncate">{item.content}</p>
                                            {item.hasImage && (
                                                <div className="flex items-center gap-1 mt-1 text-xs text-teal-600">
                                                    <ImageIcon className="w-3 h-3" />
                                                    <span>Has Image</span>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{item.date}</td>
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
                                        <div className="flex items-center justify-end gap-2">
                                            {item.status === 'Pending' ? (
                                                <>
                                                    <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Approve">
                                                        <Check className="w-4 h-4" />
                                                    </button>
                                                    <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Reject">
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </>
                                            ) : (
                                                <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            )}
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

export default MemoriesAdmin;
