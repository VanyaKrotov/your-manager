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

  private async init(userId: number) {
    await modelInitRunner(PasswordModel);
    await modelInitRunner(PasswordGroupModel);

    this.groups = await PasswordGroupModel.selectAllByUserId(userId);
    this.list = await PasswordModel.selectAllByUserId(userId);
  }

  public async add(values: PasswordFormValue) {
    // const result = await PasswordModel.
  }
}

export default PasswordStore;
