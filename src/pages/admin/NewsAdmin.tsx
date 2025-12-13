import { useState } from 'react';
import { Plus, Pencil, Trash2, Search, X, Upload, Image as ImageIcon } from 'lucide-react';

interface NewsItem {
    id: number;
    title: string;
    date: string;
    category: string;
    status: 'Published' | 'Draft';
    images: string[];
    content?: string;
}

const NewsAdmin = () => {
    const [news, setNews] = useState<NewsItem[]>([
        {
            id: 1,
            title: 'School Annual Day Announced',
            date: '2024-03-15',
            category: 'Events',
            status: 'Published',
            images: ['https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80']
        },
        {
            id: 2,
            title: 'New Computer Lab Inauguration',
            date: '2024-03-10',
            category: 'Infrastructure',
            status: 'Published',
            images: []
        },
        {
            id: 3,
            title: 'Exam Schedule Released',
            date: '2024-03-05',
            category: 'Academic',
            status: 'Draft',
            images: []
        },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
    const [previewImages, setPreviewImages] = useState<string[]>([]);

    // Form States
    const [formData, setFormData] = useState<Partial<NewsItem>>({
        title: '',
        category: 'Events',
        status: 'Draft',
        content: '',
        date: new Date().toISOString().split('T')[0]
    });

    const handleOpenModal = (newsItem?: NewsItem) => {
        if (newsItem) {
            setEditingNews(newsItem);
            setFormData(newsItem);
            setPreviewImages(newsItem.images || []);
        } else {
            setEditingNews(null);
            setFormData({
                title: '',
                category: 'Events',
                status: 'Draft',
                content: '',
                date: new Date().toISOString().split('T')[0]
            });
            setPreviewImages([]);
        }
        setIsModalOpen(true);
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            const newImageUrls = files.map(file => URL.createObjectURL(file));
            setPreviewImages(prev => [...prev, ...newImageUrls]);
        }
    };

    const removeImage = (index: number) => {
        setPreviewImages(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, you would upload images to server here
        // and get back the URLs

        const newItem: NewsItem = {
            id: editingNews ? editingNews.id : Date.now(),
            title: formData.title || '',
            category: formData.category as string,
            date: formData.date as string,
            status: formData.status as 'Published' | 'Draft',
            images: previewImages,
            content: formData.content
        };

        if (editingNews) {
            setNews(news.map(n => n.id === editingNews.id ? newItem : n));
        } else {
            setNews([newItem, ...news]);
        }
        setIsModalOpen(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">News Management</h1>
                    <p className="text-gray-500 mt-1">Create and manage news articles</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    Add News
                </button>
            </div>

            {/* Filters & Search */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search news..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                </div>
                <select className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500">
                    <option value="">All Categories</option>
                    <option value="Events">Events</option>
                    <option value="Academic">Academic</option>
                </select>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-900">Title</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-900">Category</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-900">Date</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-900">Images</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-900">Status</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-900 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {news.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <p className="font-medium text-gray-900">{item.title}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
                                            {item.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{item.date}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        <div className="flex items-center gap-1">
                                            <ImageIcon className="w-4 h-4" />
                                            <span>{item.images?.length || 0}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${item.status === 'Published'
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-yellow-100 text-yellow-700'
                                            }`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => handleOpenModal(item)}
                                                className="p-2 text-gray-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
                                            >
                                                <Pencil className="w-4 h-4" />
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

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
                            <h2 className="text-xl font-bold text-gray-900">
                                {editingNews ? 'Edit News' : 'Add New News'}
                            </h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    placeholder="Enter news title"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    >
                                        <option value="Events">Events</option>
                                        <option value="Academic">Academic</option>
                                        <option value="Infrastructure">Infrastructure</option>
                                        <option value="Sports">Sports</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                                    <select
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    >
                                        <option value="Draft">Draft</option>
                                        <option value="Published">Published</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                                <input
                                    type="date"
                                    required
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Images</label>
                                <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-teal-500 transition-colors cursor-pointer relative">
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                    <p className="text-sm text-gray-500">Click to upload images (Multiple allowed)</p>
                                </div>

                                {/* Image Preview Grid */}
                                {previewImages.length > 0 && (
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                                        {previewImages.map((url, index) => (
                                            <div key={index} className="relative group aspect-video rounded-lg overflow-hidden bg-gray-100">
                                                <img
                                                    src={url}
                                                    alt={`Preview ${index}`}
                                                    className="w-full h-full object-cover"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeImage(index)}
                                                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <X className="w-3 h-3" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                                <textarea
                                    rows={5}
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    placeholder="Write your news content here..."
                                />
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-6 py-2 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700 font-medium"
                                >
                                    {editingNews ? 'Save Changes' : 'Create News'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NewsAdmin;
