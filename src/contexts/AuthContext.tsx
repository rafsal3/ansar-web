import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getCurrentUser, logout as apiLogout } from '@/api';

interface User {
    id: number;
    phone: string;
    type: 'alumni' | 'admin';
    profileImage: string;
}

interface AuthContextType {
    user: User | null;
    login: () => boolean;
    logout: () => void;
    isAuthenticated: boolean;
    isAlumni: boolean;
    isAdmin: boolean;
    setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    // Load user from localStorage on mount
    useEffect(() => {
        const storedUser = getCurrentUser();
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    const login = (): boolean => {
        // This is called after successful API login
        // The actual API call is in Login.tsx
        // This just updates the context with the user from localStorage
        const storedUser = getCurrentUser();
        if (storedUser) {
            setUser(storedUser);
            return true;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
        apiLogout(); // This clears localStorage and redirects
    };

    const value: AuthContextType = {
        user,
        login,
        logout,
        isAuthenticated: !!user,
        isAlumni: user?.type === 'alumni',
        isAdmin: user?.type === 'admin',
        setUser,
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
