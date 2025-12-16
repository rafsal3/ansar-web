import apiClient from './apiClient';

export interface Faculty {
    id: number;
    name: string;
    designation: string;
    qualification: string;
    email: string;
    phone: number;
    photo: string;
    createdAt: string;
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
