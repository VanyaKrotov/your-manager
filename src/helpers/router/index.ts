import { History } from "history";

export const routes = {
  ROOT: "/",
  LOGIN: "/login",
  SEARCH: "/search",
  REGISTRATION: "/registration",
  TODO_LIST: "/todo-list",
  NOTES: "/notes",
  PASSWORDS: "/passwords",
  SETTINGS: "/settings",
  CHANGE_USER: "/change-user",
};

export const goBackOrDefault = (
  history: History,
  defaultPath?: string | Record<string, string>,
  isReplace: boolean = false
) => {
  if (defaultPath) {
    return history[isReplace ? "replace" : "push"](defaultPath);
  }

  if (history.length > 2) {
    return history.goBack();
  }

  return history[isReplace ? "replace" : "push"](routes.ROOT);
};
