import { useState, useEffect } from 'react';
import { Clock, Users, Loader2 } from 'lucide-react';
import { coursesApi, Course } from '../api/coursesApi';

const Courses = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await coursesApi.getAllCourses();
                setCourses(response.data);
            } catch (error) {
                console.error('Failed to fetch courses:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="flex items-center gap-2 text-teal-600">
                    <Loader2 className="w-8 h-8 animate-spin" />
                    <span className="text-xl font-medium">Loading courses...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900">Academic Programs</h1>
                    <p className="mt-2 text-lg text-gray-600">Discover a wide range of academic programs designed to launch your career.</p>
                </div>

                {/* Course Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.length === 0 ? (
                        <div className="col-span-full text-center py-12 text-gray-500">
                            No courses available at the moment.
                        </div>
                    ) : (
                        courses.map((course) => (
                            <div key={course.id} className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 flex flex-col">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-xs font-semibold uppercase tracking-wider">
                                        {course.department}
                                    </div>
                                    <div className="flex items-center text-gray-400 text-xs">
                                        <Clock className="w-3 h-3 mr-1" />
                                        {course.duration}
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 mb-2">{course.name}</h3>

                                <div className="flex-grow">
                                    {/* Description placeholder or derived content could go here if available in the future */}
                                </div>

                                <div className="pt-6 border-t border-gray-100 mt-4">
                                    <div className="flex items-center justify-center text-teal-600 font-medium text-sm border border-teal-600 rounded-full py-2">
                                        <Users className="w-4 h-4 mr-2" />
                                        {course.seats} Seats
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Courses;
