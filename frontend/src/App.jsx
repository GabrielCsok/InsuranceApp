import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Home from './pages/Home';
import { Navbar } from 'reactstrap';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './pages/DashboardLayout';
import PrivateRoute from './components/PrivateRoute';
import DashboardLayout from './pages/DashboardLayout';
import UsersTable from './components/Dashboard/UsersTable';
import InsurancesTable from './components/Dashboard/InsurancesTable';
import NewInsuranceForm from './components/Dashboard/NewInsuranceForm';
import UserInsurances from './components/Dashboard/UserInsurances';
import { AuthProvider } from './context/AuthContext';
import DashboardContent from './components/Dashboard/DashboardContent';
import Profile from './components/Dashboard/Profile';

function App() {

  return (
    <AuthProvider>
        <Router>
          {/*<Navbar  />*/}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={
              <PrivateRoute>
                <DashboardLayout />
              </PrivateRoute>
        }>
          {/* Nested dashboard routes */}
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
