import { FC, useMemo, useState } from "react";
import { Content as RContent, FlexboxGrid } from "rsuite";

import { PasswordsFilter, UsePasswordsFilterChange } from "../types";
import { Table } from "./table";

interface ContentProps {
  filter: PasswordsFilter;
  changeFilter: UsePasswordsFilterChange;
}

const Content: FC<ContentProps> = ({ filter: { active } }) => {
  const [first, second] = useMemo(() => (active ? [18, 6] : [24, 0]), [active]);

  return (
    <RContent>
      <FlexboxGrid>
        <FlexboxGrid.Item colspan={first}>
          <Table />
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={second}></FlexboxGrid.Item>
      </FlexboxGrid>
    </RContent>
  );
};

export default Content;
