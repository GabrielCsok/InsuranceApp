import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import PropTypes from 'prop-types';

/**
 * PrivateRoute Component
 * A wrapper component that checks for authentication.
 * If a user is authenticated, it renders the children; otherwise, it redirects to the login page.
 *
 * @param {React.ReactNode} children - The child components to render if authenticated.
 * @returns {JSX.Element} The rendered children if the user is authenticated or a <Navigate> component redirecting to login.
 */
const PrivateRoute = ({ children }) => {
  const { user } = useAuth();  
  
  return user ? children : <Navigate to="/login" replace />;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;