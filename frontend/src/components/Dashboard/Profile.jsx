import { useState, useEffect } from 'react';
import { apiGet, apiPut, apiDelete } from '../../utils/api';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

/**
 * Profile Component
 * A component that lets the user check their details, change them after clicking edit 
 * and also delete their account.
 * @returns {JSX.Element} of a form that contains the user's details.
 */
const Profile = () => {
  const { user, setUser, logout } = useAuth();
  const navigate = useNavigate();
  
  // Store the detailed user info fetched from the API
  const [detailedUser, setDetailedUser] = useState(null);
  
  // Local state for form data (excluding role)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    birthDate: '',
  });
  
  // Control edit mode
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch detailed user info on mount
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const data = await apiGet(`/users/${user.id}`);
        console.log("Detailed user:", data);
        setDetailedUser(data);
        // Pre-fill form data from detailed data
        setFormData({
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          email: data.email || '',
          phoneNumber: data.phoneNumber || '',
          address: data.address || '',
          birthDate: data.birthDate || '',
        });
      } catch (err) {
        console.error(err);
        setError("Failed to fetch user details.");
      }
    };

    if (user && user.id) {
      fetchUserDetails();
    }
  }, [user.id]);

  // Show a loading indicator until detailedUser is available
  if (!detailedUser) {
    return <div>Loading user details...</div>;
  }

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission for updating profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // Update user data using apiPut
      const updatedUser = await apiPut(`/users/${user.id}/edit`, formData);
      // Update the context's user with the new data
      setUser(updatedUser);
      setEditMode(false);
      alert('Profile updated successfully.');
    } catch (err) {
      console.error(err);
      setError('Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  // Handle account deletion
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        await apiDelete(`/users/${user.id}`);
        alert('Account deleted successfully.');
        logout();
        navigate('/');
      } catch (err) {
        console.error(err);
        setError('Failed to delete account.');
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2>My Profile</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">First Name</label>
          <input 
            type="text"
            className="form-control"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            disabled={!editMode}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">Last Name</label>
          <input 
            type="text"
            className="form-control"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            disabled={!editMode}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email Address</label>
          <input 
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={!editMode}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
          <input 
            type="text"
            className="form-control"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            disabled={!editMode}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address</label>
          <input 
            type="text"
            className="form-control"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            disabled={!editMode}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="birthDate" className="form-label">Birth Date</label>
          <input 
            type="date"
            className="form-control"
            id="birthDate"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            disabled={!editMode}
          />
        </div>

        {!editMode ? (
          <button 
            type="button" 
            className="btn btn-secondary me-2" 
            onClick={() => setEditMode(true)}
          >
            Edit
          </button>
        ) : (
          <>
            <button 
              type="submit" 
              className="btn btn-primary me-2" 
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
            <button 
              type="button" 
              className="btn btn-warning me-2"
              onClick={() => {
                // Reset formData to the fetched detailedUser values and exit edit mode
                setFormData({
                  firstName: detailedUser.firstName || '',
                  lastName: detailedUser.lastName || '',
                  email: detailedUser.email || '',
                  phoneNumber: detailedUser.phoneNumber || '',
                  address: detailedUser.address || '',
                  birthDate: detailedUser.birthDate || '',
                });
                setEditMode(false);
              }}
            >
              Cancel
            </button>
          </>
        )}
      </form>

      <hr />
      
      <div className="mt-3">
        <button className="btn btn-danger" onClick={handleDelete}>
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default Profile;