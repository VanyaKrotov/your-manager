import { SearchGroup } from "../types";
import { i18n } from "store";

export const SEARCH_GROUP_OPTIONS = [
  { label: i18n.t("Todo"), value: SearchGroup.Todo },
  { label: i18n.t("Notes"), value: SearchGroup.Notes },
  { label: i18n.t("Passwords"), value: SearchGroup.Passwords },
];
