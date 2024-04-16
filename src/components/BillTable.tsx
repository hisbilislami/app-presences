import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";

type TableReader = {
  firstName: string;
  surname: string;
  age: number;
  gender: string;
};

const BillTable: React.FC = () => {
  const data: TableReader[] = [
    {
      firstName: "Jane",
      surname: "Doe",
      age: 13,
      gender: "Female",
    },
    {
      firstName: "John",
      surname: "Doe",
      age: 43,
      gender: "Male",
    },
    {
      firstName: "Tom",
      surname: "Doe",
      age: 89,
      gender: "Male",
    },
  ];

  const columnHelper = createColumnHelper<TableReader>();

  const columns = [
    columnHelper.accessor((row) => `${row.firstName} ${row.surname}`, {
      id: "fullName",
      header: "Full Name",
    }),
    columnHelper.accessor("gender", {
      header: "Gender",
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
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
                      <th id={header.id} key={header.id}>
                        {" "}
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
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
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
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
