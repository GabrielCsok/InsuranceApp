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
        console.log("Fetched data:", jsonData);

        const tableData = isUserSpecific && jsonData.insurances 
          ? jsonData.insurances 
          : Array.isArray(jsonData) 
            ? jsonData 
            : [];
        setData(tableData);
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
    <div className="table-responsive">
      <h2 className="mb-3">{entityName}</h2>
      <table 
        className="table table-striped table-bordered table-hover"
        {...getTableProps()}
      >
        <thead>
          {headerGroups.map(headerGroup => {
            // Destructure key from headerGroup props
            const { key, ...headerGroupProps } = headerGroup.getHeaderGroupProps();
            return (
              <tr key={key} {...headerGroupProps}>
                {headerGroup.headers.map(column => {
                  const { key: colKey, ...columnProps } = column.getHeaderProps(
                    column.getSortByToggleProps()
                  );
                  return (
                    <th key={colKey} {...columnProps}>
                      {column.render('Header')}
                      <span>
                        {column.isSorted ? (column.isSortedDesc ? ' ↓' : ' ↑') : ''}
                      </span>
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row);
            const { key: rowKey, ...rowProps } = row.getRowProps();
            return (
              <tr key={rowKey} {...rowProps}>
                {row.cells.map(cell => {
                  const { key: cellKey, ...cellProps } = cell.getCellProps();
                  return (
                    <td key={cellKey} {...cellProps}>
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* Add pagination controls here if needed */}
    </div>
  );
};

export default GenericTable;