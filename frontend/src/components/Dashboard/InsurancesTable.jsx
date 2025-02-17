import React from 'react';
import GenericTable from '../Charts/GenericTable';

const InsurancesTable = () => {
  const columns = [
    { Header: 'Name', accessor: 'name' },
    { Header: 'Email', accessor: 'email' },
    { Header: 'Role', accessor: 'role' }
  ];

  return (
    <div className="container-fluid">
      <h2 className="mb-4">Insurances Management</h2>
      <GenericTable 
        columns={columns}
        fetchUrl="/api/insurances"
        entityName="Insurances"
      />
    </div>
  );
};

export default InsurancesTable;