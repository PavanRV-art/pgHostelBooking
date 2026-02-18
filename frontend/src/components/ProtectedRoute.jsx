import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children, roles }) => {
    const { userInfo } = useContext(AuthContext);
    const location = useLocation();

    if (!userInfo) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (roles && !roles.includes(userInfo.role)) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
