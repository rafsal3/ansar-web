import { GraduationCap, FileText, CheckCircle } from 'lucide-react';

const Admissions = () => {
    return (
        <div className="bg-white">
            {/* Header Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-4xl font-extrabold text-gray-900">Admission Procedure & Eligibility</h1>
                <p className="mt-2 text-lg text-gray-600">Your Journey to Excellence Starts Here</p>
            </div>

            {/* Main Content Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Left Column - Eligibility & Procedure */}
                    <div className="space-y-8">
                        {/* Eligibility Card */}
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-8 shadow-lg">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-blue-600 rounded-full">
                                    <GraduationCap className="w-6 h-6 text-white" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">Eligibility Criteria</h2>
                            </div>
                            <p className="text-gray-700 leading-relaxed">
                                Students who have successfully completed <span className="font-semibold">SSLC (State / CBSE / ICSE)</span> or an equivalent 10th standard examination from a recognized board are eligible to apply for admission.
                            </p>
                        </div>

                        {/* Merit-Based Admission Card */}
                        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-3xl p-8 shadow-lg">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-emerald-600 rounded-full">
                                    <CheckCircle className="w-6 h-6 text-white" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">Merit-Based Selection</h2>
                            </div>
                            <p className="text-gray-700 leading-relaxed">
                                Admission to the Ansar Campus is strictly based on merit. Only candidates who qualify through both the <span className="font-semibold">written admission test</span> and the <span className="font-semibold">personal interview</span> will be considered for final admission.
                            </p>
                        </div>
                    </div>

                    {/* Right Column - AAT Information */}
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-3xl p-8 shadow-lg">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-purple-600 rounded-full">
                                <FileText className="w-6 h-6 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Ansar Admission Test (AAT)</h2>
                        </div>
                        <div className="space-y-4 text-gray-700">
                            <p className="leading-relaxed">
                                The <span className="font-semibold">Ansar Admission Test (AAT)</span> is a common entrance examination conducted multiple times each year to assess a student's academic readiness, aptitude, and learning potential.
                            </p>
                            <div className="border-t border-purple-200 pt-4">
                                <h3 className="font-semibold text-gray-900 mb-2">Test Format</h3>
                                <p className="leading-relaxed">
                                    While on-campus testing remains the standard mode of assessment, an online test may be arranged in special cases.
                                </p>
                            </div>
                            <div className="border-t border-purple-200 pt-4">
                                <h3 className="font-semibold text-gray-900 mb-2">Final Admission</h3>
                                <p className="leading-relaxed">
                                    Final admission is confirmed only after the candidate has successfully cleared both the <span className="font-semibold">written test</span> and the <span className="font-semibold">interview</span>.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Process Timeline Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Admission Process</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Step 1 */}
                    <div className="relative bg-white border-2 border-blue-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                        <div className="absolute -top-4 left-6 bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                            1
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mt-4 mb-2">Apply</h3>
                        <p className="text-gray-600">
                            Submit your application with required documents from a recognized board.
                        </p>
                    </div>

                    {/* Step 2 */}
                    <div className="relative bg-white border-2 border-emerald-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                        <div className="absolute -top-4 left-6 bg-emerald-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                            2
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mt-4 mb-2">Take AAT</h3>
                        <p className="text-gray-600">
                            Appear for the Ansar Admission Test to demonstrate your academic potential.
                        </p>
                    </div>

                    {/* Step 3 */}
                    <div className="relative bg-white border-2 border-purple-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                        <div className="absolute -top-4 left-6 bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                            3
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mt-4 mb-2">Interview</h3>
                        <p className="text-gray-600">
                            Attend a personal interview and receive your admission confirmation.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admissions;
