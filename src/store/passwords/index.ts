import { makeAutoObservable } from "mobx";
import { modelInitRunner } from "models";
import PasswordGroupModel from "models/password/PasswordGroupModel";
import PasswordModel from "models/password/PasswordModel";
import { PasswordFormValue } from "pages/passwords/forms/PasswordForm";

import { Password, PasswordGroup } from "types/passwords";

class PasswordStore {
  public list: Password[] = [];
  public groups: PasswordGroup[] = [];

  constructor(userId: number) {
    makeAutoObservable(this);

    this.init(userId);
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

  private async init(userId: number) {
    await modelInitRunner(PasswordModel);
    await modelInitRunner(PasswordGroupModel);

    this.groups = await PasswordGroupModel.selectAllByUserId(userId);
    this.list = await PasswordModel.selectAllByUserId(userId);
  }

  public async addPassword(values: PasswordFormValue) {
    const result = await PasswordModel.add(values);

    if (!result) {
      throw Error("Error create password");
    }

    this.list = this.list.concat(result);
  }

  public async addGroup(values: Pick<PasswordGroup, "title" | "userId">) {
    const group = await PasswordGroupModel.add(values);

    if (group) {
      this.groups = this.groups.concat(group);
    }

    return group;
  }

  public async removePassword(id: number) {
    const result = await PasswordModel.removeById(id);

    if (result) {
      this.list = this.list.filter(({ id: iId }) => iId !== id);
    }

    return result;
  }

  public async editPassword(values: PasswordFormValue & Pick<Password, "id">) {
    const result = await PasswordModel.update(values);

    if (!result) {
      return null;
    }

    const index = this.list.findIndex(({ id }) => values.id === id);

    this.list[index] = result;

    this.list = [...this.list];
  }
}

export default PasswordStore;
