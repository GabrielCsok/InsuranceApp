import React, { useState, useEffect } from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';
import { apiGet } from '../../utils/api';

const GenericTable = ({
  columns,          // Table column definitions
  fetchUrl,         // API endpoint to fetch data
  entityName,       // Display name (e.g., "Users")
  isUserSpecific = false // Whether to show user-specific data
}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // No need for token; session cookie will be sent automatically by the browser
        
        const jsonData = await apiGet(fetchUrl);
        setData(isUserSpecific ? jsonData.insurances : jsonData); // Adjust based on API response
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
        
        {/*const response = await fetch(fetchUrl, {
          method: 'GET',  // You can adjust the HTTP method depending on your API
          credentials: 'include',  // Ensure the cookie is sent with the request
        });
        
        if (!response.ok) throw new Error(`Failed to fetch ${entityName}`);
        const jsonData = await response.json();
        setData(isUserSpecific ? jsonData.insurances : jsonData); // Adjust based on API response
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }*/}
    };
    fetchData();
  }, [fetchUrl, entityName, isUserSpecific]);

  // React Table configuration
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    // Pagination methods (add as needed)
  } = useTable(
    { columns, data },
    useSortBy,
    usePagination
  );

  if (loading) return <div>Loading {entityName}...</div>;
  if (error) return <div>Error loading {entityName}: {error}</div>;

  return (
    <div className="table-container">
      <h2>{entityName}</h2>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? ' ↓' : ' ↑') : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* Add pagination controls here */}
    </div>
  );
};

export default GenericTable;