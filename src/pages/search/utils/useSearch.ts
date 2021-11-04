import { useCallback, useMemo } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { parse, stringify } from "query-string";

import { UseSearchResult, SearchFilter } from "../types";

const useSearch = (): UseSearchResult => {
  const history = useHistory();
  const { search } = useLocation();

  const filter = useMemo<SearchFilter>(() => {
    const { query, groups = [] } = parse(search, {
      parseNumbers: true,
      arrayFormat: "index",
    });

    return {
      query,
      groups,
    } as SearchFilter;
  }, [search]);

  const change = useCallback(
    (value) => {
      history.replace({
        search: stringify(Object.assign(filter, value), {
          arrayFormat: "index",
        }),
      });
    },
    [history, filter]
  );

  return [filter, change];
};

export default useSearch;
