import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
    email: string;
    type: 'alumni' | 'admin';
    name?: string;
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string, userType: 'alumni' | 'admin') => boolean;
    logout: () => void;
    isAuthenticated: boolean;
    isAlumni: boolean;
    isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    const login = (email: string, password: string, userType: 'alumni' | 'admin'): boolean => {
        // Dummy authentication
        if (email === 'alumni@gmail.com' && password === '123' && userType === 'alumni') {
            setUser({ email, type: 'alumni', name: 'Alumni User' });
            return true;
        }
        if (email === 'admin@gmail.com' && password === 'admin123' && userType === 'admin') {
            setUser({ email, type: 'admin', name: 'Admin User' });
            return true;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
    };

    const value: AuthContextType = {
        user,
        login,
        logout,
        isAuthenticated: !!user,
        isAlumni: user?.type === 'alumni',
        isAdmin: user?.type === 'admin',
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
