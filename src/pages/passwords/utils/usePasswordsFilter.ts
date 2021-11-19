import { parse, stringify } from "query-string";
import { useCallback, useMemo } from "react";
import { useHistory, useLocation } from "react-router";
import { PasswordsFilter, UsePasswordsFilterChange } from "../types";

const usePasswordsFilter = (): [PasswordsFilter, UsePasswordsFilterChange] => {
  const history = useHistory();
  const { search } = useLocation();

  const filter = useMemo<PasswordsFilter>(() => {
    const { active = 0, query = "" } = parse(search, { parseNumbers: true });

    return {
      active,
      query: String(query),
    } as PasswordsFilter;
  }, [search]);

  const change = useCallback(
    (values) =>
      history.replace({ search: stringify(Object.assign(filter, values)) }),
    [history, filter]
  );

  return [filter, change];
};

export default usePasswordsFilter;
