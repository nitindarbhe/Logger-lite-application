import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTable, useSortBy, useFilters, useGlobalFilter, useAsyncDebounce, useRowSelect, usePagination } from 'react-table';
import { Checkbox } from './Checkbox';
import MOCK_DATA from './MOCK_DATA.json';
import { COLUMNS } from './columns';
import './table.css';
import '../utils/utils';

function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length
  const [value, setValue] = React.useState(globalFilter)
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined)
  }, 200)

  return (
    <span>
      Search:{' '}
      <input
        value={value || ""}
        onChange={e => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
        style={{
          fontSize: '1.1rem',
          border: '0',
        }}
      />
    </span>
  )
}

// Define a default UI for filtering
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length

  return (
    <input
      value={filterValue || ''}
      onChange={e => {
        setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  )
}

function DisplayTable() {

  const [logData, setlogData] = useState([]);
  const [loading, setLoading] = useState(false);
  const flattenObject = (obj) => {
    const flattened = {}
   
    Object.keys(obj).forEach((key) => {
     if (typeof obj[key] === 'object' && obj[key] !== null) {
      Object.assign(flattened, flattenObject(obj[key]))
     } else {
      flattened[key] = obj[key]
     }
    })
   
    return flattened
   }



  const getlogData = async() => {
    try {
      const data = await axios.get (
        "http://localhost:3000/api/logs"
      )
      // console.log(data.data.map(x => {
      //   return flattenObject(x);
      // }));
     setlogData(data.data.map(x => {
      return flattenObject(x);
    }));
      setLoading(true);
    } catch (error) {
      console.log(error);
    }

  }

  useEffect(() => {
    getlogData();
    }, []);
  

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  )

  const data = React.useMemo(() => MOCK_DATA, []);
  const columns = React.useMemo(() => COLUMNS, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    page,
    nextPage,
    previousPage,
    prepareRow,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    state,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
    selectedFlatRows
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
      defaultColumn, // Be sure to pass the defaultColumn option
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => {
        return [
          {
            id: 'selection',
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <Checkbox {...getToggleAllRowsSelectedProps()} />
            ),
            Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} />,
          },
          ...columns,
        ]
      })
    },

  );

  // const firstPageRows = rows.slice(0, 10);
  const { pageIndex, pageSize } = state;

  return (
    <div class="container" style={{ textAlign: 'center' }}>
      &nbsp;&nbsp;
      <p class="h3">LoggerLite Log Results</p>
      &nbsp;&nbsp;
      <table {...getTableProps()} style={{ border: 'solid 3px black' }}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  style={{
                    borderBottom: 'solid 2px red',
                    color: 'black',
                  }}
                >
                  {column.render('Header')}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? '🔽'
                        : '🔼'
                      : ''}
                  </span>
                  <div>{column.canFilter ? column.render('Filter') : null}</div>
                </th>
              ))}
            </tr>
          ))}
          <tr>
            <th
              colSpan={visibleColumns.length}
              style={{
                textAlign: 'left',
              }}
            >
              <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
              />
            </th>
          </tr>
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => { //change here to rows firstPageRows
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        padding: '10px',
                        border: 'solid 1px black',
                      }}
                    >
                      {cell.render('Cell')}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <div>
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong> {' '}
        </span>
        <span>
          | Got to Page: {' '}
          <input type='number' defaultValue={pageIndex + 1}
            onChange={e => {
              const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(pageNumber)
            }}
            style={{ width: '50px' }} />
        </span>
        <select value={pageSize} onChange={e => setPageSize(Number(e.target.value))
        }>
          {
            [10, 25, 50].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))
          }

        </select>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>Next</button>
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{'>>'}</button>
      </div>
      &nbsp;&nbsp;
      <pre>
        <code>
          {JSON.stringify(
            {
              selectedFlatRows: selectedFlatRows.map(row => row.original),
            },
            null,
            2
          )}
        </code>
      </pre>
    </div >
  );
}

export default DisplayTable;