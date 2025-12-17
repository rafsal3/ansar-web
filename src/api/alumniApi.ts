import apiClient from './apiClient';

export interface AlumniRegisterData {
    name: string;
    email: string;
    phone: string;
    course: string;
    startYear: string;
    endYear: string;
    className: string;
    password: string;
    confirmPassword: string;
    jobId: string;
    photos: File;
}

export interface Job {
    id: number;
    name: string;
}

export interface Alumni {
    id: number;
    course: string;
    startYear: number;
    endYear: number;
    className: string;
    instagram: string | null;
    facebook: string | null;
    whatsapp: string | null;
    job: Job | null;
    photos: string[];
    userId: number;
    name: string;
    email: string;
    phone: string;
    isActive: boolean;
}

export interface AlumniDetails {
    id: number;
    course: string;
    startYear: number;
    endYear: number;
    className: string;
    instagram: string | null;
    facebook: string | null;
    whatsapp: string | null;
    photos: string[];
    user: {
        id: number;
        name: string;
        email: string;
        phone: string;
    };
    job: {
        id: number;
        title: string;
    } | null;
}

export interface AlumniPagination {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}

export interface AlumniResponse {
    message: string;
    count: number;
    data: Alumni[];
    pagination: AlumniPagination;
}



export const alumniApi = {
    // ... existing functions
    register: async (data: AlumniRegisterData) => {
        const formData = new FormData();

        Object.keys(data).forEach(key => {
            if (key === 'photos') {
                formData.append('photos', data.photos);
            } else {
                formData.append(key, data[key as keyof AlumniRegisterData] as string);
            }
        });

        const response = await apiClient.post('/alumini/create', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    getAllAlumni: async (page: number = 1, limit: number = 10) => {
        const response = await apiClient.get<AlumniResponse>(`/alumini?page=${page}&limit=${limit}`);
        return response.data;
    },

    getAllAlumniAdmin: async (page: number = 1, limit: number = 10) => {
        const response = await apiClient.get<AlumniResponse>(`/admin/alumni/all?page=${page}&limit=${limit}`);
        return response.data;
    },



    updateStatus: async (id: number, isActive: boolean) => {
        const response = await apiClient.patch(`/admin/alumni/${id}/status`, { isActive });
        return response.data;
    },

    getAlumniById: async (id: number) => {
        const response = await apiClient.get<AlumniDetails>(`/alumini/${id}`);
        return response.data;
    }
};
