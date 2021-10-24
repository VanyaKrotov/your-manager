import { makeAutoObservable } from "mobx";
import { DEFAULT_USER_ID } from "../user/constants";

class PageViewStore {
  public expandedSideBar = true;
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

  public toggleExpanded = () => {
    this.expandedSideBar = !this.expandedSideBar;
  };
}

export default PageViewStore;
