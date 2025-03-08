import React from 'react';
import GenericTable from '../Charts/GenericTable';
import { useAuth } from '../../context/AuthContext';
import { apiDelete } from '../../utils/api';
import { useState } from 'react';

const UserInsurances = () => {
  const { user } = useAuth();
  const [refresh, setRefresh] = useState(0);

  const handleDelete = async (insuranceId) => {
    if (window.confirm('Are you sure you want to delete this insurance?')) {
      try {
        // Adjust the endpoint as needed; this assumes you have a DELETE endpoint for user insurances.
        await apiDelete(`/insurances/${insuranceId}/delete`);
        // Optionally, refresh the table. Here we reload the page:
        setRefresh(prev => prev + 1);
      } catch (error) {
        console.error('Failed to delete insurance:', error);
        alert('Failed to delete insurance');
      }
    }
  };

  // Define table columns
  const columns = [
    {
      Header: 'Type',
      accessor: 'insuranceType',
    },
    {
      Header: 'Start Date',
      accessor: 'startDate',
    },
    {
      Header: 'End Date',
      accessor: 'endDate',
    },
    {
      Header: 'Coverage Amount',
      accessor: 'coverageAmount',
      Cell: ({ value }) => `$${value.toLocaleString()}`,
    },
    {
      Header: 'Status',
      accessor: 'status',
    },
    {
      Header: 'Premium Amount',
      accessor: 'premiumAmount',
    },
    {
      Header: 'Insured person / house / car',
      Cell: ({ row }) => {
        const { insuranceType, houseAddress, carRegistration, insured } = row.original;
        if (insuranceType === 'HOUSE') {
          return houseAddress || 'N/A';
        } else if (insuranceType === 'CAR') {
          return carRegistration || 'N/A';
        } else if (insuranceType === 'PERSONAL') {
          return insured 
            ? `${insured.firstName} ${insured.lastName}` 
            : 'N/A';
        } else {
          return 'N/A';
        }
      }
    },
    {
      Header: 'Actions',
      Cell: ({ row }) => (
        <button
          className="btn btn-danger btn-sm"
          onClick={() => handleDelete(row.original.id)}
        >
          Delete
        </button>
      )
    },
  ];

  return (
    <div className="container-fluid">
      <GenericTable
        columns={columns}
        fetchUrl={`/users/${user.id}/insurances`} 
        entityName="My Insurances"
        isUserSpecific={true}
        refresh={refresh}
      />
    </div>
  );
};

export default UserInsurances;