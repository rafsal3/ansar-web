import { Image, Upload } from 'lucide-react';

interface EmptyMemoriesStateProps {
    onShare: () => void;
}

const EmptyMemoriesState = ({ onShare }: EmptyMemoriesStateProps) => {
    return (
        <div className="flex items-center justify-center py-16">
            <div className="max-w-md w-full">
                <div className="bg-white rounded-3xl p-12 text-center border-2 border-dashed border-gray-300 hover:border-purple-300 transition-colors">
                    <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Image className="w-10 h-10 text-purple-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                        No Memories Yet
                    </h3>
                    <p className="text-gray-600 mb-8">
                        Share your first memory with your batch mates and start building your legacy.
                    </p>
                    <button
                        onClick={onShare}
                        className="inline-flex items-center gap-2 px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-xl transition-colors shadow-lg shadow-purple-200"
                    >
                        <Upload className="w-5 h-5" />
                        Share Your First Memory
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EmptyMemoriesState;
