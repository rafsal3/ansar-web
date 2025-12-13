import apiClient from './apiClient';

export interface NewsImage {
    id: number;
    imageUrl: string;
}

export interface News {
    id: number;
    title: string;
    category: string;
    status: 'draft' | 'published';
    images: NewsImage[];
    date: string;
    createdAt: string;
    content?: string;
    author?: string;
}

export interface NewsQueryParams {
    limit?: number;
    page?: number;
    category?: string;
    status?: string;
}

export interface NewsPaginatedResponse {
    message: string;
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
    data: News[];
}

// Get all news (paginated)
export const getAllNews = async (params?: NewsQueryParams): Promise<NewsPaginatedResponse> => {
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