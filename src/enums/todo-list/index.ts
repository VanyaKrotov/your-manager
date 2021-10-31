export enum TodoDefaultListGroup {
  All = -1,
  Today = -2,
  Priority = -3,
}

export const TODO_DEFAULT_LIST_GROUP_VALUES = Object.values(
  TodoDefaultListGroup
).filter(Number.isInteger);
