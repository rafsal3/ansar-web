import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, BookOpen, X, Loader2, ChevronDown, ChevronUp, GraduationCap } from 'lucide-react';
import { coursesApi, Course, CreateCourseData } from '../../api/coursesApi';
import { toast } from 'react-hot-toast';

// Interface for grouped courses by department
interface DepartmentGroup {
    department: string;
    courses: Course[];
    duration: string;
    totalSeats: number;
}

const CoursesAdmin = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCourse, setEditingCourse] = useState<Course | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [expandedDepartments, setExpandedDepartments] = useState<Set<string>>(new Set());

    const initialFormData: CreateCourseData = {
        name: '',
        department: '',
        duration: '',
        seats: 0
    };

    const [formData, setFormData] = useState<CreateCourseData>(initialFormData);

    const fetchCourses = async () => {
        try {
            setLoading(true);
            // Fetch all courses to group them properly
            const response = await coursesApi.getAllCourses(1, 100);
            setCourses(response.data);
            // Expand all departments by default
            const departments = new Set(response.data.map(c => c.department));
            setExpandedDepartments(departments);
        } catch (error) {
            console.error('Failed to fetch courses:', error);
            toast.error('Failed to load courses');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    // Group courses by department
    const groupedCourses: DepartmentGroup[] = courses.reduce((acc: DepartmentGroup[], course) => {
        const existingDept = acc.find(dept => dept.department === course.department);

        if (existingDept) {
            existingDept.courses.push(course);
        } else {
            acc.push({
                department: course.department,
                courses: [course],
                duration: course.duration, // Use first course's duration for department
                totalSeats: course.seats // Use first course's seats for department
            });
        }

        return acc;
    }, []);

    const toggleDepartment = (department: string) => {
        setExpandedDepartments(prev => {
            const newSet = new Set(prev);
            if (newSet.has(department)) {
                newSet.delete(department);
            } else {
                newSet.add(department);
            }
            return newSet;
        });
    };

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
            await fetchCourses();
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
            await fetchCourses();
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

    // Define gradient colors for different departments
    const departmentColors: { [key: string]: string } = {
        '+1 Science': 'bg-blue-50 border-blue-200 text-blue-700',
        '+1 Commerce': 'bg-emerald-50 border-emerald-200 text-emerald-700',
        '+1 Integrated Programs': 'bg-purple-50 border-purple-200 text-purple-700',
        'High-Achiever\'s Batch': 'bg-orange-50 border-orange-200 text-orange-700',
    };

    const getColorClass = (department: string, index: number): string => {
        if (departmentColors[department]) {
            return departmentColors[department];
        }
        const colors = [
            'bg-pink-50 border-pink-200 text-pink-700',
            'bg-indigo-50 border-indigo-200 text-indigo-700',
            'bg-cyan-50 border-cyan-200 text-cyan-700',
        ];
        return colors[index % colors.length];
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="flex items-center gap-2 text-teal-600">
                    <Loader2 className="w-8 h-8 animate-spin" />
                    <span className="text-xl font-medium">Loading courses...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen flex flex-col space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Courses Management</h1>
                    <p className="text-gray-500 mt-1">Manage academic courses grouped by departments</p>
                </div>
                <button
                    onClick={openAddModal}
                    className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    Add Course
                </button>
            </div>

            {/* Department Groups */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                {groupedCourses.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center text-gray-500">
                        No courses found. Click "Add Course" to create your first course.
                    </div>
                ) : (
                    groupedCourses.map((dept, index) => (
                        <div key={dept.department} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            {/* Department Header */}
                            <button
                                onClick={() => toggleDepartment(dept.department)}
                                className={`w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors border-l-4 ${getColorClass(dept.department, index)}`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-white rounded-lg">
                                        <GraduationCap className="w-5 h-5" />
                                    </div>
                                    <div className="text-left">
                                        <h2 className="text-lg font-bold text-gray-900">{dept.department}</h2>
                                        <p className="text-sm text-gray-600">
                                            {dept.courses.length} {dept.courses.length === 1 ? 'Subject' : 'Subjects'} • {dept.duration} • {dept.totalSeats} Seats
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    {expandedDepartments.has(dept.department) ? (
                                        <ChevronUp className="w-5 h-5 text-gray-400" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5 text-gray-400" />
                                    )}
                                </div>
                            </button>

                            {/* Department Courses Table */}
                            {expandedDepartments.has(dept.department) && (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead className="bg-gray-50 border-y border-gray-100">
                                            <tr>
                                                <th className="px-6 py-3 text-sm font-semibold text-gray-900">Subject Name</th>
                                                <th className="px-6 py-3 text-sm font-semibold text-gray-900 text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {dept.courses.map((course) => (
                                                <tr key={course.id} className="hover:bg-gray-50 transition-colors">
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="p-2 bg-teal-50 rounded-lg text-teal-600">
                                                                <BookOpen className="w-4 h-4" />
                                                            </div>
                                                            <p className="font-medium text-gray-900">{course.name}</p>
                                                        </div>
                                                    </td>
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
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    ))
                )}
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
                                    Subject Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    placeholder="e.g. Physics, Chemistry, Business Studies"
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
                                    <option value="+1 Science">+1 Science</option>
                                    <option value="+1 Commerce">+1 Commerce</option>
                                    <option value="+1 Integrated Programs">+1 Integrated Programs</option>
                                    <option value="High-Achiever's Batch">High-Achiever's Batch with IIT and NEET</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Duration (for entire department)
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
                                <p className="text-xs text-gray-500 mt-1">This applies to all subjects in the department</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Seats (for entire department)
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
                                <p className="text-xs text-gray-500 mt-1">Total seats available for this department</p>
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
