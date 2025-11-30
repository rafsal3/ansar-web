import { useState } from 'react';
import { Upload, User, ChevronDown, ChevronLeft, ChevronRight, X, Image as ImageIcon } from 'lucide-react';

const Memories = () => {
    const [selectedBatch, setSelectedBatch] = useState('Class of 2010');
    const [sortBy, setSortBy] = useState('Sort by Date');
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [memoryDescription, setMemoryDescription] = useState('');

    const batches = ['Class of 2010', 'Class of 2011', 'Class of 2012', 'Class of 2013', 'Class of 2014'];
    const sortOptions = ['Sort by Date', 'Sort by Name', 'Sort by Batch'];

    const memories = [
        {
            id: 1,
            title: 'Graduation day! Best moments with the squad.',
            author: 'Alice Johnson',
            batch: '2010 Batch',
            date: '12/20/2020',
            image: null
        },
        {
            id: 2,
            title: 'Graduation day! Best moments with the squad.',
            author: 'Haylie Calzoni',
            batch: '2010 Batch',
            date: '6/7/2012',
            image: null
        },
        {
            id: 3,
            title: 'Graduation day! Best moments with the squad.',
            author: 'Lincoln Vetrovs',
            batch: '2010 Batch',
            date: '4/19/2015',
            image: null
        },
        {
            id: 4,
            title: 'Graduation day! Best moments with the squad.',
            author: 'Marley Saris',
            batch: '2010 Batch',
            date: '1/25/2018',
            image: null
        },
        {
            id: 5,
            title: 'Graduation day! Best moments with the squad.',
            author: 'Phillip Stanton',
            batch: '2010 Batch',
            date: '3/13/2012',
            image: null
        },
        {
            id: 6,
            title: 'Graduation day! Best moments with the squad.',
            author: 'Abram Aminoff',
            batch: '2010 Batch',
            date: '2/20/2017',
            image: null
        }
    ];

    const totalPages = 10;

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Batch Memories</h1>
                    <p className="text-gray-600">A legacy of excellence, integrity, and community service.</p>
                </div>

                {/* Controls */}
                <div className="flex justify-between items-center mb-8">
                    <div className="flex gap-4">
                        {/* Batch Dropdown */}
                        <div className="relative">
                            <select
                                value={selectedBatch}
                                onChange={(e) => setSelectedBatch(e.target.value)}
                                className="appearance-none bg-white border border-gray-300 rounded-xl px-4 py-3 pr-10 text-sm font-medium text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent cursor-pointer"
                            >
                                {batches.map((batch) => (
                                    <option key={batch} value={batch}>{batch}</option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                        </div>

                        {/* Sort Dropdown */}
                        <div className="relative">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="appearance-none bg-white border border-gray-300 rounded-xl px-4 py-3 pr-10 text-sm font-medium text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent cursor-pointer"
                            >
                                {sortOptions.map((option) => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                        </div>
                    </div>

                    {/* Share Button */}
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-xl transition-colors shadow-lg shadow-purple-200"
                    >
                        <Upload className="w-5 h-5" />
                        Share your Memories
                    </button>
                </div>

                {/* Memories Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {memories.map((memory) => (
                        <div key={memory.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
                            {/* Image Placeholder */}
                            <div className="h-64 bg-gradient-to-br from-gray-200 to-gray-300 w-full relative">
                                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                                    <span className="text-sm">Image Placeholder</span>
                                </div>
                            </div>

                            <div className="p-6">
                                {/* Title */}
                                <h3 className="text-lg font-bold text-gray-900 mb-4">{memory.title}</h3>

                                {/* Author & Batch */}
                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                                            <User className="w-4 h-4 text-gray-600" />
                                        </div>
                                        <span className="font-medium text-gray-700">{memory.author}</span>
                                    </div>
                                    <span className="text-gray-500">{memory.batch}</span>
                                </div>

                                {/* Date */}
                                <div className="mt-2 text-sm text-gray-500">{memory.date}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center items-center gap-2">
                    <button
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="p-2 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5 text-gray-600" />
                    </button>

                    {[1, 2, 3].map((page) => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`w-10 h-10 rounded-lg font-medium transition-colors ${currentPage === page
                                ? 'bg-teal-600 text-white'
                                : 'hover:bg-gray-200 text-gray-700'
                                }`}
                        >
                            {page}
                        </button>
                    ))}

                    <span className="px-2 text-gray-500">...</span>

                    <button
                        onClick={() => setCurrentPage(totalPages)}
                        className={`w-10 h-10 rounded-lg font-medium transition-colors ${currentPage === totalPages
                            ? 'bg-teal-600 text-white'
                            : 'hover:bg-gray-200 text-gray-700'
                            }`}
                    >
                        {totalPages}
                    </button>

                    <button
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronRight className="w-5 h-5 text-gray-600" />
                    </button>
                </div>
            </div>

            {/* Share Memory Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-8">
                            {/* Modal Header */}
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Share a memory</h2>
                                    <p className="text-gray-500">A legacy of excellence, integrity, and community service.</p>
                                </div>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Photo Upload Area */}
                            <div className="mb-6">
                                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center">
                                    <div className="flex flex-col items-center">
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">Add Photo</h3>
                                        <p className="text-gray-500 mb-6">Drag & drop files here or click to browse</p>
                                        <button className="flex items-center gap-2 px-6 py-3 bg-purple-100 text-purple-600 font-medium rounded-xl hover:bg-purple-200 transition-colors">
                                            <ImageIcon className="w-5 h-5" />
                                            Upload Photo
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="mb-6">
                                <label className="block text-base font-semibold text-gray-900 mb-3">
                                    What is this memory about?
                                </label>
                                <textarea
                                    value={memoryDescription}
                                    onChange={(e) => setMemoryDescription(e.target.value)}
                                    placeholder="Tell your story"
                                    rows={8}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                                />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-4 justify-end">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-8 py-3 bg-purple-100 text-purple-600 font-medium rounded-xl hover:bg-purple-200 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        // Handle memory submission
                                        console.log('Memory submitted:', memoryDescription);
                                        setIsModalOpen(false);
                                        setMemoryDescription('');
                                    }}
                                    className="px-8 py-3 bg-purple-600 text-white font-medium rounded-xl hover:bg-purple-700 transition-colors shadow-lg shadow-purple-200"
                                >
                                    Share your Memory
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Memories;
