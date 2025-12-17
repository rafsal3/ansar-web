import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { adminLogin, alumniLogin, User } from '../api/authApi';
import { alumniApi } from '../api/alumniApi';
import { API_BASE_URL } from '../api/apiClient';

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string, userType: 'alumni' | 'admin') => Promise<boolean>;
    logout: () => void;
    isAuthenticated: boolean;
    isAlumni: boolean;
    isAdmin: boolean;
    setUser: (user: User | null) => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // Load user from localStorage on mount
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const accessToken = localStorage.getItem('accessToken');

        if (storedUser && accessToken) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error('Failed to parse stored user:', error);
                localStorage.removeItem('user');
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
            }
        }

        // Mark loading as complete
        setLoading(false);
    }, []);

    const login = async (email: string, password: string, userType: 'alumni' | 'admin'): Promise<boolean> => {
        try {
            let response;

            if (userType === 'admin') {
                response = await adminLogin({ email, password });
            } else {
                response = await alumniLogin({ email, password });
            }

            // Store tokens first so apiClient can use them
            localStorage.setItem('accessToken', response.accessToken);
            localStorage.setItem('refreshToken', response.refreshToken);
            // Also store in the old format for backward compatibility with apiClient
            localStorage.setItem('authToken', response.accessToken);

            let userData = response.user;

            // If alumni, fetch profile details to get the photo
            if (userType === 'alumni') {
                try {
                    const profileData = await alumniApi.getAlumniCurrentProfile();
                    if (profileData && profileData.photos && profileData.photos.length > 0) {
                        const photoUrl = `${API_BASE_URL}${profileData.photos[0]}`;
                        // Update user object with profile image
                        userData = {
                            ...userData,
                            profileImage: photoUrl
                        };
                    }
                } catch (error) {
                    console.error('Failed to fetch alumni profile details on login:', error);
                    // Continue with basic user data if profile fetch fails
                }
            }

            localStorage.setItem('user', JSON.stringify(userData));
            setUser(userData);
            return true;
        } catch (error) {
            console.error('Login failed:', error);
            return false;
        }
    };

    const logout = () => {
        // Clear all auth data
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        localStorage.removeItem('authToken');
        setUser(null);
    };

    const value: AuthContextType = {
        user,
        login,
        logout,
        isAuthenticated: !!user,
        isAlumni: user?.type === 'alumni',
        isAdmin: user?.type === 'admin',
        setUser,
        loading,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
