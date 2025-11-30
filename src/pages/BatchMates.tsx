import { useState } from 'react';
import { Search, Mail, Phone, Linkedin, MapPin, GraduationCap } from 'lucide-react';

const BatchMates = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedYear, setSelectedYear] = useState('All Years');
    const [selectedDepartment, setSelectedDepartment] = useState('All Departments');

    const batchMates = [
        {
            id: 1,
            name: 'John Doe',
            graduationYear: '2020',
            department: 'Computer Science',
            degree: 'B.Sc',
            currentPosition: 'Software Engineer at Google',
            location: 'Bangalore, India',
            email: 'john.doe@example.com',
            phone: '+91 9876543210',
            image: null
        },
        {
            id: 2,
            name: 'Jane Smith',
            graduationYear: '2020',
            department: 'Computer Science',
            degree: 'B.Sc',
            currentPosition: 'Product Manager at Microsoft',
            location: 'Hyderabad, India',
            email: 'jane.smith@example.com',
            phone: '+91 9876543211',
            image: null
        },
        {
            id: 3,
            name: 'Mike Johnson',
            graduationYear: '2020',
            department: 'Commerce',
            degree: 'B.Com',
            currentPosition: 'Financial Analyst at KPMG',
            location: 'Mumbai, India',
            email: 'mike.johnson@example.com',
            phone: '+91 9876543212',
            image: null
        },
        {
            id: 4,
            name: 'Sarah Williams',
            graduationYear: '2019',
            department: 'Computer Science',
            degree: 'B.Sc',
            currentPosition: 'Data Scientist at Amazon',
            location: 'Chennai, India',
            email: 'sarah.williams@example.com',
            phone: '+91 9876543213',
            image: null
        },
        {
            id: 5,
            name: 'David Brown',
            graduationYear: '2021',
            department: 'English',
            degree: 'B.A',
            currentPosition: 'Content Writer at HubSpot',
            location: 'Kochi, India',
            email: 'david.brown@example.com',
            phone: '+91 9876543214',
            image: null
        },
        {
            id: 6,
            name: 'Emily Davis',
            graduationYear: '2020',
            department: 'Computer Science',
            degree: 'B.Sc',
            currentPosition: 'UX Designer at Adobe',
            location: 'Pune, India',
            email: 'emily.davis@example.com',
            phone: '+91 9876543215',
            image: null
        }
    ];

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900">Batch Mates</h1>
                    <p className="mt-2 text-lg text-gray-600">Connect with your fellow alumni</p>
                </div>

                {/* Search and Filters */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Search */}
                        <div className="md:col-span-1">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search by name..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        {/* Year Filter */}
                        <div>
                            <select
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            >
                                <option>All Years</option>
                                <option>2024</option>
                                <option>2023</option>
                                <option>2022</option>
                                <option>2021</option>
                                <option>2020</option>
                                <option>2019</option>
                            </select>
                        </div>

                        {/* Department Filter */}
                        <div>
                            <select
                                value={selectedDepartment}
                                onChange={(e) => setSelectedDepartment(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            >
                                <option>All Departments</option>
                                <option>Computer Science</option>
                                <option>Commerce</option>
                                <option>English</option>
                                <option>Mathematics</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Batch Mates Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {batchMates.map((mate) => (
                        <div key={mate.id} className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
                            {/* Profile Picture Placeholder */}
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                                    <span className="text-xl font-bold text-white">
                                        {mate.name.split(' ').map(n => n[0]).join('')}
                                    </span>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-gray-900">{mate.name}</h3>
                                    <p className="text-sm text-gray-600">{mate.currentPosition}</p>
                                </div>
                            </div>

                            {/* Details */}
                            <div className="space-y-3 mb-4">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <GraduationCap className="w-4 h-4 text-teal-600" />
                                    <span>{mate.degree} {mate.department} - {mate.graduationYear}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <MapPin className="w-4 h-4 text-teal-600" />
                                    <span>{mate.location}</span>
                                </div>
                            </div>

                            {/* Contact Actions */}
                            <div className="flex gap-2 pt-4 border-t border-gray-100">
                                <a
                                    href={`mailto:${mate.email}`}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-teal-50 text-teal-600 rounded-xl hover:bg-teal-100 transition-colors"
                                >
                                    <Mail className="w-4 h-4" />
                                    <span className="text-sm font-medium">Email</span>
                                </a>
                                <a
                                    href={`tel:${mate.phone}`}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors"
                                >
                                    <Phone className="w-4 h-4" />
                                    <span className="text-sm font-medium">Call</span>
                                </a>
                                <button className="px-4 py-2 bg-gray-50 text-gray-600 rounded-xl hover:bg-gray-100 transition-colors">
                                    <Linkedin className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BatchMates;
