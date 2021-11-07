import { mapSqlResultToArray } from "helpers/mappers";
import { sqlQuery } from "models";

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
      `SELECT * FROM ${this.MODEL_NAME} WHERE id = ?`,
      [userId]
    );

    return mapSqlResultToArray(result);
  }

  public static selectById(id: number) {
    // const {result} = await 
  }
}

export default PasswordModel;
