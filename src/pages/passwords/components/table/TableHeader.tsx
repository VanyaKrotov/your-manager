import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Checkbox } from "rsuite";

import { HeaderContainer, TableHeaderItem } from "./styles";

interface TableHeaderProps {
  isAllSelected: boolean;
  onChangeAllSelected: (value: unknown) => void;
}

const TableHeader: FC<TableHeaderProps> = ({
  isAllSelected,
  onChangeAllSelected,
}) => {
  const { t } = useTranslation();

  return (
    <HeaderContainer>
      <TableHeaderItem xs={1} sm={1} md={1} lg={1} className="flex-block">
        <Checkbox
          className="custom-checkbox"
          checked={isAllSelected}
          onChange={onChangeAllSelected}
        />
      </TableHeaderItem>
      <TableHeaderItem xs={4} sm={4} md={4} lg={4}>
        {t("Title")}
      </TableHeaderItem>
      <TableHeaderItem xs={4} sm={4} md={4} lg={5}>
        {t("Username")}
      </TableHeaderItem>
      <TableHeaderItem xs={3} sm={4} md={4} lg={4}>
        {t("Domain")}
      </TableHeaderItem>
      <TableHeaderItem xs={4} sm={4} md={5} lg={5}>
        {t("Password")}
      </TableHeaderItem>
      <TableHeaderItem xs={4} sm={3} md={3} lg={3}>
        {t("Group")}
      </TableHeaderItem>
      <TableHeaderItem xs={4} sm={4} md={3} lg={2} className="align-right">
        {t("Actions")}
      </TableHeaderItem>
    </HeaderContainer>
  );
};

export default TableHeader;
