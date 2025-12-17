import { useState, useEffect } from 'react';
import { X, User, Mail, Phone, Briefcase, GraduationCap, Calendar, Instagram, Facebook, MessageCircle } from 'lucide-react';
import ImageSlider from '../ImageSlider';
import { alumniApi, AlumniDetails } from '../../api/alumniApi';
import { API_BASE_URL } from '../../api/apiClient';

interface ViewAlumniModalProps {
    isOpen: boolean;
    onClose: () => void;
    alumniId: number | null;
}

const ViewAlumniModal = ({ isOpen, onClose, alumniId }: ViewAlumniModalProps) => {
    const [alumni, setAlumni] = useState<AlumniDetails | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isOpen && alumniId) {
            fetchAlumniDetails(alumniId);
        } else {
            setAlumni(null);
        }
    }, [isOpen, alumniId]);

    const fetchAlumniDetails = async (id: number) => {
        try {
            setLoading(true);
            setError(null);
            const data = await alumniApi.getAlumniById(id);
            setAlumni(data);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch alumni details');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    const formattedPhotos = alumni?.photos?.map(photo =>
        photo.startsWith('http') ? photo : `${API_BASE_URL}${photo}`
    ) || [];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl relative">

                {/* Header */}
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Alumni Details</h2>
                        {alumni && <p className="text-sm text-gray-500 mt-1">ID: #{alumni.id}</p>}
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-0">
                    {loading ? (
                        <div className="flex items-center justify-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
                        </div>
                    ) : error ? (
                        <div className="flex items-center justify-center h-64 text-red-500">
                            {error}
                        </div>
                    ) : alumni ? (
                        <div className="flex flex-col md:flex-row h-full">
                            {/* Left Side: Photo */}
                            <div className="w-full md:w-1/2 bg-gray-100 min-h-[300px] md:min-h-[500px] flex flex-col justify-center p-4">
                                {formattedPhotos.length > 0 ? (
                                    <ImageSlider images={formattedPhotos} className="h-full w-full object-contain rounded-xl" />
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full text-gray-400">
                                        <User className="w-24 h-24 mb-4 opacity-30" />
                                        <span className="text-lg font-medium">No Photo Available</span>
                                    </div>
                                )}
                            </div>

                            {/* Right Side: Details */}
                            <div className="w-full md:w-1/2 p-8 flex flex-col gap-6">

                                {/* Personal Info */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">Personal Information</h3>
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-3">
                                            <User className="w-5 h-5 text-teal-600 mt-0.5" />
                                            <div>
                                                <p className="text-sm text-gray-500">Full Name</p>
                                                <p className="font-medium text-gray-900">{alumni.user.name}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <Mail className="w-5 h-5 text-teal-600 mt-0.5" />
                                            <div>
                                                <p className="text-sm text-gray-500">Email</p>
                                                <p className="font-medium text-gray-900">{alumni.user.email}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <Phone className="w-5 h-5 text-teal-600 mt-0.5" />
                                            <div>
                                                <p className="text-sm text-gray-500">Phone</p>
                                                <p className="font-medium text-gray-900">{alumni.user.phone}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Academic Info */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">Academic & Work</h3>
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="flex items-start gap-3">
                                                <GraduationCap className="w-5 h-5 text-teal-600 mt-0.5" />
                                                <div>
                                                    <p className="text-sm text-gray-500">Course</p>
                                                    <p className="font-medium text-gray-900">{alumni.course}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <Calendar className="w-5 h-5 text-teal-600 mt-0.5" />
                                                <div>
                                                    <p className="text-sm text-gray-500">Batch</p>
                                                    <p className="font-medium text-gray-900">{alumni.startYear} - {alumni.endYear}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="w-5 h-5 flex items-center justify-center">
                                                <span className="text-teal-600 font-bold text-xs">CL</span>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Class Name</p>
                                                <p className="font-medium text-gray-900">{alumni.className}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <Briefcase className="w-5 h-5 text-teal-600 mt-0.5" />
                                            <div>
                                                <p className="text-sm text-gray-500">Current Job</p>
                                                <p className="font-medium text-gray-900">{alumni.job ? alumni.job.title : 'Not specified'}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Socials */}
                                {(alumni.instagram || alumni.facebook || alumni.whatsapp) && (
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">Social Media</h3>
                                        <div className="flex gap-4">
                                            {alumni.instagram && (
                                                <a href={alumni.instagram} target="_blank" rel="noopener noreferrer" className="p-3 bg-pink-50 text-pink-600 rounded-full hover:bg-pink-100 transition-colors">
                                                    <Instagram className="w-5 h-5" />
                                                </a>
                                            )}
                                            {alumni.facebook && (
                                                <a href={alumni.facebook} target="_blank" rel="noopener noreferrer" className="p-3 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors">
                                                    <Facebook className="w-5 h-5" />
                                                </a>
                                            )}
                                            {alumni.whatsapp && (
                                                <a href={`https://wa.me/${alumni.whatsapp}`} target="_blank" rel="noopener noreferrer" className="p-3 bg-green-50 text-green-600 rounded-full hover:bg-green-100 transition-colors">
                                                    <MessageCircle className="w-5 h-5" />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                )}

                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-64 text-gray-500">
                            No data found
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ViewAlumniModal;
