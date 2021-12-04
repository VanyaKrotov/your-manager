import { ru, enUS } from "date-fns/locale";
import { makeAutoObservable } from "mobx";

import { routes } from "helpers/router";

import { Language, Theme } from "enums/page-view";

import { DEFAULT_USER_ID } from "../user/constants";
import { PasswordGenerateOptions } from "enums/passwords";
import { Password } from "types/passwords";

class PageViewStore {
  public expandedSideBar = false;

  public language = Language.Ru;

  public theme = Theme.Dark;

  public currentUserId = DEFAULT_USER_ID;

  public isMaximizeWindow = false;

  public pagePath = { pathname: routes.ROOT, search: "" };

  public passwordsSearchOptions: Array<keyof Password> = [
    "title",
    "domain",
    "username",
  ];

  public generateOptions = {
    length: 8,
    generate: [
      PasswordGenerateOptions.Numbers,
      PasswordGenerateOptions.Symbols,
      PasswordGenerateOptions.Lowercase,
      PasswordGenerateOptions.Uppercase,
    ],
  };

  constructor() {
    makeAutoObservable(this);

    const savedSettingsJson = localStorage.getItem("page-settings");
    console.log(savedSettingsJson);
    window.addEventListener("unload", () => {
      const { pathname, search } = window.location;
      console.log(JSON.parse(JSON.stringify(window.location)));

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

  public get generateFnOptions() {
    const { length, generate } = this.generateOptions;

    return {
      length,
      numbers: generate.includes(PasswordGenerateOptions.Numbers),
      symbols: generate.includes(PasswordGenerateOptions.Symbols),
      lowercase: generate.includes(PasswordGenerateOptions.Lowercase),
      uppercase: generate.includes(PasswordGenerateOptions.Uppercase),
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

  public changeGenerateOptions(value: Record<string, any>) {
    this.generateOptions = Object.assign(this.generateOptions, value);
  }

  public changIisMaximizeWindow(value: boolean) {
    this.isMaximizeWindow = value;
  }

  public changePasswordsSearchOptions = (values: unknown[]) => {
    this.passwordsSearchOptions = values as Array<keyof Password>;
  };
}

export default PageViewStore;
