import { NoteType, SubType } from "enums/notes";

export interface Note {
  id: number;
  title: string | null;
  userId: number;
  content: string;
  dateCreated: number;
  priority: boolean;
  type: NoteType;
  subType: SubType;
  lastUpdate: number | null;
}
