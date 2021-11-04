import { SubType } from "enums/notes";
import { mapSqlResultToArray } from "helpers/mappers";

import { Note } from "types/notes";

import { modelInitRunner, sqlQuery } from "..";

class NoteModel {
  public static MODEL_NAME = "note_model";

  public static init() {
    return sqlQuery(
      `CREATE TABLE ${this.MODEL_NAME} (
            id INTEGER PRIMARY KEY, 
            title TEXT,
            userId INTEGER,
            content TEXT,
            type INTEGER,
            subType INTEGER,
            priority BOOL,
            dateCreated REAL,
            lastUpdate REAL
        )`
    );
  }

  public static async selectAllByUserId(userId: number) {
    const { result } = await sqlQuery(
      `SELECT * FROM ${this.MODEL_NAME} WHERE userId = ?`,
      [userId]
    );

    return mapSqlResultToArray(result).map(({ priority, ...lastProps }) => ({
      priority: priority === "true",
      ...lastProps,
    }));
  }

  public static async selectById(noteId: number) {
    const { result } = await sqlQuery(
      `SELECT * FROM ${this.MODEL_NAME} WHERE id = ?`,
      [noteId]
    );

    if (!result.rows.length) {
      return null;
    }

    const resultItem = result.rows.item(0);

    return { ...resultItem, priority: resultItem.priority === "true" };
  }

  public static async add({
    title,
    userId,
    type,
  }: Pick<Note, "title" | "userId" | "type">) {
    const { result } = await sqlQuery(
      `INSERT INTO ${this.MODEL_NAME} (title, content, userId, dateCreated, priority, type, subType) values(?, ?, ?, ?, ?, ?, ?)`,
      [title, "", userId, new Date().getTime(), false, type, SubType.Rich]
    );

    if (!result.insertId) {
      return null;
    }

    return NoteModel.selectById(result.insertId);
  }

  public static async update(
    noteId: number,
    {
      content,
      title,
      lastUpdate = new Date().getTime(),
      priority = false,
      subType
    }: Partial<Omit<Note, "id" | "userId" | "dateCreated">>
  ) {
    const { result } = await sqlQuery(
      `UPDATE ${this.MODEL_NAME} SET title = ?, content = ?, lastUpdate = ?, priority = ?, subType = ? WHERE id = ?`,
      [title, content, lastUpdate, priority, subType, noteId]
    );

    if (!result.rowsAffected) {
      return null;
    }

    return NoteModel.selectById(noteId);
  }

  public static async delete(noteId: number) {
    const { result } = await sqlQuery(
      `DELETE FROM ${this.MODEL_NAME} WHERE id = ?`,
      [noteId]
    );

    return result.rowsAffected > 0;
  }
}

modelInitRunner(NoteModel);

export default NoteModel;
