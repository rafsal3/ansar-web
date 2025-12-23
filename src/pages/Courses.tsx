import { useState, useEffect } from 'react';
import { BookOpen, Loader2, GraduationCap, Clock, Users } from 'lucide-react';
import { coursesApi, Course } from '../api/coursesApi';

// Interface for grouped courses by department
interface DepartmentGroup {
    department: string;
    courses: Course[];
    duration: string;
    totalSeats: number;
}

const Courses = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                setLoading(true);
                // Fetch all courses without pagination to group them properly
                const response = await coursesApi.getAllCourses(1, 100);
                setCourses(response.data);
            } catch (error) {
                console.error('Failed to fetch courses:', error);
            } finally {
                setLoading(false);
            }
        };

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
                duration: course.duration, // Use the first course's duration for the department
                totalSeats: course.seats // Use the first course's seats for the department
            });
        }

        return acc;
    }, []);

    // Define gradient colors for different departments
    const departmentColors = [
        'from-blue-50 to-blue-100 border-blue-200',
        'from-emerald-50 to-emerald-100 border-emerald-200',
        'from-purple-50 to-purple-100 border-purple-200',
        'from-orange-50 to-orange-100 border-orange-200',
        'from-pink-50 to-pink-100 border-pink-200',
        'from-indigo-50 to-indigo-100 border-indigo-200',
    ];

    const departmentIconColors = [
        'bg-blue-600',
        'bg-emerald-600',
        'bg-purple-600',
        'bg-orange-600',
        'bg-pink-600',
        'bg-indigo-600',
    ];

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="flex items-center gap-2 text-teal-600">
                    <Loader2 className="w-8 h-8 animate-spin" />
                    <span className="text-xl font-medium">Loading courses...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen">
            {/* Header Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-4xl font-extrabold text-gray-900">Our Courses</h1>
                <p className="mt-2 text-lg text-gray-600">Explore our comprehensive academic programs</p>
            </div>

            {/* Departments Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                {groupedCourses.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                        No courses available at the moment.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {groupedCourses.map((dept, index) => (
                            <div
                                key={dept.department}
                                className={`bg-gradient-to-br ${departmentColors[index % departmentColors.length]} rounded-3xl p-8 shadow-lg border-2 hover:shadow-xl transition-all duration-300`}
                            >
                                {/* Department Header */}
                                <div className="flex items-center gap-4 mb-6">
                                    <div className={`p-3 ${departmentIconColors[index % departmentIconColors.length]} rounded-full`}>
                                        <GraduationCap className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900">{dept.department}</h2>
                                        <p className="text-sm text-gray-600">{dept.courses.length} {dept.courses.length === 1 ? 'Subject' : 'Subjects'}</p>
                                    </div>
                                </div>

                                {/* Subjects List */}
                                <div className="space-y-2 mb-6">
                                    {dept.courses.map((course) => (
                                        <div
                                            key={course.id}
                                            className="flex items-center gap-3 bg-white bg-opacity-60 rounded-xl px-4 py-3 hover:bg-opacity-80 transition-all"
                                        >
                                            <BookOpen className="w-5 h-5 text-gray-600 flex-shrink-0" />
                                            <span className="font-medium text-gray-900">{course.name}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Department Info Footer */}
                                <div className="pt-4 border-t border-gray-300 border-opacity-50 space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-gray-700">
                                            <Clock className="w-5 h-5" />
                                            <span className="font-medium">Duration</span>
                                        </div>
                                        <span className="font-semibold text-gray-900">{dept.duration}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-gray-700">
                                            <Users className="w-5 h-5" />
                                            <span className="font-medium">Seats Available</span>
                                        </div>
                                        <span className="font-bold text-gray-900 text-lg">{dept.totalSeats}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Courses;
