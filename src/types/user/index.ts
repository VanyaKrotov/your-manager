export interface UserSettings {}

export interface User {
  id: number;
  username: string;
  settings: UserSettings;
  privateKey: string | null;
  lastLogin: number | null;
  hasPassword?: boolean;
}

export interface UserFull extends User {
  password: string | null;
}
