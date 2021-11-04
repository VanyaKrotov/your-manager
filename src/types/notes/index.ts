import { NoteType } from "enums/notes";

export interface Note {
  id: number;
  title: string | null;
  userId: number;
  content: string;
  dateCreated: number;
  priority: boolean;
  type: NoteType;
  lastUpdate: number | null;
}
