import apiClient from './apiClient';

/* ================= TYPES ================= */

export interface NewsImage {
    id: number;
    imageUrl: string;
}

export interface News {
    id: number;
    title: string;
    category: string;
    status: 'draft' | 'publish';
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

/* ================= CREATE / UPDATE PAYLOAD ================= */

export interface CreateNewsPayload {
    title: string;
    category: string;
    status: 'draft' | 'publish';
    date?: string;
    images?: File[];
}

/* ================= HELPERS ================= */

/**
 * Converts CreateNewsPayload → FormData
 */
export const buildNewsFormData = (payload: CreateNewsPayload): FormData => {
    const formData = new FormData();

    formData.append('title', payload.title);
    formData.append('category', payload.category);
    formData.append('status', payload.status);

    if (payload.date) {
        formData.append('date', payload.date);
    }

    if (payload.images && payload.images.length > 0) {
        payload.images.forEach((file) => {
            formData.append('images', file); // MUST be "images"
        });
    }

    return formData;
};

/* ================= API CALLS ================= */

// Get all news (paginated)
export const getAllNews = async (
    params?: NewsQueryParams,
): Promise<NewsPaginatedResponse> => {
    const response = await apiClient.get('/news', { params });
    return response.data;
};

// Get single news by ID
export const getNewsById = async (id: number): Promise<News> => {
    const response = await apiClient.get(`/news/${id}`);
    // Backend returns { message: string, data: News }
    return response.data.data;
};

// Create news
export const createNews = async (payload: CreateNewsPayload) => {
    const formData = buildNewsFormData(payload);

    const response = await apiClient.post('/news/create', formData);
    return response.data;
};

// Update news
export const updateNews = async (
    id: number,
    payload: CreateNewsPayload,
) => {
    const formData = buildNewsFormData(payload);

    const response = await apiClient.put(`/news/${id}`, formData);
    return response.data;
};

// Delete news
export const deleteNews = async (id: number) => {
    const response = await apiClient.delete(`/news/${id}`);
    return response.data;
};
