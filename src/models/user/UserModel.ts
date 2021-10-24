import { modelInitRunner, sqlQuery } from "..";
import { DEFAULT_USERNAME } from "../../store/user/constants";
import { SQLQueryResult } from "../../types/database";
import { User, UserFull } from "../../types/user";

class UserModel {
  public static init(): Promise<SQLQueryResult> {
    return sqlQuery(
      `CREATE TABLE ${UserModel.name} (id INTEGER PRIMARY KEY, username TEXT, settings TEXT, password TEXT, privateKey TEXT, lastLogin REAL)`
    );
  }

  public static add({
    username = DEFAULT_USERNAME,
    password = null,
    privateKey = null,
    settings = "{}",
  }: Partial<Omit<UserFull, "id">>) {
    return sqlQuery(
      `INSERT INTO ${UserModel.name} (username, settings, password, privateKey) values(?, ?, ?, ?)`,
      [username, settings, password, privateKey]
    );
  }

  public static async selectUserById(userId: number): Promise<User> {
    const { result } = await sqlQuery(
      "SELECT id, username, settings, lastLogin FROM ? WHERE id = ?",
      [UserModel.name, userId]
    );

    return result.rows.item(0);
  }
}

modelInitRunner(UserModel).then((initial) => {
  if (initial) {
    UserModel.add({});
  }
});

export default UserModel;
