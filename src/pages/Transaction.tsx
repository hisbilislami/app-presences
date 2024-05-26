import React, { useMemo } from "react";
import { CaretSortIcon } from "@radix-ui/react-icons";
import CustomColumnDef from "../etc/CustomColumnDef";
import BillGrid from "@/components/BillGrid";
import { Checkbox } from "@/components/ui/checkbox";

type TableReader = {
  total: number;
  results: {
    firstName: string;
    surname: string;
    age: number;
    gender: string;
  }[];
};

type ColumnModel<TR extends TableReader> = TR["results"][number];

const Transaction: React.FC = () => {
  const data: TableReader = {
    total: 20,
    results: [
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
    ],
  };

  const columns = useMemo<CustomColumnDef<ColumnModel<TableReader>>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <div className="inline-flex justify-center items-center w-full h-full">
            <Checkbox
              checked={
                table.getIsAllPageRowsSelected() ||
                (table.getIsSomePageRowsSelected() && "indeterminate")
              }
              onCheckedChange={(value) =>
                table.toggleAllPageRowsSelected(!!value)
              }
              aria-label="Select all"
            />
          </div>
        ),
        cell: ({ row }) => (
          <div className="flex justify-center">
            <Checkbox
              checked={row.getIsSelected()}
              onCheckedChange={(value) => row.toggleSelected(!!value)}
              aria-label="Select row"
            />
          </div>
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorFn: (row) => `${row.firstName} ${row.surname}`,
        id: "fullName",
        header: ({ column }) => {
          return (
            <div className="inline-flex">
              Full Name
              <CaretSortIcon
                onClick={() =>
                  column.toggleSorting(column.getIsSorted() === "asc")
                }
                className="ml-2 h-4 w-4 cursor-pointer"
              />
            </div>
          );
        },
        cell: ({ row }) => (
          <div className="lowercase">{row.getValue("fullName")}</div>
        ),
      },
      {
        header: "Gender",
        accessorKey: "gender",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <div className="text-center">Age</div>,
        accessorKey: "age",
        cell: ({ row }) => (
          <div className="text-center">{row.getValue("age")} Years old</div>
        ),
        meta: {
          className: "text-center",
        },
      },
    ],
    []
  );

  return (
    <div className="bg-frenchgray-200 w-full md:rounded-l-3xl p-7 h-[100vvh]">
      <div className="bg-athensgray-50">
        <BillGrid
          data={data.results}
          columns={columns}
          total={data.total}
          columnSearchField="fullName"
        />
      </div>
    </div>
  );
};

export default Transaction;
