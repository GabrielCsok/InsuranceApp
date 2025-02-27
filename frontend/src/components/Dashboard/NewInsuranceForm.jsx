import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { apiGet, apiPost } from '../../utils/api';
import '../../../public/css/insurance.css';

const NewInsuranceForm = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    insuranceType: '',
    startDate: '',
    endDate: '',
    coverageAmount: '',
    insuredId: '',
    houseAddress: '',
    carRegistration: ''
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await apiGet('/users');
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const insuranceData = {
      insuranceType: formData.insuranceType,
      startDate: formData.startDate,  
      endDate: formData.endDate,
      coverageAmount: parseFloat(formData.coverageAmount),
      status: 'PENDING',
      insurer: { id: user.id },
      insured: formData.insuranceType === 'PERSONAL'
        ? { id: formData.insuredId }
        : null,
      houseAddress: formData.insuranceType === 'HOUSE' ? formData.houseAddress : null,
      carRegistration: formData.insuranceType === 'CAR' ? formData.carRegistration : null
    };

    console.log("Submitting insurance data:", JSON.stringify(insuranceData, null, 2));

    try {
      await apiPost('/insurances', insuranceData);
      alert('Insurance created successfully!');
      // Reset form
      setFormData({
        insuranceType: '',
        startDate: '',
        endDate: '',
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
      <div className="card-header py-3 custom-card-header">
        <h5 className="m-0 font-weight-bold">New Insurance Application</h5>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          {/* Insurance Type Dropdown */}
          <div className="form-group">
            <label htmlFor="insuranceType">Insurance Type *</label>
            <select
              id="insuranceType"
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

          {/* Date Fields using HTML5 date inputs */}
          <div className="row">
            <div className="form-group col-md-6">
              <label htmlFor="startDate">Start Date *</label>
              <input
                type="date"
                id="startDate"
                className="form-control"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group col-md-6">
              <label htmlFor="endDate">End Date *</label>
              <input
                type="date"
                id="endDate"
                className="form-control"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          {/* Coverage Amount */}
          <div className="form-group">
            <label htmlFor="coverageAmount">Coverage Amount ($) *</label>
            <input
              type="number"
              id="coverageAmount"
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
              <label htmlFor="insuredId">Insured Person *</label>
              <select
                id="insuredId"
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
              <label htmlFor="houseAddress">House Address *</label>
              <input
                type="text"
                id="houseAddress"
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
              <label htmlFor="carRegistration">Car Registration *</label>
              <input
                type="text"
                id="carRegistration"
                className="form-control"
                name="carRegistration"
                value={formData.carRegistration}
                onChange={handleInputChange}
                required
              />
            </div>
          )}

          <button type="submit" className="btn custom-submit-button">
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewInsuranceForm;