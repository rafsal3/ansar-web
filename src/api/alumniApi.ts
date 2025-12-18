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
    isActive?: boolean;
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

export interface AlumniProfile {
    id: number;
    name: string;
    email: string;
    phone: string;
    course: string;
    startYear: number;
    endYear: number;
    className: string;
    instagram: string | null;
    facebook: string | null;
    whatsapp: string | null;
    job: {
        id: number;
        name: string;
    } | null;
    photos: string[];
    isActive: boolean;
}

export interface AlumniUpdateData {
    name: string;
    email: string;
    phone: string;
    course: string;
    startYear: string;
    endYear: string;
    className: string;
    jobId: string;
    instagram?: string;
    facebook?: string;
    whatsapp?: string;
    password?: string;
    confirmPassword?: string;
    photo?: File;
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
    },

    getAlumniMe: async () => {
        const response = await apiClient.get<AlumniProfile>('/Alumini/me');
        return response.data;
    },

    updateAlumniProfile: async (data: AlumniUpdateData) => {
        const formData = new FormData();

        // Append all fields to formData
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('phone', data.phone);
        formData.append('course', data.course);
        formData.append('startYear', data.startYear);
        formData.append('endYear', data.endYear);
        formData.append('className', data.className);
        formData.append('jobId', data.jobId);

        // Append optional fields only if they have values
        if (data.instagram) formData.append('instagram', data.instagram);
        if (data.facebook) formData.append('facebook', data.facebook);
        if (data.whatsapp) formData.append('whatsapp', data.whatsapp);
        if (data.password) formData.append('password', data.password);
        if (data.confirmPassword) formData.append('confirmPassword', data.confirmPassword);
        if (data.photo) formData.append('photo', data.photo);

        const response = await apiClient.put('/Alumini/update-me', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    filterAlumni: async (jobId?: number, page: number = 1, limit: number = 10) => {
        const params = new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
        });

        if (jobId) {
            params.append('jobId', jobId.toString());
        }

        const response = await apiClient.get<AlumniResponse>(`/alumini/filter?${params.toString()}`);
        return response.data;
    }
};
