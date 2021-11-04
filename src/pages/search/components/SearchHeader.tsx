import { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { FlexboxGrid, Input, TagPicker } from "rsuite";

import { SearchFilter, UseSearchChange } from "../types";
import { SEARCH_GROUP_OPTIONS } from "../utils/constants";

import { SearchHeaderContainer, SearchControl } from "./styled";

interface SearchHeaderProps {
  search: SearchFilter;
  changeSearch: UseSearchChange;
}

const SearchHeader: FC<SearchHeaderProps> = ({ search, changeSearch }) => {
  const { t } = useTranslation();

  const onChangeQuery = useCallback(
    (query) => changeSearch({ query }),
    [changeSearch]
  );

  const onChangeGroups = useCallback(
    (groups) => changeSearch({ groups }),
    [changeSearch]
  );

  return (
    <SearchHeaderContainer>
      <FlexboxGrid align="middle" justify="space-between" className="m-b-20">
        <FlexboxGrid.Item>
          <h4>{t("Global search")}</h4>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item className="w-300">
          <TagPicker
            data={SEARCH_GROUP_OPTIONS}
            searchable={false}
            cleanable={false}
            block
            value={search.groups}
            onChange={onChangeGroups}
          />
        </FlexboxGrid.Item>
      </FlexboxGrid>

      <SearchControl>
        <Input
          size="lg"
          placeholder={"Начните вводить для поиска"}
          value={search.query}
          onChange={onChangeQuery}
        />
      </SearchControl>
    </SearchHeaderContainer>
  );
};

export default SearchHeader;
