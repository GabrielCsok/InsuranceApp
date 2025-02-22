import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { apiGet, apiPost } from '../../utils/api';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const NewInsuranceForm = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    insuranceType: '',
    startDate: null,
    endDate: null,
    coverageAmount: '',
    insuredId: '',
    houseAddress: '',
    carRegistration: ''
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await apiGet('users');
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date, field) => {
    setFormData(prev => ({ ...prev, [field]: date }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const insuranceData = {
      insuranceType: formData.insuranceType,
      startDate: formData.startDate.toISOString().split('T')[0],
      endDate: formData.endDate.toISOString().split('T')[0],
      coverageAmount: parseFloat(formData.coverageAmount),
      status: 'PENDING',
      insurer: { id: user.id }, // Match DTO structure
      ...(formData.insuranceType === 'PERSONAL' && { insured: { id: formData.insuredId } }),
      ...(formData.insuranceType === 'HOUSE' && { houseAddress: formData.houseAddress }),
      ...(formData.insuranceType === 'CAR' && { carRegistration: formData.carRegistration })
    };

    try {
      await apiPost('/insurances', insuranceData);
      alert('Insurance created successfully!');
      // Reset form
      setFormData({
        insuranceType: '',
        startDate: null,
        endDate: null,
        coverageAmount: '',
        insuredId: '',
        houseAddress: '',
        carRegistration: ''
      });
    } catch (error) {
      console.error('Error creating insurance:', error);
      alert('Error creating insurance: ' + error.message);
    }
  };

  if (loading) return <div>Loading users...</div>;

  return (
    <div className="card shadow mb-4">
      <div className="card-header py-3">
        <h5 className="m-0 font-weight-bold text-primary">New Insurance Application</h5>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          {/* Insurance Type Dropdown */}
          <div className="form-group">
            <label>Insurance Type *</label>
            <select
              className="form-control"
              name="insuranceType"
              value={formData.insuranceType}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Type</option>
              <option value="PERSONAL">Personal Insurance</option>
              <option value="HOUSE">Home Insurance</option>
              <option value="CAR">Car Insurance</option>
            </select>
          </div>

          {/* Date Fields */}
          <div className="row">
            <div className="form-group col-md-6">
              <label>Start Date *</label>
              <DatePicker
                selected={formData.startDate}
                onChange={(date) => handleDateChange(date, 'startDate')}
                className="form-control"
                dateFormat="yyyy-MM-dd"
                required
              />
            </div>
            
            <div className="form-group col-md-6">
              <label>End Date *</label>
              <DatePicker
                selected={formData.endDate}
                onChange={(date) => handleDateChange(date, 'endDate')}
                className="form-control"
                dateFormat="yyyy-MM-dd"
                required
              />
            </div>
          </div>

          {/* Coverage Amount */}
          <div className="form-group">
            <label>Coverage Amount ($) *</label>
            <input
              type="number"
              className="form-control"
              name="coverageAmount"
              value={formData.coverageAmount}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Conditional Fields */}
          {formData.insuranceType === 'PERSONAL' && (
            <div className="form-group">
              <label>Insured Person *</label>
              <select
                className="form-control"
                name="insuredId"
                value={formData.insuredId}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Insured</option>
                {users.map(user => (
                  <option key={user.id} value={user.id}>
                    {user.name} ({user.email})
                  </option>
                ))}
              </select>
            </div>
          )}

          {formData.insuranceType === 'HOUSE' && (
            <div className="form-group">
              <label>House Address *</label>
              <input
                type="text"
                className="form-control"
                name="houseAddress"
                value={formData.houseAddress}
                onChange={handleInputChange}
                required
              />
            </div>
          )}

          {formData.insuranceType === 'CAR' && (
            <div className="form-group">
              <label>Car Registration *</label>
              <input
                type="text"
                className="form-control"
                name="carRegistration"
                value={formData.carRegistration}
                onChange={handleInputChange}
                required
              />
            </div>
          )}

          <button type="submit" className="btn btn-primary">
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewInsuranceForm;