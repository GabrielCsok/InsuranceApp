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
  ];

  return (
    <div className="container-fluid">
      
      <GenericTable
        columns={columns}
        fetchUrl={`/users/${user.id}/insurances`} 
        entityName="My Insurances"
        isUserSpecific={true}
      />
    </div>
  );
};

export default UserInsurances;