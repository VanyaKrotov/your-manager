import { makeAutoObservable } from "mobx";

import { createUsernameSymbols } from "../../helpers/user";
import { User } from "../../types/user";
import { DEFAULT_USERNAME, DEFAULT_USER_ID } from "./constants";

class UserStore {
  public data: User | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  public get authorized(): boolean {
    return Boolean(this.data);
  }

  public get userId() {
    return this.data?.id || DEFAULT_USER_ID;
  }

  public get usernameSymbols() {
    return createUsernameSymbols(this.username);
  }

  public get username() {
    return this.data?.username || DEFAULT_USERNAME;
  }
}

export default UserStore;
