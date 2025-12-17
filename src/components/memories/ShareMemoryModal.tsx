import { useState, ChangeEvent, useEffect } from 'react';
import { X, Image, Trash2, Upload } from 'lucide-react';

interface ShareMemoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (description: string, files: File[]) => Promise<void>;
    isSubmitting: boolean;
}

const ShareMemoryModal = ({ isOpen, onClose, onSave, isSubmitting }: ShareMemoryModalProps) => {
    const [description, setDescription] = useState('');
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

    // Reset state when modal opens
    useEffect(() => {
        if (isOpen) {
            setDescription('');
            setSelectedFiles([]);
        }
    }, [isOpen]);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            setSelectedFiles((prevFiles) => [...prevFiles, ...filesArray]);
        }
    };

    const removeFile = (index: number) => {
        setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    const handleSave = async () => {
        await onSave(description, selectedFiles);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-8">
                    {/* Modal Header */}
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
                                Share a memory
                            </h2>
                            <p className="text-gray-500">A legacy of excellence, integrity, and community service.</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Photo Upload Area */}
                    <div className="mb-6">
                        <label className="block text-base font-semibold text-gray-900 mb-3">
                            Photos
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center">
                            <div className="flex flex-col items-center">
                                {selectedFiles.length === 0 ? (
                                    <>
                                        <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mb-4">
                                            <Image className="w-8 h-8 text-purple-600" />
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">Add Photos</h3>
                                        <p className="text-gray-500 mb-4">Drag & drop files here or click to browse</p>
                                    </>
                                ) : (
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full mb-4">
                                        {selectedFiles.map((file, index) => (
                                            <div key={index} className="relative group aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                                                <img
                                                    src={URL.createObjectURL(file)}
                                                    alt={`Preview ${index}`}
                                                    className="w-full h-full object-cover"
                                                />
                                                <button
                                                    onClick={() => removeFile(index)}
                                                    className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <div className="relative">
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                    <button className="flex items-center gap-2 px-6 py-3 bg-purple-100 text-purple-600 font-medium rounded-xl hover:bg-purple-200 transition-colors pointer-events-none">
                                        <Upload className="w-5 h-5" />
                                        {selectedFiles.length > 0 ? 'Add More Photos' : 'Upload Photos'}
                                    </button>
                                </div>
                                {selectedFiles.length > 0 && (
                                    <p className="mt-3 text-sm text-gray-500">
                                        {selectedFiles.length} photo{selectedFiles.length !== 1 ? 's' : ''} selected
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="mb-6">
                        <label className="block text-base font-semibold text-gray-900 mb-3">
                            What is this memory about?
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Tell your story"
                            rows={8}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 justify-end">
                        <button
                            onClick={onClose}
                            className="px-8 py-3 bg-purple-100 text-purple-600 font-medium rounded-xl hover:bg-purple-200 transition-colors"
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={isSubmitting}
                            className="px-8 py-3 bg-purple-600 text-white font-medium rounded-xl hover:bg-purple-700 transition-colors shadow-lg shadow-purple-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Saving...
                                </>
                            ) : (
                                'Share your Memory'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShareMemoryModal;
