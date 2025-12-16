import apiClient from './apiClient';

export interface Faculty {
    id: number;
    name: string;
    designation: string;
    qualification: string;
    email: string;
    phone: string;
    photo: string;
    createdAt: string;
    jobId?: number;
    departmentIds?: number[];
    // For single faculty fetch response
    departments?: string[];
    jobName?: string;
}

export interface FacultyListResponse {
    message: string;
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
    };
    data: Faculty[];
}

export interface SingleFacultyResponse {
    message: string;
    data: Faculty;
}

export const DEPARTMENT_IDS = [
    { id: 1, name: 'Arts' },
    { id: 2, name: 'Commerce' },
    { id: 3, name: 'Science' },
];

export const fetchAllFaculty = async (page: number = 1, limit: number = 10, search: string = ''): Promise<FacultyListResponse> => {
    try {
        const response = await apiClient.get('/faculty/all', {
            params: {
                page,
                limit,
                search
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getFacultyById = async (id: number): Promise<SingleFacultyResponse> => {
    const response = await apiClient.get(`/faculty/${id}`);
    return response.data;
};

export const createFaculty = async (data: {
    name: string;
    qualification: string;
    designation: string;
    email: string;
    phone: string;
    photo: File;
    departmentIds: number[];
    jobId: string;
}) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('qualification', data.qualification);
    formData.append('designation', data.designation);
    formData.append('email', data.email);
    formData.append('phone', data.phone);
    formData.append('photo', data.photo);
    formData.append('jobId', data.jobId);

    // Append departmentIds array
    data.departmentIds.forEach(id => {
        formData.append('departmentIds[]', id.toString());
    });

    const response = await apiClient.post('/faculty/create', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const updateFaculty = async (id: number, data: {
    name?: string;
    qualification?: string;
    designation?: string;
    email?: string;
    phone?: string;
    photo?: File;
    departmentIds?: number[];
    jobId?: string;
}) => {
    const formData = new FormData();
    if (data.name) formData.append('name', data.name);
    if (data.qualification) formData.append('qualification', data.qualification);
    if (data.designation) formData.append('designation', data.designation);
    if (data.email) formData.append('email', data.email);
    if (data.phone) formData.append('phone', data.phone);
    if (data.photo) formData.append('photo', data.photo);
    if (data.jobId) formData.append('jobId', data.jobId);

    if (data.departmentIds) {
        data.departmentIds.forEach(deptId => {
            formData.append('departmentIds[]', deptId.toString());
        });
    }

    const response = await apiClient.put(`/faculty/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const deleteFaculty = async (id: number) => {
    const response = await apiClient.delete(`/faculty/delete/${id}`);
    return response.data;
};
