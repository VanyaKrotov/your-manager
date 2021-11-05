import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { reaction } from "mobx";

import { Language } from "enums/page-view";

import UserStore from "./user";
import NotesStore from "./notes";
import PasswordStore from "./passwords";
import TodoListStore from "./todo-list";
import PageViewStore from "./page-view";

import ru from "glossary/ru.json";
import enUS from "glossary/enUS.json";
import { DEFAULT_USER_ID } from "./user/constants";

export const pageView = new PageViewStore();
export const user = new UserStore(pageView.currentUserId);
export const notes = new NotesStore(pageView.currentUserId);
export const passwords = new PasswordStore();
export const todoList = new TodoListStore(pageView.currentUserId);

i18n.use(initReactI18next).init({
  resources: {
    [Language.EnUS]: {
      translation: enUS,
    },
    [Language.Ru]: {
      translation: ru,
    },
  },
  lng: pageView.language,
  fallbackLng: Language.EnUS,
  interpolation: {
    escapeValue: false,
  },
});

reaction(
  () => pageView.language,
  (lang) => i18n.changeLanguage(lang)
);

reaction(
  () => user.data,
  (user) => {
    if (pageView.currentUserId !== user?.id) {
      pageView.currentUserId = user?.id || DEFAULT_USER_ID;
    }
  }
);

export { i18n };
