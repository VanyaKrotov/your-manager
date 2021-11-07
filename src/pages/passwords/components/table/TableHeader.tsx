import { FC } from "react";
import { Checkbox } from "rsuite";

import { HeaderContainer, TableHeaderItem } from "./styles";

interface TableHeaderProps {}

const TableHeader: FC<TableHeaderProps> = ({}) => {
  return (
    <HeaderContainer>
      <TableHeaderItem xs={1} sm={1} md={1} lg={1} className="flex-block">
        <Checkbox className="custom-checkbox"/>
      </TableHeaderItem>
      <TableHeaderItem xs={4} sm={4} md={4} lg={4}>
        Title
      </TableHeaderItem>
      <TableHeaderItem xs={4} sm={4} md={4} lg={5}>
        username
      </TableHeaderItem>
      <TableHeaderItem xs={3} sm={4} md={4} lg={4}>
        domain
      </TableHeaderItem>
      <TableHeaderItem xs={4} sm={4} md={5} lg={5}>
        password
      </TableHeaderItem>
      <TableHeaderItem xs={4} sm={3} md={3} lg={3}>
        group
      </TableHeaderItem>
      <TableHeaderItem xs={4} sm={4} md={3} lg={2}></TableHeaderItem>
    </HeaderContainer>
  );
};

export default TableHeader;
