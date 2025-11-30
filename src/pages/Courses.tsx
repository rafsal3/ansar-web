import { useState } from 'react';
import { Clock, Users } from 'lucide-react';

const Courses = () => {
    const [activeFilter, setActiveFilter] = useState('All Courses');

    const filters = ['All Courses', 'UG', 'PG'];

    const courses = [
        {
            id: 1,
            type: 'UG',
            title: 'B.Sc Computer Science',
            department: 'Computer Science',
            description: 'Foundations of computing and programming.',
            duration: '3 Years',
            seats: 30
        },
        {
            id: 2,
            type: 'UG',
            title: 'B.Sc Computer Science',
            department: 'Computer Science',
            description: 'Foundations of computing and programming.',
            duration: '3 Years',
            seats: 30
        },
        {
            id: 3,
            type: 'UG',
            title: 'B.Sc Computer Science',
            department: 'Computer Science',
            description: 'Foundations of computing and programming.',
            duration: '3 Years',
            seats: 30
        },
        {
            id: 4,
            type: 'UG',
            title: 'B.Sc Computer Science',
            department: 'Computer Science',
            description: 'Foundations of computing and programming.',
            duration: '3 Years',
            seats: 30
        },
        {
            id: 5,
            type: 'UG',
            title: 'B.Sc Computer Science',
            department: 'Computer Science',
            description: 'Foundations of computing and programming.',
            duration: '3 Years',
            seats: 30
        },
        {
            id: 6,
            type: 'UG',
            title: 'B.Sc Computer Science',
            department: 'Computer Science',
            description: 'Foundations of computing and programming.',
            duration: '3 Years',
            seats: 30
        }
    ];

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900">Academic Programs</h1>
                    <p className="mt-2 text-lg text-gray-600">Discover a wide range of undergraduate and postgraduate programs designed to launch your career.</p>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-4 mb-12 justify-center">
                    {filters.map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${activeFilter === filter
                                    ? 'bg-teal-600 text-white'
                                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                                }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                {/* Course Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.map((course) => (
                        <div key={course.id} className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 flex flex-col">
                            <div className="flex justify-between items-start mb-6">
                                <span className="px-3 py-1 bg-blue-100 text-blue-600 text-xs font-bold rounded-full">
                                    {course.type}
                                </span>
                                <div className="flex items-center text-gray-400 text-xs">
                                    <Clock className="w-3 h-3 mr-1" />
                                    {course.duration}
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 mb-1">{course.title}</h3>
                            <p className="text-sm text-gray-500 mb-4">{course.department}</p>

                            <p className="text-gray-600 mb-8 flex-grow">
                                {course.description}
                            </p>

                            <div className="pt-6 border-t border-gray-100">
                                <div className="flex items-center justify-center text-teal-600 font-medium text-sm border border-teal-600 rounded-full py-2">
                                    <Users className="w-4 h-4 mr-2" />
                                    {course.seats} Seats
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Courses;
