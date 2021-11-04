import { ru, enUS } from "date-fns/locale";
import { makeAutoObservable } from "mobx";

import { Language, Theme } from "enums/page-view";

import { DEFAULT_USER_ID } from "../user/constants";

class PageViewStore {
  public expandedSideBar = false;
  public language = Language.Ru;
  public theme = Theme.Dark;
  public currentUserId = DEFAULT_USER_ID;

  constructor() {
    makeAutoObservable(this);

    const savedSettingsJson = localStorage.getItem("page-settings");

    window.addEventListener("unload", () => {
      localStorage.setItem("page-settings", JSON.stringify(this));
    });

    if (savedSettingsJson === null) {
      return;
    }

    const savedSettings = JSON.parse(savedSettingsJson);

    for (const key in savedSettings) {
      if (key in this) {
        (this as any)[key] = savedSettings[key];
      }
    }
  }

  public get isDarkTheme() {
    return this.theme === Theme.Dark;
  }

  public get smallLanguage(): string {
    return this.language.split("_")[0];
  }

  public get formatOptions() {
    return {
      locale: this.language === Language.Ru ? ru : enUS,
    };
  }

  public toggleExpanded = () => {
    this.expandedSideBar = !this.expandedSideBar;
  };

  public changeTheme = (newTheme: Theme) => {
    this.theme = newTheme;
  };

  public changeLanguage = (lang: Language) => {
    this.language = lang;
  };
}

export default PageViewStore;
