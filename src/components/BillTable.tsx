import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import CustomColumnDef from "../etc/CustomColumnDef";

interface TableProps<T> {
  data: T[];
  columns: CustomColumnDef<T>[];
  total: number;
}

const BillTable = <T,>({ data, columns, total }: TableProps<T>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true, //turn off client-side pagination
    rowCount: total,
  });

  return (
    <div className="block w-full p-10">
      <h1 className="text-2xl mb-3 underline">Data List</h1>
      <div className="rounded-t-xl overflow-hidden bg-gradient-to-r from-emerald-50 to-teal-100  w-[100%] flex justify-center items-center">
        <table className="table-auto divide-y-2 divide-abbey w-[98%] border-b-abbey border-b-2 border-solid ">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => {
              return (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <th
                        id={header.id}
                        key={header.id}
                        className={header.column.columnDef.meta?.className}
                      >
                        {" "}
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </th>
                    );
                  })}
                </tr>
              );
            })}
          </thead>
          <tbody className="divide-y-2 divide-abbey ">
            {table.getRowModel().rows.map((row) => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td
                        key={cell.id}
                        className={cell.column.columnDef.meta?.className}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BillTable;
