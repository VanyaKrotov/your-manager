import { FC, useCallback, useState } from "react";
import {
  Header as RHeader,
  FlexboxGrid,
  Button,
  Input,
  InputGroup,
  IconButton,
} from "rsuite";
import { useTranslation } from "react-i18next";

import { PasswordsFilter, UsePasswordsFilterChange } from "../types";

import SearchIcon from "icons/search.svg";
import SearchOptionsIcon from "icons/options.svg";
import AddPassword from "./AddPassword";

interface HeaderProps {
  filter: PasswordsFilter;
  changeFilter: UsePasswordsFilterChange;
}

const Header: FC<HeaderProps> = ({}) => {
  const [openCreate, setOpenCreate] = useState(false);
  const { t } = useTranslation();

  const onOpenCreate = useCallback(() => setOpenCreate(true), []);
  const onCloseCreate = useCallback(() => setOpenCreate(false), []);

  return (
    <RHeader className="m-b-20">
      <AddPassword open={openCreate} onClose={onCloseCreate} />

      <FlexboxGrid align="middle" justify="space-between">
        <FlexboxGrid.Item>
          <h3>{t("Passwords")}</h3>
        </FlexboxGrid.Item>

        <FlexboxGrid.Item>
          <FlexboxGrid align="middle">
            <FlexboxGrid.Item className="m-r-10">
              <InputGroup>
                <InputGroup.Addon>
                  <SearchIcon />
                </InputGroup.Addon>
                <Input placeholder="Typing for the search" />
              </InputGroup>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item className="m-r-10">
              <IconButton icon={<SearchOptionsIcon />} />
            </FlexboxGrid.Item>
            <FlexboxGrid.Item>
              <Button onClick={onOpenCreate}>{t("Add item")}</Button>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </RHeader>
  );
};

export default Header;
