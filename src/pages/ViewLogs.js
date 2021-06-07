import React from 'react';
import { useTable, useSortBy, useFilters, useGlobalFilter, useAsyncDebounce, useRowSelect, usePagination } from 'react-table';
import { Checkbox } from './Checkbox';
import './table.css';

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

function ViewLogs() {
      const data = React.useMemo(
            () => [
                  {
                        col1: 'Minsk',
                        col2: '27',
                        col3: 'rain',
                        col4: '739',
                        col5: '90',
                  },
                  {
                        col1: 'Vilnius',
                        col2: '30',
                        col3: 'rain',
                        col4: '740',
                        col5: '87',
                  },
                  {
                        col1: 'London',
                        col2: '23',
                        col3: 'rain',
                        col4: '743',
                        col5: '77',
                  },
                  {
                        col1: 'Madrid',
                        col2: '34',
                        col3: 'sunny',
                        col4: '738',
                        col5: '40',
                  },
                  {
                        col1: 'Warsaw',
                        col2: '25',
                        col3: 'heavy rain',
                        col4: '739',
                        col5: '88',
                  },
            ],
            []

      )

      const columns = React.useMemo(
            () => [
                  {
                        Header: 'City',
                        accessor: 'col1', // accessor is the "key" in the data
                  },
                  {
                        Header: 'Temperature',
                        accessor: 'col2',
                  },
                  {
                        Header: 'Weather Forecast',
                        accessor: 'col3',
                  },
                  {
                        Header: 'Pressure',
                        accessor: 'col4',
                  },
                  {
                        Header: 'Humidity',
                        accessor: 'col5',
                  },
            ],
            []
      )

      const defaultColumn = React.useMemo(
            () => ({
                  // Let's set up our default Filter UI
                  Filter: DefaultColumnFilter,
            }),
            []
      )

      const {
            getTableProps,
            getTableBodyProps,
            headerGroups,
            rows,
            prepareRow,
            page,
            nextPage,
            previousPage,
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

      const firstPageRows = rows.slice(0, 10);
      const { pageIndex, pageSize } = state;

      return (
            <div class="container">
                  <h1>Logger Table</h1>

                  <div>
                        <table {...getTableProps()} style={{ border: 'solid 1px black' }}>
                              <thead>
                                    {headerGroups.map(headerGroup => (
                                          <tr {...headerGroup.getHeaderGroupProps()}>
                                                {headerGroup.headers.map(column => (
                                                      <th
                                                            {...column.getHeaderProps(column.getSortByToggleProps())}
                                                            style={{
                                                                  borderBottom: 'solid 3px red',
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
                                    {firstPageRows.map(row => {
                                          prepareRow(row)
                                          return (
                                                <tr {...row.getRowProps()}>
                                                      {row.cells.map(cell => {
                                                            return (
                                                                  <td
                                                                        {...cell.getCellProps()}
                                                                        style={{
                                                                              padding: '10px',
                                                                              border: 'solid 1px gray',
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
                  </div>
            </div>
      );
}

export default ViewLogs;