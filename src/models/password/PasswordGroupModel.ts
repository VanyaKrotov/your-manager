import { mapSqlResultToArray } from "helpers/mappers";
import { sqlQuery } from "models";

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

  
}

export default PasswordGroupModel;
