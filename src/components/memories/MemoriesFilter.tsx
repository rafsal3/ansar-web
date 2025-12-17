import { ChevronDown, Upload } from 'lucide-react';

interface MemoriesFilterProps {
    batches: string[];
    selectedBatch: string;
    onBatchChange: (batch: string) => void;
    sortOptions: string[];
    sortBy: string;
    onSortChange: (sort: string) => void;
    onShare: () => void;
}

const MemoriesFilter = ({
    batches,
    selectedBatch,
    onBatchChange,
    sortOptions,
    sortBy,
    onSortChange,
    onShare
}: MemoriesFilterProps) => {
    return (
        <div className="flex justify-between items-center mb-8">
            <div className="flex gap-4">
                {/* Batch Dropdown */}
                <div className="relative">
                    <select
                        value={selectedBatch}
                        onChange={(e) => onBatchChange(e.target.value)}
                        className="appearance-none bg-white border border-gray-300 rounded-xl px-4 py-3 pr-10 text-sm font-medium text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent cursor-pointer"
                    >
                        {batches.map((batch) => (
                            <option key={batch} value={batch}>{batch}</option>
                        ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>

                {/* Sort Dropdown */}
                <div className="relative">
                    <select
                        value={sortBy}
                        onChange={(e) => onSortChange(e.target.value)}
                        className="appearance-none bg-white border border-gray-300 rounded-xl px-4 py-3 pr-10 text-sm font-medium text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent cursor-pointer"
                    >
                        {sortOptions.map((option) => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
            </div>

            {/* Share Button */}
            <button
                onClick={onShare}
                className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-xl transition-colors shadow-lg shadow-purple-200"
            >
                <Upload className="w-5 h-5" />
                Share your Memories
            </button>
        </div>
    );
};

export default MemoriesFilter;
