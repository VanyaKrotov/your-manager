import { mapSqlResultToArray } from "helpers/mappers";
import { sqlQuery } from "models";
import { PasswordGroup } from "types/passwords";

class PasswordGroupModel {
  public static MODEL_NAME = "password_group_model";

  public static init() {
    return sqlQuery(`CREATE TABLE ${this.MODEL_NAME} (
        id INTEGER PRIMARY KEY,
        title TEXT,
        userId INTEGER,
        dateCreated REAL
    )`);
  }

  public static async selectAllByUserId(userId: number) {
    const { result } = await sqlQuery(
      `SELECT * FROM ${this.MODEL_NAME} WHERE id = ?`,
      [userId]
    );

    return mapSqlResultToArray(result);
  }

  public static async selectById(id: number) {
    const { result } = await sqlQuery(
      `SELECT * FROM ${this.MODEL_NAME} WHERE id = ?`,
      [id]
    );

    return result.rows.length ? result.rows.item(0) : null;
  }

  public static async add({
    title,
    userId,
  }: Pick<PasswordGroup, "title" | "userId">) {
    const { result } = await sqlQuery(
      `INSERT INTO ${this.MODEL_NAME} (title, userId, dateCreated) values(?, ?, ?)`,
      [title, userId, new Date().getTime()]
    );

    if (!result.insertId) {
      return null;
    }

    return this.selectById(result.insertId);
  }
}

export default PasswordGroupModel;
