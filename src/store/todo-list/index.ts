import { isToday } from "date-fns";
import { makeAutoObservable } from "mobx";
import { TodoDefaultListGroup } from "../../enums/todo-list";
import TodoGroupModel from "../../models/todo/TodoGroupModel";
import TodoItemModel from "../../models/todo/TodoIteModel";
import { TodoGroup, TodoItem } from "../../types/todo-list";

interface ItemsMap {
  [key: string | number]: TodoItem[];
}

class TodoListStore {
  public groups: TodoGroup[] = [];
  public items: TodoItem[] = [];

  constructor(userId: number) {
    makeAutoObservable(this);

    this.loadData(userId);
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

  public async loadData(userId: number) {
    this.groups = await TodoGroupModel.selectAllForUserId(userId);
    this.items = await TodoItemModel.selectAllForUserId(userId);
  }

  public async addGroup(group: Partial<Omit<TodoGroup, "id">>) {
    const addedGroup = await TodoGroupModel.add(group);

    this.groups.push(addedGroup);
  }

  public async removeGroup(groupId: number) {
    const removeSuccess = await TodoGroupModel.removeById(groupId);

    if (removeSuccess) {
      this.groups = this.groups.filter(({ id }) => id !== groupId);
      this.items = this.items.filter(
        ({ groupId: _groupId }) => _groupId !== groupId
      );
    }
  }

  public async removeItem(itemId: number) {
    const removeSuccess = await TodoItemModel.removeById(itemId);

    if (removeSuccess) {
      this.items = this.items.filter(({ id }) => id !== itemId);
    }
  }

  public async addItem(
    item: Omit<TodoItem, "id" | "lastChanged" | "dateCreate" | "priority">
  ) {
    const addedItem = await TodoItemModel.add(item);

    this.items.push(addedItem);

    return addedItem;
  }

  public async updateItem(id: number, value: Partial<TodoItem>) {
    const index = this.items.findIndex(({ id: _id }) => _id === id)!;
    const updatedItem = await TodoItemModel.update({
      ...this.items[index],
      ...value,
    });

    this.items[index] = updatedItem;
  }
}

export default TodoListStore;
