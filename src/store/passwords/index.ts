import { makeAutoObservable } from "mobx";

class PasswordStore {
  constructor() {
    makeAutoObservable(this);
  }
}

export default PasswordStore;
