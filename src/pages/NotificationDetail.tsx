import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Tag, Share2, Bell, Download } from 'lucide-react';

const NotificationDetail = () => {
    const { id } = useParams();

    // Mock data - in a real app, this would come from an API based on the ID
    const notification = {
        id: id,
        date: '24 OCT 2024',
        category: 'Examination',
        title: 'Subject Selection',
        description: 'Important notification regarding subject selection.',
        fullContent: `
            <p class="mb-4">This is to inform all students that the registration for subjects for the academic year 2024-25 is now open.</p>
            
            <h2 class="text-2xl font-bold text-gray-900 mb-3 mt-6">Important Instructions</h2>
            <ul class="list-disc list-inside mb-4 space-y-2">
                <li>Students must carefully read the course descriptions before making their selection</li>
                <li>Each student must select their preferred subjects</li>
                <li>Selections are subject to availability and eligibility criteria</li>
                <li>Once submitted, changes will not be permitted</li>
            </ul>
            
            <h2 class="text-2xl font-bold text-gray-900 mb-3 mt-6">Eligibility</h2>
            <p class="mb-4">All students enrolled in the Higher Secondary program are eligible to register for subjects. Students must have completed their first year with a minimum percentage of 50%.</p>
            
            <h2 class="text-2xl font-bold text-gray-900 mb-3 mt-6">Available Courses</h2>
            <p class="mb-4">The list of available subjects is available in the attached document. Students are advised to consult with their academic advisors before making their selection.</p>
            
            <h2 class="text-2xl font-bold text-gray-900 mb-3 mt-6">Registration Process</h2>
            <ol class="list-decimal list-inside mb-4 space-y-2">
                <li>Log in to the student portal</li>
                <li>Navigate to the Course Registration section</li>
                <li>Select your preferred subjects</li>
                <li>Submit the form before the deadline</li>
                <li>Download and keep a copy of the confirmation receipt</li>
            </ol>
            
            <h2 class="text-2xl font-bold text-gray-900 mb-3 mt-6">Important Dates</h2>
            <ul class="list-disc list-inside mb-4 space-y-2">
                <li>Registration Start Date: October 24, 2024</li>
                <li>Registration End Date: November 10, 2024</li>
                <li>Course Allocation Announcement: November 15, 2024</li>
                <li>Classes Commencement: November 20, 2024</li>
            </ul>
            
            <p class="mb-4">For any queries or clarifications, please contact the academic office during working hours or email at academics@ansarhss.edu</p>
        `,
        attachments: [
            { name: 'FYUGP_Course_List.pdf', size: '2.5 MB' },
            { name: 'Registration_Guidelines.pdf', size: '1.2 MB' }
        ]
    };

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Button */}
                <Link
                    to="/notifications"
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8 font-medium"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Notifications
                </Link>

                {/* Notification Article */}
                <article className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-8 md:p-12">
                        {/* Header with Bell Icon */}
                        <div className="flex items-start gap-4 mb-6">
                            <div className="flex-shrink-0 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                                <Bell className="w-8 h-8 text-blue-600" />
                            </div>
                            <div className="flex-1">
                                {/* Meta Information */}
                                <div className="flex flex-wrap items-center gap-4 mb-3">
                                    <div className="flex items-center text-gray-500 text-sm">
                                        <Calendar className="w-4 h-4 mr-2" />
                                        {notification.date}
                                    </div>
                                    <div className="flex items-center">
                                        <Tag className="w-4 h-4 mr-2 text-blue-600" />
                                        <span className="px-3 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded-full">
                                            {notification.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Title */}
                                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                                    {notification.title}
                                </h1>
                            </div>
                        </div>

                        {/* Description */}
                        <p className="text-xl text-gray-600 mb-8">
                            {notification.description}
                        </p>

                        {/* Divider */}
                        <div className="border-t border-gray-200 my-8"></div>

                        {/* Full Content */}
                        <div
                            className="prose prose-lg max-w-none text-gray-700"
                            dangerouslySetInnerHTML={{ __html: notification.fullContent }}
                        />

                        {/* Attachments Section */}
                        {notification.attachments && notification.attachments.length > 0 && (
                            <div className="mt-8 p-6 bg-gray-50 rounded-2xl">
                                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <Download className="w-5 h-5" />
                                    Attachments
                                </h3>
                                <div className="space-y-3">
                                    {notification.attachments.map((attachment, index) => (
                                        <a
                                            key={index}
                                            href="#"
                                            className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-sm transition-all group"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                                    <Download className="w-5 h-5 text-blue-600" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900 group-hover:text-blue-600">
                                                        {attachment.name}
                                                    </p>
                                                    <p className="text-sm text-gray-500">{attachment.size}</p>
                                                </div>
                                            </div>
                                            <Download className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Share Section */}
                        <div className="border-t border-gray-200 mt-12 pt-8">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-bold text-gray-900">Share this notification</h3>
                                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                                    <Share2 className="w-4 h-4" />
                                    Share
                                </button>
                            </div>
                        </div>
                    </div>
                </article>

                {/* Related Notifications Section */}
                <div className="mt-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Notifications</h2>
                    <div className="space-y-4">
                        {[1, 2].map((item) => (
                            <Link
                                key={item}
                                to={`/notifications/${item}`}
                                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex items-center gap-4"
                            >
                                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                    <Bell className="w-5 h-5 text-blue-600" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-gray-900 mb-1">Related Notification Title {item}</h3>
                                    <p className="text-sm text-gray-500">24 OCT 2024</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotificationDetail;
