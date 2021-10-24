export interface SQLQueryResult {
  tx: SQLTransaction;
  result: SQLResultSet;
}

export interface SQLQueryError {
  tx: SQLTransaction;
  error: SQLError;
}
