import apiClient from './apiClient';

export interface Event {
    id?: number;
    name: string;
    location: string;
    status: 'upcoming' | 'ongoing' | 'completed';
    image?: File | string;
    date: string;
    description?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface EventQueryParams {
    status?: string;
    limit?: number;
    page?: number;
}

// Get all events
export const getAllEvents = async (params?: EventQueryParams) => {
    const response = await apiClient.get('/events', { params });
    return response.data;
};

// Get single event by ID
export const getEventById = async (id: number) => {
    const response = await apiClient.get(`/events/${id}`);
    return response.data;
};

// Create new event
export const createEvent = async (data: FormData) => {
    const response = await apiClient.post('/events/create', data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

// Update event
export const updateEvent = async (id: number, data: FormData) => {
    const response = await apiClient.put(`/events/${id}`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

// Delete event
export const deleteEvent = async (id: number) => {
    const response = await apiClient.delete(`/events/${id}`);
    return response.data;
};
