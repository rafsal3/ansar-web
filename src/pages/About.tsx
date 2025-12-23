import { Award, Target, Heart } from 'lucide-react';

const About = () => {
    return (
        <div className="bg-white">
            {/* Header Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-4xl font-extrabold text-gray-900">About Ansar Group of Institutions</h1>
                <p className="mt-2 text-lg text-gray-600">Shaping Minds, Building Futures</p>
            </div>

            {/* About Us Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">About Us</h2>
                        <div className="space-y-4 text-gray-600">
                            <p>
                                Established in 2002, the Ansar Group of Institutions was founded on a powerful vision—to deliver quality education that nurtures not only academic excellence but also strong values and character. What began as a modest initiative has today evolved into one of Kerala's most respected residential and non-residential educational campuses.
                            </p>
                            <p>
                                Renowned for its commitment to excellence, Ansar has become a trusted name in education, especially among students from socially and educationally backward regions of Malabar. The institution offers a dynamic blend of higher secondary education and professional entrance coaching, guided by experienced faculty and supported by a disciplined, student-centric learning environment.
                            </p>
                            <p>
                                At Ansar, education goes beyond textbooks. The focus is on empowering hardworking and dedicated students with knowledge, confidence, and moral strength, enabling them to compete successfully at the highest levels.
                            </p>
                            <p>
                                The institution's ultimate mission is clear—to help students secure admission to top professional colleges of their choice and achieve success at the very first attempt, paving the way for bright futures and meaningful careers.
                            </p>
                        </div>
                    </div>
                    <div className="relative h-64 lg:h-96 w-full">
                        <img
                            src="/images/library.png"
                            alt="Ansar Group of Institutions"
                            className="absolute inset-0 w-full h-full object-cover rounded-3xl shadow-lg"
                        />
                    </div>
                </div>
            </div>

            {/* Mission, Vision & Commitment Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Mission Card */}
                    <div className="bg-blue-50 rounded-3xl p-8">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-2 bg-blue-100 rounded-full">
                                <Award className="w-6 h-6 text-blue-600" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">Our Mission</h2>
                        </div>
                        <p className="text-gray-700">
                            To deliver exceptional, focused higher secondary education that empowers students to excel in competitive entrance examinations and achieve success in their very first attempt.
                        </p>
                    </div>

                    {/* Vision Card */}
                    <div className="bg-emerald-50 rounded-3xl p-8">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-2 bg-emerald-100 rounded-full">
                                <Target className="w-6 h-6 text-emerald-600" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">Our Vision</h2>
                        </div>
                        <p className="text-gray-700">
                            To emerge as a leading higher secondary institution in the Science and Commerce streams in Calicut District, nurturing students who can compete with—and stand among—the finest minds across the state.
                        </p>
                    </div>

                    {/* Commitment Card */}
                    <div className="bg-purple-50 rounded-3xl p-8">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-2 bg-purple-100 rounded-full">
                                <Heart className="w-6 h-6 text-purple-600" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">Our Commitment</h2>
                        </div>
                        <p className="text-gray-700">
                            Our unwavering commitment to holistic education has helped countless students secure seats in India's top institutions as well as gain admission to reputed universities abroad. At Ansar, we shape well-rounded individuals prepared for academic success and life beyond the classroom.
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
                            alt="Principal"
                            className="w-full h-auto rounded-3xl shadow-lg object-cover aspect-[4/3]"
                        />
                    </div>
                    <div className="w-full md:w-2/3 space-y-4">
                        <p className="text-gray-600 italic text-lg">
                            "At Ansar Group of Institutions, we believe education is not just about acquiring knowledge but about igniting a lifelong passion for learning. We are committed to providing an environment where students can explore their potential and achieve their dreams."
                        </p>
                        <div>
                            <p className="font-bold text-gray-900">Principal</p>
                            <p className="text-gray-500">Ansar Group of Institutions</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
