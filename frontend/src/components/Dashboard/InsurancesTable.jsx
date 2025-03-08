import React, { useState } from 'react';
import GenericTable from '../Charts/GenericTable';
import { useAuth } from '../../context/AuthContext';
import { apiPut, apiDelete } from '../../utils/api'; 
import PremiumInput from './PremiumInput';

const InsurancesTable = () => {
  const { user } = useAuth();
  const [updatedValues, setUpdatedValues] = useState({});
  const [refresh, setRefresh] = useState(false);

  // Function to handle changes in status or premium amount
  const handleChange = (id, field, value) => {
    setUpdatedValues((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  // Function to handle saving changes
  const handleSave = async (id) => {
    const { status, premiumAmount } = updatedValues[id] || {};

    // Validate that premiumAmount is set if status is APPROVED
    if (status === 'APPROVED' && (!premiumAmount || isNaN(premiumAmount) || premiumAmount <= 0)) {
      alert("Premium amount is required for APPROVED status and must be a positive number.");
      return;
    }

    try {
      // API call to update the insurance (adjust endpoint as needed)
      await apiPut(`/insurances/${id}/update`, { status, premiumAmount });
      alert('Insurance updated successfully.');
      // Clear the editing state for this row
      setUpdatedValues((prev) => {
        const newState = { ...prev };
        delete newState[id];
        return newState;
      });
      // Toggle refresh so that GenericTable re-fetches updated data
      setRefresh(prev => !prev);
    } catch (error) {
      console.error("Failed to update insurance:", error);
      alert("Failed to update insurance. Please try again.");
    }
  };

  // Function to handle deletion of an insurance record
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this insurance?')) {
      try {
        await apiDelete(`/insurances/${id}/delete`);
        alert("Insurance deleted successfully.");
        // Toggle refresh to trigger re-fetch in GenericTable
        setRefresh(prev => !prev);
      } catch (error) {
        console.error("Failed to delete insurance:", error);
        alert("Failed to delete insurance");
      }
    }
  };

  const columns = [
    {
      Header: 'Insurance ID',
      id: 'insuranceId',
      accessor: (row) => row.id || "N/A",
    },
    { 
      Header: 'Type', 
      accessor: 'insuranceType' 
    },
    { 
      Header: 'Start Date', 
      accessor: 'startDate' 
    },
    { 
      Header: 'End Date', 
      accessor: 'endDate' 
    },
    {
      Header: 'Coverage Amount',
      accessor: 'coverageAmount',
      Cell: ({ value }) => `$${value ? value.toLocaleString() : 'N/A'}`,
    },
    {
      Header: 'Status',
      accessor: 'status',
      Cell: ({ row }) => {
        const id = row.original.id;
        const currentStatus = (updatedValues[id]?.status || row.original.status || "");
        return (
          <select
            value={currentStatus}
            onChange={(e) => handleChange(id, 'status', e.target.value)}
            className="form-select"
          >
            <option value="PENDING">PENDING</option>
            <option value="APPROVED">APPROVED</option>
            <option value="DENIED">DENIED</option>
          </select>
        );
      },
    },
    {
      Header: 'Premium Amount',
      accessor: 'premiumAmount',
      Cell: ({ row }) => {
        const id = row.original.id;
        const status = updatedValues[id]?.status || row.original.status;
        const currentPremium =
          updatedValues[id]?.premiumAmount !== undefined
            ? updatedValues[id].premiumAmount
            : row.original.premiumAmount;
        return status === 'APPROVED' ? (
          <PremiumInput
            id={id}
            initialValue={currentPremium || ""}
            onCommit={handleChange}
          />
        ) : (
          currentPremium ? `$${currentPremium.toLocaleString()}` : 'N/A'
        );
      },
    },
    {
      Header: 'Insured person / house / car',
      Cell: ({ row }) => {
        const { insuranceType, houseAddress, carRegistration, insured } = row.original;
        if (insuranceType === 'HOUSE') return houseAddress || 'N/A';
        if (insuranceType === 'CAR') return carRegistration || 'N/A';
        if (insuranceType === 'PERSONAL')
          return insured ? `${insured.firstName} ${insured.lastName}` : 'N/A';
        return 'N/A';
      },
    },
    {
      Header: 'Actions',
      Cell: ({ row }) => {
        const id = row.original.id;
        return (
          <div>
            <button
              className="btn btn-primary btn-sm me-2"
              onClick={() => handleSave(id)}
              disabled={!updatedValues[id]}
            >
              Save
            </button>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => handleDelete(id)}
            >
              Delete
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="container-fluid">
      <GenericTable
        columns={columns}
        fetchUrl={`/insurances`} 
        entityName="Insurances"
        isUserSpecific={true}
        refresh={refresh}  // Pass refresh prop so that GenericTable re-fetches data when it changes
      />
    </div>
  );
};

export default InsurancesTable;