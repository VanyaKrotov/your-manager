import { FC } from "react";

import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import { TableContainer } from "./styles";

interface TableProps {}

const Table: FC<TableProps> = ({}) => {
  return (
    <TableContainer>
      <TableHeader />
      <TableBody />
    </TableContainer>
  );
};

export default Table;
