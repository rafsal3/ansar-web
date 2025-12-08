import { useState, useEffect } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getAllNews, type News as NewsType } from '@/api';
import { API_BASE_URL } from '@/api';

const News = () => {
    const [activeFilter, setActiveFilter] = useState('All');
    const [newsItems, setNewsItems] = useState<NewsType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    const filters = ['All', 'Academic', 'Admission', 'Cultural', 'Examination', 'Events'];

    useEffect(() => {
        const fetchNews = async () => {
            try {
                setLoading(true);
                const response = await getAllNews({
                    limit: 50,
                    page: currentPage,
                    category: activeFilter !== 'All' ? activeFilter.toLowerCase() : undefined
                });

                // Extract data from paginated response
                setNewsItems(response.data);
                setTotalPages(response.meta.totalPages);
            } catch (err: any) {
                console.error('Error fetching news:', err);
                setError('Failed to load news. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, [currentPage, activeFilter]);

    const filteredNews = newsItems;

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

                {/* Loading State */}
                {loading && (
                    <div className="flex justify-center items-center py-20">
                        <Loader2 className="w-12 h-12 animate-spin text-teal-600" />
                    </div>
                )}

                {/* Error State */}
                {error && !loading && (
                    <div className="text-center py-20">
                        <p className="text-red-600">{error}</p>
                    </div>
                )}

                {/* News Grid */}
                {!loading && !error && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredNews.length > 0 ? (
                            filteredNews.map((item) => (
                                <div key={item.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
                                    {/* Image */}
                                    <div className="h-48 bg-gray-200 w-full relative overflow-hidden">
                                        {item.images && item.images.length > 0 ? (
                                            <img
                                                src={`${API_BASE_URL}${item.images[0].imageUrl}`}
                                                alt={item.title}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                                                <span className="text-sm">No Image</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-6">
                                        <div className="flex justify-between items-center mb-4">
                                            <span className="text-xs font-medium text-gray-500">
                                                {new Date(item.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }).toUpperCase()}
                                            </span>
                                            <span className="px-3 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded-full capitalize">
                                                {item.category}
                                            </span>
                                        </div>

                                        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{item.title}</h3>
                                        <p className="text-gray-600 mb-6 text-sm line-clamp-3">{item.content || 'No description available'}</p>

                                        <Link
                                            to={`/news/${item.id}`}
                                            className="flex items-center text-teal-600 font-medium text-sm hover:text-teal-700 transition-colors"
                                        >
                                            Read More <ArrowRight className="w-4 h-4 ml-2" />
                                        </Link>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-20">
                                <p className="text-gray-600">No news articles found.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default News;
