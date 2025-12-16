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
