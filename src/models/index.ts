import { createQueryHandler } from "helpers/database";

import { SQLQueryResult } from "types/database";

import config from "config.json";

const {
  db: { name, version, displayName, size },
} = config;

const db = window.openDatabase(name, version, displayName, size);

if (db === null) {
  throw Error("Database not connected!");
}

const sqlQuery = createQueryHandler(db);

const modelInitRunner = async (model: {
  MODEL_NAME: string;
  init: () => Promise<SQLQueryResult>;
}) => {
  const {
    result: { rows },
  } = await sqlQuery(
    `SELECT * FROM sqlite_master WHERE type='table' AND name=?`,
    [model.MODEL_NAME]
  );

  if (!rows.length) {
    await model.init();

    return Promise.resolve(true);
  }

  return Promise.resolve(false);
};

export { db, sqlQuery, modelInitRunner };
