import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTable, usePagination } from 'react-table';
import './ActivitiesTable.css'; 

const UserActivities = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
      setActivities(response.data); 
    };

    fetchActivities();
  }, []); 

  const columns = React.useMemo(
    () => [
      {
        Header: 'User ID',
        accessor: 'userId',
      },
      {
        Header: 'Activity Title',
        accessor: 'title',
      },
      {
        Header: 'Status',
        accessor: 'completed',
        Cell: ({ value }) => (value ? 'Completed' : 'Pending'),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageIndex,
    gotoPage,
    previousPage,
    nextPage,
    setPageSize,
    pageCount,
  } = useTable(
    {
      columns,
      data: activities,
      initialState: { pageIndex: 0 },
      manualPagination: false,
      pageCount: Math.ceil(activities.length / 10),
    },
    usePagination
  );

  useEffect(() => {
    setPageSize(10);
  }, [setPageSize]);

  return (
    <div className="activities-table">
      <h2>User Activities</h2>
      <table {...getTableProps()} className="table">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} className="table-header">{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={row.id}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} className="table-cell">{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage} className="pagination-button">
          First
        </button>
        <button onClick={() => previousPage()} disabled={!canPreviousPage} className="pagination-button">
          Previous
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage} className="pagination-button">
          Next
        </button>
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} className="pagination-button">
          Last
        </button>
        <span className="page-info">
          Page {pageIndex + 1} of {pageCount}
        </span>
      </div>
    </div>
  );
};

export default UserActivities;
