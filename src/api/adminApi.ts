import apiClient from './apiClient';

export interface DashboardStats {
    message: string;
    totalAlumni: number;
    totalMemories: number;
    totalNews: number;
    totalfaculty: number;
    totalCourses: number;
    totalEvents: number;
}

export const adminApi = {
    /**
     * Fetch dashboard statistics
     * GET /admin/dashboard
     */
    getDashboardStats: async (): Promise<DashboardStats> => {
        const response = await apiClient.get<DashboardStats>('/admin/dashboard');
        return response.data;
    },
};
