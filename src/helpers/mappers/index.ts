import { User as FirebaseUser } from "firebase/auth";
import { User } from "types/user";

export const mapSqlResultToArray = ({ rows }: SQLResultSet) =>
  Array.from({ length: rows.length })
    .fill(0)
    .map((_, index) => rows.item(index));

export const mapFirebaseUserToUser = (
  { uid, email }: FirebaseUser,
  additionalInfo: Partial<User> = {}
): User => ({
  id: uid as any,
  username: email!,
  hasPassword: true,
  privateKey: "",
  lastLogin: null,
  settings: {},
  ...additionalInfo,
});
