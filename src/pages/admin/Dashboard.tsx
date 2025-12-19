import { useEffect, useState } from 'react';
import { Users, Newspaper, Calendar, BookOpen, GraduationCap, Image } from 'lucide-react';
import { adminApi, DashboardStats } from '../../api/adminApi';

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
    const [dashboardData, setDashboardData] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                const data = await adminApi.getDashboardStats();
                setDashboardData(data);
                setError(null);
            } catch (err: any) {
                console.error('Error fetching dashboard data:', err);
                setError(err.response?.data?.message || 'Failed to load dashboard data');
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const stats = dashboardData ? [
        { title: 'Total Alumni', value: dashboardData.totalAlumni, icon: GraduationCap, color: 'bg-teal-500' },
        { title: 'Total Memories', value: dashboardData.totalMemories, icon: Image, color: 'bg-pink-500' },
        { title: 'Total News', value: dashboardData.totalNews, icon: Newspaper, color: 'bg-purple-500' },
        { title: 'Total Faculty', value: dashboardData.totalfaculty, icon: Users, color: 'bg-blue-500' },
        { title: 'Total Courses', value: dashboardData.totalCourses, icon: BookOpen, color: 'bg-indigo-500' },
        { title: 'Total Events', value: dashboardData.totalEvents, icon: Calendar, color: 'bg-orange-500' },
    ] : [];

    if (loading) {
        return (
            <div className="space-y-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
                    <p className="text-gray-500 mt-1">Welcome back to the admin panel.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 animate-pulse">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 rounded-xl bg-gray-200 w-12 h-12"></div>
                                <div className="h-8 w-16 bg-gray-200 rounded"></div>
                            </div>
                            <div className="h-4 w-24 bg-gray-200 rounded"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="space-y-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
                    <p className="text-gray-500 mt-1">Welcome back to the admin panel.</p>
                </div>
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    <p className="font-medium">Error loading dashboard data</p>
                    <p className="text-sm mt-1">{error}</p>
                </div>
            </div>
        );
    }

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
        </div>
    );
};

export default Dashboard;
