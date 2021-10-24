export const mapSqlResultToArray = ({ rows }: SQLResultSet) =>
  Array.from({ length: rows.length })
    .fill(0)
    .map((_, index) => rows.item(index));
