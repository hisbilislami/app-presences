import {
  PaginationState,
  Table,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import CustomColumnDef from "../etc/CustomColumnDef";
import { useState } from "react";
import {
  RiArrowLeftDoubleFill,
  RiArrowLeftSLine,
  RiArrowRightDoubleFill,
  RiArrowRightSLine,
} from "react-icons/ri";

interface TableProps<T> {
  data: T[];
  columns: CustomColumnDef<T>[];
  total: number;
}

interface PaginationProps<T> {
  table: T;
}

const PaginationComponent = <T extends Table<any>>({
  table,
}: PaginationProps<T>) => {
  return (
    <div className="flex items-center justify-between px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center rounded-md border border-athensgray bg-white px-4 py-2 text-sm font-medium hover:bg-frenchgray-300"
        >
          Previous
        </a>
        <a
          href="#"
          className="relative ml-3 inline-flex items-center rounded-md border border-athensgray bg-white px-4 py-2 text-sm font-medium  hover:bg-frenchgray-300"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm ">
            Showing
            <span className="font-medium mx-2">
              {table.getState().pagination.pageIndex + 1}
            </span>
            to
            <span className="font-medium mx-2">
              {table.getRowModel().rows.length.toLocaleString()}
            </span>
            of
            <span className="font-medium mx-2">
              {table.getPageCount().toLocaleString()}
            </span>
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <span
              className={`relative inline-flex items-center w-9 justify-center rounded-l-md px-2 py-2 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer`}
              onClick={() => {
                !table.getCanPreviousPage() ?? table.firstPage();
              }}
            >
              <span className="sr-only">Back to first page</span>
              {!table.getCanPreviousPage() ? (
                <RiArrowLeftDoubleFill className="text-athensgray-300" />
              ) : (
                <RiArrowLeftDoubleFill />
              )}
            </span>
            <span
              className="relative inline-flex items-center w-9 justify-center px-2 py-2 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer"
              onClick={() => {
                !table.getCanPreviousPage() ?? table.previousPage();
              }}
            >
              <span className="sr-only">Previous</span>
              {!table.getCanPreviousPage() ? (
                <RiArrowLeftSLine className="text-athensgray-300" />
              ) : (
                <RiArrowLeftSLine />
              )}
            </span>
            <a
              href="#"
              aria-current="page"
              className="relative z-10 inline-flex items-center w-9 justify-center bg-cerulean px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              1
            </a>
            <a
              href="#"
              className="relative inline-flex items-center w-9 justify-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              2
            </a>
            <a
              href="#"
              className="relative hidden items-center w-9 justify-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
            >
              3
            </a>
            <span className="relative inline-flex w-9 justify-center items-center px-4 py-2 text-sm font-semibold  ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
              ...
            </span>
            <a
              href="#"
              className="relative hidden items-center w-9 justify-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
            >
              8
            </a>
            <a
              href="#"
              className="relative inline-flex items-center w-9 justify-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              9
            </a>
            <a
              href="#"
              className="relative inline-flex items-center w-9 justify-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              10
            </a>
            <span
              className="relative inline-flex items-center w-9 justify-center px-2 py-2 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer"
              onClick={() => !table.getCanNextPage() ?? table.nextPage()}
            >
              <span className="sr-only">Next</span>
              {!table.getCanNextPage() ? (
                <RiArrowRightSLine className="text-athensgray-300" />
              ) : (
                <RiArrowRightSLine />
              )}
            </span>
            <span
              className="relative inline-flex items-center w-9 justify-center rounded-r-md px-2 py-2 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer"
              onClick={() => !table.getCanNextPage() ?? table.lastPage()}
            >
              <span className="sr-only">End of page</span>
              {!table.getCanNextPage() ? (
                <RiArrowRightDoubleFill className="text-athensgray-300" />
              ) : (
                <RiArrowRightDoubleFill />
              )}
            </span>
          </nav>
        </div>
      </div>
    </div>
  );
};

const BillTable = <T,>({ data, columns, total }: TableProps<T>) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageSize: 10,
    pageIndex: 0,
  });

  const table = useReactTable({
    data,
    columns,
    state: {
      pagination,
    },
    initialState: {
      sorting: [
        {
          id: "fullName",
          desc: true, // sort by name in descending order by default
        },
      ],
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(), //provide a sorting row model
    manualPagination: true, //turn off client-side pagination
    rowCount: total,
    debugTable: true,
  });

  return (
    <div className="block w-full p-10">
      <h1 className="text-2xl mb-3 underline">Data List</h1>
      <div className="rounded-t-xl overflow-hidden bg-gradient-to-r from-emerald-50 to-teal-100  w-[100%] flex justify-center items-center">
        <table className="table-auto border-collapse w-[98%] border-b-2 border-b-frenchgray-300">
          <thead className="">
            {table.getHeaderGroups().map((headerGroup) => {
              return (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header, index) => {
                    const isFirst = index === 0;
                    const isLast = index === headerGroup.headers.length - 1;
                    return (
                      <th
                        id={header.id}
                        key={header.id}
                        className={`bg-athensgray py-2 border-b-2 border-b-frenchgray-300 text-sm ${
                          header.column.columnDef.meta?.className ?? ""
                        } ${isFirst ? "rounded-tl-md" : ""} ${
                          isLast ? "rounded-tr-md" : ""
                        }`}
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
          <tbody>
            {table.getRowModel().rows.map((row) => {
              return (
                <tr key={row.id} className="border-b border-frenchgray-300">
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td
                        key={cell.id}
                        className={`py-[5px] text-sm ${
                          cell.column.columnDef.meta?.className ?? ""
                        }`}
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

      <PaginationComponent table={table} />
    </div>
  );
};

export default BillTable;
