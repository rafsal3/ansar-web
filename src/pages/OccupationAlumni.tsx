import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Briefcase, ChevronDown } from 'lucide-react';
import { occupationStats } from '@/data/occupations';

interface AlumniMember {
    id: number;
    name: string;
    email: string;
    phone: string;
    occupation: string;
    graduationYear: string;
    stream: string;
    class: string;
    location?: string;
    avatar?: string;
}

// Mock data - In production, this would come from your API
const mockAlumniData: AlumniMember[] = [
    { id: 1, name: 'Ahmed Khan', email: 'ahmed@example.com', phone: '+91 9876543210', occupation: 'Software Engineer', graduationYear: '2018', stream: 'Science', class: '12 A', location: 'Bangalore' },
    { id: 2, name: 'Fatima Rahman', email: 'fatima@example.com', phone: '+91 9876543211', occupation: 'Software Engineer', graduationYear: '2019', stream: 'Science', class: '12 B', location: 'Hyderabad' },
    { id: 3, name: 'Mohammed Ali', email: 'mohammed@example.com', phone: '+91 9876543212', occupation: 'Software Engineer', graduationYear: '2020', stream: 'Science', class: '12 A', location: 'Pune' },
    { id: 4, name: 'Ayesha Siddiqui', email: 'ayesha@example.com', phone: '+91 9876543213', occupation: 'Software Engineer', graduationYear: '2017', stream: 'Science', class: '12 C', location: 'Mumbai' },
    { id: 5, name: 'Ibrahim Hassan', email: 'ibrahim@example.com', phone: '+91 9876543214', occupation: 'Software Engineer', graduationYear: '2021', stream: 'Science', class: '12 A', location: 'Chennai' },
    { id: 6, name: 'Zainab Malik', email: 'zainab@example.com', phone: '+91 9876543215', occupation: 'Doctor', graduationYear: '2016', stream: 'Science', class: '12 B', location: 'Delhi' },
    { id: 7, name: 'Usman Ahmed', email: 'usman@example.com', phone: '+91 9876543216', occupation: 'Doctor', graduationYear: '2015', stream: 'Science', class: '12 A', location: 'Kolkata' },
    { id: 8, name: 'Mariam Patel', email: 'mariam@example.com', phone: '+91 9876543217', occupation: 'Teacher', graduationYear: '2019', stream: 'Humanities', class: '12 C', location: 'Ahmedabad' },
    { id: 9, name: 'Yusuf Sheikh', email: 'yusuf@example.com', phone: '+91 9876543218', occupation: 'Civil Engineer', graduationYear: '2018', stream: 'Science', class: '12 B', location: 'Bangalore' },
    { id: 10, name: 'Aisha Begum', email: 'aisha@example.com', phone: '+91 9876543219', occupation: 'Business Owner', graduationYear: '2014', stream: 'Commerce', class: '12 A', location: 'Mumbai' },
];

const OccupationAlumni = () => {
    const { occupation } = useParams<{ occupation: string }>();
    const navigate = useNavigate();

    // Decode the occupation from URL
    const decodedOccupation = occupation ? decodeURIComponent(occupation) : '';

    // Filter alumni by occupation
    const filteredAlumni = mockAlumniData.filter(
        (alumni) => alumni.occupation.toLowerCase() === decodedOccupation.toLowerCase()
    );

    const handleOccupationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOccupation = e.target.value;
        if (selectedOccupation) {
            navigate(`/alumni/occupation/${encodeURIComponent(selectedOccupation)}`);
        }
    };

    // Get initials for avatar
    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    // Generate random gradient for avatar
    const getAvatarGradient = (index: number) => {
        const gradients = [
            'from-blue-500 to-cyan-500',
            'from-purple-500 to-pink-500',
            'from-green-500 to-teal-500',
            'from-orange-500 to-red-500',
            'from-indigo-500 to-purple-500',
            'from-teal-500 to-emerald-500',
        ];
        return gradients[index % gradients.length];
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-teal-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                        <button
                            onClick={() => navigate('/occupations')}
                            className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Back to Occupations
                        </button>

                        {/* Occupation Selector */}
                        <div className="relative">
                            <select
                                value={decodedOccupation}
                                onChange={handleOccupationChange}
                                className="appearance-none bg-white border border-gray-200 text-gray-700 py-3 pl-4 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent shadow-sm font-medium cursor-pointer min-w-[200px]"
                            >
                                {occupationStats.map((stat) => (
                                    <option key={stat.occupation} value={stat.occupation}>
                                        {stat.occupation}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-4 bg-gradient-to-br from-teal-500 to-blue-500 rounded-2xl">
                                <Briefcase className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                                    {decodedOccupation}
                                </h1>
                                <p className="text-gray-600 mt-1">
                                    {filteredAlumni.length} {filteredAlumni.length === 1 ? 'alumnus' : 'alumni'} found
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Alumni Grid */}
                {filteredAlumni.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredAlumni.map((alumni, index) => (
                            <div
                                key={alumni.id}
                                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden"
                            >
                                {/* Card Header with Gradient */}
                                <div className={`h-24 bg-gradient-to-br ${getAvatarGradient(index)} relative`}>
                                    <div className="absolute -bottom-12 left-6">
                                        <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${getAvatarGradient(index)} flex items-center justify-center text-white text-2xl font-bold shadow-xl border-4 border-white`}>
                                            {getInitials(alumni.name)}
                                        </div>
                                    </div>
                                </div>

                                {/* Card Content */}
                                <div className="pt-16 px-6 pb-6 text-center">
                                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                                        {alumni.name}
                                    </h3>
                                    <p className="text-sm text-teal-600 font-medium mb-6">
                                        {alumni.occupation}
                                    </p>

                                    {/* Action Button */}
                                    <button className="w-full py-2.5 px-4 bg-white border border-teal-600 text-teal-600 font-medium rounded-xl hover:bg-teal-50 transition-all duration-300">
                                        Connect
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Briefcase className="w-10 h-10 text-gray-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">No Alumni Found</h3>
                        <p className="text-gray-600 mb-6">
                            No alumni found with the occupation "{decodedOccupation}"
                        </p>
                        <button
                            onClick={() => navigate('/')}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 text-white font-medium rounded-xl hover:bg-teal-700 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Back to Home
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OccupationAlumni;
