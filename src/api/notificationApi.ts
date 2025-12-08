import apiClient from './apiClient';

export interface Notification {
    id?: number;
    title: string;
    message: string;
    audiance: 'students' | 'alumni' | 'all';
    file?: File | string;
    createdAt?: string;
    updatedAt?: string;
}

// Get all notifications
export const getAllNotifications = async () => {
    const response = await apiClient.get('/notification');
    return response.data;
};

// Get single notification by ID
export const getNotificationById = async (id: number) => {
    const response = await apiClient.get(`/notification/${id}`);
    return response.data;
};

// Create new notification
export const createNotification = async (data: FormData) => {
    const response = await apiClient.post('/notification/create', data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

// Update notification
export const updateNotification = async (id: number, data: FormData) => {
    const response = await apiClient.put(`/notification/${id}`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

// Delete notification
export const deleteNotification = async (id: number) => {
    const response = await apiClient.delete(`/notification/${id}`);
    return response.data;
};
