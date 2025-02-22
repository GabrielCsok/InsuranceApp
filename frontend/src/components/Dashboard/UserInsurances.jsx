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
    {
      Header: 'Insured',
      accessor: 'insured',
      Cell: ({ value }) => `${value.firstName} ${value.lastName}`
    },
    // Add more columns as needed
  ];

  return (
    <div className="container-fluid">
      
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