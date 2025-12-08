import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requireAuth?: boolean;
    requireAlumni?: boolean;
    requireAdmin?: boolean;
}

export const ProtectedRoute = ({
    children,
    requireAuth = false,
    requireAlumni = false,
    requireAdmin = false
}: ProtectedRouteProps) => {
    const { isAuthenticated, isAlumni, isAdmin } = useAuth();

    // If authentication is required but user is not authenticated
    if (requireAuth && !isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // If alumni access is required but user is not alumni
    if (requireAlumni && !isAlumni) {
        return <Navigate to="/login" replace />;
    }

    // If admin access is required but user is not admin
    if (requireAdmin && !isAdmin) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};
