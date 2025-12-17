import { User, Eye, Trash2 } from 'lucide-react';
import ImageSlider from '../../components/ImageSlider';
import { Memory } from './MemoriesTypes';

interface MemoryCardProps {
    memory: Memory;
    isOwner?: boolean;
    onView?: (memory: Memory) => void;
    onDelete?: (id: number) => void;
}

const MemoryCard = ({ memory, isOwner = false, onView, onDelete }: MemoryCardProps) => {
    return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 relative">
            {/* Status Badge from API (Only for My Memories) */}
            {isOwner && (
                <div className={`absolute top-4 right-4 z-10 px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${memory.isApproved
                    ? 'bg-green-100 text-green-700 border border-green-200'
                    : 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                    }`}>
                    {memory.isApproved ? 'Approved' : 'Pending'}
                </div>
            )}

            {/* Image Slider or Single Image */}
            <div className="h-64 w-full relative overflow-hidden">
                {memory.images && memory.images.length > 0 ? (
                    <ImageSlider images={memory.images} className="h-64" />
                ) : (
                    <div className={`w-full h-full flex items-center justify-center ${isOwner ? 'bg-gradient-to-br from-purple-200 to-purple-300 text-purple-600' : 'bg-gradient-to-br from-gray-200 to-gray-300 text-gray-400'
                        }`}>
                        <span className="text-sm font-medium">{isOwner ? 'Your Memory' : 'No Image'}</span>
                    </div>
                )}
            </div>

            <div className="p-6">
                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 mb-4 line-clamp-2">{memory.title}</h3>

                {/* Author & Batch */}
                <div className={`flex items-center justify-between text-sm ${isOwner ? 'mb-4' : ''}`}>
                    <div className="flex items-center gap-2">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center overflow-hidden ${isOwner ? 'bg-purple-500' : 'bg-gray-300'
                            }`}>
                            <User className={`w-4 h-4 ${isOwner ? 'text-white' : 'text-gray-600'}`} />
                        </div>
                        <span className="font-medium text-gray-700">{memory.author}</span>
                    </div>
                    <span className="text-gray-500">{memory.batch}</span>
                </div>

                {/* Date */}
                <div className={`text-sm text-gray-500 ${isOwner ? 'mb-4' : 'mt-2'}`}>{memory.date}</div>

                {/* Action Buttons (Only for My Memories) */}
                {isOwner && (
                    <div className="flex gap-2">
                        <button
                            onClick={() => onView && onView(memory)}
                            className="flex-1 px-4 py-2 bg-purple-100 text-purple-600 font-medium rounded-lg hover:bg-purple-200 transition-colors text-sm flex items-center justify-center gap-2"
                        >
                            <Eye className="w-4 h-4" />
                            View
                        </button>
                        <button
                            onClick={() => onDelete && onDelete(memory.id)}
                            className="flex-1 px-4 py-2 bg-red-100 text-red-600 font-medium rounded-lg hover:bg-red-200 transition-colors text-sm flex items-center justify-center gap-2"
                        >
                            <Trash2 className="w-4 h-4" />
                            Delete
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MemoryCard;
