import apiClient from './apiClient';

/* ================= TYPES ================= */

export interface Notification {
    id: number;
    title: string;
    message: string;
    audiance: string;
    files: string | null;
    createdAt: string;
}

export interface NotificationQueryParams {
    limit?: number;
    page?: number;
    audiance?: string;
}

export interface NotificationPaginatedResponse {
    message: string;
    meta?: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
    data: Notification[];
}

export interface NotificationResponse {
    message: string;
    data: Notification;
}

/* ================= CREATE / UPDATE PAYLOAD ================= */

export interface CreateNotificationPayload {
    title: string;
    message: string;
    audiance: string;
    file?: File;
}

/* ================= HELPERS ================= */

/**
 * Converts CreateNotificationPayload → FormData
 */
export const buildNotificationFormData = (payload: CreateNotificationPayload): FormData => {
    const formData = new FormData();

    formData.append('title', payload.title);
    formData.append('message', payload.message);
    formData.append('audiance', payload.audiance);

    if (payload.file) {
        formData.append('file', payload.file);
    }

    return formData;
};

/* ================= API CALLS ================= */

// Get all notifications (paginated)
export const getAllNotifications = async (
    params?: NotificationQueryParams,
): Promise<NotificationPaginatedResponse> => {
    const response = await apiClient.get('/notification', { params });
    return response.data;
};

// Get single notification by ID
export const getNotificationById = async (id: number): Promise<Notification> => {
    const response = await apiClient.get(`/notification/${id}`);
    // Backend returns { message: string, data: Notification }
    return response.data.data;
};

// Create notification
export const createNotification = async (payload: CreateNotificationPayload): Promise<NotificationResponse> => {
    const formData = buildNotificationFormData(payload);

    const response = await apiClient.post('/notification/create', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

// Update notification
export const updateNotification = async (
    id: number,
    payload: CreateNotificationPayload,
): Promise<NotificationResponse> => {
    const formData = buildNotificationFormData(payload);

    const response = await apiClient.put(`/notification/${id}`, formData, {
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
