import apiClient from './apiClient';

export interface Department {
    id?: number;
    name: string;
    description?: string;
    headOfDepartment?: string;
    image?: File | string;
    createdAt?: string;
    updatedAt?: string;
}

// Get all departments
export const getAllDepartments = async () => {
    const response = await apiClient.get('/department');
    return response.data;
};

// Get single department by ID
export const getDepartmentById = async (id: number) => {
    const response = await apiClient.get(`/department/${id}`);
    return response.data;
};

// Create new department
export const createDepartment = async (data: FormData) => {
    const response = await apiClient.post('/department/create', data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

// Update department
export const updateDepartment = async (id: number, data: FormData) => {
    const response = await apiClient.put(`/department/${id}`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

// Delete department
export const deleteDepartment = async (id: number) => {
    const response = await apiClient.delete(`/department/${id}`);
    return response.data;
};
