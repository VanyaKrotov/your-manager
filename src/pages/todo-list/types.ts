import { TodoDefaultListGroup } from "enums/todo-list";

export enum ItemsFilter {
  All,
  Done,
  InProgress,
}

export interface TodoListFilter {
  group: string | number | TodoDefaultListGroup;
  filter: ItemsFilter;
}
