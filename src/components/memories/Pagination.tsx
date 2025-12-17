import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
    if (totalPages <= 1) return null;

    const renderPageNumbers = () => {
        const pages = [];
        const maxVisible = 3;
        let start = Math.max(1, currentPage - 1);
        let end = Math.min(start + maxVisible - 1, totalPages);

        if (end - start + 1 < maxVisible) {
            start = Math.max(1, end - maxVisible + 1);
        }

        // Ensure start is at least 1
        start = Math.max(1, start);

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        return pages.map(page => (
            <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`w-10 h-10 rounded-lg font-medium transition-colors ${currentPage === page
                    ? 'bg-teal-600 text-white'
                    : 'hover:bg-gray-200 text-gray-700'
                    }`}
            >
                {page}
            </button>
        ));
    };

    return (
        <div className="flex justify-center items-center gap-2">
            <button
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>

            {renderPageNumbers()}

            {totalPages > 3 && currentPage < totalPages - 1 && (
                <span className="px-2 text-gray-500">...</span>
            )}

            {totalPages > 3 && currentPage < totalPages && (
                <button
                    onClick={() => onPageChange(totalPages)}
                    className={`w-10 h-10 rounded-lg font-medium transition-colors ${currentPage === totalPages
                        ? 'bg-teal-600 text-white'
                        : 'hover:bg-gray-200 text-gray-700'
                        }`}
                >
                    {totalPages}
                </button>
            )}

            <button
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
        </div>
    );
};

export default Pagination;
