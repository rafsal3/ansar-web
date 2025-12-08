import apiClient from './apiClient';

export interface Job {
    id?: number;
    name: string;
    icon?: File | string;
    createdAt?: string;
    updatedAt?: string;
}

// Get all jobs
export const getAllJobs = async () => {
    const response = await apiClient.get('/job');
    return response.data;
};

// Get single job by ID
export const getJobById = async (id: number) => {
    const response = await apiClient.get(`/job/${id}`);
    return response.data;
};

// Create new job
export const createJob = async (data: FormData) => {
    const response = await apiClient.post('/job/create', data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

// Update job
export const updateJob = async (id: number, data: FormData) => {
    const response = await apiClient.put(`/job/${id}`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

// Delete job
export const deleteJob = async (id: number) => {
    const response = await apiClient.delete(`/job/${id}`);
    return response.data;
};
