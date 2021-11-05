import { makeAutoObservable } from "mobx";

import { createUsernameSymbols } from "helpers/user";

import { User } from "types/user";

import { DEFAULT_USERNAME, DEFAULT_USER_ID } from "./constants";
import UserModel from "models/user/UserModel";
import { RegistrationFormValue } from "pages/user/forms/registration";
import { modelInitRunner } from "models";

class UserStore {
  public isLoaded = false;
  public profiles: User[] = [];
  public data: User | null = null;

  constructor(userId: number) {
    makeAutoObservable(this);

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
}

export default UserStore;
