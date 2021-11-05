import { makeAutoObservable } from "mobx";

import { createUsernameSymbols } from "helpers/user";

import { User } from "types/user";

import { DEFAULT_USERNAME, DEFAULT_USER_ID } from "./constants";
import UserModel from "models/user/UserModel";
import { RegistrationFormValue } from "pages/user/forms/registration";

class UserStore {
  public users: User[] = [];
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

  private async loadUsers() {
    this.users = await UserModel.selectAllUsers();
  }

  public async init(userId: number) {
    await this.loadUsers();
  }

  public async login(userId: number, password?: string): Promise<User | null> {
    const userIndex = this.users.findIndex(({ id }) => id === userId)!;
    if (!password && !this.users[userIndex].hasPassword) {
      this.data = this.users[userIndex];

      return this.data;
    }

    const authResult = await UserModel.authenticate(userId, password!);

    if (!authResult) {
      return null;
    }

    this.data = authResult;
    this.users[userIndex] = authResult;

    return authResult;
  }

  public async addUser({
    username,
    password,
    secretKey,
  }: RegistrationFormValue): Promise<boolean> {
    const result = await UserModel.add({
      username,
      password,
      privateKey: secretKey,
    });

    await this.loadUsers();

    return Boolean(result);
  }
}

export default UserStore;
