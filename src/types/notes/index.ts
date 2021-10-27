export interface Note {
  id: number;
  title: string;
  userId: number;
  content: string;
  dateCreated: number;
  lastUpdate: number | null;
}
