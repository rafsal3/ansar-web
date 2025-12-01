import { Users, Award } from 'lucide-react';

const About = () => {
    return (
        <div className="bg-white">
            {/* Header Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-4xl font-extrabold text-gray-900">About Ansar Higher Secondary School</h1>
                <p className="mt-2 text-lg text-gray-600">A legacy of excellence, integrity, and community service.</p>
            </div>

            {/* History Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Our History</h2>
                        <div className="space-y-4 text-gray-600">
                            <p>
                                Founded in 1995, Ansar Higher Secondary School began with a humble vision to provide quality education to the rural community. Over the past three decades, it has grown into a premier institution offering a diverse range of academic programs.
                            </p>
                            <p>
                                Our campus has evolved from a single building to a sprawling complex with modern amenities, yet our core values of discipline, dedication, and excellence remain unchanged.
                            </p>
                        </div>
                    </div>
                    <div className="relative h-64 lg:h-96 w-full">
                        <img
                            src="/images/library.png"
                            alt="Ansar Higher Secondary School Library"
                            className="absolute inset-0 w-full h-full object-cover rounded-3xl shadow-lg"
                        />
                    </div>
                </div>
            </div>

            {/* Vision & Mission Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Vision Card */}
                    <div className="bg-emerald-50 rounded-3xl p-8">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-2 bg-emerald-100 rounded-full">
                                <Users className="w-6 h-6 text-emerald-600" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">Our Vision</h2>
                        </div>
                        <p className="text-gray-700">
                            To be a center of excellence in higher education, molding intellectually competent, morally upright, and socially committed citizens.
                        </p>
                    </div>

                    {/* Mission Card */}
                    <div className="bg-blue-50 rounded-3xl p-8">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-2 bg-blue-100 rounded-full">
                                <Award className="w-6 h-6 text-blue-600" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">Our Mission</h2>
                        </div>
                        <p className="text-gray-700">
                            To provide holistic education that fosters critical thinking, innovation, and ethical leadership, contributing to nation-building and global harmony.
                        </p>
                    </div>
                </div>
            </div>

            {/* Principal's Message Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Principal's Message</h2>
                <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="w-full md:w-1/3">
                        <img
                            src="/images/principal.png"
                            alt="Principal Dr. Alan Grant"
                            className="w-full h-auto rounded-3xl shadow-lg object-cover aspect-[4/3]"
                        />
                    </div>
                    <div className="w-full md:w-2/3 space-y-4">
                        <p className="text-gray-600 italic text-lg">
                            "At Ansar Higher Secondary School, we believe education is not just about acquiring knowledge but about igniting a lifelong passion for learning. We are committed to providing an environment where students can explore their potential and achieve their dreams."
                        </p>
                        <div>
                            <p className="font-bold text-gray-900">Dr. Alan Grant, Ph.D.</p>
                            <p className="text-gray-500">Principal, Ansar Higher Secondary School</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
