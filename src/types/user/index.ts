export interface UserSettings {

}

export interface User {
  id: number;
  username: string;
  settings: UserSettings;
  lastLogin: number | null;
}

export interface UserFull extends User {
  password: string | null;
  privateKey: string | null;
}
