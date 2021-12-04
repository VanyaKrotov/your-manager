export interface TodoGroup {
  id: number;
  title: string;
  orderIndex: number;
  userId: number;
}

export enum TodoState {
  InProgress,
  Done,
}

export interface TodoStep {
  id: number;
  title: string;
  priority: boolean;
  state: TodoState;
}

export interface TodoItem {
  id: number;
  title: string;
  description: string;
  state: TodoState;
  type: number; // ???
  groupId: number;
  userId: number;
  orderIndex: number | null;
  steps?: TodoStep[];
  dateCreate: number;
  priority: boolean;
  lastChanged: number | null;
}
