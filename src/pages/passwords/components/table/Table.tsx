import { FC, useCallback, useEffect, useMemo, useState } from "react";

import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import { TableContainer } from "./styles";
import { Password } from "types/passwords";

interface TableProps {
  active: number;
  items: Password[];
  changeActiveRow: (active: number) => void;
  onEdit: (value: number) => void;
}

const Table: FC<TableProps> = (props) => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const { items } = props;

  const isAllSelected = useMemo(
    () => items.length > 0 && items.length === selectedRows.length,
    [selectedRows, items]
  );

  const onChangeAllSelected = useCallback(
    () => setSelectedRows(isAllSelected ? [] : items.map(({ id }) => id)),
    [isAllSelected, items]
  );

  const onSelectRow = useCallback(
    (id) =>
      setSelectedRows((prev) =>
        prev.includes(id) ? prev.filter((val) => val !== id) : prev.concat(id)
      ),
    []
  );

  useEffect(() => {
    setSelectedRows([]);
  }, [items]);

  return (
    <TableContainer>
      <TableHeader
        isAllSelected={isAllSelected}
        onChangeAllSelected={onChangeAllSelected}
      />
      <TableBody
        {...props}
        selectedRows={selectedRows}
        onSelect={onSelectRow}
      />
    </TableContainer>
  );
};

export default Table;
