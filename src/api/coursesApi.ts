import apiClient from './apiClient';

export interface Course {
    id?: number;
    name: string;
    description?: string;
    duration?: string;
    departmentId?: number;
    image?: File | string;
    createdAt?: string;
    updatedAt?: string;
}

export interface CourseQueryParams {
    departmentId?: number;
    limit?: number;
    page?: number;
}

// Get all courses
export const getAllCourses = async (params?: CourseQueryParams) => {
    const response = await apiClient.get('/course', { params });
    return response.data;
};

// Get single course by ID
export const getCourseById = async (id: number) => {
    const response = await apiClient.get(`/course/${id}`);
    return response.data;
};

// Create new course
export const createCourse = async (data: FormData) => {
    const response = await apiClient.post('/course/create', data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

// Update course
export const updateCourse = async (id: number, data: FormData) => {
    const response = await apiClient.put(`/course/${id}`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

// Delete course
export const deleteCourse = async (id: number) => {
    const response = await apiClient.delete(`/course/${id}`);
    return response.data;
};
