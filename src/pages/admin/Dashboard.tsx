import { Users, Newspaper, Calendar, BookOpen, GraduationCap } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, color }: any) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-xl ${color}`}>
                <Icon className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{value}</span>
        </div>
        <h3 className="text-gray-500 font-medium">{title}</h3>
    </div>
);

const Dashboard = () => {
    const stats = [
        { title: 'Total Students', value: '1,234', icon: Users, color: 'bg-blue-500' },
        { title: 'Alumni', value: '856', icon: GraduationCap, color: 'bg-teal-500' },
        { title: 'News Articles', value: '45', icon: Newspaper, color: 'bg-purple-500' },
        { title: 'Upcoming Events', value: '12', icon: Calendar, color: 'bg-orange-500' },
        { title: 'Active Courses', value: '24', icon: BookOpen, color: 'bg-indigo-500' },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
                <p className="text-gray-500 mt-1">Welcome back to the admin panel.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                    <StatCard key={index} {...stat} />
                ))}
            </div>

            {/* Recent Activity Section could go here */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h2>
                <div className="space-y-4">
                    <p className="text-gray-500 text-sm">No recent activity to show.</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
