import { ru, enUS } from "date-fns/locale";
import { makeAutoObservable } from "mobx";

import { routes } from "helpers/router";

import { Language, Theme } from "enums/page-view";

import { DEFAULT_USER_ID } from "../user/constants";

class PageViewStore {
  public expandedSideBar = false;
  public language = Language.Ru;
  public theme = Theme.Dark;
  public currentUserId = DEFAULT_USER_ID;
  public pagePath = { pathname: routes.ROOT, search: "" };

  constructor() {
    makeAutoObservable(this);

    const savedSettingsJson = localStorage.getItem("page-settings");

    window.addEventListener("unload", () => {
      const { pathname, search } = window.location;
      console.log(JSON.parse(JSON.stringify(window.location)))

      localStorage.setItem(
        "page-settings",
        JSON.stringify(
          Object.assign(
            {
              pagePath: {
                pathname,
                search,
              },
            },
            this
          )
        )
      );
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

  public changeCurrentUser(userId: number) {
    this.currentUserId = userId;
  }
}

export default PageViewStore;
