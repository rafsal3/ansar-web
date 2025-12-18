import apiClient from './apiClient';

export interface Course {
    id: number;
    name: string;
    department: string;
    duration: string;
    seats: number;
    createdAt?: string;
}

export interface CreateCourseData {
    name: string;
    department: string;
    duration: string;
    seats: number;
}

export interface CoursesResponse {
    message: string;
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
    };
    data: Course[];
}

export const coursesApi = {
    // Create a new course
    createCourse: async (data: CreateCourseData) => {
        const response = await apiClient.post('/courses/create', data);
        return response.data;
    },

    // Get all courses (with pagination)
    getAllCourses: async (page: number = 1, limit: number = 5) => {
        const response = await apiClient.get<CoursesResponse>('/courses', {
            params: { page, limit }
        });
        return response.data;
    },

    // Update a course
    updateCourse: async (id: number, data: Partial<CreateCourseData>) => {
        const response = await apiClient.put(`/courses/update/${id}`, data);
        return response.data;
    },

    // Delete a course
    deleteCourse: async (id: number) => {
        const response = await apiClient.delete(`/courses/delete/${id}`);
        return response.data;
    }
};
