import { FC } from "react";
import { Password } from "types/passwords";

import TableRow from "./TableRow";

import { EmptyContainer } from "./styles";
import { useTranslation } from "react-i18next";

interface TableBodyProps {
  active: number;
  items: Password[];
  selectedRows: number[];
  onEdit: (value: number) => void;
  changeActiveRow: (active: number) => void;
  onSelect: (id: number) => void;
}

const TableBody: FC<TableBodyProps> = ({
  changeActiveRow,
  items,
  selectedRows,
  onSelect,
  onEdit,
}) => {
  const { t } = useTranslation();

  if (!items.length) {
    return (
      <EmptyContainer>
        <p>{t("Empty data")}</p>
      </EmptyContainer>
    );
  }

  return (
    <>
      {items.map((item) => (
        <TableRow
          data={item}
          key={item.id}
          onEdit={() => onEdit(item.id)}
          selected={selectedRows.includes(item.id)}
          onSelect={onSelect}
          onClick={() => changeActiveRow(item.id)}
        />
      ))}
    </>
  );
};

export default TableBody;
