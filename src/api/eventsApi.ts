import apiClient from './apiClient';

/* ================= TYPES ================= */

export interface EventImage {
    id: number;
    imageUrl: string;
}

export interface Event {
    id: number;
    name: string;
    description?: string;
    location: string;
    status: 'upcoming' | 'completed';
    image?: string;
    date: string;
    createdAt?: string;
}

export interface EventQueryParams {
    limit?: number;
    page?: number;
    status?: string;
}

export interface EventPaginatedResponse {
    message: string;
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
    data: Event[];
}

/* ================= CREATE / UPDATE PAYLOAD ================= */

export interface CreateEventPayload {
    name: string;
    description?: string;
    location: string;
    status: 'upcoming' | 'completed';
    date: string;
    image?: File;
}

/* ================= HELPERS ================= */

/**
 * Converts CreateEventPayload → FormData
 */
export const buildEventFormData = (payload: CreateEventPayload): FormData => {
    const formData = new FormData();

    formData.append('name', payload.name);
    if (payload.description) {
        formData.append('description', payload.description);
    }
    formData.append('location', payload.location);
    formData.append('status', payload.status);
    formData.append('date', payload.date);

    if (payload.image) {
        formData.append('image', payload.image);
    }

    return formData;
};

/* ================= API CALLS ================= */

// Get all events (paginated)
export const getAllEvents = async (
    params?: EventQueryParams,
): Promise<EventPaginatedResponse> => {
    const response = await apiClient.get('/events', { params });
    return response.data;
};

// Get single event by ID
export const getEventById = async (id: number): Promise<Event> => {
    const response = await apiClient.get(`/events/${id}`);
    // Backend returns { message: string, data: Event }
    return response.data.data;
};

// Create event
export const createEvent = async (payload: CreateEventPayload) => {
    const formData = buildEventFormData(payload);

    const response = await apiClient.post('/events/create', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

// Update event
export const updateEvent = async (
    id: number,
    payload: CreateEventPayload,
) => {
    const formData = buildEventFormData(payload);

    const response = await apiClient.put(`/events/update/${id}`, formData, {
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
