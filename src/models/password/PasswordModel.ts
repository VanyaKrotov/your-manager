import { mapSqlResultToArray } from "helpers/mappers";
import { sqlQuery } from "models";
import { PasswordFormValue } from "pages/passwords/forms/PasswordForm";
import { Password } from "types/passwords";

class PasswordModel {
  public static MODEL_NAME = "password_model";

  public static init() {
    return sqlQuery(`CREATE TABLE ${this.MODEL_NAME} (
        id INTEGER PRIMARY KEY,
        title TEXT,
        username TEXT,
        domain TEXT,
        password TEXT,
        userId INTEGER,
        groupId INTEGER,
        description TEXT,
        dateCreated REAL,
        lastUpdated REAL,
        lastOpened REAL
    )`);
  }

  public static async selectAllByUserId(userId: number) {
    const { result } = await sqlQuery(
      `SELECT * FROM ${this.MODEL_NAME} WHERE userId = ?`,
      [userId]
    );

    return mapSqlResultToArray(result);
  }

  public static async selectById(id: number) {
    const { result } = await sqlQuery(
      `SELECT * FROM ${this.MODEL_NAME} WHERE id = ?`,
      [id]
    );

    if (!result.rows.length) {
      return null;
    }

    return result.rows.item(0);
  }

  public static async add({
    description,
    domain,
    groupId,
    password,
    title,
    userId,
    username,
  }: PasswordFormValue) {
    const { result } = await sqlQuery(
      `INSERT INTO ${this.MODEL_NAME} 
      (title, password, userId, groupId, username, domain, description, dateCreated) 
      values(?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        password,
        userId,
        groupId,
        username,
        domain,
        description,
        new Date().getTime(),
      ]
    );

    if (!result.insertId) {
      return null;
    }

    return this.selectById(result.insertId);
  }

  public static async removeById(id: number) {
    const { result } = await sqlQuery(
      `DELETE FROM ${this.MODEL_NAME} WHERE id = ?`,
      [id]
    );

    return result.rowsAffected;
  }

  public static async update({
    title,
    username,
    password,
    domain,
    groupId,
    description,
    id,
  }: PasswordFormValue & Pick<Password, "id">) {
    const { result } = await sqlQuery(
      `UPDATE ${this.MODEL_NAME} SET title = ?, username = ?, password = ?, domain = ?, groupId = ?, lastUpdated = ?, description = ? WHERE id = ?`,
      [
        title,
        username,
        password,
        domain,
        groupId,
        new Date().getTime(),
        description,
        id,
      ]
    );

    if (!result.rowsAffected) {
      return null;
    }

    return this.selectById(id);
  }
}

export default PasswordModel;
