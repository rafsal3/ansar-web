import { useState, useEffect, ChangeEvent } from 'react';
import { Upload, User, ChevronDown, ChevronLeft, ChevronRight, X, Image, Trash2, Eye } from 'lucide-react';

import { API_BASE_URL } from '../api/apiClient';
import { useAuth } from '../contexts/AuthContext';
import { memoryApi, PublicMemory, MyMemory } from '../api/memoryApi';
import ImageSlider from '../components/ImageSlider';

interface Memory {
    id: number;
    title: string;
    description?: string;
    author: string;
    batch: string;
    date: string;
    images: string[];
    isApproved?: boolean;
    status?: string;
}

type TabType = 'all' | 'my';

const Memories = () => {
    const { user } = useAuth();
    const [selectedBatch, setSelectedBatch] = useState<string>('Class of 2010');
    const [sortBy, setSortBy] = useState<string>('Sort by Date');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [memoryDescription, setMemoryDescription] = useState<string>('');
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [activeTab, setActiveTab] = useState<TabType>('all');
    const [viewingMemory, setViewingMemory] = useState<Memory | null>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const batches: string[] = ['Class of 2010', 'Class of 2011', 'Class of 2012', 'Class of 2013', 'Class of 2014'];
    const sortOptions: string[] = ['Sort by Date', 'Sort by Name', 'Sort by Batch'];

    const [allMemories, setAllMemories] = useState<Memory[]>([]);
    const [myMemoriesList, setMyMemoriesList] = useState<Memory[]>([]); // Renamed to avoid conflict if any, though previous was myMemories
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isMyMemoriesLoading, setIsMyMemoriesLoading] = useState<boolean>(false);
    const [totalPages, setTotalPages] = useState<number>(1);

    const fetchMemories = async () => {
        try {
            setIsLoading(true);
            const response = await memoryApi.getAllMemories(currentPage, 9); // limit 9 for grid layout

            const formattedMemories: Memory[] = response.data.map((item: PublicMemory) => ({
                id: item.id,
                title: item.description.length > 50 ? item.description.substring(0, 50) + '...' : item.description,
                description: item.description,
                author: item.user.name,
                batch: '', // Batch is not returned in listing API currently
                date: new Date(item.createdAt).toLocaleDateString('en-US'),
                images: item.photos.length > 0 ? item.photos.map(p => `${API_BASE_URL}/uploads/${p.url}`) : []
            }));

            setAllMemories(formattedMemories);
            setTotalPages(response.meta.totalPages);
        } catch (error) {
            console.error("Failed to fetch memories:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchMyMemories = async () => {
        if (!user) return;
        try {
            setIsMyMemoriesLoading(true);
            const response = await memoryApi.getMyMemories(1, 100); // Fetch all or paginate similarly if needed

            const formattedMemories: Memory[] = response.data.map((item: MyMemory) => ({
                id: item.id,
                title: item.description.length > 50 ? item.description.substring(0, 50) + '...' : item.description,
                description: item.description,
                author: 'You', // It's my memory
                batch: (user as any).batch || '', // Use user's batch
                date: new Date(item.createdAt).toLocaleDateString('en-US'),
                images: item.photos.length > 0 ? item.photos.map(p => `${API_BASE_URL}/uploads/${p.url}`) : [],
                isApproved: item.isApproved,
                status: item.status
            }));

            setMyMemoriesList(formattedMemories);
        } catch (error) {
            console.error("Failed to fetch my memories:", error);
        } finally {
            setIsMyMemoriesLoading(false);
        }
    };

    useEffect(() => {
        if (activeTab === 'all') {
            fetchMemories();
        } else if (activeTab === 'my') {
            fetchMyMemories();
        }
    }, [currentPage, activeTab]);


    const handleDeleteMemory = async (id: number): Promise<void> => {
        if (window.confirm("Are you sure you want to delete this memory?")) {
            try {
                await memoryApi.deleteMemory(id);
                setMyMemoriesList(myMemoriesList.filter(m => m.id !== id));
            } catch (error) {
                console.error("Failed to delete memory:", error);
                alert("Failed to delete memory.");
            }
        }
    };

    const handleViewMemory = (memory: Memory): void => {
        setViewingMemory(memory);
        setMemoryDescription(memory.description || '');
        setSelectedFiles([]);
        setIsModalOpen(true);
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            setSelectedFiles((prevFiles) => [...prevFiles, ...filesArray]);
        }
    };

    const removeFile = (index: number) => {
        setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    const handleSaveMemory = async (): Promise<void> => {
        if (!user) {
            alert("Please login to share a memory.");
            return;
        }

        if (viewingMemory) {
            // View mode only, close modal
            setViewingMemory(null);
            setIsModalOpen(false);
            setMemoryDescription('');
            setSelectedFiles([]);
            return;
        }

        // Create logic
        try {
            setIsSubmitting(true);
            await memoryApi.createMemory({
                description: memoryDescription,
                status: 'active',
                userId: user.id,
                photos: selectedFiles
            });

            // Refresh list after create
            if (activeTab === 'my') {
                fetchMyMemories();
            } else {
                // Switch to 'My Memories' tab to show the new memory and trigger fetch
                setActiveTab('my');
            }

            setIsModalOpen(false);
            setMemoryDescription('');
            setSelectedFiles([]);

        } catch (error) {
            console.error("Failed to create memory:", error);
            alert("Failed to share memory. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Batch Memories</h1>
                    <p className="text-gray-600">A legacy of excellence, integrity, and community service.</p>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-8 border-b border-gray-200">
                    <button
                        onClick={() => setActiveTab('all')}
                        className={`px-6 py-3 font-medium transition-colors relative ${activeTab === 'all'
                            ? 'text-purple-600'
                            : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        All Memories
                        {activeTab === 'all' && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600"></div>
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab('my')}
                        className={`px-6 py-3 font-medium transition-colors relative ${activeTab === 'my'
                            ? 'text-purple-600'
                            : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        My Memories
                        {activeTab === 'my' && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600"></div>
                        )}
                    </button>
                </div>

                {/* Controls */}
                {activeTab === 'all' && (
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
                )}

                {/* Memories Grid */}
                {activeTab === 'all' && (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                            {isLoading ? (
                                <div className="col-span-full flex justify-center py-12">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                                </div>
                            ) : allMemories.length === 0 ? (
                                <div className="col-span-full text-center py-12 text-gray-500">
                                    No memories found.
                                </div>
                            ) : (
                                allMemories.map((memory) => (
                                    <div key={memory.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
                                        {/* Image Slider or Single Image */}
                                        <div className="h-64 w-full relative overflow-hidden">
                                            {memory.images && memory.images.length > 0 ? (
                                                <ImageSlider images={memory.images} className="h-64" />
                                            ) : (
                                                <div className="bg-gradient-to-br from-gray-200 to-gray-300 w-full h-full flex items-center justify-center text-gray-400">
                                                    <span className="text-sm">No Image</span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="p-6">
                                            {/* Title */}
                                            <h3 className="text-lg font-bold text-gray-900 mb-4">{memory.title}</h3>

                                            {/* Author & Batch */}
                                            <div className="flex items-center justify-between text-sm">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
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
                                ))
                            )}
                        </div>

                        {/* Pagination */}
                        {/* Only show pagination if there are pages */}
                        {totalPages > 1 && (
                            <div className="flex justify-center items-center gap-2">
                                <button
                                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                    disabled={currentPage === 1}
                                    className="p-2 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                                </button>

                                {(() => {
                                    const pages = [];
                                    const maxVisible = 3;
                                    let start = Math.max(1, currentPage - 1);
                                    let end = Math.min(start + maxVisible - 1, totalPages);

                                    if (end - start + 1 < maxVisible) {
                                        start = Math.max(1, end - maxVisible + 1);
                                    }

                                    // Ensure start is at least 1
                                    start = Math.max(1, start);

                                    for (let i = start; i <= end; i++) {
                                        pages.push(i);
                                    }
                                    return pages.map(page => (
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
                                    ));
                                })()}


                                {totalPages > 3 && currentPage < totalPages - 1 && (
                                    <span className="px-2 text-gray-500">...</span>
                                )}

                                {totalPages > 3 && currentPage < totalPages && (
                                    <button
                                        onClick={() => setCurrentPage(totalPages)}
                                        className={`w-10 h-10 rounded-lg font-medium transition-colors ${currentPage === totalPages
                                            ? 'bg-teal-600 text-white'
                                            : 'hover:bg-gray-200 text-gray-700'
                                            }`}
                                    >
                                        {totalPages}
                                    </button>
                                )}

                                <button
                                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                    disabled={currentPage === totalPages}
                                    className="p-2 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <ChevronRight className="w-5 h-5 text-gray-600" />
                                </button>
                            </div>
                        )}
                    </>
                )}

                {/* My Memories Section */}
                {activeTab === 'my' && (
                    <div>
                        {isMyMemoriesLoading ? (
                            <div className="flex justify-center py-12">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                            </div>
                        ) : myMemoriesList.length === 0 ? (
                            <div className="flex items-center justify-center py-16">
                                <div className="max-w-md w-full">
                                    <div className="bg-white rounded-3xl p-12 text-center border-2 border-dashed border-gray-300 hover:border-purple-300 transition-colors">
                                        <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <Image className="w-10 h-10 text-purple-600" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                            No Memories Yet
                                        </h3>
                                        <p className="text-gray-600 mb-8">
                                            Share your first memory with your batch mates and start building your legacy.
                                        </p>
                                        <button
                                            onClick={() => setIsModalOpen(true)}
                                            className="inline-flex items-center gap-2 px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-xl transition-colors shadow-lg shadow-purple-200"
                                        >
                                            <Upload className="w-5 h-5" />
                                            Share Your First Memory
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {myMemoriesList.map((memory) => (
                                    <div key={memory.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 relative">
                                        {/* Status Badge from API */}
                                        <div className={`absolute top-4 right-4 z-10 px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${memory.isApproved
                                            ? 'bg-green-100 text-green-700 border border-green-200'
                                            : 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                                            }`}>
                                            {memory.isApproved ? 'Approved' : 'Pending'}
                                        </div>
                                        {/* Image Slider */}
                                        <div className="h-64 w-full relative overflow-hidden">
                                            {memory.images && memory.images.length > 0 ? (
                                                <ImageSlider images={memory.images} className="h-64" />
                                            ) : (
                                                <div className="bg-gradient-to-br from-purple-200 to-purple-300 w-full h-full flex items-center justify-center text-purple-600">
                                                    <span className="text-sm font-medium">Your Memory</span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="p-6">
                                            {/* Title */}
                                            <h3 className="text-lg font-bold text-gray-900 mb-4 line-clamp-2">{memory.title}</h3>

                                            {/* Author & Batch */}
                                            <div className="flex items-center justify-between text-sm mb-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                                                        <User className="w-4 h-4 text-white" />
                                                    </div>
                                                    <span className="font-medium text-gray-700">{memory.author}</span>
                                                </div>
                                                <span className="text-gray-500">{memory.batch}</span>
                                            </div>

                                            {/* Date */}
                                            <div className="text-sm text-gray-500 mb-4">{memory.date}</div>

                                            {/* Action Buttons */}
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleViewMemory(memory)}
                                                    className="flex-1 px-4 py-2 bg-purple-100 text-purple-600 font-medium rounded-lg hover:bg-purple-200 transition-colors text-sm flex items-center justify-center gap-2"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                    View
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteMemory(memory.id)}
                                                    className="flex-1 px-4 py-2 bg-red-100 text-red-600 font-medium rounded-lg hover:bg-red-200 transition-colors text-sm flex items-center justify-center gap-2"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Share Memory Modal (Create) */}
            {isModalOpen && !viewingMemory && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-8">
                            {/* Modal Header */}
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
                                        Share a memory
                                    </h2>
                                    <p className="text-gray-500">A legacy of excellence, integrity, and community service.</p>
                                </div>
                                <button
                                    onClick={() => {
                                        setIsModalOpen(false);
                                        setMemoryDescription('');
                                        setViewingMemory(null);
                                        setSelectedFiles([]);
                                    }}
                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Photo Upload Area */}
                            <div className="mb-6">
                                <label className="block text-base font-semibold text-gray-900 mb-3">
                                    Photos
                                </label>
                                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center">
                                    <div className="flex flex-col items-center">
                                        {selectedFiles.length === 0 ? (
                                            <>
                                                <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mb-4">
                                                    <Image className="w-8 h-8 text-purple-600" />
                                                </div>
                                                <h3 className="text-lg font-bold text-gray-900 mb-2">Add Photos</h3>
                                                <p className="text-gray-500 mb-4">Drag & drop files here or click to browse</p>
                                            </>
                                        ) : (
                                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full mb-4">
                                                {selectedFiles.map((file, index) => (
                                                    <div key={index} className="relative group aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                                                        <img
                                                            src={URL.createObjectURL(file)}
                                                            alt={`Preview ${index}`}
                                                            className="w-full h-full object-cover"
                                                        />
                                                        <button
                                                            onClick={() => removeFile(index)}
                                                            className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        <div className="relative">
                                            <input
                                                type="file"
                                                multiple
                                                accept="image/*"
                                                onChange={handleFileChange}
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            />
                                            <button className="flex items-center gap-2 px-6 py-3 bg-purple-100 text-purple-600 font-medium rounded-xl hover:bg-purple-200 transition-colors pointer-events-none">
                                                <Upload className="w-5 h-5" />
                                                {selectedFiles.length > 0 ? 'Add More Photos' : 'Upload Photos'}
                                            </button>
                                        </div>
                                        {selectedFiles.length > 0 && (
                                            <p className="mt-3 text-sm text-gray-500">
                                                {selectedFiles.length} photo{selectedFiles.length !== 1 ? 's' : ''} selected
                                            </p>
                                        )}
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
                                    onClick={() => {
                                        setIsModalOpen(false);
                                        setMemoryDescription('');
                                        setViewingMemory(null);
                                        setSelectedFiles([]);
                                    }}
                                    className="px-8 py-3 bg-purple-100 text-purple-600 font-medium rounded-xl hover:bg-purple-200 transition-colors"
                                    disabled={isSubmitting}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSaveMemory}
                                    disabled={isSubmitting}
                                    className="px-8 py-3 bg-purple-600 text-white font-medium rounded-xl hover:bg-purple-700 transition-colors shadow-lg shadow-purple-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            Saving...
                                        </>
                                    ) : (
                                        'Share your Memory'
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* View Memory Modal */}
            {isModalOpen && viewingMemory && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
                        {/* Header */}
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">Memory Details</h2>
                                <p className="text-sm text-gray-500 mt-1">
                                    Shared on {viewingMemory.date}
                                </p>
                            </div>
                            <button
                                onClick={() => {
                                    setIsModalOpen(false);
                                    setMemoryDescription('');
                                    setViewingMemory(null);
                                }}
                                className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-500 hover:text-gray-700 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-0">
                            <div className="flex flex-col md:flex-row h-full">
                                {/* Left Side: Images */}
                                <div className="w-full md:w-1/2 bg-gray-100 min-h-[300px] md:min-h-[500px] relative flex flex-col justify-center">
                                    {viewingMemory.images && viewingMemory.images.length > 0 ? (
                                        <div className="h-full w-full">
                                            <ImageSlider images={viewingMemory.images} className="h-full w-full object-contain" />
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center h-full text-gray-400 p-8">
                                            <Image className="w-16 h-16 mb-4 opacity-50" />
                                            <span className="text-lg font-medium">No Images</span>
                                        </div>
                                    )}
                                </div>

                                {/* Right Side: Content */}
                                <div className="w-full md:w-1/2 p-8 flex flex-col">
                                    <div className="mb-6">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${viewingMemory.isApproved
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-yellow-100 text-yellow-700'
                                                }`}>
                                                {viewingMemory.isApproved ? 'Approved' : 'Pending Review'}
                                            </div>
                                            <span className="text-sm text-gray-400">
                                                ID: #{viewingMemory.id}
                                            </span>
                                        </div>

                                        <h3 className="text-xl font-bold text-gray-900 mb-4">Description</h3>
                                        <div className="prose prose-purple max-w-none text-gray-600 leading-relaxed whitespace-pre-wrap">
                                            {viewingMemory.description || "No description provided."}
                                        </div>
                                    </div>

                                    <div className="mt-auto pt-6 border-t border-gray-100">
                                        <div className="flex items-center gap-4 text-sm text-gray-500">
                                            <div className="flex items-center gap-2">
                                                <User className="w-4 h-4" />
                                                <span>You</span>
                                            </div>
                                            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                                            <div>
                                                {viewingMemory.batch}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div >
    );
};

export default Memories;