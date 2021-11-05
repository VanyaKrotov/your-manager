import { SHA256 } from "crypto-js";

import { SQLQueryResult } from "types/database";
import { User, UserFull } from "types/user";

import { DEFAULT_USERNAME } from "store/user/constants";

import { modelInitRunner, sqlQuery } from "..";
import { mapSqlResultToArray } from "helpers/mappers";

class UserModel {
  public static MODEL_NAME = "user";

  public static init(): Promise<SQLQueryResult> {
    return sqlQuery(
      `CREATE TABLE ${this.MODEL_NAME} (id INTEGER PRIMARY KEY, username TEXT, settings TEXT, password TEXT, privateKey TEXT, lastLogin REAL)`
    );
  }

  public static async add({
    username = DEFAULT_USERNAME,
    password = null,
    privateKey = null,
    settings = "{}",
  }: Partial<Omit<UserFull, "id">>) {
    const { result } = await sqlQuery(
      `INSERT INTO ${this.MODEL_NAME} (username, settings, password, privateKey) values(?, ?, ?, ?)`,
      [
        username,
        settings,
        password && SHA256(password),
        privateKey && SHA256(privateKey),
      ]
    );

    if (!result.insertId) {
      return null;
    }

    return UserModel.selectUserById(result.insertId);
  }

  public static async selectUserById(userId: number): Promise<User | null> {
    const { result } = await sqlQuery(
      `SELECT id, username, settings, password, lastLogin FROM ${this.MODEL_NAME} WHERE id = ?`,
      [userId]
    );

    const user = result.rows.item(0);
    if (!user) {
      return null;
    }

    const { password, ...restUser } = user;

    return { ...restUser, hasPassword: Boolean(password) };
  }

  public static async selectAllUsers(): Promise<User[]> {
    const { result } = await sqlQuery(
      `SELECT id, username, settings, lastLogin, password FROM ${this.MODEL_NAME}`
    );

    return mapSqlResultToArray(result).map(({ password, ...rest }) => ({
      hasPassword: Boolean(password),
      ...rest,
    }));
  }

  public static async authenticate(userId: number, password: string) {
    const { result } = await sqlQuery(
      `SELECT * FROM ${this.MODEL_NAME} WHERE id = ? AND password = ?`,
      [userId, SHA256(password)]
    );

    if (!result.rows.length) {
      return null;
    }

    await sqlQuery(`UPDATE ${this.MODEL_NAME} SET lastLogin = ? WHERE id = ?`, [
      new Date().getTime(),
      userId,
    ]);

    return UserModel.selectUserById(userId);
  }
}

modelInitRunner(UserModel).then((initial) => {
  if (initial) {
    UserModel.add({});
  }
});

export default UserModel;
