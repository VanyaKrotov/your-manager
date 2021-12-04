import { makeAutoObservable } from "mobx";
import {
  ref,
  set,
  onValue,
  update,
  DatabaseReference,
  child,
} from "firebase/database";
import { SHA256 } from "crypto-js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { createUsernameSymbols } from "helpers/user";

import { User } from "types/user";

import { DEFAULT_USERNAME, DEFAULT_USER_ID } from "./constants";
import { RegistrationFormValue } from "pages/user/forms/registration";
import ModalsStore from "store/modals";
import { ModalType } from "store/modals/types";
import { auth, db } from "services/firebase";
import { mapFirebaseUserToUser } from "helpers/mappers";

class UserStore {
  private ref: DatabaseReference;
  public unSubscribeUser: () => void = () => {};
  public isLoaded = false;
  public profiles: User[] = [];
  public sessionPrivateKey: string | null = null;
  public data: User | null = null;

  constructor(private readonly modalStore: ModalsStore) {
    makeAutoObservable(this);

    this.ref = ref(db, "users/");

    this.init();
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

  public getUserProfiles(): User[] {
    const profilesRawData = localStorage.getItem("savedProfiles");

    if (!profilesRawData) {
      return [];
    }

    return JSON.parse(profilesRawData);
  }

  private addUserProfile(user: User): User[] {
    const currentProfiles = this.getUserProfiles();

    currentProfiles.push(user);

    localStorage.setItem("savedProfiles", JSON.stringify(currentProfiles));

    return currentProfiles;
  }

  public async init() {
    this.profiles = this.getUserProfiles();
  }

  public subscribeUser(userId: number | string) {
    this.unSubscribeUser();

    this.unSubscribeUser = onValue(
      child(this.ref, String(userId)),
      (snapshot) => {
        if (snapshot.exists() && this.data) {
          const userInfo = snapshot.val();

          this.data = Object.assign(this.data, userInfo);
        }
      }
    );
  }

  public async loginWithEmail(
    username: string,
    password: string
  ): Promise<User | null> {
    try {
      const result = await signInWithEmailAndPassword(auth, username, password);
      const user = mapFirebaseUserToUser(result.user);

      await update(child(this.ref, String(user.id)), {
        lastLogin: new Date().getTime(),
      });

      this.subscribeUser(user.id);

      if (!this.profiles.find(({ id }) => user.id === id)) {
        this.profiles = this.addUserProfile(user);
      }

      this.data = user;

      return user;
    } catch (error) {
      console.error(error);
    }

    return null;
  }

  public async login(userId: number, password: string): Promise<User | null> {
    const user = this.profiles.find(({ id }) => id === userId);

    if (!user) {
      return null;
    }

    return this.loginWithEmail(user.username, password);
  }

  public async addUser({
    username,
    password,
    secretKey,
  }: RegistrationFormValue): Promise<User | null> {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        username,
        password
      );

      const user = mapFirebaseUserToUser(result.user, {
        privateKey: SHA256(secretKey).toString(),
      });

      const { privateKey } = user;

      await set(ref(db, `users/${user.id}`), {
        privateKey,
        username: user.username,
      });

      this.profiles = this.addUserProfile(user);

      return user;
    } catch (error) {
      console.error(error);
    }

    return null;
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
