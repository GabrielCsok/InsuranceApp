import GenericTable from '../Charts/GenericTable';

/**
 * User Table Component
 * This component uses the Generic Table component to render a table.
 * 
 * @returns {JSX.Element} a rendered table containing data
 */
const UsersTable = () => {

  // Define table columns
  const columns = [
    {
      Header: 'User ID',
      accessor: 'id',
    },
    {
      Header: 'First name',
      accessor: 'firstName',
    },
    {
      Header: 'Last name',
      accessor: 'lastName',
    },
    {
      Header: 'E-mail',
      accessor: 'email',
    },
    {
      Header: 'Phone number',
      accessor: 'phoneNumber',
      Cell: ({ value }) => `${value.toLocaleString()}`,
    },
    {
      Header: 'Address',
      accessor: 'address',
    },
    {
      Header: 'Birth date',
      accessor: 'birthDate',
    },
    {
      Header: 'Role',
      accessor: 'role',
      Cell: ({ value }) =>  value ? value.toString() : 'N/A',
    },
  ];

  return (
    <div className="container-fluid">
      
      <GenericTable
        columns={columns}
        fetchUrl={`/users`} 
        entityName="Users"
        isUserSpecific={false}
      />
    </div>
  );
};

export default UsersTable;