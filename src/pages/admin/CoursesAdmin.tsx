import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, BookOpen, X, Loader2 } from 'lucide-react';
import { coursesApi, Course, CreateCourseData } from '../../api/coursesApi';
import { toast } from 'react-hot-toast';
import Pagination from '../../components/Pagination';

const CoursesAdmin = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCourse, setEditingCourse] = useState<Course | null>(null);
    const [submitting, setSubmitting] = useState(false);

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPrevPage, setHasPrevPage] = useState(false);

    const initialFormData: CreateCourseData = {
        name: '',
        department: '',
        duration: '',
        seats: 0
    };

    const [formData, setFormData] = useState<CreateCourseData>(initialFormData);

    const fetchCourses = async (page: number = 1) => {
        try {
            setLoading(true);
            const response = await coursesApi.getAllCourses(page, 5);
            setCourses(response.data);
            setCurrentPage(response.meta.page);
            setTotalPages(response.meta.totalPages);
            setHasNextPage(response.meta.hasNextPage);
            setHasPrevPage(response.meta.hasPrevPage);
        } catch (error) {
            console.error('Failed to fetch courses:', error);
            toast.error('Failed to load courses');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses(currentPage);
    }, [currentPage]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'seats' ? parseInt(value) || 0 : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            if (editingCourse) {
                await coursesApi.updateCourse(editingCourse.id, formData);
                toast.success('Course updated successfully');
            } else {
                await coursesApi.createCourse(formData);
                toast.success('Course created successfully');
            }
            setIsModalOpen(false);
            resetForm();
            setCurrentPage(1);
            await fetchCourses(1);
        } catch (error) {
            console.error('Operation failed:', error);
            toast.error(editingCourse ? 'Failed to update course' : 'Failed to create course');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete this course?')) return;

        try {
            await coursesApi.deleteCourse(id);
            toast.success('Course deleted successfully');
            await fetchCourses(currentPage);
        } catch (error) {
            console.error('Delete failed:', error);
            toast.error('Failed to delete course');
        }
    };

    const openAddModal = () => {
        setEditingCourse(null);
        setFormData(initialFormData);
        setIsModalOpen(true);
    };

    const openEditModal = (course: Course) => {
        setEditingCourse(course);
        setFormData({
            name: course.name,
            department: course.department,
            duration: course.duration,
            seats: course.seats
        });
        setIsModalOpen(true);
    };

    const resetForm = () => {
        setEditingCourse(null);
        setFormData(initialFormData);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Courses Management</h1>
                    <p className="text-gray-500 mt-1">Manage academic courses and programs</p>
                </div>
                <button
                    onClick={openAddModal}
                    className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    Add Course
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-900">Course Name</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-900">Department</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-900">Duration</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-900">Seats</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-900 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                        <div className="flex items-center justify-center gap-2">
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Loading courses...
                                        </div>
                                    </td>
                                </tr>
                            ) : courses.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                        No courses found
                                    </td>
                                </tr>
                            ) : (
                                courses.map((course) => (
                                    <tr key={course.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-teal-50 rounded-lg text-teal-600">
                                                    <BookOpen className="w-4 h-4" />
                                                </div>
                                                <p className="font-medium text-gray-900">{course.name}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{course.department}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{course.duration}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{course.seats}</td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => openEditModal(course)}
                                                    className="p-2 text-gray-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(course.id)}
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

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-6 border-b border-gray-100">
                            <h2 className="text-xl font-bold text-gray-900">
                                {editingCourse ? 'Edit Course' : 'Add New Course'}
                            </h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-400 hover:text-gray-500 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Course Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    placeholder="e.g. Science (PCMB)"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Department
                                </label>
                                <select
                                    name="department"
                                    required
                                    value={formData.department}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                >
                                    <option value="">Select Department</option>
                                    <option value="Science">Science</option>
                                    <option value="Commerce">Commerce</option>
                                    <option value="Humanities">Humanities</option>
                                    <option value="Computer Science">Computer Science</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Duration
                                </label>
                                <input
                                    type="text"
                                    name="duration"
                                    required
                                    value={formData.duration}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    placeholder="e.g. 2 Years"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Seats
                                </label>
                                <input
                                    type="number"
                                    name="seats"
                                    required
                                    min="0"
                                    value={formData.seats}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    placeholder="e.g. 60"
                                />
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="flex-1 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {submitting ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Saving...
                                        </>
                                    ) : (
                                        'Save Course'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CoursesAdmin;
