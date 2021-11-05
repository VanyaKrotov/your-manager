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
  defaultPath = routes.ROOT
) => {
  if (history.length > 2) {
    return history.goBack();
  }

  return history.push(defaultPath);
};
