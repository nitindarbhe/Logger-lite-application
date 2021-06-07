// import { format } from 'date-fns';
// import { ColumnFilter } from './ColumnFilter';
export const COLUMNS = [
      {
            Header: 'Log Id',
            accessor: '_id',
            // Filter: ColumnFilter,
            // disableFilters: true
      },
      {
            Header: 'Sender Id',
            accessor: 'senderId',
      },
      {
            Header: 'Time Stamp',
            accessor: 'timestamp',
            // Cell: ({ value }) => { return format(new Date(value), 'dd/mm/yyyy') },
      },
      {
            Header: 'Correlation Id',
            accessor: 'correlationId',
      },
      {
            Header: 'Log Severity',
            accessor: 'severity',
      },
      {
            Header: 'Payload',
            accessor: 'inner',
      }
]