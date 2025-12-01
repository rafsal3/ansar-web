import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Tag, Share2 } from 'lucide-react';

const NewsDetail = () => {
    const { id } = useParams();

    // Mock data - in a real app, this would come from an API based on the ID
    const newsItem = {
        id: id,
        date: '24 OCT 2024',
        category: 'Examination',
        title: 'Admission Open for 2024-25',
        description: 'Applications are invited for academic programs.',
        fullContent: `
            <p class="mb-4">We are pleased to announce that admissions are now open for the academic year 2024-25 for various academic programs at Ansar Higher Secondary School.</p>
            
            <h2 class="text-2xl font-bold text-gray-900 mb-3 mt-6">Eligibility Criteria</h2>
            <p class="mb-4">Candidates who have completed their 10th standard are eligible to apply for Higher Secondary programs.</p>
            
            <h2 class="text-2xl font-bold text-gray-900 mb-3 mt-6">Available Programs</h2>
            <ul class="list-disc list-inside mb-4 space-y-2">
                <li>Science Stream (PCMB)</li>
                <li>Science Stream (PCMC)</li>
                <li>Commerce with Maths</li>
                <li>Commerce with Computer Application</li>
                <li>Humanities</li>
            </ul>
            
            <h2 class="text-2xl font-bold text-gray-900 mb-3 mt-6">How to Apply</h2>
            <p class="mb-4">Interested candidates can apply online through our official website. The application form is available in the admissions section. Please ensure all required documents are uploaded before submitting the application.</p>
            
            <h2 class="text-2xl font-bold text-gray-900 mb-3 mt-6">Important Dates</h2>
            <ul class="list-disc list-inside mb-4 space-y-2">
                <li>Application Start Date: October 24, 2024</li>
                <li>Application End Date: November 30, 2024</li>
                <li>Entrance Exam Date: December 15, 2024</li>
                <li>Results Announcement: December 25, 2024</li>
            </ul>
            
            <p class="mb-4">For more information, please contact the admissions office or visit our campus during working hours.</p>
        `,
        image: null
    };

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
                    {/* Image Placeholder */}
                    <div className="h-96 bg-gray-200 w-full relative">
                        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                            <span className="text-sm">Image Placeholder</span>
                        </div>
                    </div>

                    <div className="p-8 md:p-12">
                        {/* Meta Information */}
                        <div className="flex flex-wrap items-center gap-4 mb-6">
                            <div className="flex items-center text-gray-500 text-sm">
                                <Calendar className="w-4 h-4 mr-2" />
                                {newsItem.date}
                            </div>
                            <div className="flex items-center">
                                <Tag className="w-4 h-4 mr-2 text-blue-600" />
                                <span className="px-3 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded-full">
                                    {newsItem.category}
                                </span>
                            </div>
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
                            {newsItem.title}
                        </h1>

                        {/* Description */}
                        <p className="text-xl text-gray-600 mb-8">
                            {newsItem.description}
                        </p>

                        {/* Divider */}
                        <div className="border-t border-gray-200 my-8"></div>

                        {/* Full Content */}
                        <div
                            className="prose prose-lg max-w-none text-gray-700"
                            dangerouslySetInnerHTML={{ __html: newsItem.fullContent }}
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

                {/* Related News Section */}
                <div className="mt-12">
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
                </div>
            </div>
        </div>
    );
};

export default NewsDetail;
