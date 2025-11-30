import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

const News = () => {
    const [activeFilter, setActiveFilter] = useState('All');

    const filters = ['All', 'Academic', 'Admission', 'Cultural', 'Examination'];

    const newsItems = [
        {
            id: 1,
            date: '24 OCT 2024',
            category: 'Examination',
            title: 'Admission Open for 2024-25',
            description: 'Applications are invited for UG and PG programs.',
            image: null // Placeholder
        },
        {
            id: 2,
            date: '24 OCT 2024',
            category: 'Examination',
            title: 'Admission Open for 2024-25',
            description: 'Applications are invited for UG and PG programs.',
            image: null
        },
        {
            id: 3,
            date: '24 OCT 2024',
            category: 'Examination',
            title: 'Admission Open for 2024-25',
            description: 'Applications are invited for UG and PG programs.',
            image: null
        },
        {
            id: 4,
            date: '24 OCT 2024',
            category: 'Examination',
            title: 'Admission Open for 2024-25',
            description: 'Applications are invited for UG and PG programs.',
            image: null
        },
        {
            id: 5,
            date: '24 OCT 2024',
            category: 'Examination',
            title: 'Admission Open for 2024-25',
            description: 'Applications are invited for UG and PG programs.',
            image: null
        },
        {
            id: 6,
            date: '24 OCT 2024',
            category: 'Examination',
            title: 'Admission Open for 2024-25',
            description: 'Applications are invited for UG and PG programs.',
            image: null
        }
    ];

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900">News & Announcements</h1>
                    <p className="mt-2 text-lg text-gray-600">Stay updated with the latest happenings on campus.</p>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-4 mb-12 justify-center">
                    {filters.map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${activeFilter === filter
                                    ? 'bg-teal-600 text-white'
                                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                                }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                {/* News Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {newsItems.map((item) => (
                        <div key={item.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
                            {/* Image Placeholder */}
                            <div className="h-48 bg-gray-200 w-full relative">
                                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                                    <span className="text-sm">Image Placeholder</span>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-xs font-medium text-gray-500">{item.date}</span>
                                    <span className="px-3 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded-full">
                                        {item.category}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-gray-600 mb-6 text-sm">{item.description}</p>

                                <button className="flex items-center text-teal-600 font-medium text-sm hover:text-teal-700 transition-colors">
                                    Read More <ArrowRight className="w-4 h-4 ml-2" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default News;
