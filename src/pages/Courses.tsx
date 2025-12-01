import { Clock, Users } from 'lucide-react';

const Courses = () => {


    const courses = [
        {
            id: 1,

            title: 'B.Sc Computer Science',
            department: 'Computer Science',
            description: 'Foundations of computing and programming.',
            duration: '3 Years',
            seats: 30
        },
        {
            id: 2,

            title: 'B.Sc Computer Science',
            department: 'Computer Science',
            description: 'Foundations of computing and programming.',
            duration: '3 Years',
            seats: 30
        },
        {
            id: 3,

            title: 'B.Sc Computer Science',
            department: 'Computer Science',
            description: 'Foundations of computing and programming.',
            duration: '3 Years',
            seats: 30
        },
        {
            id: 4,

            title: 'B.Sc Computer Science',
            department: 'Computer Science',
            description: 'Foundations of computing and programming.',
            duration: '3 Years',
            seats: 30
        },
        {
            id: 5,

            title: 'B.Sc Computer Science',
            department: 'Computer Science',
            description: 'Foundations of computing and programming.',
            duration: '3 Years',
            seats: 30
        },
        {
            id: 6,

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
                    <p className="mt-2 text-lg text-gray-600">Discover a wide range of academic programs designed to launch your career.</p>
                </div>

                {/* Filters */}


                {/* Course Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.map((course) => (
                        <div key={course.id} className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 flex flex-col">
                            <div className="flex justify-between items-start mb-6">

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
