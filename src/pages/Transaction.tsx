import React, { useMemo } from "react";
import BillTable from "../components/BillTable";
import CustomColumnDef from "../etc/CustomColumnDef";

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
        accessorFn: (row) => `${row.firstName} ${row.surname}`,
        id: "fullName",
        header: "Full Name",
        cell: (info) => info.getValue(),
      },
      {
        header: "Gender",
        accessorKey: "gender",
        cell: (info) => info.getValue(),
      },
      {
        header: "Age",
        accessorKey: "age",
        cell: (info) => info.getValue(),
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
        <BillTable data={data.results} columns={columns} total={data.total} />
      </div>
    </div>
  );
};

export default Transaction;
