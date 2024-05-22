import { ColumnDef } from "@tanstack/react-table";

type CustomColumnMeta = {
  className?: string;
};

type CustomColumnDef<T> = ColumnDef<T> & {
  meta?: CustomColumnMeta;
};

export default CustomColumnDef;
