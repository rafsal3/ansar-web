import apiClient from './apiClient';

export interface CreateMemoryData {
    description: string;
    status: string;
    userId: string | number;
    photos: File[];
}

export interface Memory {
    id: number;
    description: string;
    status: string;
    userId: number;
    photos: string[];
    createdAt: string;
}

export interface CreateMemoryResponse {
    message: string;
    data: Memory;
}

export interface AdminMemoryUser {
    id: number;
    name: string;
}

export interface AdminMemoryPhoto {
    id: number;
    url: string;
}

export interface AdminMemory {
    id: number;
    description: string;
    status: string;
    user: AdminMemoryUser;
    photos: AdminMemoryPhoto[];
    createdAt: string;
    isApproved: boolean;
}

export interface AdminMemoriesResponse {
    message: string;
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
    };
    data: AdminMemory[];
}

export const memoryApi = {
    createMemory: async (data: CreateMemoryData) => {
        const formData = new FormData();
        formData.append('description', data.description);
        formData.append('status', data.status);
        formData.append('userId', String(data.userId));

        if (data.photos && data.photos.length > 0) {
            data.photos.forEach((photo) => {
                formData.append('photos', photo);
            });
        }

        const response = await apiClient.post<{ data: CreateMemoryResponse }>('/memories/create', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    getAdminMemories: async (page: number = 1, limit: number = 10) => {
        const response = await apiClient.get<AdminMemoriesResponse>(`/admin/memories?page=${page}&limit=${limit}`);
        return response.data;
    },

    updateMemoryStatus: async (id: number, isApproved: boolean) => {
        const response = await apiClient.patch(`/admin/memory/${id}/status`, { isApproved });
        return response.data;
    },

    deleteMemory: async (id: number) => {
        const response = await apiClient.delete(`/memories/delete/${id}`);
        return response.data;
    },
};
