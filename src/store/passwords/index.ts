import { makeAutoObservable } from "mobx";
import {
  ref,
  update,
  onValue,
  child,
  remove,
  DatabaseReference,
} from "firebase/database";

import { PasswordFormValue } from "pages/passwords/forms/PasswordForm";

import { Password, PasswordGroup } from "types/passwords";
import { db } from "services/firebase";

class PasswordStore {
  private passwordsRef: DatabaseReference;
  private passwordGroupsRef: DatabaseReference;
  public list: Password[] = [];
  public groups: PasswordGroup[] = [];

  constructor(userId: number) {
    makeAutoObservable(this);

    this.passwordGroupsRef = ref(db, `passwordsGroups/${userId}`);
    this.passwordsRef = ref(db, `passwords/${userId}`);

    this.init();
  }

  public setRefsForUser(userId: string | number) {
    this.passwordGroupsRef = ref(db, `passwordsGroups/${userId}`);
    this.passwordsRef = ref(db, `passwords/${userId}`);
  }

  public get pickerGroups() {
    return this.groups.map(({ title, id }) => ({ label: title, value: id }));
  }

  public get groupsMap(): Record<number, PasswordGroup> {
    return this.groups.reduce(
      (acc, item) => Object.assign(acc, { [item.id]: item }),
      {}
    );
  }

  public get sortedItems() {
    return this.list;
  }

  private async init() {
    const unSubGroups = onValue(this.passwordGroupsRef, (snapshot) => {
      this.groups = Object.values(snapshot.val() || {});
    });

    const unSubPasswords = onValue(this.passwordsRef, (snapshot) => {
      this.list = Object.values(snapshot.val() || {});
    });

    return () => {
      unSubGroups();
      unSubPasswords();
    };
  }

  public async addPassword(values: PasswordFormValue) {
    const createdTime = new Date().getTime();
    const newPassword = {
      ...values,
      id: createdTime,
      dateCreated: createdTime,
    };

    await update(child(this.passwordsRef, String(createdTime)), newPassword);
  }

  public async addGroup(values: Pick<PasswordGroup, "title" | "userId">) {
    const currentTime = new Date().getTime();
    const group = { ...values, dateCreated: currentTime, id: currentTime };

    await update(child(this.passwordGroupsRef, String(currentTime)), group);

    return group;
  }

  public async removePassword(id: number) {
    try {
      await remove(child(this.passwordsRef, String(id)).ref);
    } catch (error) {
      return false;
    }

    return true;
  }

  public async editPassword(values: PasswordFormValue & Pick<Password, "id">) {
    await update(child(this.passwordsRef, String(values.id)), values);
  }
}

export default PasswordStore;
