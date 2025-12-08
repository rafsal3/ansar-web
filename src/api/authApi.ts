import apiClient from './apiClient';

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    user: {
        id: number;
        name: string;
        email: string;
        phone: string;
        role: 'alumni' | 'admin';
    };
}

export interface RegisterData {
    name: string;
    email: string;
    phone: string;
    course: string;
    startYear: string;
    endYear: string;
    className: string;
    password: string;
    confirmPassword: string;
    jobId: number;
    photos?: File;
}

// Login
export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await apiClient.post('/auth/login', credentials);

    // Store token in localStorage
    if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
    }

    return response.data;
};

// Register
export const register = async (data: FormData) => {
    const response = await apiClient.post('/register', data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

// Logout
export const logout = () => {
    localStorage.removeItem('authToken');
    window.location.href = '/login';
};

// Get current user
export const getCurrentUser = async () => {
    const response = await apiClient.get('/me');
    return response.data;
};

// Verify token
export const verifyToken = async () => {
    try {
        const response = await apiClient.get('/verify-token');
        return response.data;
    } catch (error) {
        return null;
    }
};
