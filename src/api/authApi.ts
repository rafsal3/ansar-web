import apiClient from './apiClient';

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface User {
    id: number;
    phone: string;
    type: 'alumni' | 'admin';
    profileImage: string;
}

export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    user: User;
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
    const response = await apiClient.post('auth/login', credentials);

    // Store tokens in localStorage
    if (response.data.accessToken) {
        localStorage.setItem('authToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        localStorage.setItem('user', JSON.stringify(response.data.user));
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
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    window.location.href = '/login';
};

// Get current user from localStorage
export const getCurrentUser = (): User | null => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
        try {
            return JSON.parse(userStr);
        } catch (err) {
            return null;
        }
    }
    return null;
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
