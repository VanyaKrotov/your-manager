import { makeAutoObservable } from "mobx";

class NotesStore {
  constructor() {
    makeAutoObservable(this);
  }
}

export default NotesStore;
