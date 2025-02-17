import React from 'react';
import GenericTable from '../Charts/GenericTable';
import { useAuth } from '../../context/AuthContext';

const UserInsurances = () => {
  const { user } = useAuth();

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
    // Add more columns as needed
  ];

  return (
    <div className="container-fluid">
      <h1 className="h3 mb-4 text-gray-800">My Insurances</h1>
      
      <GenericTable
        columns={columns}
        fetchUrl={`users/${user.id}/insurances`} // Assuming this endpoint exists
        entityName="My Insurances"
        isUserSpecific={true}
      />
    </div>
  );
};

export default UserInsurances;