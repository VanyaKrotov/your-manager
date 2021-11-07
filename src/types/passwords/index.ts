export interface Password {
  id: number;
  title: string;
  username: string;
  domain: string;
  password: string;
  userId: number;
  groupId: number;
  description: string;
  dateCreated: number;
  lastUpdated: number | null;
  lastOpened: number | null;
}

export interface PasswordGroup {
  id: number;
  title: string;
  userId: number;
  dateCreated: number;
}
