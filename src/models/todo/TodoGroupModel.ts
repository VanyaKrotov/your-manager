import { modelInitRunner, sqlQuery } from "..";
import { mapSqlResultToArray } from "../../helpers/mappers";
import { TodoGroup } from "../../types/todo-list";
import TodoItemModel from "./TodoIteModel";

class TodoGroupModel {
  public static init() {
    return sqlQuery(
      `CREATE TABLE ${TodoGroupModel.name} (
          id INTEGER PRIMARY KEY, 
          title TEXT,
          orderIndex INTEGER,
          userId INTEGER
        )`
    );
  }

  public static async getById(groupId: number) {
    const { result } = await sqlQuery(
      `SELECT * FROM ${TodoGroupModel.name} WHERE id = ?`,
      [groupId]
    );

    if (result.rows.length) {
      return result.rows.item(0);
    }

    return null;
  }

  public static async add({
    title,
    orderIndex,
    userId,
  }: Partial<Omit<TodoGroup, "id">>) {
    const { result } = await sqlQuery(
      `INSERT INTO ${TodoGroupModel.name} (title, orderIndex, userId) values(?, ?, ?)`,
      [title, orderIndex, userId]
    );

    if (result.insertId) {
      return await TodoGroupModel.getById(result.insertId);
    }

    return null;
  }

  public static async selectAllForUserId(userId: number): Promise<TodoGroup[]> {
    const { result } = await sqlQuery(
      `SELECT * FROM ${TodoGroupModel.name} WHERE userId = ?`,
      [userId]
    );

    return mapSqlResultToArray(result);
  }

  public static async removeById(groupId: number): Promise<boolean> {
    const { result } = await sqlQuery(
      `DELETE FROM ${TodoGroupModel.name} WHERE id = ?`,
      [groupId]
    );

    return (
      result.rowsAffected === 1 &&
      (await TodoItemModel.removeByGroupId(groupId))
    );
  }
}

modelInitRunner(TodoGroupModel);

export default TodoGroupModel;
