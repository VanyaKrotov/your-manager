import { parse, stringify } from "query-string";
import { useCallback, useMemo } from "react";
import { useHistory, useLocation } from "react-router";
import { TodoDefaultListGroup } from "../../../enums/todo-list";
import { ItemsFilter, TodoListFilter } from "../types";

export type ChangeTodoFilterHandler = (values: Partial<TodoListFilter>) => void;

interface ReturnValue {
  filter: TodoListFilter;
  onChange: ChangeTodoFilterHandler;
}

export const useTodoListFilter = (): ReturnValue => {
  const { search } = useLocation();
  const history = useHistory();

  const filter = useMemo(() => {
    const {
      group = String(TodoDefaultListGroup.All),
      filter = String(ItemsFilter.All),
    } = parse(search);

    return {
      group: Number(group),
      filter: Number(filter),
    };
  }, [search]);

  const onChange = useCallback(
    (newValue) =>
      history.replace({ search: stringify({ ...filter, ...newValue }) }),
    [filter, history]
  );

  return { filter, onChange };
};
