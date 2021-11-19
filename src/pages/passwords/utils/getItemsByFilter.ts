import { Password } from "types/passwords";
import { PasswordsFilter } from "../types";

const getItemsByFilter = (
  items: Password[],
  { query }: PasswordsFilter,
  filteredFields: Array<keyof Password>
) => {
  const queryLowercase = query.toLowerCase();

  return items.filter((item) =>
    filteredFields.some(
      (key) =>
        item[key] &&
        (item[key] as string).toLowerCase().includes(queryLowercase)
    )
  );
};

export default getItemsByFilter;
