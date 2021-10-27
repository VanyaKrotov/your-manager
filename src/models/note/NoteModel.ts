import { modelInitRunner, sqlQuery } from "..";
import { mapSqlResultToArray } from "../../helpers/mappers";
import { Note } from "../../types/notes";

class NoteModel {
  public static MODEL_NAME = "note_model";

  public static init() {
    return sqlQuery(
      `CREATE TABLE ${this.MODEL_NAME} (
            id INTEGER PRIMARY KEY, 
            title TEXT,
            userId INTEGER,
            content TEXT,
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

    return mapSqlResultToArray(result);
  }

  public static async selectById(noteId: number) {
    const { result } = await sqlQuery(
      `SELECT * FROM ${this.MODEL_NAME} WHERE id = ?`,
      [noteId]
    );

    if (!result.rows.length) {
      return null;
    }

    return result.rows.item(0);
  }

  public static async add({ title, userId }: Pick<Note, "title" | "userId">) {
    const { result } = await sqlQuery(
      `INSERT INTO ${this.MODEL_NAME} (title, content, userId, dateCreated) values(?, ?, ?, ?)`,
      [title, "", userId, new Date().getTime()]
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
    }: Partial<Omit<Note, "id" | "userId" | "dateCreated">>
  ) {
    const { result } = await sqlQuery(
      `UPDATE ${this.MODEL_NAME} SET title = ?, content = ?, lastUpdate = ? WHERE id = ?`,
      [title, content, lastUpdate, noteId]
    );

    if (!result.rowsAffected) {
      return null;
    }

    return NoteModel.selectById(noteId);
  }
}

modelInitRunner(NoteModel);

export default NoteModel;
