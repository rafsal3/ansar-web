import { X, Image, User } from 'lucide-react';
import ImageSlider from '../../components/ImageSlider';
import { Memory } from './MemoriesTypes';

interface ViewMemoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    memory: Memory | null;
}

const ViewMemoryModal = ({ isOpen, onClose, memory }: ViewMemoryModalProps) => {
    if (!isOpen || !memory) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
                {/* Header */}
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Memory Details</h2>
                        <p className="text-sm text-gray-500 mt-1">
                            Shared on {memory.date}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-0">
                    <div className="flex flex-col md:flex-row h-full">
                        {/* Left Side: Images */}
                        <div className="w-full md:w-1/2 bg-gray-100 min-h-[300px] md:min-h-[500px] relative flex flex-col justify-center">
                            {memory.images && memory.images.length > 0 ? (
                                <div className="h-full w-full">
                                    <ImageSlider images={memory.images} className="h-full w-full object-contain" />
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full text-gray-400 p-8">
                                    <Image className="w-16 h-16 mb-4 opacity-50" />
                                    <span className="text-lg font-medium">No Images</span>
                                </div>
                            )}
                        </div>

                        {/* Right Side: Content */}
                        <div className="w-full md:w-1/2 p-8 flex flex-col">
                            <div className="mb-6">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${memory.isApproved
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-yellow-100 text-yellow-700'
                                        }`}>
                                        {memory.isApproved ? 'Approved' : 'Pending Review'}
                                    </div>
                                    <span className="text-sm text-gray-400">
                                        ID: #{memory.id}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 mb-4">Description</h3>
                                <div className="prose prose-purple max-w-none text-gray-600 leading-relaxed whitespace-pre-wrap">
                                    {memory.description || "No description provided."}
                                </div>
                            </div>

                            <div className="mt-auto pt-6 border-t border-gray-100">
                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                    <div className="flex items-center gap-2">
                                        <User className="w-4 h-4" />
                                        <span>{memory.author}</span>
                                    </div>
                                    <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                                    <div>
                                        {memory.batch}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewMemoryModal;
