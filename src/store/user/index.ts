import { makeAutoObservable } from "mobx";

import { createUsernameSymbols } from "helpers/user";

import { User } from "types/user";

import { DEFAULT_USERNAME, DEFAULT_USER_ID } from "./constants";
import UserModel from "models/user/UserModel";
import { RegistrationFormValue } from "pages/user/forms/registration";
import { modelInitRunner } from "models";
import ModalsStore from "store/modals";
import { ModalType } from "store/modals/types";

class UserStore {
  private readonly modalStore: ModalsStore;
  public isLoaded = false;
  public profiles: User[] = [];
  public sessionPrivateKey: string | null = null;
  public data: User | null = null;

  constructor(userId: number, modalStore: ModalsStore) {
    makeAutoObservable(this);

    this.modalStore = modalStore;

    this.init(userId);
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

  public get isEmptyProfiles() {
    return this.isLoaded && !this.profiles.length;
  }

  public changeSessionPrivateKey(key: string | null) {
    this.sessionPrivateKey = key;
  }

  private async loadUsers() {
    this.profiles = await UserModel.selectAllUsers();
    this.isLoaded = true;
  }

  public async init(userId: number) {
    await modelInitRunner(UserModel);

    await this.loadUsers();
  }

  public async login(userId: number, password?: string): Promise<User | null> {
    const userIndex = this.profiles.findIndex(({ id }) => id === userId)!;
    if (!password && !this.profiles[userIndex].hasPassword) {
      this.data = this.profiles[userIndex];

      return this.data;
    }

    const authResult = await UserModel.authenticate(userId, password!);

    if (!authResult) {
      return null;
    }

    this.data = authResult;
    this.profiles[userIndex] = authResult;

    return authResult;
  }

  public async addUser({
    username,
    password,
    secretKey,
  }: RegistrationFormValue): Promise<User | null> {
    const result = await UserModel.add({
      username,
      password,
      privateKey: secretKey,
    });

    await this.loadUsers();

    return result;
  }

  public async getPrivateKey(): Promise<string> {
    if (this.sessionPrivateKey) {
      return this.sessionPrivateKey;
    }

    return new Promise((resolve, reject) =>
      this.modalStore.open(ModalType.PrivateKeyConfirm, {
        resolve,
        reject,
      })
    );
  }
}

export default UserStore;
