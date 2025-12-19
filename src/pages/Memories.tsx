import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../api/apiClient';
import { useAuth } from '../contexts/AuthContext';
import { memoryApi, PublicMemory, MyMemory } from '../api/memoryApi';

// Components
import MemoriesTabs from '../components/memories/MemoriesTabs';
import MemoriesFilter from '../components/memories/MemoriesFilter';
import MemoryCard from '../components/memories/MemoryCard';
import EmptyMemoriesState from '../components/memories/EmptyMemoriesState';
import ShareMemoryModal from '../components/memories/ShareMemoryModal';
import ViewMemoryModal from '../components/memories/ViewMemoryModal';
import Pagination from '../components/memories/Pagination';

// Types
import { Memory, TabType } from '../components/memories/MemoriesTypes';

const Memories = () => {
    const { user } = useAuth();

    // Filters & Navigation
    const [selectedBatch, setSelectedBatch] = useState<string>('Class of 2010');
    const [sortBy, setSortBy] = useState<string>('Sort by Date');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [myMemoriesPage, setMyMemoriesPage] = useState<number>(1);
    const [activeTab, setActiveTab] = useState<TabType>('all');

    // Modal State
    const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
    const [viewingMemory, setViewingMemory] = useState<Memory | null>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    // Data State
    const [allMemories, setAllMemories] = useState<Memory[]>([]);
    const [myMemoriesList, setMyMemoriesList] = useState<Memory[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isMyMemoriesLoading, setIsMyMemoriesLoading] = useState<boolean>(false);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [myMemoriesTotalPages, setMyMemoriesTotalPages] = useState<number>(1);

    const batches: string[] = ['Class of 2010', 'Class of 2011', 'Class of 2012', 'Class of 2013', 'Class of 2014'];
    const sortOptions: string[] = ['Sort by Date', 'Sort by Name', 'Sort by Batch'];

    const fetchMemories = async () => {
        try {
            setIsLoading(true);
            const response = await memoryApi.getAllMemories(currentPage, 9); // limit 9 for grid layout

            const formattedMemories: Memory[] = response.data.map((item: PublicMemory) => ({
                id: item.id,
                title: item.description.length > 50 ? item.description.substring(0, 50) + '...' : item.description,
                description: item.description,
                author: item.user.name,
                batch: '', // Batch is not returned in listing API currently
                date: new Date(item.createdAt).toLocaleDateString('en-US'),
                images: item.photos.length > 0 ? item.photos.map(p => `${API_BASE_URL}/uploads/${p.url}`) : []
            }));

            setAllMemories(formattedMemories);
            setTotalPages(response.meta.totalPages);
        } catch (error) {
            console.error("Failed to fetch memories:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchMyMemories = async () => {
        if (!user) return;
        try {
            setIsMyMemoriesLoading(true);
            const response = await memoryApi.getMyMemories(myMemoriesPage, 9); // limit 9 for grid layout

            const formattedMemories: Memory[] = response.data.map((item: MyMemory) => ({
                id: item.id,
                title: item.description.length > 50 ? item.description.substring(0, 50) + '...' : item.description,
                description: item.description,
                author: 'You', // It's my memory
                batch: (user as any).batch || '', // Use user's batch
                date: new Date(item.createdAt).toLocaleDateString('en-US'),
                images: item.photos.length > 0 ? item.photos.map(p => `${API_BASE_URL}/uploads/${p.url}`) : [],
                isApproved: item.isApproved,
                status: item.status
            }));

            setMyMemoriesList(formattedMemories);
            setMyMemoriesTotalPages(response.pagination.totalPages);
        } catch (error) {
            console.error("Failed to fetch my memories:", error);
        } finally {
            setIsMyMemoriesLoading(false);
        }
    };

    useEffect(() => {
        if (activeTab === 'all') {
            fetchMemories();
        } else if (activeTab === 'my') {
            fetchMyMemories();
        }
    }, [currentPage, myMemoriesPage, activeTab]);


    const handleDeleteMemory = async (id: number): Promise<void> => {
        if (window.confirm("Are you sure you want to delete this memory? This action cannot be undone.")) {
            try {
                const response = await memoryApi.deleteMyMemory(id);
                // Remove from local state
                setMyMemoriesList(myMemoriesList.filter(m => m.id !== id));
                // Show success message
                alert(response.message || "Memory deleted successfully");
            } catch (error) {
                console.error("Failed to delete memory:", error);
                alert("Failed to delete memory. Please try again.");
            }
        }
    };

    const handleCreateMemory = async (description: string, files: File[]) => {
        if (!user) {
            alert("Please login to share a memory.");
            return;
        }

        try {
            setIsSubmitting(true);
            await memoryApi.createMemory({
                description: description,
                status: 'active',
                userId: user.id,
                photos: files
            });

            // Refresh list after create
            if (activeTab === 'my') {
                fetchMyMemories();
            } else {
                // Switch to 'My Memories' tab to show the new memory and trigger fetch
                setActiveTab('my');
            }

            setIsShareModalOpen(false);

        } catch (error) {
            console.error("Failed to create memory:", error);
            alert("Failed to share memory. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Batch Memories</h1>
                    <p className="text-gray-600">A legacy of excellence, integrity, and community service.</p>
                </div>

                {/* Tabs */}
                <MemoriesTabs
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                />

                {/* Controls (All Memories only) */}
                {activeTab === 'all' && (
                    <MemoriesFilter
                        batches={batches}
                        selectedBatch={selectedBatch}
                        onBatchChange={setSelectedBatch}
                        sortOptions={sortOptions}
                        sortBy={sortBy}
                        onSortChange={setSortBy}
                        onShare={() => setIsShareModalOpen(true)}
                    />
                )}

                {/* Memories Grid - All Memories */}
                {activeTab === 'all' && (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                            {isLoading ? (
                                <div className="col-span-full flex justify-center py-12">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                                </div>
                            ) : allMemories.length === 0 ? (
                                <div className="col-span-full text-center py-12 text-gray-500">
                                    No memories found.
                                </div>
                            ) : (
                                allMemories.map((memory) => (
                                    <MemoryCard
                                        key={memory.id}
                                        memory={memory}
                                        isOwner={false}
                                    />
                                ))
                            )}
                        </div>

                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    </>
                )}

                {/* My Memories Section */}
                {activeTab === 'my' && (
                    <div>
                        {isMyMemoriesLoading ? (
                            <div className="flex justify-center py-12">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                            </div>
                        ) : myMemoriesList.length === 0 ? (
                            <EmptyMemoriesState onShare={() => setIsShareModalOpen(true)} />
                        ) : (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                                    {myMemoriesList.map((memory) => (
                                        <MemoryCard
                                            key={memory.id}
                                            memory={memory}
                                            isOwner={true}
                                            onView={(m) => setViewingMemory(m)}
                                            onDelete={handleDeleteMemory}
                                        />
                                    ))}
                                </div>

                                <Pagination
                                    currentPage={myMemoriesPage}
                                    totalPages={myMemoriesTotalPages}
                                    onPageChange={setMyMemoriesPage}
                                />
                            </>
                        )}
                    </div>
                )}
            </div>

            {/* Modals */}
            <ShareMemoryModal
                isOpen={isShareModalOpen}
                onClose={() => setIsShareModalOpen(false)}
                onSave={handleCreateMemory}
                isSubmitting={isSubmitting}
            />

            <ViewMemoryModal
                isOpen={!!viewingMemory}
                onClose={() => setViewingMemory(null)}
                memory={viewingMemory}
            />
        </div >
    );
};

export default Memories;