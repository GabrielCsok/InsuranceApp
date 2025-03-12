import { useState, useEffect } from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';
import { apiGet } from '../../utils/api';
import PropTypes from 'prop-types';

/**
 * GenericTable Component
 *
 * Renders a table with sorting and pagination using react-table.
 * It fetches data from a given API endpoint and displays it according to the provided column definitions.
 *
 * @param {object} props - The component props.
 * @param {Array} props.columns - Array of column definitions for the table.
 * @param {string} props.fetchUrl - The API endpoint URL used to fetch table data.
 * @param {string} props.entityName - A display name for the entity (e.g., "Users") used in loading/error messages.
 * @param {boolean} [props.isUserSpecific=false] - Flag to indicate if the fetched data is nested under an "insurances" property.
 * @param {any} props.refresh - A value used to trigger re-fetching of data (e.g., a boolean or counter).
 *
 * @returns {JSX.Element} The rendered table.
 */
const GenericTable = ({
  columns,          // Table column definitions
  fetchUrl,         // API endpoint to fetch data
  entityName,       // Display name (e.g., "Users")
  isUserSpecific = false, // Whether to show user-specific data
  refresh, 
}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect to fetch data from the API whenever fetchUrl, entityName, isUserSpecific, or refresh changes.
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const jsonData = await apiGet(fetchUrl);
        console.log("Fetched data:", jsonData);

        // If data is user-specific and nested under an "insurances" property, extract that; otherwise, use jsonData directly.
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
        
       
    };
    fetchData();
  }, [fetchUrl, entityName, isUserSpecific, refresh]);

  // React Table configuration
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    // Pagination methods
  } = useTable(
    { columns, data },
    useSortBy,
    usePagination
  );

  // Render loading or error messages if necessary.
  if (loading) return <div>Loading {entityName}...</div>;
  if (error) return <div>Error loading {entityName}: {error}</div>;

  // Render the table
  return (
    <div className="table-responsive">
      <h2 className="mb-3">{entityName}</h2>
      <table 
        className="table table-striped table-bordered table-hover"
        {...getTableProps()}
      >
        <thead>
          {headerGroups.map(headerGroup => {
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
    </div>
  );
};

// Define PropTypes for GenericTable to enforce correct usage.
GenericTable.propTypes = {
  columns: PropTypes.array.isRequired,
  fetchUrl: PropTypes.string.isRequired,
  entityName: PropTypes.string.isRequired,
  isUserSpecific: PropTypes.bool,
  refresh: PropTypes.any, // Can be a boolean, number, or any type used to trigger re-fetch.
};

export default GenericTable;