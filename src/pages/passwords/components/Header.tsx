import { FC, useCallback } from "react";
import {
  Header as RHeader,
  FlexboxGrid,
  Button,
  Input,
  InputGroup,
} from "rsuite";
import { useTranslation } from "react-i18next";

import { PasswordsFilter, UsePasswordsFilterChange } from "../types";

import SearchSettings from "./SearchSettings";

import SearchIcon from "icons/search.svg";

interface HeaderProps {
  filter: PasswordsFilter;
  changeFilter: UsePasswordsFilterChange;
  onOpenCreate: () => void;
}

const Header: FC<HeaderProps> = ({ filter, changeFilter, onOpenCreate }) => {
  const { t } = useTranslation();

  const onChangeQuery = useCallback(
    (query) => changeFilter({ query }),
    [changeFilter]
  );

  return (
    <RHeader className="m-b-20">
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
                <Input
                  style={{ width: 210 }}
                  value={filter.query}
                  placeholder={t("Start typing for the search")}
                  onChange={onChangeQuery}
                />
              </InputGroup>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item className="m-r-10">
              <SearchSettings />
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
