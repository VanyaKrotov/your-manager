import { parse, stringify } from "query-string";
import { useCallback, useMemo } from "react";
import { useHistory, useLocation } from "react-router";
import { NotesFilter, NotesFilterHandler } from "../types";

const useNotesFilter = (): [NotesFilter, NotesFilterHandler] => {
  const { search } = useLocation();
  const history = useHistory();

  const filter = useMemo(() => {
    const { active = 0 } = parse(search, { parseNumbers: true });

    return {
      active,
    } as NotesFilter;
  }, [search]);

  const changeFilter = useCallback(
    (newValue: Partial<NotesFilter>) =>
      history.replace({ search: stringify({ ...filter, ...newValue }) }),
    [filter, history]
  );

  return [filter, changeFilter];
};

export default useNotesFilter;
