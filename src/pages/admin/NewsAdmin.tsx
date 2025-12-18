import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, X, Upload, Image as ImageIcon } from 'lucide-react';
import { getAllNews, News, createNews, updateNews, deleteNews, CreateNewsPayload } from '../../api/newsApi';
import { API_BASE_URL } from '../../api/apiClient';
import Pagination from '../../components/Pagination';



const NewsAdmin = () => {
    const [news, setNews] = useState<News[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingNews, setEditingNews] = useState<News | null>(null);
    const [previewImages, setPreviewImages] = useState<string[]>([]);
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPrevPage, setHasPrevPage] = useState(false);

    // Form States
    const [formData, setFormData] = useState<Partial<CreateNewsPayload>>({
        title: '',
        category: 'academic',
        status: 'draft',
        date: new Date().toISOString().split('T')[0],
        content: ''
    });

    const [submitting, setSubmitting] = useState(false);

    // Fetch news on component mount
    useEffect(() => {
        fetchNews(currentPage);
    }, [currentPage]);

    const fetchNews = async (page: number = 1) => {
        try {
            setLoading(true);
            const response = await getAllNews({ page, limit: 5, status: 'publish,draft' });
            setNews(response.data);
            setCurrentPage(response.meta.page);
            setTotalPages(response.meta.totalPages);
            setHasNextPage(response.meta.hasNextPage || false);
            setHasPrevPage(response.meta.hasPrevPage || false);
            setError(null);
        } catch (err) {
            console.error('Failed to fetch news:', err);
            setError('Failed to load news. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (newsItem?: News) => {
        if (newsItem) {
            setEditingNews(newsItem);
            setFormData({
                title: newsItem.title,
                category: newsItem.category,
                status: newsItem.status,
                date: newsItem.date,
                content: newsItem.content || ''
            });
            // Set preview images from existing news
            const imageUrls = newsItem.images?.map(img => `${API_BASE_URL}${img.imageUrl}`) || [];
            setPreviewImages(imageUrls);
            setUploadedFiles([]);
        } else {
            setEditingNews(null);
            setFormData({
                title: '',
                category: 'academic',
                status: 'draft',
                date: new Date().toISOString().split('T')[0],
                content: ''
            });
            setPreviewImages([]);
            setUploadedFiles([]);
        }
        setIsModalOpen(true);
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            setUploadedFiles(prev => [...prev, ...files]);
            const newImageUrls = files.map(file => URL.createObjectURL(file));
            setPreviewImages(prev => [...prev, ...newImageUrls]);
        }
    };

    const removeImage = (index: number) => {
        setPreviewImages(prev => prev.filter((_, i) => i !== index));
        setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (submitting) return;

        try {
            setSubmitting(true);
            const payload: CreateNewsPayload = {
                title: formData.title!,
                category: formData.category!,
                status: formData.status as 'draft' | 'publish',
                date: formData.date,
                content: formData.content,
                images: uploadedFiles.length > 0 ? uploadedFiles : undefined
            };

            console.log('Submitting news with payload:', {
                ...payload,
                images: payload.images?.map(f => ({ name: f.name, size: f.size, type: f.type }))
            });

            if (editingNews) {
                const result = await updateNews(editingNews.id, payload);
                console.log('Update result:', result);
            } else {
                const result = await createNews(payload);
                console.log('Create result:', result);
            }

            await fetchNews(1); // Refresh the list
            setCurrentPage(1);
            setIsModalOpen(false);
        } catch (err: any) {
            console.error('Failed to save news:', err);
            const errorMessage = err.response?.data?.message || err.message || 'Failed to save news. Please try again.';
            alert(errorMessage);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this news item?')) return;

        try {
            await deleteNews(id);
            await fetchNews(currentPage); // Refresh the list
        } catch (err) {
            console.error('Failed to delete news:', err);
            alert('Failed to delete news. Please try again.');
        }
    };

    {/* Table */ }
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
                    {news.length === 0 ? (
                        <tr>
                            <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                                No news found
                            </td>
                        </tr>
                    ) : (
                        news.map((item) => (
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
                                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${item.status === 'publish'
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-yellow-100 text-yellow-700'
                                        }`}>
                                        {item.status === 'publish' ? 'Published' : 'Draft'}
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
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>

        {/* Pagination */}
        <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            hasNextPage={hasNextPage}
            hasPrevPage={hasPrevPage}
        />
    </div>

    {/* Modal */ }
    {
        isModalOpen && (
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
                                    <option value="academic">Academic</option>
                                    <option value="events">Events</option>
                                    <option value="infrastructure">Infrastructure</option>
                                    <option value="sports">Sports</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                                <select
                                    value={formData.status}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value as 'draft' | 'publish' })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                                >
                                    <option value="draft">Draft</option>
                                    <option value="publish">Publish</option>
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
                                disabled={submitting}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={submitting}
                            >
                                {submitting ? 'Saving...' : (editingNews ? 'Save Changes' : 'Create News')}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

        </div >
    );
};

export default NewsAdmin;
