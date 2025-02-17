import React from 'react';
import GenericTable from '../Charts/GenericTable';

const UsersTable = () => {
  const columns = [
    { Header: 'Name', accessor: 'name' },
    { Header: 'Email', accessor: 'email' },
    { Header: 'Role', accessor: 'role' }
  ];

  return (
    <div className="container-fluid">
      <h2 className="mb-4">Users Management</h2>
      <GenericTable 
        columns={columns}
        fetchUrl="/api/users"
        entityName="Users"
      />
    </div>
  );
};

export default UsersTable;