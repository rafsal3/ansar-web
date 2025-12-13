import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Tag, Share2 } from 'lucide-react';
import ImageSlider from '../components/ImageSlider';
import { getNewsById, News } from '../api/newsApi';
import { API_BASE_URL } from '../api/apiClient';

const NewsDetail = () => {
    const { id } = useParams();
    const [newsItem, setNewsItem] = useState<News | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchNewsDetail = async () => {
            if (!id) return;
            try {
                const data = await getNewsById(Number(id));
                setNewsItem(data);
            } catch (err) {
                console.error("Failed to fetch news detail:", err);
                setError("Failed to load news article.");
            } finally {
                setLoading(false);
            }
        };

        fetchNewsDetail();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-teal-600 text-lg">Loading article...</div>
            </div>
        );
    }

    if (error || !newsItem) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-red-500">{error || "Article not found"}</div>
                <Link to="/news" className="ml-4 text-teal-600 hover:underline">
                    Back to News
                </Link>
            </div>
        );
    }

    // Prepare images for slider
    const sliderImages = newsItem.images && newsItem.images.length > 0
        ? newsItem.images.map(img => `${API_BASE_URL}${img.imageUrl}`)
        : [];

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Button */}
                <Link
                    to="/news"
                    className="inline-flex items-center text-teal-600 hover:text-teal-700 mb-8 font-medium"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to News
                </Link>

                {/* News Article */}
                <article className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    {/* Image Slider */}
                    <div className="w-full">
                        <ImageSlider images={sliderImages} />
                    </div>

                    <div className="p-8 md:p-12">
                        {/* Meta Information */}
                        <div className="flex flex-wrap items-center gap-4 mb-6">
                            <div className="flex items-center text-gray-500 text-sm">
                                <Calendar className="w-4 h-4 mr-2" />
                                {new Date(newsItem.date).toLocaleDateString()}
                            </div>
                            <div className="flex items-center">
                                <Tag className="w-4 h-4 mr-2 text-blue-600" />
                                <span className="px-3 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded-full uppercase">
                                    {newsItem.category}
                                </span>
                            </div>
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
                            {newsItem.title}
                        </h1>

                        {/* Description - if separate from content, otherwise maybe just content */}
                        {/* <p className="text-xl text-gray-600 mb-8">
                            {newsItem.description}
                        </p> */}

                        {/* Divider */}
                        <div className="border-t border-gray-200 my-8"></div>

                        {/* Full Content */}
                        <div
                            className="prose prose-lg max-w-none text-gray-700"
                            dangerouslySetInnerHTML={{ __html: newsItem.content || '' }}
                        />

                        {/* Share Section */}
                        <div className="border-t border-gray-200 mt-12 pt-8">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-bold text-gray-900">Share this article</h3>
                                <button className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition-colors">
                                    <Share2 className="w-4 h-4" />
                                    Share
                                </button>
                            </div>
                        </div>
                    </div>
                </article>

                {/* Related News Section - Placeholder for now as API might not support it directly yet */}
                {/* <div className="mt-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Related News</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[1, 2].map((item) => (
                            <Link
                                key={item}
                                to={`/news/${item}`}
                                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                            >
                                <div className="flex justify-between items-center mb-3">
                                    <span className="text-xs font-medium text-gray-500">24 OCT 2024</span>
                                    <span className="px-3 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded-full">
                                        Examination
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">Related News Title {item}</h3>
                                <p className="text-gray-600 text-sm">Brief description of the related news article.</p>
                            </Link>
                        ))}
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default NewsDetail;
