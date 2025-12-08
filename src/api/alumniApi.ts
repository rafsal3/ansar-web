import apiClient from './apiClient';

export interface Alumni {
    id?: number;
    name: string;
    email: string;
    phone: string;
    course: string;
    startYear: string;
    endYear: string;
    className: string;
    password?: string;
    confirmPassword?: string;
    photos?: File | string;
    jobId: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface AlumniQueryParams {
    jobId?: number;
    limit?: number;
    page?: number;
}

// Get all alumni with optional filters
export const getAllAlumni = async (params?: AlumniQueryParams) => {
    const response = await apiClient.get('/alumini', { params });
    return response.data;
};

// Get single alumni by ID
export const getAlumniById = async (id: number) => {
    const response = await apiClient.get(`/alumini/${id}`);
    return response.data;
};

// Create new alumni
export const createAlumni = async (data: FormData) => {
    const response = await apiClient.post('/alumini/create', data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

// Update alumni
export const updateAlumni = async (id: number, data: FormData) => {
    const response = await apiClient.put(`/alumini/${id}`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

// Delete alumni
export const deleteAlumni = async (id: number) => {
    const response = await apiClient.delete(`/alumini/delete/${id}`);
    return response.data;
};
