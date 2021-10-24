import { modelInitRunner, sqlQuery } from "..";
import { mapSqlResultToArray } from "../../helpers/mappers";
import { TodoItem } from "../../types/todo-list";

class TodoItemModel {
  public static init() {
    return sqlQuery(
      `CREATE TABLE ${TodoItemModel.name} (
          id INTEGER PRIMARY KEY, 
          title TEXT, 
          description TEXT, 
          state INTEGER,
          type INTEGER,
          groupId INTEGER, 
          userId INTEGER, 
          orderIndex INTEGER, 
          steps TEXT, 
          dateCreate REAL, 
          priority BOOL, 
          lastChanged REAL
        )`
    );
  }

  public static async add({
    title,
    description,
    state,
    type,
    groupId,
    userId,
    steps,
    orderIndex,
  }: Omit<TodoItem, "id" | "lastChanged" | "dateCreate" | "priority">) {
    const { result } = await sqlQuery(
      `INSERT INTO ${TodoItemModel.name} (title, description, state, type, groupId, userId, orderIndex, steps, dateCreate, priority) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        description,
        state,
        type,
        groupId,
        userId,
        orderIndex,
        JSON.stringify(steps),
        new Date().getTime(),
        false,
      ]
    );

    if (result.insertId) {
      return TodoItemModel.selectById(result.insertId);
    }

    return null;
  }

  public static async selectById(itemId: number) {
    const { result } = await sqlQuery(
      `SELECT * FROM ${TodoItemModel.name} WHERE id = ?`,
      [itemId]
    );

    if (!result.rows.length) {
      return null;
    }

    const { steps, priority, ...rest } = result.rows.item(0);

    return { steps: JSON.parse(steps), priority: priority === "true", ...rest };
  }

  public static async selectAllForUserId(userId: number): Promise<TodoItem[]> {
    const { result } = await sqlQuery(
      `SELECT * FROM ${TodoItemModel.name} WHERE userId = ?`,
      [userId]
    );

    return mapSqlResultToArray(result).map(
      ({ steps = "[]", priority, ...rest }) => ({
        steps: JSON.parse(steps),
        priority: priority === "true",
        ...rest,
      })
    );
  }

  public static async update({
    id,
    steps,
    title,
    description,
    state,
    type,
    groupId,
    userId,
    orderIndex,
    priority,
  }: TodoItem) {
    const { result } = await sqlQuery(
      `UPDATE ${TodoItemModel.name} SET title = ?, description = ?, state = ?, type = ?, groupId = ?, userId = ?, orderIndex = ?, steps = ?, priority = ?, lastChanged = ? WHERE id = ?`,
      [
        title,
        description,
        state,
        type,
        groupId,
        userId,
        orderIndex,
        JSON.stringify(steps),
        priority,
        new Date().getTime(),
        id,
      ]
    );

    if (result.rowsAffected === 1) {
      return TodoItemModel.selectById(id);
    }

    return null;
  }

  public static async removeByGroupId(groupId: number): Promise<boolean> {
    await sqlQuery(`DELETE FROM ${TodoItemModel.name} WHERE groupId = ?`, [
      groupId,
    ]);

    return true;
  }

  public static async removeById(id: number) {
    const { result } = await sqlQuery(
      `DELETE FROM ${TodoItemModel.name} WHERE id = ?`,
      [id]
    );

    return result.rowsAffected > 0;
  }
}

modelInitRunner(TodoItemModel);

export default TodoItemModel;
