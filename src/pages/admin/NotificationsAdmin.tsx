import { useState } from 'react';
import { Plus, Trash2, Search, Bell, Send } from 'lucide-react';

interface NotificationItem {
    id: number;
    title: string;
    message: string;
    date: string;
    target: 'All' | 'Students' | 'Alumni' | 'Faculty';
}

const NotificationsAdmin = () => {
    const [notifications] = useState<NotificationItem[]>([
        { id: 1, title: 'Holiday Announcement', message: 'College will remain closed on Monday.', date: '2024-03-10', target: 'All' },
        { id: 2, title: 'Exam Registration', message: 'Last date for exam registration is 20th March.', date: '2024-03-05', target: 'Students' },
        { id: 3, title: 'Alumni Meet Invitation', message: 'Join us for the annual alumni meet.', date: '2024-03-01', target: 'Alumni' },
    ]);

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
                    <p className="text-gray-500 mt-1">Broadcast messages to users</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors">
                    <Plus className="w-5 h-5" />
                    New Notification
                </button>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search notifications..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-900">Title</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-900">Message</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-900">Target Audience</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-900">Date</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-900 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {notifications.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-teal-50 rounded-lg text-teal-600">
                                                <Bell className="w-4 h-4" />
                                            </div>
                                            <p className="font-medium text-gray-900">{item.title}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{item.message}</td>
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
                                            {item.target}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{item.date}</td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-2 text-gray-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors" title="Resend">
                                                <Send className="w-4 h-4" />
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

export default NotificationsAdmin;
