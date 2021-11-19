import { FC, useCallback } from "react";
import { Content as RContent } from "rsuite";
import { Password } from "types/passwords";

import { PasswordsFilter, UsePasswordsFilterChange } from "../types";
import { Table } from "./table";

interface ContentProps {
  filter: PasswordsFilter;
  items: Password[];
  changeFilter: UsePasswordsFilterChange;
  onEdit: (value: number) => void;
}

const Content: FC<ContentProps> = ({
  filter: { active },
  changeFilter,
  items,
  onEdit,
}) => {
  const changeActiveRow = useCallback(
    (active) => changeFilter({ active }),
    [changeFilter]
  );

  return (
    <RContent>
      <Table
        changeActiveRow={changeActiveRow}
        active={active}
        items={items}
        onEdit={onEdit}
      />
    </RContent>
  );
};

export default Content;
