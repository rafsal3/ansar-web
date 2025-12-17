import apiClient from './apiClient';

export interface Job {
    id: number;
    name: string;
    icon: string;
    date: string;
}

export interface JobsResponse {
    message: string;
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
    };
    data: Job[];
}

export const createJob = async (name: string, icon: File, date: string) => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('icon', icon);
    formData.append('date', date);

    const response = await apiClient.post('/job/create', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const updateJob = async (id: number, name: string, icon?: File) => {
    const formData = new FormData();
    formData.append('name', name);
    if (icon) {
        formData.append('icon', icon);
    }

    const response = await apiClient.put(`/job/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const deleteJob = async (id: number) => {
    const response = await apiClient.delete(`/job/${id}`);
    return response.data;
};

export const getAllJobs = async (): Promise<JobsResponse> => {
    const response = await apiClient.get('/job/');
    return response.data;
};
