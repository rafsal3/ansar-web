import apiClient from './apiClient';

/* ================= TYPES ================= */

export interface AdminUser {
    id: number;
    phone: string;
    type: 'admin';
    profileImage: string;
}

export interface AlumniUser {
    id: number;
    phone?: string;
    type: 'alumni';
    profileImage?: string;
    name?: string;
    batch?: string;
}

export type User = AdminUser | AlumniUser;

export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    user: User;
}

export interface AdminLoginPayload {
    email: string;
    password: string;
}

export interface AlumniLoginPayload {
    email: string;
    password: string;
}

/* ================= API CALLS ================= */

/**
 * Admin login
 */
export const adminLogin = async (payload: AdminLoginPayload): Promise<LoginResponse> => {
    const response = await apiClient.post('/auth/admin/login', payload);
    return response.data;
};

/**
 * Alumni login (if you have a separate endpoint)
 */
// Alumni login (updated to use the general /auth/login endpoint)
export const alumniLogin = async (payload: AlumniLoginPayload): Promise<LoginResponse> => {
    const response = await apiClient.post('/auth/login', payload);
    return response.data;
};

/**
 * Logout (if you have a backend logout endpoint)
 */
export const logout = async (): Promise<void> => {
    await apiClient.post('/auth/logout');
};

/**
 * Refresh token
 */
export const refreshToken = async (refreshToken: string): Promise<LoginResponse> => {
    const response = await apiClient.post('/auth/refresh', { refreshToken });
    return response.data;
};
