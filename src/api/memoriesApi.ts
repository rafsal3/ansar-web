import apiClient from './apiClient';

export interface Memory {
    id?: number;
    description: string;
    status: 'active' | 'inactive';
    photos?: File[] | string[];
    userId: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface MemoryQueryParams {
    userId?: number;
    status?: string;
    limit?: number;
    page?: number;
}

// Get all memories
export const getAllMemories = async (params?: MemoryQueryParams) => {
    const response = await apiClient.get('/memories/', { params });
    return response.data;
};

// Get single memory by ID
export const getMemoryById = async (id: number) => {
    const response = await apiClient.get(`/memories/${id}`);
    return response.data;
};

// Create new memory
export const createMemory = async (data: FormData) => {
    const response = await apiClient.post('/memories/create', data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

// Update memory
export const updateMemory = async (id: number, data: FormData) => {
    const response = await apiClient.put(`/memories/${id}`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

// Delete memory
export const deleteMemory = async (id: number) => {
    const response = await apiClient.delete(`/memories/delete/${id}`);
    return response.data;
};
