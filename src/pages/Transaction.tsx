import React from "react";
import BillTable from "../components/BillTable";

const Transaction: React.FC = () => {
  return (
    <div className="bg-frenchgray-200 w-full md:rounded-l-3xl p-7 h-[100vvh]">
      <div className="bg-athensgray-50">
        <BillTable />
      </div>
    </div>
  );
};

export default Transaction;
