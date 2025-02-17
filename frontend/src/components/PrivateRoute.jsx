import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 

const PrivateRoute = ({ children }) => {
  const { user } = useAuth(); 

  //if (isLoading) return <LoadingSpinner />;
  
  return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;