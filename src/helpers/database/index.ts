import { SQLQueryResult } from "../../types/database";

export const createQueryHandler =
  (db: Database) =>
  (query: string, args: ObjectArray = []) =>
    new Promise<SQLQueryResult>((resolve, reject) =>
      db.transaction((tx) =>
        tx.executeSql(
          query,
          args,
          (tx, result) => resolve({ tx, result }),
          (tx, error) => {
            reject({ tx, error });

            return true;
          }
        )
      )
    );
