import apiClient from './apiClient';

export interface News {
    id?: number;
    title: string;
    content: string;
    image?: File | string;
    author?: string;
    publishedDate?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface NewsQueryParams {
    limit?: number;
    page?: number;
}

// Get all news
export const getAllNews = async (params?: NewsQueryParams) => {
    const response = await apiClient.get('/news', { params });
    return response.data;
};

// Get single news by ID
export const getNewsById = async (id: number) => {
    const response = await apiClient.get(`/news/${id}`);
    return response.data;
};

// Create new news
export const createNews = async (data: FormData) => {
    const response = await apiClient.post('/news/create', data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

// Update news
export const updateNews = async (id: number, data: FormData) => {
    const response = await apiClient.put(`/news/${id}`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

// Delete news
export const deleteNews = async (id: number) => {
    const response = await apiClient.delete(`/news/${id}`);
    return response.data;
};
