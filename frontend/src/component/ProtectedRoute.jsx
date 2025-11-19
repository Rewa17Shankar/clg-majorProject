import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const location = useLocation();
  
  // Get user data from localStorage
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;
  
  // ✅ DEBUG: Check kya mil raha hai
  console.log('🔍 ProtectedRoute Debug:');
  console.log('User from localStorage:', user);
  console.log('User roleId:', user?.roleId, 'Type:', typeof user?.roleId);
  console.log('Allowed roles:', allowedRoles);
  console.log('Is role included?', user?.roleId ? allowedRoles.includes(user.roleId) : false);
  
  // Check if user is logged in
  if (!user || !user.token) {
    console.log('❌ No user or token - redirecting to login');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  // Check if user has the required roleId
  if (!allowedRoles.includes(user.roleId)) {
    console.log('❌ Role not allowed - redirecting to unauthorized');
    console.log(`User has roleId: ${user.roleId}, but needs one of: ${allowedRoles}`);
    return <Navigate to="/unauthorized" replace />;
  }
  
  console.log('✅ Access granted!');
  return children;
};

export default ProtectedRoute;
