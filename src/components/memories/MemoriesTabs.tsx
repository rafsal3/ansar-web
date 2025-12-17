import { TabType } from './MemoriesTypes';

interface MemoriesTabsProps {
    activeTab: TabType;
    onTabChange: (tab: TabType) => void;
}

const MemoriesTabs = ({ activeTab, onTabChange }: MemoriesTabsProps) => {
    return (
        <div className="flex gap-2 mb-8 border-b border-gray-200">
            <button
                onClick={() => onTabChange('all')}
                className={`px-6 py-3 font-medium transition-colors relative ${activeTab === 'all'
                    ? 'text-purple-600'
                    : 'text-gray-600 hover:text-gray-900'
                    }`}
            >
                All Memories
                {activeTab === 'all' && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600"></div>
                )}
            </button>
            <button
                onClick={() => onTabChange('my')}
                className={`px-6 py-3 font-medium transition-colors relative ${activeTab === 'my'
                    ? 'text-purple-600'
                    : 'text-gray-600 hover:text-gray-900'
                    }`}
            >
                My Memories
                {activeTab === 'my' && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600"></div>
                )}
            </button>
        </div>
    );
};

export default MemoriesTabs;
