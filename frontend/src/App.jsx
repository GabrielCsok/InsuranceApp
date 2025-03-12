import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Home from './pages/Home';
import Login from './components/Login';
import Register from './components/Register';
import PrivateRoute from './components/PrivateRoute';
import DashboardLayout from './pages/DashboardLayout';
import UsersTable from './components/Dashboard/UsersTable';
import InsurancesTable from './components/Dashboard/InsurancesTable';
import NewInsuranceForm from './components/Dashboard/NewInsuranceForm';
import UserInsurances from './components/Dashboard/UserInsurances';
import { AuthProvider } from './context/AuthContext';
import DashboardContent from './components/Dashboard/DashboardContent';
import Profile from './components/Dashboard/Profile';
import 'bootstrap-icons/font/bootstrap-icons.css';

/**
 * App Component
 * The main application component that sets up routing using React Router.
 * It wraps the application in the AuthProvider to provide authentication context
 * and defines both public and private routes.
 *
 * Public Routes:
 *   - "/"       : Home page.
 *   - "/login"  : Login page.
 *   - "/register": Registration page.
 *
 * Private Routes (wrapped in PrivateRoute):
 *   - "/dashboard": Dashboard layout containing nested routes.
 *       - Index route       : Renders the main dashboard content.
 *       - "users"           : Displays the Users Table.
 *       - "profile"         : Displays the user's Profile.
 *       - "insurances"      : Displays the Insurances Table.
 *       - "new-insurance"   : Form for creating a new insurance.
 *       - "my-insurances"   : Displays the current user's insurances.
 *
 * Also imports Bootstrap CSS and JS for styling and interactivity.
 *
 * @returns {JSX.Element} The root component of the application.
 */
function App() {

  return (
    // Provides authentication context to the entire app
    <AuthProvider>
        {/* Router manages the navigation and history */}
        <Router>
          {/* Define application routes */}
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Private dashboard route - only accessible if authenticated */}
            <Route path="/dashboard" element={
              <PrivateRoute>
                <DashboardLayout />
              </PrivateRoute>
        }>
          {/* Nested routes within the dashboard */}
          <Route index element={<DashboardContent />} />
          <Route path="users" element={<UsersTable />} />
          <Route path="profile" element={<Profile />} />
          <Route path="insurances" element={<InsurancesTable />} />
          <Route path="new-insurance" element={<NewInsuranceForm />} />
          <Route path="my-insurances" element={<UserInsurances />} /> 
          </Route>
            
          </Routes>
        </Router>
    </AuthProvider>
  );
}

export default App;
