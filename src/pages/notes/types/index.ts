export interface NotesFilter {
  active: number | null;
}

export type NotesFilterHandler = (value: Partial<NotesFilter>) => void;
