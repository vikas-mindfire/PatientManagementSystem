import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import Checkbox from "components/checkbox";

const PatientTable = ({ patients, columns }) => {
  const tableInstance = useTable(
    {
      columns,
      data: patients,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    initialState,
  } = tableInstance;
  initialState.pageSize = 11;

  return (
    <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden">
      <table
        {...getTableProps()}
        className="w-full"
        variant="simple"
        color="gray-500"
        mb="24px"
      >
        <thead>
          {headerGroups.map((headerGroup, index) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column, index) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="border-b border-gray-200 pr-16 pb-[10px] text-start dark:!border-navy-700"
                  key={index}
                >
                  <div className="text-xs font-bold tracking-wide text-gray-600 lg:text-xs">
                    {column.render("Header")}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, index) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={index}>
                {row.cells.map((cell, index) => {
                  let data = "";
                  if (cell.column.Header === "Full Name") {
                    data = (
                      <div className="flex items-center gap-2">
                        {/* <Checkbox /> */}
                        <p className="text-sm font-bold text-navy-700 dark:text-white capitalize">
                          {cell.value}
                        </p>
                      </div>
                    );
                  } else  {
                    data = (
                      <p className="text-sm font-bold text-navy-700 dark:text-white">
                        {cell.value}
                      </p>
                    );
                  }
                  return (
                    <td
                      {...cell.getCellProps()}
                      key={index}
                      className="pt-[14px] pb-[16px] sm:text-[14px]"
                    >
                      {data}
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

export default PatientTable;
