import { isToday } from "date-fns";
import { makeAutoObservable } from "mobx";
import {
  child,
  DatabaseReference,
  ref,
  update,
  onValue,
  set,
  remove,
} from "firebase/database";

import { TodoGroup, TodoItem } from "types/todo-list";
import { TodoDefaultListGroup } from "enums/todo-list";

import { db } from "services/firebase";

interface ItemsMap {
  [key: string | number]: TodoItem[];
}

class TodoListStore {
  private groupsRef: DatabaseReference;
  private itemsRef: DatabaseReference;
  public groups: TodoGroup[] = [];
  public items: TodoItem[] = [];

  constructor(userId: number) {
    makeAutoObservable(this);

    this.itemsRef = ref(db, `todos/${userId}`);
    this.groupsRef = ref(db, `todosGroups/${userId}`);

    this.init();
  }

  public get todoMap(): Record<number, TodoItem> {
    return this.items.reduce(
      (acc, item) => Object.assign(acc, { [item.id]: item }),
      {}
    );
  }

  public get itemsMapForGroups(): ItemsMap {
    const itemsGroupMap = this.items.reduce(
      (acc, item) =>
        Object.assign(acc, {
          [item.groupId]: (acc[item.groupId] || []).concat(item),
        }),
      {} as ItemsMap
    );

    return {
      ...itemsGroupMap,
      [TodoDefaultListGroup.All]: this.items,
      [TodoDefaultListGroup.Priority]: this.items.filter(
        ({ priority }) => priority
      ),
      [TodoDefaultListGroup.Today]: this.items.filter(({ dateCreate }) =>
        isToday(dateCreate)
      ),
    };
  }

  public countItemsInGroup(groupId: number | TodoDefaultListGroup) {
    return this.itemsMapForGroups[groupId]?.length || 0;
  }

  private async init() {
    const unsubscribeGroups = onValue(this.groupsRef, (snapshot) => {
      this.groups = Object.values(snapshot.val() || {});
    });

    const unsubscribeItems = onValue(this.itemsRef, (snapshot) => {
      this.items = Object.values(snapshot.val() || {});
    });

    return () => {
      unsubscribeGroups();
      unsubscribeItems();
    };
  }

  public async addGroup(group: Partial<Omit<TodoGroup, "id">>) {
    const currentTime = new Date().getTime();
    const newGroup = { ...group, id: currentTime };

    await set(child(this.groupsRef, String(currentTime)), newGroup);
  }

  public async removeGroup(groupId: number) {
    await remove(child(this.groupsRef, String(groupId)));
  }

  public async removeItem(itemId: number) {
    await remove(child(this.itemsRef, String(itemId)));
  }

  public async addItem(
    item: Omit<TodoItem, "id" | "lastChanged" | "dateCreate" | "priority">
  ) {
    const currentTime = new Date().getTime();
    const newItem = {
      ...item,
      steps: { ...(item.steps || []) },
      id: currentTime,
      dateCreate: currentTime,
      priority: false,
    };

    await set(child(this.itemsRef, String(currentTime)), newItem);

    return newItem;
  }

  public async updateItem(id: number, newValues: Partial<TodoItem>) {
    const item = this.items.find(({ id: _id }) => _id === id)!;
    const updatedItem = {
      ...item,
      steps: { ...item.steps },
      ...newValues,
    };

    await update(child(this.itemsRef, String(id)), updatedItem);
  }
}

export default TodoListStore;
