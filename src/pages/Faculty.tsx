import { useState } from 'react';
import { Search, ChevronDown, Mail } from 'lucide-react';

const Faculty = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [department] = useState('Department');
    const [sort] = useState('Sort by A - Z');

    // Mock data for faculty
    const facultyMembers = Array(8).fill({
        name: 'Dr. Sarah Ahmed',
        title: 'Professor & HOD',
        department: 'Department of Computer Science',
        email: 'sarah.johnson@gmail.edu',
        image: null // Placeholder
    });

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-extrabold text-gray-900">Our Faculty & Staff</h1>
                    <p className="mt-2 text-lg text-gray-600">Discover a wide range of academic programs designed to launch your career.</p>
                </div>

                {/* Controls */}
                <div className="flex flex-col md:flex-row gap-4 mb-12">
                    <div className="relative flex-grow">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search by name, department or keyword"
                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-4">
                        <div className="relative">
                            <button className="flex items-center justify-between w-40 px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50">
                                <span>{department}</span>
                                <ChevronDown className="w-4 h-4 ml-2" />
                            </button>
                        </div>
                        <div className="relative">
                            <button className="flex items-center justify-between w-40 px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50">
                                <span>{sort}</span>
                                <ChevronDown className="w-4 h-4 ml-2" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Faculty Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {facultyMembers.map((member, index) => (
                        <div key={index} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
                            {/* Image Placeholder */}
                            <div className="h-64 bg-gray-200 w-full relative">
                                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                                    <span className="text-sm">Image Placeholder</span>
                                </div>
                            </div>

                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                                <p className="text-sm text-gray-500 mb-4">{member.title}</p>

                                <p className="text-gray-700 mb-6 text-sm">
                                    {member.department}
                                </p>

                                <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                                    <Mail className="w-4 h-4 mr-2" />
                                    {member.email}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Faculty;
